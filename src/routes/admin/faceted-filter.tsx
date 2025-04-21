import { startTransition, useOptimistic, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useOptimistic(searchParams.get(queryKey) ?? '');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle />
          {title}
          {value && (
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
                  {value}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((o) => {
                return (
                  <CommandItem
                    key={o}
                    onSelect={(v) => {
                      setOpen(false);
                      const query = new URLSearchParams(searchParams);

                      query.set('page', '1');

                      if (v === 'clear') {
                        query.delete(queryKey);
                      } else {
                        query.set(queryKey, v);
                      }

                      startTransition(() => {
                        setValue(v);
                        navigate(`?${query.toString()}`);
                      });
                    }}
                    value={o}
                  >
                    <span className={cn(o === value && 'font-semibold')}>
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
