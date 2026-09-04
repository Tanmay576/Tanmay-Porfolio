import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  Terminal, 
  Database, 
  Cpu, 
  Wrench, 
  Shield, 
  Globe, 
  Sparkles,
  Info,
  X,
  ExternalLink,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { SkillItem, SkillCategory } from '../../types';

interface SkillsSectionProps {
  skills: SkillItem[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const categories = [
    'All',
    'Programming',
    'Web Development',
    'Database',
    'Computer Science',
    'Tools',
    'Cyber Security',
  ];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Programming': return <Terminal className="w-4 h-4" />;
      case 'Web Development': return <Globe className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Computer Science': return <Cpu className="w-4 h-4" />;
      case 'Tools': return <Wrench className="w-4 h-4" />;
      case 'Cyber Security': return <Shield className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Intermediate':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Learning':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Familiar':
      default:
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.tags && skill.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (skill.keyTopics && skill.keyTopics.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="skills" 
      aria-label="Skills & Technologies"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE TECHNOLOGY ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Technical Stack &amp;{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Competencies
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Click any skill to view core concepts, practical topics, and my learning progress. No false claims—realistic academic &amp; practical proficiency.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`interactive-element whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-cyan-400/40'
                    : 'bg-[#0a0f26]/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search skill (e.g., C++, React, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0a0f26]/80 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setActiveSkill(skill)}
              className="interactive-element group relative rounded-2xl bg-[#090f26]/85 border border-slate-800/90 p-5 shadow-lg backdrop-blur-xl hover:border-cyan-500/40 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Top Row: Name & Level Pill */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 text-cyan-400 transition-colors">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getLevelBadgeClass(skill.levelLabel)}`}>
                    {skill.levelLabel}
                  </span>
                </div>

                {/* Short overview */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {skill.overview || `Explored in coursework and projects with hands-on practice.`}
                </p>
              </div>

              {/* Bottom Tags & Click Indicator */}
              <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <div className="flex flex-wrap gap-1">
                  {(skill.keyTopics || skill.tags || []).slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px]">
                      {tag}
                    </span>
                  ))}
                  {((skill.keyTopics || skill.tags || []).length > 2) && (
                    <span className="px-1 py-0.5 text-slate-500 text-[10px]">
                      +{(skill.keyTopics || skill.tags || []).length - 2}
                    </span>
                  )}
                </div>

                <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px]">
                  Details <Info className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 rounded-2xl bg-[#090f26]/50 border border-slate-800 text-slate-400 space-y-2">
            <p className="text-sm font-mono">No technical skill found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs text-cyan-400 underline font-mono"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* ================= MODAL: SKILL DETAIL PANEL ================= */}
      {activeSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#090f28] border border-cyan-500/30 p-6 shadow-2xl space-y-6">
            
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-950/80 text-cyan-300 border border-blue-800">
                  {getCategoryIcon(activeSkill.category)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">
                    {activeSkill.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                    <span>{activeSkill.category}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.2 rounded-full border ${getLevelBadgeClass(activeSkill.levelLabel)}`}>
                      {activeSkill.levelLabel}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveSkill(null)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400">Technical Overview</h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {activeSkill.overview || `Hands-on understanding applied to Computer Science Engineering assignments and open-source project development.`}
              </p>
            </div>

            {/* Key Topics & Concepts */}
            {activeSkill.keyTopics && activeSkill.keyTopics.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Key Concepts &amp; Topics Practiced
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {activeSkill.keyTopics.map((topic, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs font-mono text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Academic & Practical Note */}
            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/50 text-xs text-blue-200 flex items-center justify-between">
              <span className="font-mono">Coursework &amp; Project Integration</span>
              <span className="text-[11px] text-cyan-300 font-mono">B.Tech CSE Syllabus</span>
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveSkill(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-semibold transition-colors"
              >
                Close Panel
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
