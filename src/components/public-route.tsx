import { Navigate, Outlet } from 'react-router';

import { useSession } from '@/components/session-provider';
import { ROUTES_ADMIN } from '@/lib/constants';

export function PublicRoute() {
  const session = useSession();

  if (session) {
    return <Navigate to={ROUTES_ADMIN.base.href} />;
  }

  return <Outlet />;
}
