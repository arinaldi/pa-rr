import { Controller, type UseFormReturn } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Lock, SendHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/submit-button';
import { useMobile } from '@/hooks/mobile';
import { EMAIL, MESSAGE } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import type { EmailInput } from './schema';

interface Props {
  form: UseFormReturn<EmailInput>;
  setViewOtp: () => void;
  setViewPassword: () => void;
}

export default function EmailForm({
  form,
  setViewOtp,
  setViewPassword,
}: Props) {
  const mobile = useMobile();
  const { isPending, mutate } = useMutation({
    meta: {
      successMessage: 'Check your email for the code',
    },
    mutationFn: async ({ email }: EmailInput) => {
      if (email !== EMAIL) {
        throw new Error(MESSAGE.ERROR);
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: setViewOtp,
  });

  return (
    <div className="max-w-sm">
      <form onSubmit={form.handleSubmit(setViewPassword)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoCapitalize="off"
                  autoComplete="email"
                  autoCorrect="off"
                  autoFocus
                  id={field.name}
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          className="mt-6 w-full"
          size={mobile ? 'lg' : 'default'}
          type="submit"
        >
          <Lock className="mr-2 size-4" />
          Sign in with password
        </Button>
      </form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs tracking-wider uppercase">
          <span className="bg-background text-muted-foreground px-2">
            or continue with
          </span>
        </div>
      </div>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <SubmitButton
          className="w-full"
          submitting={isPending}
          variant="outline"
        >
          <SendHorizontal className="size-4" />
          Send one-time password
        </SubmitButton>
      </form>
    </div>
  );
}
