import { FormEvent } from 'react';
import { useRevalidator } from 'react-router';

import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES } from '@/lib/constants';
import { Song } from '@/lib/types';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SubmitButton from '@/components/submit-button';
import { supabase } from '@/supabase/client';

interface Props {
  onClose: () => void;
  song: Song;
}

export default function DeleteSongModal({ onClose, song }: Props) {
  const { revalidate } = useRevalidator();
  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose, revalidate],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const { error } = await supabase.from('songs').delete().eq('id', song.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you sure you want to delete {song.artist} &ndash; {song.title}?
        </DialogTitle>
        <DialogDescription>This action cannot be undone</DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <DialogFooter>
          <SubmitButton submitting={submitting} variant="destructive">
            Delete
          </SubmitButton>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
