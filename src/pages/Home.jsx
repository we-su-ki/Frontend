import { useNavigate } from 'react-router-dom';
import './Home.css';

const SERVICES = [
  {
    icon: '🥃',
    img: '/service_recommend.png',
    title: 'AI 칵테일 추천',
    desc: '원하는 느낌을 자연어로 말하면 Gemini AI가 맛 벡터로 분석해 가장 잘 맞는 칵테일을 추천해드려요',
    to: '/recommend',
    tag: 'RECOMMEND',
  },
  {
    icon: '🧪',
    img: '/service_predict.png',
    title: '나만의 레시피 만들기',
    desc: '재료를 선택하면 AI 모델이 어떤 맛의 칵테일이 완성될지 13가지 맛 축으로 예측해드려요',
    to: '/predict',
    tag: 'PREDICT',
  },
  {
    icon: '📖',
    img: '/service_recipes.png',
    title: '레시피 탐색',
    desc: '다양한 칵테일 레시피를 검색하고 제조 방법으로 필터링하며 나만의 칵테일을 찾아보세요',
    to: '/recipes',
    tag: 'RECIPES',
  },
];

const STEPS = [
  {
    num: '01',
    title: '느낌 입력',
    desc: '원하는 칵테일의 느낌을 자유롭게 텍스트로 입력합니다',
    iconKey: 'write',
  },
  {
    num: '02',
    title: 'AI 분석',
    desc: 'Gemini가 맛 벡터로 수치화하고 DB의 벡터와 유사도를 비교합니다',
    iconKey: 'analyze',
  },
  {
    num: '03',
    title: '추천 완료',
    desc: '당신의 취향에 최적화된 칵테일 리스트를 제시합니다',
    iconKey: 'done',
  },
];

function StepIcon({ iconKey }) {
  if (iconKey === 'write') return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="4" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="10" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="21" x2="17" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="23" r="5" fill="#C9922A" fillOpacity="0.15" stroke="#C9922A" strokeWidth="1.2"/>
      <line x1="24" y1="21" x2="24" y2="25" stroke="#C9922A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="22" y1="23" x2="26" y2="23" stroke="#C9922A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === 'analyze') return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="16" r="4" stroke="#C9922A" strokeWidth="1.5" fill="none"/>
      <line x1="16" y1="5" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="24" x2="16" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="5" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="24" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8.7" y1="8.7" x2="10.8" y2="10.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="21.2" y1="21.2" x2="23.3" y2="23.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M8 6 L8 20 Q8 26 16 26 Q24 26 24 20 L24 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <line x1="6" y1="6" x2="26" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="26" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="30" x2="21" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 13 L15 16 L20 10" stroke="#C9922A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* ─── Hero ─── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />

        <div className="hero__content">
          <p className="hero__tag animate-fade-in-up" style={{ animationDelay: '0s' }}>
            AI-POWERED COCKTAIL GUIDE
          </p>
          <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <span className="hero__title--primary">당신의 취향에 맞는</span>
            <br />
            <span className="hero__title--gold">칵테일을 찾아드립니다</span>
          </h1>
          <p className="hero__desc animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            원하는 느낌을 자유롭게 말해주세요. AI가 맛 벡터로 변환해 딱 맞는 칵테일을 추천해드립니다.
          </p>
          <div className="hero__btns animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <button className="btn btn-primary btn-lg hero__btn-main" onClick={() => navigate('/recommend')}>
              <span>칵테일 추천받기</span>
              <span className="hero__btn-arrow">→</span>
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/recipes')}>
              레시피 보기
            </button>
          </div>
        </div>

        <div className="hero__scroll animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="hero__scroll-line" />
          <div className="hero__scroll-arrow">↓</div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="services">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">WHAT WE OFFER</p>
            <h2 className="section-title">무엇을 도와드릴까요</h2>
            <div className="section-line" />
          </div>
          <div className="services__grid">
            {SERVICES.map(({ icon, img, title, desc, to, tag }) => (
              <div
                key={to}
                className="service-card card"
                onClick={() => navigate(to)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(to)}
              >
                <div className="service-card__img-wrap">
                  <img src={img} alt={title} className="service-card__img" />
                  <div className="service-card__img-overlay" />
                  <span className="service-card__tag font-mono">{tag}</span>
                </div>
                <div className="service-card__body">
                  <h3 className="service-card__title font-display">{title}</h3>
                  <p className="service-card__desc">{desc}</p>
                  <span className="service-card__cta">
                    자세히 보기 <span className="service-card__arrow">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="how">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">HOW IT WORKS</p>
            <h2 className="section-title">어떻게 작동하나요?</h2>
            <div className="section-line" />
          </div>
          <div className="how__steps">
            {STEPS.map((step, i) => (
              <div key={step.num} className="how__step-wrapper">
                <div className="how__step">
                  <div className="how__step-num font-mono">{step.num}</div>
                  <div className="how__step-icon how__step-icon--svg"><StepIcon iconKey={step.iconKey} /></div>
                  <h3 className="how__step-title font-display">{step.title}</h3>
                  <p className="how__step-desc">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="how__connector">
                    <div className="how__connector-line" />
                    <div className="how__connector-dot" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta">
        <div className="cta__glow" />
        <div className="cta__inner">
          <p className="cta__eyebrow font-mono">READY TO EXPLORE?</p>
          <h2 className="cta__title font-display">
            오늘 밤, 당신의 한 잔을<br />
            <span className="cta__title--gold">찾아보세요</span>
          </h2>
          <p className="cta__desc">취향을 말하면 AI가 완벽한 한 잔을 제안합니다</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/recommend')}
          >
            지금 시작하기 →
          </button>
        </div>
      </section>
    </div>
  );
}
