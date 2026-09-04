import React, { useState } from 'react';
import { 
  FolderGit2, 
  Github, 
  ExternalLink, 
  Layers, 
  Search, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowUpRight,
  Code2,
  Terminal,
  Cpu
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onAddProjectClick?: () => void;
  isOwner?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  projects, 
  onAddProjectClick, 
  isOwner 
}) => {
  const [filterTag, setFilterTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterOptions = ['All', 'React', 'TypeScript', 'Tailwind CSS', 'Firebase Auth', 'C++'];

  const filteredProjects = projects.filter((project) => {
    const matchesTag = filterTag === 'All' || project.technologies.includes(filterTag);
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <section 
      id="projects" 
      aria-label="Featured Projects"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-cyan-300 text-xs font-mono font-medium">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>ENGINEERING SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Handcrafted software systems, full-stack applications, and utilities engineered for real-world reliability and user experience.
            </p>
          </div>

          {isOwner && onAddProjectClick && (
            <button
              onClick={onAddProjectClick}
              className="interactive-element px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-mono font-semibold self-start md:self-auto shadow-lg flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Configure Projects</span>
            </button>
          )}
        </div>

        {/* Filter Badges & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {filterOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`interactive-element whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  filterTag === tag
                    ? 'bg-blue-600 text-white shadow-md border border-cyan-400/40'
                    : 'bg-[#0a0f26]/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#0a0f26]/80 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-all"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="interactive-element group rounded-2xl bg-[#090f26]/90 border border-slate-800/80 overflow-hidden shadow-xl backdrop-blur-xl hover:border-cyan-500/40 hover:shadow-[0_12px_40px_rgba(6,182,212,0.18)] hover:-translate-y-2 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Preview Window */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090f26] via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                      {project.status}
                    </span>
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-600/90 backdrop-blur-md text-white border border-blue-400/40 shadow-lg">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights Reveal on Hover / Normal View */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                      <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold flex items-center gap-1">
                        <Cpu className="w-3 h-3" />
                        <span>Key Engineering Highlights</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-slate-400">
                        {project.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-cyan-400 text-xs">•</span>
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 text-[10px] font-mono border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-mono font-medium border border-slate-800 hover:border-slate-700 transition-all focus:outline-none"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}

                {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-mono font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all focus:outline-none"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
