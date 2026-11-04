import { useEffect, useState } from 'react';
import XLogo from './XLogo';
import { services } from '../data/content';
import './Loader.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let frame;
    const started = performance.now();
    let disposed = false;
    const wait = promise => Promise.race([promise, new Promise(resolve => setTimeout(resolve, 1800))]);
    const images = services.map(item => wait(new Promise(resolve => {
      const img = new Image();
      img.onload = img.onerror = resolve;
      img.src = item.image;
    })));
    const fonts = wait(document.fonts?.ready || Promise.resolve());
    Promise.all([fonts, ...images]).then(() => { if (!disposed) setProgress(100); });
    const tick = now => {
      if (disposed) return;
      setProgress(current => Math.max(current, Math.min(94, Math.round((now - started) / 28))));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { disposed = true; cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (progress !== 100) return;
    const timer = setTimeout(() => setLeaving(true), 220);
    return () => clearTimeout(timer);
  }, [progress]);

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(onComplete, 560);
    return () => clearTimeout(timer);
  }, [leaving, onComplete]);

  return (
    <div className={`loader ${leaving ? 'loader--leaving' : ''}`} aria-label='Loading website'>
      <div className='loader__content'>
        <div className='loader__mark'><XLogo /></div>
        <div className='loader__progress' role='progressbar' aria-label='Page loading progress' aria-valuemin='0' aria-valuemax='100' aria-valuenow={progress}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
