// src/i18n/translations.js
// 다국어 번역 시스템
// 백엔드가 번역 API를 제공하면 이 파일의 fallback 맵 대신 API 응답을 우선 사용

export const SUPPORTED_LANGUAGES = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

// ─── UI 문자열 번역 ───
const UI_STRINGS = {
  ko: {
    // Navbar
    nav_home: '홈',
    nav_recommend: '칵테일 추천',
    nav_predict: '레시피 만들기',
    nav_recipes: '레시피',
    server_live: 'LIVE',
    server_offline: 'OFFLINE',

    // Predict page
    predict_title: '나만의 레시피 만들기',
    predict_subtitle: '재료를 선택하면 AI가 맛 프로필을 예측해드립니다. 나만의 조합을 실험해보세요.',
    predict_search: '재료 검색...',
    predict_search_label: '재료 검색',
    predict_no_result: '검색 결과가 없습니다',
    predict_selected: '선택된 재료',
    predict_count: '개',
    predict_hint: '재료를 선택해주세요',
    predict_method_label: '제조 방법',
    predict_method_none: '선택안함',
    predict_btn: '맛 예측하기',
    predict_btn_loading: 'AI 분석 중...',
    predict_empty: '재료를 선택하고 맛을 예측해보세요',
    predict_loading: 'AI 모델이 맛을 분석하고 있습니다...',
    predict_error: '예측 결과를 불러오지 못했습니다.',
    predict_result_title: '예측 결과',
    predict_detail_values: '상세 수치',
    predict_go_recipes: '레시피 탐색하기 →',

    // Ingredient detail modal
    ing_detail_category: '카테고리',
    ing_detail_role: '역할',
    ing_detail_alcohol: '알코올',
    ing_detail_yes: '있음',
    ing_detail_no: '없음',
    ing_detail_tier: '등급',
    ing_detail_frequency: '사용 빈도',
    ing_detail_times: '회',
    ing_detail_flavor_tags: '풍미 태그',
    ing_detail_taste_profile: '맛 프로필',
    ing_detail_taste_values: '수치 상세',
    ing_detail_add: '이 재료 추가하기',
    ing_detail_added: '이미 추가됨',
    ing_detail_close: '닫기',

    // Recipes page
    recipes_title: '칵테일 레시피',
    recipes_search: '칵테일 이름 또는 재료로 검색...',
    recipes_all: '전체',
    recipes_count: '총 {n}개의 레시피',
    recipes_more: '+{n}가지',
    recipes_no_result: '검색 결과가 없습니다',
    recipes_reset: '검색 초기화',
    recipes_glass: '글라스',
    recipes_garnish: '가니쉬',
    recipes_ingredients: '재료',
    recipes_taste_profile: '맛 프로필',
    recipes_detail_values: '수치 상세',
    recipes_source: '원본 레시피 보기 →',
    recipes_predict_btn: '이 재료로 맛 예측하기',
    recipes_match: '{n}% 일치',
    recipes_close: '닫기',
    recipes_detail_btn: '상세 보기 →',

    // Home page
    home_tag: 'AI-POWERED COCKTAIL GUIDE',
    home_hero_1: '당신의 취향에 맞는',
    home_hero_2: '칵테일을 찾아드립니다',
    home_hero_desc: '원하는 느낌을 자유롭게 말해주세요. AI가 맛 벡터로 변환해 딱 맞는 칵테일을 추천해드립니다.',
    home_hero_btn: '칵테일 추천받기',
    home_hero_btn2: '레시피 보기',
    home_section_offer: '무엇을 도와드릴까요',
    home_service1_title: 'AI 칵테일 추천',
    home_service1_desc: '원하는 느낌을 자연어로 말하면 Gemini AI가 맛 벡터로 분석해 가장 잘 맞는 칵테일을 추천해드려요',
    home_service2_title: '나만의 레시피 만들기',
    home_service2_desc: '재료를 선택하면 AI 모델이 어떤 맛의 칵테일이 완성될지 13가지 맛 축으로 예측해드려요',
    home_service3_title: '레시피 탐색',
    home_service3_desc: '다양한 칵테일 레시피를 검색하고 제조 방법으로 필터링하며 나만의 칵테일을 찾아보세요',
    home_detail_link: '자세히 보기',
    home_how_title: '어떻게 작동하나요?',
    home_step1_title: '느낌 입력',
    home_step1_desc: '원하는 칵테일의 느낌을 자유롭게 텍스트로 입력합니다',
    home_step2_title: 'AI 분석',
    home_step2_desc: 'Gemini가 맛 벡터로 수치화하고 DB의 벡터와 유사도를 비교합니다',
    home_step3_title: '추천 완료',
    home_step3_desc: '당신의 취향에 최적화된 칵테일 리스트를 제시합니다',
    home_cta_title1: '오늘 밤, 당신의 한 잔을',
    home_cta_title2: '찾아보세요',
    home_cta_desc: '취향을 말하면 AI가 완벽한 한 잔을 제안합니다',
    home_cta_btn: '지금 시작하기 →',

    // Recommend page
    recommend_welcome: '어떤 칵테일을 찾고 계신가요?',
    recommend_welcome_sub: '원하는 느낌, 분위기, 맛을 자유롭게 말해주세요.\nAI가 맛 벡터로 분석해 딱 맞는 칵테일을 추천해드립니다.',
    recommend_prompt1_title: '달콤하고 상큼한',
    recommend_prompt1_desc: '과일향이 나는 가벼운 칵테일',
    recommend_prompt2_title: '스모키하고 드라이한',
    recommend_prompt2_desc: '위스키 베이스의 강한 풍미',
    recommend_prompt3_title: '가볍고 청량한',
    recommend_prompt3_desc: '탄산감 있는 상쾌한 한 잔',
    recommend_prompt4_title: '묵직하고 강한',
    recommend_prompt4_desc: '알코올감이 느껴지는 진한 맛',
    recommend_placeholder: '원하는 느낌을 자유롭게 입력하세요...',
    recommend_hint: 'Enter로 전송 · Shift+Enter로 줄바꿈',
    recommend_result_intro: "에 대한 추천 결과입니다.",
    recommend_result_count: '{n}개 발견',
    recommend_no_result: '검색 결과가 없습니다. 다른 표현으로 시도해보세요.',
    recommend_error: '추천을 불러오지 못했습니다.',
    recommend_detail_btn: '상세 보기 →',

    // Footer
    footer_recommend: '추천',
    footer_predict: '예측',
    footer_recipes: '레시피',

    // Common
    unit_ml: 'ml',
  },
  en: {
    nav_home: 'Home',
    nav_recommend: 'Recommend',
    nav_predict: 'Create Recipe',
    nav_recipes: 'Recipes',
    server_live: 'LIVE',
    server_offline: 'OFFLINE',

    predict_title: 'Create Your Recipe',
    predict_subtitle: 'Select ingredients and our AI will predict the flavor profile. Experiment with your own combinations.',
    predict_search: 'Search ingredients...',
    predict_search_label: 'Search Ingredients',
    predict_no_result: 'No results found',
    predict_selected: 'Selected Ingredients',
    predict_count: '',
    predict_hint: 'Please select ingredients',
    predict_method_label: 'Method',
    predict_method_none: 'None',
    predict_btn: 'Predict Flavor',
    predict_btn_loading: 'Analyzing...',
    predict_empty: 'Select ingredients and predict the flavor',
    predict_loading: 'AI model is analyzing the flavor...',
    predict_error: 'Failed to load prediction results.',
    predict_result_title: 'Prediction Result',
    predict_detail_values: 'Detailed Values',
    predict_go_recipes: 'Explore Recipes →',

    ing_detail_category: 'Category',
    ing_detail_role: 'Role',
    ing_detail_alcohol: 'Alcohol',
    ing_detail_yes: 'Yes',
    ing_detail_no: 'No',
    ing_detail_tier: 'Tier',
    ing_detail_frequency: 'Frequency',
    ing_detail_times: 'uses',
    ing_detail_flavor_tags: 'Flavor Tags',
    ing_detail_taste_profile: 'Taste Profile',
    ing_detail_taste_values: 'Detailed Values',
    ing_detail_add: 'Add this ingredient',
    ing_detail_added: 'Already added',
    ing_detail_close: 'Close',

    recipes_title: 'Cocktail Recipes',
    recipes_search: 'Search by cocktail name or ingredient...',
    recipes_all: 'All',
    recipes_count: '{n} recipes found',
    recipes_more: '+{n} more',
    recipes_no_result: 'No results found',
    recipes_reset: 'Reset Search',
    recipes_glass: 'Glass',
    recipes_garnish: 'Garnish',
    recipes_ingredients: 'Ingredients',
    recipes_taste_profile: 'Taste Profile',
    recipes_detail_values: 'Detailed Values',
    recipes_source: 'View Original Recipe →',
    recipes_predict_btn: 'Predict Flavor with These',
    recipes_match: '{n}% Match',
    recipes_close: 'Close',
    recipes_detail_btn: 'View Details →',

    home_tag: 'AI-POWERED COCKTAIL GUIDE',
    home_hero_1: 'Find the Perfect',
    home_hero_2: 'Cocktail for You',
    home_hero_desc: 'Tell us what you\'re in the mood for. Our AI analyzes flavor vectors to recommend the perfect cocktail.',
    home_hero_btn: 'Get Recommendations',
    home_hero_btn2: 'Browse Recipes',
    home_section_offer: 'What We Offer',
    home_service1_title: 'AI Cocktail Recommendation',
    home_service1_desc: 'Describe your mood in natural language and Gemini AI will analyze flavor vectors to find the best cocktails for you',
    home_service2_title: 'Create Your Own Recipe',
    home_service2_desc: 'Select ingredients and our AI model predicts the flavor profile across 13 taste axes',
    home_service3_title: 'Explore Recipes',
    home_service3_desc: 'Search cocktail recipes, filter by method, and discover your next favorite drink',
    home_detail_link: 'Learn More',
    home_how_title: 'How It Works',
    home_step1_title: 'Describe',
    home_step1_desc: 'Freely describe the cocktail feeling you want in text',
    home_step2_title: 'AI Analysis',
    home_step2_desc: 'Gemini quantifies into flavor vectors and compares similarity with our DB',
    home_step3_title: 'Results',
    home_step3_desc: 'Get a curated list of cocktails optimized for your taste',
    home_cta_title1: 'Find Your Perfect',
    home_cta_title2: 'Drink Tonight',
    home_cta_desc: 'Tell us your taste and AI will suggest the perfect drink',
    home_cta_btn: 'Get Started →',

    recommend_welcome: 'What cocktail are you looking for?',
    recommend_welcome_sub: 'Describe the mood, flavor, or feeling you want.\nOur AI will analyze flavor vectors to find the perfect match.',
    recommend_prompt1_title: 'Sweet & Refreshing',
    recommend_prompt1_desc: 'Light cocktail with fruity notes',
    recommend_prompt2_title: 'Smoky & Dry',
    recommend_prompt2_desc: 'Strong whiskey-based flavors',
    recommend_prompt3_title: 'Light & Fizzy',
    recommend_prompt3_desc: 'Refreshing carbonated drink',
    recommend_prompt4_title: 'Bold & Strong',
    recommend_prompt4_desc: 'Rich with noticeable alcohol',
    recommend_placeholder: 'Describe the feeling you want...',
    recommend_hint: 'Enter to send · Shift+Enter for new line',
    recommend_result_intro: ' — Here are the recommendations.',
    recommend_result_count: '{n} found',
    recommend_no_result: 'No results found. Try a different description.',
    recommend_error: 'Failed to load recommendations.',
    recommend_detail_btn: 'View Details →',

    footer_recommend: 'Recommend',
    footer_predict: 'Predict',
    footer_recipes: 'Recipes',

    unit_ml: 'ml',
  },
  ja: {
    nav_home: 'ホーム',
    nav_recommend: 'カクテル推薦',
    nav_predict: 'レシピ作成',
    nav_recipes: 'レシピ',
    server_live: 'LIVE',
    server_offline: 'OFFLINE',

    predict_title: 'オリジナルレシピ作成',
    predict_subtitle: '材料を選択するとAIがフレーバープロファイルを予測します。オリジナルの組み合わせを試してみましょう。',
    predict_search: '材料を検索...',
    predict_search_label: '材料検索',
    predict_no_result: '検索結果がありません',
    predict_selected: '選択した材料',
    predict_count: '個',
    predict_hint: '材料を選択してください',
    predict_method_label: '製法',
    predict_method_none: '未選択',
    predict_btn: 'フレーバー予測',
    predict_btn_loading: 'AI分析中...',
    predict_empty: '材料を選択してフレーバーを予測しましょう',
    predict_loading: 'AIモデルがフレーバーを分析しています...',
    predict_error: '予測結果の取得に失敗しました。',
    predict_result_title: '予測結果',
    predict_detail_values: '詳細数値',
    predict_go_recipes: 'レシピを探す →',

    ing_detail_category: 'カテゴリー',
    ing_detail_role: '役割',
    ing_detail_alcohol: 'アルコール',
    ing_detail_yes: 'あり',
    ing_detail_no: 'なし',
    ing_detail_tier: '等級',
    ing_detail_frequency: '使用頻度',
    ing_detail_times: '回',
    ing_detail_flavor_tags: 'フレーバータグ',
    ing_detail_taste_profile: 'テイストプロファイル',
    ing_detail_taste_values: '詳細数値',
    ing_detail_add: 'この材料を追加',
    ing_detail_added: '追加済み',
    ing_detail_close: '閉じる',

    recipes_title: 'カクテルレシピ',
    recipes_search: 'カクテル名または材料で検索...',
    recipes_all: '全て',
    recipes_count: '全{n}件のレシピ',
    recipes_more: '+{n}種類',
    recipes_no_result: '検索結果がありません',
    recipes_reset: '検索をリセット',
    recipes_glass: 'グラス',
    recipes_garnish: 'ガーニッシュ',
    recipes_ingredients: '材料',
    recipes_taste_profile: 'テイストプロファイル',
    recipes_detail_values: '詳細数値',
    recipes_source: '元のレシピを見る →',
    recipes_predict_btn: 'この材料でフレーバー予測',
    recipes_match: '{n}% 一致',
    recipes_close: '閉じる',
    recipes_detail_btn: '詳細を見る →',

    home_tag: 'AI-POWERED COCKTAIL GUIDE',
    home_hero_1: 'あなたの好みに合う',
    home_hero_2: 'カクテルを見つけます',
    home_hero_desc: 'お好みの雰囲気を自由にお伝えください。AIがフレーバーベクトルで分析し、ぴったりのカクテルをおすすめします。',
    home_hero_btn: 'カクテルをおすすめ',
    home_hero_btn2: 'レシピを見る',
    home_section_offer: '何をお手伝いしましょうか',
    home_service1_title: 'AIカクテル推薦',
    home_service1_desc: '好みの雰囲気を自然言語で伝えると、Gemini AIがフレーバーベクトルで分析して最適なカクテルを推薦します',
    home_service2_title: 'オリジナルレシピ作成',
    home_service2_desc: '材料を選択すると、AIモデルが13の味軸でどんなカクテルになるか予測します',
    home_service3_title: 'レシピ探索',
    home_service3_desc: 'カクテルレシピを検索し、製法でフィルタリングして、お気に入りを見つけましょう',
    home_detail_link: '詳しく見る',
    home_how_title: 'どのように動作しますか？',
    home_step1_title: '入力',
    home_step1_desc: '希望するカクテルの雰囲気を自由にテキストで入力します',
    home_step2_title: 'AI分析',
    home_step2_desc: 'Geminiがフレーバーベクトルに数値化し、DBのベクトルと類似度を比較します',
    home_step3_title: '推薦完了',
    home_step3_desc: 'あなたの好みに最適化されたカクテルリストを提示します',
    home_cta_title1: '今夜、あなたの一杯を',
    home_cta_title2: '見つけましょう',
    home_cta_desc: '好みを伝えるとAIが完璧な一杯を提案します',
    home_cta_btn: '今すぐ始める →',

    recommend_welcome: 'どんなカクテルをお探しですか？',
    recommend_welcome_sub: 'お好みの雰囲気、味わいを自由にお伝えください。\nAIがフレーバーベクトルで分析し、ぴったりのカクテルを推薦します。',
    recommend_prompt1_title: '甘くてさわやかな',
    recommend_prompt1_desc: 'フルーティーで軽いカクテル',
    recommend_prompt2_title: 'スモーキーでドライな',
    recommend_prompt2_desc: 'ウイスキーベースの力強い風味',
    recommend_prompt3_title: '軽くて爽やかな',
    recommend_prompt3_desc: '炭酸のきいたさっぱりした一杯',
    recommend_prompt4_title: '重厚で力強い',
    recommend_prompt4_desc: 'アルコール感のある濃厚な味わい',
    recommend_placeholder: 'お好みの雰囲気を自由に入力してください...',
    recommend_hint: 'Enterで送信 · Shift+Enterで改行',
    recommend_result_intro: 'のおすすめ結果です。',
    recommend_result_count: '{n}件発見',
    recommend_no_result: '検索結果がありません。別の表現でお試しください。',
    recommend_error: '推薦の取得に失敗しました。',
    recommend_detail_btn: '詳細を見る →',

    footer_recommend: '推薦',
    footer_predict: '予測',
    footer_recipes: 'レシピ',

    unit_ml: 'ml',
  },
};

