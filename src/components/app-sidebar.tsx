import { Link, Outlet } from 'react-router';
import { Disc, Lock } from 'lucide-react';

import MenuLink from '@/components/menu-link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SIDEBAR_COOKIE_NAME,
} from '@/components/ui/sidebar';
import { APP_NAME, QUERY_KEY, ROUTES, ROUTES_ADMIN } from '@/lib/constants';
import { getCookie } from '@/lib/utils';
import { useSession } from './session-provider';
import PageTitle from './page-title';
import { ThemeSelector } from './theme-selector';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';

export function AppSidebar() {
  const session = useSession();
  const sidebarState = getCookie(SIDEBAR_COOKIE_NAME);
  let defaultOpen = true;

  if (sidebarState) {
    defaultOpen = sidebarState === 'true';
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Disc className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{APP_NAME}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      The best music on the net
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Links</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ROUTES.map((r) => (
                  <MenuLink key={r.href} route={r} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {session && (
            <SidebarGroup>
              <SidebarGroupLabel>Protected</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <MenuLink
                    route={{
                      href: ROUTES_ADMIN.base.href,
                      icon: Lock,
                      label: ROUTES_ADMIN.base.label,
                      queryKey: QUERY_KEY.ALBUMS,
                    }}
                  />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          <NavSecondary className="mt-auto" />
        </SidebarContent>
        {session && (
          <SidebarFooter>
            <NavUser user={session.user} />
          </SidebarFooter>
        )}
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <PageTitle />
            </div>
            <ThemeSelector />
          </div>
        </header>
        <div className="isolate p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
