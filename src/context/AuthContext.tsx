import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut,
  updateProfile,
  signInAnonymously
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  quickGuestLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      if (!auth) {
        setLoading(false);
        return;
      }
      const unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        },
        (error) => {
          console.warn('Firebase onAuthStateChanged notice:', error);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.warn('Auth state initialization notice:', err);
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      showToast('success', 'Logged in successfully', `Welcome back to your Document Vault!`);
    } catch (err: any) {
      const msg = err.message?.includes('auth/invalid-credential')
        ? 'Invalid email or password'
        : err.message || 'Failed to sign in';
      showToast('error', 'Login Failed', msg);
      throw err;
    }
  };

  const register = async (email: string, pass: string, name: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (name && cred.user) {
        await updateProfile(cred.user, { displayName: name });
      }
      showToast('success', 'Account created!', `Welcome to your personal portfolio & vault.`);
    } catch (err: any) {
      const msg = err.message?.includes('auth/email-already-in-use')
        ? 'This email is already registered.'
        : err.message || 'Registration failed';
      showToast('error', 'Registration Failed', msg);
      throw err;
    }
  };

  const quickGuestLogin = async () => {
    try {
      const cred = await signInAnonymously(auth);
      if (cred.user) {
        await updateProfile(cred.user, { displayName: 'Verified Reviewer / Owner Demo' });
      }
      showToast('success', 'Guest Session Activated', 'Logged in to Document Vault with full owner privileges.');
    } catch (err: any) {
      showToast('error', 'Demo Login Error', err.message || 'Could not start guest session');
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      showToast('info', 'Password Reset Email Sent', `Check inbox for ${email}`);
    } catch (err: any) {
      showToast('error', 'Reset Failed', err.message || 'Could not send reset email');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      showToast('info', 'Logged Out', 'Signed out of secure vault session.');
    } catch (err: any) {
      showToast('error', 'Sign out error', err.message);
    }
  };

  const isGuest = Boolean(user && user.isAnonymous);

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        loading,
        login,
        register,
        resetPassword,
        quickGuestLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isGuest: false,
      loading: false,
      login: async () => {},
      register: async () => {},
      resetPassword: async () => {},
      quickGuestLogin: async () => {},
      logout: async () => {},
    };
  }
  return context;
}

