import { useEffect, useRef } from 'react';
import { Quote, ArrowUpRight } from 'lucide-react';
import { testimonials } from '../data/content';
import useGsap from '../hooks/useGsap';
import './Testimonials.css';

export default function Testimonials() {
  const railRef = useRef(null);
  const dragging = useRef(false);
  const pointerStart = useRef(0);
  const lastPointerX = useRef(0);
  const dragVelocity = useRef(0);
  const scope = useGsap((gsap) => {
    gsap.fromTo('.testimonials-heading > *', { y: 45, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.testimonials-section', start: 'top 78%', toggleActions: 'play reverse play reverse' }
    });
    gsap.fromTo('.testimonial-card', { y: 55, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.16, ease: 'power3.out',
      scrollTrigger: { trigger: '.testimonial-rail', start: 'top 84%', toggleActions: 'play reverse play reverse' }
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollLeft = rail.scrollWidth / 2;
    let frame;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const move = () => {
      const loopWidth = rail.scrollWidth / 2;
      if (dragging.current) {
        // Ease toward the pointer target instead of jumping on every pointer event.
        rail.scrollLeft += (rail._dragTarget - rail.scrollLeft) * 0.28;
      } else if (Math.abs(dragVelocity.current) > 0.12) {
        rail.scrollLeft += dragVelocity.current;
        dragVelocity.current *= 0.92;
      } else if (!reducedMotion) {
        rail.scrollLeft -= 0.38;
      }

      // Keep the duplicated track seamless in either direction.
      if (loopWidth > 0) {
        if (rail.scrollLeft <= 0) rail.scrollLeft += loopWidth;
        else if (rail.scrollLeft >= loopWidth * 2) rail.scrollLeft -= loopWidth;
      }
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onPointerDown = (event) => {
    const rail = railRef.current;
    if (!rail) return;
    dragging.current = true;
    lastPointerX.current = event.clientX;
    rail._dragTarget = rail.scrollLeft;
    dragVelocity.current = 0;
    rail.classList.add('is-dragging');
    rail.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!dragging.current || !railRef.current) return;
    const delta = event.clientX - lastPointerX.current;
    railRef.current._dragTarget -= delta;
    dragVelocity.current = -delta * 0.72;
    lastPointerX.current = event.clientX;
  };

  const onPointerUp = () => {
    dragging.current = false;
    railRef.current?.classList.remove('is-dragging');
  };

  const cards = [
    ...testimonials.map((item) => ({ ...item, type: 'quote' })),
    { type: 'next', name: 'YOUR STORY', role: 'THE NEXT CLIENT EXPERIENCE', quote: 'Good work leaves an impression. The next story could be yours.' }
  ];

  const renderCard = (item, index, clone = false) => (
    <article className={`testimonial-card ${item.type === 'next' ? 'testimonial-card--next' : ''}`} key={`${clone ? 'clone-' : ''}${index}`} aria-hidden={clone ? 'true' : undefined}>
      <div className="testimonial-card__top">
        <span>{item.isSample ? 'SAMPLE REVIEW' : item.type === 'quote' ? 'CLIENT WORDS' : 'THE NEXT CHAPTER'}</span>
        <Quote size={25} strokeWidth={1.25} />
      </div>
      <blockquote>{item.quote}</blockquote>
      <div className="testimonial-card__footer">
        <div><span>{item.role}</span><h3>{item.name}</h3></div>
        {item.type === 'next' && <ArrowUpRight size={24} strokeWidth={1.4} />}
      </div>
    </article>
  );

  return (
    <section id="testimonials" className="testimonials-section" ref={scope}>
      <div className="testimonials-heading">
        <div className="testimonials-kicker"><span>04 / THE WORD</span><i /></div>
        <div className="testimonials-heading__row">
          <h2>WORDS<br /><em>THAT STAY.</em></h2>
          <p>A little perspective from the people behind the projects.</p>
        </div>
      </div>
      <div className="testimonial-rail-wrap">
        <div className="testimonial-rail" ref={railRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onLostPointerCapture={onPointerUp} aria-label="Client testimonials. Drag to explore.">
          <div className="testimonial-track">
            {cards.map((item, index) => renderCard(item, index))}
            {cards.map((item, index) => renderCard(item, index, true))}
          </div>
        </div>
      </div>
    </section>
  );
}
