import { useLoaderData } from 'react-router';
import useSWR from 'swr';

import { ROUTE_HREF } from '@/lib/constants';
import { getReleases } from '@/supabase/data';

export function useNewReleases() {
  const fallbackData = useLoaderData<typeof getReleases>();

  return useSWR(ROUTE_HREF.NEW_RELEASES, getReleases, {
    fallbackData,
  });
}
