import { useEffect, useRef, useState } from 'react';
import { WA } from '../data/contact';
import { navItems } from '../data/navigation';
import { Brand } from './Brand';
import { Icon } from './Icon';

export function Navbar({ navigate, page }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(page === 'carta' ? 'carta' : '');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (page === 'carta') { setActive('carta'); return }
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
        const marker = window.scrollY + window.innerHeight * .38;
        let current = '';
        navItems.forEach(([, id]) => { const section = document.getElementById(id); if (section && section.offsetTop <= marker) current = id });
        setActive(current);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update) };
  }, [page]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const close = e => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    return () => { document.body.classList.remove('menu-open'); window.removeEventListener('keydown', close) };
  }, [open]);

  const handleNav = (id) => {
    setOpen(false);
    if (id === 'carta') {
      navigate('/carta');
    } else if (!id) {
      navigate('/');
      window.scrollTo(0, 0);
    } else {
      if (page !== 'home') navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const navLink = (label, id) => (
    <button className={active === id ? 'active nav-link-btn' : 'nav-link-btn'} key={id} onClick={() => handleNav(id)}>
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className={`navbar ${scrolled || page !== 'home' ? 'scrolled' : ''}`}>
        <a href="/" className="brand" onClick={(e) => { e.preventDefault(); if (page === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); } else { navigate('/'); window.scrollTo(0, 0); } }} aria-label="Charol Karaoke Restobar, inicio">
          <Brand />
        </a>
        <nav id="main-navigation" className={`nav-links ${open ? 'open' : ''}`} aria-label="Navegaci\u00f3n principal">
          {navItems.map(([label, id]) => navLink(label, id))}
        </nav>
        <a className="nav-cta" href={`${WA}?text=Hola%20Charol,%20quiero%20reservar.`} target="_blank" rel="noreferrer">
          <Icon name="whatsapp" />Reservar
        </a>
        <button className={`menu-toggle ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar men\u00fa' : 'Abrir men\u00fa'} aria-expanded={open} aria-controls="main-navigation"><i /><i /></button>
      </header>
    </>
  );
}
