import { AppSidebar } from '@/components/app-sidebar';
import { SessionProvider } from '@/components/session-provider';
import TailwindIndicator from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export default function Root() {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AppSidebar />
        <TailwindIndicator />
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </SessionProvider>
  );
}
