import { useEffect, useRef, useState } from 'react';
import XLogo from './XLogo';
import { copy } from '../data/content';
import { scrollToTarget } from '../lib/scroll';
import './Navbar.css';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      if (menuOpen) return;
      const currentY = window.scrollY;
      const difference = currentY - lastScrollY.current;
      const hero = document.querySelector('#hero');
      const heroBottom = hero
        ? hero.offsetTop + hero.offsetHeight + (window.innerWidth >= 860 ? window.innerHeight * 1.25 : 0)
        : 0;

      if (currentY <= 12 || currentY < heroBottom - 80) {
        setVisible(true);
      } else if (Math.abs(difference) > 3) {
        setVisible(difference < 0);
      }

      lastScrollY.current = currentY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    function handleKeyDown(event) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const navigate = (event, href) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
    <nav className={`site-nav${visible || menuOpen ? ' site-nav--visible' : ' site-nav--hidden'}`} aria-label="Main navigation">
      <div className="site-nav__links">
        <a className="site-nav__brand" href="#hero" onClick={event => navigate(event, '#hero')} aria-label="Back to top">
          <XLogo />
        </a>
        <div className="site-nav__desktop-links">
          {copy.nav.map(item => (
            <a key={item.href} href={item.href} onClick={event => navigate(event, item.href)}>{item.label}</a>
          ))}
        </div>
        <button className={`site-nav__toggle${menuOpen ? ' is-open' : ''}`} type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(open => !open)}>
          <span/><span/>
        </button>
      </div>
    </nav>
    <div id="mobile-navigation" className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`} aria-hidden={!menuOpen}>
      <div className="mobile-nav__inner">
        <span className="mobile-nav__eyebrow">EXPLORE</span>
        <div className="mobile-nav__items">
          {copy.nav.map((item, index) => (
            <a key={item.href} href={item.href} tabIndex={menuOpen ? 0 : -1} style={{ '--item-index': index }} onClick={event => navigate(event, item.href)}>
              <span className="mobile-nav__number">0{index + 1}</span>{item.label}<span className="mobile-nav__arrow">↗</span>
            </a>
          ))}
        </div>
        <div className="mobile-nav__footer"><XLogo small /><span>DEZIGNER X</span><span>CREATIVE DESIGNER</span></div>
      </div>
    </div>
    </>
  );
}
