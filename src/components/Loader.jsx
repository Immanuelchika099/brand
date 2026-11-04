import { useEffect, useState } from 'react';
import XLogo from './XLogo';
import { services, copy } from '../data/content';
import './Loader.css';
export default function Loader({ onComplete }) {
 const [progress,setProgress]=useState(0);
 const [leaving,setLeaving]=useState(false);
 useEffect(()=>{
  let frame,started=performance.now(),disposed=false;
  const images=services.map(item=>new Promise(resolve=>{const img=new Image();img.onload=img.onerror=resolve;img.src=item.image}));
  const fonts=document.fonts?.ready||Promise.resolve();
  Promise.all([fonts,...images]).then(()=>{if(!disposed)setProgress(100)});
  const tick=now=>{if(disposed)return;const elapsed=now-started;setProgress(current=>Math.max(current,Math.min(94,Math.round(elapsed/28))));frame=requestAnimationFrame(tick)};
  frame=requestAnimationFrame(tick);
  return()=>{disposed=true;cancelAnimationFrame(frame)};
 },[]);
 useEffect(()=>{if(progress===100){const timer=setTimeout(()=>setLeaving(true),250);return()=>clearTimeout(timer)}},[progress]);
 useEffect(()=>{if(leaving){const timer=setTimeout(onComplete,950);return()=>clearTimeout(timer)}},[leaving,onComplete]);
 return <div className={`loader ${leaving?'loader--leaving':''}`}><div className="loader__panel loader__panel--top"/><div className="loader__panel loader__panel--bottom"/><div className="loader__content"><div className="loader__mark"><XLogo/></div><div className="loader__bottom"><span>{copy.loader}</span><strong>{String(progress).padStart(3,'0')}</strong><span className="loader__track"><i style={{width:progress+'%'}}/></span></div></div></div>;
}