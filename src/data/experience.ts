export interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  dates?: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Veracyte',
    role: 'AI Agent Development Intern',
    location: 'South San Francisco, CA',
    dates: 'June 2026 – Present',
    bullets: [
      'Developed and validated a Customer Care app with decision-tree QC flagging, targeting a 30% reduction in manual review time.',
      'Building a background AI assistant with Claude Code, OpenAI Codex, and MCP to summarize order context and automate steps, targeting a 25% increase in case-handling throughput.',
      'Collaborating in Agile Scrum on Salesforce CRM to TRAF field automation, targeting a 40% reduction in form preparation time.',
    ],
  },
  {
    company: 'DataAnnotation',
    role: 'AI Analyst',
    location: 'Fremont, CA',
    dates: 'January 2026 – May 2026',
    bullets: [
      'Developed containerized LLM workflows with Docker and Kubernetes, refining prompts, API calls, JSON schemas, and evaluation rubrics.',
      'Evaluated 50+ model outputs for factuality, relevance, reasoning quality, and instruction adherence in RLHF and fine-tuning pipelines.',
      'Ran A/B tests across models, MCP tools, and prompts to improve AI accuracy, tool use, and task completion.',
    ],
  },
  {
    company: 'Sonic Engineering',
    role: 'Software Engineer Intern',
    location: 'Union City, CA',
    dates: 'May 2025 – August 2025',
    bullets: [
      'Refined CNC inventory workflows through iterative prototyping, improving tool lookup, material tracking, and tool-life monitoring.',
      'Implemented a Java inventory service via Azure DevOps CI/CD using SQL and Java data structures to cut delayed reorders by 50%.',
      'Collaborated with engineers and CNC operators across the SDLC to translate requirements into validated manufacturing features.',
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
    title: 'Master of Science in Computer Science and Engineering',
    detail: 'Santa Clara University',
    meta: 'Expected June 2027',
  },
  {
    title: 'Bachelor of Science in Computer Science',
    detail: 'University of Wisconsin–Madison',
    meta: 'May 2025',
  },
  {
    title: 'AI Agent Development Intern',
    detail: 'Veracyte',
    meta: 'June 2026 – Present',
  },
  {
    title: 'AI Analyst',
    detail: 'DataAnnotation',
    meta: 'January 2026 – May 2026',
  },
  {
    title: 'Software Engineer Intern',
    detail: 'Sonic Engineering',
    meta: 'May 2025 – August 2025',
  },
];
