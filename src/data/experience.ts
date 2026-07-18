export interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Veracyte',
    role: 'AI Agent Development Intern',
    bullets: [
      'Building AI-powered tools and workflow automation solutions for customer-care operations.',
      'Exploring integrations involving Salesforce, Power Platform, Five9, and internal systems.',
      'Designing solutions for order tracking, quality-control flagging, and order-note summarization.',
    ],
  },
  {
    company: 'Sonic Engineering Inc.',
    role: 'Software Engineering Intern',
    bullets: [
      'Built and improved internal inventory and production-management applications.',
      'Developed reorder alerts and tool-life tracking functionality.',
      'Helped improve workflows related to inventory availability and production scheduling.',
    ],
  },
  {
    company: 'DataAnnotation',
    role: 'AI Trainer',
    bullets: [
      'Evaluated AI-generated software solutions.',
      'Created structured prompts, rubrics, and technical assessments.',
      'Worked with APIs, JSON, tool usage, and software-engineering evaluation tasks.',
    ],
  },
];

export interface Achievement {
  title: string;
  detail: string;
  meta?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Master of Science in Computer Science',
    detail: 'Santa Clara University',
    meta: 'Expected Spring 2027',
  },
  {
    title: 'Bachelor of Science in Computer Science',
    detail: 'University of Wisconsin–Madison',
  },
  {
    title: 'AI Agent Development Intern',
    detail: 'Veracyte',
  },
  {
    title: 'Software Engineering Intern',
    detail: 'Sonic Engineering Inc.',
  },
  {
    title: 'AI Trainer',
    detail: 'DataAnnotation',
  },
];
