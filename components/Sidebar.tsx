
import React from 'react';
import { LayoutDashboard, FolderKanban, Plus, UserCircle, RefreshCcw, LogOut } from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  setRole: (role: UserRole | null) => void;
  activeTab: 'dashboard' | 'projects';
  setActiveTab: (tab: 'dashboard' | 'projects') => void;
  onNewProject: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, setRole, activeTab, setActiveTab, onNewProject }) => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <span className="text-white font-black text-xl">A</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-white tracking-tight leading-none">AGM Portal</span>
          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] mt-1">AI Oversight</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
            activeTab === 'dashboard' 
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
              : 'hover:bg-slate-800 hover:text-white'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="font-semibold text-sm">Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
            activeTab === 'projects' 
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
              : 'hover:bg-slate-800 hover:text-white'
          }`}
        >
          <FolderKanban size={20} />
          <span className="font-semibold text-sm">Projects</span>
        </button>

        {role === 'researcher' && (
          <button
            onClick={onNewProject}
            className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            <span className="font-bold text-sm tracking-tight">Initiate Project</span>
          </button>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <div className="bg-slate-800/50 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-700 rounded-lg">
              <UserCircle size={20} className="text-slate-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Persona</p>
              <p className="text-sm font-bold text-white capitalize">{role}</p>
            </div>
          </div>
          <button
            onClick={() => setRole(role === 'management' ? 'researcher' : 'management')}
            className="w-full flex items-center justify-center gap-2 text-[10px] font-black py-2.5 px-3 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-all border border-indigo-500/20 uppercase tracking-widest"
          >
            <RefreshCcw size={12} />
            Swap Access
          </button>
        </div>
        
        <button
          onClick={() => setRole(null)}
          className="w-full flex items-center justify-center gap-2 text-[10px] font-black py-3 px-3 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-400/5 transition-all uppercase tracking-widest"
        >
          <LogOut size={14} />
          Exit Portal
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
