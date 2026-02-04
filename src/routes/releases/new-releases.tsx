import { useSession } from '@/components/session-provider';
import { Badge } from '@/components/ui/badge';
import { useNewReleases } from '@/hooks/data-fetch';
import { sortReleases } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import AddReleaseModal from './add-release-modal';
import ReleaseActions from './release-actions';

export default function NewReleases() {
  const session = useSession();
  const { data } = useNewReleases();
  const releases = data?.releases ?? {};

  return (
    <div className="space-y-4">
      {session && <AddReleaseModal />}
      <div className="space-y-8">
        {Object.entries(releases)
          .sort(sortReleases)
          .map(([date, data]) => (
            <div key={date}>
              <h2 className="bg-accent flex items-center gap-2 rounded-md px-3 py-2 text-xl font-semibold tracking-tight">
                {date}
                <Badge className="bg-background" variant="outline">
                  {data.length.toLocaleString()}
                </Badge>
              </h2>
              <ul className="text-sm">
                {data.map((r, i) => (
                  <li
                    key={r.id}
                    className={cn(
                      'grid grid-cols-2 gap-2 p-3 sm:grid-cols-[1fr_2fr]',
                      i < data.length - 1 && 'border-b',
                    )}
                  >
                    <span className="text-muted-foreground">{r.artist}</span>
                    <span className="flex items-center gap-2">
                      {r.title}
                      {session && <ReleaseActions release={r} />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
