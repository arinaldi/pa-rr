import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const WIDTHS = ['w-32', 'w-40', 'w-48', 'w-56', 'w-64'];
const array = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  width: WIDTHS[Math.floor(Math.random() * WIDTHS.length)],
}));

export function ResultsLoading() {
  return (
    <ScrollArea className="max-h-100 rounded-md border sm:max-h-200">
      <div className="p-4">
        <h4 className="flex items-center gap-1 text-sm font-medium">
          50 releases
        </h4>
        <ul className="mt-4 space-y-4">
          {array.map((item) => (
            <li className="space-y-1 text-sm" key={item.id}>
              <Skeleton className={cn('h-5', item.width)} />
              <Skeleton className="h-5 w-8" />
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
}
