
import React, { useState } from 'react';
import { AIProject, ProjectStatus, ProjectDomain, RiskLevel } from '../types';
import { Search, Filter, ChevronRight, Hash, User2, Clock } from 'lucide-react';

interface ProjectListProps {
  projects: AIProject[];
  onSelect: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState<string>('All');

  const filtered = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.researcher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = filterDomain === 'All' || p.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search registry (e.g., 'Sarah Chen' or 'Transformers')..." 
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:bg-white outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl">
             <Filter size={14} className="text-slate-400" />
             <select 
              className="bg-transparent border-none text-[11px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer"
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
            >
              <option value="All">All Sectors</option>
              {Object.values(ProjectDomain).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map(project => (
          <div 
            key={project.id}
            onClick={() => onSelect(project.id)}
            className="group bg-white p-5 rounded-2xl border border-slate-200/60 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer relative"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-black text-lg group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                {project.name.charAt(0)}
              </div>
              
              <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      project.riskLevel === RiskLevel.HIGH ? 'bg-rose-500 animate-pulse' :
                      project.riskLevel === RiskLevel.MEDIUM ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}></div>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 font-medium italic">{project.description}</p>
                </div>

                <div className="col-span-2 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Hash size={10} /> Sector
                  </div>
                  <span className="text-[11px] font-black text-slate-700">{project.domain}</span>
                </div>

                <div className="col-span-2 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <User2 size={10} /> Lead
                  </div>
                  <span className="text-[11px] font-black text-slate-700">{project.researcher}</span>
                </div>

                <div className="col-span-2 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Clock size={10} /> Stage
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">
                      {project.maturityStage}
                    </span>
                  </div>
                </div>

                <div className="col-span-1 flex justify-end">
                   <ChevronRight className="text-slate-200 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" size={20} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Search className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-400 text-sm font-black uppercase tracking-widest">No matching registry records</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
