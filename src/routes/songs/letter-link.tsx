import { Fragment } from 'react';

import { HEADER_LETTERS } from '@/lib/formatters';

export default function LetterLink() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {HEADER_LETTERS.map((l, index) => (
        <Fragment key={l}>
          <a
            className="hover:text-muted-foreground underline underline-offset-4"
            href={`#letter-${l}`}
          >
            {l}
          </a>
          {index < HEADER_LETTERS.length - 1 && <span>&middot;</span>}
        </Fragment>
      ))}
    </div>
  );
}
