import { Link, useNavigate } from 'react-router';
import { Check, Disc, HeartPlus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminParams, useSerializedParams } from '@/hooks/admin-params';
import { useAdminData } from '@/hooks/fetch-data';
import { ROUTES_ADMIN } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { DataEmptyPlaceholder } from './data-empty-placeholder';
import { DataTablePagination } from './data-table-pagination';
import { DataTableSearch } from './data-table-search';
import { DataTableSortableColumn } from './data-table-sortable-column';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableResetFilters } from './data-table-reset-filters';

let lastArtist = '';

export default function Admin() {
  const navigate = useNavigate();
  const [adminParams] = useAdminParams();
  const serializedParams = useSerializedParams();
  const { data, isLoading } = useAdminData(adminParams);
  const { albums, count, cdCount } = data ?? {
    albums: [],
    count: 0,
    cdCount: 0,
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Link to={`${ROUTES_ADMIN.add.href}${serializedParams}`}>
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
          <DataTableFacetedFilter />
          <DataTableResetFilters />
        </div>
      </div>

      {!isLoading && albums.length === 0 ? (
        <div className="mt-4 flex justify-center">
          <DataEmptyPlaceholder />
        </div>
      ) : (
        <>
          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <DataTableSortableColumn sortKey="artist" />
                  <DataTableSortableColumn sortKey="year" />
                  <DataTableSortableColumn sortKey="title" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {albums.map((album) => {
                  const { artist } = album;
                  const firstAppearance = artist !== lastArtist;
                  lastArtist = artist;

                  return (
                    <TableRow
                      key={album.id}
                      className="cursor-pointer"
                      onClick={() => {
                        const to = `${ROUTES_ADMIN.edit.href.replace(':id', album.id.toString())}`;
                        navigate(`${to}${serializedParams}`);
                      }}
                    >
                      <TableCell>
                        <span className="flex items-center gap-1">
                          {artist}
                          {firstAppearance && <CopyButton value={artist} />}
                        </span>
                      </TableCell>
                      <TableCell>{album.year}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1">
                          {album.cd && (
                            <Disc className="inline size-4 text-muted-foreground" />
                          )}
                          {album.wishlist && (
                            <HeartPlus className="inline size-4 text-muted-foreground" />
                          )}
                          <span
                            className={cn(
                              album.studio ? 'font-medium' : 'font-light',
                            )}
                          >
                            {album.title}
                          </span>
                          {album.favorite && (
                            <Check className="inline size-4 text-muted-foreground" />
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination total={count} />
        </>
      )}
    </>
  );
}
