import { useEffect, useRef, useState } from 'react';
import './FlavorBar.css';

export default function FlavorBar({ name, value, max = 10, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setWidth((value / max) * 100);
    }, delay * 1000 + 50);
    return () => clearTimeout(timerRef.current);
  }, [value, max, delay]);

  return (
    <div className="flavor-bar">
      <div className="flavor-bar__header">
        <span className="flavor-bar__name">{name}</span>
        <span className="flavor-bar__value">{Number(value).toFixed(1)}</span>
      </div>
      <div className="flavor-bar__track">
        <div
          className="flavor-bar__fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
