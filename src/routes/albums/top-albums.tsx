import { Link } from 'react-router';
import { SquarePen } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TopLink from '@/components/top-link';
import { useSession } from '@/components/session-provider';
import { useTopAlbums } from '@/hooks/fetch-data';
import { ROUTE_HREF, SPOTIFY_URL } from '@/lib/constants';
import DecadeLink from './decade-link';

export default function TopAlbums() {
  const { data } = useTopAlbums();
  const favorites = data?.favorites ?? {};
  const session = useSession();

  return (
    <div className="space-y-4">
      <DecadeLink />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3 2xl:grid-cols-4">
        {Object.entries(favorites)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([year, favorites]) => (
            <Card key={year}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle
                    className="flex items-center gap-2 font-semibold tracking-tight"
                    id={year}
                  >
                    {year}
                    <Badge variant="secondary">
                      {favorites.length.toLocaleString()}
                    </Badge>
                  </CardTitle>
                  {session && (
                    <Link to={ROUTE_HREF.EDIT_RANKINGS.replace(':year', year)}>
                      <Button
                        className="rounded-full"
                        size="icon-sm"
                        variant="ghost"
                      >
                        <span className="sr-only">Edit rankings</span>
                        <SquarePen />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal text-sm [&>li]:mb-3 [&>li]:ml-6">
                  {favorites
                    .sort((a, b) => {
                      if (a.ranking > b.ranking) return 1;
                      if (a.ranking < b.ranking) return -1;
                      return 0;
                    })
                    .map((f) => {
                      const query = encodeURI(`${f.artist} ${f.title}`);
                      const url = `${SPOTIFY_URL}/${query}`;

                      return (
                        <li key={f.id} className="space-y-0.5 marker:text-xs">
                          <a
                            className="block leading-5 underline underline-offset-3 hover:text-muted-foreground"
                            href={url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {f.title}
                          </a>
                          <p className="text-xs text-muted-foreground">
                            {f.artist}
                          </p>
                        </li>
                      );
                    })}
                </ol>
              </CardContent>
            </Card>
          ))}
      </div>
      <TopLink />
    </div>
  );
}
