import { useSession } from '@/components/session-provider';
import { Badge } from '@/components/ui/badge';
import { useNewReleases } from '@/hooks/fetch-data';
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
              <h2 className="flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 font-semibold tracking-tight">
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
                      'flex items-center justify-between gap-2 px-3 py-3 sm:justify-start',
                      i < data.length - 1 && 'border-b',
                    )}
                  >
                    <div className="space-y-1">
                      <p className="leading-none font-medium">{r.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.artist}
                      </p>
                    </div>
                    {session && <ReleaseActions release={r} />}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
