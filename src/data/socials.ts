import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Mail } from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  handle: string;
  external?: boolean;
}

// NOTE: Replace the placeholder values below before publishing.
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/YOUR_GITHUB_URL',
    icon: Github,
    handle: 'YOUR_GITHUB_URL',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/YOUR_LINKEDIN_URL',
    icon: Linkedin,
    handle: 'YOUR_LINKEDIN_URL',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:YOUR_EMAIL_ADDRESS',
    icon: Mail,
    handle: 'YOUR_EMAIL_ADDRESS',
  },
];

export const RESUME_PDF_PATH = '/resume/Darren_Tang_Resume.pdf';