// ─── 맛 프로필 축 번역 ───
export const FLAVOR_LABELS = {
  ko: {
    sweetness: '단맛', sourness: '신맛', bitterness: '쓴맛',
    umamiSalty: '감칠맛', fruity: '과일향', citrus: '시트러스',
    floral: '꽃향', herbal: '허브향', spicy: '스파이시',
    woodySmoky: '우디/스모키', body: '바디감', fizzy: '청량감',
  },
  en: {
    sweetness: 'Sweet', sourness: 'Sour', bitterness: 'Bitter',
    umamiSalty: 'Umami/Salty', fruity: 'Fruity', citrus: 'Citrus',
    floral: 'Floral', herbal: 'Herbal', spicy: 'Spicy',
    woodySmoky: 'Woody/Smoky', body: 'Body', fizzy: 'Fizzy',
  },
  ja: {
    sweetness: '甘み', sourness: '酸味', bitterness: '苦味',
    umamiSalty: '旨味/塩味', fruity: 'フルーティー', citrus: 'シトラス',
    floral: 'フローラル', herbal: 'ハーバル', spicy: 'スパイシー',
    woodySmoky: 'ウッディ/スモーキー', body: 'ボディ', fizzy: '炭酸感',
  },
};

// ─── 재료명 번역 (클라이언트 폴백) ───
// 백엔드가 다국어 재료 API를 제공하면 이 맵 대신 API 응답 사용
const INGREDIENT_NAMES = {
  ko: {
    'White Rum': '화이트 럼',
    'Bourbon Whiskey': '버번 위스키',
    'Blanco Tequila': '블랑코 데킬라',
    'Gin': '진',
    'Vodka': '보드카',
    'Campari': '캄파리',
    'Sweet Vermouth': '스위트 베르무트',
    'Cointreau': '쿠앵트로',
    'Coffee Liqueur': '커피 리큐르',
    'Lime Juice': '라임 주스',
    'Lemon Juice': '레몬 주스',
    'Sugar Syrup': '설탕 시럽',
    'Agave Syrup': '아가베 시럽',
    'Honey Syrup': '꿀 시럽',
    'Angostura Bitters': '앙고스투라 비터스',
    'Orange Bitters': '오렌지 비터스',
    "Peychaud's Bitters": '페이쇼 비터스',
    'Soda Water': '탄산수',
    'Tonic Water': '토닉 워터',
    'Ginger Beer': '진저 비어',
    'Pineapple Juice': '파인애플 주스',
    'Orange Juice': '오렌지 주스',
    'Cranberry Juice': '크랜베리 주스',
    'Espresso': '에스프레소',
    'Coconut Cream': '코코넛 크림',
    'Mint Leaves': '민트 잎',
    'Basil': '바질',
    'Rosemary': '로즈마리',
    'Dry Vermouth': '드라이 베르무트',
    'Aperol': '아페롤',
    // 일반 재료 카테고리
    'Amaretto': '아마레또',
    'Angostura Aromatic Bitters': '앙고스투라 아로마틱 비터스',
    "Hayman's London Dry Gin": '헤이만스 런던 드라이 진',
    'Americano bianco': '아메리카노 비앙코',
    'Orange juice (freshly squeezed)': '오렌지 주스 (착즙)',
  },
  ja: {
    'White Rum': 'ホワイトラム',
    'Bourbon Whiskey': 'バーボンウイスキー',
    'Blanco Tequila': 'ブランコテキーラ',
    'Gin': 'ジン',
    'Vodka': 'ウォッカ',
    'Campari': 'カンパリ',
    'Sweet Vermouth': 'スイートベルモット',
    'Cointreau': 'コアントロー',
    'Coffee Liqueur': 'コーヒーリキュール',
    'Lime Juice': 'ライムジュース',
    'Lemon Juice': 'レモンジュース',
    'Sugar Syrup': 'シュガーシロップ',
    'Agave Syrup': 'アガベシロップ',
    'Honey Syrup': 'ハニーシロップ',
    'Angostura Bitters': 'アンゴスチュラビターズ',
    'Orange Bitters': 'オレンジビターズ',
    "Peychaud's Bitters": 'ペイショービターズ',
    'Soda Water': 'ソーダ水',
    'Tonic Water': 'トニックウォーター',
    'Ginger Beer': 'ジンジャービア',
    'Pineapple Juice': 'パイナップルジュース',
    'Orange Juice': 'オレンジジュース',
    'Cranberry Juice': 'クランベリージュース',
    'Espresso': 'エスプレッソ',
    'Coconut Cream': 'ココナッツクリーム',
    'Mint Leaves': 'ミントの葉',
    'Basil': 'バジル',
    'Rosemary': 'ローズマリー',
    'Dry Vermouth': 'ドライベルモット',
    'Aperol': 'アペロール',
    'Amaretto': 'アマレット',
  },
};

