import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace('#', '');

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView();
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView();
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [hash]);

  return null;
}
