import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdminParams } from '@/hooks/admin-params';
import { PER_PAGE } from '@/lib/constants';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

export function DataTablePerPage() {
  const [{ perPage }, setAdminParams] = useAdminParams();

  return (
    <div className="flex items-center gap-x-2">
      <p className="text-sm font-medium">Rows per page</p>
      <Select
        onValueChange={(value) => {
          setAdminParams({
            page: 1,
            perPage: parseInt(value),
          });
        }}
        value={perPage.toString()}
      >
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
