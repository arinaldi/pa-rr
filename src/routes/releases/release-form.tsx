import { type SubmitEventHandler } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { Children } from '@/lib/types';
import { cn } from '@/lib/utils';
import { type ReleaseInput } from './schema';

interface Props extends Children {
  className?: string;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
}

export default function ReleaseForm({ children, className, onSubmit }: Props) {
  const form = useFormContext<ReleaseInput>();

  return (
    <form className={cn('space-y-6', className)} onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="artist"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Artist</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoFocus
                id={field.name}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="date"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Date</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
                type="date"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {children}
    </form>
  );
}
