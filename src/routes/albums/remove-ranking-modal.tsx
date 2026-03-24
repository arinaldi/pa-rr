import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { X } from 'lucide-react';

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
import { type AllTimeListItem } from '@/lib/formatters';
import { supabase } from '@/supabase/client';

interface Props {
  item: AllTimeListItem;
  removeItem: (id: number) => void;
}

export default function RemoveAllTimeRankingModal({ item, removeItem }: Props) {
  const [open, setOpen] = useState(false);

  const { isPending, mutate } = useMutation({
    meta: {
      successMessage: 'All-time ranking removed',
    },
    mutationFn: async () => {
      const { error } = await supabase
        .from('rankings')
        .update({
          all_time_position: null,
        })
        .eq('id', item.rankingId);

      if (error) {
        throw new Error(error.message);
      }

      removeItem(item.id);
    },
    onSuccess: () => {
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full"
          size="icon-xs"
          type="button"
          variant="destructive"
        >
          <X />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove all-time ranking</DialogTitle>
          <DialogDescription>
            {item.artist} &ndash; {item.title}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
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
    </Dialog>
  );
}
