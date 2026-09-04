import React from 'react';
import { Trophy, Sparkles, Award, Star } from 'lucide-react';
import { INITIAL_ACHIEVEMENTS } from '../../data/initialData';
import { AchievementItem } from '../../types';

export const AchievementsSection: React.FC = () => {
  const achievements: AchievementItem[] = INITIAL_ACHIEVEMENTS;

  return (
    <section 
      id="achievements" 
      aria-label="Achievements and Milestones"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>MILESTONES &amp; RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Key <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Milestones earned throughout my 3rd year in Computer Science Engineering, competitive programming journey, and project deployments.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item) => (
            <div 
              key={item.id}
              className="p-6 rounded-2xl bg-[#090f26]/85 border border-slate-800/80 hover:border-amber-500/40 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </span>
                  {item.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mt-0.5">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.date && (
                <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Timeline</span>
                  <span className="text-slate-300">{item.date}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
