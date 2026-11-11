import { useEffect, useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { contact, copy } from '../data/content';
import './Contact.css';

function InstagramMark({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Contact() {
  const [showTalk, setShowTalk] = useState(false);
  const [pauseTitle, setPauseTitle] = useState(false);

  useEffect(() => {
    if (pauseTitle) return;
    const interval = window.setInterval(() => setShowTalk((current) => !current), 3600);
    return () => window.clearInterval(interval);
  }, [pauseTitle]);

  const rows = [
    { Icon: Mail, text: contact.email, href: 'mailto:' + contact.email },
    { Icon: Phone, text: contact.phone, href: 'tel:' + contact.phone.replaceAll(' ', '') },
    { Icon: InstagramMark, text: contact.instagram, href: 'https://instagram.com/Dezigner_X' },
    { Icon: MapPin, text: contact.location },
  ];

  return (
    <section id="contact" className="contact-section">
      <img className="contact__geometry" src="/assets/figma/hero-geometry.webp" alt="" aria-hidden="true" />
      <div className="contact-section__intro">
        <h2 className="contact-title" aria-label="Contact X — Let's talk">
          <span
            className="contact-title__window"
            aria-hidden="true"
            onMouseEnter={() => setPauseTitle(true)}
            onMouseLeave={() => setPauseTitle(false)}
            onFocus={() => setPauseTitle(true)}
            onBlur={() => setPauseTitle(false)}
          >
            <span key={showTalk ? 'talk' : 'contact'} className="contact-title__swap">
              {showTalk ? 'TALK TO US.' : copy.contact.title}
            </span>
          </span>
        </h2>
        <a className="contact-start-button" href="/start-project" onClick={(event) => { event.preventDefault(); window.history.pushState({}, "", "/start-project"); window.dispatchEvent(new Event("dezigner:navigate")); window.scrollTo(0, 0); }}>
          START A PROJECT
          <span className="contact-start-button__icon" aria-hidden="true"><ArrowUpRight size={14} strokeWidth={1.8} /></span>
        </a>
      </div>
      <ul>
        {rows.map(({ Icon, text, href }) => (
          <li key={text}>
            <Icon size={17} />
            {href ? <a href={href}>{text}</a> : <span>{text}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}