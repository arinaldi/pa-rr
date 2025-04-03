import { startTransition, useOptimistic } from 'react';
import { useSearchParams } from 'react-router';

import { PER_PAGE } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  perPage: PER_PAGE;
}

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

export default function PerPage({ perPage }: Props) {
  const [, setSearchParams] = useSearchParams();
  const [optimisticPerPage, setOptimisticPerPage] = useOptimistic(
    perPage.toString(),
  );

  function onValueChange(value: string) {
    startTransition(() => {
      setOptimisticPerPage(value);
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
      <Select onValueChange={onValueChange} value={optimisticPerPage}>
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
