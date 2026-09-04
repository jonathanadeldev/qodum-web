// store/pageStateStore.ts
import { create } from 'zustand';
import { usePathname } from 'next/navigation';

interface PageStateStore {
  pages: Record<string, Record<string, any>>;
  setField: (path: string, field: string, value: any) => void;
  clearPage: (path: string) => void;
  clearAllPages: () => void;
}

export const usePageStateStore = create<PageStateStore>((set) => ({
  pages: {},
  setField: (path, field, value) =>
    set((s) => ({
      pages: { ...s.pages, [path]: { ...s.pages[path], [field]: value } },
    })),
  clearPage: (path) =>
    set((s) => {
      const { [path]: _, ...rest } = s.pages;
      return { pages: rest };
    }),
    clearAllPages: () => set({ pages: {} }),
}));


export const useFieldState = <T,>(field: string, fallback: T, pathOverride?: string) => {
  const pathname = usePathname();
  const key = pathOverride ?? pathname;
  const value = usePageStateStore((s) => s.pages[key]?.[field] ?? fallback);
  const setField = usePageStateStore((s) => s.setField);
  const setValue = (v: T) => setField(key, field, v);
  return [value, setValue] as const;
};