import { Outlet } from 'react-router';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Root() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="isolate">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
