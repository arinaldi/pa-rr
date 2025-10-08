import { startTransition, useOptimistic } from 'react';
import { useSearchParams } from 'react-router';
import { Check, PlusCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ADMIN_QUERY_KEY } from '@/lib/constants';
import { cn } from '@/lib/utils';

const options = [
  { label: 'CD', value: 'cd' },
  { label: 'Favorite', value: 'favorite' },
  { label: 'Studio', value: 'studio' },
  { label: 'Wishlist', value: 'wishlist' },
];

interface Props {
  query: string[];
  updateQuery: (value: string[]) => void;
}

export default function FacetedFilter({ query, updateQuery }: Props) {
  const setSearchParams = useSearchParams()[1];
  const [optimisticValue, setOptimisticValue] = useOptimistic(query);
  const selectedValues = new Set(optimisticValue);

  function onSelect(value: string) {
    startTransition(() => {
      setSearchParams((prev) => {
        const previousValues = prev.getAll(ADMIN_QUERY_KEY);
        const included = previousValues.includes(value);

        prev.set('page', '1');

        if (included) {
          const newValues = previousValues.filter((v) => v !== value);

          updateQuery(newValues);
          setOptimisticValue(newValues);
          prev.delete(ADMIN_QUERY_KEY);
          newValues.forEach((v) => prev.append(ADMIN_QUERY_KEY, v));
        } else {
          const newValues = [...previousValues, value];

          updateQuery(newValues);
          setOptimisticValue(newValues);
          prev.append(ADMIN_QUERY_KEY, value);
        }

        return prev;
      });
    });
  }

  function onClear() {
    startTransition(() => {
      updateQuery([]);
      setOptimisticValue([]);
      setSearchParams((prev) => {
        prev.delete(ADMIN_QUERY_KEY);
        return prev;
      });
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-8 border-dashed text-xs"
          size="sm"
          variant="outline"
        >
          <PlusCircle />
          Status
          {selectedValues.size > 0 && (
            <>
              <Separator
                className="mx-2 data-[orientation=vertical]:h-4"
                orientation="vertical"
              />
              <Badge
                className="rounded-sm px-1 font-normal md:hidden"
                variant="secondary"
              >
                {selectedValues.size.toLocaleString()}
              </Badge>
              <div className="hidden space-x-1 md:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    className="rounded-sm px-1 font-normal"
                    variant="secondary"
                  >
                    {selectedValues.size.toLocaleString()} selected
                  </Badge>
                ) : (
                  options
                    .filter((o) => selectedValues.has(o.value))
                    .map((o) => (
                      <Badge
                        key={o.value}
                        className="rounded-sm px-1 font-normal"
                        variant="secondary"
                      >
                        {o.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            <CommandGroup>
              {options.map(({ label, value }) => {
                const selected = selectedValues.has(value);

                return (
                  <CommandItem key={value} onSelect={onSelect} value={value}>
                    <div
                      className={cn(
                        'border-primary mr-2 flex size-4 items-center justify-center rounded-sm border',
                        selected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className="text-current" />
                    </div>
                    <span>{label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={onClear}
                  >
                    Clear filter
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
