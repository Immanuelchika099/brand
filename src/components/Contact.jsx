import { Mail, Phone, MapPin } from 'lucide-react';
import { contact, copy } from '../data/content';
import SplitText from './SplitText';
import './Contact.css';

function InstagramMark({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Contact() {
  const rows = [
    { Icon: Mail, text: contact.email, href: 'mailto:' + contact.email },
    { Icon: Phone, text: contact.phone, href: 'tel:' + contact.phone.replaceAll(' ', '') },
    { Icon: InstagramMark, text: contact.instagram, href: 'https://instagram.com/Dezigner_X' },
    { Icon: MapPin, text: contact.location },
  ];

  return (
    <section id="contact" className="contact-section">
      <div>
        <span>{copy.contact.kicker}</span>
        <h2><SplitText>{copy.contact.title}</SplitText></h2>
        <h3>{copy.contact.availability}</h3>
        <p>{copy.contact.body}</p>
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