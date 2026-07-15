import { useCallback, useEffect, useRef, useState } from 'react';
import { WA } from '../data/contact';
import { cartaCategories } from '../data/menu';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';
import { Footer } from '../sections/Footer';

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
