import { ScrollArea } from '@/components/ui/scroll-area';
import { useArtistReleases } from '@/hooks/suspense-data';
import { cn } from '@/lib/utils';

interface Props {
  activeArtist: string;
}

export function Results({ activeArtist }: Props) {
  const { data: results } = useArtistReleases(activeArtist);

  return (
    <ScrollArea className="max-h-100 rounded-md border sm:max-h-200">
      <div className="p-4">
        <h4 className="text-sm font-medium">
          {results.length.toLocaleString()}{' '}
          {results.length === 1 ? 'release' : 'releases'}
        </h4>
        <ul className="mt-4 space-y-4">
          {results.map((item) => (
            <li
              className="space-y-1 text-sm"
              key={`${item.id}|${item.main_release}`}
            >
              <a
                className={cn`block underline underline-offset-4 hover:text-muted-foreground ${item.type === 'master' ? 'font-medium' : 'font-light'}`}
                href={`https://www.discogs.com/${item.type}/${item.id}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.title}
              </a>
              <p className="font-light text-muted-foreground">
                {item.year ?? <span>&ndash;</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
}
