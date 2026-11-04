import { useCallback,useEffect,useState } from 'react';
import { initSmoothScroll, ScrollTrigger } from './lib/scroll';
import Loader from './components/Loader';
import FilmOverlay from './components/FilmOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';
export default function App(){
 const [loading,setLoading]=useState(true);
 const finish=useCallback(()=>{setLoading(false);document.body.classList.remove('is-loading');requestAnimationFrame(()=>ScrollTrigger.refresh())},[]);
 useEffect(()=>{document.body.classList.add('is-loading');const cleanup=initSmoothScroll();return()=>{cleanup();document.body.classList.remove('is-loading')}},[]);
 return <><div className={loading?'app app--loading':'app'}><Navbar/><main><Hero/><Marquee/><About/><Projects/><Experience/><Services/><Testimonials/><FAQ/><Contact/></main><Footer/><FilmOverlay/></div>{loading&&<Loader onComplete={finish}/>}</>;
}