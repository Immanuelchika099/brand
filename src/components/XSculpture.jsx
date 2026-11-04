import { useRef } from 'react';
import { motion, useSpring, useMotionValue, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import './XSculpture.css';

export default function XSculpture({ className = '', color = 'red', depth = 1.1, layersCount = 36 }) {
 const layers = Array.from({ length: layersCount }, (_, i) => i);
 const ref = useRef(null), reduce = useReducedMotion();
 const x = useMotionValue(0), y = useMotionValue(0);
 const sx = useSpring(x, { stiffness: 90, damping: 18 }), sy = useSpring(y, { stiffness: 90, damping: 18 });
 const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
 const scrollRotate = useTransform(scrollYProgress, [0, 1], [-34, 34]);
 function move(e) { if(reduce)return; const r = ref.current?.getBoundingClientRect(); if (!r) return; x.set(((e.clientX-r.left)/r.width-.5)*18); y.set(((e.clientY-r.top)/r.height-.5)*-18); }
 return <div ref={ref} className={`x-sculpture ${className}`} onPointerMove={move} onPointerLeave={() => {x.set(0);y.set(0);}}>
  <div className="x-sculpture__body"><motion.div className="x-sculpture__tilt" style={{ rotateX: reduce?0:sy, rotateY: reduce?0:sx, rotateZ: reduce?0:scrollRotate }}>
   {layers.map(i => <svg key={i} className="x-sculpture__layer" style={{ transform: `translateZ(${i*depth}px) rotate(${i*(layersCount > 36 ? .035 : .13)}deg)` }} viewBox="0 0 200 200" aria-hidden="true"><path d="M42 20c-8-8-20-8-28 0s-8 20 0 28l58 52-58 52c-8 8-8 20 0 28s20 8 28 0l58-52 58 52c8 8 20 8 28 0s8-20 0-28l-58-52 58-52c8-8 8-20 0-28s-20-8-28 0l-58 52z" fill={color === 'white' ? '#fff' : `hsl(0 100% ${Math.max(12, 18+(i/(layersCount-1))*42)}%)`} stroke={color === 'white' ? (i===layersCount-1?'#fff':'#aaa') : (i===layersCount-1?'#fff':'#560000')} strokeWidth={i===layersCount-1?2:1}/></svg>)}
   <span className="x-orbit x-orbit--one"/><span className="x-orbit x-orbit--two"/>
  </motion.div></div><span className="x-sculpture__shadow"/>
 </div>;
}