import { useEffect, useRef, useState } from 'react';
import XLogo from './XLogo';
import { copy } from '../data/content';
import { scrollToTarget } from '../lib/scroll';
import './Navbar.css';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
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
  }, []);

  return (
    <nav className={`site-nav${visible ? ' site-nav--visible' : ' site-nav--hidden'}`} aria-label="Main navigation">
      <div className="site-nav__links">
        <a className="site-nav__brand" href="#hero" onClick={event => { event.preventDefault(); scrollToTarget('#hero'); }} aria-label="Back to top">
          <XLogo />
        </a>
        {copy.nav.map(item => (
          <a key={item.href} href={item.href} onClick={event => { event.preventDefault(); scrollToTarget(item.href); }}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
