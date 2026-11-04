import XLogo from './XLogo';
import { copy } from '../data/content';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-bottom">
        <a className="footer-brand" href="/" aria-label="Dezigner X home">
          <XLogo />
          <span>{copy.footer.aka}</span>
          <b>{copy.footer.name}</b>
        </a>
        <p>{copy.footer.legal}</p>
        <a className="footer-back-top" href="/#hero">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}