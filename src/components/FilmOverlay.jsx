import './FilmOverlay.css';

export default function FilmOverlay(){
  return (
    <div className="film-overlay" aria-hidden="true">
      <div className="film-overlay__grain" />
      <div className="film-overlay__vignette" />
    </div>
  );
}
