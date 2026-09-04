import React from 'react';
import { 
  Terminal, 
  GraduationCap, 
  Target, 
  Sparkles, 
  Compass, 
  MapPin, 
  Calendar, 
  Award,
  Layers,
  Code,
  Zap,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react';
import { UserProfile, TimelineEvent } from '../../types';
import { INITIAL_TIMELINE_EVENTS } from '../../data/initialData';

interface AboutSectionProps {
  profile: UserProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const timeline: TimelineEvent[] = INITIAL_TIMELINE_EVENTS;

  const currentFocusAreas = [
    { title: 'Full-Stack Web Engineering', tech: 'React, TypeScript, Node.js, Tailwind', icon: Code },
    { title: 'Data Structures & Algorithms', tech: 'Trees, Graphs, Dynamic Programming in C++/Java', icon: Zap },
    { title: 'Core CS Foundations', tech: 'DBMS (SQL), Operating Systems, Computer Networks', icon: Layers },
    { title: 'Secure Digital Storage', tech: 'Firebase Cloud Storage, Firestore Rules & Vault', icon: Sparkles },
  ];

  const interestTags = [
    'System Architecture',
    'Distributed Computing',
    'Algorithm Design',
    'Web Security (OWASP)',
    'Network Protocols',
    'Linux CLI & Tooling',
    'Open Source Software',
    'Cloud Infrastructure'
  ];

  return (
    <section 
      id="about" 
      aria-label="Developer Profile Dashboard"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            A student who <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">codes, not just studies</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            I am a 3rd Year Computer Science Engineering student at <strong className="text-white">Pandit Raghunath Murmu Smriti Mahavidyalaya</strong> with a strong interest in software development, web technologies and programming. I enjoy learning new technologies, experimenting with projects and solving technical problems.
          </p>
        </div>

        {/* 4 Feature Cards from User Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#090f26]/85 border border-slate-800/80 hover:border-cyan-500/40 transition-all group">
            <span className="text-2xl mb-3 block">🎓</span>
            <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Education</h4>
            <p className="text-xs text-slate-300 mt-1">Computer Science Engineering (3rd Year)</p>
            <span className="text-[11px] text-cyan-400 font-mono mt-1.5 block">PRMSM College</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#090f26]/85 border border-slate-800/80 hover:border-indigo-500/40 transition-all group">
            <span className="text-2xl mb-3 block">💻</span>
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">Focus</h4>
            <p className="text-xs text-slate-300 mt-1">Web Development &amp; Programming</p>
            <span className="text-[11px] text-indigo-400 font-mono mt-1.5 block">React, Node, Java, Python</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#090f26]/85 border border-slate-800/80 hover:border-violet-500/40 transition-all group">
            <span className="text-2xl mb-3 block">🚀</span>
            <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">Goal</h4>
            <p className="text-xs text-slate-300 mt-1">Become a skilled Software Developer</p>
            <span className="text-[11px] text-violet-400 font-mono mt-1.5 block">Building impactful solutions</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#090f26]/85 border border-slate-800/80 hover:border-emerald-500/40 transition-all group">
            <span className="text-2xl mb-3 block">📚</span>
            <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Currently Learning</h4>
            <p className="text-xs text-slate-300 mt-1">Modern Web Technologies &amp; Core CS</p>
            <span className="text-[11px] text-emerald-400 font-mono mt-1.5 block">DSA, DBMS, Networks, OS</span>
          </div>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ================= CARD 1: Core Profile Info (4 cols) ================= */}
          <div className="lg:col-span-4 rounded-2xl bg-[#090f26]/85 border border-slate-800/80 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-slate-700/80 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-lg">
                  <div className="w-full h-full rounded-[14px] bg-[#070c1e] flex items-center justify-center font-mono font-black text-xl text-cyan-300">
                    TG
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-[#070c1e] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-mono">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-cyan-400 font-medium font-mono">
                    {profile.headline}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                {profile.personalIntro}
              </p>
            </div>

            {/* Academic Snapshot Bento */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] uppercase font-mono text-slate-500">College</div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">PRMSM College</div>
                <div className="text-[10px] text-cyan-400 font-mono">3rd Year CSE</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] uppercase font-mono text-slate-500">Score Metric</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5">{profile.cgpa}</div>
                <div className="text-[10px] text-slate-400 font-mono">Grade Aggregate</div>
              </div>
            </div>
          </div>

          {/* ================= CARD 2: Current Focus & Interests (4 cols) ================= */}
          <div className="lg:col-span-4 rounded-2xl bg-[#090f26]/85 border border-slate-800/80 p-6 shadow-xl backdrop-blur-xl space-y-6 hover:border-slate-700/80 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Current Focus Areas
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                Active
              </span>
            </div>

            {/* Focus Items List */}
            <div className="space-y-3">
              {currentFocusAreas.map((focus, idx) => {
                const IconComp = focus.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-blue-950/80 text-cyan-400 border border-blue-900/60 group-hover:scale-105 transition-transform">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {focus.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {focus.tech}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interests & Domains Chips */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                Interests &amp; Exploration
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {interestTags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-[11px] border border-slate-800 font-mono hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ================= CARD 3: Goals & Vision (4 cols) ================= */}
          <div className="lg:col-span-4 rounded-2xl bg-[#090f26]/85 border border-slate-800/80 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-slate-700/80 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Engineering Ambitions
                </h3>
              </div>

              {/* Career Goal Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/50 via-indigo-950/40 to-slate-950/60 border border-blue-500/20 space-y-2">
                <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wide flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  Primary Mission
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {profile.careerGoal}
                </p>
              </div>

              {/* Milestones */}
              <div className="space-y-2.5 pt-1">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">Short Term:</strong> Engineer scalable full-stack applications and excel in technical problem-solving.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">Long Term:</strong> Architect distributed cloud infrastructure and lead high-impact engineering teams.
                  </div>
                </div>
              </div>
            </div>

            {/* Department Details */}
            <div className="p-3.5 rounded-xl bg-[#060a1a] border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="text-slate-300 font-medium font-mono">{profile.department}</div>
              <div className="text-[11px] text-slate-500">{profile.college}</div>
            </div>
          </div>

        </div>

        {/* ================= LEARNING JOURNEY TIMELINE ================= */}
        <div className="rounded-2xl bg-[#090f26]/85 border border-slate-800/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                  The Learning Journey Timeline
                </h3>
                <p className="text-xs text-slate-400">
                  Key milestones in computer science, programming evolution, and academic milestones
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 self-start sm:self-auto px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/60">
              2020 — 2026+
            </span>
          </div>

          {/* Timeline Grid */}
          <div className="relative pl-6 sm:pl-8 border-l border-cyan-500/30 space-y-8 my-4">
            {timeline.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Checkpoint Node */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 ${
                  event.status === 'Current'
                    ? 'bg-cyan-400 border-cyan-300 ring-4 ring-cyan-500/20 animate-pulse'
                    : 'bg-slate-900 border-slate-600 group-hover:border-cyan-400'
                }`} />

                <div className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-950 text-cyan-300 border border-blue-800">
                        {event.year}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {event.title}
                      </h4>
                    </div>

                    {event.status === 'Current' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Active Stage
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
