import { create } from 'zustand';

interface CountState {
  count: number;
}

const useCountStore = create<CountState>(() => ({
  count: 0,
}));

export function useCount() {
  return useCountStore((state) => state.count);
}

export function setCount(count: number) {
  useCountStore.setState({ count });
}
