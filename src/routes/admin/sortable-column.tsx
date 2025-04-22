import { Link, useSearchParams } from 'react-router';
import { ArrowDown } from 'lucide-react';

import { cn, parseQuery } from '@/lib/utils';
import { ROUTES_ADMIN } from '@/lib/constants';
import { Children } from '@/lib/types';
import { TableHead } from '@/components/ui/table';

interface Props extends Children {
  prop: string;
  wrapperClassName?: string;
}

export default function SortableColumn({
  children,
  prop,
  wrapperClassName = '',
}: Props) {
  const [searchParams] = useSearchParams();
  const query = new URLSearchParams(searchParams);
  const sort = parseQuery(searchParams.get('sort'));
  const [sortProp, desc] = sort.split(':') ?? [];
  let newSort = null;

  if (sortProp !== prop) {
    newSort = prop;
  } else if (sortProp === prop && !desc) {
    newSort = `${prop}:desc`;
  }

  if (newSort) {
    query.set('sort', newSort);
  } else {
    query.delete('sort');
  }

  return (
    <TableHead className={cn(`cursor-pointer`, wrapperClassName)} scope="col">
      <Link
        to={
          query ? `${ROUTES_ADMIN.base.href}?${query}` : ROUTES_ADMIN.base.href
        }
        replace
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
      </Link>
    </TableHead>
  );
}
