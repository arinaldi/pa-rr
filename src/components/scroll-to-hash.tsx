import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));

      if (!element) return;

      element.scrollIntoView();
    }
  }, [hash]);

  return null;
}
