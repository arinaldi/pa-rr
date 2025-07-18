import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import SubmitButton from '@/components/submit-button';
import { useMobile } from '@/hooks/use-mobile';
import { useSubmit } from '@/hooks/use-submit';
import { EMAIL, MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { verifyOtpSchema, type VerifyOtpInput } from './schema';

interface Props {
  email: string;
  onCancel: () => void;
}

export default function OtpForm({ email, onCancel }: Props) {
  const navigate = useNavigate();
  const mobile = useMobile();
  const form = useForm({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(verifyOtpSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => navigate(ROUTES_ADMIN.base.href)],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ code }: VerifyOtpInput) => {
      if (email !== EMAIL) {
        throw new Error(MESSAGES.INVALID_DATA);
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
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-time password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton className="mt-6 w-full" submitting={submitting}>
            Submit
          </SubmitButton>
        </form>
      </Form>
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
