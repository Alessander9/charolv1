import { useState } from 'react';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';

export function Celebrations() {
  const defaultImg = 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1500&q=88';
  const items = [
    { label: 'Cumplea\u00f1os', text: 'Celebra tu dia con escenario propio, karaoke y la mejor comida. Armamos un ambiente que tu grupo va a recordar.', img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1500&q=88' },
    { label: 'Aniversarios', text: 'Una noche especial merece un lugar a la altura. Cena, musica y un brindis que marque la fecha.', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1500&q=88' },
    { label: 'Reencuentros', text: 'Junta al grupo despues de mucho tiempo. Brasas, tragos y karaoke para ponerse al d\u00eda como se debe.', img: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=1500&q=88' },
    { label: 'Eventos privados', text: 'Coordina con nuestro equipo para eventos corporativos, lanzamientos o reuniones que necesiten un toque distinto.', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1500&q=88' }
  ];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const activeImg = hoveredIndex !== null ? items[hoveredIndex].img : defaultImg;
  return (
    <section id="celebraciones" className="celebrations section">
      <div className="celebrations-media reveal">
        <img src={activeImg} alt="Imagen referencial de celebraci\u00f3n" loading="lazy" decoding="async" />
        <span className="round-stamp">TU NOCHE \u00b7 TU ESCENARIO \u00b7</span>
      </div>
      <div className="celebrations-copy reveal">
        <Eyebrow dark>Celebra en Charol</Eyebrow>
        <h2>Tu grupo pone el motivo.<br /><em>Nosotros el escenario.</em></h2>
        <p>Cuentanos que estas celebrando y armamos una experiencia para tu grupo.</p>
        <div className="occasion-list">
          {items.map((item, i) => (
            <button key={item.label} className={`occasion-item ${hoveredIndex === i ? 'open' : ''}`} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} onClick={() => setHoveredIndex(i)}>
              <div className="occasion-header">
                <span className="occasion-num">0{i + 1}</span>
                <span className="occasion-label">{item.label}</span>
                <Icon name="arrow" />
              </div>
              {hoveredIndex === i && (
                <div className="occasion-details"><p>{item.text}</p></div>
              )}
            </button>
          ))}
        </div>
        <a className="button button-dark" href="https://wa.me/51919736348?text=Hola%20Charol%2C%20quiero%20cotizar%20una%20celebraci%C3%B3n." target="_blank" rel="noreferrer">Cotizar celebracion <Icon name="arrow" /></a>
      </div>
    </section>
  );
}
