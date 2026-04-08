import { useFeaturedSongs } from '@/hooks/fetch-data';
import { useSession } from '@/components/session-provider';
import TopLink from '@/components/top-link';
import AddSongModal from './add-song-modal';
import LetterLink from './letter-link';
import SongActions from './song-actions';

export default function FeaturedSongs() {
  const session = useSession();
  const { data } = useFeaturedSongs();
  const songs = data?.songs ?? {};

  return (
    <div className="space-y-4">
      {session && <AddSongModal />}
      <LetterLink />
      <div className="mt-4 flex flex-col gap-8">
        {Object.entries(songs).map(([letter, data]) => {
          if (data.length === 0) return null;

          return (
            <div key={letter}>
              <h2
                className="border-b pb-2 text-lg font-semibold tracking-tight"
                id={`letter-${letter}`}
              >
                {letter}
              </h2>
              <ul className="mt-4 grid grid-cols-1 items-start gap-4 text-sm md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((s) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <div className="space-y-0.5">
                      <a
                        className="block leading-5 underline underline-offset-3 hover:text-muted-foreground"
                        href={s.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {s.title}
                      </a>
                      <p className="text-xs text-muted-foreground">
                        {s.artist}
                      </p>
                    </div>
                    {session && <SongActions song={s} />}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <TopLink />
    </div>
  );
}
