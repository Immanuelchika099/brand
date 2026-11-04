import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';
import XSculpture from './XSculpture';
import SplitText from './SplitText';
import { stats, copy } from '../data/content';
import './Hero.css';
gsap.registerPlugin(ScrollTrigger);
export default function Hero(){
 const root=useRef(null);
 useLayoutEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||window.innerWidth<860)return;const ctx=gsap.context(()=>{const tl=gsap.timeline({scrollTrigger:{trigger:root.current,start:'top top',end:'+=125%',scrub:1.2,pin:true}});tl.to('.hero__copy',{scale:1.22,opacity:.18,y:-70,ease:'none'},0).to('.hero__poster',{rotateY:-16,rotateZ:4,x:80,y:-35,scale:.9,ease:'none'},0).to('.hero__ghost',{xPercent:-18,ease:'none'},0)},root);return()=>ctx.revert()},[]);
 return <section id="hero" ref={root} className="hero-section"><div className="hero__inner"><div className="hero__copy"><span className="eyebrow">{copy.hero.updated}</span><h1><SplitText>{copy.hero.title}</SplitText></h1><div className="hero__role">{copy.hero.role}</div><div className="hero__stats">{stats.map(s=><div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div></div><article className="hero__poster"><div className="hero__ghost">{copy.hero.posterWord}</div><div className="hero__avatar"><XSculpture/></div><span className="hero__xxxx">{copy.hero.outline}</span><div className="hero__skills">{copy.hero.skills.map(s=><span key={s}>{s}</span>)}</div><div className="hero__poster-foot"><b>{copy.hero.signature}</b><p>{copy.hero.blurb}</p></div></article></div><span className="hero__scroll">{copy.hero.scroll}</span></section>
}