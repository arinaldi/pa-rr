import { Lock } from 'lucide-react';

import MenuLink from '@/components/menu-link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ROUTES, ROUTES_ADMIN } from '@/lib/constants';
import { Children } from '@/lib/types';
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
                  <MenuLink
                    key={r.label}
                    icon={r.icon}
                    label={r.label}
                    to={r.href}
                  />
                ))}
                {session && (
                  <MenuLink
                    icon={Lock}
                    label={ROUTES_ADMIN.base.label}
                    to={ROUTES_ADMIN.base.href}
                  />
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
