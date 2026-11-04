import { useRef } from 'react';
import { MoveDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import XSculpture from './XSculpture';
import { stats, copy } from '../data/content';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ introReady = false }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (!introReady) return;
    const items = gsap.utils.toArray('.hero__copy > *', root.current);
    const poster = root.current.querySelector('.hero__poster');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([...items, poster], { autoAlpha: 1, clearProps: 'all' });
      return;
    }
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.fromTo(items,
        { autoAlpha: 0, y: 38 },
        { autoAlpha: 1, y: 0, duration: .82, stagger: .12, clearProps: 'all' }
      ).fromTo(poster,
        { autoAlpha: 0, y: 64, rotateY: -14, rotateZ: 2, scale: .96 },
        { autoAlpha: 1, y: 0, rotateY: 0, rotateZ: 0, scale: 1, duration: 1.05, clearProps: 'all' },
        '-=.68'
      );
    }, root);
    return () => ctx.revert();
  }, [introReady]);
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 860) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=125%', scrub: 1.2, pin: true }
      });
      tl.to('.hero__copy', { scale: 1.22, opacity: .18, y: -70, ease: 'none' }, 0)
        .to('.hero__poster', { rotateY: -16, rotateZ: 4, x: 80, y: -35, scale: .9, ease: 'none' }, 0)
        .to('.hero__ghost', { xPercent: -18, ease: 'none' }, 0)
        .to('.hero__geometry', { yPercent: 12, rotate: 5, ease: 'none' }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={root} className={`hero-section ${introReady ? "hero-section--ready" : "hero-section--waiting"}`}>
      <img className="hero__geometry" src="/assets/figma/hero-geometry.webp" alt="" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">{copy.hero.updated}</span>
          <h1>{copy.hero.title}</h1>
          <div className="hero__role">{copy.hero.role}</div>
          <div className="hero__stats">
            {stats.map(s => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
          </div>
        </div>
        <article className="hero__poster">
          <div className="hero__ghost">{copy.hero.posterWord}</div>
          <div className="hero__avatar"><XSculpture color="white" /></div>
          <span className="hero__xxxx">{copy.hero.outline}</span>
          <div className="hero__poster-foot">
            <b>DESIGNER X</b>
            <p className="hero__footer-pattern"><span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span><span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span><span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></p>
          </div>
        </article>
      </div>
      <span className="hero__scroll">{copy.hero.scroll.replace(/\s*↓$/, '')} <MoveDown size={14} strokeWidth={1.6} aria-hidden="true" /></span>
    </section>
  );
}
