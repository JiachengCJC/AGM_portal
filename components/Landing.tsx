
import React from 'react';
import { UserRole } from '../types';
import { ShieldCheck, Microscope, ArrowRight, Zap } from 'lucide-react';

interface LandingProps {
  onSelectRole: (role: UserRole) => void;
}

const Landing: React.FC<LandingProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 text-center mb-16 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
          <Zap size={14} /> Intelligence Oversight System
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          AI Management & Monitoring <span className="text-indigo-500">Portal</span>
        </h1>
        <p className="text-2xl font-bold text-indigo-400 mb-8 tracking-wide">AGM Portal</p>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          The centralized command center for monitoring, governing, and scaling AI initiatives across the enterprise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl z-10">
        {/* Management Card */}
        <button 
          onClick={() => onSelectRole('management')}
          className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 p-8 rounded-[2.5rem] text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
        >
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-600/20">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Senior Management</h3>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Access the governance dashboard, monitor risk portfolios, and query the AGM AI Assistant for executive summaries.
          </p>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            Enter Dashboard <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Researcher Card */}
        <button 
          onClick={() => onSelectRole('researcher')}
          className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 p-8 rounded-[2.5rem] text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
        >
          <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-600/20">
            <Microscope size={28} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">AI Researcher</h3>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Report project progress, update tech stacks, and manage deployment lifecycles for your AI initiatives.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            Start Reporting <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      <div className="mt-20 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
        Enterprise Secure • Powered by AGM Intelligence
      </div>
    </div>
  );
};

export default Landing;
