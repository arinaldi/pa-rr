import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdminParams } from '@/hooks/admin-params';
import { PER_PAGE } from '@/lib/constants';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;
const items = [
  { label: SMALL, value: SMALL.toString() },
  { label: MEDIUM, value: MEDIUM.toString() },
  { label: LARGE, value: LARGE.toString() },
];

export function DataTablePerPage() {
  const [{ perPage }, setAdminParams] = useAdminParams();

  return (
    <div className="flex items-center gap-x-2">
      <p className="hidden text-sm font-medium sm:block">Rows per page</p>
      <Select
        items={items}
        onValueChange={(value) => {
          setAdminParams({
            page: 1,
            perPage: value ? parseInt(value) : SMALL,
          });
        }}
        value={perPage.toString()}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
