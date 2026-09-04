import React, { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  ArrowRight, 
  FolderLock, 
  FileText, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Code2, 
  Cpu, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Flame,
  Binary,
  GraduationCap
} from 'lucide-react';
import { UserProfile } from '../../types';

interface HeroSectionProps {
  profile: UserProfile;
  onViewProjects: () => void;
  onOpenVault?: () => void;
  onDownloadResume?: () => void;
}

const ROLES = ["CSE Student", "Web Developer", "Programmer", "Tech Enthusiast"];

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onViewProjects,
  onOpenVault,
  onDownloadResume,
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'terminal' | 'profile' | 'stack'>('code');
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Typewriter effect for roles
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setCharIndex(prev => prev + 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(prev => prev - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex(prev => (prev + 1) % ROLES.length);
      }
    }, isDeleting ? 40 : 90);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('npx tanmaygarai');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section 
      id="home"
      aria-label="Hero Introduction"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* ================= LEFT COLUMN: INTRO & CTA ================= */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0d1633]/90 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-cyan-300 text-xs font-mono tracking-wider font-semibold animate-in fade-in slide-in-from-top-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="uppercase">3RD YEAR CSE • PANDIT RAGHUNATH MURMU SMRITI MAHAVIDYALAYA</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent underline decoration-cyan-500/40 decoration-wavy decoration-2">
                Tanmay Garai
              </span>
            </h1>

            {/* Sub-headline Dynamic Typewriter */}
            <div className="flex items-center gap-2 pt-1 text-xl sm:text-2xl font-bold font-mono text-cyan-400 min-h-[36px]">
              <span>{ROLES[roleIndex].slice(0, charIndex)}</span>
              <span className="w-2.5 h-6 bg-cyan-400 animate-pulse inline-block" />
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl leading-relaxed font-normal">
            I'm a 3rd Year Computer Science Engineering student at <span className="text-white font-medium">Pandit Raghunath Murmu Smriti Mahavidyalaya</span> passionate about programming, web development, problem solving and learning modern technologies. I love turning ideas into useful digital products.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={onViewProjects}
              className="interactive-element flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:-translate-y-0.5 transition-all focus:outline-none"
            >
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4 text-cyan-200" />
            </button>

            <button
              onClick={onOpenVault}
              className="interactive-element flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0e1630]/90 hover:bg-[#142045] text-slate-200 hover:text-white font-semibold text-sm border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all focus:outline-none"
            >
              <FolderLock className="w-4 h-4 text-cyan-400" />
              <span>Open Document Vault</span>
            </button>

            {onDownloadResume && (
              <button
                onClick={onDownloadResume}
                className="interactive-element flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 text-sm font-semibold transition-all focus:outline-none"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>
            )}
          </div>

          {/* Social Icons Strip */}
          <div className="pt-4 flex flex-wrap items-center gap-6">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">Connect:</span>
            <div className="flex items-center gap-3">
              <a
                href={profile.socialLinks?.github || 'https://github.com/tanmaygarai'}
                target="_blank"
                rel="noreferrer"
                className="interactive-element p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-0.5"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.socialLinks?.linkedin || 'https://linkedin.com/in/tanmaygarai'}
                target="_blank"
                rel="noreferrer"
                className="interactive-element p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-0.5"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profile.socialLinks?.instagram || 'https://instagram.com/tanmaygarai'}
                target="_blank"
                rel="noreferrer"
                className="interactive-element p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-pink-400 border border-slate-800 hover:border-pink-500/40 transition-all hover:-translate-y-0.5"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="interactive-element p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-500/40 transition-all hover:-translate-y-0.5"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Quick CLI Badge */}
            <button
              onClick={handleCopyCmd}
              className="interactive-element hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
              title="Click to copy CLI command"
            >
              <TerminalIcon className="w-3 h-3 text-cyan-400" />
              <span>npx tanmaygarai</span>
              {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
            </button>
          </div>

          {/* Real Dynamic Quick Stats Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl">
            <div className="p-3 rounded-xl bg-[#090f24]/80 border border-slate-800/80">
              <div className="text-xl font-bold font-mono text-white">
                10+
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Projects Built</div>
            </div>
            <div className="p-3 rounded-xl bg-[#090f24]/80 border border-slate-800/80">
              <div className="text-xl font-bold font-mono text-cyan-400">
                15+
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Tech Learning</div>
            </div>
            <div className="p-3 rounded-xl bg-[#090f24]/80 border border-slate-800/80">
              <div className="text-xl font-bold font-mono text-indigo-400">
                500+
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Problems Solved</div>
            </div>
            <div className="p-3 rounded-xl bg-[#090f24]/80 border border-slate-800/80">
              <div className="text-xl font-bold font-mono text-violet-400">
                3rd Year
              </div>
              <div className="text-[11px] text-slate-400 font-medium">CSE Department</div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE DEV WORKSPACE ================= */}
        <div className="lg:col-span-5 relative w-full flex justify-center">
          
          {/* Ambient Floating Elements */}
          <div className="absolute -top-6 -right-4 px-3.5 py-1.5 rounded-xl bg-indigo-950/90 border border-indigo-500/40 text-[11px] font-mono text-indigo-200 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-1.5 z-20">
            <span className="text-amber-400">⚡</span>
            <span>Building projects</span>
          </div>

          <div className="absolute -bottom-6 -left-4 px-3.5 py-1.5 rounded-xl bg-cyan-950/90 border border-cyan-500/40 text-[11px] font-mono text-cyan-200 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-1.5 z-20">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>3rd Year CSE @ PRMSM</span>
          </div>

          {/* Main Code & Terminal Window */}
          <div className="w-full max-w-md rounded-2xl bg-[#080d22]/95 border border-cyan-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden">
            
            {/* Terminal Top Window Bar */}
            <div className="px-4 py-3 bg-[#0c132e] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  tanmay.dev
                </span>
              </div>

              {/* Window Tabs */}
              <div className="flex items-center gap-1 bg-slate-950/70 p-0.5 rounded-lg border border-slate-800/80 text-[11px] font-mono">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === 'code' ? 'bg-cyan-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  tanmay.js
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === 'terminal' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  bash
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === 'profile' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  college.json
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-5 font-mono text-xs text-slate-300 min-h-[320px] max-h-[380px] overflow-y-auto space-y-3 selection:bg-cyan-500/30 selection:text-white">
              {activeTab === 'code' && (
                <div className="leading-relaxed space-y-1">
                  <div className="text-slate-500">// Welcome to Tanmay Garai's developer portal</div>
                  <div className="text-rose-400">
                    <span className="text-rose-400">const</span> <span className="text-indigo-300">developer</span> = &#123;
                  </div>
                  <div className="pl-4 text-slate-300">
                    name: <span className="text-amber-300">'Tanmay Garai'</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    college: <span className="text-cyan-300">'Pandit Raghunath Murmu Smriti Mahavidyalaya'</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    department: <span className="text-amber-300">'Computer Science &amp; Engineering'</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    year: <span className="text-violet-300">'3rd Year Student'</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    stack: [<span className="text-emerald-300">'React'</span>, <span className="text-emerald-300">'Node.js'</span>, <span className="text-emerald-300">'Java'</span>, <span className="text-emerald-300">'Python'</span>],
                  </div>
                  <div className="pl-4 text-slate-300">
                    isLearning: <span className="text-rose-400">true</span>,
                  </div>
                  <div className="text-rose-400">&#125;;</div>
                  <div className="pt-2 text-slate-500">// Learning. Building. Innovating.</div>
                  <div className="pt-1 text-cyan-400/80 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>status: Ready to collaborate on real-world projects</span>
                  </div>
                </div>
              )}

              {activeTab === 'terminal' && (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>Host: prmsm-cse-terminal · West Bengal</span>
                  </div>

                  <div>
                    <div className="text-cyan-400 flex items-center gap-2">
                      <span className="text-violet-400">~/cse-hub</span>
                      <span className="text-emerald-400">$</span>
                      <span className="text-white font-semibold">whoami</span>
                    </div>
                    <div className="pl-4 pt-1 text-slate-200">
                      Tanmay Garai
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 flex items-center gap-2">
                      <span className="text-violet-400">~/cse-hub</span>
                      <span className="text-emerald-400">$</span>
                      <span className="text-white font-semibold">college --info</span>
                    </div>
                    <div className="pl-4 pt-1 text-cyan-300">
                      Pandit Raghunath Murmu Smriti Mahavidyalaya (3rd Year CSE)
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 flex items-center gap-2">
                      <span className="text-violet-400">~/cse-hub</span>
                      <span className="text-emerald-400">$</span>
                      <span className="text-white font-semibold">focus</span>
                    </div>
                    <div className="pl-4 pt-1 text-slate-200">
                      Software Development, Web Technologies &amp; Algorithms
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 flex items-center gap-2">
                      <span className="text-violet-400">~/cse-hub</span>
                      <span className="text-emerald-400">$</span>
                      <span className="text-white font-semibold">status</span>
                    </div>
                    <div className="pl-4 pt-1 text-emerald-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available for internships &amp; collaborations</span>
                    </div>
                  </div>

                  {/* Interactive input cursor simulation */}
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-violet-400">~/cse-hub</span>
                    <span className="text-emerald-400">$</span>
                    <span className="w-2.5 h-4 bg-cyan-400 inline-block animate-pulse" />
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="text-emerald-300/90 leading-relaxed">
                  <pre>{`{
  "name": "Tanmay Garai",
  "college": "Pandit Raghunath Murmu Smriti Mahavidyalaya",
  "department": "Computer Science & Engineering",
  "academicYear": "3rd Year",
  "cgpa": "8.85 / 10.0",
  "location": "Bankura, West Bengal, India",
  "featuredProjects": [
    "KnowMoreQuiz",
    "Shree Krishna Telecom Website",
    "Meghpyon Tour & Travels"
  ],
  "contact": "garai.com2006@gmail.com"
}`}</pre>
                </div>
              )}
            </div>

            {/* Bottom Status strip */}
            <div className="px-4 py-2 bg-[#060a1a] border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                terminal ready
              </span>
              <span>UTF-8 • PRMSM CSE Dev</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
