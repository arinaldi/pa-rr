import {
  createContext,
  use,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { type Session } from '@supabase/supabase-js';

import { Fallback } from '@/components/fallback';
import { ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';

interface Context {
  session: Session | null;
}

const SessionContext = createContext<Context>({ session: null });

export function SessionProvider({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);

      if (data.session && pathname === '/') {
        navigate(ROUTES_ADMIN.base.href);
      }

      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line @eslint-react/exhaustive-deps
  }, []);

  return (
    <SessionContext value={{ session }}>
      {loading ? <Fallback /> : children}
    </SessionContext>
  );
}

export function useSession() {
  const context = use(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context.session;
}

export type { Session };
