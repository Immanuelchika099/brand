import { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './XSculpture.css';
const layers = Array.from({ length: 18 }, (_, i) => i);
export default function XSculpture({ className = '' }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 18 }), sy = useSpring(y, { stiffness: 90, damping: 18 });
  const ref = useRef(null);
  function move(e) { const r = ref.current?.getBoundingClientRect(); if (!r) return; x.set(((e.clientX-r.left)/r.width-.5)*18); y.set(((e.clientY-r.top)/r.height-.5)*-18); }
  return <div ref={ref} className={`x-sculpture ${className}`} onPointerMove={move} onPointerLeave={() => {x.set(0);y.set(0);}}>
    <motion.div className="x-sculpture__body" style={{ rotateX: sy, rotateY: sx }}>
      {layers.map(i => <svg key={i} className="x-sculpture__layer" style={{ transform: `translateZ(${i*2.25}px) rotate(${i*.13}deg)` }} viewBox="0 0 200 200" aria-hidden="true"><path d="M42 20c-8-8-20-8-28 0s-8 20 0 28l58 52-58 52c-8 8-8 20 0 28s20 8 28 0l58-52 58 52c8 8 20 8 28 0s8-20 0-28l-58-52 58-52c8-8 8-20 0-28s-20-8-28 0l-58 52z" fill={`hsl(0 100% ${Math.max(12, 18+i*2.4)}%)`} stroke={i===17?'#fff':'#560000'} strokeWidth={i===17?2:1}/></svg>)}
      <span className="x-orbit x-orbit--one"/><span className="x-orbit x-orbit--two"/>
    </motion.div><span className="x-sculpture__shadow"/>
  </div>;
}
