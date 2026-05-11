// src/mockData.js
// 백엔드 미연결 시 사용하는 더미 데이터

export const MOCK_COCKTAILS = [
  {
    name: "모히또",
    imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    glassRaw: "Highball glass",
    garnishRaw: "Mint sprig and lime wheel",
    methodRaw: "MUDDLE mint leaves with sugar syrup and lime juice. Add rum and ice. Top with soda water. Stir gently.",
    methodCategory: "Build",
    ingredients: [
      { name: "White Rum", ml: 50 },
      { name: "Lime Juice", ml: 25 },
      { name: "Sugar Syrup", ml: 15 },
      { name: "Mint Leaves", ml: 8 },
      { name: "Soda Water", ml: 100 },
    ],
    scoreStrength: 4,
    scoreSweetSour: 6,
    reviewText: "A refreshing Cuban classic that balances mint, lime and rum perfectly. Light and effervescent.",
    sourceUrl: "https://www.diffordsguide.com/cocktails/recipe/1403/mojito",
    tasteProfile: {
      abv: 13.5, sweetness: 5.5, sourness: 6.5, bitterness: 1.0,
      umamiSalty: 0.3, fruity: 3.5, citrus: 7.5, floral: 1.5,
      herbal: 7.0, spicy: 0.5, woodySmoky: 0.3, body: 2.5, fizzy: 8.0,
    },
    matchScore: 0.92,
  },
  {
    name: "올드 패션드",
    imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    glassRaw: "Old Fashioned glass",
    garnishRaw: "Orange peel and cocktail cherry",
    methodRaw: "STIR all ingredients with ice. Strain into chilled glass over large ice block. Garnish with orange peel.",
    methodCategory: "Stir",
    ingredients: [
      { name: "Bourbon Whiskey", ml: 60 },
      { name: "Sugar Syrup", ml: 5 },
      { name: "Angostura Bitters", ml: 2 },
      { name: "Orange Bitters", ml: 1 },
    ],
    scoreStrength: 8,
    scoreSweetSour: 3,
    reviewText: "The quintessential whiskey cocktail. Bold, complex, and perfectly balanced.",
    sourceUrl: "https://www.diffordsguide.com/cocktails/recipe/1598/old-fashioned",
    tasteProfile: {
      abv: 32.0, sweetness: 2.5, sourness: 0.8, bitterness: 5.5,
      umamiSalty: 0.5, fruity: 1.5, citrus: 2.0, floral: 0.5,
      herbal: 2.0, spicy: 3.5, woodySmoky: 7.5, body: 8.5, fizzy: 0.0,
    },
    matchScore: 0.85,
  },
  {
    name: "마가리타",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
    glassRaw: "Margarita / Coupette glass",
    garnishRaw: "Salt rim, lime wedge",
    methodRaw: "SHAKE all ingredients with ice. FINE STRAIN into chilled salt-rimmed glass.",
    methodCategory: "Shake",
    ingredients: [
      { name: "Blanco Tequila", ml: 50 },
      { name: "Cointreau", ml: 25 },
      { name: "Lime Juice", ml: 25 },
      { name: "Agave Syrup", ml: 5 },
    ],
    scoreStrength: 6,
    scoreSweetSour: 8,
    reviewText: "Arguably the world's most popular cocktail. Tart, strong and utterly refreshing.",
    sourceUrl: "https://www.diffordsguide.com/cocktails/recipe/1317/margarita",
    tasteProfile: {
      abv: 22.0, sweetness: 4.0, sourness: 8.5, bitterness: 2.0,
      umamiSalty: 2.5, fruity: 2.5, citrus: 8.5, floral: 0.5,
      herbal: 1.5, spicy: 1.5, woodySmoky: 0.5, body: 3.5, fizzy: 0.0,
    },
    matchScore: 0.80,
  },
  {
    name: "네그로니",
    imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    glassRaw: "Old Fashioned glass",
    garnishRaw: "Orange slice or peel",
    methodRaw: "STIR all ingredients with ice. Strain into chilled glass over ice. Garnish with orange.",
    methodCategory: "Stir",
    ingredients: [
      { name: "Gin", ml: 30 },
      { name: "Campari", ml: 30 },
      { name: "Sweet Vermouth", ml: 30 },
    ],
    scoreStrength: 7,
    scoreSweetSour: 4,
    reviewText: "The perfect aperitivo. Bitter, herbal and subtly sweet with a gorgeous ruby color.",
    sourceUrl: "https://www.diffordsguide.com/cocktails/recipe/1467/negroni",
    tasteProfile: {
      abv: 24.0, sweetness: 4.5, sourness: 1.5, bitterness: 8.5,
      umamiSalty: 0.5, fruity: 2.0, citrus: 3.5, floral: 2.5,
      herbal: 7.5, spicy: 2.0, woodySmoky: 1.0, body: 6.0, fizzy: 0.0,
    },
    matchScore: 0.75,
  },
  {
    name: "에스프레소 마티니",
    imageUrl: "https://images.unsplash.com/photo-1622484211888-a5e7f17f99ce?w=800&q=80",
    glassRaw: "Martini / Cocktail glass",
    garnishRaw: "3 coffee beans",
    methodRaw: "SHAKE all ingredients hard with ice. FINE STRAIN into chilled glass.",
    methodCategory: "Shake",
    ingredients: [
      { name: "Vodka", ml: 50 },
      { name: "Coffee Liqueur", ml: 25 },
      { name: "Espresso", ml: 30 },
      { name: "Sugar Syrup", ml: 10 },
    ],
    scoreStrength: 6,
    scoreSweetSour: 5,
    reviewText: "Dick Bradsell's iconic creation. Rich, creamy coffee flavour with a silky foam.",
    sourceUrl: "https://www.diffordsguide.com/cocktails/recipe/706/espresso-martini",
    tasteProfile: {
      abv: 20.0, sweetness: 6.0, sourness: 1.0, bitterness: 7.0,
      umamiSalty: 0.5, fruity: 0.5, citrus: 0.5, floral: 0.5,
      herbal: 1.0, spicy: 1.5, woodySmoky: 2.5, body: 7.5, fizzy: 0.0,
    },
    matchScore: 0.70,
  },
  {
    name: "피나 콜라다",
    imageUrl: "https://images.unsplash.com/photo-1638913174924-40f23025f5b1?w=800&q=80",
    glassRaw: "Hurricane / Poco Grande glass",
    garnishRaw: "Pineapple wedge and cherry",
    methodRaw: "BLEND all ingredients with crushed ice until smooth. Pour into chilled glass.",
    methodCategory: "Blend",
    ingredients: [
      { name: "White Rum", ml: 50 },
      { name: "Pineapple Juice", ml: 90 },
      { name: "Coconut Cream", ml: 30 },
    ],
    scoreStrength: 3,
    scoreSweetSour: 8,
    reviewText: "The taste of tropical paradise. Creamy, sweet and utterly indulgent.",
    sourceUrl: "https://www.diffordsguide.com/cocktails/recipe/1696/pina-colada",
    tasteProfile: {
      abv: 11.0, sweetness: 8.5, sourness: 2.0, bitterness: 0.5,
      umamiSalty: 0.3, fruity: 8.0, citrus: 2.5, floral: 1.5,
      herbal: 0.5, spicy: 0.3, woodySmoky: 0.3, body: 7.0, fizzy: 1.0,
    },
    matchScore: 0.65,
  },
];

