import { useEffect, useState } from 'react';

// Hash-based routing. Every link in the site is a plain `href="#..."`, so this
// works on any static host with no rewrite rules and keeps back/forward working.
//
//   #packages                → Packages page
//   #retreat                 → Retreat brochure page
//   #contact?package=<name>  → Contact page, package pre-selected
//   #corporate, #activities  → Home page, scrolled to that section
//   anything else            → Home page

export type Page = 'home' | 'packages' | 'contact' | 'retreat';

export interface Route {
  page: Page;
  /** Element id on the page to scroll to, if any. */
  section: string | null;
  params: URLSearchParams;
}

const PAGE_HASHES: Record<string, Page> = {
  packages: 'packages',
  contact: 'contact',
  retreat: 'retreat',
  brochure: 'retreat',
};

const HOME_SECTIONS = new Set(['corporate', 'activities']);

export function parseHash(hash: string): Route {
  const [path, query = ''] = hash.replace(/^#\/?/, '').split('?');
  const key = path.toLowerCase();
  const params = new URLSearchParams(query);

  if (PAGE_HASHES[key]) return { page: PAGE_HASHES[key], section: null, params };
  if (HOME_SECTIONS.has(key)) return { page: 'home', section: key, params };
  return { page: 'home', section: null, params };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function contactHref(packageName?: string) {
  return packageName ? `#contact?package=${encodeURIComponent(packageName)}` : '#contact';
}
