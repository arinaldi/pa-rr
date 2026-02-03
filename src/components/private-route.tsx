import { Navigate, Outlet } from 'react-router';

import { useSession } from '@/components/session-provider';

export function PrivateRoute() {
  const session = useSession();

  if (!session) {
    return <Navigate to="/not-found" />;
  }

  return <Outlet />;
}
