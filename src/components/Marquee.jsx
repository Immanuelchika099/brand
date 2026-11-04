import { useEffect,useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sparkle from './Sparkle';
import './Marquee.css';
gsap.registerPlugin(ScrollTrigger);
const words=['DESIGN SYSTEM','WEBSITE DESIGN','APP UI/UX DESIGN','BRAND DESIGN','DIGITAL ART','CAMPAIGN DESIGN'];
export default function Marquee(){const ref=useRef(null);useEffect(()=>{const el=ref.current;if(!el)return;const tween=gsap.to(el,{xPercent:-50,duration:24,ease:'none',repeat:-1});const trigger=ScrollTrigger.create({onUpdate:self=>{const v=Math.abs(self.getVelocity());tween.timeScale(1+Math.min(v/1800,2));if(self.direction<0)tween.timeScale(-1-Math.min(v/1800,2));else tween.timeScale(1+Math.min(v/1800,2))}});return()=>{tween.kill();trigger.kill()}},[]);return <div className="marquee"><div className="marquee__track" ref={ref}>{[...words,...words].map((w,i)=><span key={i}>{w}<Sparkle className="sparkle"/></span>)}</div></div>}