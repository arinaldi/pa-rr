import { useEffect } from 'react';
import { keepPreviousData, skipToken, useQuery } from '@tanstack/react-query';

import type { AdminParams } from '@/hooks/admin-params';
import { useCountActions } from '@/hooks/count';
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
  const result = useQuery({
    queryKey: ['admin', adminParams],
    queryFn: () => getAdminData(adminParams),
    placeholderData: keepPreviousData,
  });
  useSetCount(result.data?.count);

  return result;
}

export function useAlbum(id: string | undefined) {
  return useQuery({
    queryKey: ['admin', 'album', id],
    queryFn: id ? () => getAlbum(id) : skipToken,
  });
}

export function useAllTimeData(search: string) {
  const result = useQuery({
    queryKey: ['all-time-edit', search],
    queryFn: () => getAllTimeData(search),
    placeholderData: keepPreviousData,
  });
  useSetCount(result.data?.count);

  return result;
}

export function useAllTimeRankings() {
  const result = useQuery({
    queryKey: ['all-time-rankings'],
    queryFn: getAllTimeRankings,
  });
  useSetCount(result.data?.count);

  return result;
}

export function useArtists() {
  const result = useQuery({
    queryKey: ['artists'],
    queryFn: getArtists,
  });
  useSetCount(result.data?.count);

  return result;
}

export function useFeaturedSongs() {
  const result = useQuery({
    queryKey: ['featured-songs'],
    queryFn: getSongs,
  });
  useSetCount(result.data?.count);

  return result;
}

export function useNewReleases() {
  const result = useQuery({
    queryKey: ['new-releases'],
    queryFn: getReleases,
  });
  useSetCount(result.data?.count);

  return result;
}

export function useRankingsByYear(year: string | undefined) {
  const result = useQuery({
    queryKey: ['rankings-by-year', year],
    queryFn: year ? () => getRankingsByYear(year) : skipToken,
  });
  useSetCount(result.data?.count);

  return result;
}

export function useTopAlbums() {
  const result = useQuery({
    queryKey: ['top-albums'],
    queryFn: getFavorites,
  });
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
