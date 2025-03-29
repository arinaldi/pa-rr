import { Outlet } from 'react-router';

import { AppSidebar } from '@/components/app-sidebar';
import { SessionProvider } from '@/components/session-provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

export default function Root() {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="isolate w-full">
          <Outlet />
        </main>
        <Toaster position="top-right" richColors />
      </SidebarProvider>
    </SessionProvider>
  );
}
