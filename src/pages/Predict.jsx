import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import TasteRadarChart from '../components/TasteRadarChart';
import FlavorBar from '../components/FlavorBar';
import { fetchIngredients, predictFlavors } from '../api';
import { FLAVOR_LABELS } from '../i18n/translations';
import './Predict.css';

const METHODS = ['NONE', 'Shake', 'Stir', 'Build', 'Blend', 'Float'];

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

/* ─── Ingredient Detail Modal ─── */
function IngredientDetailModal({ ingredient, onClose, onAdd, isAdded, lang, t, tIng, tFlavor, tCategory, tRole }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!ingredient) return null;

  const { name, category, role, isAlcohol, tier, frequency, flavorTags, tasteProfile } = ingredient;
  const flavorKeys = Object.keys(FLAVOR_LABELS.ko);

  return (
    <div className="ing-modal-overlay" onClick={onClose}>
      <div className="ing-modal-panel" onClick={e => e.stopPropagation()}
           role="dialog" aria-modal="true" aria-label={`${tIng(name)} ${t('ing_detail_taste_profile')}`}>
        <button className="ing-modal-close" onClick={onClose} aria-label={t('ing_detail_close')}>×</button>

        {/* Header */}
        <div className="ing-modal-header">
          <div className="ing-modal-icon-wrap">
            {isAlcohol
              ? <span className="ing-modal-icon">🥃</span>
              : <span className="ing-modal-icon">🧊</span>
            }
          </div>
          <h2 className="ing-modal-name font-display">{tIng(name)}</h2>
          <p className="ing-modal-original">{name}</p>
        </div>

        <div className="ing-modal-body">
          {/* Meta info */}
          <div className="ing-modal-meta">
            {category && (
              <div className="ing-modal-meta-item">
                <span className="ing-modal-meta-label">{t('ing_detail_category')}</span>
                <span className="badge badge-method">{tCategory(category)}</span>
              </div>
            )}
            {role && (
              <div className="ing-modal-meta-item">
                <span className="ing-modal-meta-label">{t('ing_detail_role')}</span>
                <span className="badge badge-method">{tRole(role)}</span>
              </div>
            )}
            <div className="ing-modal-meta-item">
              <span className="ing-modal-meta-label">{t('ing_detail_alcohol')}</span>
              <span className={`badge ${isAlcohol ? '' : 'badge-method'}`}>
                {isAlcohol ? t('ing_detail_yes') : t('ing_detail_no')}
              </span>
            </div>
            {tier != null && (
              <div className="ing-modal-meta-item">
                <span className="ing-modal-meta-label">{t('ing_detail_tier')}</span>
                <span className="badge badge-method">{'★'.repeat(tier)}</span>
              </div>
            )}
            {frequency != null && (
              <div className="ing-modal-meta-item">
                <span className="ing-modal-meta-label">{t('ing_detail_frequency')}</span>
                <span className="ing-modal-freq font-mono">{frequency}{t('ing_detail_times')}</span>
              </div>
            )}
          </div>

          {/* Flavor Tags */}
          {flavorTags && flavorTags.length > 0 && (
            <>
              <div className="ing-modal-section-label">{t('ing_detail_flavor_tags')}</div>
              <div className="ing-modal-tags">
                {flavorTags.map(tag => (
                  <span key={tag} className="ing-modal-tag">#{tag}</span>
                ))}
              </div>
            </>
          )}

          {/* Taste Profile Radar */}
          {tasteProfile && (
            <>
              <div className="ing-modal-section-label">{t('ing_detail_taste_profile')}</div>
              <div className="ing-modal-radar">
                <TasteRadarChart tasteProfile={tasteProfile} size={220} />
              </div>

              <div className="ing-modal-section-label">{t('ing_detail_taste_values')}</div>
              <div className="ing-modal-bars">
                {flavorKeys.map((key, i) => (
                  <FlavorBar
                    key={key}
                    name={tFlavor(key)}
                    value={tasteProfile[key] ?? 0}
                    max={10}
                    delay={i * 0.04}
                  />
                ))}
              </div>
            </>
          )}

          {/* Add button */}
          <button
            className={`btn ${isAdded ? 'btn-secondary' : 'btn-primary'} btn-full`}
            style={{ marginTop: 20 }}
            onClick={() => { if (!isAdded) onAdd(ingredient); onClose(); }}
            disabled={isAdded}
          >
            {isAdded ? t('ing_detail_added') : t('ing_detail_add')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Predict() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, t, tIng, tFlavor, tCategory, tRole } = useLanguage();

  const [allIngredients, setAllIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [method, setMethod] = useState('NONE');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredientsLoading, setIngredientsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailIngredient, setDetailIngredient] = useState(null);

  const flavorKeys = Object.keys(FLAVOR_LABELS.ko);

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

  const filtered = allIngredients.filter(ing => {
    const term = searchTerm.toLowerCase();
    // 영문 이름 또는 번역된 이름으로 검색
    return ing.name.toLowerCase().includes(term) ||
           tIng(ing.name).toLowerCase().includes(term);
  });

  const isSelected = (id) => selected.some(s => s.id === id);

  const toggleIngredient = (ing) => {
    if (isSelected(ing.id)) {
      setSelected(s => s.filter(x => x.id !== ing.id));
    } else {
      setSelected(s => [...s, { id: ing.id, name: ing.name, amount: 30 }]);
    }
  };

  const addIngredientFromModal = (ing) => {
    if (!isSelected(ing.id)) {
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
      setError(err.message || t('predict_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDetail = useCallback(() => setDetailIngredient(null), []);

  return (
    <div className="predict">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title font-display">{t('predict_title')}</h1>
          <p className="page-subtitle">{t('predict_subtitle')}</p>
        </div>

        <div className="predict__layout">
          {/* ─── Left Panel ─── */}
          <div className="predict__left">
            {/* Ingredient search */}
            <div className="predict__section">
              <label className="predict__label">{t('predict_search_label')}</label>
              <input
                className="input"
                type="text"
                placeholder={t('predict_search')}
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
                <p className="predict__no-result">{t('predict_no_result')}</p>
              ) : (
                filtered.map(ing => (
                  <div
                    key={ing.id}
                    className={`predict__ing-row ${isSelected(ing.id) ? 'predict__ing-row--selected' : ''}`}
                  >
                    <span className="predict__ing-name" title={ing.name}>
                      {tIng(ing.name)}
                      {lang !== 'en' && (
                        <span className="predict__ing-original">{ing.name}</span>
                      )}
                    </span>
                    <div className="predict__ing-actions">
                      <button
                        className="predict__ing-btn predict__ing-btn--detail"
                        onClick={() => setDetailIngredient(ing)}
                        aria-label={`${tIng(ing.name)} 상세보기`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="7" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </button>
                      <button
                        className={`predict__ing-btn ${isSelected(ing.id) ? 'predict__ing-btn--remove' : ''}`}
                        onClick={() => toggleIngredient(ing)}
                        aria-label={isSelected(ing.id) ? `${tIng(ing.name)} 제거` : `${tIng(ing.name)} 추가`}
                      >
                        {isSelected(ing.id) ? '−' : '+'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Selected ingredients */}
            <div className="predict__section predict__selected">
              <label className="predict__label">
                {t('predict_selected')} ({selected.length}{t('predict_count')})
              </label>
              {selected.length === 0 ? (
                <p className="predict__hint">{t('predict_hint')}</p>
              ) : (
                <div className="predict__selected-list">
                  {selected.map(s => (
                    <div key={s.id} className="predict__selected-row">
                      <span className="predict__selected-name">{tIng(s.name)}</span>
                      <div className="predict__selected-controls">
                        <input
                          type="number"
                          className="predict__ml-input"
                          min={1}
                          value={s.amount}
                          onChange={e => updateAmount(s.id, e.target.value)}
                        />
                        <span className="predict__ml-label">{t('unit_ml')}</span>
                        <button
                          className="predict__remove-btn"
                          onClick={() => removeIngredient(s.id)}
                          aria-label={`${tIng(s.name)} 제거`}
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
              <label className="predict__label">{t('predict_method_label')}</label>
              <div className="predict__methods">
                {METHODS.map(m => (
                  <button
                    key={m}
                    className={`predict__method-pill ${method === m ? 'predict__method-pill--active' : ''}`}
                    onClick={() => setMethod(m)}
                  >
                    {m === 'NONE' ? t('predict_method_none') : m}
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
                <><span className="spinner" style={{ width: 18, height: 18 }} /> {t('predict_btn_loading')}</>
              ) : t('predict_btn')}
            </button>
          </div>

          {/* ─── Right Panel ─── */}
          <div className="predict__right">
            <div className="predict__result-panel">
              {/* Initial */}
              {!isLoading && !prediction && !error && (
                <div className="empty-state">
                  <EmptyGlass />
                  <p style={{ marginTop: 16 }}>{t('predict_empty')}</p>
                </div>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="empty-state">
                  <span className="spinner" style={{ width: 40, height: 40 }} />
                  <p className="font-mono" style={{ color: 'var(--accent-gold)', marginTop: 20, fontSize: '0.85rem' }}>
                    {t('predict_loading')}
                  </p>
                </div>
              )}

              {/* Error */}
              {!isLoading && error && (
                <div className="error-state">
                  <p>{t('predict_error')}</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{error}</p>
                </div>
              )}

              {/* Result */}
              {!isLoading && prediction && (
                <div className="predict__result">
                  <div className="predict__result-header">
                    <h2 className="predict__result-title font-display">{t('predict_result_title')}</h2>
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
                    <span>{t('predict_detail_values')}</span>
                  </div>

                  <div className="predict__bars">
                    {flavorKeys.map((key, i) => (
                      <FlavorBar
                        key={key}
                        name={tFlavor(key)}
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
                    {t('predict_go_recipes')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Ingredient Detail Modal ─── */}
      {detailIngredient && (
        <IngredientDetailModal
          ingredient={detailIngredient}
          onClose={handleCloseDetail}
          onAdd={addIngredientFromModal}
          isAdded={isSelected(detailIngredient.id)}
          lang={lang}
          t={t}
          tIng={tIng}
          tFlavor={tFlavor}
          tCategory={tCategory}
          tRole={tRole}
        />
      )}
    </div>
  );
}
