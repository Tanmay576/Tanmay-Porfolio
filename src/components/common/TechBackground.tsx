import React from 'react';

export const TechBackground: React.FC = () => {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none transition-colors duration-500"
    >
      {/* Base theme background gradients */}
      <div className="absolute inset-0 bg-[#050713] dark:bg-[#050713] bg-gradient-to-b from-slate-950 via-[#070b1f] to-[#040612]" />

      {/* Cybernetic Tech Grid lines */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)'
        }}
      />

      {/* Radiant Electric Glow Orbs (GPU accelerated, zero CPU load) */}
      <div className="absolute -top-[15%] left-[10%] w-[550px] h-[550px] rounded-full bg-blue-600/15 dark:bg-blue-600/18 blur-[120px] mix-blend-screen" />
      <div className="absolute top-[35%] -right-[10%] w-[600px] h-[600px] rounded-full bg-violet-600/15 dark:bg-violet-600/18 blur-[140px] mix-blend-screen" />
      <div className="absolute top-[65%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/12 blur-[130px] mix-blend-screen" />
      <div className="absolute -bottom-[10%] right-[15%] w-[450px] h-[450px] rounded-full bg-indigo-600/15 dark:bg-indigo-600/15 blur-[120px] mix-blend-screen" />

      {/* Subtle Digital Circuit Nodes / Floating Tech Dots */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="96" height="96" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#38bdf8" fillOpacity="0.4" />
            <circle cx="50" cy="50" r="1.2" fill="#818cf8" fillOpacity="0.3" />
            <line x1="2" y1="2" x2="20" y2="2" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.2" />
            <line x1="50" y1="50" x2="50" y2="70" stroke="#818cf8" strokeWidth="0.5" strokeOpacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>

      {/* Top ambient illumination line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
    </div>
  );
};
