// src/api.js
// 개발: VITE_API_BASE='' → Vite proxy가 /cocktails, /ingredients를 localhost:8080으로 포워딩
// 프로덕션: VITE_API_BASE=https://your-backend.com 으로 설정
// 백엔드 미연결 시 → mockData.js의 더미 데이터로 자동 폴백
import { MOCK_COCKTAILS, MOCK_INGREDIENTS, mockRecommend, mockPredict } from './mockData';

const BASE = import.meta.env.VITE_API_BASE ?? '';

// 3초 타임아웃 fetch
async function fetchWithTimeout(url, options = {}, timeout = 3000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

/* ── 칵테일 추천 (POST /cocktails/recommend) ── */
export async function recommendCocktails(query) {
  try {
    const res = await fetchWithTimeout(`${BASE}/cocktails/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
    return res.json();
  } catch {
    console.warn('[API] /cocktails/recommend 실패 → 더미 데이터 사용');
    // 0.5초 딜레이로 로딩 UX 시뮬레이션
    await new Promise(r => setTimeout(r, 600));
    return mockRecommend(query);
  }
}

/* ── 전체 칵테일 목록 (GET /cocktails) ── */
export async function fetchCocktails() {
  try {
    const res = await fetchWithTimeout(`${BASE}/cocktails`);
    if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
    return res.json();
  } catch {
    console.warn('[API] /cocktails 실패 → 더미 데이터 사용');
    return MOCK_COCKTAILS;
  }
}

/* ── 전체 재료 목록 (GET /ingredients) ── */
export async function fetchIngredients() {
  try {
    const res = await fetchWithTimeout(`${BASE}/ingredients`);
    if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
    return res.json();
  } catch {
    console.warn('[API] /ingredients 실패 → 더미 데이터 사용');
    return MOCK_INGREDIENTS;
  }
}

/* ── 맛 예측 (POST /ingredients/predict) ── */
export async function predictFlavors(ingredients, methodCategory) {
  try {
    const res = await fetchWithTimeout(`${BASE}/ingredients/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients, methodCategory }),
    });
    if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
    return res.json();
  } catch {
    console.warn('[API] /ingredients/predict 실패 → 더미 예측 사용');
    await new Promise(r => setTimeout(r, 800));
    return mockPredict(ingredients);
  }
}
