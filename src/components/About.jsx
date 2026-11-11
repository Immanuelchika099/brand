import { Fragment, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

/* ───────────── edit these ───────────── */

const LABEL = 'ABOUT US'

const TEXT =
  'Dezigner X is a creative brand shaping bold visual identities and thoughtful digital experiences. Through design, digital art and creative direction, every idea is crafted with purpose, clarity and a distinct point of view.'

// x / y = pill centre as a % of the text block, rot = resting tilt (deg),
// at = scroll progress (0–1) where the pill pops in.
const PILLS = [
  { label: 'Visual storytelling', x: 60, y: 12, rot: -6, at: 0.4 },
  { label: 'Purposeful design', x: 22, y: 52, rot: 8, at: 0.76 },
  { label: 'Distinct by nature', x: 76, y: 82, rot: -4, at: 0.85 },
]

const BAND = 14 // how many characters are mid-transition at once
const SWEEP_END = 0.9 // sweep finishes at 90% of the pin; last 10% is a hold
const PIN_SCREENS = 3 // how many screen-heights of scroll the pin lasts
const HEAD_AT = 0.22 // where in a character's journey it is fully red (0–1)

/* ────────────────────────────────────── */

export default function About() {
  const sectionRef = useRef(null)
  const words = TEXT.split(' ')

  useLayoutEffect(() => {
    const section = sectionRef.current
    const chars = gsap.utils.toArray('.about__char', section)
    const pills = gsap.utils.toArray('.about__pill', section)

    // colors live in About.css, read once here so there's a single source
    const css = getComputedStyle(section)
    const ash = css.getPropertyValue('--about-ash').trim() || '#d6d6d6'
    const red = css.getPropertyValue('--about-red').trim() || '#ff0000'
    const ink = css.getPropertyValue('--about-ink').trim() || '#0a0a0a'

    const clearColors = () =>
      chars.forEach((c) => c.style.removeProperty('color'))

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ashToRed = gsap.utils.interpolate(ash, red)
      const redToInk = gsap.utils.interpolate(red, ink)

      // t = 0 → ash, t = HEAD_AT → pure red, t = 1 → settled ink
      const colorAt = (t) =>
        t <= HEAD_AT
          ? ashToRed(t / HEAD_AT)
          : redToInk((t - HEAD_AT) / (1 - HEAD_AT))

      const total = chars.length
      const last = new Array(total).fill(-1)

      // every character gets its own t, so the colour travels through the
      // paragraph like a wave and runs backwards when you scroll up
      const paint = (progress) => {
        const head =
          gsap.utils.clamp(0, 1, progress / SWEEP_END) * (total + BAND)

        for (let i = 0; i < total; i++) {
          const t =
            Math.round(gsap.utils.clamp(0, 1, (head - i) / BAND) * 100) / 100
          if (t === last[i]) continue
          last[i] = t
          chars[i].style.color = colorAt(t)
        }
      }

      // pills pop in at set points of the scroll and reverse on the way up
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
      tl.to({}, { duration: 0 }, 1) // pad to length 1 so progress maps 1:1

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * PIN_SCREENS}`,
        pin: true,
        anticipatePin: 1,
        scrub: true, // Lenis already smooths the scroll, no extra lag needed
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => paint(self.progress),
        onRefresh: (self) => paint(self.progress),
      })

      return clearColors
    })

    // reduced motion: no pin, no sweep, just the finished state
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

    // font swaps change line breaks, so re-measure once they're ready
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
