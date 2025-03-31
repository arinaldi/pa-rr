import { ChangeEvent, useRef, useState, useTransition } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { DEBOUNCE_IN_MS, SORT_VALUE } from '@/lib/constants';
import { parseQuery } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import InputClearButton from '@/components/input-clear-button';
import InputSpinner from '@/components/input-spinner';

interface Props {
  autoFocus?: boolean;
  type: 'artist' | 'title';
}

export default function Search({ autoFocus, type }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = parseQuery(searchParams.get(type));
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const searching = Boolean(timeoutId) || pending;

  function onSearch(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeoutId);

    const { value } = event.target;
    const id = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString());

      if (value) {
        params.set(type, value);
        params.set('sort', SORT_VALUE.YEAR);
      } else {
        params.delete(type);
        params.delete('sort');
      }

      params.set('page', '1');
      startTransition(() => {
        navigate(`${pathname}?${params.toString()}`, { replace: true });
      });

      setTimeoutId(undefined);
    }, DEBOUNCE_IN_MS);

    setTimeoutId(id);
  }

  function onClear() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(type);
    params.delete('sort');
    params.set('page', '1');

    startTransition(() => {
      navigate(`${pathname}?${params.toString()}`, { replace: true });
    });

    if (inputRef?.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  return (
    <div className="relative w-full">
      <Input
        autoFocus={autoFocus}
        defaultValue={query}
        id={`${type}-search`}
        name={type}
        onChange={onSearch}
        placeholder={`Search ${type}`}
        ref={inputRef}
      />
      {!searching && query && <InputClearButton onClick={onClear} />}
      {searching && <InputSpinner />}
    </div>
  );
}
