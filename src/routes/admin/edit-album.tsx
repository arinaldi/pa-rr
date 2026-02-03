import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAlbum } from '@/hooks/use-data';
import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import AlbumForm from './album-form';
import { albumSchema, type AlbumInput } from './schema';
import DeleteAlbumModal from './delete-album-modal';

export default function EditAlbum() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { data } = useAlbum(params.id);
  const form = useForm({
    values: {
      artist: data?.album.artist ?? '',
      title: data?.album.title ?? '',
      year: Number(data?.album.year),
      studio: data?.album.studio ?? false,
      cd: data?.album.cd ?? false,
      wishlist: data?.album.wishlist ?? false,
      favorite: data?.album.favorite ?? false,
    },
    resolver: zodResolver(albumSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [
      () => navigate(`${ROUTES_ADMIN.base.href}?${searchParams.toString()}`),
    ],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ year, ...rest }: AlbumInput) => {
      if (!params.id) {
        throw new Error(MESSAGES.NO_DATA);
      }

      const id = parseInt(params.id, 10);

      if (data?.album.favorite && !rest.favorite) {
        const { data: ranking, error: rankingError } = await supabase
          .from('rankings')
          .select('*')
          .eq('album_id', id)
          .single();

        if (rankingError) {
          throw new Error(rankingError.message);
        }

        if (ranking) {
          await supabase.from('rankings').delete().eq('id', ranking.id);
        }
      }

      const { error } = await supabase
        .from('albums')
        .update({
          ...rest,
          year: year.toString(),
        })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  });

  return (
    <div className="max-w-sm">
      <AlbumForm form={form} onSubmit={onSubmit} submitting={submitting} />
      {data?.album && (
        <DeleteAlbumModal
          album={data.album}
          className="mt-2 w-full sm:w-auto"
        />
      )}
    </div>
  );
}
