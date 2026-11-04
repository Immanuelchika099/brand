import './Button.css';
export default function Button({ children, href, onClick, light = false, type = 'button' }) {
  const cls = `x-button ${light ? 'x-button--light' : ''}`;
  return href ? <a className={cls} href={href}>{children}<span>↗</span></a> : <button className={cls} type={type} onClick={onClick}>{children}<span>↗</span></button>;
}
