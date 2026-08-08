import '@testing-library/jest-dom/vitest';
import { createElement, useSyncExternalStore, type ReactNode } from 'react';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

import { nextRouterState } from './next-router-state';

afterEach(() => {
  cleanup();
  nextRouterState.reset('/');
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

window.scrollTo = () => undefined;

vi.mock('next/navigation', () => ({
  usePathname: () =>
    useSyncExternalStore(
      nextRouterState.subscribe,
      () => nextRouterState.pathname,
      () => nextRouterState.pathname,
    ),
  useSearchParams: () =>
    useSyncExternalStore(
      nextRouterState.subscribe,
      () => nextRouterState.searchParams,
      () => nextRouterState.searchParams,
    ),
  useRouter: () => ({
    replace(href: string) {
      nextRouterState.navigate(href);
    },
    push(href: string) {
      nextRouterState.navigate(href);
    },
    prefetch() {},
    back() {},
    forward() {},
    refresh() {},
  }),
  useParams: () => ({}),
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND');
  },
}));

vi.mock('next/link', () => ({
  default: function MockLink({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: ReactNode;
    [key: string]: unknown;
  }) {
    return createElement('a', { href, ...rest }, children);
  },
}));

class MockResizeObserver {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    const width = 720;
    const height = 930;
    this.callback(
      [
        {
          target,
          contentRect: {
            width,
            height,
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            bottom: height,
            right: width,
            toJSON: () => ({}),
          },
          borderBoxSize: [],
          contentBoxSize: [],
          devicePixelContentBoxSize: [],
        } as ResizeObserverEntry,
      ],
      this as unknown as ResizeObserver,
    );
  }

  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});
