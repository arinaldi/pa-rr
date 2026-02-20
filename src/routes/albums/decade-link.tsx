import { Fragment } from 'react';

import { DECADES } from '@/lib/constants';

export default function DecadeLink() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {DECADES.map((d, index) => (
        <Fragment key={d.id}>
          <a
            className="hover:text-muted-foreground underline underline-offset-4"
            href={`#${d.id}`}
          >
            {d.label}
          </a>
          {index < DECADES.length - 1 && <span>&middot;</span>}
        </Fragment>
      ))}
    </div>
  );
}
