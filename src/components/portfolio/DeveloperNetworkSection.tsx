import React from 'react';
import { 
  Network, 
  ExternalLink, 
  Github, 
  Code, 
  Award, 
  Terminal,
  Globe,
  Sparkles,
  Layers
} from 'lucide-react';
import { INITIAL_DEVELOPER_NETWORK } from '../../data/initialData';
import { DeveloperNetworkProfile } from '../../types';

export const DeveloperNetworkSection: React.FC = () => {
  const profiles: DeveloperNetworkProfile[] = INITIAL_DEVELOPER_NETWORK;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'GitHub': return <Github className="w-6 h-6 text-white" />;
      case 'LeetCode': return <Code className="w-6 h-6 text-amber-400" />;
      case 'HackerRank': return <Award className="w-6 h-6 text-emerald-400" />;
      case 'CodeChef': return <Terminal className="w-6 h-6 text-orange-400" />;
      case 'GeeksforGeeks': return <Layers className="w-6 h-6 text-green-400" />;
      default: return <Globe className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section 
      id="developer-network"
      aria-label="Developer Network & Coding Profiles"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-cyan-300 text-xs font-mono font-medium">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>CODING PROFILES &amp; ACTIVITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            My Developer{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Network
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Algorithmic problem-solving metrics, public code repositories, contest ranks, and competitive programming hubs.
          </p>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="interactive-element group rounded-2xl bg-[#090f26]/85 border border-slate-800/80 p-5 shadow-xl backdrop-blur-xl hover:border-cyan-500/40 hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)] hover:-translate-y-1 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Platform Header */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-inner group-hover:scale-105 transition-transform">
                    {getPlatformIcon(profile.platform)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    {profile.badgeText}
                  </span>
                </div>

                {/* Identity */}
                <div>
                  <h3 className="text-base font-bold text-white font-mono">
                    {profile.platform}
                  </h3>
                  <div className="text-xs text-cyan-400 font-mono">
                    @{profile.username}
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-300">
                  {profile.metrics}
                </div>
              </div>

              {/* Action Button */}
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-slate-200 hover:text-white text-xs font-mono font-semibold border border-slate-700/70 hover:border-cyan-400/50 shadow transition-all focus:outline-none"
              >
                <span>Visit Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
