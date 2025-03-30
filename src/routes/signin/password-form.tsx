import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/password-input';
import SubmitButton from '@/components/submit-button';
import { useMobile } from '@/hooks/use-mobile';
import { useSubmit } from '@/hooks/use-submit';
import { EMAIL, MESSAGES } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { SignInInput, signInSchema } from './schema';

interface Props {
  email: string;
  onCancel: () => void;
}

export default function PasswordForm({ email, onCancel }: Props) {
  const mobile = useMobile();
  const form = useForm<SignInInput>({
    defaultValues: {
      email,
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ email, password }: SignInInput) => {
      if (email !== EMAIL) {
        throw new Error(MESSAGES.INVALID_DATA);
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: 'Success',
  });

  return (
    <AppLayout className="max-w-sm" title="Sign in">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput autoFocus {...field} />
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
    </AppLayout>
  );
}
