import { useNavigate, useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { albumSchema, type AlbumInput } from './schema';
import AlbumForm from './album-form';

export default function AddAlbum() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const form = useForm<AlbumInput>({
    defaultValues: {
      artist: '',
      title: '',
      year: new Date().getFullYear(),
      studio: false,
      cd: false,
      favorite: false,
    },
    resolver: zodResolver(albumSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [
      () => navigate(`${ROUTES_ADMIN.base.href}?${searchParams.toString()}`),
    ],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ year, ...rest }: AlbumInput) => {
      const { error } = await supabase.from('albums').insert({
        ...rest,
        year: year.toString(),
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} added`,
  });

  return (
    <div className="max-w-sm">
      <AlbumForm form={form} onSubmit={onSubmit} submitting={submitting} />
    </div>
  );
}
