import { useCallback,useEffect,useState } from 'react';
import { initSmoothScroll, ScrollTrigger } from './lib/scroll';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StartProject from './components/StartProject';
import AboutPage from './components/AboutPage';
import './App.css';

function HomePage(){
 const [loading,setLoading]=useState(true);
 const finish=useCallback(()=>{setLoading(false);document.body.classList.remove('is-loading');requestAnimationFrame(()=>ScrollTrigger.refresh())},[]);
 useEffect(()=>{document.body.classList.add('is-loading');return()=>document.body.classList.remove('is-loading')},[]);
 useEffect(()=>{if(loading)return;return initSmoothScroll()},[loading]);
 return <><div className={loading?'app app--loading':'app'}><Navbar/><main><Hero ready={!loading}/><Marquee/><About/><Projects/><Services/><Testimonials/><FAQ/><Contact/></main><Footer/></div>{loading&&<Loader onComplete={finish}/>}</>;
}

export default function App(){
 const [route,setRoute]=useState(()=>window.location.pathname);
 useEffect(()=>{
  const syncRoute=()=>setRoute(window.location.pathname);
  window.addEventListener('popstate',syncRoute);
  window.addEventListener('dezigner:navigate',syncRoute);
  return()=>{window.removeEventListener('popstate',syncRoute);window.removeEventListener('dezigner:navigate',syncRoute)};
 },[]);
 if(route.startsWith('/start-project')) return <StartProject/>;
 if(route.startsWith('/about')) return <AboutPage/>;
 return <HomePage/>;
}