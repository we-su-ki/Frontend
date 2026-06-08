import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ServerStatus from './ServerStatus';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const langRef = useRef(null);
  const { lang, setLang, t, languages } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // 외부 클릭 시 언어 드롭다운 닫기
  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLang = languages.find(l => l.code === lang);

  const navLinks = [
    { to: '/', label: t('nav_home'), exact: true },
    { to: '/recommend', label: t('nav_recommend') },
    { to: '/predict', label: t('nav_predict') },
    { to: '/recipes', label: t('nav_recipes') },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-we">we</span>
          <span className="navbar__logo-colon">:</span>
          <span className="navbar__logo-suki">好き</span>
        </Link>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__right">
          {/* Language Selector */}
          <div className="lang-selector" ref={langRef}>
            <button
              className="lang-selector__trigger"
              onClick={() => setLangOpen(!langOpen)}
              aria-label="언어 선택"
              aria-expanded={langOpen}
            >
              <svg className="lang-selector__icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1.5" />
                <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="lang-selector__label">{currentLang?.flag} {currentLang?.label}</span>
              <svg className={`lang-selector__chevron ${langOpen ? 'lang-selector__chevron--open' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {langOpen && (
              <div className="lang-selector__dropdown">
                {languages.map(({ code, label, flag }) => (
                  <button
                    key={code}
                    className={`lang-selector__option ${lang === code ? 'lang-selector__option--active' : ''}`}
                    onClick={() => { setLang(code); setLangOpen(false); }}
                  >
                    <span className="lang-selector__option-flag">{flag}</span>
                    <span>{label}</span>
                    {lang === code && <span className="lang-selector__check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ServerStatus />
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 토글"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
