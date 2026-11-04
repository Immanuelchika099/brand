import XSculpture from './XSculpture';
import Button from './Button';
import Sparkle from './Sparkle';
import SplitText from './SplitText';
import useGsap from '../hooks/useGsap';
import { copy } from '../data/content';
import './About.css';
export default function About(){const scope=useGsap(gsap=>{gsap.fromTo('.about-frame',{clipPath:'inset(0 48% 0 48% round 10px)'},{clipPath:'inset(0 0% 0 0% round 10px)',duration:1.4,ease:'power4.out',scrollTrigger:{trigger:'.about-frame',start:'top 78%'}});gsap.from('.about-copy > *',{y:35,opacity:0,stagger:.12,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.about-copy',start:'top 75%'}})},[]);return <section id="about" className="about-section" ref={scope}><div className="about-frame"><div className="about-card"><div className="about-card__copy"><b>{copy.about.cardTitle}</b><p>{copy.about.cardLine}</p></div><div className="about-card__art"><XSculpture depth={0.12} layersCount={72} /></div><i className="about-card__vline"/><i className="about-card__hline"/><Sparkle className="about-card__spark"/></div><div className="about-strip" aria-hidden="true"/><div className="about-copy"><span>{copy.about.kicker}</span><h2><SplitText>{copy.about.title}</SplitText></h2><p>{copy.about.body}</p><Button light href="#contact">{copy.about.button}</Button></div></div></section>}