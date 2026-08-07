import { SunMoon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function ThemeSelector() {
  const { toggleTheme } = useTheme();

  return (
    <Button
      className="-mr-1 size-7 rounded-full"
      onClick={toggleTheme}
      size="icon"
      variant="ghost"
    >
      <SunMoon />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
