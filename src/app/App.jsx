import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WA } from '../data/contact';
import { useRouter } from '../hooks/useRouter';
import { useCart } from '../hooks/useCart';
import { Icon } from '../components/Icon';
import { LoadingScreen } from '../components/LoadingScreen';
import { Navbar } from '../components/Navbar';
import { Hero } from '../sections/Hero';
import { MenuSection } from '../sections/MenuSection';
import { Experience } from '../sections/Experience';
import { Event } from '../sections/Event';
import { Celebrations } from '../sections/Celebrations';
import { Pedidos } from '../sections/Pedidos';
import { Footer } from '../sections/Footer';
import { CartaPage } from '../pages/CartaPage';
import { CartPage } from '../pages/CartPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { page, navigate } = useRouter();
  const cart = useCart();
  const root = useRef(null);
  const [loadingState, setLoadingState] = useState('visible');

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLoadingState('leaving'), 1450);
    const hideTimer = window.setTimeout(() => setLoadingState('hidden'), 1950);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useLayoutEffect(() => {
    if (page !== 'home') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.navbar', { y: -100, opacity: 0, duration: 1, ease: 'power4.out' });
      gsap.from('.hero-title span', { yPercent: 120, rotate: 3, stagger: .12, duration: 1.2, ease: 'power4.out', delay: .15 });
      gsap.from('.hero .eyebrow,.hero-lower', { y: 35, opacity: 0, stagger: .18, duration: .9, ease: 'power3.out', delay: .65 });
      gsap.to('.hero-content', { yPercent: 18, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.utils.toArray('.parallax').forEach(el => gsap.to(el, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
      gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, { y: 70, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' } }));
      gsap.from('.menu-cta', { y: 50, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.menu-section', start: 'top 92%', toggleActions: 'play none none reverse' } });
      gsap.from('.event-content', { y: 50, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '#eventos', start: 'top 90%', toggleActions: 'play none none reverse' } });
      gsap.from('.whatsapp-float', { opacity: 0, pointerEvents: 'none', duration: .5, ease: 'power2.out', scrollTrigger: { trigger: '#carta', start: 'top 90%', toggleActions: 'play none none reverse' } });
      gsap.to('.marquee-track', { xPercent: -50, duration: 24, repeat: -1, ease: 'none' });
      const roundStampST = ScrollTrigger.create({
        trigger: '.celebrations',
        start: 'top bottom',
        endTrigger: '.footer',
        end: 'top top',
        scrub: 0.5,
        onUpdate: self => {
          gsap.set('.round-stamp', { y: self.progress * 150 });
        }
      });
      const images = gsap.utils.toArray('img');
      const refresh = () => ScrollTrigger.refresh();
      images.forEach(image => { if (!image.complete) image.addEventListener('load', refresh, { once: true }); });
      return () => {
        roundStampST.kill();
        images.forEach(image => image.removeEventListener('load', refresh));
      };
    }, root);
    return () => ctx.revert();
  }, [page]);

  if (page === 'carta') {
    return (
      <>
        <Navbar navigate={navigate} page={page} />
        <CartaPage navigate={navigate} cart={cart} />
      </>
    );
  }
  if (page === 'cart') {
    return <CartPage navigate={navigate} cart={cart} />;
  }

  return (
    <>
      {loadingState !== 'hidden' && <LoadingScreen isLeaving={loadingState === 'leaving'} />}
      <main ref={root}>
        <Navbar navigate={navigate} page={page} />
        <Hero navigate={navigate} />
        <MenuSection navigate={navigate} />
        <Pedidos />
        <Experience />
        <Event />
        <Celebrations />
        <Footer navigate={navigate} />
        <a className="whatsapp-float" href={WA} target="_blank" rel="noreferrer" aria-label="Reservar por WhatsApp">
          <Icon name="whatsapp" size={25} /><span>Reserva aqu\u00ed</span>
        </a>
      </main>
    </>
  );
}
