import { create } from 'zustand';

interface CountState {
  count: number;
  actions: {
    setCount: (count: number) => void;
  };
}

const useCountStore = create<CountState>((set) => ({
  count: 0,
  actions: {
    setCount: (count: number) => set({ count }),
  },
}));

export function useCount() {
  return useCountStore((state) => state.count);
}

export function useCountActions() {
  return useCountStore((state) => state.actions);
}
