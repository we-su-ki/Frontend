import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__logo">
          <span className="footer__logo-we">we</span>
          <span className="footer__logo-colon">:</span>
          <span className="footer__logo-suki">好き</span>
        </div>
        <p className="footer__copy">© 2025 we:好き — AI Cocktail Guide</p>
        <nav className="footer__nav">
          <Link to="/recommend" className="footer__link">{t('footer_recommend')}</Link>
          <Link to="/predict" className="footer__link">{t('footer_predict')}</Link>
          <Link to="/recipes" className="footer__link">{t('footer_recipes')}</Link>
        </nav>
      </div>
    </footer>
  );
}
