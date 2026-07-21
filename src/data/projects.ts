export type ProjectCategory =
  | 'Full-Stack'
  | 'AI'
  | 'Financial Technology'
  | 'Mobile'
  | 'Extended Reality'
  | 'Data Visualization'
  | 'Automation'
  | 'Interactive Training';

export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface ProjectCaseStudy {
  role?: string;
  timeline?: string;
  status?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  architecture?: string[];
  lessonsLearned?: string[];
  screenshots?: ProjectScreenshot[];
}

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
  screenshots?: ProjectScreenshot[];
  caseStudy?: ProjectCaseStudy;
  details: {
    problem: string;
    solution: string;
    keyFeatures: string[];
    technicalDecisions: string[];
  };
}

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
    githubUrl: 'https://github.com/tangdarren/stock-market-dashboard',
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
    caseStudy: {
      challenge:
        'Traders and analysts often stitch together fragmented data sources when preparing for the market open, which is slow and error-prone.',
      approach:
        'Build a full-stack market intelligence dashboard that combines live SPY data or explicitly enabled Excel simulation data with explainable forecasts, historical replay, and model monitoring.',
      outcome:
        'Delivers educational one-day and five-session SPY directional forecasts with current market indicators, a Market Replay Lab, and a Model Monitor across forecast horizons.',
      architecture: [
        'React + TypeScript + Vite frontend talks to a FastAPI REST backend.',
        'Backend serves live Alpha Vantage data or an opt-in Excel simulation workbook.',
        'pandas / scikit-learn produce local model artifacts used for forecasts.',
        'Market Replay Lab supports reviewing historical sessions, locking predictions, and revealing outcomes.',
      ],
      lessonsLearned: [
        'Simulated mode stays opt-in and never activates automatically when live data fails.',
        'Keep the Alpha Vantage API key backend-only.',
        'Build forecast features to avoid look-ahead leakage; forecasts remain probabilistic and educational.',
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
    githubUrl: 'https://github.com/tangdarren/expensense',
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
    caseStudy: {
      challenge:
        'Expense reimbursement is repetitive, spread across email and spreadsheets, and frequently loses context between submission and approval.',
      approach:
        'Coordinate specialized AI agents for receipt OCR and validation, policy-aware reimbursement decisions, anomaly detection, admin review, and full audit logging across the expense-review lifecycle.',
      outcome:
        'Automates receipt processing, policy rules (R1–R5), anomaly flagging, and admin approve/reject workflows with structured audit records.',
      architecture: [
        'Presentation layer — web UI for employees and admins (React / Vite).',
        'Business logic layer — traditional backend workflow and validation (FastAPI).',
        'Agent logic layer — Expense, Document, Email, and Orchestrator agents.',
        'Data access layer — CRUD abstraction for Firestore, Cloud Storage, Gmail, and a vector database.',
        'Expense Agent handles OCR validation, rule checking, and anomaly detection; Document Agent handles receipt/PDF extraction; Email Agent handles notifications; Orchestrator routes tasks.',
      ],
      lessonsLearned: [
        'A MAESTRO-aligned red-team suite (29 tests across 7 layers and 4 agents) surfaced 5 vulnerabilities, primarily RBAC-related, with documented mitigation recommendations.',
        'Policy retrieval via a vector database needs safeguard grounding to keep agent decisions auditable.',
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
    caseStudy: {
      challenge:
        'Small operators frequently rely on spreadsheets that make it hard to see business health at a glance.',
      approach:
        'An accessible dashboard that visualizes income, expenses, and tax estimates alongside longer-term performance.',
      architecture: [
        'Income and expense tracking with categorization.',
        'Tax estimate calculations surfaced in the dashboard.',
        'Performance charts powered by Recharts.',
        'Local Storage persistence for a dependency-light demo.',
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
    githubUrl: 'https://github.com/tangdarren/safecall-vr',
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
    caseStudy: {
      timeline:
        'Prototyped at Santa Clara University’s 2026 Hackathon for Humanity, with further enhancement afterwards.',
      status:
        'Focused 911 call console, backend scenarios/sessions/debriefs, Apple Vision Pro simulator flow, and physical device validation are implemented; voice, maps, AI, authentication, and database persistence remain planned enhancements.',
      challenge:
        'Hands-on training for first responders is expensive to run and hard to repeat at scale.',
      approach:
        'Build an Apple Vision Pro / WebSpatial experience backed by a Spring Boot REST API where learners work through scripted 911-style calls, make stage-based decisions, dispatch a response, and receive a deterministic debrief.',
      outcome:
        'Validated in the Apple Vision Pro simulator and on a physical Apple Vision Pro device provided for testing at the hackathon.',
      architecture: [
        'Single main scene flow: launcher → scenario selection → focused call console → in-scene debrief.',
        'Call transcript and current decision form the primary active-call experience; the backend remains authoritative.',
        'Spatial app: React, Vite, TypeScript, Vitest, and the WebSpatial SDK.',
        'Backend: Java 21 and Spring Boot with Maven Wrapper.',
        'CI via GitHub Actions for backend and spatial-app jobs.',
      ],
      lessonsLearned: [
        'Keep the backend authoritative for scenario state, sessions, and debriefs.',
        'Optional in-page view references can illustrate scenes without separate spatial windows.',
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
    caseStudy: {
      challenge:
        'Casual reading groups need a lightweight way to organize books without a heavy social platform.',
      approach:
        'A focused Flutter app that keeps state predictable via BLoC and adapts cleanly to different screen sizes.',
      architecture: [
        'Book browsing and organization surfaces.',
        'BLoC-based state management for predictable UI updates.',
        'Responsive layouts across mobile form factors.',
      ],
    },
  },
];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}

export const PROJECT_FILTERS: readonly (ProjectCategory | 'All')[] = [
  'All',
  'Full-Stack',
  'AI',
  'Financial Technology',
  'Mobile',
  'Extended Reality',
] as const;
