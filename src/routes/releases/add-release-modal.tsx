import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { releaseSchema, type ReleaseInput } from './schema';
import ReleaseForm from './release-form';

const defaultValues = {
  artist: '',
  title: '',
  date: '',
};

export default function AddReleaseModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<ReleaseInput>({
    defaultValues,
    resolver: standardSchemaResolver(releaseSchema),
  });

  function onClose() {
    setOpen(false);
    form.reset(defaultValues);
  }

  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ date, ...rest }: ReleaseInput) => {
      const { error } = await supabase.from('releases').insert({
        ...rest,
        date: date.length === 0 ? null : date,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} added`,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add release</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Add release</DialogTitle>
          <DialogDescription>What&apos;s the newest release?</DialogDescription>
        </DialogHeader>
        <ReleaseForm form={form} onSubmit={onSubmit} submitting={submitting} />
      </DialogContent>
    </Dialog>
  );
}
