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
          <SidebarGroupLabel>Perfect Albums</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
