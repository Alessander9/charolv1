import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { WA } from '../data/contact';
import { heroSlides } from '../data/home';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';

export function Hero({ navigate }) {
  const [active, setActive] = useState(0);
  const heroRef = useRef(null);
  const firstRender = useRef(true);
  const slide = heroSlides[active];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setActive(v => (v + 1) % heroSlides.length), 6000);
    return () => window.clearTimeout(timer);
  }, [active]);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (firstRender.current) { firstRender.current = false; return }
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-slide.active img', { scale: 1.09 }, { scale: 1, duration: 1.4, ease: 'power3.out' });
      gsap.fromTo('.hero-dynamic > *', { y: 32, opacity: 0 }, { y: 0, opacity: 1, stagger: .08, duration: .7, ease: 'power3.out' });
    }, heroRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <section id="inicio" className="hero" ref={heroRef}>
      <div className="hero-slides parallax">
        {heroSlides.map((item, index) => (
          <div className={`hero-slide ${index === active ? 'active' : ''}`} key={item.image} aria-hidden={index !== active}>
            <img src={item.image} alt={index === active ? item.alt : ''} loading="eager" fetchpriority={index === 0 ? 'high' : 'auto'} decoding="async" />
          </div>
        ))}
      </div>
      <div className="hero-shade" /><div className="noise" />
      <div className="hero-content">
        <div className="hero-dynamic">
          <Eyebrow>{slide.kicker}</Eyebrow>
          <h1 className="hero-title"><span>{slide.line}</span><span><em>{slide.accent}</em></span></h1>
          <div className="hero-lower">
            <p>{slide.copy}</p>
            <div className="hero-actions">
              <Button href={`${WA}?text=Hola%20Charol,%20quiero%20reservar%20una%20mesa.`}>Reservar por WhatsApp</Button>
              <button className="text-link" onClick={() => navigate('/carta')} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: '0 0 6px', borderBottom: '1px solid currentColor', display: 'inline-flex', alignItems: 'center', gap: '9px', fontSize: '.76rem', fontWeight: 700 }}>
                Ver nuestra carta <Icon name="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-side">Los Olivos \u00b7 Lima <i /></div>
      <div className="hero-scroll">Scroll para vivir la experiencia <span /></div>
      <div className="hero-carousel-controls" aria-label="Controles del carrusel">
        {heroSlides.map((item, index) => (
          <button className={index === active ? 'active' : ''} key={item.kicker} onClick={() => setActive(index)} aria-label={`Mostrar imagen ${index + 1}: ${item.kicker}`} aria-current={index === active ? 'true' : undefined}>
            <span>0{index + 1}</span><i />
          </button>
        ))}
      </div>
    </section>
  );
}
