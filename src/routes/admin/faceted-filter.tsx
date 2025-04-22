import { startTransition, useOptimistic, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Circle, CircleOff, PlusCircle } from 'lucide-react';

import { cn, parseQuery } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
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

interface Props {
  queryKey: string;
  title: string;
}

const options = [
  { icon: Circle, label: 'Enabled', value: 'true' },
  { icon: CircleOff, label: 'Disabled', value: 'false' },
];

export default function FacetedFilter({ queryKey, title }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [optimisticValue, setOptimisticValue] = useOptimistic(
    parseQuery(searchParams.get(queryKey)),
  );
  const selectedOption = options.find((o) => o.value === optimisticValue);

  function onSelect(value: string) {
    const newValue = value === 'clear' ? '' : value;

    setOpen(false);
    startTransition(() => {
      setOptimisticValue(newValue);
      setSearchParams((prev) => {
        prev.set('page', '1');

        if (value === 'clear') {
          prev.delete(queryKey);
        } else {
          prev.set(queryKey, value);
        }

        return prev;
      });
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="border-dashed text-xs" size="sm" variant="outline">
          <PlusCircle />
          {title}
          {selectedOption && (
            <>
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <div className="flex space-x-1">
                <Badge
                  className="rounded-sm px-1 font-normal"
                  variant="secondary"
                >
                  {selectedOption.label}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={onSelect}
                    value={option.value}
                  >
                    <option.icon className="text-muted-foreground size-4" />
                    <span
                      className={cn(
                        option.value === optimisticValue && 'font-semibold',
                      )}
                    >
                      {option.label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                className="justify-center"
                disabled={!optimisticValue}
                onSelect={onSelect}
                value="clear"
              >
                Clear filter
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
