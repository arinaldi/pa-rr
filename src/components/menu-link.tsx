import { NavLink, useLocation } from 'react-router';

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Route } from '@/lib/types';

interface Props {
  route: Route;
}

export default function MenuLink({ route }: Props) {
  const { href, items, label } = route;
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();
  const pathMatch = pathname === href;
  const active = items ? pathMatch : pathname.startsWith(href);
  const parentActive = items ? pathMatch : true;

  function closeMobile() {
    setOpenMobile(false);
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        <NavLink onClick={closeMobile} to={href}>
          {({ isActive }) => (
            <>
              <route.icon
                className={cn(
                  isActive && parentActive ? '' : 'text-muted-foreground',
                )}
              />
              <span
                className={cn(
                  isActive && parentActive
                    ? 'font-medium'
                    : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
      {items && (
        <SidebarMenuSub>
          {items.map((item) => {
            const subActive = pathname.startsWith(item.href);

            return (
              <SidebarMenuSubItem key={item.label}>
                <SidebarMenuSubButton asChild isActive={subActive}>
                  <NavLink onClick={closeMobile} to={item.href}>
                    {({ isActive }) => (
                      <span
                        className={cn(
                          isActive ? 'font-medium' : 'text-muted-foreground',
                        )}
                      >
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}
