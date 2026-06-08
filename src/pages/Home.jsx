import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Home.css';

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
  const { t } = useLanguage();

  const services = [
    {
      icon: '🥃',
      img: '/service_recommend.png',
      title: t('home_service1_title'),
      desc: t('home_service1_desc'),
      to: '/recommend',
      tag: 'RECOMMEND',
    },
    {
      icon: '🧪',
      img: '/service_predict.png',
      title: t('home_service2_title'),
      desc: t('home_service2_desc'),
      to: '/predict',
      tag: 'PREDICT',
    },
    {
      icon: '📖',
      img: '/service_recipes.png',
      title: t('home_service3_title'),
      desc: t('home_service3_desc'),
      to: '/recipes',
      tag: 'RECIPES',
    },
  ];

  const steps = [
    {
      num: '01',
      title: t('home_step1_title'),
      desc: t('home_step1_desc'),
      iconKey: 'write',
    },
    {
      num: '02',
      title: t('home_step2_title'),
      desc: t('home_step2_desc'),
      iconKey: 'analyze',
    },
    {
      num: '03',
      title: t('home_step3_title'),
      desc: t('home_step3_desc'),
      iconKey: 'done',
    },
  ];

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
            {t('home_tag')}
          </p>
          <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <span className="hero__title--primary">{t('home_hero_1')}</span>
            <br />
            <span className="hero__title--gold">{t('home_hero_2')}</span>
          </h1>
          <p className="hero__desc animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {t('home_hero_desc')}
          </p>
          <div className="hero__btns animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <button className="btn btn-primary btn-lg hero__btn-main" onClick={() => navigate('/recommend')}>
              <span>{t('home_hero_btn')}</span>
              <span className="hero__btn-arrow">→</span>
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/recipes')}>
              {t('home_hero_btn2')}
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
            <h2 className="section-title">{t('home_section_offer')}</h2>
            <div className="section-line" />
          </div>
          <div className="services__grid">
            {services.map(({ icon, img, title, desc, to, tag }) => (
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
                    {t('home_detail_link')} <span className="service-card__arrow">→</span>
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
            <h2 className="section-title">{t('home_how_title')}</h2>
            <div className="section-line" />
          </div>
          <div className="how__steps">
            {steps.map((step, i) => (
              <div key={step.num} className="how__step-wrapper">
                <div className="how__step">
                  <div className="how__step-num font-mono">{step.num}</div>
                  <div className="how__step-icon how__step-icon--svg"><StepIcon iconKey={step.iconKey} /></div>
                  <h3 className="how__step-title font-display">{step.title}</h3>
                  <p className="how__step-desc">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
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
            {t('home_cta_title1')}<br />
            <span className="cta__title--gold">{t('home_cta_title2')}</span>
          </h2>
          <p className="cta__desc">{t('home_cta_desc')}</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/recommend')}
          >
            {t('home_cta_btn')}
          </button>
        </div>
      </section>
    </div>
  );
}
