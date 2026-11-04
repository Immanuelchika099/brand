import { useEffect,useState } from 'react';
import gsap from 'gsap';
import { onLenisScroll } from '../lib/scroll';
import './FilmOverlay.css';
const scenes=[['hero','01'],['about','02'],['work','03'],['experience','04'],['services','05'],['testimonials','06'],['faq','07'],['contact','08']];
export default function FilmOverlay(){
 const [hud,setHud]=useState('01 / HERO'),[time,setTime]=useState('00:00:00');
 useEffect(()=>{let raf;const start=performance.now();const tick=()=>{const f=Math.floor((performance.now()-start)/1000*24);setTime('00:'+String(Math.floor(f/24/60)).padStart(2,'0')+':'+String(Math.floor(f/24%60)).padStart(2,'0')+':'+String(f%24).padStart(2,'0'));raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const s=scenes.find(([id])=>id===e.target.id);if(s)setHud(s[1]+' / '+s[0].toUpperCase())}}),{threshold:.3});scenes.forEach(([id])=>{const el=document.getElementById(id);if(el)obs.observe(el)});const off=onLenisScroll(({scroll=0})=>gsap.set('.film-overlay__sprockets',{y:-(scroll*.32)%52}));return()=>{cancelAnimationFrame(raf);obs.disconnect();off()}},[]);
 return <div className="film-overlay" aria-hidden="true"><div className="film-overlay__grain"/><div className="film-overlay__vignette"/><div className="film-overlay__sprockets film-overlay__sprockets--left"/><div className="film-overlay__sprockets film-overlay__sprockets--right"/><div className="film-overlay__hud"><span>● REC</span><span>{time} / 24FPS</span><span>SCENE {hud}</span></div></div>;
}