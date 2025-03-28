import { MONTHS } from './constants';
import { Album, Release, Song } from './types';

export interface ListItem {
  artist: string;
  id: number;
  ranking: number;
  title: string;
  year: string;
}

export interface FavoriteResults {
  [key: string]: ListItem[];
}

interface RankedAlbum extends Album {
  ranking: {
    position: number;
  } | null;
}

export function formatFavorites(favorites: RankedAlbum[]): FavoriteResults {
  const results: FavoriteResults = {};

  favorites.forEach(({ artist, id, ranking, title, year }) => {
    const data = {
      artist,
      id,
      ranking: ranking?.position ?? 0,
      title,
      year,
    };

    if (results[year]) {
      results[year].push(data);
    } else {
      results[year] = [data];
    }
  });

  return results;
}

function formatReleaseDate(isoString: string) {
  const newDate = new Date(isoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();

  return `${date} ${MONTHS[month]} ${year}`;
}

export interface ReleaseResults {
  [key: string]: Release[];
}

export function formatReleases(releases: Release[]): ReleaseResults {
  const results: ReleaseResults = {};

  releases.forEach((r) => {
    const releaseDate = r.date ? formatReleaseDate(r.date) : 'TBD';

    if (results[releaseDate]) {
      results[releaseDate].push(r);
    } else {
      results[releaseDate] = [r];
    }
  });

  return results;
}

const NUMBER_SIGN = '#';
const ALPHABET = Array.from(Array(26)).map((_, i) =>
  String.fromCharCode(i + 65)
);
export const HEADER_LETTERS = [NUMBER_SIGN, ...ALPHABET];

interface SongResults {
  [key: string]: Song[];
}

export function formatSongs(songs: Song[]): SongResults {
  const results: SongResults = {};

  HEADER_LETTERS.forEach((letter) => {
    results[letter] = [];
  });

  songs.forEach((song) => {
    let firstLetter = song.artist[0].toUpperCase();

    if (song.artist.startsWith('A ')) {
      firstLetter = song.artist[2].toUpperCase();
    } else if (song.artist.startsWith('An ')) {
      firstLetter = song.artist[3].toUpperCase();
    } else if (
      song.artist.startsWith('The ') ||
      song.artist.startsWith('Tha ')
    ) {
      firstLetter = song.artist[4].toUpperCase();
    }

    if (/\d/.test(firstLetter) || !results[firstLetter]) {
      firstLetter = NUMBER_SIGN;
    }

    results[firstLetter].push(song);
  });

  Object.values(results).forEach((s) => {
    s.sort((a, b) => {
      let artistA = a.artist;
      let artistB = b.artist;

      if (artistA.startsWith('A ')) {
        artistA = artistA.slice(2);
      } else if (artistA.startsWith('An ')) {
        artistA = artistA.slice(3);
      } else if (artistA.startsWith('The ') || artistA.startsWith('Tha ')) {
        artistA = artistA.slice(4);
      }

      if (artistB.startsWith('A ')) {
        artistB = artistB.slice(2);
      } else if (artistB.startsWith('An ')) {
        artistB = artistB.slice(3);
      } else if (artistB.startsWith('The ') || artistB.startsWith('Tha ')) {
        artistB = artistB.slice(4);
      }

      return artistA.localeCompare(artistB);
    });
  });

  return results;
}
