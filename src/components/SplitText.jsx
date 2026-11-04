import { useMemo } from 'react';
import './SplitText.css';
export default function SplitText({ children, className = '' }) {
  const chars = useMemo(() => String(children).split(''), [children]);
  return <span className={`split-text ${className}`} aria-label={children}>{chars.map((char,i)=><span className="split-text__mask" key={i}><span className="split-text__char" style={{'--char-index':i}} aria-hidden="true">{char === ' ' ? '\u00a0' : char}</span></span>)}</span>;
}
