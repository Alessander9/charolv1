import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const WA = 'https://wa.me/51919736348';
const navItems = [['Experiencia', 'experiencia'], ['Eventos', 'eventos'], ['Celebraciones', 'celebraciones'], ['Carta', 'carta'], ['Ubicación', 'ubicacion']];
const heroSlides = [
  { kicker: 'Pollo a la brasa · Parrillas', line: 'Fuego que', accent: 'se comparte.', copy: 'Pollo a la brasa, carnes y parrillas preparadas para reunir a todos alrededor de la mesa.', image: 'https://images.unsplash.com/photo-1712579733874-c3a79f0f9d12?auto=format&fit=crop&w=2200&q=90', alt: 'Pollo entero dorándose sobre una parrilla' },
  { kicker: 'Karaoke · Música · Diversión', line: 'Canta, brinda', accent: 'y vive la noche.', copy: 'Después de la cena, toma el micrófono y convierte la noche en una historia que tu grupo quiera repetir.', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=2200&q=90', alt: 'Cantante con micrófono bajo luces de escenario' },
  { kicker: 'Shows · Tributos · Artistas', line: 'El escenario', accent: 'se enciende.', copy: 'Noches temáticas, música en vivo y una agenda diseñada para disfrutar sin bajar el volumen.', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=2200&q=90', alt: 'Show musical en vivo con luces rojas' },
  { kicker: 'Cumpleaños · Grupos · Eventos', line: 'Celebra a', accent: 'tu manera.', copy: 'Reúne a tu gente, comparte una buena cena y celebra con escenario, música y sabor en un solo lugar.', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=2200&q=90', alt: 'Grupo de amigos celebrando durante la noche' }
];
const experiences = [
  ['01', 'Karaoke & sonido', 'Toma el escenario', 'Tu canción, las luces encendidas y toda la mesa haciendo coro. Aquí nadie viene a mirar.', 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=1200&q=88'],
  ['02', 'Brasas & piqueos', 'La previa empieza en la brasa', 'Pollos, parrillas y piqueos para compartir antes de que empiece el show.', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=88'],
  ['03', 'Shows & celebraciones', 'Celebra sin bajar el volumen', 'Cumpleaños, reencuentros y noches temáticas con la energía que tu grupo merece.', 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=88']
];
const menu = [
  ['Pollo a la brasa', 'El clásico de Charol', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=88'],
  ['Parrilla para compartir', 'Carnes al fuego', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88'],
  ['Piqueos', 'Para toda la mesa', 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=1000&q=88'],
  ['Cócteles & jarras', 'Que siga la noche', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88']
];
const gallery = [
  ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=88', 'Noches que se cantan'],
  ['https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=88', 'El escenario es tuyo'],
  ['https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=88', 'Shows en vivo'],
  ['https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=88', 'Sabor para compartir'],
  ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=88', 'Tu próxima celebración']
];

function Icon({ name, size = 20 }) { const p = { arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>, phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-17.7-17.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />, pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>, instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>, whatsapp: <><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.5 9.5 0 0 1-3.8-.9L3 21l1.8-5a8.5 8.5 0 1 1 16.2-4.5Z" /><path d="M8.5 8.2c.4 3.4 2.1 5 5.4 6.2l1.4-1.4" /></> }; return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p[name]}</svg> }
function Brand() { return <span className="brand-word">CHAROL<span>◆</span></span> }
function Eyebrow({ children, dark = false }) { return <p className={`eyebrow ${dark ? 'dark' : ''}`}><span />{children}</p> }
function Button({ children, href = WA, kind = 'red' }) { return <a className={`button button-${kind}`} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}<Icon name="arrow" /></a> }

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('inicio');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
        const marker = window.scrollY + window.innerHeight * .38;
        let current = 'inicio';
        navItems.forEach(([, id]) => { const section = document.getElementById(id); if (section && section.offsetTop <= marker) current = id });
        setActive(current);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update) };
  }, []);

  useEffect(() => { document.body.classList.toggle('menu-open', open); const close = e => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', close); return () => { document.body.classList.remove('menu-open'); window.removeEventListener('keydown', close) } }, [open]);

  return <><div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" /><header className={`navbar ${scrolled ? 'scrolled' : ''}`}><a href="#inicio" className="brand" aria-label="Charol Karaoke Restobar, inicio"><Brand /><small>Karaoke Restobar</small></a><nav id="main-navigation" className={`nav-links ${open ? 'open' : ''}`} aria-label="Navegación principal">{navItems.map(([label, id]) => <a className={active === id ? 'active' : ''} key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'page' : undefined}><span>{label}</span></a>)}</nav><a className="nav-cta" href={`${WA}?text=Hola%20Charol,%20quiero%20reservar.`} target="_blank" rel="noreferrer"><Icon name="whatsapp" />Reservar</a><button className={`menu-toggle ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="main-navigation"><i /><i /></button></header></>;
}
function Hero() {
  const [active, setActive] = useState(0);
  const heroRef = useRef(null);
  const firstRender = useRef(true);
  const slide = heroSlides[active];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setTimeout(() => setActive(value => (value + 1) % heroSlides.length), 6000);
    return () => window.clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    const nextImage = new Image();
    nextImage.src = heroSlides[(active + 1) % heroSlides.length].image;
  }, [active]);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (firstRender.current) { firstRender.current = false; return undefined }
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-slide.active img', { scale: 1.09 }, { scale: 1, duration: 1.4, ease: 'power3.out' });
      gsap.fromTo('.hero-dynamic > *', { y: 32, opacity: 0 }, { y: 0, opacity: 1, stagger: .08, duration: .7, ease: 'power3.out' });
    }, heroRef);
    return () => ctx.revert();
  }, [active]);

  return <section id="inicio" className="hero" ref={heroRef} data-active-slide={active + 1}>
    <div className="hero-slides parallax">{heroSlides.map((item, index) => <div className={`hero-slide ${index === active ? 'active' : ''}`} key={item.image} aria-hidden={index !== active}><img src={item.image} alt={index === active ? item.alt : ''} loading="eager" fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" /></div>)}</div>
    <div className="hero-shade" /><div className="noise" />
    <div className="hero-content"><div className="hero-dynamic"><Eyebrow>{slide.kicker}</Eyebrow><h1 className="hero-title"><span>{slide.line}</span><span><em>{slide.accent}</em></span></h1><div className="hero-lower"><p>{slide.copy}</p><div className="hero-actions"><Button href={`${WA}?text=Hola%20Charol,%20quiero%20reservar%20una%20mesa.`}>Reservar por WhatsApp</Button><a className="text-link" href={active === 0 ? '#carta' : '#eventos'}>{active === 0 ? 'Ver nuestra carta' : 'Ver próximos eventos'} <Icon name="arrow" /></a></div></div></div></div>
    <div className="hero-side">Los Olivos · Lima <i /></div><div className="hero-scroll">Scroll para vivir la experiencia <span /></div>
    <div className="hero-carousel-controls" aria-label="Controles del carrusel">{heroSlides.map((item, index) => <button className={index === active ? 'active' : ''} key={item.kicker} onClick={() => setActive(index)} aria-label={`Mostrar imagen ${index + 1}: ${item.kicker}`} aria-current={index === active ? 'true' : undefined}><span>0{index + 1}</span><i /></button>)}</div>
  </section>;
}
function Marquee() { const w = ['Karaoke', 'Brasas', 'Piqueos', 'Tragos', 'Shows', 'Celebraciones']; return <div className="marquee" aria-label="Karaoke, brasas, piqueos, tragos, shows y celebraciones"><div className="marquee-track" aria-hidden="true">{[...w, ...w].map((x, i) => <span key={i}>{x}<b>✦</b></span>)}</div></div> }
function Menu() { return <section id="carta" className="menu-section section"><div className="wrap"><div className="section-head menu-head reveal"><Eyebrow>De la cocina a la canción</Eyebrow><h2>Cena primero.<br /><em>Canta después.</em></h2><p>Categorías referenciales de la experiencia Charol. Consulta la carta y precios vigentes por WhatsApp.</p></div><div className="menu-carousel"><div className="menu-track" aria-hidden="true">{[...menu, ...menu].map(([name, type, img], i) => <article className="menu-card" key={`${name}-${i}`}><div><span>0{(i % menu.length) + 1}</span><small>{type}</small></div><img src={img} alt={`Imagen referencial: ${name}`} loading="lazy" decoding="async" /><h3>{name}</h3></article>)}</div></div><div className="menu-cta reveal"><a href={`${WA}?text=Hola%20Charol,%20¿me%20comparten%20la%20carta%20vigente?`} target="_blank" rel="noreferrer">VER CARTA </a></div></div></section> }

function Event() {
  return (
    <section id="eventos" className="event section">
      <div className="event-image parallax">
        <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1800&q=90" alt="Show musical con luces rojas" />
      </div>
      <div className="event-overlay" />
      <div className="wrap event-content reveal">
        <Eyebrow>Próximamente</Eyebrow>
        <div className="event-title"><span className="event-date">Agenda<br />en preparación</span></div>
        <h2>La próxima<br /><em>noche es tuya.</em></h2>
        <p>Shows tributo, noches de rock, música criolla y artistas invitados. Conoce la próxima fecha en nuestras redes.</p>
        <Button kind="outline" href="https://www.instagram.com/charol_karaoke_restobar/">Ver más</Button>
      </div>
    </section>
  );
}
function Celebrations() {
  const defaultImg = 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1500&q=88';
  const items = [
    { label: 'Cumpleaños', text: 'Celebra tu día con escenario propio, karaoke y la mejor comida. Armamos un ambiente que tu grupo va a recordar.', img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1500&q=88' },
    { label: 'Aniversarios', text: 'Una noche especial merece un lugar a la altura. Cena, música y un brindis que marque la fecha.', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1500&q=88' },
    { label: 'Reencuentros', text: 'Junta al grupo después de mucho tiempo. Brasas, tragos y karaoke para ponerse al día como se debe.', img: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=1500&q=88' },
    { label: 'Eventos privados', text: 'Coordina con nuestro equipo para eventos corporativos, lanzamientos o reuniones que necesiten un toque distinto.', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1500&q=88' }
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = i => setOpenIndex(prev => prev === i ? null : i);
  const activeImg = openIndex !== null ? items[openIndex].img : defaultImg;
  return (
    <section id="celebraciones" className="celebrations section">
      <div className="celebrations-media reveal">
        <img src={activeImg} alt="Imagen referencial de celebración" loading="lazy" decoding="async" />
        <span className="round-stamp">TU NOCHE · TU ESCENARIO ·</span>
      </div>
      <div className="celebrations-copy reveal">
        <Eyebrow dark>Celebra en Charol</Eyebrow>
        <h2>Tu grupo pone el motivo.<br /><em>Nosotros el escenario.</em></h2>
        <p>Cuéntanos qué estás celebrando y armamos una experiencia para tu grupo. Condiciones y disponibilidad se confirman por reserva.</p>
        <div className="occasion-list">
          {items.map((item, i) => (
            <button key={item.label} className={`occasion-item ${openIndex === i ? 'open' : ''}`} onClick={() => toggle(i)}>
              <div className="occasion-header">
                <span className="occasion-num">0{i + 1}</span>
                <span className="occasion-label">{item.label}</span>
                <Icon name="arrow" />
              </div>
              {openIndex === i && (
                <div className="occasion-details">
                  <p>{item.text}</p>
                </div>
              )}
            </button>
          ))}
        </div>
        <a className="button button-dark" href="#reserva">Cotizar celebración <Icon name="arrow" /></a>
      </div>
    </section>
  );
};
function Experience() { return <section id="experiencia" className="experience section"><div className="wrap"><div className="section-head reveal"><Eyebrow dark>La experiencia Charol</Eyebrow><h2>Una noche.<br /><em>Tres razones</em> para volver.</h2><p>Del primer plato a la última canción, todo sucede en un mismo lugar.</p></div><div className="experience-grid">{experiences.map(([n, l, t, c, img]) => <article className="experience-card reveal" key={n}><div className="experience-image"><img src={img} alt={`Imagen referencial: ${t}`} loading="lazy" decoding="async" /><span>{n}</span></div><div className="experience-copy"><small>{l}</small><h3>{t}</h3><p>{c}</p><a href={`${WA}?text=${encodeURIComponent(`Hola Charol, quiero consultar sobre ${t}.`)}`} target="_blank" rel="noreferrer" aria-label={`Consultar sobre ${t}`}><Icon name="arrow" /></a></div></article>)}</div></div></section> }
function Gallery() { return <></> }
function Reservation() {
  function submit(event) {
    event.preventDefault(); const data = new FormData(event.currentTarget); const message = [
      'Hola Charol, quiero solicitar una reserva:',
      `Nombre: ${data.get('name')}`,
      `Teléfono: ${data.get('phone')}`,
      `Fecha: ${data.get('date')}`,
      `Hora: ${data.get('time')}`,
      `Personas: ${data.get('people')}`,
      `Motivo: ${data.get('occasion')}`,
      `Comentarios: ${data.get('comments') || 'Ninguno'}`
    ].join('\n'); window.open(`${WA}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }
  return <section id="reserva" className="reservation section"><div className="wrap reservation-layout"><div className="reservation-copy reveal"><Eyebrow>Reserva tu noche</Eyebrow><h2>De la idea<br />al <em>escenario.</em></h2><p>Completa los datos y enviaremos tu solicitud por WhatsApp. La reserva queda confirmada cuando el equipo de CHAROL responda.</p><div><strong>Contacto directo</strong><a href="tel:+51919736348"><Icon name="phone" />919 736 348</a></div></div><form className="reservation-form reveal" onSubmit={submit}><label>Nombre completo<input name="name" autoComplete="name" required placeholder="¿Cómo te llamas?" /></label><label>Teléfono<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="999 999 999" /></label><div className="form-row"><label>Fecha<input name="date" type="date" required /></label><label>Hora<input name="time" type="time" required /></label></div><div className="form-row"><label>Número de personas<input name="people" type="number" min="1" max="100" required placeholder="8" /></label><label>Motivo<select name="occasion" required defaultValue=""><option value="" disabled>Seleccionar</option><option>Cumpleaños</option><option>Reunión de amigos</option><option>Aniversario</option><option>Evento corporativo</option><option>Otro</option></select></label></div><label>Comentarios<textarea name="comments" rows="3" placeholder="Cuéntanos qué necesitas" /></label><label className="consent"><input type="checkbox" required />Acepto enviar estos datos por WhatsApp para gestionar mi solicitud.</label><button className="button button-red" type="submit">Continuar en WhatsApp <Icon name="whatsapp" /></button></form></div></section>
}
function Location() { return <section id="ubicacion" className="location section"><div className="location-map"><div className="map-grid" /><span className="map-pin"><Icon name="pin" size={30} /></span><span className="map-road road-one">Av. Antúnez de Mayolo</span><span className="map-road road-two">Los Olivos</span></div><div className="location-copy reveal"><Eyebrow>Encuéntranos</Eyebrow><h2>La noche empieza<br />en <em>Los Olivos.</em></h2><div className="address"><Icon name="pin" /><div><small>Dirección reportada</small><strong>Av. Santiago Antúnez de Mayolo 1107<br />Los Olivos, Lima</strong><span>Confirma el ingreso exacto al reservar.</span></div></div><div className="location-actions"><Button href="https://www.google.com/maps/search/?api=1&query=Av.+Santiago+Antunez+de+Mayolo+1107+Los+Olivos">Cómo llegar</Button><a className="phone-link" href="tel:+51919736348"><Icon name="phone" />919 736 348</a></div></div></section> }
function Footer() { return <footer className="footer"><div className="footer-cta reveal"><p>Tu próxima celebración merece escenario.</p><h2>Reserva tu noche<br /><em>en Charol.</em></h2><a href={WA} target="_blank" rel="noreferrer" className="footer-circle"><Icon name="whatsapp" size={30} /><span>Reservar<br />ahora</span></a></div><div className="footer-bottom"><div className="brand"><Brand /><small>Karaoke Restobar</small></div><nav><a href="#experiencia">Experiencia</a><a href="#eventos">Eventos</a><a href="#carta">Carta</a><a href="#ubicacion">Ubicación</a></nav><div className="social"><a href="https://www.instagram.com/charol_karaoke_restobar/" target="_blank" rel="noreferrer"><Icon name="instagram" />Instagram</a><a href="tel:+51919736348"><Icon name="phone" />919 736 348</a></div><small>© 2026 CHAROL · LOS OLIVOS</small></div></footer> }

export default function App() { const root = useRef(null); useLayoutEffect(() => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined; const ctx = gsap.context(() => { gsap.from('.navbar', { y: -100, opacity: 0, duration: 1, ease: 'power4.out' }); gsap.from('.hero-title span', { yPercent: 120, rotate: 3, stagger: .12, duration: 1.2, ease: 'power4.out', delay: .15 }); gsap.from('.hero .eyebrow,.hero-lower', { y: 35, opacity: 0, stagger: .18, duration: .9, ease: 'power3.out', delay: .65 }); gsap.to('.hero-content', { yPercent: 18, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } }); gsap.utils.toArray('.parallax').forEach(el => gsap.to(el, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })); gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, { y: 70, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' } })); gsap.to('.marquee-track', { xPercent: -50, duration: 24, repeat: -1, ease: 'none' }); gsap.to('.menu-track', { xPercent: -50, duration: 45, repeat: -1, ease: 'none' }); gsap.to('.round-stamp', { rotation: 360, duration: 18, repeat: -1, ease: 'none' }); const media = gsap.matchMedia(); media.add('(min-width: 769px)', () => { const track = document.querySelector('.gallery-track'); if (!track) return undefined; const tween = gsap.to(track, { x: () => Math.min(0, -(track.scrollWidth - window.innerWidth + 80)), ease: 'none', scrollTrigger: { trigger: '.gallery-section', start: 'top top', end: () => `+=${Math.max(track.scrollWidth, window.innerWidth)}`, scrub: 1, pin: true, invalidateOnRefresh: true } }); return () => tween.kill() }); const images = gsap.utils.toArray('img'); const refresh = () => ScrollTrigger.refresh(); images.forEach(image => { if (!image.complete) image.addEventListener('load', refresh, { once: true }) }); return () => { images.forEach(image => image.removeEventListener('load', refresh)); media.revert() } }, root); return () => ctx.revert() }, []); return <main ref={root}><Navbar /><Hero /><Marquee /><Menu /><Experience /><Event /><Celebrations /><Gallery /><Location /><Footer /><a className="whatsapp-float" href={WA} target="_blank" rel="noreferrer" aria-label="Reservar por WhatsApp"><Icon name="whatsapp" size={25} /><span>Reserva aquí</span></a></main> }
