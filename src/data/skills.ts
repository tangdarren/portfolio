export interface SkillGroup {
  category: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    items: [
      'Java',
      'Python',
      'TypeScript',
      'JavaScript',
      'SQL',
      'Flutter',
      'HTML',
      'CSS',
    ],
  },
  {
    category: 'Technologies',
    items: [
      'React',
      'Next.js',
      'Node.js',
      'Spring Boot',
      'FastAPI',
      'PostgreSQL',
      'REST APIs',
      'Vite',
      'Firebase',
      'Firestore',
    ],
  },
  {
    category: 'Tools and Platforms',
    items: [
      'Git',
      'GitHub',
      'Docker',
      'Azure DevOps',
      'AWS',
      'CI/CD',
      'Agile',
      'Salesforce',
    ],
  },
  {
    category: 'AI and Machine Learning',
    items: [
      'OpenAI',
      'Anthropic',
      'Claude Code',
      'Codex',
      'MCP',
      'RAG',
      'PyTorch',
      'Cursor',
    ],
  },
];
