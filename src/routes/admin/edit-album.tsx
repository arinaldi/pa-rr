import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { getAlbum } from '@/supabase/data';
import AlbumForm from './album-form';
import { albumSchema, type AlbumInput } from './schema';
import DeleteAlbumModal from './delete-album-modal';

export default function EditAlbum() {
  const { album } = useLoaderData<typeof getAlbum>();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const form = useForm<AlbumInput>({
    defaultValues: {
      artist: album.artist,
      title: album.title,
      year: Number(album.year),
      studio: album.studio,
      cd: album.cd,
      wishlist: album.wishlist,
      favorite: album.favorite,
    },
    resolver: standardSchemaResolver(albumSchema),
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

      if (album.favorite && !rest.favorite) {
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
      <DeleteAlbumModal album={album} className="mt-2 w-full sm:w-auto" />
    </div>
  );
}
