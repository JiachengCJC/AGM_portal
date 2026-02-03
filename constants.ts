
import { AIProject, ProjectDomain, ProjectStatus, RiskLevel, MaturityStage, ComplianceStatus } from './types';

export const INITIAL_PROJECTS: AIProject[] = [
  {
    id: 'prj-001',
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
    id: 'prj-002',
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
    id: 'prj-003',
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
    kpis: { accuracy: 92.3 }
  },
  {
    id: 'prj-004',
    name: 'HydroSense Optimizer',
    domain: ProjectDomain.ENERGY,
    description: 'Forecasts turbine output and automates hydropower dispatch using graph neural networks.',
    status: ProjectStatus.IN_DEVELOPMENT,
    maturityStage: MaturityStage.PROTOTYPING,
    riskLevel: RiskLevel.MEDIUM,
    complianceStatus: ComplianceStatus.REVIEW_REQUIRED,
    researcher: 'Anika Rao',
    startDate: '2024-02-10',
    lastUpdated: '2024-12-15',
    milestones: [
      { id: 'm7', title: 'Telemetry Ingestion', dueDate: '2024-04-01', completed: true },
      { id: 'm8', title: 'Dispatch Simulator', dueDate: '2024-09-15', completed: false }
    ],
    techStack: ['PyTorch Geometric', 'Rust', 'Kafka'],
    kpis: { roi: '3.1% Yield Gain' }
  },
  {
    id: 'prj-005',
    name: 'LogiChain Router',
    domain: ProjectDomain.LOGISTICS,
    description: 'Dynamic route planning for multimodal freight with reinforcement learning.',
    status: ProjectStatus.DEPLOYED,
    maturityStage: MaturityStage.PRODUCTION,
    riskLevel: RiskLevel.LOW,
    complianceStatus: ComplianceStatus.COMPLIANT,
    researcher: 'Miguel Alvarez',
    startDate: '2023-05-12',
    lastUpdated: '2025-01-09',
    milestones: [
      { id: 'm9', title: 'RL Policy Rollout', dueDate: '2023-12-01', completed: true },
      { id: 'm10', title: 'Carrier Integration', dueDate: '2024-06-30', completed: true }
    ],
    techStack: ['Ray RLlib', 'Go', 'PostGIS'],
    kpis: { latency: '35ms', roi: '18% Cost Reduction' }
  },
  {
    id: 'prj-006',
    name: 'RetailVision 360',
    domain: ProjectDomain.RETAIL,
    description: 'In-store vision analytics for shrinkage detection and planogram compliance.',
    status: ProjectStatus.TESTING,
    maturityStage: MaturityStage.PILOT,
    riskLevel: RiskLevel.MEDIUM,
    complianceStatus: ComplianceStatus.REVIEW_REQUIRED,
    researcher: 'Priya Kulkarni',
    startDate: '2024-03-20',
    lastUpdated: '2025-01-28',
    milestones: [
      { id: 'm11', title: 'Edge Model Quantization', dueDate: '2024-07-15', completed: true },
      { id: 'm12', title: 'Privacy Review', dueDate: '2025-02-10', completed: false }
    ],
    techStack: ['ONNX', 'OpenVINO', 'TypeScript'],
    kpis: { accuracy: 94.8 }
  },
  {
    id: 'prj-007',
    name: 'AdAstra Creative Studio',
    domain: ProjectDomain.MARKETING,
    description: 'Generative campaign assistant with brand safety guardrails and asset A/B scoring.',
    status: ProjectStatus.PLANNING,
    maturityStage: MaturityStage.DISCOVERY,
    riskLevel: RiskLevel.LOW,
    complianceStatus: ComplianceStatus.PENDING,
    researcher: 'Lauren Reed',
    startDate: '2025-01-05',
    lastUpdated: '2025-02-01',
    milestones: [
      { id: 'm13', title: 'Brand Policy Encoding', dueDate: '2025-03-01', completed: false }
    ],
    techStack: ['Next.js', 'Prompt Layer', 'Pinecone'],
    kpis: {}
  },
  {
    id: 'prj-008',
    name: 'NeuroShield Guardian',
    domain: ProjectDomain.MEDICAL,
    description: 'Adverse event detection for neurology wards with continual learning.',
    status: ProjectStatus.IN_DEVELOPMENT,
    maturityStage: MaturityStage.PILOT,
    riskLevel: RiskLevel.CRITICAL,
    complianceStatus: ComplianceStatus.NON_COMPLIANT,
    researcher: 'Dr. Omar Haddad',
    startDate: '2024-01-18',
    lastUpdated: '2025-01-15',
    milestones: [
      { id: 'm14', title: 'Audit Findings Remediation', dueDate: '2025-02-20', completed: false }
    ],
    techStack: ['PyTorch', 'Great Expectations', 'Airflow'],
    kpis: { accuracy: 91.2, latency: '180ms' }
  },
  {
    id: 'prj-009',
    name: 'VoltSight Grid AI',
    domain: ProjectDomain.ENERGY,
    description: 'Predicts transformer failures and optimizes grid maintenance scheduling.',
    status: ProjectStatus.TESTING,
    maturityStage: MaturityStage.PROTOTYPING,
    riskLevel: RiskLevel.HIGH,
    complianceStatus: ComplianceStatus.REVIEW_REQUIRED,
    researcher: 'Chen Wei',
    startDate: '2024-04-02',
    lastUpdated: '2025-01-22',
    milestones: [
      { id: 'm15', title: 'Historical Failure Labeling', dueDate: '2024-08-30', completed: true },
      { id: 'm16', title: 'Live Substation Trial', dueDate: '2025-03-15', completed: false }
    ],
    techStack: ['LightGBM', 'Scala', 'Delta Lake'],
    kpis: { roi: '$1.2M Avoided Outages' }
  },
  {
    id: 'prj-010',
    name: 'AeroRoute Sentinel',
    domain: ProjectDomain.LOGISTICS,
    description: 'Irregular operations predictor for air cargo hubs with graph forecasting.',
    status: ProjectStatus.IN_DEVELOPMENT,
    maturityStage: MaturityStage.PROTOTYPING,
    riskLevel: RiskLevel.MEDIUM,
    complianceStatus: ComplianceStatus.PENDING,
    researcher: 'Hiro Tanaka',
    startDate: '2024-09-01',
    lastUpdated: '2025-01-30',
    milestones: [
      { id: 'm17', title: 'Delay Classifier', dueDate: '2024-11-15', completed: true },
      { id: 'm18', title: 'Airport API Integration', dueDate: '2025-02-28', completed: false }
    ],
    techStack: ['Temporal Fusion Transformer', 'Dask', 'PostgreSQL'],
    kpis: { accuracy: 87.5 }
  },
  {
    id: 'prj-011',
    name: 'HarvestIQ Energy',
    domain: ProjectDomain.ENERGY,
    description: 'Optimizes microgrid storage dispatch with weather-informed price curves.',
    status: ProjectStatus.PLANNING,
    maturityStage: MaturityStage.DISCOVERY,
    riskLevel: RiskLevel.LOW,
    complianceStatus: ComplianceStatus.PENDING,
    researcher: 'Naomi Feldman',
    startDate: '2025-02-01',
    lastUpdated: '2025-02-03',
    milestones: [
      { id: 'm19', title: 'Data Vendor Selection', dueDate: '2025-03-15', completed: false }
    ],
    techStack: ['JAX', 'DuckDB', 'Grafana'],
    kpis: {}
  },
  {
    id: 'prj-012',
    name: 'FinPath ESG Auditor',
    domain: ProjectDomain.FINANCE,
    description: 'LLM-based ESG disclosure auditor with citation tracing and bias checks.',
    status: ProjectStatus.TESTING,
    maturityStage: MaturityStage.PILOT,
    riskLevel: RiskLevel.MEDIUM,
    complianceStatus: ComplianceStatus.REVIEW_REQUIRED,
    researcher: 'Sofia Martins',
    startDate: '2024-07-12',
    lastUpdated: '2025-01-25',
    milestones: [
      { id: 'm20', title: 'SEC Sample Evaluation', dueDate: '2024-10-01', completed: true },
      { id: 'm21', title: 'Model Card Publication', dueDate: '2025-02-18', completed: false }
    ],
    techStack: ['LangChain', 'Elasticsearch', 'Vertex AI'],
    kpis: { accuracy: 88.9, roi: '40% Reviewer Time Saved' }
  }
];
