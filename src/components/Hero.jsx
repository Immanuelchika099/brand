import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { copy } from '../data/content';
import luxeScreenshot from '../assets/luxe-homepage.png';
import './Hero.css';

const PROJECTS = [
  { title: 'KAIZERBRIX', tag: 'Website + Redesign', href: 'https://kaizerbrix.vercel.app', image: '/assets/keizerbrix-mockup.webp', accent: '#DF481D' },
  { title: 'EVOLV', tag: 'AI Productivity App', href: 'https://evolv-track.vercel.app', image: '/assets/evolv-mockup.webp', accent: '#E58642' },
  { title: 'LUXE HAIR', tag: 'E-commerce Website', href: 'https://luxe-hair-tawny.vercel.app', image: luxeScreenshot, accent: '#C9B8A8' },
];
const circ = (d, n) => { const half = n / 2; return ((((d + half) % n) + n) % n) - half; };
const Chevron = ({ dir = 'left' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

export default function Hero({ ready = false }) {
  const projects = PROJECTS;
  const n = projects.length;
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const captionRefs = useRef([]);
  const tlRef = useRef(null);
  const activeRef = useRef(0);
  const prevOffsets = useRef([]);
  const stepRef = useRef(0);
  const drag = useRef({ x: 0, down: false, moved: false });
  const [active, setActive] = useState(0);

  const place = useCallback((animate) => {
    const step = stepRef.current;
    const a = activeRef.current;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = circ(i - a, n);
      const prev = prevOffsets.current[i];
      const x = d * step;
      const scale = d === 0 ? 1 : 0.9;
      const alpha = Math.abs(d) <= 1 ? 1 : 0;
      const shade = el.querySelector('.hero__card-shade');
      gsap.set(el, { zIndex: d === 0 ? 2 : 1 });
      if (!animate || prev === undefined) {
        gsap.set(el, { x, scale, autoAlpha: alpha });
        gsap.set(shade, { opacity: d === 0 ? 0 : 0.5 });
      } else {
        gsap.to(el, { x, scale, autoAlpha: alpha, duration: 0.9, ease: 'power3.out', overwrite: true });
        gsap.to(shade, { opacity: d === 0 ? 0 : 0.5, duration: 0.6, overwrite: true });
      }
      prevOffsets.current[i] = d;
    });
  }, [n]);

  const go = useCallback((dir) => {
    if (n < 2) return;
    activeRef.current = (activeRef.current + dir + n) % n;
    setActive(activeRef.current);
    place(true);
  }, [n, place]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    prevOffsets.current = [];
    const measure = () => { stepRef.current = cardRefs.current[0]?.offsetWidth || 0; };
    const ctx = gsap.context(() => {
      const words = root.querySelectorAll('.hero__word');
      const subWords = root.querySelectorAll('.hero__sub-word');
      const label = root.querySelector('.hero__label');
      const caption = root.querySelector('.hero__caption');
      const controls = root.querySelector('.hero__controls');
      const inners = Array.from(root.querySelectorAll('.hero__card-inner'));
      measure();
      place(false);
      gsap.set(captionRefs.current, { opacity: 0, y: 10 });
      gsap.set(captionRefs.current[0], { opacity: 1, y: 0 });
      if (reduceMotion) return;
      gsap.set(words, { yPercent: 110 });
      gsap.set(headingRef.current, { opacity: 0.38 });
      gsap.set(subWords, { opacity: 0, y: 14, filter: 'blur(8px)' });
      gsap.set(label, { opacity: 0, y: 10 });
      gsap.set(inners, { opacity: 0, y: 70, filter: 'blur(12px)' });
      gsap.set([caption, controls], { opacity: 0, y: 14 });
      const ordered = inners.map((el, i) => ({ el, d: Math.abs(circ(i, n)) })).sort((a, b) => a.d - b.d).map(o => o.el);
      tlRef.current = gsap.timeline({ paused: true })
        .to(words, { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.08 }, 0)
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.inOut' }, 0.95)
        .to(subWords, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', stagger: 0.02, clearProps: 'filter' }, 1.35)
        .to(label, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.8)
        .to(ordered, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', stagger: 0.1, clearProps: 'filter' }, 1.5)
        .to([caption, controls], { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12 }, 2.2);
    }, root);
    const ro = new ResizeObserver(() => { measure(); place(false); });
    if (stageRef.current) ro.observe(stageRef.current);
    return () => { ro.disconnect(); tlRef.current = null; ctx.revert(); };
  }, [n, place]);

  useEffect(() => {
    if (!ready || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const h = headingRef.current;
    if (!h || !tlRef.current) return;
    const r = h.getBoundingClientRect();
    const dy = Math.max(0, window.innerHeight * 0.36 - (r.top + r.height / 2));
    gsap.set(h, { y: dy });
    tlRef.current.play(0);
  }, [ready]);

  useEffect(() => {
    captionRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { opacity: i === active ? 1 : 0, y: i === active ? 0 : 10, duration: 0.5, ease: 'power2.out', overwrite: true });
    });
  }, [active]);

  const onPointerDown = (e) => { drag.current = { x: e.clientX, down: true, moved: false }; };
  const onPointerUp = (e) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.x;
    drag.current.down = false;
    if (Math.abs(dx) > 40) { drag.current.moved = true; go(dx < 0 ? 1 : -1); }
  };
  const onKeyDown = (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
  const onCardClick = (e, i) => {
    if (drag.current.moved) { e.preventDefault(); drag.current.moved = false; return; }
    const d = circ(i - activeRef.current, n);
    if (d !== 0) { e.preventDefault(); go(d > 0 ? 1 : -1); }
    else if (!projects[i].href) e.preventDefault();
  };

  const headline = ['CRAFTING BOLD &', 'MEMORABLE WEBSITES'];
  const subtext = "I'M IMAN, A CREATIVE DESIGNER & DEVELOPER. BASED IN PORT HARCOURT, NIGERIA.";
  return (
    <section id="hero" className="hero" ref={rootRef}>
      <div className="hero__top">
        <h1 className="hero__heading" ref={headingRef} aria-label={headline.join(' ')}>
          {headline.map((line, li) => (
            <span className="hero__line" key={li} aria-hidden="true">
              {line.split(' ').map((w, wi) => (
                <span className="hero__mask" key={wi}><span className="hero__word">{w}</span></span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero__sub">{subtext.split(' ').map((w, i) => <Fragment key={i}><span className="hero__sub-word">{w}</span>{' '}</Fragment>)}</p>
      </div>
      <div className="hero__works">
        <span className="hero__label">Featured works</span>
        <div className="hero__stage" ref={stageRef} tabIndex={0} aria-roledescription="carousel" aria-label="Featured works" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { drag.current.down = false; }} onKeyDown={onKeyDown}>
          {projects.map((p, i) => (
            <a key={p.title} ref={el => { cardRefs.current[i] = el; }} className="hero__card" href={p.href || '#'} {...(p.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})} draggable={false} aria-label={`${p.title} — ${p.tag}`} style={{ '--accent': p.accent }} onClick={e => onCardClick(e, i)}>
              <div className="hero__card-inner">
                {p.image ? <img className="hero__card-media" src={p.image} alt={`${p.title} project mockup`} draggable={false} /> : <div className="hero__card-poster"><span>{p.title}</span></div>}
                <div className="hero__card-shade" />
              </div>
            </a>
          ))}
        </div>
        <div className="hero__caption" aria-live="polite">
          {projects.map((p, i) => <div className="hero__caption-item" key={p.title} ref={el => { captionRefs.current[i] = el; }}><span className="hero__caption-title">{p.title}</span><span className="hero__caption-tag">{p.tag}</span></div>)}
        </div>
        <div className="hero__controls">
          <button type="button" className="hero__btn" onClick={() => go(-1)} aria-label="Previous project"><Chevron dir="left" /></button>
          <button type="button" className="hero__btn" onClick={() => go(1)} aria-label="Next project"><Chevron dir="right" /></button>
        </div>
      </div>
    </section>
  );
}
