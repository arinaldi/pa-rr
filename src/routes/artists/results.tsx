import { Item, ItemContent, ItemDescription } from '@/components/ui/item';
import { useArtistReleases } from '@/hooks/suspense-data';
import { cn } from '@/lib/utils';

interface Props {
  activeArtist: string;
}

export function Results({ activeArtist }: Props) {
  const { data: results } = useArtistReleases(activeArtist);

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="h-100 scroll-fade scrollbar-none space-y-2 overflow-y-auto p-2 scroll-fade-20 sm:h-200">
        <h4 className="text-center text-sm font-medium">
          {results.length.toLocaleString()}{' '}
          {results.length === 1 ? 'release' : 'releases'}
        </h4>
        <div className="flex flex-col gap-2">
          {results.map((r) => (
            <Item key={`${r.id}|${r.main_release}`} size="xs" variant="muted">
              <ItemContent className="overflow-x-hidden">
                <a
                  className={cn`block truncate underline underline-offset-1 hover:text-muted-foreground ${r.type === 'master' ? 'font-medium' : 'font-light'}`}
                  href={`https://www.discogs.com/${r.type}/${r.id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {r.title}
                </a>
                <ItemDescription>
                  {r.year ?? <span>&ndash;</span>}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </div>
    </div>
  );
}
