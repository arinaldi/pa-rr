import { NavLink, useLocation, useNavigate } from 'react-router';
import { ChevronUp, CircleUser } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { ROUTE_HREF, ROUTES, ROUTES_ADMIN } from '@/lib/constants';
import { Children } from '@/lib/types';
import { cn } from '@/lib/utils';
import { supabase } from '@/supabase/client';
import { useSession } from './session-provider';

export function AppSidebar({ children }: Children) {
  const session = useSession();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    if (pathname.startsWith(ROUTES_ADMIN.base.href)) {
      navigate(ROUTE_HREF.TOP_ALBUMS);
    }
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase tracking-widest font-semibold">
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
                                isActive ? '' : 'text-muted-foreground'
                              )}
                            />
                            <span
                              className={cn(
                                isActive
                                  ? 'font-semibold'
                                  : 'text-muted-foreground'
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
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    {session ? (
                      <>
                        <Avatar className="size-8">
                          <AvatarImage src="/avatars/02.png" />
                          <AvatarFallback>
                            {`${session.user.user_metadata.firstName[0]}${session.user.user_metadata.lastName[0]}`}
                          </AvatarFallback>
                        </Avatar>
                        {session.user.user_metadata.name}
                      </>
                    ) : (
                      <CircleUser />
                    )}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  {session ? (
                    <DropdownMenuItem onSelect={signOut}>
                      Sign out
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onSelect={() => navigate(ROUTE_HREF.SIGNIN)}
                    >
                      Sign in
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-col w-full">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
