import { useCallback, useEffect, useState } from 'react';

export function useRouter() {
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
