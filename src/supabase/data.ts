import { formatFavorites, formatReleases, formatSongs } from '@/lib/formatters';
import { supabase } from '@/supabase/client';

export async function getAlbums() {
  const { data } = await supabase
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
      `
    )
    .eq('favorite', true)
    .order('artist', { ascending: true });

  return {
    count: data?.length ?? 0,
    favorites: formatFavorites(data ?? []),
  };
}

interface Artist {
  artist: string;
}

export async function getArtists() {
  const { data } = await supabase.rpc('get_artists');
  const artists = (data as unknown as Artist[]) ?? [];

  return {
    artists: artists.map((a) => a.artist),
    count: artists.length,
  };
}

export async function getReleases() {
  const { data } = await supabase.from('releases').select('*').order('artist');

  return {
    count: data?.length ?? 0,
    releases: formatReleases(data ?? []),
  };
}

export async function getSongs() {
  const { data } = await supabase.from('songs').select('*').order('artist');

  return {
    count: data?.length ?? 0,
    songs: formatSongs(data ?? []),
  };
}
