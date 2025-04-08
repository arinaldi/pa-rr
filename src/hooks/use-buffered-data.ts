import { useState } from 'react';
import useSWR from 'swr';

import { MESSAGES } from '@/lib/constants';

let quotesData: string[] = [];
const URL = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes/2';

async function customFetcher() {
  try {
    const res = await window.fetch(URL);
    const data = await res.json();
    quotesData = [...data, ...quotesData];

    return quotesData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : MESSAGES.ERROR);
  }
}

export default function useBufferedData() {
  const { data, error } = useSWR('quotes', customFetcher);
  const [buffer, setBuffer] = useState(data);

  if (data && !buffer) setBuffer(data);

  return {
    data: buffer,
    hasError: Boolean(error),
    stale: buffer !== data,
    update: () => setBuffer(data),
  };
}
