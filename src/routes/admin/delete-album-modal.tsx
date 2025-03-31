import { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import SubmitButton from '@/components/submit-button';
import { useMobile } from '@/hooks/use-mobile';
import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { Album } from '@/lib/types';
import { supabase } from '@/supabase/client';

interface Props {
  album: Album;
  className?: string;
}

export default function DeleteAlbumModal({ album, className = '' }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const mobile = useMobile();
  const { onSubmit, submitting } = useSubmit({
    callbacks: [
      () => navigate(`${ROUTES_ADMIN.base.href}?${searchParams.toString()}`),
    ],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      if (album.favorite) {
        const { data: ranking, error: rankingError } = await supabase
          .from('rankings')
          .select('*')
          .eq('album_id', album.id)
          .single();

        if (rankingError) {
          throw new Error(rankingError.message);
        }

        if (ranking) {
          await supabase.from('rankings').delete().eq('id', ranking.id);
        }
      }

      const { error } = await supabase
        .from('albums')
        .delete()
        .eq('id', album.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} deleted`,
  });

  if (mobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className={className} size="lg" variant="destructive">
            Delete
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <form onSubmit={onSubmit}>
            <DrawerHeader className="text-left">
              <DrawerTitle>
                Are you sure you want to delete {album.artist} &ndash;{' '}
                {album.title}?
              </DrawerTitle>
              <DrawerDescription>
                This action cannot be undone
              </DrawerDescription>
            </DrawerHeader>
            <div className="space-y-8 px-4">
              <SubmitButton
                className="w-full"
                size="lg"
                submitting={submitting}
                variant="destructive"
              >
                Delete
              </SubmitButton>
            </div>
          </form>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button size="lg" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete {album.artist} &ndash; {album.title}
            ?
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
    </Dialog>
  );
}
