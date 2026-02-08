import { useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import SubmitButton from '@/components/submit-button';
import { useSerializedParams } from '@/hooks/admin-params';
import { MESSAGE, ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { albumSchema, type AlbumInput } from './schema';
import AlbumForm from './album-form';

export default function AddAlbum() {
  const navigate = useNavigate();
  const serializedParams = useSerializedParams();
  const form = useForm({
    defaultValues: {
      artist: '',
      title: '',
      year: new Date().getFullYear(),
      studio: false,
      cd: false,
      wishlist: false,
      favorite: false,
    },
    resolver: zodResolver(albumSchema),
  });

  const { isPending, mutate } = useMutation({
    meta: {
      successMessage: `${MESSAGE.ALBUM_PREFIX} added`,
    },
    mutationFn: async ({ year, ...rest }: AlbumInput) => {
      const { error } = await supabase.from('albums').insert({
        ...rest,
        year: year.toString(),
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      navigate(`${ROUTES_ADMIN.base.href}${serializedParams}`);
    },
  });

  return (
    <div className="max-w-sm">
      <FormProvider {...form}>
        <AlbumForm onSubmit={form.handleSubmit((data) => mutate(data))}>
          <SubmitButton className="w-full sm:w-auto" submitting={isPending}>
            Save
          </SubmitButton>
        </AlbumForm>
      </FormProvider>
    </div>
  );
}
