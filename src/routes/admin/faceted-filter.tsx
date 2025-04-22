import { startTransition, useOptimistic, useState } from 'react';
import { useSearchParams } from 'react-router';
import { PlusCircle } from 'lucide-react';

import { cn, parseQuery } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
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

const options = ['clear', 'true', 'false'];

export default function FacetedFilter({ queryKey, title }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [optimisticValue, setOptimisticValue] = useOptimistic(
    parseQuery(searchParams.get(queryKey)),
  );

  function onSelect(value: string) {
    startTransition(() => {
      setOpen(false);
      setOptimisticValue(value);
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
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle />
          {title}
          {optimisticValue && (
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
                  {optimisticValue}
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
              {options.map((o) => {
                return (
                  <CommandItem key={o} onSelect={onSelect} value={o}>
                    <span
                      className={cn(o === optimisticValue && 'font-semibold')}
                    >
                      {o}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
