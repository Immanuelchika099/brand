import { useEffect,useRef } from 'react';
import gsap from 'gsap';
import Sparkle from './Sparkle';
import './Marquee.css';
const words=['DESIGN SYSTEM','WEBSITE DESIGN','APP UI/UX DESIGN','BRAND DESIGN','DIGITAL ART','CAMPAIGN DESIGN'];
export default function Marquee(){const ref=useRef(null);useEffect(()=>{const el=ref.current;if(!el)return;const tween=gsap.to(el,{xPercent:-50,duration:24,ease:'none',repeat:-1});const lenis=window.__lenis;const handle=({velocity=0,direction=1})=>{const speed=Math.min(Math.abs(velocity)/650,2.2);tween.timeScale(direction<0?-(1+speed):1+speed)};lenis?.on('scroll',handle);return()=>{tween.kill();lenis?.off('scroll',handle)}},[]);return <div className="marquee"><div className="marquee__track" ref={ref}>{[...words,...words].map((w,i)=><span key={i}>{w}<Sparkle className="sparkle"/></span>)}</div></div>}