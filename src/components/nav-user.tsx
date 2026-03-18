import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { Session } from '@/components/session-provider';

interface Props {
  user: Session['user'];
}

export function NavUser({ user }: Props) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="hover:bg-transparent active:bg-transparent"
          size="lg"
        >
          <Avatar className="size-8">
            <AvatarImage
              alt={`Avatar for ${user.user_metadata.name}`}
              className="bg-gray-300"
              src="/avatars/03.png"
            />
            <AvatarFallback className="rounded-lg">
              {`${user.user_metadata.firstName[0]}${user.user_metadata.lastName[0]}`}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {user.user_metadata.name}
            </span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
