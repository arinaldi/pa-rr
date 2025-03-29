import { createBrowserRouter } from 'react-router';

import Test from '@/components/test';
import { getAlbums, getArtists, getReleases, getSongs } from '@/supabase/data';
import Artists from './routes/artists/artists';
import ErrorPage from './error-page';
import FeaturedSongs from './routes/songs/featured-songs';
import NewReleases from './routes/releases/new-releases';
import Root from './routes/root';
import SignIn from './routes/signin/signin';
import TopAlbums from './routes/albums/top-albums';

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
        Component: Artists,
        loader: getArtists,
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
        path: '/signin',
        Component: SignIn,
      },
      {
        path: '/songs',
        Component: FeaturedSongs,
        loader: getSongs,
      },
    ],
  },
]);
