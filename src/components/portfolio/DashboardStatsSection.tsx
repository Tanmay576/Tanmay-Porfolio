import React from 'react';
import { 
  FolderLock, 
  FolderGit2, 
  Award, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  Binary,
  Sparkles 
} from 'lucide-react';
import { UserProfile } from '../../types';

interface DashboardStatsSectionProps {
  stats: UserProfile['stats'];
  totalDocuments?: number;
  totalSkills?: number;
}

export const DashboardStatsSection: React.FC<DashboardStatsSectionProps> = ({
  stats,
  totalDocuments = 12,
  totalSkills = 21,
}) => {
  const statCards = [
    {
      id: 'docs',
      label: 'Documents Uploaded',
      value: totalDocuments,
      suffix: '+',
      icon: FolderLock,
      badge: 'Encrypted Vault',
      color: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6,182,212,0.25)',
      border: 'border-cyan-500/30',
      textColor: 'text-cyan-300',
    },
    {
      id: 'projects',
      label: 'Projects Completed',
      value: stats?.projectsCount || 6,
      suffix: '+',
      icon: FolderGit2,
      badge: 'Production & Git',
      color: 'from-blue-500 to-indigo-600',
      glow: 'rgba(59,130,246,0.25)',
      border: 'border-blue-500/30',
      textColor: 'text-blue-300',
    },
    {
      id: 'certs',
      label: 'Certificates Earned',
      value: stats?.certificatesCount || 6,
      suffix: '',
      icon: Award,
      badge: 'Verified Credentials',
      color: 'from-indigo-500 to-violet-600',
      glow: 'rgba(99,102,241,0.25)',
      border: 'border-indigo-500/30',
      textColor: 'text-indigo-300',
    },
    {
      id: 'skills',
      label: 'Skills Mastered',
      value: totalSkills,
      suffix: '+',
      icon: Cpu,
      badge: 'Core CS & Web',
      color: 'from-violet-500 to-cyan-500',
      glow: 'rgba(168,85,247,0.25)',
      border: 'border-violet-500/30',
      textColor: 'text-violet-300',
    },
  ];

  return (
    <section 
      id="stats"
      aria-label="Dashboard Statistics"
      className="py-14 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                className={`interactive-element relative rounded-2xl bg-[#080d24]/90 border ${card.border} p-6 shadow-xl backdrop-blur-xl hover:-translate-y-1 transition-all overflow-hidden group`}
                style={{
                  boxShadow: `0 10px 35px -5px ${card.glow}`,
                }}
              >
                {/* Top Corner Glow */}
                <div 
                  className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${card.color} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity`}
                />

                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white shadow-inner group-hover:scale-105 transition-transform">
                    <IconComp className={`w-5 h-5 ${card.textColor}`} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    {card.badge}
                  </span>
                </div>

                <div className="mt-5 space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white flex items-baseline tracking-tight">
                    <span>{card.value}</span>
                    <span className={card.textColor}>{card.suffix}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-400 font-mono">
                    {card.label}
                  </div>
                </div>

                {/* Subtle cyber scanline effect at bottom */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Pulse
                  </span>
                  <span>LIVE METRIC</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
