import { WA } from '../data/contact';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';

export function Reservation() {
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const msg = [
      'Hola Charol, quiero solicitar una reserva:',
      `Nombre: ${data.get('name')}`,
      `Telefono: ${data.get('phone')}`,
      `Fecha: ${data.get('date')}`,
      `Hora: ${data.get('time')}`,
      `Personas: ${data.get('people')}`,
      `Motivo: ${data.get('occasion')}`,
      `Comentarios: ${data.get('comments') || 'Ninguno'}`
    ].join('\n');
    window.open(`${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  }
  return (
    <section id="reserva" className="reservation section">
      <div className="wrap reservation-layout">
        <div className="reservation-copy reveal">
          <Eyebrow>Reserva tu noche</Eyebrow>
          <h2>De la idea<br />al <em>escenario.</em></h2>
          <p>Completa los datos y enviaremos tu solicitud por WhatsApp. La reserva queda confirmada cuando el equipo de CHAROL responda.</p>
          <div><strong>Contacto directo</strong><a href="tel:+51919736348"><Icon name="phone" />919 736 348</a></div>
        </div>
        <form className="reservation-form reveal" onSubmit={submit}>
          <label>Nombre completo<input name="name" autoComplete="name" required placeholder="¿Cómo te llamas?" /></label>
          <label>Telefono<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="999 999 999" /></label>
          <div className="form-row">
            <label>Fecha<input name="date" type="date" required /></label>
            <label>Hora<input name="time" type="time" required /></label>
          </div>
          <div className="form-row">
            <label>Numero de personas<input name="people" type="number" min="1" max="100" required placeholder="8" /></label>
            <label>Motivo<select name="occasion" required defaultValue=""><option value="" disabled>Seleccionar</option><option>Cumplea\u00f1os</option><option>Reuni\u00f3n de amigos</option><option>Aniversario</option><option>Evento corporativo</option><option>Otro</option></select></label>
          </div>
          <label>Comentarios<textarea name="comments" rows="3" placeholder="Cuentanos que necesitas" /></label>
          <label className="consent"><input type="checkbox" required />Acepto enviar estos datos por WhatsApp para gestionar mi solicitud.</label>
          <button className="button button-red" type="submit">Continuar en WhatsApp <Icon name="whatsapp" /></button>
        </form>
      </div>
    </section>
  );
}
