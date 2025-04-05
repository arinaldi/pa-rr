import { useLoaderData } from 'react-router';
import useSWR from 'swr';

import { ROUTE_HREF } from '@/lib/constants';
import {
  getAllTimeRankings,
  getArtists,
  getFavorites,
  getReleases,
  getSongs,
} from '@/supabase/data';

export function useAllTimeRankings() {
  const fallbackData = useLoaderData<typeof getAllTimeRankings>();

  return useSWR(ROUTE_HREF.ALL_TIME, getAllTimeRankings, {
    fallbackData,
  });
}

export function useArtists() {
  const fallbackData = useLoaderData<typeof getArtists>();

  return useSWR(ROUTE_HREF.ARTISTS, getArtists, {
    fallbackData,
  });
}

export function useFeaturedSongs() {
  const fallbackData = useLoaderData<typeof getSongs>();

  return useSWR(ROUTE_HREF.FEATURED_SONGS, getSongs, {
    fallbackData,
  });
}

export function useNewReleases() {
  const fallbackData = useLoaderData<typeof getReleases>();

  return useSWR(ROUTE_HREF.NEW_RELEASES, getReleases, {
    fallbackData,
  });
}

export function useTopAlbums() {
  const fallbackData = useLoaderData<typeof getFavorites>();

  return useSWR(ROUTE_HREF.TOP_ALBUMS, getFavorites, {
    fallbackData,
  });
}
