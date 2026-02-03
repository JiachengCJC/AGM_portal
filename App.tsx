
import React, { useState, useEffect } from 'react';
import { UserRole, AIProject } from './types';
import { supabase } from './services/supabaseClient';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import ProjectForm from './components/ProjectForm';
import ChatSidebar from './components/ChatSidebar';
import Landing from './components/Landing';
import { Loader2, CloudSync } from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [projects, setProjects] = useState<AIProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects'>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('last_updated', { ascending: false });

        if (error) throw error;
        if (data) setProjects(data as AIProject[]);
      } catch (err) {
        console.error('Data Fetch Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = async (newProject: AIProject) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([newProject])
        .select();

      if (error) throw error;
      setProjects(prev => [data[0] as AIProject, ...prev]);
      setIsFormOpen(false);
    } catch (err) {
      alert('Failed to save to Supabase. Check your connection/keys.');
      console.error(err);
    }
  };

  const handleUpdateProject = async (updated: AIProject) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          ...updated,
          last_updated: new Date().toISOString()
        })
        .eq('id', updated.id);

      if (error) throw error;
      setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
      setSelectedProjectId(null);
    } catch (err) {
      alert('Update failed');
      console.error(err);
    }
  };

  if (!role) {
    return <Landing onSelectRole={setRole} />;
  }

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-900 animate-in fade-in duration-700 font-sans">
      <Sidebar 
        role={role} 
        setRole={setRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNewProject={() => setIsFormOpen(true)}
      />

      <main className="flex-1 overflow-y-auto relative flex flex-col">
        {/* Header Bar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-10 py-5 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {activeTab === 'dashboard' ? 'Portfolio Intelligence' : 'AGM Project Registry'}
              </h1>
              <div className="px-2 py-0.5 bg-indigo-50 rounded text-[9px] font-black text-indigo-600 uppercase tracking-widest border border-indigo-100">
                Live
              </div>
            </div>
            <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">
              {role === 'management' ? 'Governance & Oversight Mode' : 'Researcher Reporting Mode'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full shadow-sm">
                <CloudSync className={`w-3.5 h-3.5 ${isLoading ? 'text-amber-500 animate-spin' : 'text-emerald-500'}`} />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {isLoading ? 'Syncing...' : 'Encrypted Cloud'}
                </span>
             </div>
          </div>
        </header>

        <div className="p-10 flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-slate-300 gap-4">
              <Loader2 className="animate-spin text-indigo-500" size={40} strokeWidth={3} />
              <p className="text-sm font-black uppercase tracking-[0.2em]">Establishing Handshake...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' ? (
                <Dashboard projects={projects} onProjectSelect={(id) => { setSelectedProjectId(id); setActiveTab('projects'); }} />
              ) : (
                <ProjectList 
                  projects={projects} 
                  onSelect={setSelectedProjectId} 
                />
              )}
            </>
          )}
        </div>

        {/* Modal Overlay for Project Details */}
        {selectedProject && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-6 animate-in fade-in duration-200">
            <ProjectDetail 
              project={selectedProject} 
              onClose={() => setSelectedProjectId(null)} 
              isEditable={role === 'researcher'}
              onUpdate={handleUpdateProject}
            />
          </div>
        )}

        {/* Modal Overlay for New Project Form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-6 animate-in fade-in duration-200">
            <ProjectForm 
              onClose={() => setIsFormOpen(false)} 
              onSubmit={handleAddProject} 
            />
          </div>
        )}
      </main>

      <ChatSidebar projects={projects} />
    </div>
  );
};

export default App;
