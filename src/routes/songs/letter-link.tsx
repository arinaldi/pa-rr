import { Fragment } from 'react';
import { Link } from 'react-router';

import { HEADER_LETTERS } from '@/lib/formatters';

export default function LetterLink() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {HEADER_LETTERS.map((l, index) => (
        <Fragment key={l}>
          <Link
            className="hover:text-muted-foreground underline underline-offset-4"
            key={l}
            to={{ hash: `#letter-${l}` }}
          >
            {l}
          </Link>
          {index < HEADER_LETTERS.length - 1 && <span>&middot;</span>}
        </Fragment>
      ))}
    </div>
  );
}
