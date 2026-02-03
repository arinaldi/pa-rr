import { useForm } from 'react-hook-form';
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
import { formatDate } from '@/lib/formatters';
import type { Release } from '@/lib/types';
import { supabase } from '@/supabase/client';
import ReleaseForm from './release-form';
import { releaseSchema, type ReleaseInput } from './schema';

interface Props {
  onClose: () => void;
  release: Release;
}

export default function EditReleaseModal({ onClose, release }: Props) {
  const form = useForm({
    defaultValues: {
      artist: release.artist,
      title: release.title,
      date: release.date ? formatDate(release.date) : '',
    },
    resolver: zodResolver(releaseSchema),
  });

  const { isPending, mutate } = useMutation({
    meta: {
      successMessage: `${MESSAGE.RELEASE_PREFIX} added`,
    },
    mutationFn: async ({ date, ...rest }: ReleaseInput) => {
      const { error } = await supabase
        .from('releases')
        .update({
          ...rest,
          date: date.length === 0 ? null : date,
        })
        .eq('id', release.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: onClose,
  });

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Edit release</DialogTitle>
        <DialogDescription>Update data for new release</DialogDescription>
      </DialogHeader>
      <ReleaseForm onSubmit={form.handleSubmit((data) => mutate(data))}>
        <DialogFooter>
          <SubmitButton className="w-full sm:w-auto" submitting={isPending}>
            Save
          </SubmitButton>
        </DialogFooter>
      </ReleaseForm>
    </DialogContent>
  );
}
