import { useState, useRef, useEffect } from 'react';
import { experiences } from '../data/home';
import { WA } from '../data/contact';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';

export function Experience() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const sectionRef = useRef(null);

  const openCarousel = (idx) => {
    setSelectedIdx(idx);
    setCarouselIdx(idx);
  };

  const closeCarousel = () => {
    setSelectedIdx(null);
  };

  // Cerrar modal al hacer scroll
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleScroll = () => closeCarousel();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedIdx]);

  const prevExp = (e) => {
    e.stopPropagation();
    setCarouselIdx(prev => (prev - 1 + experiences.length) % experiences.length);
  };

  const nextExp = (e) => {
    e.stopPropagation();
    setCarouselIdx(prev => (prev + 1) % experiences.length);
  };

  const [n, l, t, c, img, hoverDesc] = experiences[carouselIdx];

  return (
    <section id="experiencia" className="experience section" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head reveal">
          <Eyebrow dark>La experiencia Charol</Eyebrow>
          <h2>Una noche.<br /><em>Tres razones</em> para volver.</h2>
          <p>Del primer plato a la última canción, todo sucede en un mismo lugar.</p>
        </div>

        <div className="experience-grid-wrapper">
          <div className={`experience-grid ${selectedIdx !== null ? 'has-modal' : ''}`}>
            {experiences.map(([expN, expL, expT, expC, expImg], i) => (
              <article
                className={`experience-card reveal ${selectedIdx === i ? 'is-selected' : selectedIdx !== null ? 'is-dimmed' : ''}`}
                key={expN}
                onMouseEnter={() => openCarousel(i)}
                onMouseLeave={() => selectedIdx === i && null}
              >
                <div className="experience-image">
                  <img src={expImg} alt={`Imagen referencial: ${expT}`} loading="lazy" decoding="async" />
                  <span>{expN}</span>
                </div>
                <div className="experience-copy">
                  <small>{expL}</small>
                  <h3>{expT}</h3>
                </div>
              </article>
            ))}
          </div>

          {/* MODAL CARRUSEL */}
          {selectedIdx !== null && (
            <div className="exp-modal" onMouseLeave={closeCarousel}>
              <div className="exp-modal-inner">
              <div className="exp-modal-image">
                <img src={img} alt={t} />
                <div className="exp-modal-overlay" />
              </div>

              <div className="exp-modal-body">
                <div className="exp-modal-badge">{n}</div>
                <small className="exp-modal-label">{l}</small>
                <h3 className="exp-modal-title">{t}</h3>
                <p className="exp-modal-desc">{hoverDesc}</p>
                <a
                  className="exp-modal-wa"
                  href={`${WA}?text=${encodeURIComponent(`Hola Charol, quiero consultar sobre ${t}.`)}`}
                  target="_blank" rel="noreferrer"
                >
                  <Icon name="whatsapp" size={16} />
                  <span>Consultar</span>
                </a>
              </div>

              {/* Dots */}
              <div className="exp-modal-dots">
                {experiences.map((_, i) => (
                  <button
                    key={i}
                    className={`exp-modal-dot ${i === carouselIdx ? 'active' : ''}`}
                    onClick={() => setCarouselIdx(i)}
                    aria-label={`Ir a experiencia ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation — outside modal inner */}
            <button className="exp-modal-arrow left" onClick={prevExp} aria-label="Anterior">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="exp-modal-arrow right" onClick={nextExp} aria-label="Siguiente">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
