// components/Layout/Pages/TabSync.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTabsStore } from '@/store/tabStore';
import { resolveBreadcrumb } from '@/components/utils/breadcrumb';

const TabSync = () => {
  const pathname = usePathname();
  const openTab = useTabsStore((s) => s.openTab);

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length < 2) return; // module root — not a tab

    const crumbs = resolveBreadcrumb(pathname);
    const label = crumbs[crumbs.length - 1]?.label ?? pathname;
    openTab({ path: pathname, label });
  }, [pathname, openTab]);

  return null;
};

export default TabSync;