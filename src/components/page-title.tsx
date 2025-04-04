import { Link, useLocation, useMatches } from 'react-router';

import { Badge } from '@/components/ui/badge';
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type LoaderData = {
  count: number;
  parents?: {
    href: string;
    title: string;
  }[];
  title: string;
};

export default function PageTitle() {
  const { pathname } = useLocation();
  const matches = useMatches();
  const match = matches.find((m) => m.pathname === pathname);
  const data = match?.data as LoaderData;

  if (!data) return null;

  return (
    <>
      <BreadcrumbSeparator className="hidden md:block" />
      {data.parents && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-1 md:hidden"
            aria-label="Toggle menu"
          >
            <BreadcrumbEllipsis className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {data.parents.map((p) => (
              <DropdownMenuItem key={p.href}>
                <Link to={p.href}>{p.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {data.parents?.map((p) => (
        <BreadcrumbItem className="hidden md:block" key={p.href}>
          <BreadcrumbLink to={p.href}>{p.title}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
      {data.parents && <BreadcrumbSeparator />}
      <BreadcrumbItem>
        <BreadcrumbPage>
          <span className="flex items-center gap-2">
            <span>{data.title}</span>
            {data.count !== undefined && (
              <Badge variant="secondary">{data.count.toLocaleString()}</Badge>
            )}
          </span>
        </BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}
