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
import { songSchema, type SongInput } from './schema';
import SongForm from './song-form';

export default function AddSongModal() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      artist: '',
      title: '',
      link: '',
    },
    resolver: zodResolver(songSchema),
  });

  const { isPending, mutate } = useMutation({
    meta: {
      successMessage: `${MESSAGE.SONG_PREFIX} added`,
    },
    mutationFn: async (input: SongInput) => {
      const { error } = await supabase.from('songs').insert(input);

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
        <Button>Add song</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Add song</DialogTitle>
          <DialogDescription>
            What&apos;s the next featured song?
          </DialogDescription>
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
    </Dialog>
  );
}
