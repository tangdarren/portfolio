export type ProjectCategory =
  | 'Full-Stack'
  | 'AI'
  | 'Financial Technology'
  | 'Mobile'
  | 'Extended Reality'
  | 'Data Visualization'
  | 'Automation'
  | 'Interactive Training';

export interface Project {
  id: string;
  name: string;
  summary: string;
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  image?: string;
  details: {
    problem: string;
    solution: string;
    keyFeatures: string[];
    technicalDecisions: string[];
  };
}

const PLACEHOLDER = 'PLACEHOLDER_URL';

export const PROJECTS: Project[] = [
  {
    id: 'spy-market-intelligence',
    name: 'SPY Market Intelligence Dashboard',
    summary:
      'A recruiter-facing market intelligence platform that surfaces SPY trends, overnight movement, and pre-market prep in one view.',
    description:
      'Transforms SPY market data into clear trends, overnight movement analysis, market context, and pre-market preparation insights for daily decision-making.',
    categories: ['Full-Stack', 'Financial Technology', 'Data Visualization'],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Alpha Vantage API',
      'Financial APIs',
      'Data Visualization',
    ],
    githubUrl: PLACEHOLDER,
    liveUrl: PLACEHOLDER,
    featured: true,
    details: {
      problem:
        'Traders and analysts often stitch together fragmented data sources when preparing for the market open, which is slow and error-prone.',
      solution:
        'A single dashboard that consolidates SPY data into trend context, overnight movement, and a pre-market brief so users can start each session with an informed baseline.',
      keyFeatures: [
        'SPY trend visualization with contextual annotations.',
        'Overnight movement summary with directional cues.',
        'Pre-market preparation panel highlighting key levels.',
        'Modular architecture that supports adding new data feeds.',
      ],
      technicalDecisions: [
        'React + TypeScript for a strongly-typed component tree.',
        'Vite for fast local iteration and lean production builds.',
        'Alpha Vantage as the primary data source, wrapped behind a small client for easy provider swaps.',
      ],
    },
  },
  {
    id: 'expensense',
    name: 'ExpenSense',
    summary:
      'An AI multi-agent reimbursement platform that reads receipts, checks policy, routes approvals, and flags anomalies.',
    description:
      'Processes receipts, validates policy requirements, routes approvals, identifies anomalies, and maintains structured audit records — coordinated by a set of cooperating AI agents.',
    categories: ['Full-Stack', 'AI', 'Automation'],
    technologies: [
      'React',
      'Vite',
      'Gmail API',
      'Firebase',
      'Firestore',
      'Cloud Storage',
      'Vector Database',
      'AI Agents',
    ],
    githubUrl: PLACEHOLDER,
    liveUrl: PLACEHOLDER,
    featured: true,
    details: {
      problem:
        'Expense reimbursement is repetitive, spread across email and spreadsheets, and frequently loses context between submission and approval.',
      solution:
        'A multi-agent workflow where specialized agents handle ingestion, policy validation, routing, anomaly detection, and audit — with a clean review UI on top.',
      keyFeatures: [
        'Receipt ingestion from email attachments via the Gmail API.',
        'Policy validation agent with configurable rule sets.',
        'Approval routing with structured status tracking.',
        'Anomaly detection surfaced in the reviewer queue.',
        'Structured audit trail persisted in Firestore.',
      ],
      technicalDecisions: [
        'Firebase + Firestore for auth, storage, and structured records without standing up a separate backend.',
        'Vector database for retrieval when agents need contextual policy lookups.',
        'React + Vite for a responsive reviewer UI.',
      ],
    },
  },
  {
    id: 'business-finance-dashboard',
    name: 'Business Finance Dashboard',
    summary:
      'A finance dashboard for tracking income, expenses, tax estimates, and overall business performance.',
    description:
      'A business finance application for tracking income, expenses, tax estimates, and financial performance through an accessible dashboard.',
    categories: ['Full-Stack', 'Financial Technology'],
    technologies: ['React', 'TypeScript', 'Recharts', 'Local Storage'],
    githubUrl: PLACEHOLDER,
    liveUrl: PLACEHOLDER,
    details: {
      problem:
        'Small operators frequently rely on spreadsheets that make it hard to see business health at a glance.',
      solution:
        'An accessible dashboard that visualizes income, expenses, and tax estimates alongside longer-term performance.',
      keyFeatures: [
        'Income and expense tracking with categorization.',
        'Tax estimate calculations.',
        'Performance charts powered by Recharts.',
        'Local Storage persistence for a friction-free demo.',
      ],
      technicalDecisions: [
        'Kept state local for a fast, dependency-light demo.',
        'Chose Recharts for accessible, composable charts.',
      ],
    },
  },
  {
    id: 'vr-first-responder-training',
    name: 'VR First-Responder Training',
    summary:
      'An immersive WebSpatial training experience prototyping scenarios for first responders.',
    description:
      'An immersive WebSpatial training experience created during Hack for Humanity 2026 to explore interactive training scenarios for first responders.',
    categories: ['Extended Reality', 'Interactive Training'],
    technologies: [
      'WebSpatial',
      'React',
      'Extended Reality',
      'Interactive Training',
    ],
    githubUrl: PLACEHOLDER,
    liveUrl: PLACEHOLDER,
    details: {
      problem:
        'Hands-on training for first responders is expensive to run and hard to repeat at scale.',
      solution:
        'A WebSpatial prototype that lets trainees rehearse scenarios in an immersive environment with structured decision points.',
      keyFeatures: [
        'Immersive training scenarios in WebSpatial.',
        'Interactive decision moments to reinforce protocol.',
        'React-based UI for scenario controls and review.',
      ],
      technicalDecisions: [
        'WebSpatial chosen to reach modern spatial browsers without a heavy install path.',
        'React used for standard UI surfaces so the same team can iterate across web and spatial views.',
      ],
    },
  },
  {
    id: 'flutter-book-club-app',
    name: 'Flutter Book Club App',
    summary:
      'A Flutter mobile app for exploring and organizing books with structured state management.',
    description:
      'A Flutter application for exploring and organizing books using structured state management and responsive mobile interfaces.',
    categories: ['Mobile', 'Full-Stack'],
    technologies: ['Flutter', 'Dart', 'BLoC', 'Responsive Design'],
    githubUrl: PLACEHOLDER,
    liveUrl: PLACEHOLDER,
    details: {
      problem:
        'Casual reading groups need a lightweight way to organize books without a heavy social platform.',
      solution:
        'A focused Flutter app that keeps state predictable via BLoC and adapts cleanly to different screen sizes.',
      keyFeatures: [
        'Book browsing and organization surfaces.',
        'BLoC-based state management for predictable UI updates.',
        'Responsive layouts across mobile form factors.',
      ],
      technicalDecisions: [
        'Chose BLoC to keep business logic separable and testable.',
        'Used Flutter for cross-platform reach from a single codebase.',
      ],
    },
  },
];

export const PROJECT_FILTERS: readonly (ProjectCategory | 'All')[] = [
  'All',
  'Full-Stack',
  'AI',
  'Financial Technology',
  'Mobile',
  'Extended Reality',
] as const;
