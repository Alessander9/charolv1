export function LoadingScreen({ isLeaving = false }) {
  return (
    <div className={`loading-screen ${isLeaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="loading-glow" />
      <div className="loading-card">
        <img className="loading-logo" src="/charol-blanco-sin-fondo.png" alt="Charol Karaoke Restobar" />
        <div className="loading-bar" aria-hidden="true">
          <span />
        </div>
        <p>Estamos preparando tu mesa, la música y el sabor.</p>
        <small>Bienvenido a Charol Karaoke Restobar</small>
      </div>
    </div>
  );
}
