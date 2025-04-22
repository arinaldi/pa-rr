import { startTransition, useOptimistic } from 'react';
import { useSearchParams } from 'react-router';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PER_PAGE } from '@/lib/constants';
import { parsePerPageQuery } from '@/lib/utils';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

export default function PerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = parsePerPageQuery(searchParams.get('perPage'));
  const [optimisticValue, setOptimisticValue] = useOptimistic(
    perPage.toString(),
  );

  function onValueChange(value: string) {
    startTransition(() => {
      setOptimisticValue(value);
      setSearchParams((prev) => {
        prev.set('page', '1');
        prev.set('perPage', value);

        return prev;
      });
    });
  }

  return (
    <div className="flex items-center gap-x-2">
      <p className="text-sm font-medium">Rows per page</p>
      <Select onValueChange={onValueChange} value={optimisticValue}>
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem value={SMALL.toString()}>{SMALL}</SelectItem>
          <SelectItem value={MEDIUM.toString()}>{MEDIUM}</SelectItem>
          <SelectItem value={LARGE.toString()}>{LARGE}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
