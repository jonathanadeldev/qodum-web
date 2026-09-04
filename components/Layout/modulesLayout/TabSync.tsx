'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTabsStore } from '@/store/tabStore';
import { resolveBreadcrumb, getTabPath } from '@/components/utils/breadcrumb';

const TabSync = () => {
  const pathname = usePathname();
  const openTab = useTabsStore((s) => s.openTab);

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length < 2) return; // module root — not a tab

    const tabPath = getTabPath(pathname); // always the 2-segment base — /users/create-user, never /view
    const crumbs = resolveBreadcrumb(tabPath);
    const label = crumbs[crumbs.length - 1]?.label ?? tabPath;
    openTab({ path: tabPath, label });
  }, [pathname, openTab]);

  return null;
};

export default TabSync;