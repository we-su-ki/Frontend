import { useMemo } from 'react';

// 12 flavor axes mapped to tasteProfile fields
const AXES = [
  { key: 'sweetness',   label: '단맛' },
  { key: 'sourness',    label: '신맛' },
  { key: 'bitterness',  label: '쓴맛' },
  { key: 'umamiSalty',  label: '감칠맛' },
  { key: 'fruity',      label: '과일향' },
  { key: 'citrus',      label: '시트러스' },
  { key: 'floral',      label: '꽃향' },
  { key: 'herbal',      label: '허브향' },
  { key: 'spicy',       label: '스파이시' },
  { key: 'woodySmoky',  label: '우디/스모키' },
  { key: 'body',        label: '바디감' },
  { key: 'fizzy',       label: '청량감' },
];

const MAX_VAL = 10;
const LEVELS = [2, 4, 6, 8, 10];
const N = AXES.length;

function getPoint(angle, radius, cx, cy) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function polyPoints(radius, cx, cy) {
  return AXES.map((_, i) => {
    const p = getPoint((360 / N) * i, radius, cx, cy);
    return `${p.x},${p.y}`;
  }).join(' ');
}

export default function TasteRadarChart({ tasteProfile = {}, size = 260 }) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 30; // leave room for labels

  const dataPoints = useMemo(() => {
    return AXES.map((axis, i) => {
      const val = Math.min(Math.max(tasteProfile[axis.key] ?? 0, 0), MAX_VAL);
      const radius = (val / MAX_VAL) * maxRadius;
      return getPoint((360 / N) * i, radius, cx, cy);
    });
  }, [tasteProfile, cx, cy, maxRadius]);

  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', margin: '0 auto' }}
    >
      {/* Grid rings */}
      {LEVELS.map(level => (
        <polygon
          key={level}
          points={polyPoints((level / MAX_VAL) * maxRadius, cx, cy)}
          fill="none"
          stroke="rgba(201,146,42,0.12)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {AXES.map((_, i) => {
        const outer = getPoint((360 / N) * i, maxRadius, cx, cy);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={outer.x}
            y2={outer.y}
            stroke="rgba(201,146,42,0.1)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={dataPolygon}
        fill="rgba(201,146,42,0.22)"
        stroke="#C9922A"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#C9922A" />
      ))}

      {/* Axis labels */}
      {AXES.map((axis, i) => {
        const angle = (360 / N) * i;
        const labelRadius = maxRadius + 18;
        const p = getPoint(angle, labelRadius, cx, cy);
        let textAnchor = 'middle';
        if (p.x < cx - 5) textAnchor = 'end';
        else if (p.x > cx + 5) textAnchor = 'start';

        return (
          <text
            key={axis.key}
            x={p.x}
            y={p.y}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            fill="var(--text-secondary)"
            fontSize="9"
            fontFamily="'DM Sans', sans-serif"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}
