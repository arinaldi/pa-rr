import { useLocation, useNavigate } from 'react-router';
import { ChevronUp, CircleUser } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { useSession } from '@/components/session-provider';
import { useTheme, type Theme } from '@/components/theme-provider';
import { ROUTE_HREF, ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';

export default function UserMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const session = useSession();
  const { setTheme, theme } = useTheme();

  function onValueChange(value: string) {
    setTheme(value as Theme);
  }

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
      <DropdownMenuContent className="w-44" forceMount side="top">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup onValueChange={onValueChange} value={theme}>
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {session ? (
          <DropdownMenuItem onSelect={signOut}>Sign out</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onSelect={() => navigate(ROUTE_HREF.SIGNIN)}>
            Sign in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
