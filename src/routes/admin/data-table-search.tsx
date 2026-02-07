import { type ChangeEvent, type ComponentProps, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

import { useAdminParams } from '@/hooks/admin-params';
import { DEBOUNCE_IN_MS } from '@/lib/constants';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import Spinner from '@/components/spinner';

export function DataTableSearch(props: ComponentProps<'input'>) {
  const [adminParams, setAdminParams] = useAdminParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();
  const searching = Boolean(timeoutId);

  function onSearch(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeoutId);

    const { value } = event.target;
    const id = setTimeout(() => {
      setAdminParams({
        direction: value ? 'asc' : '',
        page: 1,
        search: value,
        sort: value ? 'year' : '',
      });

      setTimeoutId(undefined);
    }, DEBOUNCE_IN_MS);

    setTimeoutId(id);
  }

  function onClear() {
    setAdminParams({
      direction: '',
      page: 1,
      search: '',
      sort: '',
    });

    if (inputRef?.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  return (
    <InputGroup className="md:w-56">
      <InputGroupInput
        defaultValue={adminParams.search}
        name="search"
        onChange={onSearch}
        placeholder="Search"
        ref={inputRef}
        {...props}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {!searching && adminParams.search && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Clear search"
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
