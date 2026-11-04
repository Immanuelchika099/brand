import XLogo from './XLogo';
import { scrollToTarget } from '../lib/scroll';
import './Navbar.css';
export default function Navbar(){return <nav className="site-nav"><a className="site-nav__brand" href="#hero" onClick={e=>{e.preventDefault();scrollToTarget('#hero')}} aria-label="Back to top"><XLogo/></a><div className="site-nav__links">{[['ABOUT','#about'],['WORKS','#work'],['CONTACT','#contact']].map(([t,h],i)=><a key={h} href={h} onClick={e=>{e.preventDefault();scrollToTarget(h)}}>{t}{i!==2&&<b>✦</b>}</a>)}</div></nav>}