import { Link, useSearchParams } from 'react-router';
import { ChevronRightIcon } from 'lucide-react';

import { ROUTES_ADMIN } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface Props {
  id: number;
}

export default function TableLink({ id }: Props) {
  const searchParams = useSearchParams();

  return (
    <Button asChild className="size-8 p-0" variant="ghost">
      <Link to={`${ROUTES_ADMIN.edit.href}/${id}?${searchParams?.toString()}`}>
        <ChevronRightIcon className="size-4" />
      </Link>
    </Button>
  );
}
