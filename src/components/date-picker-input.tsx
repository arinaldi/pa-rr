import { useState } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DATE_INPUT, DATE_OUTPUT } from '@/lib/constants';

interface Props {
  id: string;
  onChange: (value: string) => void;
  value: string;
}

function parseDate(iso: string) {
  const date = parseISO(iso);

  return isValid(date) ? date : undefined;
}

export function DatePickerInput({ id, onChange, value }: Props) {
  const initialDate = parseDate(value);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [month, setMonth] = useState<Date | undefined>(initialDate);
  const [displayValue, setDisplayValue] = useState(() =>
    initialDate ? format(initialDate, DATE_OUTPUT) : '',
  );

  return (
    <InputGroup>
      <InputGroupInput
        id={id}
        onChange={({ target: { value } }) => {
          const parsed = new Date(value);

          setDisplayValue(value);

          if (isValid(parsed)) {
            setDate(parsed);
            setMonth(parsed);
            onChange(format(parsed, DATE_INPUT));
          } else {
            onChange('');
          }
        }}
        value={displayValue}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <InputGroupAddon align="inline-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <InputGroupButton
                aria-label="Select date"
                id={`date-picker-${id}`}
                size="icon-xs"
                variant="ghost"
              >
                <CalendarIcon />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            }
          />
          <PopoverContent
            align="end"
            alignOffset={-4}
            className="w-auto overflow-hidden p-0"
            sideOffset={8}
          >
            <Calendar
              mode="single"
              month={month}
              onMonthChange={setMonth}
              onSelect={(newDate) => {
                setDate(newDate);
                setDisplayValue(newDate ? format(newDate, DATE_OUTPUT) : '');
                onChange(newDate ? format(newDate, DATE_INPUT) : '');
                setOpen(false);
              }}
              selected={date}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  );
}