// ─── 카테고리 / 역할 번역 ───
export const CATEGORY_LABELS = {
  ko: {
    'Spirit': '증류주', 'Liqueur': '리큐르', 'Bitters': '비터스',
    'Juice': '주스', 'Syrup': '시럽', 'Mixer': '믹서',
    'Wine': '와인', 'Beer': '맥주', 'Garnish': '가니쉬',
    'Other': '기타', 'Cream': '크림', 'Herb': '허브',
  },
  en: {},  // 영문 그대로 사용
  ja: {
    'Spirit': 'スピリッツ', 'Liqueur': 'リキュール', 'Bitters': 'ビターズ',
    'Juice': 'ジュース', 'Syrup': 'シロップ', 'Mixer': 'ミキサー',
    'Wine': 'ワイン', 'Beer': 'ビール', 'Garnish': 'ガーニッシュ',
    'Other': 'その他', 'Cream': 'クリーム', 'Herb': 'ハーブ',
  },
};

export const ROLE_LABELS = {
  ko: {
    'Base': '베이스', 'Modifier': '모디파이어', 'Accent': '악센트',
    'Sweetener': '감미료', 'Souring': '신맛 추가', 'Carbonation': '탄산',
    'Garnish': '가니쉬', 'Other': '기타',
  },
  en: {},
  ja: {
    'Base': 'ベース', 'Modifier': 'モディファイア', 'Accent': 'アクセント',
    'Sweetener': '甘味料', 'Souring': 'サワー', 'Carbonation': '炭酸',
    'Garnish': 'ガーニッシュ', 'Other': 'その他',
  },
};

