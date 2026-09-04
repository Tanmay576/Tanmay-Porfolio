import React from 'react';
import { 
  Sparkles, 
  Coffee, 
  Terminal, 
  Cpu, 
  Globe, 
  Database, 
  Layers, 
  Network, 
  Key, 
  Shield, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { INITIAL_LEARNING_HUB } from '../../data/initialData';
import { LearningHubItem } from '../../types';

export const CurrentlyLearningSection: React.FC = () => {
  const learningItems: LearningHubItem[] = INITIAL_LEARNING_HUB;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-blue-400" />;
      case 'Database': return <Database className="w-5 h-5 text-indigo-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-violet-400" />;
      case 'Network': return <Network className="w-5 h-5 text-teal-400" />;
      case 'Key': return <Key className="w-5 h-5 text-yellow-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-rose-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active Focus':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'In Progress':
        return 'bg-blue-950 text-cyan-300 border-blue-800';
      case 'Practicing':
        return 'bg-indigo-950 text-indigo-300 border-indigo-800';
      case 'Exploring':
      default:
        return 'bg-purple-950 text-purple-300 border-purple-800';
    }
  };

  return (
    <section 
      id="learning-hub"
      aria-label="Currently Learning Hub"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/70 border border-violet-500/30 text-violet-300 text-xs font-mono font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>KNOWLEDGE EXPANSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Currently{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Learning
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            An active pulse of the core computational disciplines, frameworks, and security paradigms I am deepening each week.
          </p>
        </div>

        {/* Grid of Learning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningItems.map((item) => (
            <div
              key={item.id}
              className="interactive-element rounded-2xl bg-[#090f26]/85 border border-slate-800/80 p-6 shadow-xl backdrop-blur-xl hover:border-violet-500/40 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:-translate-y-1 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Top Row: Icon, Category & Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                    {getIcon(item.iconName)}
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                {/* Title & Category */}
                <div>
                  <h3 className="text-base font-bold text-white font-mono">
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    {item.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom: Progress Bar & Concepts */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Learning Progress</span>
                  <span className="text-cyan-400 font-bold">{item.progress}%</span>
                </div>

                {/* Progress track */}
                <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>

                {/* Key concept pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.keyConcepts.map((concept, cIdx) => (
                    <span 
                      key={cIdx} 
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
