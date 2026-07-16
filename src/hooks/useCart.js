import { useCallback, useState } from 'react';
import { parsePrice } from '../utils/pricing';

export function useCart() {
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

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, totalItems, totalPrice };
}
