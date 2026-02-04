import { useLocation } from 'react-router';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCount } from '@/hooks/count';
import { APP_NAME, ROUTES, ROUTES_ADMIN } from '@/lib/constants';

export default function PageTitle() {
  const count = useCount();
  const { pathname } = useLocation();
  const currentRoute = ROUTES.find((r) => pathname.startsWith(r.href));
  let title = currentRoute?.label;

  if (!title && pathname.startsWith(ROUTES_ADMIN.base.href)) {
    title = ROUTES_ADMIN.base.label;
  }

  return (
    <>
      <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
      {title && (
        <>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <span className="flex items-center gap-2">
            <h1 className="text-sm">{title}</h1>
            <Badge variant="secondary">{count.toLocaleString()}</Badge>
          </span>
        </>
      )}
    </>
  );
}
