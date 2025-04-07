import { useEffect } from 'react';
import { Key, mutate, SWRConfiguration, SWRHook } from 'swr';

const liveQueries = new Set<Key>();

export function trackLiveQueries(useSWRNext: SWRHook) {
  return (key: Key, fetcher: any, config: SWRConfiguration) => {
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      if (!liveQueries.has(key)) {
        liveQueries.add(key);
      }

      return () => {
        liveQueries.delete(key);
      };
    }, [key]);

    return swr;
  };
}

export function revalidateLiveQueries() {
  const promises = [...liveQueries.values()].map((key) => mutate(key));

  return Promise.all(promises);
}
