import { startTransition } from 'react';
import { useSearchParams } from 'react-router';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ADMIN_QUERY_KEY } from '@/lib/constants';

interface Props {
  updateQuery: (value: string[]) => void;
}

export function DataTableResetFilters({ updateQuery }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const show = searchParams.getAll(ADMIN_QUERY_KEY).length > 0;

  if (!show) return null;

  return (
    <Button
      className="h-8 w-fit px-2 lg:px-3"
      onClick={() => {
        startTransition(() => {
          updateQuery([]);
          setSearchParams((prev) => {
            prev.set('page', '1');
            prev.delete(ADMIN_QUERY_KEY);

            return prev;
          });
        });
      }}
      variant="ghost"
    >
      Reset <X />
    </Button>
  );
}