export const MOCK_INGREDIENTS = [
  { id: 1, name: "White Rum" },
  { id: 2, name: "Bourbon Whiskey" },
  { id: 3, name: "Blanco Tequila" },
  { id: 4, name: "Gin" },
  { id: 5, name: "Vodka" },
  { id: 6, name: "Campari" },
  { id: 7, name: "Sweet Vermouth" },
  { id: 8, name: "Cointreau" },
  { id: 9, name: "Coffee Liqueur" },
  { id: 10, name: "Lime Juice" },
  { id: 11, name: "Lemon Juice" },
  { id: 12, name: "Sugar Syrup" },
  { id: 13, name: "Agave Syrup" },
  { id: 14, name: "Honey Syrup" },
  { id: 15, name: "Angostura Bitters" },
  { id: 16, name: "Orange Bitters" },
  { id: 17, name: "Peychaud's Bitters" },
  { id: 18, name: "Soda Water" },
  { id: 19, name: "Tonic Water" },
  { id: 20, name: "Ginger Beer" },
  { id: 21, name: "Pineapple Juice" },
  { id: 22, name: "Orange Juice" },
  { id: 23, name: "Cranberry Juice" },
  { id: 24, name: "Espresso" },
  { id: 25, name: "Coconut Cream" },
  { id: 26, name: "Mint Leaves" },
  { id: 27, name: "Basil" },
  { id: 28, name: "Rosemary" },
  { id: 29, name: "Dry Vermouth" },
  { id: 30, name: "Aperol" },
];

