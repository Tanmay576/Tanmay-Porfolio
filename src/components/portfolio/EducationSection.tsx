import React from 'react';
import { 
  GraduationCap, 
  School, 
  BookOpen, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import { EducationItem } from '../../types';
import { INITIAL_EDUCATION } from '../../data/initialData';

interface EducationSectionProps {
  educationList?: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  educationList = INITIAL_EDUCATION,
}) => {
  return (
    <section 
      id="education" 
      aria-label="Education Timeline"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Education{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A comprehensive track record of academic institutions, departmental coursework, university boards, and examination scores.
          </p>
        </div>

        {/* Timeline Cards Container */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {educationList.map((item) => {
            const isCurrent = item.passingYear === '2026' || item.level.includes('B.Tech');

            return (
              <div
                key={item.id}
                className="interactive-element relative rounded-2xl bg-[#090f26]/90 border border-slate-800/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl hover:border-cyan-500/40 hover:shadow-[0_10px_35px_rgba(6,182,212,0.15)] transition-all space-y-5"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-blue-950 text-cyan-300 border border-blue-800">
                        {item.duration}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Current Degree
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white font-mono mt-2">
                      {item.degreeOrStream}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-400 font-medium">
                      {item.institution}
                    </p>
                  </div>

                  {/* Score badge */}
                  <div className="sm:text-right self-start sm:self-auto p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono text-slate-500">Marks / CGPA</div>
                    <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                      {item.scoreOrCgpa}
                    </div>
                  </div>
                </div>

                {/* Details Bento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block">Board / University</span>
                    <span className="text-slate-200">{item.boardOrUniversity}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block">Degree Level &amp; Location</span>
                    <span className="text-slate-200">{item.level} • {item.location}</span>
                  </div>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-slate-300 font-mono leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                    <div className="text-xs font-mono text-slate-400">Key Highlights &amp; Accomplishments:</div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {item.highlights.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
