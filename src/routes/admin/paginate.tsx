import { Link, useSearchParams } from 'react-router';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

import {
  parsePageQuery,
  parsePerPageQuery,
  parseStudioQuery,
} from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import PerPage from './per-page';
import StudioFilter from './studio-filter';

interface Props {
  total: number;
}

export default function Paginate({ total }: Props) {
  const [searchParams] = useSearchParams();
  const page = parsePageQuery(searchParams.get('page'));
  const perPage = parsePerPageQuery(searchParams.get('perPage'));
  const studio = parseStudioQuery(searchParams.get('studio'));
  const lastPage = Math.ceil(total / perPage);
  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  function getHref(pageValue: number) {
    const query = new URLSearchParams(searchParams);
    query.set('page', pageValue.toString());

    return `?${query.toString()}`;
  }

  return (
    <>
      {/* Desktop version */}
      <Pagination className="hidden sm:flex sm:items-center sm:justify-between sm:gap-8">
        <StudioFilter studio={studio} />
        <div className="flex items-center gap-8">
          <PerPage perPage={perPage} />
          <p className="text-sm font-medium">
            Page {page.toLocaleString()} of {lastPage.toLocaleString()}
          </p>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isFirstPage}
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  to={getHref(1)}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeftIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isFirstPage}
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  to={getHref(page - 1)}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isLastPage}
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  to={getHref(page + 1)}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isLastPage}
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  to={getHref(lastPage)}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRightIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </div>
      </Pagination>
      {/* Mobile version */}
      <Pagination className="flex items-center justify-between gap-2 sm:hidden">
        <div className="flex items-center gap-4">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isFirstPage}
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  to={getHref(page - 1)}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isLastPage}
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  to={getHref(page + 1)}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
          </PaginationContent>
          <p className="text-sm font-medium">
            Page {page.toLocaleString()} of {lastPage.toLocaleString()}
          </p>
        </div>
        <StudioFilter studio={studio} />
      </Pagination>
    </>
  );
}
