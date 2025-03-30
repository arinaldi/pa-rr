import { useRouteError } from 'react-router';

import AppMessage from '@/components/app-message';

export default function ErrorPage() {
  const error = useRouteError();
  const description = error instanceof Error ? error.message : undefined;

  return (
    <div className="flex justify-center mt-4">
      <AppMessage className="min-w-[12rem] w-fit" description={description} />
    </div>
  );
}
