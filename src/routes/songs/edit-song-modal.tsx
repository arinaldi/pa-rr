import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SubmitButton from '@/components/submit-button';
import { MESSAGE } from '@/lib/constants';
import type { Song } from '@/lib/types';
import { supabase } from '@/supabase/client';
import { songSchema, type SongInput } from './schema';
import SongForm from './song-form';

interface Props {
  onClose: () => void;
  song: Song;
}

export default function EditSongModal({ onClose, song }: Props) {
  const form = useForm({
    defaultValues: {
      artist: song.artist,
      title: song.title,
      link: song.link,
    },
    resolver: zodResolver(songSchema),
  });

  const { isPending, mutate } = useMutation({
    meta: {
      successMessage: `${MESSAGE.SONG_PREFIX} edited`,
    },
    mutationFn: async (input: SongInput) => {
      const { error } = await supabase
        .from('songs')
        .update(input)
        .eq('id', song.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: onClose,
  });

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Edit song</DialogTitle>
        <DialogDescription>Update data for featured song</DialogDescription>
      </DialogHeader>
      <FormProvider {...form}>
        <SongForm onSubmit={form.handleSubmit((data) => mutate(data))}>
          <DialogFooter>
            <SubmitButton className="w-full sm:w-auto" submitting={isPending}>
              Save
            </SubmitButton>
          </DialogFooter>
        </SongForm>
      </FormProvider>
    </DialogContent>
  );
}
