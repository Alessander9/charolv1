import { experiences } from '../data/home';
import { Eyebrow } from '../components/Eyebrow';

export function Experience() {
  return (
    <section id="experiencia" className="experience section">
      <div className="wrap">
        <div className="section-head reveal">
          <Eyebrow dark>La experiencia Charol</Eyebrow>
          <h2>Una noche.<br /><em>Tres razones</em> para volver.</h2>
          <p>Del primer plato a la \u00faltima canci\u00f3n, todo sucede en un mismo lugar.</p>
        </div>
        <div className="experience-grid">
          {experiences.map(([n, l, t, c, img]) => (
            <article className="experience-card reveal" key={n}>
              <div className="experience-image"><img src={img} alt={`Imagen referencial: ${t}`} loading="lazy" decoding="async" /><span>{n}</span></div>
              <div className="experience-copy">
                <small>{l}</small><h3>{t}</h3><p>{c}</p>
                <a href={`${WA}?text=${encodeURIComponent(`Hola Charol, quiero consultar sobre ${t}.`)}`} target="_blank" rel="noreferrer" aria-label={`Consultar sobre ${t}`}><Icon name="arrow" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
