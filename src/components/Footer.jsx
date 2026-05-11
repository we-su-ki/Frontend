import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
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
          <Link to="/recommend" className="footer__link">추천</Link>
          <Link to="/predict" className="footer__link">예측</Link>
          <Link to="/recipes" className="footer__link">레시피</Link>
        </nav>
      </div>
    </footer>
  );
}
