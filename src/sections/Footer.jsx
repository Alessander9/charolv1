import { WA } from '../data/contact';
import { Brand } from '../components/Brand';
import { Icon } from '../components/Icon';
import charolImage from '@file/charol.png';

export function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-cta reveal">
        <p>Tu pr\u00f3xima celebraci\u00f3n merece escenario.</p>
        <h2>Reserva tu noche<br /><em>en Charol.</em></h2>
        <a href={WA} target="_blank" rel="noreferrer" className="footer-circle">
          <Icon name="whatsapp" size={30} />
          <span>Reservar<br />ahora</span>
        </a>
      </div>
      <div className="footer-bottom">
        <div className="brand">
          <Brand />
        </div>
        <nav>
          <button onClick={() => { navigate('/'); window.scrollTo(0, 0); }} className="footer-link-btn">Home</button>
          <button onClick={() => navigate('/carta')} className="footer-link-btn">Carta</button>
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="footer-link-btn">Ubicaci\u00f3n</button>
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
