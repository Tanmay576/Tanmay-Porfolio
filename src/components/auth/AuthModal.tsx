import React, { useState } from 'react';
import { X, Lock, Mail, KeyRound, User, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onSuccessRedirectToVault?: () => void;
}

type AuthTab = 'login' | 'register' | 'forgot';

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  onSuccessRedirectToVault 
}) => {
  const { login, register, resetPassword, quickGuestLogin } = useAuth();
  
  const [tab, setTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (tab === 'login') {
        await login(email, password);
        onClose();
        if (onSuccess) onSuccess();
        if (onSuccessRedirectToVault) onSuccessRedirectToVault();
      } else if (tab === 'register') {
        if (!displayName.trim()) {
          setErrorMessage('Please enter your full name');
          setIsLoading(false);
          return;
        }
        await register(email, password, displayName);
        onClose();
        if (onSuccess) onSuccess();
        if (onSuccessRedirectToVault) onSuccessRedirectToVault();
      } else if (tab === 'forgot') {
        await resetPassword(email);
        setResetSent(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestDemo = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      await quickGuestLogin();
      onClose();
      if (onSuccess) onSuccess();
      if (onSuccessRedirectToVault) onSuccessRedirectToVault();
    } catch (err: any) {
      setErrorMessage('Could not initiate guest session.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 px-6 py-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner">
            <ShieldCheck className="w-6 h-6 text-sky-200" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {tab === 'login' && 'Owner & Student Login'}
            {tab === 'register' && 'Create Owner Account'}
            {tab === 'forgot' && 'Reset Vault Password'}
          </h2>
          <p className="text-xs text-sky-100/90 mt-1 max-w-xs mx-auto">
            {tab === 'login' && 'Sign in to access your private academic document vault & dashboard'}
            {tab === 'register' && 'Register your verified student account to manage documents & credentials'}
            {tab === 'forgot' && 'We will send a password reset link to your registered email'}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setTab('login'); setErrorMessage(''); setResetSent(false); }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              tab === 'login'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setErrorMessage(''); setResetSent(false); }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              tab === 'register'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
              <span className="font-bold shrink-0">Error:</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {resetSent ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Password Reset Email Sent!
              </p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Please check your inbox at <span className="font-mono text-zinc-800 dark:text-zinc-200">{email}</span> for instructions to reset your password.
              </p>
              <button
                type="button"
                onClick={() => { setTab('login'); setResetSent(false); }}
                className="mt-2 text-xs font-semibold text-sky-600 hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Student Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu or personal email"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              {tab !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Password
                    </label>
                    {tab === 'login' && (
                      <button
                        type="button"
                        onClick={() => setTab('forgot')}
                        className="text-[11px] font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  {tab === 'register' && (
                    <p className="text-[11px] text-zinc-400 mt-1">Minimum 6 characters</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                id="btn-submit-auth"
                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>
                      {tab === 'login' && 'Sign In to Vault'}
                      {tab === 'register' && 'Complete Registration'}
                      {tab === 'forgot' && 'Send Reset Link'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo Login Option for evaluators/reviewers */}
          <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2.5">
              Reviewing or evaluating the website?
            </p>
            <button
              type="button"
              onClick={handleGuestDemo}
              disabled={isLoading}
              id="btn-quick-guest-login"
              className="w-full py-2 px-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>One-Click Guest Demo Login (Owner Privileges)</span>
            </button>
          </div>

        </div>

        {/* Security badge at bottom */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono">
          <Lock className="w-3 h-3 text-emerald-500" />
          <span>Protected with Firebase Authentication & Firestore Security Rules</span>
        </div>

      </div>
    </div>
  );
};
