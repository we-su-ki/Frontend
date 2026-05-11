import { useState, useRef, useEffect, useCallback } from 'react';
import TasteRadarChart from '../components/TasteRadarChart';
import FlavorBar from '../components/FlavorBar';
import { recommendCocktails } from '../api';
import './Recommend.css';

const EXAMPLE_PROMPTS = [
  { icon: '🍋', title: '달콤하고 상큼한', desc: '과일향이 나는 가벼운 칵테일' },
  { icon: '🥃', title: '스모키하고 드라이한', desc: '위스키 베이스의 강한 풍미' },
  { icon: '🌿', title: '가볍고 청량한', desc: '탄산감 있는 상쾌한 한 잔' },
  { icon: '🌑', title: '묵직하고 강한', desc: '알코올감이 느껴지는 진한 맛' },
];

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

function getTop3Flavors(tasteProfile) {
  if (!tasteProfile) return [];
  const FLAVOR_KO = {
    sweetness: '단맛', sourness: '신맛', bitterness: '쓴맛',
    umamiSalty: '감칠맛', fruity: '과일향', citrus: '시트러스',
    floral: '꽃향', herbal: '허브향', spicy: '스파이시',
    woodySmoky: '우디/스모키', body: '바디감', fizzy: '청량감',
  };
  return Object.entries(tasteProfile)
    .filter(([k]) => k !== 'abv' && FLAVOR_KO[k])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([k, v]) => ({ key: k, label: FLAVOR_KO[k], value: v }));
}

/* ─── Cocktail Detail Modal ─── */
function CocktailDetailModal({ cocktail, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);

  const FLAVOR_KO = {
    sweetness: '단맛', sourness: '신맛', bitterness: '쓴맛',
    umamiSalty: '감칠맛', fruity: '과일향', citrus: '시트러스',
    floral: '꽃향', herbal: '허브향', spicy: '스파이시',
    woodySmoky: '우디/스모키', body: '바디감', fizzy: '청량감',
  };

  const { name, imageUrl, glassRaw, garnishRaw, methodCategory,
          ingredients, tasteProfile, reviewText, sourceUrl, matchScore } = cocktail;
  const matchPct = Math.round((matchScore ?? 0) * 100);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={e => e.stopPropagation()}
           role="dialog" aria-modal="true" aria-label={`${name} 상세`}>
        <button className="detail-close" onClick={onClose} aria-label="닫기">×</button>

        <div className="detail-img">
          {imageUrl
            ? <img src={imageUrl} alt={name} />
            : <div style={{ background: getCardGradient(name), width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', opacity: 0.3 }}>🍸</span>
              </div>
          }
          <div className="detail-img__fade" />
          {matchPct > 0 && <span className="badge detail-match">{matchPct}% 일치</span>}
        </div>

        <div className="detail-body">
          <h2 className="detail-name font-display">{name}</h2>
          <div className="detail-meta">
            {methodCategory && <span className="badge badge-method">{methodCategory}</span>}
            {tasteProfile?.abv != null && <span className="badge">ABV {Number(tasteProfile.abv).toFixed(1)}%</span>}
          </div>

          {(glassRaw || garnishRaw) && (
            <div className="detail-info">
              {glassRaw && <div className="detail-info-row"><span className="detail-info-label">글라스</span><span>{glassRaw}</span></div>}
              {garnishRaw && <div className="detail-info-row"><span className="detail-info-label">가니쉬</span><span>{garnishRaw}</span></div>}
            </div>
          )}

          <div className="detail-section-label">재료</div>
          <ul className="detail-ingredients">
            {(ingredients ?? []).map((ing, i) => (
              <li key={i}><span>{ing.name}</span><span className="detail-ml font-mono">{ing.ml}ml</span></li>
            ))}
          </ul>

          <div className="detail-section-label">맛 프로필</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TasteRadarChart tasteProfile={tasteProfile ?? {}} size={230} />
          </div>

          <div className="detail-section-label">수치 상세</div>
          {Object.entries(FLAVOR_KO).map(([key, label], i) => (
            <FlavorBar key={key} name={label} value={tasteProfile?.[key] ?? 0} max={10} delay={i * 0.04} />
          ))}

          {reviewText && <p className="detail-review">"{reviewText}"</p>}

          {sourceUrl && (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', marginTop: 16, justifyContent: 'center' }}>
              원본 레시피 보기 →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Compact cocktail result card (inside AI bubble) ─── */
function ResultCard({ cocktail, index, onDetail }) {
  const { name, imageUrl, methodCategory, tasteProfile, ingredients, matchScore } = cocktail;
  const matchPct = Math.round((matchScore ?? 0) * 100);
  const topFlavors = getTop3Flavors(tasteProfile);
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
        <h4 className="result-card__name font-display">{name}</h4>
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
        <button className="result-card__detail-btn">상세 보기 →</button>
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
function ChatMessage({ msg, onDetail }) {
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
              <span className="chat-intro__query">'{msg.query}'</span>에 대한 추천 결과입니다.
              {msg.results?.length > 0 && (
                <span className="chat-intro__count font-mono"> — {msg.results.length}개 발견</span>
              )}
            </p>
            {msg.results?.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 8 }}>
                검색 결과가 없습니다. 다른 표현으로 시도해보세요.
              </p>
            ) : (
              <div className="chat-results">
                {msg.results.map((c, i) => (
                  <ResultCard key={`${c.name}-${i}`} cocktail={c} index={i} onDetail={onDetail} />
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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detailCocktail, setDetailCocktail] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const chatAreaRef = useRef(null);

  const isEmpty = messages.length === 0;

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
          ? { ...m, loading: false, error: err.message || '추천을 불러오지 못했습니다.' }
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
              어떤 칵테일을 찾고 계신가요?
            </h1>
            <p className="chat-welcome__sub">
              원하는 느낌, 분위기, 맛을 자유롭게 말해주세요.<br />
              AI가 맛 벡터로 분석해 딱 맞는 칵테일을 추천해드립니다.
            </p>
          </div>

          <div className="chat-welcome__prompts">
            {EXAMPLE_PROMPTS.map(({ icon, title, desc }) => (
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
              <ChatMessage key={msg.id} msg={msg} onDetail={setDetailCocktail} />
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
              placeholder="원하는 느낌을 자유롭게 입력하세요..."
              rows={1}
              disabled={isLoading}
            />
            <button
              className={`chat-send-btn ${input.trim() && !isLoading ? 'chat-send-btn--active' : ''}`}
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              aria-label="전송"
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
          <p className="chat-hint">Enter로 전송 · Shift+Enter로 줄바꿈</p>
        </div>
      </div>

      {/* ─── Detail Modal ─── */}
      {detailCocktail && (
        <CocktailDetailModal cocktail={detailCocktail} onClose={handleDetailClose} />
      )}
    </div>
  );
}
