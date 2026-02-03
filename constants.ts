
import { AIProject, ProjectDomain, ProjectStatus, RiskLevel, MaturityStage, ComplianceStatus } from './types';

export const INITIAL_PROJECTS: AIProject[] = [
  {
    id: '1',
    name: 'MediScan Vision Pro',
    domain: ProjectDomain.MEDICAL,
    description: 'Real-time tumor detection using multimodal imaging and transformer architecture.',
    status: ProjectStatus.IN_DEVELOPMENT,
    maturityStage: MaturityStage.PILOT,
    riskLevel: RiskLevel.HIGH,
    complianceStatus: ComplianceStatus.REVIEW_REQUIRED,
    researcher: 'Dr. Sarah Chen',
    startDate: '2023-11-01',
    lastUpdated: '2024-05-15',
    milestones: [
      { id: 'm1', title: 'Data Collection', dueDate: '2024-01-01', completed: true },
      { id: 'm2', title: 'Model Training', dueDate: '2024-03-01', completed: true },
      { id: 'm3', title: 'Beta Testing', dueDate: '2024-08-01', completed: false },
    ],
    techStack: ['PyTorch', 'NVIDIA TensorRT', 'FastAPI'],
    kpis: { accuracy: 98.4, latency: '120ms', roi: '$2.5M Saved/Yr' }
  },
  {
    id: '2',
    name: 'WealthGuard AI',
    domain: ProjectDomain.FINANCE,
    description: 'Fraud detection engine specialized in high-frequency trading anomalies.',
    status: ProjectStatus.DEPLOYED,
    maturityStage: MaturityStage.PRODUCTION,
    riskLevel: RiskLevel.LOW,
    complianceStatus: ComplianceStatus.COMPLIANT,
    researcher: 'James Wilson',
    startDate: '2023-08-15',
    lastUpdated: '2024-05-10',
    milestones: [
      { id: 'm4', title: 'Infrastructure Setup', dueDate: '2023-09-01', completed: true },
      { id: 'm5', title: 'MVP Release', dueDate: '2024-02-01', completed: true },
    ],
    techStack: ['Scikit-learn', 'Redis', 'Kubernetes'],
    kpis: { accuracy: 99.1, latency: '45ms', roi: '15% Fraud Reduction' }
  },
  {
    id: '3',
    name: 'CardioPredict',
    domain: ProjectDomain.MEDICAL,
    description: 'Predictive analytics for early onset cardiovascular disease based on wearable data.',
    status: ProjectStatus.PLANNING,
    maturityStage: MaturityStage.DISCOVERY,
    riskLevel: RiskLevel.MEDIUM,
    complianceStatus: ComplianceStatus.PENDING,
    researcher: 'Dr. Emily Blunt',
    startDate: '2024-06-01',
    lastUpdated: '2024-05-19',
    milestones: [
      { id: 'm6', title: 'IRB Approval', dueDate: '2024-06-15', completed: false },
    ],
    techStack: ['TensorFlow', 'Apache Spark'],
    kpis: {}
  }
];
