import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';

export function Location() {
  return (
    <section id="ubicacion" className="location section">
      <div className="location-map">
        <div className="map-grid" />
        <span className="map-pin"><Icon name="pin" size={30} /></span>
        <span className="map-road road-one">Av. Antunez de Mayolo</span>
        <span className="map-road road-two">Los Olivos</span>
      </div>
      <div className="location-copy reveal">
        <Eyebrow>Encuentranos</Eyebrow>
        <h2>La noche empieza<br />en <em>Los Olivos.</em></h2>
        <div className="address">
          <Icon name="pin" />
          <div>
            <small>Dirección reportada</small>
            <strong>Av. Santiago Antunez de Mayolo 1107<br />Los Olivos, Lima</strong>
            <span>Confirma el ingreso exacto al reservar.</span>
          </div>
        </div>
        <div className="location-actions">
          <Button href="https://www.google.com/maps/search/?api=1&query=Av.+Santiago+Antunez+de+Mayolo+1107+Los+Olivos">Cómo llegar</Button>
          <a className="phone-link" href="tel:+51919736348"><Icon name="phone" /> 919 736 348</a>
        </div>
      </div>
    </section>
  );
}
