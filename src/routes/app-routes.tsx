import { BrowserRouter, Route, Routes } from 'react-router';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { QueryClientProvider } from '@tanstack/react-query';

import { AppSidebar } from '@/components/app-sidebar';
import { ROUTE_HREF, ROUTES_ADMIN } from '@/lib/constants';
import { queryClient } from '@/lib/query-client';
import AddAlbum from '@/routes/admin/add-album';
import Admin from '@/routes/admin/admin';
import AllTimeRankings from '@/routes/albums/all-time-rankings';
import Artists from '@/routes/artists/artists';
import EditAlbum from '@/routes/admin/edit-album';
import EditAllTimeRankings from '@/routes/albums/edit-all-time-rankings';
import EditRankings from '@/routes/albums/edit-rankings';
import FeaturedSongs from '@/routes/songs/featured-songs';
import Home from '@/routes/home/home';
import NewReleases from '@/routes/releases/new-releases';
import NotFound from '@/routes/not-found';
import Playlist from '@/routes/playlist/playlist';
import { PrivateRoute } from '@/components/private-route';
import { PublicRoute } from '@/components/public-route';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SessionProvider } from '@/components/session-provider';
import SignIn from '@/routes/signin/signin';
import SignOut from '@/routes/signout/signout';
import TailwindIndicator from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import TopAlbums from '@/routes/albums/top-albums';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <ThemeProvider>
              <Routes>
                <Route element={<AppSidebar />}>
                  <Route element={<PublicRoute />}>
                    <Route path={ROUTE_HREF.SIGNIN} element={<SignIn />} />
                  </Route>
                  <Route path="/" element={<Home />} />
                  <Route path={ROUTE_HREF.TOP_ALBUMS} element={<TopAlbums />} />
                  <Route
                    path={ROUTE_HREF.ALL_TIME}
                    element={<AllTimeRankings />}
                  />
                  <Route
                    path={ROUTE_HREF.FEATURED_SONGS}
                    element={<FeaturedSongs />}
                  />
                  <Route
                    path={ROUTE_HREF.NEW_RELEASES}
                    element={<NewReleases />}
                  />
                  <Route path={ROUTE_HREF.ARTISTS} element={<Artists />} />
                  <Route path={ROUTE_HREF.PLAYLIST} element={<Playlist />} />
                  <Route element={<PrivateRoute />}>
                    <Route
                      path={ROUTE_HREF.EDIT_RANKINGS}
                      element={<EditRankings />}
                    />
                    <Route
                      path={ROUTE_HREF.ALL_TIME_EDIT}
                      element={<EditAllTimeRankings />}
                    />
                    <Route path={ROUTES_ADMIN.base.href} element={<Admin />} />
                    <Route
                      path={ROUTES_ADMIN.add.href}
                      element={<AddAlbum />}
                    />
                    <Route
                      path={ROUTES_ADMIN.edit.href}
                      element={<EditAlbum />}
                    />
                    <Route path={ROUTE_HREF.SIGNOUT} element={<SignOut />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              <ScrollToTop />
              <TailwindIndicator />
              <Toaster position="top-right" richColors />
            </ThemeProvider>
          </SessionProvider>
        </QueryClientProvider>
      </NuqsAdapter>
    </BrowserRouter>
  );
}
