import { startTransition } from 'react';
import { useSearchParams } from 'react-router';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  queryKeys: string[];
}

export default function ResetFilters({ queryKeys }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const show = queryKeys.some((qk) => searchParams.get(qk));

  if (!show) return null;

  return (
    <Button
      className="h-8 w-fit px-2 lg:px-3"
      onClick={() => {
        startTransition(() => {
          setSearchParams((prev) => {
            prev.set('page', '1');
            queryKeys.forEach((qk) => {
              prev.delete(qk);
            });

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
