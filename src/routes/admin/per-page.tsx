import { startTransition, useOptimistic, useState } from 'react';
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
  const [perPage, setPerPage] = useState(() =>
    parsePerPageQuery(searchParams.get('per_page')),
  );
  const [optimisticValue, setOptimisticValue] = useOptimistic(perPage);

  function onValueChange(value: string) {
    const newValue = parseInt(value);

    startTransition(() => {
      setPerPage(newValue);
      setOptimisticValue(newValue);
      setSearchParams((prev) => {
        prev.set('page', '1');
        prev.set('per_page', value);

        return prev;
      });
    });
  }

  return (
    <div className="flex items-center gap-x-2">
      <p className="text-sm font-medium">Rows per page</p>
      <Select onValueChange={onValueChange} value={optimisticValue.toString()}>
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
