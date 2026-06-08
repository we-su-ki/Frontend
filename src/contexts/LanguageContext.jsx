// src/contexts/LanguageContext.jsx
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { getUIString, translateIngredientName, getFlavorLabel, translateCategory, translateRole, translateCocktailName, SUPPORTED_LANGUAGES } from '../i18n/translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'weski-lang';

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) return saved;
  } catch { /* ignore */ }
  return 'ko';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((code) => {
    setLangState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch { /* ignore */ }
  }, []);

  // 편의 함수들
  const t = useCallback((key) => getUIString(key, lang), [lang]);
  const tIng = useCallback((name) => translateIngredientName(name, lang), [lang]);
  const tFlavor = useCallback((key) => getFlavorLabel(key, lang), [lang]);
  const tCategory = useCallback((cat) => translateCategory(cat, lang), [lang]);
  const tRole = useCallback((role) => translateRole(role, lang), [lang]);
  const tCocktail = useCallback((name) => translateCocktailName(name, lang), [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t,          // UI 문자열
    tIng,       // 재료명 번역
    tFlavor,    // 맛 축 이름
    tCategory,  // 카테고리 번역
    tRole,      // 역할 번역
    tCocktail,  // 칵테일 이름 번역
    languages: SUPPORTED_LANGUAGES,
  }), [lang, setLang, t, tIng, tFlavor, tCategory, tRole, tCocktail]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
