import { useState,useEffect } from 'react';
import { AnimatePresence,motion,useReducedMotion } from 'framer-motion';
import { faqs,copy } from '../data/content';
import { ScrollTrigger } from '../lib/scroll';
import Sparkle from './Sparkle';
import SplitText from './SplitText';
import './FAQ.css';
export default function FAQ(){
 const [open,setOpen]=useState(0), reduce=useReducedMotion();
 useEffect(()=>{ScrollTrigger.refresh()},[open]);
 const refresh=()=>ScrollTrigger.refresh();
 return <section id="faq" className="faq-section"><div className="faq-wrap"><h2><SplitText>{copy.faq.title}</SplitText></h2><div className="faq-list">{faqs.map((item,i)=><motion.div className="faq-item" layout key={item.q} transition={{duration:reduce?0:.42,ease:[.22,1,.36,1]}}><AnimatePresence initial={false} mode="sync">{open===i?<motion.div key="open" className="faq-open" layout initial={reduce?false:{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduce?0:.45,ease:[.22,1,.36,1]}} onAnimationComplete={refresh}><div className="faq-open__top"><strong>{String(i+1).padStart(2,'0')}</strong><button aria-expanded="true" onClick={()=>setOpen(-1)}>{item.q}<span>−</span></button></div><motion.div className="faq-answer" initial={reduce?false:{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduce?0:.45,ease:[.22,1,.36,1]}} onAnimationComplete={refresh}><p>{item.a}</p></motion.div><span className="faq-grid"/></motion.div>:<motion.button key="closed" layout className="faq-closed" aria-expanded="false" onClick={()=>setOpen(i)}><strong>{String(i+1).padStart(2,'0')}</strong><i/><span>{item.q}</span><b>+</b></motion.button>}</AnimatePresence></motion.div>)}</div><Sparkle className="faq-spark"/></div></section>;
}