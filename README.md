# we:好き — AI 칵테일 가이드 Frontend

> React + Vite 기반의 AI 칵테일 추천 서비스 프론트엔드

![we:好き](https://img.shields.io/badge/we%3A好き-AI%20칵테일%20가이드-C9922A?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)

## 📦 연관 레포지토리

| 레포 | 설명 |
|---|---|
| [we-su-ki/backend](https://github.com/we-su-ki/backend) | Spring Boot 백엔드 (포트 8080) |
| [we-su-ki/whiskey-model](https://github.com/we-su-ki/whiskey-model) | Python FastAPI 맛 예측 모델 (포트 8000) |
| **[we-su-ki/Frontend](https://github.com/we-su-ki/Frontend)** | **React 프론트엔드 (현재 레포)** |

---

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 백엔드 연결 설정

`.env` 파일에서 API 경로 설정:

```env
# 로컬 개발 (Vite proxy 사용) — 기본값
VITE_API_BASE=

# 외부 백엔드 서버 사용 시
# VITE_API_BASE=https://your-backend-url.com
```

> **백엔드가 없어도 작동합니다!** 백엔드 미연결 시 더미 데이터로 자동 폴백됩니다.

---

## 🏗️ 프로젝트 구조

```
src/
├── api.js              # 백엔드 API 클라이언트 (폴백 포함)
├── mockData.js         # 더미 데이터 (오프라인 테스트용)
├── components/
│   ├── Navbar.jsx      # 상단 네비게이션 + 서버 상태 표시
│   ├── ServerStatus.jsx # 실시간 백엔드 연결 상태 배지
│   ├── TasteRadarChart.jsx # 맛 프로필 레이더 차트
│   └── FlavorBar.jsx   # 맛 강도 바
└── pages/
    ├── Home.jsx        # 홈 페이지
    ├── Recommend.jsx   # AI 칵테일 추천 (채팅 UI)
    ├── Predict.jsx     # 나만의 레시피 만들기
    └── Recipes.jsx     # 레시피 탐색
```

---

## 🔌 백엔드 API 연동

Vite 프록시를 통해 CORS 없이 백엔드 연결:

```js
// vite.config.js
proxy: {
  '/cocktails': 'http://localhost:8080',
  '/ingredients': 'http://localhost:8080',
}
```

### API 엔드포인트

| Method | Path | 설명 |
|---|---|---|
| GET | `/cocktails` | 전체 칵테일 목록 |
| POST | `/cocktails/recommend` | AI 자연어 칵테일 추천 |
| GET | `/ingredients` | 전체 재료 목록 |
| POST | `/ingredients/predict` | 재료 기반 맛 프로필 예측 |

---

## 🎨 디자인 시스템

어두운 위스키 바 콘셉트 — 앰버 골드 강조 색상

```css
--bg-primary: #0D0A07;
--accent-gold: #C9922A;
--accent-orange: #E05C1A;
--text-primary: #F2EBD9;
```

**폰트**: Playfair Display (제목) · DM Sans (본문) · DM Mono (숫자/배지)

---

## 📋 전체 스택 실행 순서

```bash
# 1. Python 모델 서버 (포트 8000)
cd whiskey-model
pip install -r requirements.txt
python ai-engine/main.py

# 2. Spring Boot 백엔드 (포트 8080)
cd backend
./gradlew bootRun

# 3. React 프론트엔드 (포트 5173)
cd Frontend
npm install && npm run dev
```
