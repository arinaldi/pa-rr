import { Link, useLoaderData, useSearchParams } from 'react-router';
import { CheckIcon, DiscIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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

export default function Admin() {
  const [searchParams] = useSearchParams();
  const { albums, cdCount, count } = useLoaderData<typeof getAdminData>();

  return (
    <div className="space-y-4">
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
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <Search autoFocus type="artist" />
        <Search type="title" />
      </div>

      {albums?.length === 0 ? (
        <div className="flex justify-center">
          <DataEmptyPlaceholder />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="text-xs tracking-wider uppercase">
              <SortableColumn prop="artist">Artist</SortableColumn>
              <SortableColumn prop="title">Title</SortableColumn>
              <SortableColumn prop="year">Year</SortableColumn>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {albums.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.artist}</TableCell>
                <TableCell>
                  {a.cd && <DiscIcon className="mr-1 mb-0.5 inline size-4" />}
                  <span
                    className={cn(
                      a.studio ? 'font-medium' : 'font-light',
                      a.favorite ? 'italic' : '',
                    )}
                  >
                    {a.title}
                  </span>
                  {a.favorite && (
                    <CheckIcon className="mb-0.5 ml-1 inline size-4" />
                  )}
                </TableCell>
                <TableCell>{a.year}</TableCell>
                <TableCell className="text-right">
                  <TableLink id={a.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <Paginate total={count} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
