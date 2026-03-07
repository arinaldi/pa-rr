import { Calendar, Layers, User, Volume1 } from 'lucide-react';

import type { Icon } from '@/lib/types';

export const APP_NAME = 'Perfect Albums';

export const DEBOUNCE_IN_MS = 500;

export const DECADES = [
  { id: '2019', label: '10s' },
  { id: '2009', label: '00s' },
  { id: '1999', label: '90s' },
  { id: '1989', label: '80s' },
  { id: '1977', label: '70s' },
];

export const EMAIL = import.meta.env.VITE_EMAIL;

export const MESSAGE = {
  ALBUM_PREFIX: 'Album successfully',
  SONG_PREFIX: 'Song successfully',
  RELEASE_PREFIX: 'Release successfully',
  ERROR: 'Something went wrong',
  NO_DATA: 'No data',
  NOT_AUTHORIZED: 'Not authorized',
  INVALID_DATA: 'Invalid data',
};

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const PER_PAGE = {
  SMALL: 25,
  MEDIUM: 50,
  LARGE: 100,
};

export const ROUTE_HREF = {
  ALL_TIME: '/albums/all-time',
  ALL_TIME_EDIT: '/albums/all-time/edit',
  ARTISTS: '/artists',
  EDIT_RANKINGS: '/albums/:year',
  FEATURED_SONGS: '/songs',
  NEW_RELEASES: '/releases',
  NOT_FOUND: '/not-found',
  PLAYLIST: '/playlist',
  SIGNIN: '/signin',
  SIGNOUT: '/signout',
  TOP_ALBUMS: '/albums',
};

export const QUERY_KEY = {
  ALBUMS: 'albums',
  ALL_TIME: 'all-time-rankings',
  ARTISTS: 'artists',
  FEATURED_SONGS: 'featured-songs',
  NEW_RELEASES: 'new-releases',
  TOP_ALBUMS: 'top-albums',
} as const;

export type QueryKey = (typeof QUERY_KEY)[keyof typeof QUERY_KEY];

export interface Route {
  href: string;
  icon: Icon;
  label: string;
  queryKey: QueryKey;
  items?: {
    href: string;
    label: string;
    queryKey: QueryKey;
  }[];
}

export const ROUTES: Route[] = [
  {
    href: ROUTE_HREF.TOP_ALBUMS,
    icon: Layers,
    label: 'Top albums',
    queryKey: QUERY_KEY.TOP_ALBUMS,
    items: [
      {
        href: ROUTE_HREF.ALL_TIME,
        label: 'All-time',
        queryKey: QUERY_KEY.ALL_TIME,
      },
    ],
  },
  {
    href: ROUTE_HREF.FEATURED_SONGS,
    icon: Volume1,
    label: 'Featured songs',
    queryKey: QUERY_KEY.FEATURED_SONGS,
  },
  {
    href: ROUTE_HREF.NEW_RELEASES,
    icon: Calendar,
    label: 'New releases',
    queryKey: QUERY_KEY.NEW_RELEASES,
  },
  {
    href: ROUTE_HREF.ARTISTS,
    icon: User,
    label: 'Artists',
    queryKey: QUERY_KEY.ARTISTS,
  },
];

export const ROUTES_ADMIN = {
  add: { href: '/admin/add', label: 'Add album' },
  base: { href: '/admin', label: 'Admin' },
  edit: { href: '/admin/edit/:id', label: 'Edit album' },
};

export const SPOTIFY_URL = 'https://open.spotify.com/search';
