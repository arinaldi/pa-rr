import { formatFavorites } from '@/lib/utils';
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
