// lib/utils/breadcrumb.ts
import modules from '@/constants/modules';

export const slugify = (label: string) =>
  label.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export interface Crumb {
  label: string;
  href?: string; // present only when the crumb is itself a real route
}

export const getModuleRoot = (pathname: string) => {
  const [moduleSlug] = pathname.split('/').filter(Boolean);
  return moduleSlug ? `/${moduleSlug}` : '/';
};

export const resolveBreadcrumb = (pathname: string): Crumb[] => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return [];

  const [moduleSlug, leafSlug] = segments;
  const currentModule = (modules as any[]).find((m) => slugify(m.moduleName) === moduleSlug);
  if (!currentModule) return [];

  const moduleCrumb: Crumb = { label: currentModule.moduleName, href: `/${moduleSlug}` };
  if (!leafSlug) return [moduleCrumb];

  for (const page of currentModule.pages ?? []) {
    if (slugify(page.pageName) === leafSlug) {
      return [moduleCrumb, { label: page.pageName }];
    }
    for (const subPage of page.subPages ?? []) {
      if (slugify(subPage.subPageName) === leafSlug) {
        return [moduleCrumb, { label: page.pageName }, { label: subPage.subPageName }];
      }
      for (const thread of subPage.threads ?? []) {
        if (slugify(thread) === leafSlug) {
          return [
            moduleCrumb,
            { label: page.pageName },
            { label: subPage.subPageName },
            { label: thread },
          ];
        }
      }
    }
  }

  // Leaf slug didn't match anything in the tree yet (e.g. still-unwired page)
  return [moduleCrumb];
};

export const getTabPath = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length >= 2 ? `/${segments[0]}/${segments[1]}` : pathname;
};