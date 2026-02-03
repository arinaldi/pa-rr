import { useEffect } from 'react';
import useSWR from 'swr';

import { useCountActions } from '@/hooks/use-count';
import { ROUTE_HREF, ROUTES_ADMIN } from '@/lib/constants';
import type { AdminParams } from '@/lib/utils';
import {
  getAdminData,
  getAlbum,
  getAllTimeData,
  getAllTimeRankings,
  getArtists,
  getFavorites,
  getRankingsByYear,
  getReleases,
  getSongs,
} from '@/supabase/data';

export function useAdminData(adminParams: AdminParams) {
  const result = useSWR(
    [ROUTES_ADMIN.base.href, adminParams],
    () => getAdminData(adminParams),
    { keepPreviousData: true },
  );
  useSetCount(result.data?.count);

  return result;
}

export function useAlbum(id: string | undefined) {
  return useSWR(id ? ROUTES_ADMIN.edit.href.replace(':id', id) : null, () =>
    getAlbum(id),
  );
}

export function useAllTimeData(adminParams: AdminParams) {
  const result = useSWR([ROUTE_HREF.ALL_TIME_EDIT, adminParams], () =>
    getAllTimeData(adminParams),
  );
  useSetCount(result.data?.count);

  return result;
}

export function useAllTimeRankings() {
  const result = useSWR(ROUTE_HREF.ALL_TIME, getAllTimeRankings);
  useSetCount(result.data?.count);

  return result;
}

export function useArtists() {
  const result = useSWR(ROUTE_HREF.ARTISTS, getArtists);
  useSetCount(result.data?.count);

  return result;
}

export function useFeaturedSongs() {
  const result = useSWR(ROUTE_HREF.FEATURED_SONGS, getSongs);
  useSetCount(result.data?.count);

  return result;
}

export function useNewReleases() {
  const result = useSWR(ROUTE_HREF.NEW_RELEASES, getReleases);
  useSetCount(result.data?.count);

  return result;
}

export function useRankingsByYear(year: string) {
  const result = useSWR(year, () => getRankingsByYear(year));
  useSetCount(result.data?.count);

  return result;
}

export function useTopAlbums() {
  const result = useSWR(ROUTE_HREF.TOP_ALBUMS, getFavorites);
  useSetCount(result.data?.count);

  return result;
}

function useSetCount(count: number | undefined) {
  const { setCount } = useCountActions();

  useEffect(() => {
    if (count) {
      setCount(count);
    }
  }, [count, setCount]);

  return null;
}
