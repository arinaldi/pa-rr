import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

import { Release } from '@/lib/types';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES } from '@/lib/constants';
import { formatDate } from '@/lib/formatters';
import { supabase } from '@/supabase/client';
import { releaseSchema, type ReleaseInput } from './schema';
import ReleaseForm from './release-form';

interface Props {
  onClose: () => void;
  release: Release;
}

export default function EditReleaseModal({ onClose, release }: Props) {
  const form = useForm<ReleaseInput>({
    defaultValues: {
      artist: release.artist,
      title: release.title,
      date: release.date ? formatDate(release.date) : '',
    },
    resolver: standardSchemaResolver(releaseSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ date, ...rest }: ReleaseInput) => {
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
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  });

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Edit release</DialogTitle>
        <DialogDescription>Update data for new release</DialogDescription>
      </DialogHeader>
      <ReleaseForm form={form} onSubmit={onSubmit} submitting={submitting} />
    </DialogContent>
  );
}
