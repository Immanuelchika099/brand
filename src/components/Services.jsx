import { ArrowUpRight } from 'lucide-react';
import { services, copy } from '../data/content';
import useGsap from '../hooks/useGsap';
import SplitText from './SplitText';
import './Services.css';

export default function Services() {
  const scope = useGsap(gsap => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo('.service-card',
      { autoAlpha: 0, filter: 'blur(12px)' },
      {
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 1.15,
        stagger: 0.2,
        ease: 'power2.out',
        clearProps: 'filter',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 82%',
          toggleActions: 'play reverse play reverse'
        }
      }
    );
  }, []);

  return (
    <section id="services" className="services-section" ref={scope}>
      <div className="services-panel">
        <span className="services-kicker">{copy.services.kicker}</span>
        <h2><SplitText>{copy.services.title}</SplitText></h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <div
                className="service-card__image"
                style={{ backgroundImage: `url(${service.image})`, backgroundPosition: `${service.imagePosition} center` }}
                aria-hidden="true"
              />
              <div className="service-card__shade" />
              <div className="service-card__copy">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
              <span className={`service-card__arrow ${index === 2 ? 'is-visible' : ''}`}><ArrowUpRight size={19} /></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
