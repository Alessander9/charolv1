import { Icon } from '../components/Icon';

function Tarjeta({ titulo, colorFondoHover, colorTextoHover, efecto, icono = 'phone' }) {
  return (
    <div className={`pedidos-card tarjeta ${efecto}`} style={{ '--color-hover-fondo': colorFondoHover, '--color-hover-texto': colorTextoHover }}>
      <h3 className='letter'>{titulo}</h3>
      <Icon name={icono} size={40} />
    </div>
  );
}

export function Pedidos() {
  return (
    <section id="pedidos" className="pedidos section">
      <div className="wrap pedidos-wrap">
        <div className="pedidos-header">
          <h2>Pide por<br />donde prefieras.</h2>
          <div className="pedidos-bird">
            <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="Mascota" loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="pedidos-grid">
          <Tarjeta titulo="Web" efecto="hover-zoom" colorFondoHover="#d71920" colorTextoHover="white" icono="mouse" />
          <Tarjeta titulo="Telefono" efecto="hover-rotate" colorFondoHover="#1877F2" colorTextoHover="white" />
          <Tarjeta titulo="WhatsApp" efecto="hover-lift" colorFondoHover="#25D366" colorTextoHover="white" icono="whatsapp" />
          <Tarjeta titulo="Rappi" efecto="hover-rotate" colorFondoHover="#FF4940" colorTextoHover="white" icono="rappi" />
        </div>
      </div>
    </section>
  );
}
