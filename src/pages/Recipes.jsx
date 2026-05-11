import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TasteRadarChart from '../components/TasteRadarChart';
import FlavorBar from '../components/FlavorBar';
import { fetchCocktails } from '../api';
import './Recipes.css';

const METHOD_TABS = ['전체', 'Shake', 'Stir', 'Build', 'Blend', 'Float'];

const CARD_COLORS = ['#2D1A08', '#1A2008', '#08202D', '#1A0820', '#201808'];

function getCardGradient(name) {
  const idx = (name?.charCodeAt(0) ?? 0) % CARD_COLORS.length;
  const base = CARD_COLORS[idx];
  return `radial-gradient(ellipse at 30% 40%, ${base}ee 0%, #0D0A07 100%)`;
}

const FLAVOR_KO = {
  sweetness: '단맛', sourness: '신맛', bitterness: '쓴맛',
  umamiSalty: '감칠맛', fruity: '과일향', citrus: '시트러스',
  floral: '꽃향', herbal: '허브향', spicy: '스파이시',
  woodySmoky: '우디/스모키', body: '바디감', fizzy: '청량감',
};

function getTop3(tasteProfile) {
  if (!tasteProfile) return [];
  return Object.entries(tasteProfile)
    .filter(([k]) => k !== 'abv')
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);
}

