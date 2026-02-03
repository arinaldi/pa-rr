import { Navigate, Outlet } from 'react-router';

import { useSession } from '@/components/session-provider';
import { ROUTE_HREF } from '@/lib/constants';

export function PublicRoute() {
  const session = useSession();

  if (session) {
    return <Navigate to={ROUTE_HREF.TOP_ALBUMS} replace />;
  }

  return <Outlet />;
}
