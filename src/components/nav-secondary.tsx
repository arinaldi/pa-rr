import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { LogIn, LogOut } from 'lucide-react';

import { useSession } from '@/components/session-provider';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ROUTE_HREF } from '@/lib/constants';
import { supabase } from '@/supabase/client';

export function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const navigate = useNavigate();
  const session = useSession();
  const { setOpenMobile } = useSidebar();

  function signIn() {
    setOpenMobile(false);
    navigate(ROUTE_HREF.SIGNIN);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {session ? (
              <SidebarMenuButton onClick={signOut} size="sm">
                <LogOut />
                <span>Sign out</span>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton onClick={signIn} size="sm">
                <LogIn />
                <span>Sign in</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
