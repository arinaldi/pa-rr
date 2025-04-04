import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { APP_NAME } from '@/lib/constants';

export function usePageTitle(title = '') {
  const location = useLocation();

  useEffect(() => {
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
  }, [location, title]);

  return null;
}
