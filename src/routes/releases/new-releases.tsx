import { useLoaderData } from 'react-router';

import AppLayout from '@/components/app-layout';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getReleases } from '@/supabase/data';
import AddReleaseModal from './add-release-modal';
import ReleaseActions from './release-actions';

export default function NewReleases() {
  const { count, releases } = useLoaderData<typeof getReleases>();

  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>New releases</span>
          <Badge variant="secondary">{count.toLocaleString()}</Badge>
        </div>
      }
      titleAction={<AddReleaseModal />}
    >
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {Object.entries(releases)
          .sort((a, b) => {
            const dateA = a[0] === 'TBD' ? a[0] : new Date(a[0]).toISOString();
            const dateB = b[0] === 'TBD' ? b[0] : new Date(b[0]).toISOString();

            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
          })
          .map(([date, data]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle>{date}</CardTitle>
                <CardDescription>
                  {data.length.toLocaleString()} release
                  {data.length > 1 && 's'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {data.map((r) => (
                    <li key={r.id} className="text-sm">
                      <span className="flex items-start justify-between gap-4">
                        <span>
                          <span className="text-muted-foreground">
                            {r.artist} &ndash;
                          </span>{' '}
                          {r.title}
                        </span>
                        {<ReleaseActions release={r} />}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
      </div>
    </AppLayout>
  );
}
