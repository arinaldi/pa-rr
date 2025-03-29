import { useState } from 'react';
import { useRevalidator } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/supabase/client';
import { releaseSchema, type ReleaseInput } from './schema';
import ReleaseForm from './release-form';

const defaultValues = {
  artist: '',
  title: '',
  date: '',
};

export default function AddReleaseModal() {
  const { revalidate } = useRevalidator();
  const [open, setOpen] = useState(false);
  const form = useForm<ReleaseInput>({
    defaultValues,
    resolver: zodResolver(releaseSchema),
  });

  function onClose() {
    setOpen(false);
    form.reset(defaultValues);
  }

  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose, revalidate],
    handleSubmit: form.handleSubmit,
    submitFn: async (data: ReleaseInput) => {
      const { error } = await supabase.from('releases').insert({
        ...data,
        date: data.date || null,
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