/**
 * UI 문자열 번역 함수
 */
export function getUIString(key, lang = 'ko') {
  return UI_STRINGS[lang]?.[key] ?? UI_STRINGS.ko[key] ?? key;
}

/**
 * 재료명 번역 함수
 * 향후 백엔드 API에서 번역된 이름을 반환하면 이 함수를 API 응답으로 교체 가능
 */
export function translateIngredientName(englishName, lang = 'ko') {
  if (lang === 'en') return englishName;
  return INGREDIENT_NAMES[lang]?.[englishName] ?? englishName;
}

/**
 * 카테고리 번역
 */
export function translateCategory(category, lang = 'ko') {
  if (lang === 'en') return category;
  return CATEGORY_LABELS[lang]?.[category] ?? category;
}

/**
 * 역할 번역
 */
export function translateRole(role, lang = 'ko') {
  if (lang === 'en') return role;
  return ROLE_LABELS[lang]?.[role] ?? role;
}

/**
 * 맛 축 이름 가져오기
 */
export function getFlavorLabel(key, lang = 'ko') {
  return FLAVOR_LABELS[lang]?.[key] ?? FLAVOR_LABELS.ko[key] ?? key;
}

// ─── 칵테일 이름 번역 (한국어 기준 → 다국어) ───
// 백엔드 DB가 한국어 이름을 반환하므로 한국어를 기준으로 번역
const COCKTAIL_NAMES = {
  en: {
    '모히또': 'Mojito',
    '올드 패션드': 'Old Fashioned',
    '마가리타': 'Margarita',
    '네그로니': 'Negroni',
    '에스프레소 마티니': 'Espresso Martini',
    '피나 콜라다': 'Piña Colada',
    '마티니': 'Martini',
    '맨해튼': 'Manhattan',
    '다이키리': 'Daiquiri',
    '위스키 사워': 'Whiskey Sour',
    '코스모폴리탄': 'Cosmopolitan',
    '모스코 뮬': 'Moscow Mule',
    '사이드카': 'Sidecar',
    '애비에이션': 'Aviation',
    '진 토닉': 'Gin & Tonic',
    '럼 앤 콜라': 'Rum & Cola',
    '블러디 메리': 'Bloody Mary',
    '피스코 사워': 'Pisco Sour',
    '아메리카노': 'Americano',
    '스프리츠': 'Spritz',
    '아페롤 스프리츠': 'Aperol Spritz',
    '브랜디 알렉산더': 'Brandy Alexander',
    '프렌치 75': 'French 75',
    '톰 콜린스': 'Tom Collins',
    '민트 줄렙': 'Mint Julep',
    '사제락': 'Sazerac',
    '라스트 워드': 'Last Word',
    '페니실린': 'Penicillin',
    '팔로마': 'Paloma',
    '허리케인': 'Hurricane',
    '블루 라군': 'Blue Lagoon',
    '롱 아일랜드 아이스티': 'Long Island Iced Tea',
  },
  ja: {
    '모히또': 'モヒート',
    '올드 패션드': 'オールドファッションド',
    '마가리타': 'マルガリータ',
    '네그로니': 'ネグローニ',
    '에스프레소 마티니': 'エスプレッソマティーニ',
    '피나 콜라다': 'ピニャコラーダ',
    '마티니': 'マティーニ',
    '맨해튼': 'マンハッタン',
    '다이키리': 'ダイキリ',
    '위스키 사워': 'ウイスキーサワー',
    '코스모폴리탄': 'コスモポリタン',
    '모스코 뮬': 'モスコミュール',
    '사이드카': 'サイドカー',
    '애비에이션': 'アビエーション',
    '진 토닉': 'ジントニック',
    '럼 앤 콜라': 'ラムコーラ',
    '블러디 메리': 'ブラッディメアリー',
    '피스코 사워': 'ピスコサワー',
    '아메리카노': 'アメリカーノ',
    '스프리츠': 'スプリッツ',
    '아페롤 스프리츠': 'アペロールスプリッツ',
    '브랜디 알렉산더': 'ブランデーアレキサンダー',
    '프렌치 75': 'フレンチ75',
    '톰 콜린스': 'トムコリンズ',
    '민트 줄렙': 'ミントジュレップ',
    '사제락': 'サゼラック',
    '라스트 워드': 'ラストワード',
    '페니실린': 'ペニシリン',
    '팔로마': 'パロマ',
    '허리케인': 'ハリケーン',
    '블루 라군': 'ブルーラグーン',
    '롱 아일랜드 아이스티': 'ロングアイランドアイスティー',
  },
};

/**
 * 칵테일 이름 번역 함수
 * 한국어 이름을 기준으로 다국어 번역
 * 백엔드가 다국어 칵테일 이름을 반환하면 이 맵 대신 API 응답 사용
 */
export function translateCocktailName(koreanName, lang = 'ko') {
  if (lang === 'ko') return koreanName;
  return COCKTAIL_NAMES[lang]?.[koreanName] ?? koreanName;
}

