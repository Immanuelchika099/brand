import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
let lenis;
let ticker;
export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ duration: 1.45, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: 0.9 });
  const update = time => lenis?.raf(time * 1000);
  ticker = update;
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ScrollTrigger.update);
  window.__lenis = lenis;
  return () => {
    if (ticker) gsap.ticker.remove(ticker);
    lenis?.destroy();
    lenis = undefined;
    ticker = undefined;
    window.__lenis = undefined;
  };
}
export function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { offset: -24 });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}
export { ScrollTrigger };
