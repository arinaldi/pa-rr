import {
  createSerializer,
  parseAsInteger,
  parseAsNativeArrayOf,
  parseAsString,
  useQueryStates,
  type inferParserType,
} from 'nuqs';

import { PER_PAGE } from '@/lib/constants';

const parsers = {
  direction: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(PER_PAGE.SMALL),
  search: parseAsString.withDefault(''),
  sort: parseAsString.withDefault(''),
  status: parseAsNativeArrayOf(parseAsString),
};

export function useAdminParams() {
  return useQueryStates(parsers, {
    urlKeys: {
      perPage: 'per_page',
    },
  });
}

export type AdminParams = inferParserType<typeof parsers>;

const serializeParams = createSerializer(parsers);

export function useSerializedParams() {
  const [adminParams] = useAdminParams();
  return serializeParams(adminParams);
}