function SkeletonCard() {
  return (
    <div className="recipe-card card skeleton-card">
      <div className="skeleton" style={{ height: 160 }} />
      <div className="recipe-card__body">
        <div className="skeleton" style={{ height: 22, width: '70%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 16, width: '40%', marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 12, marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 12, marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 12, width: '60%' }} />
      </div>
    </div>
  );
}

function RecipeCard({ cocktail, onClick }) {
  const { name, imageUrl, methodCategory, ingredients, tasteProfile } = cocktail;
  const top3Ing = (ingredients ?? []).slice(0, 3).map(i => i.name).join(', ');
  const extraCount = (ingredients ?? []).length - 3;
  const top3Flavors = getTop3(tasteProfile);

  return (
    <div
      className="recipe-card card"
      onClick={() => onClick(cocktail)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(cocktail)}
    >
      <div className="recipe-card__img-wrap">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="recipe-card__img" />
        ) : (
          <div
            className="recipe-card__img-placeholder"
            style={{ background: getCardGradient(name) }}
          >
            <span style={{ fontSize: '2.5rem', opacity: 0.3 }}>🍸</span>
          </div>
        )}
        <div className="recipe-card__img-overlay" />
      </div>

      <div className="recipe-card__body">
        <h3 className="recipe-card__name font-display">{name}</h3>
        {methodCategory && (
          <span className="badge badge-method recipe-card__method">{methodCategory}</span>
        )}
        <p className="recipe-card__ingredients">
          {top3Ing}
          {extraCount > 0 && <span className="recipe-card__more"> +{extraCount}가지</span>}
        </p>

        {top3Flavors.length > 0 && (
          <div className="recipe-card__flavors">
            {top3Flavors.map(([key, val]) => (
              <div key={key} className="recipe-card__flavor-row">
                <span className="recipe-card__flavor-name">{FLAVOR_KO[key] ?? key}</span>
                <div className="recipe-card__flavor-track">
                  <div
                    className="recipe-card__flavor-fill"
                    style={{ width: `${(val / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CocktailModal({ cocktail, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!cocktail) return null;

  const {
    name, imageUrl, glassRaw, garnishRaw, methodCategory,
    ingredients, tasteProfile, reviewText, sourceUrl,
  } = cocktail;

  const handlePredictWithIngredients = () => {
    onClose();
    navigate('/predict', { state: { preselected: ingredients } });
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${name} 상세 정보`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button className="modal-close" onClick={onClose} aria-label="닫기">×</button>

        {/* Image header */}
        <div className="modal-img-wrap">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="modal-img" />
          ) : (
            <div
              className="modal-img-placeholder"
              style={{ background: getCardGradient(name) }}
            >
              <span style={{ fontSize: '4rem', opacity: 0.3 }}>🍸</span>
            </div>
          )}
        </div>

        <div className="modal-body">
          {/* Name & meta */}
          <h2 className="modal-name font-display">{name}</h2>
          <div className="modal-meta">
            {methodCategory && (
              <span className="badge badge-method">{methodCategory}</span>
            )}
            {tasteProfile?.abv != null && (
              <span className="badge">ABV {Number(tasteProfile.abv).toFixed(1)}%</span>
            )}
          </div>

          <div className="modal-info">
            {glassRaw && (
              <div className="modal-info-row">
                <span className="modal-info-label">글라스</span>
                <span>{glassRaw}</span>
              </div>
            )}
            {garnishRaw && (
              <div className="modal-info-row">
                <span className="modal-info-label">가니쉬</span>
                <span>{garnishRaw}</span>
              </div>
            )}
          </div>

          <div className="modal-divider-label">재료</div>
          <ul className="modal-ingredients">
            {(ingredients ?? []).map((ing, i) => (
              <li key={i} className="modal-ingredient-item">
                <span>{ing.name}</span>
                <span className="modal-ingredient-ml font-mono">{ing.ml}ml</span>
              </li>
            ))}
          </ul>

          <div className="modal-divider-label">맛 프로필</div>
          <div className="modal-radar">
            <TasteRadarChart tasteProfile={tasteProfile ?? {}} size={220} />
          </div>

          <div className="modal-divider-label">수치 상세</div>
          <div className="modal-bars">
            {Object.entries(FLAVOR_KO).map(([key, label], i) => (
              <FlavorBar
                key={key}
                name={label}
                value={tasteProfile?.[key] ?? 0}
                max={10}
                delay={i * 0.04}
              />
            ))}
          </div>

          {reviewText && (
            <p className="modal-review">"{reviewText}"</p>
          )}

          <div className="modal-actions">
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                원본 레시피 보기 →
              </a>
            )}
            <button
              className="btn btn-primary"
              onClick={handlePredictWithIngredients}
            >
              이 재료로 맛 예측하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Recipes() {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMethod, setActiveMethod] = useState('전체');
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCocktails()
      .then(data => { setCocktails(data); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  const filtered = cocktails.filter(c => {
    const matchSearch = !searchTerm
      || c.name.toLowerCase().includes(searchTerm.toLowerCase())
      || (c.ingredients ?? []).some(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchMethod = activeMethod === '전체' || c.methodCategory === activeMethod;
    return matchSearch && matchMethod;
  });

  const handleClose = useCallback(() => setSelectedCocktail(null), []);

  return (
    <div className="recipes">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title font-display">칵테일 레시피</h1>
        </div>

        {/* Search */}
        <div className="recipes__search-wrap">
          <div className="recipes__search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <input
            className="input recipes__search"
            type="text"
            placeholder="칵테일 이름 또는 재료로 검색..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            id="recipes-search"
          />
        </div>

        {/* Method tabs */}
        <div className="recipes__tabs">
          {METHOD_TABS.map(m => (
            <button
              key={m}
              className={`recipes__tab ${activeMethod === m ? 'recipes__tab--active' : ''}`}
              onClick={() => setActiveMethod(m)}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Count */}
        {!isLoading && (
          <p className="recipes__count font-mono">
            총 {filtered.length}개의 레시피
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="recipes__grid">
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">🔍</span>
            <p>검색 결과가 없습니다</p>
            <button
              className="btn btn-secondary"
              onClick={() => { setSearchTerm(''); setActiveMethod('전체'); }}
            >
              검색 초기화
            </button>
          </div>
        ) : (
          <div className="recipes__grid">
            {filtered.map((c, i) => (
              <RecipeCard
                key={`${c.name}-${i}`}
                cocktail={c}
                onClick={setSelectedCocktail}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCocktail && (
        <CocktailModal cocktail={selectedCocktail} onClose={handleClose} />
      )}
    </div>
  );
}
