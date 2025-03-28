import { createBrowserRouter } from 'react-router';

import Test from '@/components/test';
import { getAlbums, getSongs } from '@/supabase/data';
import ErrorPage from './error-page';
import FeaturedSongs from './routes/songs/featured-songs';
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
        Component: Test,
      },
      {
        path: '/songs',
        Component: FeaturedSongs,
        loader: getSongs,
      },
    ],
  },
]);
