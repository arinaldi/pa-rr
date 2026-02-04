import { ArrowDown } from 'lucide-react';

import { TableHead } from '@/components/ui/table';
import { useAdminParams } from '@/hooks/admin-params';
import type { Children } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props extends Children {
  prop: string;
  wrapperClassName?: string;
}

export function DataTableSortableColumn({
  children,
  prop,
  wrapperClassName = '',
}: Props) {
  const [{ sort }, setAdminParams] = useAdminParams();
  const [sortProp, desc] = sort.split(':') ?? [];
  let newSort: string | null = null;

  if (sortProp !== prop) {
    newSort = prop;
  } else if (sortProp === prop && !desc) {
    newSort = `${prop}:desc`;
  }

  return (
    <TableHead
      className={cn(`cursor-pointer`, wrapperClassName)}
      onClick={() => setAdminParams({ sort: newSort ?? '' })}
      scope="col"
    >
      {children}
      <span
        className={cn('ml-1 flex-none', sortProp === prop ? '' : 'invisible')}
      >
        <ArrowDown
          aria-hidden="true"
          className={cn('inline size-4', desc ? 'rotate-180' : '')}
        />
      </span>
    </TableHead>
  );
}
