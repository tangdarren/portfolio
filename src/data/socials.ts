import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Mail } from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  handle: string;
  external?: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/tangdarren',
    icon: Github,
    handle: 'tangdarren',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tang-darren',
    icon: Linkedin,
    handle: 'tang-darren',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:tang.darren@gmail.com',
    icon: Mail,
    handle: 'tang.darren@gmail.com',
  },
];

export const RESUME_PDF_PATH = '/resume/Darren_Tang_Resume.pdf';
