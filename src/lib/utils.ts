import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Album } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function capitalizeFirstLetter(value: string) {
  return `${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`;
}
