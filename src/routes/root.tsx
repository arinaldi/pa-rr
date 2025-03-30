import { Outlet } from 'react-router';

import { AppSidebar } from '@/components/app-sidebar';
import { SessionProvider } from '@/components/session-provider';
import { Toaster } from '@/components/ui/sonner';

export default function Root() {
  return (
    <SessionProvider>
      <AppSidebar>
        <main className="isolate">
          <Outlet />
        </main>
        <Toaster position="top-right" richColors />
      </AppSidebar>
    </SessionProvider>
  );
}
