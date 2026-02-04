import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { useAdminParams } from '@/hooks/admin-params';
import { DataTablePerPage } from './data-table-per-page';

interface Props {
  total: number;
}

export function DataTablePagination({ total }: Props) {
  const [{ page, perPage }, setAdminParams] = useAdminParams();
  const lastPage = Math.ceil(total / perPage);
  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  function setPage(value: number) {
    setAdminParams({ page: value });
  }

  return (
    <>
      {/* Desktop version */}
      <Pagination className="mt-4 hidden px-2 sm:flex sm:items-center sm:justify-end">
        <div className="flex items-center gap-10">
          <DataTablePerPage />
          <p className="text-sm font-medium">
            Page {page.toLocaleString()} of {lastPage.toLocaleString()}
          </p>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button
                disabled={isFirstPage}
                onClick={() => setPage(1)}
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
                onClick={() => setPage(page - 1)}
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
                onClick={() => setPage(page + 1)}
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
                onClick={() => setPage(lastPage)}
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
      <Pagination className="mt-4 justify-end px-2 sm:hidden">
        <div className="flex items-center gap-4">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button
                disabled={isFirstPage}
                onClick={() => setPage(page - 1)}
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
                onClick={() => setPage(page + 1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
          <p className="text-sm font-medium">
            Page {page.toLocaleString()} of {lastPage.toLocaleString()}
          </p>
        </div>
      </Pagination>
    </>
  );
}
