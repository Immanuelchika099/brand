import { Fragment, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

/* ───────────── edit these ───────────── */

const LABEL = 'A bit about us'

const TEXT =
  'Dezigner X is a creative brand shaping bold visual identities and thoughtful digital experiences. Through design, digital art and creative direction, every idea is crafted with purpose, clarity and a distinct point of view.'

const PILLS = [
  { label: 'Detail obsessed', x: 60, y: 12, rot: -6, at: 0.4 },
  { label: 'Pixels with purpose', x: 22, y: 52, rot: 8, at: 0.76 },
  { label: 'Template free', x: 76, y: 82, rot: -4, at: 0.85 },
]

const BAND = 14
const SWEEP_END = 0.9
const PIN_SCREENS = 3
const HEAD_AT = 0.22
const PEAK_SCALE = 1.2

/* ────────────────────────────────────── */

export default function About() {
  const sectionRef = useRef(null)
  const words = TEXT.split(' ')

  useLayoutEffect(() => {
    const section = sectionRef.current
    const chars = gsap.utils.toArray('.about__char', section)
    const pills = gsap.utils.toArray('.about__pill', section)

    const css = getComputedStyle(section)
    const ash = css.getPropertyValue('--about-ash').trim() || '#d6d6d6'
    const red = css.getPropertyValue('--about-red').trim() || '#ff0000'
    const ink = css.getPropertyValue('--about-ink').trim() || '#0a0a0a'

    const clearColors = () =>
      chars.forEach((c) => {
        c.style.removeProperty('color')
        c.style.removeProperty('transform')
      })

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ashToRed = gsap.utils.interpolate(ash, red)
      const redToInk = gsap.utils.interpolate(red, ink)

      const colorAt = (t) =>
        t <= HEAD_AT
          ? ashToRed(t / HEAD_AT)
          : redToInk((t - HEAD_AT) / (1 - HEAD_AT))

      const scaleAt = (t) => {
        const k =
          t <= HEAD_AT ? t / HEAD_AT : 1 - (t - HEAD_AT) / (1 - HEAD_AT)
        return Math.round((1 + (PEAK_SCALE - 1) * k) * 1000) / 1000
      }

      const total = chars.length
      const last = new Array(total).fill(-1)

      const paint = (progress) => {
        const head =
          gsap.utils.clamp(0, 1, progress / SWEEP_END) * (total + BAND)

        for (let i = 0; i < total; i++) {
          const t =
            Math.round(gsap.utils.clamp(0, 1, (head - i) / BAND) * 100) / 100
          if (t === last[i]) continue
          last[i] = t
          chars[i].style.color = colorAt(t)
          const s = scaleAt(t)
          chars[i].style.transform = s === 1 ? '' : `scale(${s})`
        }
      }

      gsap.set(pills, { xPercent: -50, yPercent: -50, opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.8)' } })
      pills.forEach((pill, i) => {
        const { at, rot } = PILLS[i]
        tl.fromTo(
          pill,
          { opacity: 0, scale: 0.5, rotation: rot - 14 },
          { opacity: 1, scale: 1, rotation: rot, duration: 0.07 },
          at
        )
      })
      tl.to({}, { duration: 0 }, 1)

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * PIN_SCREENS}`,
        pin: true,
        anticipatePin: 1,
        scrub: true,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => paint(self.progress),
        onRefresh: (self) => paint(self.progress),
      })

      return clearColors
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      chars.forEach((c) => (c.style.color = ink))
      gsap.set(pills, {
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        rotation: (i) => PILLS[i].rot,
      })
      return clearColors
    })

    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => mm.revert()
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <p className="about__label">{LABEL}</p>

      <div className="about__copy">
        <h2 className="about__sr">{TEXT}</h2>

        <p className="about__text" aria-hidden="true">
          {words.map((word, w) => (
            <Fragment key={w}>
              <span className="about__word">
                {[...word].map((ch, c) => (
                  <span className="about__char" key={c}>
                    {ch}
                  </span>
                ))}
              </span>{' '}
            </Fragment>
          ))}
        </p>

        {PILLS.map((p) => (
          <span
            key={p.label}
            className="about__pill"
            style={{ '--x': `${p.x}%`, '--y': `${p.y}%` }}
          >
            {p.label}
          </span>
        ))}
      </div>
    </section>
  )
}
