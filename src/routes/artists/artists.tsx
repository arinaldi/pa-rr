import { Suspense, useRef, useState } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Search, X } from 'lucide-react';

import { AppMessage } from '@/components/app-message';
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
import { cn } from '@/lib/utils';
import { Random } from './random';
import { Results } from './results';

export default function Artists() {
  const session = useSession();
  const { data: artistsData } = useArtists();
  const artists = artistsData?.artists ?? [];
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [activeArtist, setActiveArtist] = useState('');
  const filteredArtists = search
    ? artists.filter((a) => a.toLowerCase().includes(search.toLowerCase()))
    : artists;

  function reset() {
    setActiveArtist('');
    setSearch('');
    searchRef?.current?.focus();
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
          {search && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Clear search"
                className="rounded-full"
                onClick={reset}
                size="icon-xs"
                title="Clear search"
              >
                <X />
              </InputGroupButton>
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
                      className={cn`block h-auto px-0 py-0.5 text-left text-sm text-foreground ${activeArtist === a ? 'font-semibold' : 'font-normal'}`}
                      onClick={() => setActiveArtist(a)}
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
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <AppMessage
                  description={
                    error instanceof Error ? error.message : undefined
                  }
                  onError={resetErrorBoundary}
                />
              )}
              onReset={reset}
            >
              <Suspense fallback={<Spinner className="size-4" />}>
                {activeArtist ? <Results activeArtist={activeArtist} /> : null}
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </div>
  );
}
