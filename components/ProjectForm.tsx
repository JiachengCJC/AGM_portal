
import React, { useState } from 'react';
import { AIProject, ProjectStatus, ProjectDomain, RiskLevel, MaturityStage, ComplianceStatus } from '../types';
import { X, Plus, Trash2, Shield, Info } from 'lucide-react';

interface ProjectFormProps {
  onClose: () => void;
  onSubmit: (project: AIProject) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<AIProject>>({
    name: '',
    description: '',
    domain: ProjectDomain.MEDICAL,
    status: ProjectStatus.PLANNING,
    maturityStage: MaturityStage.DISCOVERY,
    riskLevel: RiskLevel.LOW,
    complianceStatus: ComplianceStatus.PENDING,
    researcher: '',
    techStack: [],
    milestones: [],
    kpis: {}
  });

  const [newTech, setNewTech] = useState('');

  const addTech = () => {
    if (newTech && !formData.techStack?.includes(newTech)) {
      setFormData({ ...formData, techStack: [...(formData.techStack || []), newTech] });
      setNewTech('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData({ ...formData, techStack: formData.techStack?.filter(t => t !== tech) });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.researcher) return;

    const project: AIProject = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Untitled Project',
      description: formData.description || '',
      domain: (formData.domain as ProjectDomain) || ProjectDomain.MEDICAL,
      status: (formData.status as ProjectStatus) || ProjectStatus.PLANNING,
      maturityStage: (formData.maturityStage as MaturityStage) || MaturityStage.DISCOVERY,
      riskLevel: (formData.riskLevel as RiskLevel) || RiskLevel.LOW,
      complianceStatus: (formData.complianceStatus as ComplianceStatus) || ComplianceStatus.PENDING,
      researcher: formData.researcher || '',
      startDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      milestones: formData.milestones || [],
      techStack: formData.techStack || [],
      kpis: formData.kpis || {}
    };

    onSubmit(project);
  };

  return (
    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800">Initiate AI Project</h2>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleFormSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Project Name</label>
            <input required type="text" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Domain</label>
            <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" value={formData.domain} onChange={e => setFormData({ ...formData, domain: e.target.value as ProjectDomain })}>
              {Object.values(ProjectDomain).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Lead Researcher</label>
            <input required type="text" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" value={formData.researcher} onChange={e => setFormData({ ...formData, researcher: e.target.value })} />
          </div>
        </div>

        {/* Governance & Lifecycle Section */}
        <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-indigo-600" />
            <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-tight">Governance & Pipeline Setup</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-indigo-400 uppercase">Maturity Stage</label>
              <select className="w-full px-3 py-2 bg-white border border-indigo-100 rounded-xl text-sm" value={formData.maturityStage} onChange={e => setFormData({ ...formData, maturityStage: e.target.value as MaturityStage })}>
                {Object.values(MaturityStage).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-indigo-400 uppercase">Risk Assessment</label>
              <select className="w-full px-3 py-2 bg-white border border-indigo-100 rounded-xl text-sm" value={formData.riskLevel} onChange={e => setFormData({ ...formData, riskLevel: e.target.value as RiskLevel })}>
                {Object.values(RiskLevel).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-indigo-400 uppercase">Compliance Initial</label>
              <select className="w-full px-3 py-2 bg-white border border-indigo-100 rounded-xl text-sm" value={formData.complianceStatus} onChange={e => setFormData({ ...formData, complianceStatus: e.target.value as ComplianceStatus })}>
                {Object.values(ComplianceStatus).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <p className="text-[10px] text-indigo-400 flex items-start gap-1">
            <Info size={12} className="shrink-0" />
            Risk levels determine the frequency of ethics committee reviews. Maturity stages track the project from lab to scale.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Project Overview</label>
          <textarea className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl min-h-[100px] focus:ring-2 focus:ring-indigo-500" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Initial Tech Stack</label>
          <div className="flex gap-2 mb-2">
            <input type="text" className="flex-1 px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500" value={newTech} onChange={e => setNewTech(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="e.g. Transformers" />
            <button type="button" onClick={addTech} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-bold transition-all">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.techStack?.map(tech => (
              <span key={tech} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold">
                {tech}
                <button type="button" onClick={() => removeTech(tech)} className="hover:text-rose-500"><X size={12} /></button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all">
          Launch Project Pipeline
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
