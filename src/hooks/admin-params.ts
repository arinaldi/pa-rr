import {
  parseAsInteger,
  parseAsNativeArrayOf,
  parseAsString,
  useQueryStates,
} from 'nuqs';

import { PER_PAGE } from '@/lib/constants';

export function useAdminParams() {
  return useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(PER_PAGE.SMALL),
      search: parseAsString.withDefault(''),
      sort: parseAsString.withDefault(''),
      status: parseAsNativeArrayOf(parseAsString),
    },
    { urlKeys: { perPage: 'per_page' } },
  );
}
