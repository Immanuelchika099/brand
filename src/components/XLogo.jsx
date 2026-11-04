export default function XLogo({ small = false }) {
  return (
    <img
      className={`x-logo ${small ? 'x-logo--small' : ''}`}
      src="/assets/brand/designer-x-logo.svg"
      alt="Dezigner X"
      width="40"
      height="40"
    />
  );
}
