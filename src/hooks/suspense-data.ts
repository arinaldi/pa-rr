import { useSuspenseQuery } from '@tanstack/react-query';

import { STALE_TIME_IN_MS } from '@/lib/constants';

interface ArtistSearch {
  results: {
    id: number;
    type: string;
    master_id: number | null;
    master_url: string | null;
    uri: string;
    title: string;
    thumb: string;
    cover_image: string;
    resource_url: string;
  }[];
}

interface ArtistReleases {
  releases: {
    id: number;
    title: string;
    type: string;
    main_release?: number;
    artist: string;
    role: string;
    resource_url: string;
    year?: number;
  }[];
}

export async function getArtistReleases(artist: string) {
  const searchRes = await fetch(
    `https://api.discogs.com/database/search?q=${encodeURIComponent(artist)}&type=artist&per_page=1`,
  );
  const searchData = (await searchRes.json()) as ArtistSearch;
  const [result] = searchData.results;

  if (!result) {
    throw new Error('Artist not found');
  }

  const releasesRes = await fetch(
    `${result.resource_url}/releases?sort=year&sort_order=desc`,
  );
  const releasesData = (await releasesRes.json()) as ArtistReleases;

  return releasesData.releases;
}

export function useArtistReleases(artist: string) {
  return useSuspenseQuery({
    queryKey: ['artist-releases', artist],
    queryFn: () => getArtistReleases(artist),
    staleTime: STALE_TIME_IN_MS,
  });
}
