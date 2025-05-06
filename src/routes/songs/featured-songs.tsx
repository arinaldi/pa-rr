import { Fragment } from 'react';
import { ArrowUp } from 'lucide-react';

import { useFeaturedSongs } from '@/hooks/use-data';
import { HEADER_LETTERS } from '@/lib/formatters';
import AddSongModal from './add-song-modal';
import SongActions from './song-actions';

export default function FeaturedSongs() {
  const {
    data: { songs },
  } = useFeaturedSongs();

  return (
    <div className="space-y-4">
      <AddSongModal />
      <div className="flex flex-wrap gap-1.5">
        {HEADER_LETTERS.map((l, index) => (
          <Fragment key={l}>
            <a
              className="hover:text-muted-foreground underline underline-offset-4"
              key={l}
              href={`#letter-${l}`}
            >
              {l}
            </a>
            {index < HEADER_LETTERS.length - 1 && <span>&middot;</span>}
          </Fragment>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-8">
        {Object.entries(songs).map(([letter, data]) => {
          if (data.length === 0) return null;

          return (
            <div key={letter}>
              <h2
                className="border-b pb-2 text-xl font-semibold tracking-tight"
                id={`letter-${letter}`}
              >
                {letter}
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((s) => (
                  <li key={s.id} className="text-sm">
                    <span className="flex items-start gap-2">
                      <span>
                        <span className="text-muted-foreground">
                          {s.artist} &ndash;
                        </span>{' '}
                        <a
                          className="hover:text-muted-foreground underline underline-offset-4"
                          href={s.link}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {s.title}
                        </a>
                      </span>
                      {<SongActions song={s} />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <a
        className="text-muted-foreground fixed right-0 bottom-0 p-5 text-sm"
        href="#top"
      >
        <ArrowUp className="mr-1 inline size-4" />
        <span>Top</span>
      </a>
    </div>
  );
}
