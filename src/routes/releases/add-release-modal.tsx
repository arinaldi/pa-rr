import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SubmitButton from '@/components/submit-button';
import { MESSAGE } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import ReleaseForm from './release-form';
import { releaseSchema, type ReleaseInput } from './schema';

export default function AddReleaseModal() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      artist: '',
      title: '',
      date: '',
    },
    resolver: zodResolver(releaseSchema),
  });

  const { isPending, mutate } = useMutation({
    meta: {
      successMessage: `${MESSAGE.RELEASE_PREFIX} added`,
    },
    mutationFn: async ({ date, ...rest }: ReleaseInput) => {
      const { error } = await supabase.from('releases').insert({
        ...rest,
        date: date.length === 0 ? null : date,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      setOpen(false);
      form.reset();
    },
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
        <FormProvider {...form}>
          <ReleaseForm onSubmit={form.handleSubmit((data) => mutate(data))}>
            <DialogFooter>
              <SubmitButton className="w-full sm:w-auto" submitting={isPending}>
                Save
              </SubmitButton>
            </DialogFooter>
          </ReleaseForm>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
