import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Experience from './Experience';
import XSculpture from './XSculpture';
import { copy } from '../data/content';
import './AboutPage.css';

export default function AboutPage(){
 useEffect(()=>{window.scrollTo(0,0);document.body.classList.remove('is-loading')},[]);
 return <div className="about-page">
  <Navbar/>
  <main>
   <section className="about-page__hero">
    <div className="about-page__grain"/>
    <div className="about-page__eyebrow"><span>DEZIGNER X</span><span>PROFILE / 01</span></div>
    <div className="about-page__hero-content">
     <div className="about-page__title-wrap"><p>THE PERSON BEHIND THE WORK</p><h1>ABOUT<br/><span>THE X.</span></h1></div>
     <div className="about-page__sculpture"><XSculpture color="white" depth={0.16} layersCount={72}/></div>
    </div>
    <div className="about-page__hero-bottom"><span>CREATIVE THINKING. DISTINCTIVE EXECUTION.</span><span>SCROLL TO EXPLORE ↓</span></div>
   </section>
   <section className="about-page__intro">
    <span className="about-page__index">01 — A LITTLE INTRODUCTION</span>
    <div><h2>DESIGNING WITH<br/>INTENTION.</h2><p>{copy.about.body}</p></div>
   </section>
   <div className="about-page__divider" aria-hidden="true"><span>XXXXXX</span></div>
   <section className="about-page__journey">
    <div className="about-page__journey-head"><span>02 — THE JOURNEY SO FAR</span><p>A timeline of the work, the learning and everything in between.</p></div>
    <Experience/>
   </section>
  </main>
  <Footer/>
 </div>;
}