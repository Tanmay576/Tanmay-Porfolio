import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  FolderLock, 
  Sliders, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView: 'portfolio' | 'vault' | 'dashboard';
  setCurrentView: (view: 'portfolio' | 'vault' | 'dashboard') => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  profile: UserProfile;
  onOpenAuth: () => void;
  onOpenProfileSettings: () => void;
  onOpenFirebaseGuide: () => void;
  onOpenSupabaseModal?: () => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  activeSection,
  setActiveSection,
  profile,
  onOpenAuth,
  onOpenProfileSettings,
  onOpenFirebaseGuide,
  onOpenSupabaseModal,
  onOpenSearch,
}) => {
  const { user, isGuest, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', isSection: true },
    { id: 'about', label: 'About', isSection: true },
    { id: 'skills', label: 'Skills', isSection: true },
    { id: 'projects', label: 'Projects', isSection: true },
    { id: 'achievements', label: 'Achievements', isSection: true },
    { id: 'notes', label: 'Notes', isSection: true },
    { id: 'vault', label: 'Vault', isSection: false, isSpecial: true },
    { id: 'contact', label: 'Contact', isSection: true },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);

    if (item.id === 'vault') {
      setCurrentView('vault');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'portfolio') {
      setCurrentView('portfolio');
    }
    setActiveSection(item.id);

    setTimeout(() => {
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 40);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 flex justify-center px-3 sm:px-6 ${
          isScrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        <nav 
          id="main-floating-navbar"
          aria-label="Main Navigation"
          className={`w-full max-w-6xl mx-auto rounded-2xl transition-all duration-300 flex items-center justify-between px-4 sm:px-6 ${
            isScrolled 
              ? 'bg-[#090e23]/85 backdrop-blur-xl border border-sky-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.6)] py-2.5'
              : 'bg-[#090e23]/60 backdrop-blur-lg border border-slate-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] py-3'
          }`}
        >
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick(navItems[0])}
              className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-xl"
              title="Tanmay Garai | CSE Developer Hub"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-[1.5px] shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.7)] transition-all">
                <div className="w-full h-full bg-[#070b1a] rounded-[10px] flex items-center justify-center">
                  <span className="text-sm font-black tracking-wider bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent font-mono">
                    TG
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#070b1a] animate-pulse" />
              </div>

              <div className="hidden md:block">
                <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-mono">
                  <span>Tanmay Garai</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    CSE
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 tracking-wide">
                  Student Hub & Vault
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const isActive = item.id === 'vault' 
                ? currentView === 'vault' 
                : currentView === 'portfolio' && activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-blue-600/90 to-indigo-600/90 shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.isSpecial && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5 animate-pulse" />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons: Search, Theme, Profile/Login */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Supabase Cloud Database Status Pill */}
            <button
              onClick={onOpenSupabaseModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 transition-all text-xs font-mono group"
              title="Connected to Supabase Project mvnxfbvrlmzqogkwewrc"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <Database className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-semibold hidden md:inline">Supabase</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => {
                if (onOpenSearch) onOpenSearch();
                else {
                  handleNavClick({ id: 'vault', label: 'Vault', isSection: false, isSpecial: true });
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-all text-xs font-mono group"
              title="Search Portfolio & Documents"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="hidden sm:inline text-[11px] text-slate-400">Search</span>
              <kbd className="hidden md:inline px-1 py-0.2 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-300 hover:text-amber-300 border border-slate-800 transition-all focus:outline-none"
              title={`Toggle Theme (Current: ${theme})`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-sky-400 transition-transform" />
              )}
            </button>

            {/* User Profile / Auth State */}
            <div className="relative">
              {user || isGuest ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-left transition-all"
                  >
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                      {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'G'}
                    </div>
                    <span className="hidden md:inline text-xs font-mono text-slate-200 font-medium">
                      {isGuest ? 'Guest' : (user?.displayName || 'Admin')}
                    </span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#0b1024] border border-slate-700/80 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                        <div className="text-xs font-bold text-white truncate">
                          {user?.displayName || (isGuest ? 'Guest User' : 'Admin')}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {user?.email || 'Read & Preview Access'}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setCurrentView('vault');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                      >
                        <FolderLock className="w-3.5 h-3.5 text-cyan-400" />
                        My Digital Vault
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setCurrentView('dashboard');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                      >
                        <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                        Student Dashboard
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenProfileSettings();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                        Edit Profile Data
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onOpenSupabaseModal) onOpenSupabaseModal();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-emerald-300 hover:text-white hover:bg-emerald-950/40 transition-colors"
                      >
                        <Database className="w-3.5 h-3.5 text-emerald-400" />
                        Supabase Database
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenFirebaseGuide();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        Firebase Settings
                      </button>

                      <div className="my-1 border-t border-slate-800/80" />

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-300 hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Animated Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#040612]/95 backdrop-blur-2xl flex flex-col justify-between p-6 animate-in fade-in duration-200">
          <div>
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 p-[1px]">
                  <div className="w-full h-full bg-[#070b1a] rounded-[11px] flex items-center justify-center text-sky-400 font-mono font-black text-sm">
                    TG
                  </div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Tanmay Garai</div>
                  <div className="text-xs text-cyan-400 font-mono">CSE Developer Hub</div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="py-6 space-y-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    {item.isSpecial && (
                      <FolderLock className="w-4 h-4 text-cyan-400" />
                    )}
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Drawer Actions */}
          <div className="pt-6 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-sky-400" />}
                <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>

            {/* Supabase Button in Mobile Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenSupabaseModal) onOpenSupabaseModal();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Supabase Database</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            {user || isGuest ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold"
              >
                Sign Out ({user?.displayName || 'Guest'})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-lg"
              >
                Sign In / Guest Portal
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
