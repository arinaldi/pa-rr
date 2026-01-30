import {
  type ChangeEvent,
  type ComponentProps,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useSearchParams } from 'react-router';
import { Search, X } from 'lucide-react';

import { DEBOUNCE_IN_MS, SORT_VALUE } from '@/lib/constants';
import { parseQuery } from '@/lib/utils';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import Spinner from '@/components/spinner';

export function DataTableSearch(props: ComponentProps<'input'>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = parseQuery(searchParams.get('search'));
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const searching = Boolean(timeoutId) || pending;

  function onSearch(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeoutId);

    const { value } = event.target;
    const id = setTimeout(() => {
      startTransition(() => {
        setSearchParams((prev) => {
          prev.set('page', '1');

          if (value) {
            prev.set('search', value);
            prev.set('sort', SORT_VALUE.YEAR);
          } else {
            prev.delete('search');
            prev.delete('sort');
          }

          return prev;
        });
      });

      setTimeoutId(undefined);
    }, DEBOUNCE_IN_MS);

    setTimeoutId(id);
  }

  function onClear() {
    startTransition(() => {
      setSearchParams((prev) => {
        prev.set('page', '1');
        prev.delete('search');
        prev.delete('sort');

        return prev;
      });
    });

    if (inputRef?.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  return (
    <InputGroup className="md:w-56">
      <InputGroupInput
        defaultValue={search}
        name="search"
        onChange={onSearch}
        placeholder="Search"
        ref={inputRef}
        {...props}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {!searching && search && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            arial-label="Clear search"
            onClick={onClear}
            size="icon-sm"
            title="Clear search"
          >
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
      {searching && (
        <InputGroupAddon align="inline-end">
          <Spinner className="size-4" />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
