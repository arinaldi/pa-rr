import { startTransition, useOptimistic, useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { parsePageQuery, parsePerPageQuery } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { DataTablePerPage } from './data-table-per-page';

interface Props {
  total: number;
}

export function DataTablePagination({ total }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(() =>
    parsePageQuery(searchParams.get('page')),
  );
  const [optimisticValue, setOptimisticValue] = useOptimistic(page);
  const perPage = parsePerPageQuery(searchParams.get('per_page'));
  const lastPage = Math.ceil(total / perPage);
  const isFirstPage = optimisticValue === 1;
  const isLastPage = optimisticValue === lastPage;

  function goToPage(value: number) {
    startTransition(() => {
      setPage(value);
      setOptimisticValue(value);
      setSearchParams((prev) => {
        prev.set('page', value.toString());

        return prev;
      });
    });
  }

  return (
    <>
      {/* Desktop version */}
      <Pagination className="mt-4 hidden sm:flex sm:items-center sm:justify-end">
        <div className="flex items-center gap-10">
          <DataTablePerPage />
          <p className="text-sm font-medium">
            Page {optimisticValue.toLocaleString()} of{' '}
            {lastPage.toLocaleString()}
          </p>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button
                disabled={isFirstPage}
                onClick={() => goToPage(1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={isFirstPage}
                onClick={() => goToPage(optimisticValue - 1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={isLastPage}
                onClick={() => goToPage(optimisticValue + 1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={isLastPage}
                onClick={() => goToPage(lastPage)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </div>
      </Pagination>
      {/* Mobile version */}
      <Pagination className="mt-4 flex flex-col gap-4 sm:hidden">
        <div className="flex items-center gap-4">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button
                disabled={isFirstPage}
                onClick={() => goToPage(optimisticValue - 1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={isLastPage}
                onClick={() => goToPage(optimisticValue + 1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
          <p className="text-sm font-medium">
            Page {optimisticValue.toLocaleString()} of{' '}
            {lastPage.toLocaleString()}
          </p>
        </div>
      </Pagination>
    </>
  );
}
