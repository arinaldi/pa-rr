import { FormEvent } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/submit-button';
import { type AlbumInput } from './schema';

interface Props {
  form: UseFormReturn<AlbumInput>;
  onSubmit: (event: FormEvent<Element>) => Promise<void>;
  submitting: boolean;
}

export default function AlbumForm({ form, onSubmit, submitting }: Props) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
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
          name="year"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="year">Year</FieldLabel>
              <Input
                {...field}
                id="year"
                inputMode="numeric"
                onChange={(event) => field.onChange(+event.target.value)}
                type="number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="studio"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                id="studio"
                name={field.name}
                onCheckedChange={field.onChange}
              />
              <FieldContent>
                <FieldLabel htmlFor="studio">Studio</FieldLabel>
                <FieldDescription>Is this a studio album?</FieldDescription>
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="cd"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                id="cd"
                name={field.name}
                onCheckedChange={field.onChange}
              />
              <FieldContent>
                <FieldLabel htmlFor="cd">CD</FieldLabel>
                <FieldDescription>Do you own this CD?</FieldDescription>
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="wishlist"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                id="wishlist"
                name={field.name}
                onCheckedChange={field.onChange}
              />
              <FieldContent>
                <FieldLabel htmlFor="wishlist">Wishlist</FieldLabel>
                <FieldDescription>
                  Is this CD on your wishlist?
                </FieldDescription>
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="favorite"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                id="favorite"
                name={field.name}
                onCheckedChange={field.onChange}
              />
              <FieldContent>
                <FieldLabel htmlFor="favorite">Favorite</FieldLabel>
                <FieldDescription>Is this a top album?</FieldDescription>
              </FieldContent>
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
