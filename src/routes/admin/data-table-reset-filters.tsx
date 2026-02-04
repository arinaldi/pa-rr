import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAdminParams } from '@/hooks/admin-params';

export function DataTableResetFilters() {
  const [{ status }, setAdminParams] = useAdminParams();
  const show = status.length > 0;

  if (!show) return null;

  return (
    <Button
      className="h-8 w-fit px-2 lg:px-3"
      onClick={() => {
        setAdminParams({
          page: 1,
          status: [],
        });
      }}
      variant="ghost"
    >
      Reset <X />
    </Button>
  );
}
