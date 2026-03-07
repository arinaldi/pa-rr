import { NavLink, useLocation } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { QUERY_OPTIONS } from '@/hooks/fetch-data';
import type { QueryKey, Route } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface Props {
  route: Route;
}

export default function MenuLink({ route }: Props) {
  const { href, items, label } = route;
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const { setOpenMobile } = useSidebar();
  const pathMatch = pathname === href;
  const active = items ? pathMatch : pathname.startsWith(href);
  const parentActive = items ? pathMatch : true;

  function closeMobile() {
    setOpenMobile(false);
  }

  function prefetch(key: QueryKey) {
    const options = QUERY_OPTIONS[key];

    queryClient.prefetchQuery({
      ...options,
      staleTime: 60_000,
    });
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        <NavLink
          onClick={closeMobile}
          onFocus={() => prefetch(route.queryKey)}
          onMouseEnter={() => prefetch(route.queryKey)}
          to={href}
        >
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
                  <NavLink
                    onClick={closeMobile}
                    onFocus={() => prefetch(item.queryKey)}
                    onMouseEnter={() => prefetch(item.queryKey)}
                    to={item.href}
                  >
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
