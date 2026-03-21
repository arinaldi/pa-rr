import { Fragment } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSession } from '@/components/session-provider';
import TopLink from '@/components/top-link';
import { useAllTimeRankings } from '@/hooks/fetch-data';
import { ROUTE_HREF, SPOTIFY_URL } from '@/lib/constants';

export default function AllTimeRankings() {
  const { data } = useAllTimeRankings();
  const favorites = data?.favorites ?? [];
  const session = useSession();

  return (
    <div className="max-w-lg space-y-4">
      {session && (
        <Link className="block" to={ROUTE_HREF.ALL_TIME_EDIT}>
          <Button>Edit</Button>
        </Link>
      )}
      {favorites.length > 0 && (
        <>
          <ol className="list-decimal space-y-1 [&>li]:ml-8">
            {favorites.map((f, index) => {
              const query = encodeURI(`${f.artist} ${f.title}`);
              const url = `${SPOTIFY_URL}/${query}`;

              return (
                <Fragment key={f.id}>
                  <li className="text-sm text-muted-foreground">
                    <span>{f.artist} &ndash;</span>{' '}
                    <a
                      className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
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
          <TopLink />
        </>
      )}
    </div>
  );
}
