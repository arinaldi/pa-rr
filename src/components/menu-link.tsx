import { NavLink, useLocation } from 'react-router';

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Icon } from '@/lib/types';

interface Props {
  icon: Icon;
  label: string;
  to: string;
}

export default function MenuLink(props: Props) {
  const { label, to } = props;
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();
  const active = pathname.startsWith(to);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        <NavLink
          className="group/link"
          onClick={() => setOpenMobile(false)}
          to={to}
        >
          {({ isActive }) => (
            <>
              <props.icon
                className={cn(
                  'group-hover/link:text-primary group-hover/link:font-medium',
                  isActive ? '' : 'text-muted-foreground',
                )}
              />
              <span
                className={cn(
                  'group-hover/link:text-primary group-hover/link:font-medium',
                  isActive ? 'font-medium' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
