import React from 'react';
import { 
  Code2, 
  Github, 
  Linkedin, 
  Instagram, 
  ArrowUp, 
  FolderLock, 
  Terminal, 
  Cpu, 
  Heart,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';

interface FooterProps {
  profile: UserProfile;
  onOpenFirebaseGuide?: () => void;
  onOpenSupabaseModal?: () => void;
  onOpenVault?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  profile, 
  onOpenFirebaseGuide, 
  onOpenSupabaseModal, 
  onOpenVault 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050816] border-t border-slate-800/80 text-slate-400 py-16 transition-colors relative overflow-hidden">
      
      {/* Subtle bottom glowing line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: Identity & Bio (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-[10px] bg-[#070b1e] flex items-center justify-center text-cyan-400">
                  <Terminal className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-mono tracking-tight">
                  {profile.name}
                </h3>
                <p className="text-xs text-cyan-400 font-mono">
                  CSE Student • Developer Hub
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Personal portfolio, engineering showcase, and encrypted digital vault. Built for modern computer science exploration.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onOpenSupabaseModal}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 transition-colors"
                title="View Supabase PostgreSQL Connection"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Supabase: mvnxfbvrlmzqogkwewrc</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  &gt; Developer Profile
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">
                  &gt; Technology Ecosystem
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  &gt; Featured Projects
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-cyan-400 transition-colors">
                  &gt; Certificate Gallery
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-cyan-400 transition-colors">
                  &gt; Education Timeline
                </a>
              </li>
              <li>
                <button onClick={onOpenVault} className="hover:text-cyan-400 transition-colors text-left">
                  &gt; Open Document Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Links & Back to Top (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-bold text-white font-mono tracking-wider">
              Developer Connections
            </h4>
            
            <div className="flex items-center gap-3">
              <a
                href={profile.socialLinks?.github || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="interactive-element p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-0.5"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="interactive-element p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-0.5"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profile.socialLinks?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="interactive-element p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-pink-400 border border-slate-800 hover:border-pink-500/40 transition-all hover:-translate-y-0.5"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            {/* Back to top button */}
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="interactive-element inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-mono border border-slate-800 hover:border-cyan-500/30 transition-all shadow-sm"
              >
                <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Tanmay Garai. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Encrypted • Open Source Mindset</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
