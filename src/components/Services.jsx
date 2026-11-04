import { ArrowUpRight } from 'lucide-react';
import { services, copy } from '../data/content';
import SplitText from './SplitText';
import './Services.css';

export default function Services() {
  return (
    <section id="services" className="services-section">
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
