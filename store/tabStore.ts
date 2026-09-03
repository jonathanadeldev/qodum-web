// store/tabsStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Tab {
  path: string;
  label: string;
}

interface TabsState {
  openTabs: Tab[];
  hasHydrated: boolean;
  openTab: (tab: Tab) => void;
  closeTab: (path: string) => void;
  setHasHydrated: (state: boolean) => void;
    closeAllTabs: () => void;
}

export const useTabsStore = create<TabsState>()(
  persist(
    (set, get) => ({
      openTabs: [],
      hasHydrated: false,
      openTab: (tab) =>
        set((s) =>
          s.openTabs.some((t) => t.path === tab.path)
            ? s
            : { openTabs: [...s.openTabs, tab] }
        ),
      closeTab: (path) =>
        set((s) => ({ openTabs: s.openTabs.filter((t) => t.path !== path) })),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      closeAllTabs: () => set({ openTabs: [] }),
    }),
    {
      name: 'qodum-open-tabs',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);