interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: Record<string, string>;
}

interface ArtistSearch {
  pagination: Pagination;
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

export async function searchArtist(artist: string) {
  const searchRes = await fetch(
    `https://api.discogs.com/database/search?q=${encodeURIComponent(artist)}&type=artist&per_page=1`,
  );
  const searchData = (await searchRes.json()) as ArtistSearch;
  const [result] = searchData.results;

  if (!result) {
    throw new Error('Artist not found');
  }

  return result.resource_url;
}

export interface ArtistReleases {
  pagination: Pagination;
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

export async function getReleases(resourceUrl: string) {
  const releasesRes = await fetch(
    `${resourceUrl}/releases?sort=year&sort_order=desc`,
  );
  const releasesData = (await releasesRes.json()) as ArtistReleases;

  return releasesData.releases;
}
