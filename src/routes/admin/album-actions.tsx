import { useRevalidator } from 'react-router';
import { EllipsisVertical } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Album } from '@/lib/types';
import { wait } from '@/lib/utils';
import { supabase } from '@/supabase/client';

interface Props {
  album: Album;
}

export default function AlbumActions({ album }: Props) {
  const revalidator = useRevalidator();

  async function onChange(key: 'cd' | 'wishlist', checked: boolean) {
    const { error } = await supabase
      .from('albums')
      .update({
        [key]: checked,
      })
      .eq('id', album.id);

    if (error) {
      toast.error(error.message);
    }

    await wait(100);
    revalidator.revalidate();
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="-mt-1.5 -mr-1 size-8 shrink-0 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <EllipsisVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={album.cd}
          onCheckedChange={(checked) => onChange('cd', checked)}
        >
          CD
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={album.wishlist}
          onCheckedChange={(checked) => onChange('wishlist', checked)}
        >
          Wishlist
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
