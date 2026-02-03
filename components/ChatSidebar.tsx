
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { AIProject, ChatMessage } from '../types';
import { askGeminiAboutProjects } from '../services/geminiService';

interface ChatSidebarProps {
  projects: AIProject[];
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ projects }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi there! I\'m your AGM AI Assistant. I can summarize portfolio health, find specific project details, or help you compare performance metrics. How can I assist you today?', timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await askGeminiAboutProjects(input, projects);
    
    const assistantMsg: ChatMessage = { role: 'assistant', content: response, timestamp: new Date() };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 group"
      >
        <Sparkles size={24} />
        <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">Ask AGM Assistant</span>
      </button>
    );
  }

  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300 z-50">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-indigo-600 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">AGM AI Copilot</h3>
            <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Context-Aware Oversight</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <Minimize2 size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
              msg.role === 'user' 
              ? 'bg-indigo-600 text-white rounded-tr-none' 
              : 'bg-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1.5 opacity-60">
                  <Bot size={12} />
                  <span className="text-[10px] font-bold uppercase">Assistant</span>
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed prose prose-sm">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-2xl rounded-tl-none p-3 text-sm flex items-center gap-2 text-slate-500">
              <Loader2 size={14} className="animate-spin text-indigo-500" />
              <span>Analyzing registry...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="relative">
          <textarea 
            className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all shadow-sm"
            placeholder="Summarize medical projects..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bottom-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-3">
          Powered by Gemini 3 Flash • Trained on AGM Metadata
        </p>
      </div>
    </aside>
  );
};

export default ChatSidebar;
