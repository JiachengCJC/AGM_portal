
export enum ProjectStatus {
  PLANNING = 'Planning',
  IN_DEVELOPMENT = 'In Development',
  TESTING = 'Testing',
  DEPLOYED = 'Deployed',
  ON_HOLD = 'On Hold'
}

export enum ProjectDomain {
  MEDICAL = 'Medical',
  FINANCE = 'Finance',
  LOGISTICS = 'Logistics',
  MARKETING = 'Marketing',
  RETAIL = 'Retail',
  ENERGY = 'Energy'
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export enum MaturityStage {
  DISCOVERY = 'Discovery',
  PROTOTYPING = 'Prototyping',
  PILOT = 'Pilot',
  PRODUCTION = 'Production'
}

export enum ComplianceStatus {
  COMPLIANT = 'Compliant',
  REVIEW_REQUIRED = 'Review Required',
  PENDING = 'Pending Assessment',
  NON_COMPLIANT = 'Non-Compliant'
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface AIProject {
  id: string;
  name: string;
  domain: ProjectDomain;
  description: string;
  status: ProjectStatus;
  maturityStage: MaturityStage;
  riskLevel: RiskLevel;
  complianceStatus: ComplianceStatus;
  researcher: string;
  startDate: string;
  lastUpdated: string;
  milestones: Milestone[];
  techStack: string[];
  kpis: {
    accuracy?: number;
    latency?: string;
    roi?: string;
  };
}

export type UserRole = 'researcher' | 'management';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
