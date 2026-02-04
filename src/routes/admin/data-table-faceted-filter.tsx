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
import { useAdminParams } from '@/hooks/admin-params';
import { cn } from '@/lib/utils';

const options = [
  { label: 'CD', value: 'cd' },
  { label: 'Favorite', value: 'favorite' },
  { label: 'Studio', value: 'studio' },
  { label: 'Wishlist', value: 'wishlist' },
];

export function DataTableFacetedFilter() {
  const [{ status }, setAdminParams] = useAdminParams();
  const selectedValues = new Set(status);

  function onSelect(value: string) {
    const included = status.includes(value);
    const newStatus = included
      ? status.filter((v) => v !== value)
      : [...status, value];

    setAdminParams({
      page: 1,
      status: newStatus,
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
      <PopoverContent align="start" className="w-50 p-0">
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
                    onSelect={() => setAdminParams({ status: [] })}
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
