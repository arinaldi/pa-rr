import { useState } from 'react';
import { EllipsisVertical, SquarePen, Trash } from 'lucide-react';

import type { Song } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteSongModal from './delete-song-modal';
import EditSongModal from './edit-song-modal';

interface Props {
  song: Song;
}

interface ModalState {
  open: boolean;
  type: 'delete' | 'edit';
}

export default function SongActions({ song }: Props) {
  const [modal, setModal] = useState<ModalState>({
    open: false,
    type: 'edit',
  });

  function onClose() {
    setModal((m) => ({ ...m, open: false }));
  }

  return (
    <Dialog
      open={modal.open}
      onOpenChange={(open) => setModal((m) => ({ ...m, open }))}
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            className="shrink-0 rounded-full"
            size="icon-sm"
            variant="ghost"
          >
            <span className="sr-only">Open menu</span>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger
            asChild
            onClick={() => setModal((m) => ({ ...m, type: 'edit' }))}
          >
            <DropdownMenuItem className="flex items-center gap-2">
              <SquarePen />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger
            asChild
            onClick={() => setModal((m) => ({ ...m, type: 'delete' }))}
          >
            <DropdownMenuItem className="flex items-center gap-2">
              <Trash />
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {modal.type === 'edit' && <EditSongModal onClose={onClose} song={song} />}
      {modal.type === 'delete' && (
        <DeleteSongModal onClose={onClose} song={song} />
      )}
    </Dialog>
  );
}
