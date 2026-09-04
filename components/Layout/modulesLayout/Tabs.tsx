// components/Layout/Pages/PagesList.tsx
'use client';

import { X, XSquare } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTabsStore } from '@/store/tabStore';
import { usePageStateStore } from '@/store/pageStateStore';
import { getModuleRoot } from '@/components/utils/breadcrumb';

const PagesList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const hasHydrated = useTabsStore((s) => s.hasHydrated);
  const openTabs = useTabsStore((s) => s.openTabs);
  const closeTab = useTabsStore((s) => s.closeTab);
  const closeAllTabs = useTabsStore((s) => s.closeAllTabs);
  const clearPage = usePageStateStore((s) => s.clearPage);
  const clearAllPages = usePageStateStore((s) => s.clearAllPages);

  if (!hasHydrated || openTabs.length === 0) return null;

  const isWithinTab = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const handleClose = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    closeTab(path);
    clearPage(path);
    if (isWithinTab(path)) {
      const remaining = openTabs.filter((t) => t.path !== path);
      router.push(remaining[remaining.length - 1]?.path ?? getModuleRoot(path));
    }
  };

  const handleCloseAll = () => {
    closeAllTabs();
    clearAllPages();
    router.push(getModuleRoot(pathname));
  };

  return (
    <div className='flex items-center justify-between px-4 bg-white border-b border-[#E5E8EF]'>
      <div className='flex items-center gap-1 overflow-x-auto'>
        {openTabs.map((tab) => {
          const isActive = isWithinTab(tab.path);
          return (
            <div
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer border-b-2 whitespace-nowrap ${
                isActive ? 'border-blue-500 text-blue-600 font-medium' : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label}
              <X size={14} onClick={(e) => handleClose(e, tab.path)} className='hover:text-red-500' />
            </div>
          );
        })}
      </div>
      <button
        onClick={handleCloseAll}
        title='Close all tabs'
        className='flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-red-500 shrink-0'
      >
        <XSquare size={14} />
        Close all
      </button>
    </div>
  );
};

export default PagesList;