import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TasteRadarChart from '../components/TasteRadarChart';
import FlavorBar from '../components/FlavorBar';
import { fetchIngredients, predictFlavors } from '../api';
import './Predict.css';

const METHODS = ['NONE', 'Shake', 'Stir', 'Build', 'Blend', 'Float'];
const METHOD_LABELS = { NONE: '선택안함' };

const FLAVOR_KO = {
  sweetness: '단맛',
  sourness: '신맛',
  bitterness: '쓴맛',
  umamiSalty: '감칠맛',
  fruity: '과일향',
  citrus: '시트러스',
  floral: '꽃향',
  herbal: '허브향',
  spicy: '스파이시',
  woodySmoky: '우디/스모키',
  body: '바디감',
  fizzy: '청량감',
};

function EmptyGlass() {
  return (
    <svg width="64" height="80" viewBox="0 0 64 80" fill="none">
      <path
        d="M8 4 L16 56 Q16 68 32 68 Q48 68 48 56 L56 4 Z"
        stroke="#C9922A"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
      <line x1="20" y1="68" x2="44" y2="68" stroke="#C9922A" strokeWidth="2" opacity="0.5" />
      <line x1="32" y1="68" x2="32" y2="76" stroke="#C9922A" strokeWidth="2" opacity="0.5" />
      <line x1="24" y1="76" x2="40" y2="76" stroke="#C9922A" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

export default function Predict() {
  const location = useLocation();
  const navigate = useNavigate();

  const [allIngredients, setAllIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [method, setMethod] = useState('NONE');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredientsLoading, setIngredientsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all ingredients on mount
  useEffect(() => {
    fetchIngredients()
      .then(data => {
        setAllIngredients(data);
        setIngredientsLoading(false);

        // Handle preselected ingredients from /recipes modal
        const pre = location.state?.preselected;
        if (pre && pre.length > 0) {
          const matched = pre.map(pi => {
            const found = data.find(
              d => d.name.toLowerCase() === pi.name.toLowerCase()
            );
            if (found) return { id: found.id, name: found.name, amount: pi.ml ?? 30 };
            return null;
          }).filter(Boolean);
          if (matched.length > 0) setSelected(matched);
        }
      })
      .catch(() => setIngredientsLoading(false));
  }, []);

  const filtered = allIngredients.filter(ing =>
    ing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSelected = (id) => selected.some(s => s.id === id);

  const toggleIngredient = (ing) => {
    if (isSelected(ing.id)) {
      setSelected(s => s.filter(x => x.id !== ing.id));
    } else {
      setSelected(s => [...s, { id: ing.id, name: ing.name, amount: 30 }]);
    }
  };

  const updateAmount = (id, val) => {
    setSelected(s => s.map(x => x.id === id ? { ...x, amount: Math.max(1, Number(val)) } : x));
  };

  const removeIngredient = (id) => {
    setSelected(s => s.filter(x => x.id !== id));
  };

  const handlePredict = async () => {
    if (selected.length === 0 || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await predictFlavors(
        selected.map(s => ({ id: s.id, amount: s.amount })),
        method
      );
      setPrediction(data);
    } catch (err) {
      setError(err.message || '예측에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="predict">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title font-display">나만의 레시피 만들기</h1>
          <p className="page-subtitle">
            재료를 선택하면 AI가 맛 프로필을 예측해드립니다. 나만의 조합을 실험해보세요.
          </p>
        </div>

        <div className="predict__layout">
          {/* ─── Left Panel ─── */}
          <div className="predict__left">
            {/* Ingredient search */}
            <div className="predict__section">
              <label className="predict__label">재료 검색</label>
              <input
                className="input"
                type="text"
                placeholder="재료 검색..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Ingredient list */}
            <div className="predict__ing-list">
              {ingredientsLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="skeleton predict__ing-skeleton" />
                ))
              ) : filtered.length === 0 ? (
                <p className="predict__no-result">검색 결과가 없습니다</p>
              ) : (
                filtered.map(ing => (
                  <div
                    key={ing.id}
                    className={`predict__ing-row ${isSelected(ing.id) ? 'predict__ing-row--selected' : ''}`}
                  >
                    <span className="predict__ing-name">{ing.name}</span>
                    <button
                      className={`predict__ing-btn ${isSelected(ing.id) ? 'predict__ing-btn--remove' : ''}`}
                      onClick={() => toggleIngredient(ing)}
                    >
                      {isSelected(ing.id) ? '−' : '+'}
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Selected ingredients */}
            <div className="predict__section predict__selected">
              <label className="predict__label">
                선택된 재료 ({selected.length}개)
              </label>
              {selected.length === 0 ? (
                <p className="predict__hint">재료를 선택해주세요</p>
              ) : (
                <div className="predict__selected-list">
                  {selected.map(s => (
                    <div key={s.id} className="predict__selected-row">
                      <span className="predict__selected-name">{s.name}</span>
                      <div className="predict__selected-controls">
                        <input
                          type="number"
                          className="predict__ml-input"
                          min={1}
                          value={s.amount}
                          onChange={e => updateAmount(s.id, e.target.value)}
                        />
                        <span className="predict__ml-label">ml</span>
                        <button
                          className="predict__remove-btn"
                          onClick={() => removeIngredient(s.id)}
                          aria-label={`${s.name} 제거`}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Method */}
            <div className="predict__section">
              <label className="predict__label">제조 방법</label>
              <div className="predict__methods">
                {METHODS.map(m => (
                  <button
                    key={m}
                    className={`predict__method-pill ${method === m ? 'predict__method-pill--active' : ''}`}
                    onClick={() => setMethod(m)}
                  >
                    {METHOD_LABELS[m] ?? m}
                  </button>
                ))}
              </div>
            </div>

            {/* Predict button */}
            <button
              className="btn btn-primary btn-full"
              style={{ height: 48 }}
              onClick={handlePredict}
              disabled={selected.length === 0 || isLoading}
              id="predict-btn"
            >
              {isLoading ? (
                <><span className="spinner" style={{ width: 18, height: 18 }} /> AI 분석 중...</>
              ) : '맛 예측하기'}
            </button>
          </div>

          {/* ─── Right Panel ─── */}
          <div className="predict__right">
            <div className="predict__result-panel">
              {/* Initial */}
              {!isLoading && !prediction && !error && (
                <div className="empty-state">
                  <EmptyGlass />
                  <p style={{ marginTop: 16 }}>재료를 선택하고 맛을 예측해보세요</p>
                </div>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="empty-state">
                  <span className="spinner" style={{ width: 40, height: 40 }} />
                  <p className="font-mono" style={{ color: 'var(--accent-gold)', marginTop: 20, fontSize: '0.85rem' }}>
                    AI 모델이 맛을 분석하고 있습니다...
                  </p>
                </div>
              )}

              {/* Error */}
              {!isLoading && error && (
                <div className="error-state">
                  <p>예측 결과를 불러오지 못했습니다.</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{error}</p>
                </div>
              )}

              {/* Result */}
              {!isLoading && prediction && (
                <div className="predict__result">
                  <div className="predict__result-header">
                    <h2 className="predict__result-title font-display">예측 결과</h2>
                    {prediction.abv != null && (
                      <span className="badge" style={{ fontSize: '0.8rem' }}>
                        🔴 ABV {Number(prediction.abv).toFixed(1)}%
                      </span>
                    )}
                  </div>

                  <div className="predict__radar">
                    <TasteRadarChart tasteProfile={prediction} size={280} />
                  </div>

                  <div className="predict__divider">
                    <span>상세 수치</span>
                  </div>

                  <div className="predict__bars">
                    {Object.entries(FLAVOR_KO).map(([key, label], i) => (
                      <FlavorBar
                        key={key}
                        name={label}
                        value={prediction[key] ?? 0}
                        max={10}
                        delay={i * 0.05}
                      />
                    ))}
                  </div>

                  <button
                    className="btn btn-secondary btn-full"
                    onClick={() => navigate('/recipes')}
                    style={{ marginTop: 20 }}
                  >
                    레시피 탐색하기 →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
