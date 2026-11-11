import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const HEADING = 'Selected Works'

const PROJECTS = [
  { title: 'EVOLV', category: 'AI productivity app', logo: '', href: '#' },
  { title: 'KAIZERBRIX', category: 'Company website', logo: '', href: 'https://kaizerbrix.vercel.app' },
  { title: 'PR Team', category: 'Team website', logo: '', href: '#' },
]

const STATEMENT = 'That’s just the start, the rest lives on its own page.'

const PILLS = [
  { label: 'Worth the click', x: 90, y: 20, rot: -8 },
  { label: 'Plenty more', x: 4, y: 62, rot: -5 },
  { label: 'No filler', x: 74, y: 98, rot: -4 },
]

const CTA = { label: 'See all projects', href: '#' }
const RISE = 0.3
const RADIUS_MOBILE = 16
const RADIUS_DESKTOP = 24

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Projects() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const q = gsap.utils.selector(root)
    const items = q('.works__item')
    const pills = q('.works__pill')
    const pillLabels = q('.works__pill-label')
    const text = q('.works__statement-text')[0]
    const cta = q('.works__cta')[0]
    const ctaLabel = q('.works__cta-label')[0]

    gsap.set(pills, { xPercent: -50, yPercent: -50, rotation: (i) => PILLS[i].rot })

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      items.forEach((item) => {
        const card = item.querySelector('.works__card')
        const media = item.querySelector('.works__media')

        gsap.fromTo(card, { y: () => window.innerHeight * RISE }, {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'top 25%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        gsap.fromTo(media, { borderRadius: 0 }, {
          borderRadius: () => window.innerWidth >= 768 ? RADIUS_DESKTOP : RADIUS_MOBILE,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top 35%',
            end: 'top -5%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })

      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: root.querySelector('.works__statement'),
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(text, { '--reveal': '0%' }, { '--reveal': '114%', duration: 1.5, ease: 'power2.inOut' })
        .fromTo(pills, { opacity: 0, scale: 0.4, rotation: (i) => PILLS[i].rot - 16 }, {
          opacity: 1, scale: 1, rotation: (i) => PILLS[i].rot,
          duration: 0.7, ease: 'back.out(1.8)', stagger: 0.18,
        }, 0.7)
        .fromTo(pillLabels, { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.18 }, 1.05)
        .fromTo(cta, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 1.5)
        .fromTo(ctaLabel, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.9)
    })

    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => mm.revert()
  }, [])

  return (
    <section className="works" id="work" ref={rootRef}>
      <h2 className="works__heading">{HEADING}</h2>

      <ul className="works__list">
        {PROJECTS.map((p) => (
          <li className="works__item" key={p.title}>
            <a className="works__card" href={p.href}
              target={p.href.startsWith('http') ? '_blank' : undefined}
              rel={p.href.startsWith('http') ? 'noreferrer' : undefined}>
              <div className="works__media" role="img" aria-label={`${p.title} project preview placeholder`}>
                <span className="works__skeleton" aria-hidden="true" />
              </div>

              <div className="works__caption">
                <span className="works__logo">
                  {p.logo ? <img src={p.logo} alt="" /> : p.title[0]}
                </span>
                <span className="works__meta">
                  <span className="works__title">{p.title}</span>
                  <span className="works__category">{p.category}</span>
                </span>
                <span className="works__arrow" aria-hidden="true"><ArrowIcon /></span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="works__statement">
        <div className="works__statement-block">
          <p className="works__statement-text">{STATEMENT}</p>
          {PILLS.map((p) => (
            <span key={p.label} className="works__pill" style={{ '--x': `${p.x}%`, '--y': `${p.y}%` }}>
              <span className="works__pill-label">{p.label}</span>
            </span>
          ))}
        </div>

        <a className="works__cta" href={CTA.href}>
          <span className="works__cta-label">{CTA.label}</span>
          <span className="works__cta-icon" aria-hidden="true"><ArrowIcon /></span>
        </a>
      </div>
    </section>
  )
}
