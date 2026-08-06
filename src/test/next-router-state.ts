type Listener = () => void;

let pathname = '/';
let search = '';
let cachedQuery = '';
let cachedSearchParams = new URLSearchParams();
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

function parseHref(href: string): { pathname: string; search: string } {
  const queryIndex = href.indexOf('?');
  if (queryIndex === -1) {
    return { pathname: href || '/', search: '' };
  }
  return {
    pathname: href.slice(0, queryIndex) || '/',
    search: href.slice(queryIndex),
  };
}

function syncSearchParamsCache() {
  const query = search.startsWith('?') ? search.slice(1) : search;
  if (query === cachedQuery) return;
  cachedQuery = query;
  cachedSearchParams = new URLSearchParams(query);
}

/** Mutable App Router stand-in for Vitest (next/navigation + location probe). */
export const nextRouterState = {
  get pathname() {
    return pathname;
  },
  get search() {
    return search;
  },
  get searchParams() {
    syncSearchParamsCache();
    return cachedSearchParams;
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  navigate(href: string) {
    const next = parseHref(href);
    if (next.pathname === pathname && next.search === search) return;
    pathname = next.pathname;
    search = next.search;
    syncSearchParamsCache();
    notify();
  },
  reset(initialPath = '/') {
    const next = parseHref(initialPath);
    pathname = next.pathname;
    search = next.search;
    syncSearchParamsCache();
    notify();
  },
};
