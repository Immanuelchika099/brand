import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import XLogo from './XLogo';
import { Menu, X, ArrowUpRight, Camera, Mail, Phone, MessageCircle } from 'lucide-react';
import { copy } from '../data/content';
import { scrollToTarget } from '../lib/scroll';
import './Navbar.css';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef(null);
  const accentPanelRef = useRef(null);
  const whitePanelRef = useRef(null);
  const linkRefs = useRef([]);
  const eyebrowRef = useRef(null);
  const footerRef = useRef(null);
  const timelineRef = useRef(null);

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

  useLayoutEffect(() => {
    const panel = menuRef.current;
    if (!panel) return;

    const links = linkRefs.current.filter(Boolean);
    timelineRef.current?.kill();

    if (menuOpen) {
      gsap.set(panel, { autoAlpha: 1, pointerEvents: 'auto' });
      gsap.set([accentPanelRef.current, whitePanelRef.current], { xPercent: 100 });
      gsap.set(links, { yPercent: 110, opacity: 1 });
      gsap.set([eyebrowRef.current, footerRef.current], { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      tl.to(accentPanelRef.current, { xPercent: 0, duration: 0.55 }, 0)
        .to(whitePanelRef.current, { xPercent: 0, duration: 0.55 }, 0.1)
        .to(links, {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        }, 0.42)
        .to(eyebrowRef.current, { opacity: 1, duration: 0.35 }, 0.58)
        .to(footerRef.current, { opacity: 1, duration: 0.4 }, 0.72);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        tl.progress(1);
      }
      timelineRef.current = tl;
      return () => tl.kill();
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        gsap.set(panel, { autoAlpha: 0, pointerEvents: 'none' });
        gsap.set([accentPanelRef.current, whitePanelRef.current], { xPercent: 100 });
        gsap.set(links, { yPercent: 110 });
      },
    });

    tl.to([whitePanelRef.current, accentPanelRef.current], {
      xPercent: 100,
      duration: 0.48,
    }, 0);

    timelineRef.current = tl;
    return () => tl.kill();
  }, [menuOpen]);

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com/Dezigner_X', Icon: Camera },
    { label: 'Email', href: 'mailto:denzelcrentsil333@gmail.com', Icon: Mail },
    { label: 'WhatsApp', href: 'https://wa.me/2347026473595', Icon: MessageCircle },
    { label: 'Call', href: 'tel:+2347026473595', Icon: Phone },
  ];

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
            {menuOpen ? <X size={23} strokeWidth={1.7} /> : <Menu size={23} strokeWidth={1.7} />}
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        id="mobile-navigation"
        className="mobile-nav"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div ref={accentPanelRef} className="mobile-nav__accent" />
        <div ref={whitePanelRef} className="mobile-nav__white">
          <div className="mobile-nav__inner">
            <span ref={eyebrowRef} className="mobile-nav__eyebrow">EXPLORE</span>
            <div className="mobile-nav__items">
              {copy.nav.map((item, index) => (
                <div className="mobile-nav__item-mask" key={item.href}>
                  <a
                    ref={element => { linkRefs.current[index] = element; }}
                    href={item.href}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={event => navigate(event, item.href)}
                  >
                    <span className="mobile-nav__number">0{index + 1}</span>
                    <strong>{item.label}</strong>
                    <ArrowUpRight className="mobile-nav__arrow" size={25} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
            <div ref={footerRef} className="mobile-nav__footer-wrap">
              <div className="mobile-nav__socials" aria-label="Social and contact links">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a key={label} href={href} aria-label={label} title={label} target={label === 'Instagram' ? '_blank' : undefined} rel={label === 'Instagram' ? 'noreferrer' : undefined}>
                    <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                ))}
              </div>
              <div className="mobile-nav__footer">
                <XLogo small />
                <span>DEZIGNER X</span>
                <span>CREATIVE DESIGNER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
