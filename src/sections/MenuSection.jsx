import { menu } from '../data/home';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';

export function MenuSection({ navigate }) {
  return (
    <section id="carta" className="menu-section section">
      <div className="wrap">
        <div className="section-head menu-head reveal">
          <Eyebrow>De la cocina a la canci\u00f3n</Eyebrow>
          <h2>Cena primero.<br /><em>Canta despues.</em></h2>
          <p>Categor\u00edas referenciales de la experiencia Charol. Consulta la carta completa con precios y descripciones.</p>
        </div>
        <div className="menu-carousel">
          <div className="menu-track" aria-hidden="true">
            {[...menu, ...menu].map(([name, type, img], i) => (
              <article className="menu-card" key={`${name}-${i}`}>
                <div><span>0{(i % menu.length) + 1}</span><small>{type}</small></div>
                <img src={img} alt={`Imagen referencial: ${name}`} loading="lazy" decoding="async" />
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        </div>
        <div className="menu-cta reveal">
          <button className="menu-cta-btn" onClick={() => navigate('/carta')}>
            VER CARTA COMPLETA <Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
