import { ArrowUpRight } from 'lucide-react';
import { services, copy } from '../data/content';
import useGsap from '../hooks/useGsap';
import SplitText from './SplitText';
import './Services.css';

export default function Services() {
  const scope = useGsap(gsap => {
    gsap.from('.service-card', {
      y: 70, opacity: 0, stagger: .15, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.services-grid', start: 'top 82%' }
    });
    gsap.to('.service-card__image', {
      yPercent: -8, ease: 'none',
      scrollTrigger: { trigger: '.services-grid', start: 'top bottom', end: 'bottom top', scrub: true }
    });
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
