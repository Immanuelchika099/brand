import XLogo from './XLogo';
import { copy } from '../data/content';
import { scrollToTarget } from '../lib/scroll';
import './Navbar.css';
export default function Navbar(){return <nav className="site-nav"><a className="site-nav__brand" href="#hero" onClick={e=>{e.preventDefault();scrollToTarget('#hero')}} aria-label="Back to top"><XLogo/></a><div className="site-nav__links">{copy.nav.map((item,i)=><a key={item.href} href={item.href} onClick={e=>{e.preventDefault();scrollToTarget(item.href)}}>{item.label}{i!==2&&<b>✦</b>}</a>)}</div></nav>}