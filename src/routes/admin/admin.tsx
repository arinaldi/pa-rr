import { Link, useLoaderData, useSearchParams } from 'react-router';
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
import { cn } from '@/lib/utils';
import { getAdminData } from '@/supabase/data';
import DataEmptyPlaceholder from './data-empty-placeholder';
import Paginate from './paginate';
import Search from './search';
import SortableColumn from './sortable-column';
import TableLink from './table-link';
import { ROUTES_ADMIN } from '@/lib/constants';
import AlbumActions from './album-actions';
import FacetedFilter from './faceted-filter';
import ResetFilters from './reset-filters';

export default function Admin() {
  const [searchParams] = useSearchParams();
  const { albums, cdCount, count } = useLoaderData<typeof getAdminData>();

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
      <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-center">
        <Search autoFocus />
        <div className="flex flex-wrap items-center gap-2">
          <FacetedFilter queryKey="cd" title="CD" />
          <FacetedFilter queryKey="favorite" title="Favorite" />
          <FacetedFilter queryKey="studio" title="Studio" />
          <FacetedFilter queryKey="wishlist" title="Wishlist" />
          <ResetFilters queryKeys={['cd', 'favorite', 'studio', 'wishlist']} />
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
                  <SortableColumn prop="artist">Artist</SortableColumn>
                  <SortableColumn prop="year">Year</SortableColumn>
                  <SortableColumn prop="title">Title</SortableColumn>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {albums.map((a) => (
                  <TableRow key={a.id}>
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
                        className={cn(
                          a.studio ? 'font-medium' : 'font-light',
                          a.favorite && 'italic',
                        )}
                      >
                        {a.title}
                      </span>
                      {a.favorite && (
                        <Check className="text-muted-foreground mb-0.5 ml-1 inline size-4" />
                      )}
                    </TableCell>
                    <TableCell className="flex items-end justify-end gap-2">
                      <AlbumActions album={a} />
                      <TableLink id={a.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Paginate total={count} />
        </>
      )}
    </>
  );
}
