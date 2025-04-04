import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { supabase } from '@/supabase/client';

export default function SignoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function signOut() {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      navigate('/');
    }

    signOut();
  }, [navigate]);

  return null;
}
