import { Navigate, Outlet } from 'react-router';

import { useSession } from '@/components/session-provider';

export function PublicRoute() {
  const session = useSession();

  if (session) {
    return <Navigate to="/albums" replace />;
  }

  return <Outlet />;
}
