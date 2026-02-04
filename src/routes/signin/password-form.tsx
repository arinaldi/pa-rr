import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import PasswordInput from '@/components/password-input';
import SubmitButton from '@/components/submit-button';
import { useMobile } from '@/hooks/mobile';
import { EMAIL, MESSAGE } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { signInSchema, type SignInInput } from './schema';

interface Props {
  email: string;
  onCancel: () => void;
}

export default function PasswordForm({ email, onCancel }: Props) {
  const mobile = useMobile();
  const form = useForm({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async ({ password }: SignInInput) => {
      if (email !== EMAIL) {
        throw new Error(MESSAGE.INVALID_DATA);
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
  });

  return (
    <div className="max-w-sm">
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <PasswordInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="password"
                  autoFocus
                  id={field.name}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <SubmitButton className="mt-6 w-full" submitting={isPending}>
          Submit
        </SubmitButton>
      </form>
      <Button
        className="mt-2 w-full"
        onClick={onCancel}
        size={mobile ? 'lg' : 'default'}
        variant="outline"
      >
        Cancel
      </Button>
    </div>
  );
}
