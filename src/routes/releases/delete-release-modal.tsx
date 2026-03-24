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
import type { Release } from '@/lib/types';
import { supabase } from '@/supabase/client';

interface Props {
  onClose: () => void;
  release: Release;
}

export default function DeleteReleaseModal({ onClose, release }: Props) {
  const { isPending, mutate } = useMutation({
    meta: {
      successMessage: `${MESSAGE.RELEASE_PREFIX} deleted`,
    },
    mutationFn: async () => {
      const { error } = await supabase
        .from('releases')
        .delete()
        .eq('id', release.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: onClose,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete release</DialogTitle>
        <DialogDescription>
          {release.artist} &ndash; {release.title}
        </DialogDescription>
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
