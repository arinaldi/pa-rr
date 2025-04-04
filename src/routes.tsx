import { createBrowserRouter, redirect } from 'react-router';

import { Fallback } from '@/components/fallback';
import { ROUTE_HREF, ROUTES_ADMIN } from '@/lib/constants';
import AddAlbum from '@/routes/admin/add-album';
import Admin from '@/routes/admin/admin';
import AllTimeRankings from '@/routes/albums/all-time-rankings';
import Artists from '@/routes/artists/artists';
import EditAlbum from '@/routes/admin/edit-album';
import EditAllTimeRankings from '@/routes/albums/edit-all-time-rankings';
import EditRankings from '@/routes/albums/edit-rankings';
import FeaturedSongs from '@/routes/songs/featured-songs';
import NewReleases from '@/routes/releases/new-releases';
import NotFound from '@/routes/not-found';
import Playlist from '@/routes/playlist/playlist';
import Root from '@/routes/root';
import SignIn from '@/routes/signin/signin';
import SignOut from '@/routes/signout/signout';
import TopAlbums from '@/routes/albums/top-albums';
import { supabase } from '@/supabase/client';
import {
  getAdminData,
  getAlbum,
  getAllTimeData,
  getAllTimeRankings,
  getArtists,
  getFavorites,
  getRankingsByYear,
  getReleases,
  getSongs,
} from '@/supabase/data';
import ErrorPage from './error-page';

async function validateSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw redirect(ROUTE_HREF.TOP_ALBUMS);
  }

  return true;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    HydrateFallback: Fallback,
    children: [
      {
        path: ROUTES_ADMIN.base.href,
        Component: Admin,
        loader: async (args) => {
          await validateSession();

          const data = await getAdminData(args);

          return {
            ...data,
            title: 'Admin',
          };
        },
      },
      {
        path: ROUTES_ADMIN.add.href,
        Component: AddAlbum,
        loader: async () => {
          await validateSession();

          return {
            parents: [
              {
                href: ROUTES_ADMIN.base.href,
                title: 'Admin',
              },
            ],
            title: 'Add album',
          };
        },
      },
      {
        id: ROUTES_ADMIN.edit.href,
        path: ROUTES_ADMIN.edit.href,
        Component: EditAlbum,
        loader: async (args) => {
          await validateSession();

          const data = await getAlbum(args);

          return {
            ...data,
            parents: [
              {
                href: ROUTES_ADMIN.base.href,
                title: 'Admin',
              },
            ],
            title: 'Edit album',
          };
        },
      },
      {
        path: ROUTE_HREF.TOP_ALBUMS,
        Component: TopAlbums,
        loader: async () => {
          const data = await getFavorites();

          return {
            ...data,
            title: 'Top albums',
          };
        },
      },
      {
        path: ROUTE_HREF.ALL_TIME,
        Component: AllTimeRankings,
        loader: async () => {
          const data = await getAllTimeRankings();

          return {
            ...data,
            parents: [
              {
                href: ROUTE_HREF.TOP_ALBUMS,
                title: 'Top albums',
              },
            ],
            title: 'All-time albums',
          };
        },
      },
      {
        path: ROUTE_HREF.ALL_TIME_EDIT,
        Component: EditAllTimeRankings,
        loader: async (args) => {
          await validateSession();

          const data = await getAllTimeData(args);

          return {
            ...data,
            parents: [
              {
                href: ROUTE_HREF.TOP_ALBUMS,
                title: 'Top albums',
              },
              {
                href: ROUTE_HREF.ALL_TIME,
                title: 'All-time albums',
              },
            ],
            title: 'Edit all-time rankings',
          };
        },
      },
      {
        path: ROUTE_HREF.EDIT_RANKINGS,
        Component: EditRankings,
        loader: async (args) => {
          await validateSession();

          const data = await getRankingsByYear(args);

          return {
            ...data,
            parents: [
              {
                href: ROUTE_HREF.TOP_ALBUMS,
                title: 'Top albums',
              },
            ],
            title: args.params.year
              ? `Rankings for ${args.params.year}`
              : 'Rankings',
          };
        },
      },
      {
        path: ROUTE_HREF.ARTISTS,
        Component: Artists,
        loader: async () => {
          const data = await getArtists();

          return {
            ...data,
            title: 'Artists',
          };
        },
      },
      {
        path: ROUTE_HREF.NEW_RELEASES,
        Component: NewReleases,
        loader: async () => {
          const data = await getReleases();

          return {
            ...data,
            title: 'New releases',
          };
        },
      },
      {
        path: ROUTE_HREF.PLAYLIST,
        Component: Playlist,
        loader: () => ({ title: 'Playlist' }),
      },
      {
        path: ROUTE_HREF.SIGNIN,
        Component: SignIn,
        loader: async () => {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session) {
            return redirect(ROUTES_ADMIN.base.href);
          }

          return { title: 'Sign in' };
        },
      },
      {
        path: ROUTE_HREF.SIGNOUT,
        Component: SignOut,
        loader: () => ({ title: 'Sign out' }),
      },
      {
        path: ROUTE_HREF.FEATURED_SONGS,
        Component: FeaturedSongs,
        loader: async () => {
          const data = await getSongs();

          return {
            ...data,
            title: 'Featured songs',
          };
        },
      },
      {
        path: '*',
        Component: NotFound,
        loader: () => ({ title: 'Not found' }),
      },
    ],
  },
]);
