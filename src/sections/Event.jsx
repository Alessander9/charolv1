import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';

export function Event() {
  return (
    <section id="eventos" className="event section">
      <div className="event-image parallax">
        <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1800&q=90" alt="Show musical con luces rojas" />
      </div>
      <div className="event-overlay" />
      <div className="wrap event-content reveal">
        <Eyebrow>Pr\u00f3ximamente</Eyebrow>
        <div className="event-title"><span className="event-date">Agenda<br />en preparaci\u00f3n</span></div>
        <h2>La proxima<br /><em>noche es tuya.</em></h2>
        <p>Shows tributo, noches de rock, m\u00fasica criolla y artistas invitados. Conoce la pr\u00f3xima fecha en nuestras redes.</p>
        <Button kind="outline" href="https://www.instagram.com/charol_karaoke_restobar/">Ver m\u00e1s</Button>
      </div>
    </section>
  );
}
