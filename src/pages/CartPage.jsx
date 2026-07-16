import { useCallback, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { categoryImages } from '../data/menu';
import { WA } from '../data/contact';
import { Icon } from '../components/Icon';

function getItemImage(category) {
  return categoryImages[category] || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=200&q=80';
}

export function CartPage({ navigate, cart }) {
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
