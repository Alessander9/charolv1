import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { menu } from '../data/home';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';

const menuCatIndex = [0, 1, 2, 4];

const hoverEffects = ['menu-hover-zoom', 'menu-hover-rotate', 'menu-hover-lift', 'menu-hover-glow'];

export function MenuSection({ navigate }) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!trackRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 45,
      repeat: -1,
      ease: 'none'
    });

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (tweenRef.current) tweenRef.current.pause();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (tweenRef.current) tweenRef.current.resume();
  };

  return (
    <section id="carta" className="menu-section section">
      <div className="wrap">
        <div className="section-head menu-head reveal">
          <Eyebrow>De la cocina a la canción</Eyebrow>
          <h2>Cena primero.<br /><em>Canta después.</em></h2>
          <p>Categorías referenciales de la experiencia Charol. Consulta la carta completa con precios y descripciones.</p>
        </div>
        <div
          className="menu-carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="menu-track" ref={trackRef}>
            {[...menu, ...menu].map(([name, type, img], i) => {
              const catIdx = menuCatIndex[i % menu.length];
              const hoverCls = hoverEffects[i % hoverEffects.length];
              return (
                <article
                  className={`menu-card ${hoverCls}`}
                  key={`${name}-${i}`}
                  onClick={() => navigate(`/carta?cat=${catIdx}`)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/carta?cat=${catIdx}`); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver categoría: ${name}`}
                >
                  <div className="menu-card-header">
                    <span className="menu-card-num">0{(i % menu.length) + 1}</span>
                    <small>{type}</small>
                  </div>
                  <div className="menu-card-image">
                    <img src={img} alt={`Imagen referencial: ${name}`} loading="lazy" decoding="async" />
                    <div className="menu-card-shine" />
                  </div>
                  <h3>{name}</h3>
                </article>
              );
            })}
          </div>
          {isPaused && (
            <div className="menu-carousel-paused">
              <Icon name="pause" size={12} />
              <span>Pausado</span>
            </div>
          )}
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
