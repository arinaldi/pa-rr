import { Fragment } from 'react';
import { Link, useLoaderData } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSession } from '@/components/session-provider';
import { ROUTE_HREF, SPOTIFY_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { getAllTimeRankings } from '@/supabase/data';

export default function AllTimeRankings() {
  const { favorites } = useLoaderData<typeof getAllTimeRankings>();
  const session = useSession();

  return (
    <div className="max-w-md space-y-4">
      {session && (
        <Link className="block" to={ROUTE_HREF.ALL_TIME_EDIT}>
          <Button>Edit</Button>
        </Link>
      )}
      <Card>
        <CardContent>
          <ol className="ml-4 list-decimal">
            {favorites.map((f, index) => {
              const query = encodeURI(`${f.artist} ${f.title}`);
              const url = `${SPOTIFY_URL}/${query}`;

              return (
                <Fragment key={f.id}>
                  <li
                    className={cn(
                      'text-muted-foreground text-sm',
                      index > 0 && 'mt-1',
                    )}
                  >
                    <span>{f.artist} &ndash;</span>{' '}
                    <a
                      className="text-foreground hover:text-muted-foreground underline underline-offset-4"
                      href={url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {f.title}
                    </a>
                  </li>
                  {(index + 1) % 10 === 0 && favorites[index + 1] && (
                    <Separator className="my-4" />
                  )}
                </Fragment>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
