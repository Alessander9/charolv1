import { Icon } from '../components/Icon';

function Tarjeta({ titulo, colorFondoHover, colorTextoHover, efecto, icono = 'phone' }) {
  return (
    <div className={`pedidos-card tarjeta ${efecto}`} style={{ '--color-hover-fondo': colorFondoHover, '--color-hover-texto': colorTextoHover }}>
      <div className="pedidos-card-icon">
        <Icon name={icono} size={36} />
      </div>
      <h3 className='letter'>{titulo}</h3>
    </div>
  );
}

export function Pedidos() {
  return (
    <section id="pedidos" className="pedidos section">
      <div className="wrap pedidos-wrap">
        <div className="pedidos-inner">
          <div className="pedidos-header">
            <div className="pedidos-bird">
              <img src="/charol-blanco-sin-fondo.png" alt="Charol" loading="lazy" decoding="async" />
            </div>
            <h2>Pide por<br />donde prefieras.</h2>
          </div>
          <div className="pedidos-grid">
            <Tarjeta titulo="Web" efecto="hover-zoom" colorFondoHover="#d71920" colorTextoHover="white" icono="mouse" />
            <Tarjeta titulo="Telefono" efecto="hover-rotate" colorFondoHover="#1877F2" colorTextoHover="white" />
            <Tarjeta titulo="WhatsApp" efecto="hover-lift" colorFondoHover="#25D366" colorTextoHover="white" icono="whatsapp" />
            <Tarjeta titulo="Rappi" efecto="hover-rotate" colorFondoHover="#FF4940" colorTextoHover="white" icono="rappi" />
          </div>
        </div>
      </div>
    </section>
  );
}
