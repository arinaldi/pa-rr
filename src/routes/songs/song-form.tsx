import { FormEvent } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/submit-button';
import { cn } from '@/lib/utils';
import { type SongInput } from './schema';

interface Props {
  className?: string;
  form: UseFormReturn<SongInput>;
  onSubmit: (event: FormEvent<Element>) => Promise<void>;
  submitting: boolean;
}

export default function SongForm({
  className,
  form,
  onSubmit,
  submitting,
}: Props) {
  return (
    <form className={cn('space-y-6', className)} onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="artist"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="artist">Artist</FieldLabel>
              <Input {...field} autoFocus id="artist" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input {...field} id="title" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="link"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="link">Link</FieldLabel>
              <Input {...field} id="link" inputMode="url" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <SubmitButton className="w-full sm:w-auto" submitting={submitting}>
        Save
      </SubmitButton>
    </form>
  );
}
