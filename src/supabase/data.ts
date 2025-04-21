import { type LoaderFunctionArgs } from 'react-router';

import {
  type AllTimeListItem,
  formatFavorites,
  formatRankingsAllTime,
  formatRankingsByYear,
  formatReleases,
  formatSongs,
} from '@/lib/formatters';
import { supabase } from '@/supabase/client';
import { MESSAGES, SORT_DIRECTION } from '@/lib/constants';
import { parseAdminQuery } from '@/lib/utils';

const { ASC, DESC } = SORT_DIRECTION;

export async function getAlbum({ params }: LoaderFunctionArgs<any>) {
  if (!params.id) {
    throw new Error(MESSAGES.NO_DATA);
  }

  const { data: album, error } = await supabase
    .from('albums')
    .select('*')
    .eq('id', parseInt(params.id, 10))
    .single();

  if (error) throw new Error(error.message);

  return { album };
}

async function getAlbums({ request }: LoaderFunctionArgs<any>) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const searchParams = Object.fromEntries(params.entries());
  const { artist, cd, page, perPage, sort, studio, title } =
    parseAdminQuery(searchParams);
  const [sortProp, desc] = sort.split(':') ?? [];
  const direction = desc ? DESC : ASC;
  const start = (page - 1) * perPage;
  const end = page * perPage - 1;

  let query = supabase
    .from('albums')
    .select('*', { count: 'exact' })
    .ilike('artist', `%${artist}%`)
    .ilike('title', `%${title}%`)
    .range(start, end);

  if (cd) {
    query = query.eq('cd', cd === 'true');
  }

  if (studio) {
    query = query.eq('studio', studio === 'true');
  }

  if (sortProp) {
    query = query.order(sortProp, { ascending: direction === ASC });
  } else {
    query = query
      .order('artist', { ascending: true })
      .order('title', { ascending: true });
  }

  if (sortProp === 'artist') {
    query = query.order('title', { ascending: true });
  } else {
    query = query.order('artist', { ascending: direction === ASC });
  }

  const { count, data: albums, error } = await query;

  if (error) throw new Error(error.message);

  return {
    albums,
    count: count ?? 0,
  };
}

async function getCdCount({ request }: LoaderFunctionArgs<any>) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const searchParams = Object.fromEntries(params.entries());
  const { artist, cd, studio, title } = parseAdminQuery(searchParams);
  let query = supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true)
    .ilike('artist', `%${artist}%`)
    .ilike('title', `%${title}%`);

  if (cd) {
    query = query.eq('cd', cd === 'true');
  }

  if (studio) {
    query = query.eq('studio', studio === 'true');
  }

  const { count, error } = await query;

  if (error) throw new Error(error.message);

  return count ?? 0;
}

export async function getAdminData(args: LoaderFunctionArgs<any>) {
  const [{ albums, count }, cdCount] = await Promise.all([
    getAlbums(args),
    getCdCount(args),
  ]);

  return {
    albums,
    cdCount,
    count,
  };
}

export async function getAllTimeRankings() {
  const { data, error } = await supabase
    .from('rankings')
    .select(
      `
            all_time_position,
            id,
            position,
            album:albums (
              artist,
              id,
              title,
              year
            )
          `,
    )
    .gte('all_time_position', 1)
    .order('all_time_position', { ascending: true });

  if (error) throw new Error(error.message);

  return {
    count: data.length,
    favorites: formatRankingsAllTime(data),
  };
}

export async function getCandidates({ request }: LoaderFunctionArgs<any>) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const searchParams = Object.fromEntries(params.entries());
  const { sort, title } = parseAdminQuery(searchParams);
  const [sortProp, desc] = sort.split(':') ?? [];
  const direction = desc ? DESC : ASC;
  let candidates: AllTimeListItem[] = [];

  if (title) {
    let query = supabase
      .from('albums')
      .select(
        `
          artist,
          id,
          title,
          year,
          ranking:rankings!inner(
            all_time_position,
            id,
            position
          )
        `,
      )
      .gte('rankings.position', 1)
      .ilike('title', `%${title}%`)
      .range(0, 24)
      .order('artist', { ascending: direction === ASC });

    if (sortProp) {
      query = query.order(sortProp, { ascending: direction === ASC });
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    candidates = formatRankingsByYear(data);
  }

  return { candidates };
}

export async function getAllTimeData(args: LoaderFunctionArgs<any>) {
  const [{ favorites }, { candidates }] = await Promise.all([
    getAllTimeRankings(),
    getCandidates(args),
  ]);

  return {
    candidates,
    count: favorites.length,
    favorites,
  };
}

interface Artist {
  artist: string;
}

export async function getArtists() {
  const { data, error } = await supabase.rpc('get_artists');

  if (error) throw new Error(error.message);

  const artists = data as unknown as Artist[];

  return {
    artists: artists.map((a) => a.artist),
    count: artists.length,
  };
}

export async function getFavorites() {
  const { data, error } = await supabase
    .from('albums')
    .select(
      `
        artist,
        artist_title,
        cd,
        created_at,
        favorite,
        id,
        studio,
        title,
        year,
        ranking:rankings (
          position
      )
      `,
    )
    .eq('favorite', true)
    .order('artist', { ascending: true });

  if (error) throw new Error(error.message);

  return {
    count: data.length,
    favorites: formatFavorites(data),
  };
}

export async function getRankingsByYear(year: string) {
  const { data, error } = await supabase
    .from('albums')
    .select(
      `
      artist,
      id,
      title,
      year,
      ranking:rankings (
        all_time_position,
        id,
        position
      )
    `,
    )
    .match({ favorite: true, year });

  if (error) throw new Error(error.message);

  return {
    count: data.length,
    favorites: formatRankingsByYear(data),
  };
}

export async function getReleases() {
  const { data, error } = await supabase
    .from('releases')
    .select('*')
    .order('artist');

  if (error) throw new Error(error.message);

  return {
    count: data.length,
    releases: formatReleases(data),
  };
}

export async function getSongs() {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('artist');

  if (error) throw new Error(error.message);

  return {
    count: data.length,
    songs: formatSongs(data),
  };
}
