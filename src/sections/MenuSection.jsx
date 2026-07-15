import { menu } from '../data/home';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';

// Mapeo de cada card del men\u00fa en la home al \u00edndice de categor\u00eda en CartaPage
const menuCatIndex = [0, 1, 2, 4];

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
          <div className="menu-track">
            {[...menu, ...menu].map(([name, type, img], i) => {
              const catIdx = menuCatIndex[i % menu.length];
              return (
                <article
                  className="menu-card"
                  key={`${name}-${i}`}
                  onClick={() => navigate(`/carta?cat=${catIdx}`)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/carta?cat=${catIdx}`); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver categor\u00eda: ${name}`}
                >
                  <div><span>0{(i % menu.length) + 1}</span><small>{type}</small></div>
                  <img src={img} alt={`Imagen referencial: ${name}`} loading="lazy" decoding="async" />
                  <h3>{name}</h3>
                </article>
              );
            })}
          </div>
        </div>
        <div className="menu-cta">
          <button className="menu-cta-btn" onClick={() => navigate('/carta')}>
            VER CARTA COMPLETA <Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
