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
        <DropdownMenuTrigger
          render={
            <Button
              className="-ml-3 capitalize data-[state=open]:bg-accent"
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
          }
        />
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onClick('asc')}>
            <ArrowUp className="size-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClick('desc')}>
            <ArrowDown className="size-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onClick('clear')}>
            <X className="size-3.5 text-muted-foreground/70" />
            Clear
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );
}
