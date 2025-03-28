import { NavLink } from 'react-router';
import {
  Calendar,
  Layers3,
  LayoutDashboard,
  User,
  Volume1,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const items = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    icon: Layers3,
    title: 'Top albums',
    url: '/albums',
  },
  {
    icon: Volume1,
    title: 'Featured songs',
    url: '/songs',
  },
  {
    icon: Calendar,
    title: 'New releases',
    url: '/releases',
  },
  {
    icon: User,
    title: 'Artists',
    url: '/artists',
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase tracking-widest font-semibold">
            Perfect Albums
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      {({ isActive }) => (
                        <>
                          <item.icon
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
                            {item.title}
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
    </Sidebar>
  );
}
