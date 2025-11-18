import { Link } from 'react-router';
import { Disc } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export default function Home() {
  return (
    <Empty className="mx-auto w-fit border">
      <EmptyHeader>
        <EmptyMedia
          className="bg-sidebar-primary text-sidebar-primary-foreground"
          variant="icon"
        >
          <Disc />
        </EmptyMedia>
        <EmptyTitle>Perfect Albums</EmptyTitle>
        <EmptyDescription>The best music on the net</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link
          className="text-foreground hover:text-muted-foreground underline underline-offset-4"
          to="/albums"
        >
          Get started
        </Link>
      </EmptyContent>
    </Empty>
  );
}
