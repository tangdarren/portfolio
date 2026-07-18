export interface NavItem {
  label: string;
  to: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'RESUME', to: '/resume' },
  { label: 'CONTACT', to: '/contact' },
];
