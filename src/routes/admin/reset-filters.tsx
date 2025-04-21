import { startTransition } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  queryKeys: string[];
}

export default function ResetFilters({ queryKeys }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const show = queryKeys.some((qk) => searchParams.get(qk));

  if (!show) return null;

  return (
    <Button
      className="h-8 w-fit px-2 lg:px-3"
      onClick={() => {
        const query = new URLSearchParams(searchParams);

        query.set('page', '1');
        queryKeys.forEach((qk) => {
          query.delete(qk);
        });
        startTransition(() => {
          navigate(`?${query}`);
        });
      }}
      variant="ghost"
    >
      Reset <X />
    </Button>
  );
}
