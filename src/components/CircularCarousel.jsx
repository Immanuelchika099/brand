import { useEffect, useMemo, useRef, useState } from 'react';
import './CircularCarousel.css';

export default function CircularCarousel({
  items = [], preset = 'cylinder', intro = 'rise', cardWidth = 220,
  aspectRatio = 1, gap = 25, autoplay = 'drift', speed = 14,
  interval = 3, direction = 'left', draggable = true, captions = false,
  fadeColor = '#000000', cornerRadius = 12, className = '', style = {},
  tilt = 0, curve = 1, perspective = 1800, momentum = 0.6, snap = true,
  pauseOnHover = true, focusOnClick = true, parallax = 0.3, stretch = 0.5,
  depthFade = 0.55, innerShade = 0.6,
  onChange, onItemClick
}) {
  const count = items.length;
  const [active, setActive] = useState(0);
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const start = useRef(null);
  const angleRef = useRef(0);
  const last = useRef(0);
  const step = count ? 360 / count : 0;
  const radius = useMemo(() => Math.max(0, ((cardWidth + gap) / (2 * Math.tan(Math.PI / Math.max(count, 3)))) * curve), [cardWidth, gap, count, curve]);

  useEffect(() => {
    if (!count || autoplay === 'off' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame;
    let previous = performance.now();
    let elapsed = 0;
    const tick = now => {
      const dt = Math.min((now - previous) / 1000, .05);
      previous = now;
      if (!paused && !start.current) {
        if (autoplay === 'drift') angleRef.current += dt * speed * (direction === 'right' ? 1 : -1);
        else {
          elapsed += dt;
          if (elapsed >= interval) { angleRef.current += step * (direction === 'right' ? 1 : -1); elapsed = 0; }
        }
        setAngle(angleRef.current);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count, autoplay, speed, interval, direction, step, paused]);

  useEffect(() => {
    if (!count) return;
    const next = ((Math.round(-angle / step) % count) + count) % count;
    if (next !== active) { setActive(next); onChange?.(next); }
  }, [angle, count, step, active, onChange]);

  const focus = index => {
    const next = -index * step;
    angleRef.current = next;
    setAngle(next);
    setActive(index);
    onChange?.(index);
    onItemClick?.(items[index], index);
  };
  const down = e => {
    if (!draggable || e.button !== 0) return;
    start.current = { x: e.clientX, angle: angleRef.current, moved: false };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setPaused(true);
  };
  const move = e => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    if (Math.abs(dx) > 3) start.current.moved = true;
    if (start.current.moved) {
      angleRef.current = start.current.angle + dx * .35;
      setAngle(angleRef.current);
    }
  };
  const up = () => { start.current = null; setPaused(false); };
  if (!count) return null;

  return <div className={`circular-carousel ${className}`} style={{ ...style, '--cc-fade': fadeColor, '--cc-radius': `${cornerRadius}px`, '--cc-depth-fade': depthFade, '--cc-inner-shade': innerShade, '--cc-parallax': parallax, '--cc-stretch': stretch }}
    role="region" aria-roledescription="carousel" aria-label="Featured projects" tabIndex={0}
    onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
    onPointerEnter={() => pauseOnHover && setPaused(true)} onPointerLeave={() => pauseOnHover && setPaused(false)}
    onKeyDown={e => { if (e.key === 'ArrowRight') focus((active + 1) % count); if (e.key === 'ArrowLeft') focus((active - 1 + count) % count); }}>
    <div className="circular-carousel__view" style={{ perspective: `${perspective}px` }}>
      <div className="circular-carousel__ring" style={{ transform: `translateZ(-${radius}px) rotateX(${tilt}deg) rotateY(${angle}deg)` }}>
        {items.map((item, index) => <button type="button" key={item.src + index}
          className={`circular-carousel__card ${index === active ? 'is-active' : ''}`}
          style={{ width: cardWidth, height: cardWidth / aspectRatio, marginLeft: -cardWidth / 2, marginTop: -cardWidth / aspectRatio / 2,
            transform: `rotateY(${index * step}deg) translateZ(${radius}px)` }}
          aria-label={item.title || item.alt || `Project ${index + 1}`}
          onClick={() => focusOnClick && focus(index)}>
          <img src={item.src} alt={item.alt || ''} draggable="false" />
        </button>)}
      </div>
    </div>
    {captions && <div className="circular-carousel__caption" aria-live="polite">
      <span className="circular-carousel__title">{items[active]?.title}{items[active]?.subtitle && <small>{items[active].subtitle}</small>}</span>
      <span className="circular-carousel__count">{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
    </div>}
  </div>;
}
