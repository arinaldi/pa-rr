import { Skeleton } from '@/components/ui/skeleton';

export function ResultsLoading() {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="h-100 scroll-fade scrollbar-none space-y-2 overflow-y-auto p-2 scroll-fade-20 sm:h-200">
        <h4 className="shimmer text-center text-sm text-muted-foreground">
          Fetching releases&hellip;
        </h4>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 50 }, (_, i) => i).map((item) => (
            <Skeleton key={item} className="h-14" />
          ))}
        </div>
      </div>
    </div>
  );
}