// 맛 예측 더미 응답
export function mockPredict(ingredients) {
  // 재료 조합에 따른 간단한 가상 예측
  const hasCitrus = ingredients.some(i => [10, 11].includes(i.id));
  const hasBitters = ingredients.some(i => [15, 16, 17].includes(i.id));
  const hasSpirits = ingredients.some(i => [1, 2, 3, 4, 5].includes(i.id));
  const hasSweeteners = ingredients.some(i => [12, 13, 14].includes(i.id));
  const hasFizz = ingredients.some(i => [18, 19, 20].includes(i.id));

  return {
    abv: hasSpirits ? 18.5 + Math.random() * 8 : 2.0,
    sweetness: hasSweeteners ? 5.5 + Math.random() * 2 : 2.0 + Math.random(),
    sourness: hasCitrus ? 6.5 + Math.random() * 2 : 1.0 + Math.random(),
    bitterness: hasBitters ? 5.0 + Math.random() * 3 : 1.5 + Math.random(),
    umamiSalty: 0.5 + Math.random(),
    fruity: hasCitrus ? 4.5 + Math.random() * 2 : 1.5 + Math.random(),
    citrus: hasCitrus ? 7.0 + Math.random() * 2 : 1.0 + Math.random(),
    floral: 0.5 + Math.random() * 2,
    herbal: 1.0 + Math.random() * 3,
    spicy: 0.5 + Math.random() * 2,
    woodySmoky: hasSpirits ? 1.5 + Math.random() * 3 : 0.5,
    body: hasSpirits ? 4.0 + Math.random() * 3 : 2.0 + Math.random(),
    fizzy: hasFizz ? 7.0 + Math.random() * 2 : 0.5 + Math.random(),
  };
}

// 추천 더미 응답 (query 키워드 기반)
export function mockRecommend(query) {
  const q = query.toLowerCase();
  let sorted = [...MOCK_COCKTAILS];

  if (q.includes('상큼') || q.includes('신') || q.includes('라임') || q.includes('시트러스')) {
    sorted = sorted.sort((a, b) => b.tasteProfile.citrus - a.tasteProfile.citrus);
  } else if (q.includes('스모키') || q.includes('위스키') || q.includes('강') || q.includes('묵직')) {
    sorted = sorted.sort((a, b) => b.tasteProfile.woodySmoky - a.tasteProfile.woodySmoky);
  } else if (q.includes('달콤') || q.includes('달달') || q.includes('sweet')) {
    sorted = sorted.sort((a, b) => b.tasteProfile.sweetness - a.tasteProfile.sweetness);
  } else if (q.includes('쓴') || q.includes('비터') || q.includes('bitter')) {
    sorted = sorted.sort((a, b) => b.tasteProfile.bitterness - a.tasteProfile.bitterness);
  } else if (q.includes('청량') || q.includes('가볍') || q.includes('탄산')) {
    sorted = sorted.sort((a, b) => b.tasteProfile.fizzy - a.tasteProfile.fizzy);
  }

  return sorted.slice(0, 5).map((c, i) => ({
    ...c,
    matchScore: Math.max(0.5, 0.95 - i * 0.07),
  }));
}
