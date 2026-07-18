import { WA } from '../data/contact';
import { Brand } from '../components/Brand';
import { Icon } from '../components/Icon';
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-services reveal">
        <div className="footer-services-item">
          <div className="footer-services-icon"><Icon name="mic" size={22} /></div>
          <div>
            <strong>Karaoke</strong>
            <span>Escenario abierto todas las noches</span>
          </div>
        </div>
        <div className="footer-services-item">
          <div className="footer-services-icon"><Icon name="flame" size={22} /></div>
          <div>
            <strong>Brasas & Parrillas</strong>
            <span>Cortes y parrillas para compartir</span>
          </div>
        </div>
        <div className="footer-services-item">
          <div className="footer-services-icon"><Icon name="glass" size={22} /></div>
          <div>
            <strong>Barra de Tragos</strong>
            <span>C\u00f3cteles cl\u00e1sicos y creaciones propias</span>
          </div>
        </div>
        <div className="footer-services-item">
          <div className="footer-services-icon"><Icon name="users" size={22} /></div>
          <div>
            <strong>Eventos Privados</strong>
            <span>Cumplea\u00f1os, reuniones y m\u00e1s</span>
          </div>
        </div>
        <div className="footer-services-cta">
          <a href={WA} target="_blank" rel="noreferrer" className="footer-circle">
            <Icon name="whatsapp" size={22} />
            <span>Reservar<br />ahora</span>
          </a>
        </div>
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
        <div className="footer-desc">
          <p>Karaoke, brasas y tragos en Los Olivos. Tu noche, tu escenario.</p>
        </div>
        <div className="social">
          <a href="https://www.instagram.com/charol_karaoke_restobar/" target="_blank" rel="noreferrer"><Icon name="instagram" /> Instagram</a>
          <a href="tel:+51919736348"><Icon name="phone" /> 919 736 348</a>
        </div>
        <div className="footer-hours">
          <span><Icon name="clock" /> Lun — Sab: 6pm — 2am</span>
        </div>
        <small>&copy; 2026 CHAROL \u00b7 LOS OLIVOS \u00b7 KARAOKE RESTOBAR</small>
      </div>
    </footer>
  );
}
