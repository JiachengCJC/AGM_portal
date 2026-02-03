
import React from 'react';
import { AIProject, ProjectStatus, ProjectDomain, RiskLevel, ComplianceStatus, MaturityStage } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Activity, ShieldAlert, CheckCircle, Target, ArrowUpRight } from 'lucide-react';

interface DashboardProps {
  projects: AIProject[];
  onProjectSelect: (id: string) => void;
}

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];
const RISK_COLORS: Record<string, string> = {
  [RiskLevel.LOW]: '#10b981',
  [RiskLevel.MEDIUM]: '#f59e0b',
  [RiskLevel.HIGH]: '#f97316',
  [RiskLevel.CRITICAL]: '#ef4444'
};

const Dashboard: React.FC<DashboardProps> = ({ projects, onProjectSelect }) => {
  const maturityData = Object.values(MaturityStage).map(stage => ({
    name: stage,
    count: projects.filter(p => p.maturityStage === stage).length
  }));

  const riskData = Object.values(RiskLevel).map(level => ({
    name: level,
    value: projects.filter(p => p.riskLevel === level).length
  })).filter(d => d.value > 0);

  // Mock trend data for visualization impact
  const trendData = [
    { name: 'Jan', val: 40 }, { name: 'Feb', val: 45 }, { name: 'Mar', val: 58 },
    { name: 'Apr', val: 75 }, { name: 'May', val: 82 }, { name: 'Jun', val: 95 }
  ];

  const stats = [
    { label: 'Active Projects', value: projects.length, icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'High Risk Items', value: projects.filter(p => p.riskLevel === RiskLevel.HIGH || p.riskLevel === RiskLevel.CRITICAL).length, icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Compliance Index', value: `${Math.round((projects.filter(p => p.complianceStatus === ComplianceStatus.COMPLIANT).length / projects.length) * 100)}%`, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Strategic ROI', value: '$8.4M', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Level Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div className="flex justify-between items-start">
              <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                +12%
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Maturity Pipeline - Larger View */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 lg:col-span-2 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
              <Target size={18} className="text-indigo-500" />
              Pipeline Maturity Analysis
            </h3>
            <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">
              FY2024 Portfolio
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maturityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontWeight: 700}}
                />
                <Bar dataKey="count" fill="url(#colorBar)" radius={[10, 10, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Breakdown */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
            <ShieldAlert size={18} className="text-rose-500" />
            Security Exposure
          </h3>
          <div className="h-64 w-full relative">
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-slate-900">{projects.length}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Assets</span>
             </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {riskData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={RISK_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {riskData.map(d => (
              <div key={d.name} className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: RISK_COLORS[d.name] }}></div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{d.name}</span>
                  <span className="text-xs font-black text-slate-800">{d.value} Projects</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Trending Area Chart */}
      <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 relative z-10">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight mb-2">Organizational AI Impact Velocity</h3>
            <p className="text-slate-400 text-sm">Aggregated deployment speed and reliability across all divisions.</p>
          </div>
          <div className="mt-6 md:mt-0 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Efficiency Peak</p>
              <p className="text-lg font-black text-white">98.2%</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10"></div>
            <div className="text-left">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Growth Delta</p>
              <p className="text-lg font-black text-emerald-400">+24%</p>
            </div>
          </div>
        </div>
        <div className="h-64 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 700}} />
              <Tooltip 
                contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff'}}
                itemStyle={{color: '#818cf8', fontWeight: 700}}
              />
              <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorTrend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
             <Activity size={18} className="text-indigo-500" />
             Strategic Registry Feed
           </h3>
           <button className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:underline">View All Records</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map(p => (
            <div 
              key={p.id} 
              onClick={() => onProjectSelect(p.id)}
              className="flex flex-col p-6 hover:bg-slate-50 border border-slate-100 hover:border-indigo-100 rounded-3xl cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  {p.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg tracking-tight group-hover:text-indigo-600 transition-colors">{p.name}</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{p.domain}</p>
                </div>
              </div>
              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Lead: {p.researcher}</span>
                  <span className={`px-2 py-0.5 rounded ${
                   p.riskLevel === RiskLevel.LOW ? 'bg-emerald-100 text-emerald-700' :
                   p.riskLevel === RiskLevel.MEDIUM ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {p.riskLevel} Risk
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: `${((Object.values(MaturityStage).indexOf(p.maturityStage) + 1) / Object.values(MaturityStage).length) * 100}%` }}
                   ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
