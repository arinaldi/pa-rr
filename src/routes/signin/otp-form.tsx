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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import SubmitButton from '@/components/submit-button';
import { useMobile } from '@/hooks/use-mobile';
import { EMAIL, MESSAGE } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { verifyOtpSchema, type VerifyOtpInput } from './schema';

interface Props {
  email: string;
  onCancel: () => void;
}

export default function OtpForm({ email, onCancel }: Props) {
  const mobile = useMobile();
  const form = useForm({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(verifyOtpSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async ({ code }: VerifyOtpInput) => {
      if (email !== EMAIL) {
        throw new Error(MESSAGE.INVALID_DATA);
      }

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email',
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
            name="code"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>One-time password</FieldLabel>
                <InputOTP
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id={field.name}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
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
