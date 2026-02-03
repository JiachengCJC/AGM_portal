
import React, { useState } from 'react';
import { AIProject, ProjectStatus, Milestone, MaturityStage, RiskLevel, ComplianceStatus } from '../types';
import { X, Calendar, User, Code, CheckCircle2, Circle, Save, Trash2, ShieldCheck, AlertCircle, Layers, Server, Cpu } from 'lucide-react';

interface ProjectDetailProps {
  project: AIProject;
  onClose: () => void;
  isEditable: boolean;
  onUpdate: (project: AIProject) => void;
}

const STAGES = Object.values(MaturityStage);

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, isEditable, onUpdate }) => {
  const [editedProject, setEditedProject] = useState<AIProject>(project);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleMilestone = (milestoneId: string) => {
    if (!isEditable) return;
    const updatedMilestones = editedProject.milestones.map(m => 
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );
    const updated = { ...editedProject, milestones: updatedMilestones };
    setEditedProject(updated);
    if (!isEditing) onUpdate(updated);
  };

  const handleSave = () => {
    onUpdate(editedProject);
    setIsEditing(false);
  };

  const currentStageIndex = STAGES.indexOf(project.maturityStage);

  return (
    <div className="bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-200">
      <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-slate-100 p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">
            {project.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{isEditing ? 'Edit Project Definition' : project.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-black uppercase tracking-widest">{project.domain}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                project.riskLevel === RiskLevel.LOW ? 'text-emerald-500' : 
                project.riskLevel === RiskLevel.MEDIUM ? 'text-amber-500' : 'text-rose-500'
              }`}>
                {project.riskLevel} Risk Profile
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditable && !isEditing && (
            <button onClick={() => setIsEditing(true)} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md">
              Modify Parameters
            </button>
          )}
          {isEditing && (
            <button onClick={handleSave} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md">
              <Save size={14} /> Commit Changes
            </button>
          )}
          <button onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-all">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Maturity Pipeline Visualizer */}
        <div className="mb-12 bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Project Maturity Lifecycle</h3>
          <div className="flex items-center justify-between w-full relative max-w-3xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 -z-0 rounded-full">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                style={{ width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%` }}
              ></div>
            </div>
            {STAGES.map((stage, idx) => {
              const isActive = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div key={stage} className="flex flex-col items-center gap-3 relative z-10 bg-slate-50 px-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                    isCurrent ? 'bg-indigo-600 border-indigo-400 text-white scale-110 shadow-xl shadow-indigo-200' :
                    isActive ? 'bg-white border-indigo-100 text-indigo-500 shadow-sm' :
                    'bg-slate-100 border-slate-200 text-slate-300'
                  }`}>
                    {isActive ? <CheckCircle2 size={20} /> : <span className="text-sm font-black">{idx + 1}</span>}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    isCurrent ? 'text-indigo-600' : isActive ? 'text-slate-500' : 'text-slate-300'
                  }`}>
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                Executive Brief
              </h3>
              {isEditing ? (
                <textarea 
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[140px] outline-none transition-all"
                  value={editedProject.description}
                  onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                />
              ) : (
                <p className="text-slate-600 leading-relaxed text-lg font-medium">{project.description}</p>
              )}
            </section>

            {/* Technical Architecture Visualization */}
            <section>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                Architecture Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex flex-col items-center text-center group hover:bg-indigo-50 transition-colors">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 mb-3">
                    <Cpu size={20} />
                  </div>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Compute</p>
                  <p className="text-xs font-bold text-slate-800">High-Performance Neural Engines</p>
                </div>
                <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex flex-col items-center text-center group hover:bg-emerald-50 transition-colors">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 mb-3">
                    <Layers size={20} />
                  </div>
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Inference</p>
                  <p className="text-xs font-bold text-slate-800">Distributed Transformer Nodes</p>
                </div>
                <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-2xl flex flex-col items-center text-center group hover:bg-amber-50 transition-colors">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-amber-600 mb-3">
                    <Server size={20} />
                  </div>
                  <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Deployment</p>
                  <p className="text-xs font-bold text-slate-800">Edge-Optimized Containers</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-indigo-400" size={24} />
                  <h3 className="text-sm font-bold uppercase tracking-widest">Governance & Compliance</h3>
                </div>
                <span className={`flex items-center gap-1.5 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                  project.complianceStatus === ComplianceStatus.COMPLIANT ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  project.complianceStatus === ComplianceStatus.REVIEW_REQUIRED ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-700 text-slate-300'
                }`}>
                  {project.complianceStatus}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed relative z-10">
                AGM Continuous Monitoring is active. This project adheres to ISO/IEC 42001 AI Management Standards. 
                {project.riskLevel === RiskLevel.HIGH ? " Bi-weekly forensic audits are currently mandated for this risk profile." : " Standard quarterly assessments apply."}
              </p>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Global Risk Score</p>
                  <p className="text-lg font-black text-white">{project.riskLevel}</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Maturity Health</p>
                  <p className="text-lg font-black text-white">{project.maturityStage}</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                Strategic Milestones
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {editedProject.milestones.map(m => (
                  <div 
                    key={m.id} 
                    onClick={() => handleToggleMilestone(m.id)}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                      m.completed ? 'bg-emerald-50 border-emerald-100 shadow-sm' : 'bg-white border-slate-100 hover:border-indigo-200'
                    } ${isEditable ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${m.completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300'}`}>
                        {m.completed ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                      </div>
                      <span className={`text-sm font-bold ${m.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{m.title}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due {m.dueDate}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 sticky top-32">
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Principal Personnel</h3>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-indigo-100">
                        {project.researcher.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Lead Investigator</p>
                        <p className="text-sm font-black text-slate-900">{project.researcher}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Last Registry Update</p>
                        <p className="text-sm font-black text-slate-900">{project.lastUpdated}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Technical Ecosystem</h3>
                   <div className="flex flex-wrap gap-2">
                     {project.techStack.map(tech => (
                        <span key={tech} className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest">
                          {tech}
                        </span>
                     ))}
                   </div>
                </div>

                {project.kpis && Object.keys(project.kpis).length > 0 && (
                   <div className="pt-8 border-t border-slate-100">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Performance Vectors</h3>
                      <div className="space-y-4">
                         {project.kpis.accuracy && (
                            <div className="space-y-1.5">
                               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                  <span className="text-slate-400">Model Accuracy</span>
                                  <span className="text-emerald-600">{project.kpis.accuracy}%</span>
                               </div>
                               <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.kpis.accuracy}%` }}></div>
                               </div>
                            </div>
                         )}
                         {project.kpis.latency && (
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inference Latency</span>
                               <span className="text-sm font-black text-slate-900">{project.kpis.latency}</span>
                            </div>
                         )}
                         {project.kpis.roi && (
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fiscal Value</span>
                               <span className="text-sm font-black text-indigo-600">{project.kpis.roi}</span>
                            </div>
                         )}
                      </div>
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
