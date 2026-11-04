import { ArrowUpRight } from 'lucide-react';
import './Button.css';
export default function Button({ children, href, onClick, light = false, type = 'button' }) {
  const cls = `x-button ${light ? 'x-button--light' : ''}`;
  return href ? <a className={cls} href={href}>{children}<ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" /></a> : <button className={cls} type={type} onClick={onClick}>{children}<span>↗</span></button>;
}
