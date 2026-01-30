import { startTransition } from 'react';
import { useSearchParams } from 'react-router';
import { ArrowDown } from 'lucide-react';

import { cn, parseQuery } from '@/lib/utils';
import type { Children } from '@/lib/types';
import { TableHead } from '@/components/ui/table';

interface Props extends Children {
  prop: string;
  wrapperClassName?: string;
}

export function DataTableSortableColumn({
  children,
  prop,
  wrapperClassName = '',
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = parseQuery(searchParams.get('sort'));
  const [sortProp, desc] = sort.split(':') ?? [];
  let newSort: string | null = null;

  if (sortProp !== prop) {
    newSort = prop;
  } else if (sortProp === prop && !desc) {
    newSort = `${prop}:desc`;
  }

  function onClick() {
    startTransition(() => {
      setSearchParams((prev) => {
        if (newSort) {
          prev.set('sort', newSort);
        } else {
          prev.delete('sort');
        }

        return prev;
      });
    });
  }

  return (
    <TableHead
      className={cn(`cursor-pointer`, wrapperClassName)}
      onClick={onClick}
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
