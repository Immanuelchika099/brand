import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { faqs, copy } from '../data/content';
import { ScrollTrigger } from '../lib/scroll';
import SplitText from './SplitText';
import './FAQ.css';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => { ScrollTrigger.refresh(); }, [open]);
  const refresh = () => ScrollTrigger.refresh();

  return (
    <section id="faq" className="faq-section">
      <div className="faq-wrap">
        <h2 className="faq-heading"><span><SplitText>FREQUENTLY ASKED</SplitText></span><br className="faq-heading__break" /><span><SplitText>QUESTIONS</SplitText></span></h2>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <motion.div className="faq-item" layout key={item.q} transition={{ duration: reduce ? 0 : .42, ease: [.22, 1, .36, 1] }}>
              <AnimatePresence initial={false} mode="sync">
                {open === index ? (
                  <motion.div
                    key="open"
                    className="faq-open"
                    onClick={() => setOpen(-1)}
                    layout
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : .45, ease: [.22, 1, .36, 1] }}
                    onAnimationComplete={refresh}
                  >
                    <div className="faq-open__top">
                      <strong>{String(index + 1).padStart(2, '0')}</strong>
                      <button aria-expanded="true" onClick={() => setOpen(-1)}>
                        {item.q}<span>−</span>
                      </button>
                    </div>
                    <motion.div
                      className="faq-answer"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : .45, ease: [.22, 1, .36, 1] }}
                      onAnimationComplete={refresh}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                    <span className="faq-grid" />
                  </motion.div>
                ) : (
                  <motion.button
                    key="closed"
                    layout
                    className="faq-closed"
                    aria-expanded="false"
                    onClick={() => setOpen(index)}
                  >
                    <strong>{String(index + 1).padStart(2, '0')}</strong>
                    <i />
                    <span>{item.q}</span>
                    <b>+</b>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
