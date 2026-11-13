import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { copy } from '../data/content';
import CircularCarousel from './CircularCarousel';
import './Hero.css';

const PROJECTS = [
  { src: '/assets/keizerbrix-mockup.webp', alt: 'KaizerBrix website mockup' },
  { src: '/src/assets/kaizerbrix-homepage.png', alt: 'KaizerBrix homepage' },
  { src: '/src/assets/kaizerbrix-about.png', alt: 'KaizerBrix about page' },
  { src: '/src/assets/kaizerbrix.png', alt: 'KaizerBrix website design' },
  { src: '/assets/evolv-mockup.webp', alt: 'EVOLV application mockup' },
  { src: '/assets/evolv.webp', alt: 'EVOLV interface design' },
  { src: '/src/assets/luxe-homepage-desktop.png', alt: 'Luxe Hair desktop website' },
  { src: '/src/assets/luxe-homepage.png', alt: 'Luxe Hair homepage design' },
  { src: '/assets/brand/luxe-hair-mockup.svg', alt: 'Luxe Hair website mockup' }
];

export default function Hero({ ready = false }) {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    if (!ready || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.15, ease: 'power4.out' });
      gsap.fromTo(subRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .85, delay: .28, ease: 'power3.out' });
    }, rootRef);
    return () => ctx.revert();
  }, [ready]);

  return <section id="hero" className="hero" ref={rootRef}>
    <img className="hero__geometry" src="/assets/figma/hero-geometry.webp" alt="" aria-hidden="true" />
    <div className="hero__top">
      <h1 className="hero__heading" ref={headingRef}>{copy.hero.title}</h1>
      {copy.hero.role && <p className="hero__sub" ref={subRef}>{copy.hero.role}</p>}
    </div>
    <div className="hero__works">
      <div className="hero__carousel-wrap">
        <CircularCarousel items={PROJECTS} preset="cylinder" intro="rise" cardWidth={230}
          aspectRatio={.78} gap={28} speed={9} autoplay="drift" direction="left"
          captions={false} fadeColor="#000000" cornerRadius={18} />
      </div>
    </div>
  </section>;
}
