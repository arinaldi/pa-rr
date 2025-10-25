import { useState } from 'react';
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router';
import { Check, Disc, HeartPlus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ADMIN_QUERY_KEY, ROUTES_ADMIN } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { getAdminData } from '@/supabase/data';
import { DataEmptyPlaceholder } from './data-empty-placeholder';
import { DataTablePagination } from './data-table-pagination';
import { DataTableSearch } from './data-table-search';
import { DataTableSortableColumn } from './data-table-sortable-column';
import { DataTableAlbumActions } from './data-table-album-actions';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableResetFilters } from './data-table-reset-filters';

export default function Admin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.getAll(ADMIN_QUERY_KEY));
  const { albums, cdCount, count } = useLoaderData<typeof getAdminData>();

  function updateQuery(value: string[]) {
    setQuery(value);
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Link to={`${ROUTES_ADMIN.add.href}?${searchParams.toString()}`}>
          <Button type="button">Add album</Button>
        </Link>
        <div className="flex items-center gap-4 dark:text-white">
          <code className="text-xs">{__APP_VERSION__}</code>
          <span className="flex items-center gap-0.5">
            <Badge variant="secondary">{cdCount.toLocaleString()}</Badge>
            <span className="text-sm leading-7">
              CD{cdCount === 1 ? '' : 's'}
            </span>
          </span>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center">
        <DataTableSearch autoFocus />
        <div className="flex flex-wrap items-center gap-2">
          <DataTableFacetedFilter query={query} updateQuery={updateQuery} />
          <DataTableResetFilters updateQuery={updateQuery} />
        </div>
      </div>

      {albums?.length === 0 ? (
        <div className="mt-4 flex justify-center">
          <DataEmptyPlaceholder />
        </div>
      ) : (
        <>
          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <DataTableSortableColumn prop="artist">
                    Artist
                  </DataTableSortableColumn>
                  <DataTableSortableColumn prop="year">
                    Year
                  </DataTableSortableColumn>
                  <DataTableSortableColumn prop="title">
                    Title
                  </DataTableSortableColumn>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {albums.map((a) => (
                  <TableRow
                    key={a.id}
                    className="cursor-pointer"
                    onClick={() => {
                      const to = `${ROUTES_ADMIN.edit.href.replace(':id', a.id.toString())}`;

                      navigate(`${to}?${searchParams}`);
                    }}
                  >
                    <TableCell>{a.artist}</TableCell>
                    <TableCell>{a.year}</TableCell>
                    <TableCell>
                      {a.cd && (
                        <Disc className="text-muted-foreground mr-1 mb-0.5 inline size-4" />
                      )}
                      {a.wishlist && (
                        <HeartPlus className="text-muted-foreground mr-1 mb-0.5 inline size-4" />
                      )}
                      <span
                        className={cn(a.studio ? 'font-medium' : 'font-light')}
                      >
                        {a.title}
                      </span>
                      {a.favorite && (
                        <Check className="text-muted-foreground mb-0.5 ml-1 inline size-4" />
                      )}
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <DataTableAlbumActions album={a} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination total={count} />
        </>
      )}
    </>
  );
}
