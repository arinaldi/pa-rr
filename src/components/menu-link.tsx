import { NavLink } from 'react-router';

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
  const { setOpenMobile } = useSidebar();

  function onClose() {
    setOpenMobile(false);
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink onClick={onClose} to={to}>
          {({ isActive }) => (
            <>
              <props.icon
                className={cn(isActive ? '' : 'text-muted-foreground')}
              />
              <span
                className={cn(
                  isActive ? 'font-semibold' : 'text-muted-foreground',
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
