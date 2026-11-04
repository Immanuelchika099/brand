import { useEffect, useState } from 'react';
import XLogo from './XLogo';
import './Loader.css';
export default function Loader({ onComplete }) {
 const [progress,setProgress]=useState(0);
 useEffect(()=>{let frame, start=performance.now(); const tick=now=>{const p=Math.min(100,Math.round((now-start)/24));setProgress(p);if(p<100)frame=requestAnimationFrame(tick);else setTimeout(onComplete,350)};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[onComplete]);
 return <div className="loader"><div className="loader__mark"><XLogo/></div><div className="loader__bottom"><span>DEZIGNER X / VISUAL ARCHIVE</span><strong>{String(progress).padStart(3,'0')}</strong><span className="loader__track"><i style={{width:progress+'%'}}/></span></div></div>;
}