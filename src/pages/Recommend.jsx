import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import TasteRadarChart from '../components/TasteRadarChart';
import FlavorBar from '../components/FlavorBar';
import { recommendCocktails } from '../api';
import { FLAVOR_LABELS } from '../i18n/translations';
import './Recommend.css';

const CARD_COLORS = [
  ['#3D2008', '#C9922A'],
  ['#082030', '#2A7EC9'],
  ['#201808', '#C9A22A'],
  ['#200820', '#A22AC9'],
  ['#082018', '#2AC98C'],
];

function getCardGradient(name) {
  const idx = (name?.charCodeAt(0) ?? 0) % CARD_COLORS.length;
  const [bg, accent] = CARD_COLORS[idx];
  return `radial-gradient(ellipse at 25% 35%, ${accent}30 0%, ${bg} 60%, #0D0A07 100%)`;
}

function getTop3Flavors(tasteProfile, tFlavor) {
  if (!tasteProfile) return [];
  const flavorKeys = Object.keys(FLAVOR_LABELS.ko);
  return Object.entries(tasteProfile)
    .filter(([k]) => k !== 'abv' && flavorKeys.includes(k))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([k, v]) => ({ key: k, label: tFlavor(k), value: v }));
}

/* ─── Cocktail Detail Modal ─── */
function CocktailDetailModal({ cocktail, onClose, t, tFlavor, tCocktail }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);

  const flavorKeys = Object.keys(FLAVOR_LABELS.ko);
  const { name, imageUrl, glassRaw, garnishRaw, methodCategory,
          ingredients, tasteProfile, reviewText, sourceUrl, matchScore } = cocktail;
  const matchPct = Math.round((matchScore ?? 0) * 100);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={e => e.stopPropagation()}
           role="dialog" aria-modal="true" aria-label={`${name} ${t('recipes_detail_values')}`}>
        <button className="detail-close" onClick={onClose} aria-label={t('recipes_close')}>×</button>

        <div className="detail-img">
          {imageUrl
            ? <img src={imageUrl} alt={name} />
            : <div style={{ background: getCardGradient(name), width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', opacity: 0.3 }}>🍸</span>
              </div>
          }
          <div className="detail-img__fade" />
          {matchPct > 0 && <span className="badge detail-match">{t('recipes_match').replace('{n}', matchPct)}</span>}
        </div>

        <div className="detail-body">
          <h2 className="detail-name font-display">{tCocktail(name)}</h2>
          <div className="detail-meta">
            {methodCategory && <span className="badge badge-method">{methodCategory}</span>}
            {tasteProfile?.abv != null && <span className="badge">ABV {Number(tasteProfile.abv).toFixed(1)}%</span>}
          </div>

          {(glassRaw || garnishRaw) && (
            <div className="detail-info">
              {glassRaw && <div className="detail-info-row"><span className="detail-info-label">{t('recipes_glass')}</span><span>{glassRaw}</span></div>}
              {garnishRaw && <div className="detail-info-row"><span className="detail-info-label">{t('recipes_garnish')}</span><span>{garnishRaw}</span></div>}
            </div>
          )}

          <div className="detail-section-label">{t('recipes_ingredients')}</div>
          <ul className="detail-ingredients">
            {(ingredients ?? []).map((ing, i) => (
              <li key={i}><span>{ing.name}</span><span className="detail-ml font-mono">{ing.ml}{t('unit_ml')}</span></li>
            ))}
          </ul>

          <div className="detail-section-label">{t('recipes_taste_profile')}</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TasteRadarChart tasteProfile={tasteProfile ?? {}} size={230} />
          </div>

          <div className="detail-section-label">{t('recipes_detail_values')}</div>
          {flavorKeys.map((key, i) => (
            <FlavorBar key={key} name={tFlavor(key)} value={tasteProfile?.[key] ?? 0} max={10} delay={i * 0.04} />
          ))}

          {reviewText && <p className="detail-review">"{reviewText}"</p>}

          {sourceUrl && (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', marginTop: 16, justifyContent: 'center' }}>
              {t('recipes_source')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Compact cocktail result card (inside AI bubble) ─── */
function ResultCard({ cocktail, index, onDetail, t, tFlavor, tCocktail }) {
  const { name, imageUrl, methodCategory, tasteProfile, ingredients, matchScore } = cocktail;
  const matchPct = Math.round((matchScore ?? 0) * 100);
  const topFlavors = getTop3Flavors(tasteProfile, tFlavor);
  const topIngredients = (ingredients ?? []).slice(0, 3).map(i => i.name).join(' · ');

  return (
    <div
      className="result-card"
      style={{ animationDelay: `${index * 0.07}s` }}
      onClick={() => onDetail(cocktail)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onDetail(cocktail)}
    >
      <div className="result-card__img">
        {imageUrl
          ? <img src={imageUrl} alt={name} />
          : <div className="result-card__placeholder" style={{ background: getCardGradient(name) }}>
              <span>🍸</span>
            </div>
        }
        <div className="result-card__img-fade" />
        {matchPct > 0 && <span className="badge result-card__match">{matchPct}%</span>}
      </div>

      <div className="result-card__body">
        <h4 className="result-card__name font-display">{tCocktail(name)}</h4>
        {methodCategory && <span className="badge badge-method result-card__method">{methodCategory}</span>}
        {topIngredients && <p className="result-card__ings">{topIngredients}</p>}
        <div className="result-card__flavors">
          {topFlavors.map(({ key, label, value }) => (
            <div key={key} className="result-card__flavor">
              <span>{label}</span>
              <div className="result-card__flavor-bar">
                <div className="result-card__flavor-fill" style={{ width: `${(value / 10) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button className="result-card__detail-btn">{t('recommend_detail_btn')}</button>
      </div>
    </div>
  );
}

/* ─── Typing dots animation ─── */
function TypingDots() {
  return (
    <div className="typing-dots">
      <span /><span /><span />
    </div>
  );
}

/* ─── AI Avatar ─── */
function AIAvatar() {
  return (
    <div className="chat-avatar chat-avatar--ai">
      <span className="chat-avatar__logo-we">w</span>
      <span className="chat-avatar__logo-colon">:</span>
    </div>
  );
}

/* ─── Single chat message ─── */
function ChatMessage({ msg, onDetail, t, tFlavor, tCocktail }) {
  if (msg.role === 'user') {
    return (
      <div className="chat-row chat-row--user">
        <div className="chat-bubble chat-bubble--user">
          <p>{msg.content}</p>
        </div>
        <div className="chat-avatar chat-avatar--user">You</div>
      </div>
    );
  }

  return (
    <div className="chat-row chat-row--ai">
      <AIAvatar />
      <div className="chat-bubble chat-bubble--ai">
        {msg.loading ? (
          <TypingDots />
        ) : msg.error ? (
          <div className="chat-error">
            <span>⚠</span> {msg.error}
          </div>
        ) : (
          <>
            <p className="chat-intro">
              <span className="chat-intro__query">'{msg.query}'</span>{t('recommend_result_intro')}
              {msg.results?.length > 0 && (
                <span className="chat-intro__count font-mono"> — {t('recommend_result_count').replace('{n}', msg.results.length)}</span>
              )}
            </p>
            {msg.results?.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 8 }}>
                {t('recommend_no_result')}
              </p>
            ) : (
              <div className="chat-results">
                {msg.results.map((c, i) => (
                  <ResultCard key={`${c.name}-${i}`} cocktail={c} index={i} onDetail={onDetail} t={t} tFlavor={tFlavor} tCocktail={tCocktail} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Recommend() {
  const { t, tFlavor, tCocktail } = useLanguage();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detailCocktail, setDetailCocktail] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const chatAreaRef = useRef(null);

  const isEmpty = messages.length === 0;

  const examplePrompts = [
    { icon: '🍋', title: t('recommend_prompt1_title'), desc: t('recommend_prompt1_desc') },
    { icon: '🥃', title: t('recommend_prompt2_title'), desc: t('recommend_prompt2_desc') },
    { icon: '🌿', title: t('recommend_prompt3_title'), desc: t('recommend_prompt3_desc') },
    { icon: '🌑', title: t('recommend_prompt4_title'), desc: t('recommend_prompt4_desc') },
  ];

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [input]);

  const sendMessage = async (text) => {
    const q = (text ?? input).trim();
    if (!q || isLoading) return;

    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const userMsg = { id: Date.now(), role: 'user', content: q };
    const aiMsgId = Date.now() + 1;
    const loadingMsg = { id: aiMsgId, role: 'ai', loading: true, query: q };

    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setIsLoading(true);

    try {
      const data = await recommendCocktails(q);

      setMessages(prev => prev.map(m =>
        m.id === aiMsgId
          ? { ...m, loading: false, results: data }
          : m
      ));
    } catch (err) {
      setMessages(prev => prev.map(m =>
        m.id === aiMsgId
          ? { ...m, loading: false, error: err.message || t('recommend_error') }
          : m
      ));
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleDetailClose = useCallback(() => setDetailCocktail(null), []);

  return (
    <div className="chat-page">

      {/* ─── Welcome Screen (empty state) ─── */}
      {isEmpty && (
        <div className="chat-welcome">
          <div className="chat-welcome__logo">
            <div className="chat-welcome__logo-icon">🍸</div>
            <h1 className="chat-welcome__title font-display">
              {t('recommend_welcome')}
            </h1>
            <p className="chat-welcome__sub">
              {t('recommend_welcome_sub').split('\\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
          </div>

          <div className="chat-welcome__prompts">
            {examplePrompts.map(({ icon, title, desc }) => (
              <button
                key={title}
                className="chat-prompt-card"
                onClick={() => sendMessage(title)}
                disabled={isLoading}
              >
                <span className="chat-prompt-card__icon">{icon}</span>
                <span className="chat-prompt-card__title">{title}</span>
                <span className="chat-prompt-card__desc">{desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Chat Messages ─── */}
      {!isEmpty && (
        <div className="chat-messages" ref={chatAreaRef}>
          <div className="chat-messages__inner">
            {messages.map(msg => (
              <ChatMessage key={msg.id} msg={msg} onDetail={setDetailCocktail} t={t} tFlavor={tFlavor} tCocktail={tCocktail} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* ─── Fixed Bottom Input ─── */}
      <div className={`chat-input-area ${isEmpty ? 'chat-input-area--centered' : ''}`}>
        <div className="chat-input-wrap">
          <div className="chat-input-box">
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('recommend_placeholder')}
              rows={1}
              disabled={isLoading}
            />
            <button
              className={`chat-send-btn ${input.trim() && !isLoading ? 'chat-send-btn--active' : ''}`}
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              aria-label="Send"
            >
              {isLoading ? (
                <span className="spinner" style={{ width: 16, height: 16 }} />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
          <p className="chat-hint">{t('recommend_hint')}</p>
        </div>
      </div>

      {/* ─── Detail Modal ─── */}
      {detailCocktail && (
        <CocktailDetailModal cocktail={detailCocktail} onClose={handleDetailClose} t={t} tFlavor={tFlavor} tCocktail={tCocktail} />
      )}
    </div>
  );
}
