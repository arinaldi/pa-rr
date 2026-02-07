import { ArrowDown, ArrowUp, ChevronsUpDown, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableHead } from '@/components/ui/table';
import { useAdminParams } from '@/hooks/admin-params';

interface Props {
  sortKey: string;
}

export function DataTableSortableColumn({ sortKey }: Props) {
  const [{ direction, sort }, setAdminParams] = useAdminParams();

  function onClick(value: 'asc' | 'desc' | 'clear') {
    setAdminParams({
      direction: value === 'clear' ? '' : value,
      sort: value === 'clear' ? '' : sortKey,
    });
  }

  return (
    <TableHead scope="col">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="data-[state=open]:bg-accent -ml-3 h-8 text-xs capitalize"
            size="sm"
            variant="ghost"
          >
            {sortKey}
            {sort === sortKey && direction === 'desc' ? (
              <ArrowDown />
            ) : sort === sortKey && direction === 'asc' ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => onClick('asc')}>
            <ArrowUp className="text-muted-foreground/70 size-3.5" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onClick('desc')}>
            <ArrowDown className="text-muted-foreground/70 size-3.5" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => onClick('clear')}>
            <X className="text-muted-foreground/70 size-3.5" />
            Clear
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );
}
