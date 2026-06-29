import { CircleX, Info } from 'lucide-react';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { MESSAGE } from '@/lib/constants';
import type { Callback, Icon } from '@/lib/types';

type Variant = 'default' | 'destructive';

interface Props {
  className?: string;
  description?: string;
  onError?: Callback;
  title?: string;
  variant?: Variant;
}

const icons: Record<Variant, Icon> = {
  default: Info,
  destructive: CircleX,
};

export function AppMessage({
  className = '',
  description = MESSAGE.ERROR,
  onError,
  title = 'Error',
  variant = 'destructive',
}: Props) {
  const IconComponent = icons[variant];

  return (
    <Alert className={className} variant={variant}>
      <IconComponent aria-hidden="true" className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {onError && (
        <AlertAction>
          <Button onClick={onError} size="xs" variant="outline">
            Retry
          </Button>
        </AlertAction>
      )}
    </Alert>
  );
}
