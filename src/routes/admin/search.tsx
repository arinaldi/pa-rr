import {
  ChangeEvent,
  ComponentProps,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useSearchParams } from 'react-router';

import { DEBOUNCE_IN_MS, SORT_VALUE } from '@/lib/constants';
import { parseQuery } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import InputClearButton from '@/components/input-clear-button';
import InputSpinner from '@/components/input-spinner';

export default function Search(props: ComponentProps<'input'>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = parseQuery(searchParams.get('search'));
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
    <div className="relative flex-1">
      <Input
        defaultValue={defaultValue}
        name="search"
        onChange={onSearch}
        placeholder="Search"
        ref={inputRef}
        {...props}
      />
      {!searching && defaultValue && <InputClearButton onClick={onClear} />}
      {searching && <InputSpinner />}
    </div>
  );
}
