import { Link } from 'react-router';
import { ArrowUp } from 'lucide-react';

export default function TopLink() {
  return (
    <Link
      className="text-muted-foreground fixed right-0 bottom-0 p-5 text-sm"
      to={{ hash: '#top' }}
    >
      <ArrowUp className="mr-1 inline size-4" />
      <span>Top</span>
    </Link>
  );
}
