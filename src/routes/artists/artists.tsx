import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Spinner from '@/components/spinner';
import { useSession } from '@/components/session-provider';
import { useArtists } from '@/hooks/fetch-data';
import { MESSAGE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { getReleases, type ArtistReleases } from './helpers';
import Random from './random';

interface State {
  artist: string;
  data: ArtistReleases['releases'];
}

export default function Artists() {
  const session = useSession();
  const { data } = useArtists();
  const artists = data?.artists ?? [];
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [fetching, setFetching] = useState(false);
  const [results, setResults] = useState<State>({
    artist: '',
    data: [],
  });
  const filteredArtists = search
    ? artists.filter((a) => a.toLowerCase().includes(search.toLowerCase()))
    : artists;

  async function fetchReleases(artist: string) {
    setFetching(true);

    try {
      const data = await getReleases(artist);

      if (!data) {
        throw new Error('Failed to fetch releases');
      }

      setResults({ artist, data });
    } catch (error) {
      const message =
        error instanceof Error && error.message ? error.message : MESSAGE.ERROR;

      toast.error(message);
    }

    setFetching(false);
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
      <div className="flex shrink-0 flex-col gap-4">
        <InputGroup>
          <InputGroupInput
            name="artists"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            ref={searchRef}
            value={search}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          {!fetching && search && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                onClick={() => {
                  setSearch('');
                  searchRef?.current?.focus();
                }}
              >
                <X />
              </InputGroupButton>
            </InputGroupAddon>
          )}
          {fetching && (
            <InputGroupAddon align="inline-end">
              <Spinner className="size-4" />
            </InputGroupAddon>
          )}
        </InputGroup>
        <ScrollArea className="max-h-100 rounded-md border sm:max-h-200">
          <div className="p-4">
            {filteredArtists.map((a, index) => {
              if (session) {
                return (
                  <div key={a}>
                    <Button
                      className={cn(
                        'block h-auto px-0 py-0.5 text-left text-sm text-foreground',
                        results.artist === a ? 'font-semibold' : 'font-normal',
                      )}
                      disabled={fetching}
                      onClick={() => fetchReleases(a)}
                      size="sm"
                      variant="link"
                    >
                      {a}
                    </Button>
                    {index !== filteredArtists.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                );
              }

              return (
                <div key={a}>
                  <p className="text-sm">{a}</p>
                  {index !== filteredArtists.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <div className="flex shrink-0 flex-col gap-4">
        <Random artists={artists} />
        {results.data.length > 0 && (
          <ScrollArea className="max-h-100 rounded-md border sm:max-h-200">
            <div className="p-4">
              <h4 className="text-sm font-medium">
                {results.data.length.toLocaleString()}{' '}
                {results.data.length === 1 ? 'release' : 'releases'}
              </h4>
              <ul className="mt-4 space-y-4">
                {results.data.map((item) => (
                  <li
                    className="space-y-1 text-sm"
                    key={`${item.id}|${item.main_release}`}
                  >
                    <a
                      className={cn(
                        'block underline underline-offset-4 hover:text-muted-foreground',
                        item.type === 'master' ? 'font-medium' : 'font-light',
                      )}
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
        )}
      </div>
    </div>
  );
}
