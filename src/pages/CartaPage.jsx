import { useCallback, useEffect, useRef, useState } from 'react';
import { WA } from '../data/contact';
import { cartaCategories } from '../data/menu';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';
import { Footer } from '../sections/Footer';

function getItemIcon(name) {
  const n = name.toLowerCase();
  const svgProps = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (/pollo|alitas|pecho/.test(n)) {
    // Chicken / drumstick
    return <svg {...svgProps}><path d="M17 5a4 4 0 0 0-5.66 0L7 9.34a4 4 0 0 0 0 5.66l.5.5a1 1 0 0 1 0 1.41L5 19a2 2 0 0 0 2.83 2.83l2-2a1 1 0 0 1 1.42 0l.5.5a4 4 0 0 0 5.66 0L23 13.66A4 4 0 0 0 23 8l-1.17-1.17a3 3 0 0 0-4.24 0L14 10.34" /></svg>;
  }
  if (/parrilla|lomo|bisteck|anticucho/.test(n)) {
    // Meat / steak
    return <svg {...svgProps}><path d="M12 2C8 2 4 5 4 9c0 2.5 1.5 4.5 3 6s2 3 2 5c0 .5.5 1 1 1h4c.5 0 1-.5 1-1 0-2 1-3.5 2.5-5s2.5-3.5 2.5-6c0-4-3-7-8-7z" /><path d="M9 7c-1 1-1 3 0 4" /></svg>;
  }
  if (/tequeño|ceviche|causa|chicharrón|nachos|salchipapa/.test(n)) {
    // Snack / fries
    return <svg {...svgProps}><path d="M4 8h16" /><path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" /><path d="M9 4V2" /><path d="M12 4V2" /><path d="M15 4V2" /></svg>;
  }
  if (/ensalada/.test(n)) {
    // Salad / leaf
    return <svg {...svgProps}><path d="M12 22c-2.5 0-4.5-1.5-6-3.5C4.5 16.5 3 14 3 12c0-3 2-6 6-5 .5.5 1 1.5 1 3" /><path d="M12 22c2.5 0 4.5-1.5 6-3.5S21 14 21 12c0-3-2-6-6-5-.5.5-1 1.5-1 3" /><path d="M12 9V3" /><path d="M10 5l2 2 2-2" /></svg>;
  }
  if (/sour|cuba\s*libre|jarra|cóctel|chilcano/.test(n)) {
    // Cocktail / glass
    return <svg {...svgProps}><path d="M6 2h12l-4 8v8" /><path d="M10 18h4" /><path d="M8 2v2c0 2 2 3 4 3s4-1 4-3V2" /></svg>;
  }
  if (/chicha|limonada|maracuyá|gaseosa|agua|cerveza/.test(n)) {
    // Drink / bottle
    return <svg {...svgProps}><path d="M8 2h8v3a4 4 0 0 1-2 3.46V22H8V8.46A4 4 0 0 1 6 5V2z" /></svg>;
  }
  // Dessert — default for postres category
  return <svg {...svgProps}><path d="M12 3c-3 0-5 1.5-5 4 0 2 1.5 3 3 4s1 2.5 1 4" /><path d="M12 3c3 0 5 1.5 5 4 0 2-1.5 3-3 4s-1 2.5-1 4" /><path d="M7 17h10" /><path d="M9 21h6" /></svg>;
}

export function CartaPage({ navigate, cart }) {
  const [activeCat, setActiveCat] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    return cat ? Math.min(Math.max(parseInt(cat, 10), 0), cartaCategories.length - 1) : 0;
  });
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
      <div className="carta-layout">
        <aside className="carta-tabs-section">
          <div className="carta-tabs-inner">
            {cartaCategories.map((cat, i) => (
              <button
                key={cat.name}
                className={`carta-tab ${i === activeCat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCat(i);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onMouseEnter={() => {
                  if (i !== activeCat) {
                    setActiveCat(i);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
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
                <h3>{cat.name}</h3>
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
                      <span className="carta-item-icon">{getItemIcon(item.name)}</span>
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
