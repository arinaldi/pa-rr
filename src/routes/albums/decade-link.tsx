import { Fragment } from 'react';
import { Link } from 'react-router';

import { DECADES } from '@/lib/constants';

export default function DecadeLink() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {DECADES.map((d, index) => (
        <Fragment key={d.id}>
          <Link
            className="underline underline-offset-4 hover:text-muted-foreground"
            to={`#${d.id}`}
          >
            {d.label}
          </Link>
          {index < DECADES.length - 1 && <span>&middot;</span>}
        </Fragment>
      ))}
    </div>
  );
}
