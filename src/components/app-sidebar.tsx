import { NavLink } from 'react-router';
import { Lock } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ROUTES, ROUTES_ADMIN } from '@/lib/constants';
import { Children } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSession } from './session-provider';
import UserMenu from './user-menu';

export function AppSidebar({ children }: Children) {
  const session = useSession();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="font-semibold tracking-widest uppercase">
              Perfect Albums
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ROUTES.map((r) => (
                  <SidebarMenuItem key={r.label}>
                    <SidebarMenuButton asChild>
                      <NavLink to={r.href}>
                        {({ isActive }) => (
                          <>
                            <r.icon
                              className={cn(
                                isActive ? '' : 'text-muted-foreground',
                              )}
                            />
                            <span
                              className={cn(
                                isActive
                                  ? 'font-semibold'
                                  : 'text-muted-foreground',
                              )}
                            >
                              {r.label}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {session && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to={ROUTES_ADMIN.base.href}>
                        {({ isActive }) => (
                          <>
                            <Lock
                              className={cn(
                                isActive ? '' : 'text-muted-foreground',
                              )}
                            />
                            <span
                              className={cn(
                                isActive
                                  ? 'font-semibold'
                                  : 'text-muted-foreground',
                              )}
                            >
                              {ROUTES_ADMIN.base.label}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <UserMenu />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="flex w-full flex-col">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
