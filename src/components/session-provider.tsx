import {
  createContext,
  use,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { useNavigate } from 'react-router';
import { type Session } from '@supabase/supabase-js';

import { Fallback } from '@/components/fallback';
import { supabase } from '@/supabase/client';

interface Context {
  session: Session | null;
}

const SessionContext = createContext<Context>({ session: null });

export function useSession() {
  const context = use(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context.session;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
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
  }, [navigate]);

  return (
    <SessionContext value={{ session }}>
      {loading ? <Fallback /> : children}
    </SessionContext>
  );
}
