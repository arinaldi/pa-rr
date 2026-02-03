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

interface Props {
  onClose: () => void;
  song: Song;
}

export default function DeleteSongModal({ onClose, song }: Props) {
  const { isPending, mutate } = useMutation({
    meta: {
      successMessage: `${MESSAGE.SONG_PREFIX} deleted`,
    },
    mutationFn: async () => {
      const { error } = await supabase.from('songs').delete().eq('id', song.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: onClose,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you sure you want to delete {song.artist} &ndash; {song.title}?
        </DialogTitle>
        <DialogDescription>This action cannot be undone</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutate();
        }}
      >
        <DialogFooter>
          <SubmitButton submitting={isPending} variant="destructive">
            Delete
          </SubmitButton>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
