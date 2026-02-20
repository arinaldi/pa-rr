import { ArrowUp } from 'lucide-react';

export default function TopLink() {
  return (
    <a
      className="text-muted-foreground fixed right-0 bottom-0 p-5 text-sm"
      href="#top"
    >
      <ArrowUp className="mr-1 inline size-4" />
      <span>Top</span>
    </a>
  );
}
