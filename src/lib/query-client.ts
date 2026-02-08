import { MutationCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { MESSAGE } from '@/lib/constants';
import { capitalizeFirstLetter } from '@/lib/utils';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      let message = MESSAGE.ERROR;

      if (mutation.meta?.errorMessage) {
        message = mutation.meta.errorMessage;
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }

      toast.error(capitalizeFirstLetter(message));
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => {
          const { mutationKey } = mutation.options;

          if (mutationKey) {
            const match =
              mutationKey.length === queryKey.length &&
              mutationKey.every((value, index) => value === queryKey[index]);

            return !match;
          }

          return true;
        },
      });

      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage);
      }
    },
  }),
});
