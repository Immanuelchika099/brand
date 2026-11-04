import './XLogo.css';
export default function XLogo({ small = false }) {
  return <span className={`x-logo ${small ? 'x-logo--small' : ''}`} aria-label="Dezigner X"><i/><i/><i/><i/></span>;
}
