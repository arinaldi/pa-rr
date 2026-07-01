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
import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
import { useSession } from '@/components/session-provider';
import { useArtists } from '@/hooks/fetch-data';
import { cn } from '@/lib/utils';
import { Random } from './random';
import { Results } from './results';
import { ResultsLoading } from './results-loading';

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
                onClick={() => {
                  setActiveArtist('');
                  setSearch('');
                  searchRef?.current?.focus();
                }}
                size="icon-xs"
                title="Clear search"
              >
                <X />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
        <div className="overflow-hidden rounded-lg border">
          <div className="h-100 scroll-fade scrollbar-none space-y-2 overflow-y-auto p-2 scroll-fade-20 sm:h-200">
            <h4 className="text-center text-sm font-medium">
              {filteredArtists.length.toLocaleString()}
              {filteredArtists.length === 1 ? ' result' : ' results'}
            </h4>
            <div className="flex flex-col gap-2">
              {filteredArtists.map((a) => {
                return (
                  <Item key={a} size="xs" variant="outline">
                    <ItemContent>
                      <ItemTitle>
                        {session ? (
                          <Button
                            className={cn`block h-auto px-0 py-0.5 text-left text-sm text-foreground ${activeArtist === a ? 'font-semibold' : 'font-normal'}`}
                            onClick={() => setActiveArtist(a)}
                            size="sm"
                            variant="link"
                          >
                            {a}
                          </Button>
                        ) : (
                          a
                        )}
                      </ItemTitle>
                    </ItemContent>
                  </Item>
                );
              })}
            </div>
          </div>
        </div>
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
              resetKeys={[activeArtist]}
            >
              <Suspense fallback={<ResultsLoading />}>
                {activeArtist ? <Results activeArtist={activeArtist} /> : null}
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </div>
  );
}
