export interface SkillGroup {
  category: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    items: [
      'TypeScript',
      'JavaScript',
      'Python',
      'Java',
      'Dart',
      'SQL',
      'HTML',
      'CSS',
    ],
  },
  {
    category: 'Frontend',
    items: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Flutter',
      'JavaFX',
      'Responsive Design',
    ],
  },
  {
    category: 'Backend and Data',
    items: [
      'Node.js',
      'Firebase',
      'Firestore',
      'REST APIs',
      'SQL Databases',
      'Cloud Storage',
    ],
  },
  {
    category: 'AI and Automation',
    items: [
      'AI Agents',
      'LLM Applications',
      'Prompt Engineering',
      'Tool Calling',
      'Workflow Automation',
      'Power Automate',
    ],
  },
  {
    category: 'Platforms and Tools',
    items: [
      'Git',
      'GitHub',
      'Cursor',
      'Salesforce',
      'Microsoft Power Platform',
      'Five9',
    ],
  },
];
