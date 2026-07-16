import { useState, useRef, useEffect, useCallback } from 'react';
import { experiences } from '../data/home';
import { WA } from '../data/contact';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';
import gsap from 'gsap';

export function Experience() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const animatingRef = useRef(false);

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

  const goToSlide = useCallback((idx) => {
    if (animatingRef.current || idx === carouselIdx) return;
    animatingRef.current = true;
    setCarouselIdx(idx);
  }, [carouselIdx]);

  const prevExp = (e) => {
    e.stopPropagation();
    goToSlide((carouselIdx - 1 + experiences.length) % experiences.length);
  };

  const nextExp = (e) => {
    e.stopPropagation();
    goToSlide((carouselIdx + 1) % experiences.length);
  };

  // Auto-play interval (5s per slide, 15s total for 3 slides)
  useEffect(() => {
    if (selectedIdx !== null || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCarouselIdx(prev => (prev + 1) % experiences.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [selectedIdx, isPaused, experiences.length]);

  // GSAP slide animation when carouselIdx changes
  useEffect(() => {
    if (!trackRef.current) return;

    const slideWidth = 100 / experiences.length;
    const target = -(carouselIdx * slideWidth);

    gsap.to(trackRef.current, {
      xPercent: target,
      duration: 0.85,
      ease: 'power3.inOut',
      onComplete: () => {
        animatingRef.current = false;
      }
    });
  }, [carouselIdx, experiences.length]);

  // Keyboard navigation for modal (using refs to avoid re-attaching on carouselIdx change)
  const prevExpRef = useRef(prevExp);
  const nextExpRef = useRef(nextExp);
  const closeRef = useRef(closeCarousel);
  prevExpRef.current = prevExp;
  nextExpRef.current = nextExp;
  closeRef.current = closeCarousel;

  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prevExpRef.current(e);
      if (e.key === 'ArrowRight') nextExpRef.current(e);
      if (e.key === 'Escape') closeRef.current();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIdx]);

  const [n, l, t, c, img, hoverDesc] = experiences[carouselIdx];

  // Modal animation on open
  useEffect(() => {
    if (selectedIdx === null) return;
    gsap.fromTo('.exp-modal', 
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
    );
  }, [selectedIdx]);

  return (
    <section id="experiencia" className="experience section" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head reveal">
          <Eyebrow dark>La experiencia Charol</Eyebrow>
          <h2>Una noche.<br /><em>Tres razones</em> para volver.</h2>
          <p>Del primer plato a la última canción, todo sucede en un mismo lugar.</p>
        </div>

        {/* ─── CARRUSEL PRINCIPAL ──────────────────── */}
        <div className="experience-carousel-wrapper">
          <div
            className="experience-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="experience-carousel-viewport">
              <div className="experience-carousel-track" ref={trackRef}>
                {experiences.map(([expN, expL, expT, expC, expImg], i) => (
                  <div
                    key={expN}
                    className="experience-carousel-slide"
                    onClick={() => openCarousel(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') openCarousel(i); }}
                    aria-label={`Ver detalles: ${expT}`}
                  >
                    <img src={expImg} alt={expT} loading="lazy" decoding="async" />
                    <div className="experience-carousel-overlay">
                      <div className="experience-carousel-content">
                        <span className="experience-carousel-num">{expN}</span>
                        <small className="experience-carousel-label">{expL}</small>
                        <h3 className="experience-carousel-title">{expT}</h3>
                        <p className="experience-carousel-desc">{expC}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="experience-carousel-dots">
              {experiences.map((_, i) => (
                <button
                  key={i}
                  className={`experience-carousel-dot ${i === carouselIdx ? 'active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Ir a experiencia ${i + 1}`}
                />
              ))}
            </div>

            {/* Pause indicator */}
            {isPaused && selectedIdx === null && (
              <div className="experience-carousel-paused">
                <Icon name="pause" size={14} />
                <span>Pausado</span>
              </div>
            )}
          </div>

          {/* ─── MODAL CARRUSEL ──────────────────── */}
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

              {/* Navigation arrows */}
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
