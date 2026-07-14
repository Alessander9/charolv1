import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const WA = 'https://wa.me/51919736348';
const navItems = [['Home', ''], ['Carta', 'carta'], ['Delivery', 'pedidos'], ['Experiencia', 'experiencia'],['Eventos', 'celebraciones'], ['Ubicaci\u00f3n', 'ubicacion']];

// ─── HERO SLIDES ───────────────────────────────────────
const heroSlides = [
  { kicker: 'Pollo a la brasa \u00b7 Parrillas', line: 'Fuego que', accent: 'se comparte.', copy: 'Pollo a la brasa, carnes y parrillas preparadas para reunir a todos alrededor de la mesa.', image: 'https://images.unsplash.com/photo-1712579733874-c3a79f0f9d12?auto=format&fit=crop&w=2200&q=90', alt: 'Pollo entero dor\u00e1ndose sobre una parrilla' },
  { kicker: 'Karaoke \u00b7 M\u00fasica \u00b7 Diversi\u00f3n', line: 'Canta, brinda', accent: 'y vive la noche.', copy: 'Despues de la cena, toma el micr\u00f3fono y convierte la noche en una historia que tu grupo quiera repetir.', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=2200&q=90', alt: 'Cantante con micr\u00f3fono bajo luces de escenario' },
  { kicker: 'Shows \u00b7 Tributos \u00b7 Artistas', line: 'El escenario', accent: 'se enciende.', copy: 'Noches tem\u00e1ticas, m\u00fasica en vivo y una agenda dise\u00f1ada para disfrutar sin bajar el volumen.', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=2200&q=90', alt: 'Show musical en vivo con luces rojas' },
  { kicker: 'Cumplea\u00f1os \u00b7 Grupos \u00b7 Eventos', line: 'Celebra a', accent: 'tu manera.', copy: 'Re\u00fane a tu gente, comparte una buena cena y celebra con escenario, m\u00fasica y sabor en un solo lugar.', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=2200&q=90', alt: 'Grupo de amigos celebrando durante la noche' }
];
const experiences = [
  ['01', 'Karaoke & sonido', 'Toma el escenario', 'Tu canci\u00f3n, las luces encendidas y toda la mesa haciendo coro. Aqu\u00ed nadie viene a mirar.', 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=1200&q=88'],
  ['02', 'Brasas & piqueos', 'La previa empieza en la brasa', 'Pollos, parrillas y piqueos para compartir antes de que empiece el show.', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=88'],
  ['03', 'Shows & celebraciones', 'Celebra sin bajar el volumen', 'Cumplea\u00f1os, reencuentros y noches tem\u00e1ticas con la energ\u00eda que tu grupo merece.', 'https://images.unsplash.com/photo-1527529482837-469817dc6ce?auto=format&fit=crop&w=1200&q=88']
];

// ─── CARTA DATA ────────────────────────────────────────
const cartaCategories = [
  {
    name: 'Pollo a la Brasa',
    tag: 'Nuestra especialidad',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1400&q=88',
    items: [
      { name: 'Pollo Entero', desc: 'Pollito criollo marinado al carb\u00f3n, ba\u00f1ado en nuestra salsa especial de la casa. Acompa\u00f1ado de papas fritas, ensalada fresca y cremas.', price: 'S/ 65.00' },
      { name: 'Medio Pollo', desc: 'La misma experiencia en media porci\u00f3n. Ideal para un comensal con apetito selectivo.', price: 'S/ 38.00' },
      { name: 'Pecho a la Brasa', desc: 'Pechuga jugosa marinada y asada a la parrilla, servida con guarnici\u00f3n a elecci\u00f3n.', price: 'S/ 32.00' },
      { name: 'Alitas Charol', desc: 'Alitas de pollo glaseadas con salsa BBQ de la casa, toque ahumado y un golpe de especias.', price: 'S/ 28.00' },
      { name: 'Pollo Saltado', desc: 'Tiras de pollo salteadas con cebolla, tomate, aj\u00ed amarillo y un toque de sillao. Acompa\u00f1ado de papas fritas y arroz.', price: 'S/ 30.00' },
    ]
  },
  {
    name: 'Parrillas',
    tag: 'Carnes al fuego',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=88',
    items: [
      { name: 'Parrilla Charol (2 pers.)', desc: 'Mix de carnes seleccionadas: lomo, pollo, chorizo y anticucho. Acompa\u00f1ado de papas doradas, ensalada y salsas de la casa.', price: 'S/ 78.00' },
      { name: 'Parrilla Suprema (4 pers.)', desc: 'Versi\u00f3n extendida de nuestra parrilla insignia. Carnes marinadas al carb\u00f3n con guarniciones completas para compartir en grupo.', price: 'S/ 145.00' },
      { name: 'Lomo Saltado', desc: 'El cl\u00e1sico peruano: lomo de res salteado con cebolla, tomate, aj\u00ed amarillo y vinagre. Acompa\u00f1ado de papas fritas crocantes y arroz.', price: 'S/ 35.00' },
      { name: 'Bisteck a lo Pobre', desc: 'Bisteck jugoso, huevo frito, papas doradas, arroz y pl\u00e1tano frito. Un cl\u00e1sico que nunca falla.', price: 'S/ 38.00' },
      { name: 'Anticuchos (x4)', desc: 'Coraz\u00f3n de res marinado en vinagre y especias, asado a la parrilla y servido con papas doradas y choclo.', price: 'S/ 32.00' },
    ]
  },
  {
    name: 'Piqueos',
    tag: 'Para compartir',
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=1400&q=88',
    items: [
      { name: 'Teque\u00f1os (x8)', desc: 'Palitos de queso derretido envueltos en masa crocante, acompa\u00f1ados de salsa huanca\u00edna y criolla.', price: 'S/ 22.00' },
      { name: 'Ceviche Mixto', desc: 'Ceviche fresco de pescado y mariscos, marinado en lim\u00f3n, con cebolla morada, camote y cancha serrana.', price: 'S/ 36.00' },
      { name: 'Causa Charol', desc: 'Capas de papa amarilla rellenas de pollo, palta y mayonesa. Coronada con huevo duro y aceituna.', price: 'S/ 28.00' },
      { name: 'Chicharr\u00f3n de Pollo', desc: 'Tiras de pollo empanizadas y fritas hasta quedar doradas y crujientes. Acompa\u00f1adas de salsa BBQ y papas.', price: 'S/ 26.00' },
      { name: 'Nachos con Queso', desc: 'Totopos cubiertos con queso cheddar fundido, guacamole, salsa fresca y jalape\u00f1os.', price: 'S/ 24.00' },
      { name: 'Salchipapas Charol', desc: 'Salchichas doradas con papas fritas, ba\u00f1adas en salsas especiales y queso rallado.', price: 'S/ 20.00' },
    ]
  },
  {
    name: 'Ensaladas',
    tag: 'Frescas y ligeras',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=88',
    items: [
      { name: 'Ensalada Cl\u00e1sica', desc: 'Lechuga, tomate, pepino, zanahoria rallada y cebolla morada. Aderezo a elecci\u00f3n.', price: 'S/ 16.00' },
      { name: 'Ensalada Charol', desc: 'Mezcla de verdes, palta, queso fresco, crutones, ar\u00e1ndanos y vinagreta de la casa.', price: 'S/ 24.00' },
      { name: 'Ensalada de Palta', desc: 'Palta rellena de pollo desmenuzado, mayonesa y verduras frescas. Ligera y sabrosa.', price: 'S/ 22.00' },
    ]
  },
  {
    name: 'C\u00f3cteles & Jarras',
    tag: 'Que siga la noche',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1400&q=88',
    items: [
      { name: 'Pisco Sour', desc: 'El cl\u00e1sico del Per\u00fa: pisco, lim\u00f3n, jarabe de goma, clara de huevo y amargo de angostura.', price: 'S/ 22.00' },
      { name: 'Maracuy\u00e1 Sour', desc: 'Nuestra versi\u00f3n tropical del sour, con pulpa de maracuy\u00e1 fresco y un toque de canela.', price: 'S/ 24.00' },
      { name: 'Chilcano de Pisco', desc: 'Pisco, ginger ale, lim\u00f3n y gotas de amargo. Refrescante y perfecto para la noche.', price: 'S/ 20.00' },
      { name: 'Cuba Libre', desc: 'Ron, Coca-Cola y lim\u00f3n. El cl\u00e1sico que nunca falla en la barra.', price: 'S/ 22.00' },
      { name: 'Jarra de Pisco Sour (x4)', desc: 'Comparte el sabor peruano con esta jarra preparada para 4 personas.', price: 'S/ 75.00' },
      { name: 'Jarra de Maracuy\u00e1 Sour (x4)', desc: 'Nuestro sour tropical en versi\u00f3n jarra para celebrar en grupo.', price: 'S/ 80.00' },
    ]
  },
  {
    name: 'Bebidas',
    tag: 'Sin alcohol',
    image: 'https://images.unsplash.com/photo-1544252890-c3e95e867389?auto=format&fit=crop&w=1400&q=88',
    items: [
      { name: 'Chicha Morada', desc: 'La tradicional bebida peruana de ma\u00edz morado, pi\u00f1a y especias. Natural y refrescante.', price: 'S/ 8.00' },
      { name: 'Limonada Frozen', desc: 'Limonada bien fr\u00eda con hielo picado y un toque de jengibre.', price: 'S/ 10.00' },
      { name: 'Maracuy\u00e1 Natural', desc: 'Jugo fresco de maracuy\u00e1 colado y endulzado al punto.', price: 'S/ 10.00' },
      { name: 'Gaseosa (500ml)', desc: 'Inca Kola, Coca-Cola, Sprite o Fanta. Elige tu preferida.', price: 'S/ 6.00' },
      { name: 'Agua Mineral (500ml)', desc: 'Agua mineral natural San Luis o Cielo.', price: 'S/ 5.00' },
      { name: 'Cerveza Cristal (620ml)', desc: 'La cerveza peruana por excelencia. Bien helada.', price: 'S/ 10.00' },
      { name: 'Cerveza Cusque\u00f1a (630ml)', desc: 'Cerveza premium peruana. Disponible en variedad rubia o negra.', price: 'S/ 12.00' },
    ]
  },
  {
    name: 'Postres',
    tag: 'El cierre perfecto',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1400&q=88',
    items: [
      { name: 'Suspiro a la Lime\u00f1a', desc: 'El postre lime\u00f1o por excelencia: manjar blanco cremoso cubierto de merengue de puerto y canela.', price: 'S/ 16.00' },
      { name: 'Crema Volteada', desc: 'Flan cl\u00e1sico de vainilla con caramelo l\u00edquido. Suave, dulce y reconfortante.', price: 'S/ 14.00' },
      { name: 'Pie de Lim\u00f3n', desc: 'Base de galleta crujiente, crema de lim\u00f3n natural y merengue tostado.', price: 'S/ 15.00' },
      { name: 'Helado (2 bolas)', desc: 'Helado artesanal de vainilla, chocolate o l\u00facuma. Acompa\u00f1ado de salsa de chocolate.', price: 'S/ 12.00' },
    ]
  }
];

// ─── ICONS ─────────────────────────────────────────────
function Icon({ name, size = 20 }) {
  const p = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-17.7-17.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    whatsapp: <g transform="scale(0.75)"><path d="M5.67509 22.1251C4.1862 19.6131 3.66541 16.644 4.21048 13.7753C4.75555 10.9065 6.329 8.33537 8.63545 6.5445C10.9419 4.75364 13.8227 3.86623 16.7371 4.04888C19.6514 4.23152 22.3989 5.47165 24.4637 7.53646C26.5285 9.60127 27.7687 12.3488 27.9513 15.2631C28.134 18.1775 27.2465 21.0583 25.4557 23.3647C23.6648 25.6712 21.0937 27.2446 18.2249 27.7897C15.3561 28.3348 12.3871 27.814 9.87509 26.3251L5.72509 27.5001C5.55507 27.5498 5.37479 27.5529 5.20317 27.509C5.03154 27.4651 4.87488 27.3758 4.74962 27.2506C4.62435 27.1253 4.53509 26.9687 4.49119 26.797C4.44729 26.6254 4.45036 26.4451 4.50009 26.2751L5.67509 22.1251Z" /><path d="M19.0125 23C17.6967 23.0033 16.3933 22.7466 15.177 22.2446C13.9608 21.7426 12.8557 21.0052 11.9253 20.0748C10.9949 19.1444 10.2575 18.0393 9.75547 16.823C9.25346 15.6068 8.99673 14.3033 9.00003 12.9875C9.00334 12.0614 9.37355 11.1744 10.0296 10.5207C10.6856 9.86705 11.5739 9.50002 12.5 9.50003C12.6528 9.49881 12.8031 9.5388 12.9351 9.61579C13.0671 9.69278 13.1759 9.80392 13.25 9.93753L14.7125 12.4875C14.7995 12.6425 14.8441 12.8177 14.8419 12.9955C14.8397 13.1732 14.7908 13.3472 14.7 13.5L13.525 15.4625C14.1269 16.8014 15.1987 17.8732 16.5375 18.475L18.5 17.3C18.6529 17.2093 18.8269 17.1603 19.0046 17.1581C19.1823 17.1559 19.3575 17.2006 19.5125 17.2875L22.0625 18.75C22.1961 18.8242 22.3073 18.933 22.3843 19.0649C22.4613 19.1969 22.5013 19.3472 22.5 19.5C22.4968 20.4251 22.1287 21.3116 21.4757 21.9669C20.8227 22.6222 19.9376 22.9934 19.0125 23Z" /></g>,
    mouse: <g transform="scale(0.75)"><path d="M4.77488 6.06238L12.0499 25.4624C12.1222 25.6533 12.2512 25.8175 12.4196 25.933C12.5879 26.0484 12.7876 26.1095 12.9917 26.1082C13.1959 26.1068 13.3947 26.043 13.5615 25.9253C13.7283 25.8077 13.8551 25.6417 13.9249 25.4499L16.8374 17.4374C16.888 17.2999 16.9679 17.1751 17.0715 17.0715C17.1751 16.9679 17.2999 16.888 17.4374 16.8374L25.4499 13.9249C25.6417 13.8551 25.8077 13.7283 25.9253 13.5615C26.043 13.3947 26.1068 13.1959 26.1082 12.9917C26.1095 12.7876 26.0484 12.5879 25.933 12.4196C25.8175 12.2512 25.6533 12.1222 25.4624 12.0499L6.06238 4.77488C5.88259 4.70744 5.68719 4.6932 5.49952 4.73384C5.31185 4.77448 5.13985 4.8683 5.00407 5.00407C4.8683 5.13985 4.77448 5.31185 4.73384 5.49952C4.6932 5.68719 4.70744 5.88259 4.77488 6.06238Z" /><path d="M17.075 17.075L26 26" /></g>,
    rappi: <g transform="scale(0.75)"><path d="M30.6101 14.3061C29.0319 15.6877 27.6319 15.7745 25.9507 14.5368C25.1777 13.9684 24.4854 13.291 23.7103 12.7258C23.1105 12.2883 22.4768 11.854 21.7923 11.5837C20.6082 11.1151 19.4069 11.2743 18.3255 11.9316C17.5909 12.3779 16.9216 12.9343 16.2403 13.4646C16.1447 13.538 16.073 13.5786 16.0004 13.5754C15.9277 13.5786 15.8564 13.538 15.7604 13.4646C15.0791 12.9343 14.4098 12.3783 13.6752 11.9316C12.5949 11.2746 11.3925 11.1151 10.208 11.5837C9.52354 11.854 8.88987 12.2883 8.29007 12.7258C7.51491 13.291 6.82267 13.9684 6.04963 14.5368C4.36842 15.7745 2.96841 15.6877 1.39022 14.3061C1.26003 14.1921 1.13019 14.0782 1 13.9653C1.23498 15.2654 1.74164 16.4315 2.48963 17.4896C3.44402 18.8402 4.69584 19.8077 6.26697 20.3387C9.93952 21.5803 14.5788 19.8497 16 16.5832C17.4212 19.8497 22.0605 21.5803 25.733 20.3387C27.3042 19.8077 28.556 18.8399 29.5104 17.4896C30.258 16.4315 30.765 15.2654 31 13.9653C30.8698 14.0782 30.74 14.1921 30.6101 14.3061Z" /></g>,
    info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>,
    check: <path d="M20 6 9 17l-5-5" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p[name]}</svg>;
}
function Brand() { return <span className="brand-word">CHAROL<span></span></span> }
function Eyebrow({ children, dark = false }) { return <p className={`eyebrow ${dark ? 'dark' : ''}`}><span />{children}</p> }
function Button({ children, href = WA, kind = 'red' }) { return <a className={`button button-${kind}`} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}<Icon name="arrow" /></a> }

// ─── ROUTER (state-based) ──────────────────────────────
function useRouter() {
  const [page, setPage] = useState(() => {
    const p = window.location.pathname;
    if (p === '/carta') return 'carta';
    if (p === '/cart') return 'cart';
    return 'home';
  });

  useEffect(() => {
    const handler = () => {
      const p = window.location.pathname;
      if (p === '/carta') setPage('carta');
      else if (p === '/cart') setPage('cart');
      else setPage('home');
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const navigate = useCallback((to) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  return { page, navigate };
}

// ─── CART HOOK ──────────────────────────────────────────
function parsePrice(priceStr) {
  return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
}

function useCart() {
  const [items, setItems] = useState([]);

  const addItem = useCallback((item, categoryName) => {
    const id = `${item.name}-${categoryName}`;
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        id,
        name: item.name,
        category: categoryName,
        price: parsePrice(item.price),
        priceLabel: item.price,
        quantity: 1
      }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setItems(prev => prev.map(i => {
      if (i.id !== id) return i;
      const newQ = i.quantity + delta;
      return newQ <= 0 ? null : { ...i, quantity: newQ };
    }).filter(Boolean));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice };
}

// ─── NAVBAR ────────────────────────────────────────────
function Navbar({ navigate, page }) {
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
          <Brand /><small>Karaoke Restobar</small>
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

// ─── HOME PAGE SECTIONS ────────────────────────────────
function Hero({ navigate }) {
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
            <img src={item.image} alt={index === active ? item.alt : ''} loading="eager" fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
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

function Marquee() {
  const w = ['Karaoke', 'Brasas', 'Piqueos', 'Tragos', 'Shows', 'Celebraciones'];
  return <div className="marquee" aria-label="Karaoke, brasas, piqueos, tragos, shows y celebraciones"><div className="marquee-track" aria-hidden="true">{[...w, ...w].map((x, i) => <span key={i}>{x}<b>\u2726</b></span>)}</div></div>;
}

const menu = [
  ['Pollo a la brasa', 'El cl\u00e1sico de Charol', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=88'],
  ['Parrilla para compartir', 'Carnes al fuego', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88'],
  ['Piqueos', 'Para toda la mesa', 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=1000&q=88'],
  ['C\u00f3cteles & jarras', 'Que siga la noche', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88']
];

function MenuSection({ navigate }) {
  return (
    <section id="carta" className="menu-section section">
      <div className="wrap">
        <div className="section-head menu-head reveal">
          <Eyebrow>De la cocina a la canci\u00f3n</Eyebrow>
          <h2>Cena primero.<br /><em>Canta despues.</em></h2>
          <p>Categor\u00edas referenciales de la experiencia Charol. Consulta la carta completa con precios y descripciones.</p>
        </div>
        <div className="menu-carousel">
          <div className="menu-track" aria-hidden="true">
            {[...menu, ...menu].map(([name, type, img], i) => (
              <article className="menu-card" key={`${name}-${i}`}>
                <div><span>0{(i % menu.length) + 1}</span><small>{type}</small></div>
                <img src={img} alt={`Imagen referencial: ${name}`} loading="lazy" decoding="async" />
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        </div>
        <div className="menu-cta reveal">
          <button className="menu-cta-btn" onClick={() => navigate('/carta')}>
            VER CARTA COMPLETA <Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Experience() {
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

function Event() {
  return (
    <section id="eventos" className="event section">
      <div className="event-image parallax">
        <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1800&q=90" alt="Show musical con luces rojas" />
      </div>
      <div className="event-overlay" />
      <div className="wrap event-content reveal">
        <Eyebrow>Pr\u00f3ximamente</Eyebrow>
        <div className="event-title"><span className="event-date">Agenda<br />en preparaci\u00f3n</span></div>
        <h2>La proxima<br /><em>noche es tuya.</em></h2>
        <p>Shows tributo, noches de rock, m\u00fasica criolla y artistas invitados. Conoce la pr\u00f3xima fecha en nuestras redes.</p>
        <Button kind="outline" href="https://www.instagram.com/charol_karaoke_restobar/">Ver m\u00e1s</Button>
      </div>
    </section>
  );
}

function Celebrations() {
  const defaultImg = 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1500&q=88';
  const items = [
    { label: 'Cumplea\u00f1os', text: 'Celebra tu dia con escenario propio, karaoke y la mejor comida. Armamos un ambiente que tu grupo va a recordar.', img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1500&q=88' },
    { label: 'Aniversarios', text: 'Una noche especial merece un lugar a la altura. Cena, musica y un brindis que marque la fecha.', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1500&q=88' },
    { label: 'Reencuentros', text: 'Junta al grupo despues de mucho tiempo. Brasas, tragos y karaoke para ponerse al d\u00eda como se debe.', img: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=1500&q=88' },
    { label: 'Eventos privados', text: 'Coordina con nuestro equipo para eventos corporativos, lanzamientos o reuniones que necesiten un toque distinto.', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1500&q=88' }
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = i => setOpenIndex(prev => prev === i ? null : i);
  const activeImg = openIndex !== null ? items[openIndex].img : defaultImg;
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
            <button key={item.label} className={`occasion-item ${openIndex === i ? 'open' : ''}`} onClick={() => toggle(i)}>
              <div className="occasion-header">
                <span className="occasion-num">0{i + 1}</span>
                <span className="occasion-label">{item.label}</span>
                <Icon name="arrow" />
              </div>
              {openIndex === i && (
                <div className="occasion-details"><p>{item.text}</p></div>
              )}
            </button>
          ))}
        </div>
        <a className="button button-dark" href="#reserva">Cotizar celebracion <Icon name="arrow" /></a>
      </div>
    </section>
  );
}

function Tarjeta({ titulo, colorFondoHover, colorTextoHover, efecto, icono = 'phone' }) {
  return (
    <div className={`pedidos-card tarjeta ${efecto}`} style={{ '--color-hover-fondo': colorFondoHover, '--color-hover-texto': colorTextoHover }}>
      <h3 className='letter'>{titulo}</h3>
      <Icon name={icono} size={40} />
    </div>
  );
}

function Pedidos() {
  return (
    <section id="pedidos" className="pedidos section">
      <div className="wrap pedidos-wrap">
        <div className="pedidos-header">
          <h2>Pide por<br />donde prefieras.</h2>
          <div className="pedidos-bird">
            <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="Mascota" loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="pedidos-grid">
          <Tarjeta titulo="Web" efecto="hover-zoom" colorFondoHover="#d71920" colorTextoHover="white" icono="mouse" />
          <Tarjeta titulo="Telefono" efecto="hover-rotate" colorFondoHover="#1877F2" colorTextoHover="white" />
          <Tarjeta titulo="WhatsApp" efecto="hover-lift" colorFondoHover="#25D366" colorTextoHover="white" icono="whatsapp" />
          <Tarjeta titulo="Rappi" efecto="hover-rotate" colorFondoHover="#FF4940" colorTextoHover="white" icono="rappi" />
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="ubicacion" className="location section">
      <div className="location-map">
        <div className="map-grid" />
        <span className="map-pin"><Icon name="pin" size={30} /></span>
        <span className="map-road road-one">Av. Antunez de Mayolo</span>
        <span className="map-road road-two">Los Olivos</span>
      </div>
      <div className="location-copy reveal">
        <Eyebrow>Encuentranos</Eyebrow>
        <h2>La noche empieza<br />en <em>Los Olivos.</em></h2>
        <div className="address">
          <Icon name="pin" />
          <div>
            <small>Dirección reportada</small>
            <strong>Av. Santiago Antunez de Mayolo 1107<br />Los Olivos, Lima</strong>
            <span>Confirma el ingreso exacto al reservar.</span>
          </div>
        </div>
        <div className="location-actions">
          <Button href="https://www.google.com/maps/search/?api=1&query=Av.+Santiago+Antunez+de+Mayolo+1107+Los+Olivos">Cómo llegar</Button>
          <a className="phone-link" href="tel:+51919736348"><Icon name="phone" /> 919 736 348</a>
        </div>
      </div>
    </section>
  );
}

function Reservation() {
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const msg = [
      'Hola Charol, quiero solicitar una reserva:',
      `Nombre: ${data.get('name')}`,
      `Telefono: ${data.get('phone')}`,
      `Fecha: ${data.get('date')}`,
      `Hora: ${data.get('time')}`,
      `Personas: ${data.get('people')}`,
      `Motivo: ${data.get('occasion')}`,
      `Comentarios: ${data.get('comments') || 'Ninguno'}`
    ].join('\n');
    window.open(`${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  }
  return (
    <section id="reserva" className="reservation section">
      <div className="wrap reservation-layout">
        <div className="reservation-copy reveal">
          <Eyebrow>Reserva tu noche</Eyebrow>
          <h2>De la idea<br />al <em>escenario.</em></h2>
          <p>Completa los datos y enviaremos tu solicitud por WhatsApp. La reserva queda confirmada cuando el equipo de CHAROL responda.</p>
          <div><strong>Contacto directo</strong><a href="tel:+51919736348"><Icon name="phone" />919 736 348</a></div>
        </div>
        <form className="reservation-form reveal" onSubmit={submit}>
          <label>Nombre completo<input name="name" autoComplete="name" required placeholder="¿Cómo te llamas?" /></label>
          <label>Telefono<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="999 999 999" /></label>
          <div className="form-row">
            <label>Fecha<input name="date" type="date" required /></label>
            <label>Hora<input name="time" type="time" required /></label>
          </div>
          <div className="form-row">
            <label>Numero de personas<input name="people" type="number" min="1" max="100" required placeholder="8" /></label>
            <label>Motivo<select name="occasion" required defaultValue=""><option value="" disabled>Seleccionar</option><option>Cumplea\u00f1os</option><option>Reuni\u00f3n de amigos</option><option>Aniversario</option><option>Evento corporativo</option><option>Otro</option></select></label>
          </div>
          <label>Comentarios<textarea name="comments" rows="3" placeholder="Cuentanos que necesitas" /></label>
          <label className="consent"><input type="checkbox" required />Acepto enviar estos datos por WhatsApp para gestionar mi solicitud.</label>
          <button className="button button-red" type="submit">Continuar en WhatsApp <Icon name="whatsapp" /></button>
        </form>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-cta reveal">
        <p>Tu pr\u00f3xima celebraci\u00f3n merece escenario.</p>
        <h2>Reserva tu noche<br /><em>en Charol.</em></h2>
        <a href={WA} target="_blank" rel="noreferrer" className="footer-circle">
          <Icon name="whatsapp" size={30} />
          <span>Reservar<br />ahora</span>
        </a>
      </div>
      <div className="footer-bottom">
        <div className="brand">
          <Brand />
          <small>Karaoke Restobar</small>
        </div>
        <nav>
          <button onClick={() => { navigate('/'); window.scrollTo(0, 0); }} className="footer-link-btn">Home</button>
          <button onClick={() => navigate('/carta')} className="footer-link-btn">Carta</button>
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="footer-link-btn">Ubicaci\u00f3n</button>
        </nav>
        <div className="social">
          <a href="https://www.instagram.com/charol_karaoke_restobar/" target="_blank" rel="noreferrer"><Icon name="instagram" /> Instagram</a>
          <a href="tel:+51919736348"><Icon name="phone" /> 919 736 348</a>
        </div>
        <small>&copy; 2026 CHAROL \u00b7 LOS OLIVOS</small>
      </div>
    </footer>
  );
}

// ─── CARTA PAGE ────────────────────────────────────────
function CartaPage({ navigate, cart }) {
  const [activeCat, setActiveCat] = useState(0);
  const cartaRef = useRef(null);
  const [pulseIds, setPulseIds] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cardClick = useCallback((itemId) => {
    const ts = Date.now();
    setPulseIds(prev => ({ ...prev, [itemId]: ts }));
    setTimeout(() => {
      setPulseIds(prev => {
        if (prev[itemId] === ts) {
          const next = { ...prev };
          delete next[itemId];
          return next;
        }
        return prev;
      });
    }, 500);
  }, []);

  const cat = cartaCategories[activeCat];

  const inCart = (itemName, catName) => {
    const id = `${itemName}-${catName}`;
    return cart.items.find(i => i.id === id);
  };

  return (
    <div className="carta-page" ref={cartaRef}>
      {/* HERO */}
      <section className="carta-hero">
        <div className="carta-hero-bg">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=90" alt="Ambiente del restaurante" />
          <div className="carta-hero-overlay" />
        </div>
        <div className="wrap carta-hero-content">
          <div className="carta-hero-text">
            <Eyebrow>Nuestra Carta</Eyebrow>
            <h1>Sabores que<br /><em>se cantan.</em></h1>
            <p>Pollo a la brasa, parrillas, piqueos y c\u00f3cteles preparados para una noche inolvidable. Cada plato tiene su historia y su escenario.</p>
            <div className="carta-hero-actions">
              <a className="button button-red" href={`${WA}?text=Hola%20Charol,%20quiero%20hacer%20un%20pedido.`} target="_blank" rel="noreferrer">
                Pedir por WhatsApp <Icon name="whatsapp" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="carta-layout">
        <aside className="carta-tabs-section">
          <div className="carta-tabs-inner">
            {cartaCategories.map((cat, i) => (
              <button
                key={cat.name}
                className={`carta-tab ${i === activeCat ? 'active' : ''}`}
                onClick={() => setActiveCat(i)}
              >
                <span className="carta-tab-name">{cat.name}</span>
                <span className="carta-tab-tag">{cat.tag}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="carta-category-section">
          <div className="wrap">
            <div className="carta-category-header reveal">
              <div className="carta-category-image">
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="carta-category-info">
                <Eyebrow>{cat.tag}</Eyebrow>
                <h2>{cat.name}</h2>
                <p>Selecciona tus platos y agrega al carrito. Luego env\u00edanos tu pedido por WhatsApp.</p>
              </div>
            </div>

            <div className="carta-items-grid">
              {cat.items.map((item, i) => {
                const ci = inCart(item.name, cat.name);
                const itemId = `${item.name}-${cat.name}`;
                return (
                  <div
                    className={`carta-item-card reveal ${ci ? 'in-cart' : ''} ${pulseIds[itemId] ? 'carta-pulse' : ''}`}
                    key={item.name}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (ci) {
                        cart.updateQuantity(itemId, 1);
                      } else {
                        cart.addItem(item, cat.name);
                      }
                      cardClick(itemId);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.currentTarget.click();
                      }
                    }}
                  >
                    {ci && <span className="carta-card-badge" key={`b-${itemId}-${ci.quantity}`}>{ci.quantity}</span>}
                    <div className="carta-item-header">
                      <h3>{item.name}</h3>
                      <span className="carta-item-price">{item.price}</span>
                    </div>
                    <p className="carta-item-desc">{item.desc}</p>
                    <div className="carta-item-actions" onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()}>
                      <div className="carta-qty-control">
                        {ci ? (
                          <>
                            <button className="carta-qty-btn" onClick={() => cart.updateQuantity(itemId, -1)} aria-label="Quitar uno">−</button>
                            <span className="carta-qty-num">{ci.quantity}</span>
                            <button className="carta-qty-btn" onClick={() => cart.updateQuantity(itemId, 1)} aria-label="Agregar uno">+</button>
                          </>
                        ) : (
                          <button className="carta-add-btn" onClick={() => cart.addItem(item, cat.name)}>
                            <Icon name="check" size={14} /> Agregar
                          </button>
                        )}
                      </div>
                      <a
                        className="carta-item-whatsapp"
                        href={`${WA}?text=${encodeURIComponent(`Hola Charol, quiero pedir: ${item.name} (${cat.name}).`)}`}
                        target="_blank" rel="noreferrer"
                        title="Pedir directo por WhatsApp"
                        onClick={e => e.stopPropagation()}
                        onKeyDown={e => e.stopPropagation()}
                      >
                        <Icon name="whatsapp" size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <div className="carta-dots">
        {cartaCategories.map((_, i) => (
          <button key={i} className={`carta-dot ${i === activeCat ? 'active' : ''}`} onClick={() => setActiveCat(i)} aria-label={`Ir a ${cartaCategories[i].name}`} />
        ))}
      </div>

      {/* FLOATING CART */}
      {cart.totalItems > 0 && (
        <button className="cart-float" onClick={() => navigate('/cart')} aria-label="Ver carrito">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span className="cart-float-badge">{cart.totalItems}</span>
          <span className="cart-float-total">S/ {cart.totalPrice.toFixed(2)}</span>
        </button>
      )}

      <Footer navigate={navigate} />
      <a className="whatsapp-float" href={WA} target="_blank" rel="noreferrer" aria-label="Pedir por WhatsApp">
        <Icon name="whatsapp" size={25} /><span>Pide aquí</span>
      </a>
    </div>
  );
}

// ─── CATEGORY IMAGES (for cart thumbnails) ──────────────
const categoryImages = {
  'Pollo a la Brasa': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=200&q=80',
  'Parrillas': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
  'Piqueos': 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=200&q=80',
  'Ensaladas': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&q=80',
  'C\u00f3cteles & Jarras': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=200&q=80',
  'Bebidas': 'https://images.unsplash.com/photo-1544252890-c3e95e867389?auto=format&fit=crop&w=200&q=80',
  'Postres': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=200&q=80'
};

function getItemImage(category) {
  return categoryImages[category] || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=200&q=80';
}

// ─── CART PAGE ──────────────────────────────────────────
function CartPage({ navigate, cart }) {
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapSelectedAddress, setMapSelectedAddress] = useState('');
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [mapSearchResults, setMapSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const leafletMarkerRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Modal open/close + keyboard + map lifecycle
  useEffect(() => {
    if (!showMapModal) {
      // Clean up Leaflet when modal closes so it re-inits on next open
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        leafletMarkerRef.current = null;
      }
      return;
    }

    document.body.style.overflow = 'hidden';
    const escHandler = e => e.key === 'Escape' && closeMapModal();
    window.addEventListener('keydown', escHandler);

    const timer = setTimeout(() => {
      if (!mapRef.current) return;

      // Fix Leaflet default icon paths
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current, {
        center: [-11.9544, -77.0580], // Los Olivos, Lima
        zoom: 14,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      map.on('click', async (e) => {
        const { lat, lng } = e.latlng;

        if (leafletMarkerRef.current) {
          leafletMarkerRef.current.setLatLng([lat, lng]);
        } else {
          leafletMarkerRef.current = L.marker([lat, lng]).addTo(map);
        }

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=es`
          );
          const data = await res.json();
          const addr = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          setMapSelectedAddress(addr);
          setMapSearchQuery(addr);
        } catch {
          const fallback = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          setMapSelectedAddress(fallback);
          setMapSearchQuery(fallback);
        }
      });

      leafletMapRef.current = map;
      requestAnimationFrame(() => map.invalidateSize());
    }, 200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', escHandler);
    };
  }, [showMapModal]);

  const closeMapModal = useCallback(() => {
    setShowMapModal(false);
    setMapSelectedAddress('');
    setMapSearchQuery('');
    setMapSearchResults([]);
  }, []);

  // Search address via Nominatim
  const handleMapSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setMapSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&accept-language=es&countrycodes=pe`
      );
      const data = await res.json();
      setMapSearchResults(data);
    } catch {
      setMapSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  const searchDebounce = useRef(null);
  const onSearchChange = useCallback((e) => {
    const val = e.target.value;
    setMapSearchQuery(val);
    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => handleMapSearch(val), 400);
  }, [handleMapSearch]);

  const goToLocation = useCallback((lat, lon, displayName) => {
    if (!leafletMapRef.current) return;
    const map = leafletMapRef.current;
    map.setView([lat, lon], 16);

    if (leafletMarkerRef.current) {
      leafletMarkerRef.current.setLatLng([lat, lon]);
    } else {
      leafletMarkerRef.current = L.marker([lat, lon]).addTo(map);
    }

    setMapSelectedAddress(displayName);
    setMapSearchQuery(displayName);
    setMapSearchResults([]);
  }, []);

  const confirmAddress = useCallback(() => {
    if (mapSelectedAddress) {
      setDeliveryAddress(mapSelectedAddress);
      closeMapModal();
    }
  }, [mapSelectedAddress, closeMapModal]);

  const discount = couponApplied ? cart.totalPrice * 0.1 : 0;
  const finalTotal = cart.totalPrice - discount;

  const sendWhatsApp = () => {
    const lines = cart.items.map(i =>
      `${i.quantity}x ${i.name} (${i.category}) - ${i.priceLabel}`
    );
    const msg = [
      'Hola Charol, quiero hacer un pedido:',
      ...lines,
      '',
      ...(deliveryAddress ? [`Direcci\u00f3n de entrega: ${deliveryAddress}`] : []),
      '',
      `Subtotal: S/ ${cart.totalPrice.toFixed(2)}`,
      ...(couponApplied ? [`Descuento (10%): -S/ ${discount.toFixed(2)}`] : []),
      `Total: S/ ${finalTotal.toFixed(2)}`
    ].join('\n');
    window.open(`${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="cart-page">

      <div className="cart-wrap">
        <button className="cart-back" onClick={() => navigate('/')}>
          <Icon name="arrow" size={16} /> Volver al Inicio
        </button>

        <h1 className="cart-title">Carrito de compras</h1>

        {cart.items.length === 0 ? (
          <div className="cart-empty">
            <p>No tienes productos en tu carrito.</p>
            <button className="cart-empty-btn" onClick={() => navigate('/carta')}>
              Ver carta
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            {/* LEFT — Product list */}
            <div className="cart-items">
              {cart.items.map(item => (
                <div className="cart-card" key={item.id}>
                  <div className="cart-card-img">
                    <img src={getItemImage(item.category)} alt={item.name} loading="lazy" />
                  </div>
                  <div className="cart-card-body">
                    <div className="cart-card-top">
                      <div className="cart-card-info">
                        <h3>{item.name}</h3>
                        <p className="cart-card-desc">{item.category} — desde {item.priceLabel}</p>
                      </div>
                      <span className="cart-card-price">S/ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="cart-card-actions">
                      <div className="cart-qty">
                        <button className="cart-qty-btn" onClick={() => cart.updateQuantity(item.id, -1)} aria-label="Disminuir cantidad">−</button>
                        <span className="cart-qty-num">{item.quantity}</span>
                        <button className="cart-qty-btn" onClick={() => cart.updateQuantity(item.id, 1)} aria-label="Aumentar cantidad">+</button>
                      </div>
                      {editId === item.id ? (
                        <span className="cart-edit-confirm">
                          <button className="cart-edit-yes" onClick={() => { cart.removeItem(item.id); setEditId(null); }}>Eliminar</button>
                          <button className="cart-edit-no" onClick={() => setEditId(null)}>Cancelar</button>
                        </span>
                      ) : (
                        <button className="cart-edit-btn" onClick={() => setEditId(item.id)}>Editar</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — Order summary panel */}
            <aside className="cart-summary">
              <div className="cart-summary-sticky">
                <h2 className="cart-summary-title">Resumen del pedido</h2>

                <div className="cart-summary-block">
                  <h3 className="cart-summary-block-title">Direcci\u00f3n de entrega</h3>
                  <button className="cart-address-picker" onClick={() => setShowMapModal(true)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span>{deliveryAddress || 'Seleccionar direcci\u00f3n en el mapa'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                  {deliveryAddress && (
                    <div className="cart-address-result">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{deliveryAddress}</span>
                    </div>
                  )}
                </div>

                <div className="cart-summary-block">
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <strong>S/ {cart.totalPrice.toFixed(2)}</strong>
                  </div>
                  {couponApplied && (
                    <div className="cart-summary-row cart-summary-discount">
                      <span>Descuento (10%)</span>
                      <strong>-S/ {discount.toFixed(2)}</strong>
                    </div>
                  )}
                </div>

                <div className="cart-coupon">
                  <div className="cart-coupon-input-wrap">
                    <svg className="cart-coupon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 12v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
                      <path d="M16 6h2a2 2 0 0 1 2 2v2M4 10V8a2 2 0 0 1 2-2h2" />
                    </svg>
                    <input
                      className="cart-coupon-input"
                      type="text"
                      placeholder="Codigo de cupon"
                      value={coupon}
                      onChange={e => setCoupon(e.target.value)}
                      disabled={couponApplied}
                    />
                  </div>
                  {couponApplied ? (
                    <span className="cart-coupon-applied">Aplicado</span>
                  ) : (
                    <button
                      className="cart-coupon-btn"
                      onClick={() => coupon && setCouponApplied(true)}
                      disabled={!coupon}
                    >
                      Aplicar
                    </button>
                  )}
                </div>

                <div className="cart-summary-total">
                  <span>Total</span>
                  <strong>S/ {finalTotal.toFixed(2)}</strong>
                </div>

                <button className="cart-continue-btn" onClick={sendWhatsApp}>
                  <Icon name="whatsapp" size={18} /> Continuar Pedido
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
      {/* MAP MODAL with Leaflet + Nominatim */}
      {showMapModal && (
        <div className="modal-overlay" onClick={closeMapModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Seleccionar direcci\u00f3n de entrega</h3>
              <button className="modal-close" onClick={closeMapModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="modal-map-container">
              {/* Search input */}
              <div className="modal-map-search-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  className="modal-map-search-input"
                  type="text"
                  placeholder="Buscar direcci\u00f3n..."
                  value={mapSearchQuery}
                  onChange={onSearchChange}
                />
                {searching && <span className="modal-map-searching" />}
                {mapSearchQuery && !searching && (
                  <button className="modal-map-clear" onClick={() => { setMapSearchQuery(''); setMapSearchResults([]); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Search results dropdown */}
              {mapSearchResults.length > 0 && (
                <div className="modal-map-results">
                  {mapSearchResults.map((r, i) => (
                    <button
                      className="modal-map-result-item"
                      key={i}
                      onClick={() => goToLocation(parseFloat(r.lat), parseFloat(r.lon), r.display_name)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      <div className="modal-map-result-text">
                        <strong>{r.display_name.split(',')[0]}</strong>
                        <span>{r.display_name.split(',').slice(1).join(',')}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Leaflet map */}
              <div ref={mapRef} className="modal-map" />

              {/* Selected address bar */}
              <div className="modal-map-info">
                {mapSelectedAddress ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="modal-map-info-text">{mapSelectedAddress}</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                    <span className="modal-map-info-hint">Haz clic en el mapa para seleccionar tu ubicaci\u00f3n</span>
                  </>
                )}
              </div>
            </div>

            {mapSelectedAddress && (
              <div className="modal-confirm">
                <button className="modal-confirm-btn" onClick={confirmAddress}>
                  Confirmar direcci\u00f3n
                </button>
                <button className="modal-cancel-btn" onClick={closeMapModal}>
                  Cancelar
                </button>
              </div>
            )}

            {!mapSelectedAddress && (
              <button className="modal-cancel-btn" onClick={closeMapModal}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────
export default function App() {
  const { page, navigate } = useRouter();
  const cart = useCart();
  const root = useRef(null);

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
      gsap.to('.marquee-track', { xPercent: -50, duration: 24, repeat: -1, ease: 'none' });
      gsap.to('.menu-track', { xPercent: -50, duration: 45, repeat: -1, ease: 'none' });
      gsap.to('.round-stamp', { rotation: 360, duration: 18, repeat: -1, ease: 'none' });
      const images = gsap.utils.toArray('img');
      const refresh = () => ScrollTrigger.refresh();
      images.forEach(image => { if (!image.complete) image.addEventListener('load', refresh, { once: true }); });
      return () => { images.forEach(image => image.removeEventListener('load', refresh)); };
    }, root);
    return () => ctx.revert();
  }, [page]);

  if (page === 'carta') {
    return <CartaPage navigate={navigate} cart={cart} />;
  }
  if (page === 'cart') {
    return <CartPage navigate={navigate} cart={cart} />;
  }

  return (
    <main ref={root}>
      <Navbar navigate={navigate} page={page} />
      <Hero navigate={navigate} />
      <Marquee />
      <MenuSection navigate={navigate} />
      <Pedidos />
      <Experience />
      <Event />
      <Celebrations />
      <Location />
      <Reservation />
      <Footer navigate={navigate} />
      <a className="whatsapp-float" href={WA} target="_blank" rel="noreferrer" aria-label="Reservar por WhatsApp">
        <Icon name="whatsapp" size={25} /><span>Reserva aqu\u00ed</span>
      </a>
    </main>
  );
}
