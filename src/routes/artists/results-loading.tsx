import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

export function ResultsLoading() {
  return (
    <ScrollArea className="max-h-100 rounded-md border sm:max-h-200">
      <div className="p-4">
        <h4 className="flex items-center gap-1 text-sm font-medium">
          <Skeleton className="h-5 w-24" />
        </h4>
        <ul className="mt-4 space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <li className="space-y-1 text-sm" key={item}>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-8" />
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
}
