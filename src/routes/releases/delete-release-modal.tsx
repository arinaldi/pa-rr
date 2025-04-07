import { FormEvent } from 'react';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SubmitButton from '@/components/submit-button';
import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES } from '@/lib/constants';
import { Release } from '@/lib/types';
import { supabase } from '@/supabase/client';

interface Props {
  onClose: () => void;
  release: Release;
}

export default function DeleteReleaseModal({ onClose, release }: Props) {
  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const { error } = await supabase
        .from('releases')
        .delete()
        .eq('id', release.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you sure you want to delete {release.artist} &ndash;{' '}
          {release.title}?
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
