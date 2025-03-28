import { createBrowserRouter } from 'react-router';

import Test from '@/components/test';
import { getAlbums, getReleases, getSongs } from '@/supabase/data';
import ErrorPage from './error-page';
import FeaturedSongs from './routes/songs/featured-songs';
import NewReleases from './routes/releases/new-releases';
import TopAlbums from './routes/albums/top-albums';
import Root from './routes/root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    HydrateFallback: () => <div>Loading...</div>,
    children: [
      {
        path: '/albums',
        Component: TopAlbums,
        loader: getAlbums,
      },
      {
        path: '/artists',
        Component: Test,
      },
      {
        path: '/dashboard',
        Component: Test,
      },
      {
        path: '/releases',
        Component: NewReleases,
        loader: getReleases,
      },
      {
        path: '/songs',
        Component: FeaturedSongs,
        loader: getSongs,
      },
    ],
  },
]);
