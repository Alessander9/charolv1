import { WA } from '../data/contact';
import { Brand } from '../components/Brand';
import { Icon } from '../components/Icon';
export function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-cta reveal">
        <p>Tu pr\u00f3xima celebraci\u00f3n merece escenario.</p>
        <h2>Reserva tu noche<br /><em>en Charol.</em></h2>
        <a href={WA} target="_blank" rel="noreferrer" className="footer-circle">
          <Icon name="whatsapp" size={22} />
          <span>Reservar<br />ahora</span>
        </a>
      </div>
      {/* ─── MAPA UBICACIÓN ──────────────────── */}
      <div className="footer-map reveal">
        <div className="footer-map-frame">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-77.073%2C-11.9694%2C-77.043%2C-11.9394&amp;layer=mapnik&amp;marker=-11.9544%2C-77.0580"
            style={{ border: 0, width: '100%', height: '100%' }}
            loading="lazy"
            title="Mapa de ubicación Charol"
            referrerPolicy="no-referrer"
          />
          <div className="footer-map-overlay">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--red)" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" fill="#fff" stroke="none" />
            </svg>
          </div>
        </div>
        <div className="footer-map-info">
          <strong>Los Olivos, Lima</strong>
          <span>Av. Carlos Izaguirre — Referencia: Plaza Norte</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="brand">
          <Brand />
        </div>
        <nav>
          <button onClick={() => { navigate('/'); window.scrollTo(0, 0); }} className="footer-link-btn">Home</button>
          <button onClick={() => navigate('/carta')} className="footer-link-btn">Carta</button>
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('celebraciones')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="footer-link-btn">Celebraciones</button>
        </nav>
        <div className="social">
          <a href="https://www.instagram.com/charol_karaoke_restobar/" target="_blank" rel="noreferrer"><Icon name="instagram" /> Instagram</a>
          <a href="tel:+51919736348"><Icon name="phone" /> 919 736 348</a>
        </div>
        <small>&copy; 2026 CHAROL \u00b7 LOS OLIVOS</small>
      </div>
    </footer>
  );
}
