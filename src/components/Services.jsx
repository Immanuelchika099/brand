import { useEffect, useRef } from 'react';
import './Services.css';

const SERVICES = [
  {
    id: 'web',
    title: 'Web Design & Development',
    gradient: 'linear-gradient(135deg, #ff6a00 0%, #ff5a00 45%, #ff2d00 100%)',
    points: [
      {
        label: 'Custom design, built for conversion',
        lead: 'We design and build websites that',
        dim: 'feel as good as they look.',
      },
      {
        label: 'Fast, scalable and mobile-first',
        lead: 'Every build ships responsive, quick to load and ready to grow.',
      },
    ],
    cta: { label: 'Explore in detail', href: '#contact' },
    preview: null,
  },
  {
    id: 'brand',
    title: 'Branding & Identity',
    gradient: 'linear-gradient(135deg, #17524f 0%, #23857d 48%, #d9a04f 100%)',
    points: [
      {
        label: 'Logo and visual identity',
        lead: 'We shape identities that',
        dim: 'people remember.',
      },
      {
        label: 'Brand strategy and guidelines',
        lead: 'Clear rules for how your brand looks, sounds and behaves.',
      },
    ],
    cta: { label: 'Explore in detail', href: '#contact' },
    preview: null,
  },
  {
    id: 'product',
    title: 'Product Design',
    gradient: 'linear-gradient(135deg, #2a1d8c 0%, #5a35c6 50%, #ff6b3d 100%)',
    points: [
      {
        label: 'UI and UX',
        lead: 'We design interfaces that',
        dim: 'make sense at first glance.',
      },
      {
        label: 'Design systems',
        lead: 'Reusable components so your product stays consistent as it grows.',
      },
    ],
    cta: { label: 'Explore in detail', href: '#contact' },
    preview: null,
  },
  {
    id: 'growth',
    title: 'SEO & Growth',
    gradient: 'linear-gradient(135deg, #d42a00 0%, #ee4600 50%, #ff6a00 100%)',
    points: [
      {
        label: 'Technical and on-page SEO',
        lead: 'We make sure the right people find you',
        dim: 'without paying for every click.',
      },
      {
        label: 'Long-term organic growth',
        lead: 'Reporting that shows what is working and what to do next.',
      },
    ],
    cta: { label: 'Explore in detail', href: '#contact' },
    preview: null,
  },
];

function clamp(value) {
  return Math.min(1, Math.max(0, value));
}

function useStackScroll(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(root.querySelectorAll('[data-service-card]'));
    const scrub = root.querySelector('[data-service-scrub]');
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        const progress = !reduceMotion && nextCard
          ? clamp(1 - nextCard.getBoundingClientRect().top / viewportHeight)
          : 0;

        card.style.setProperty('--p', progress.toFixed(4));
      });

      if (scrub) {
        const top = scrub.getBoundingClientRect().top;
        const progress = reduceMotion
          ? 1
          : clamp((viewportHeight * 0.9 - top) / (viewportHeight * 0.5));
        scrub.style.setProperty('--s', progress.toFixed(4));
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [rootRef]);
}

function ServicePreview({ service }) {
  if (service.preview) return service.preview;
  return null;
}

export default function Services() {
  const rootRef = useRef(null);
  useStackScroll(rootRef);

  return (
    <section
      className="services"
      id="services"
      ref={rootRef}
      aria-labelledby="services-heading"
    >
      <header className="services__intro">
        <h2 id="services-heading" className="services__heading" data-service-scrub>
          One studio.
          <br />
          Every part of your brand.
        </h2>
      </header>

      <div className="services__stack">
        {SERVICES.map((service, index) => (
          <article
            key={service.id}
            className="svc-card"
            data-service-card
            style={{ zIndex: index + 1 }}
            aria-labelledby={`service-${service.id}-title`}
          >
            <div className="svc-card__inner" style={{ '--grad': service.gradient }}>
              <div className="svc-card__body">
                <h3 className="svc-card__title" id={`service-${service.id}-title`}>
                  {service.title}
                </h3>

                <div className="svc-card__content">
                  <div className="svc-card__box">
                    {service.points.map((point) => (
                      <div className="svc-point" key={point.label}>
                        <p className="svc-point__label">
                          <span className="svc-point__tick" aria-hidden="true" />
                          {point.label}
                        </p>
                        <p className="svc-point__text">
                          {point.lead}
                          {point.dim && <> <span className="svc-point__dim">{point.dim}</span></>}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="svc-card__cta">
                    <a className="svc-btn" href={service.cta.href}>{service.cta.label}</a>
                  </div>

                  <div className="svc-card__preview">
                    <div className="svc-card__preview-inner">
                      <ServicePreview service={service} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
