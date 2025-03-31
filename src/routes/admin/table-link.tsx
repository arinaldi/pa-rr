import { Link, useSearchParams } from 'react-router';
import { ChevronRightIcon } from 'lucide-react';

import { ROUTES_ADMIN } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface Props {
  id: number;
}

export default function TableLink({ id }: Props) {
  const [searchParams] = useSearchParams();
  const to = `${ROUTES_ADMIN.edit.href.replace(':id', id.toString())}`;

  return (
    <Button asChild className="size-8 p-0" variant="ghost">
      <Link to={`${to}?${searchParams.toString()}`}>
        <ChevronRightIcon className="size-4" />
      </Link>
    </Button>
  );
}
