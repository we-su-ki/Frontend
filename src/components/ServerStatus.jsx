import { useState, useEffect } from 'react';
import './ServerStatus.css';

// 백엔드가 살아있는지 5초마다 체크
// GET /cocktails 에 HEAD 요청 → 응답 있으면 online
export default function ServerStatus() {
  const [status, setStatus] = useState('checking'); // 'checking' | 'online' | 'offline'

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const res = await fetch('/cocktails', {
          method: 'HEAD',
          signal: AbortSignal.timeout(3000), // 3초 타임아웃
        });
        if (mounted) setStatus(res.ok || res.status === 405 ? 'online' : 'offline');
      } catch {
        if (mounted) setStatus('offline');
      }
    };

    check();
    const timer = setInterval(check, 8000);
    return () => { mounted = false; clearInterval(timer); };
  }, []);

  if (status === 'checking') return null;

  return (
    <div className={`server-status server-status--${status}`} title={
      status === 'online' ? '백엔드 서버 연결됨' : '백엔드 서버 오프라인 (localhost:8080)'
    }>
      <span className="server-status__dot" />
      <span className="server-status__label">
        {status === 'online' ? 'LIVE' : 'OFFLINE'}
      </span>
    </div>
  );
}
