import { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Children } from '@/lib/types';

interface Props extends Children {
  className?: string;
  title: ReactNode;
  titleAction?: ReactNode;
}

export default function AppLayout({
  children,
  className = '',
  title,
  titleAction,
}: Props) {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 pt-2 pb-8 md:px-8', className)}>
      <div className="mb-4 flex min-h-[40px] items-start justify-between md:items-center">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        {titleAction}
      </div>
      <div className="relative flex-auto">{children}</div>
    </div>
  );
}
