import { useEffect } from 'react';
import {
  keepPreviousData,
  queryOptions,
  skipToken,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type { AdminParams } from '@/hooks/admin-params';
import { useCountActions } from '@/hooks/count';
import { PER_PAGE, QUERY_KEY, type QueryKey } from '@/lib/constants';
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

function adminOptions(adminParams: AdminParams) {
  return queryOptions({
    queryKey: [QUERY_KEY.ALBUMS, adminParams],
    queryFn: () => getAdminData(adminParams),
    placeholderData: keepPreviousData,
  });
}

function allTimeRankingOptions() {
  return queryOptions({
    queryKey: [QUERY_KEY.ALL_TIME],
    queryFn: getAllTimeRankings,
  });
}

function artistOptions() {
  return queryOptions({
    queryKey: [QUERY_KEY.ARTISTS],
    queryFn: getArtists,
  });
}

function releaseOptions() {
  return queryOptions({
    queryKey: [QUERY_KEY.NEW_RELEASES],
    queryFn: getReleases,
  });
}

function songOptions() {
  return queryOptions({
    queryKey: [QUERY_KEY.FEATURED_SONGS],
    queryFn: getSongs,
  });
}

function topAlbumOptions() {
  return queryOptions({
    queryKey: [QUERY_KEY.TOP_ALBUMS],
    queryFn: getFavorites,
  });
}

export const QUERY_OPTIONS: Record<
  QueryKey,
  UseQueryOptions<any, any, any, any>
> = {
  [QUERY_KEY.ALBUMS]: adminOptions({
    direction: '',
    page: 1,
    perPage: PER_PAGE.SMALL,
    search: '',
    sort: '',
    status: [],
  }),
  [QUERY_KEY.ALL_TIME]: allTimeRankingOptions(),
  [QUERY_KEY.ARTISTS]: artistOptions(),
  [QUERY_KEY.FEATURED_SONGS]: songOptions(),
  [QUERY_KEY.NEW_RELEASES]: releaseOptions(),
  [QUERY_KEY.TOP_ALBUMS]: topAlbumOptions(),
};

export function useAdminData(adminParams: AdminParams) {
  const result = useQuery(adminOptions(adminParams));
  useSetCount(result.data?.count);

  return result;
}

export function useAlbum(id: string | undefined) {
  return useQuery({
    queryKey: ['albums', id],
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
  const result = useQuery(allTimeRankingOptions());
  useSetCount(result.data?.count);

  return result;
}

export function useArtists() {
  const result = useQuery(artistOptions());
  useSetCount(result.data?.count);

  return result;
}

export function useFeaturedSongs() {
  const result = useQuery(songOptions());
  useSetCount(result.data?.count);

  return result;
}

export function useNewReleases() {
  const result = useQuery(releaseOptions());
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
  const result = useQuery(topAlbumOptions());
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
