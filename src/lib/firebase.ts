import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  updateProfile,
  signInAnonymously,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import rawConfig from '../../firebase-applet-config.json';

// Helper to safely access environment variables in Vite/browser or Node
const getEnvVar = (key: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch {
    // ignore
  }
  return '';
};

// Build configuration using firebase-applet-config.json with optional env overrides
export const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY') || rawConfig.apiKey || '',
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN') || rawConfig.authDomain || '',
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID') || rawConfig.projectId || '',
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET') || rawConfig.storageBucket || '',
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID') || rawConfig.messagingSenderId || '',
  appId: getEnvVar('VITE_FIREBASE_APP_ID') || rawConfig.appId || '',
  firestoreDatabaseId: getEnvVar('VITE_FIREBASE_FIRESTORE_DATABASE_ID') || rawConfig.firestoreDatabaseId || '(default)',
};

// Safely initialize or reuse Firebase App
let firebaseApp: FirebaseApp;
try {
  if (getApps().length > 0) {
    firebaseApp = getApp();
  } else {
    firebaseApp = initializeApp({
      apiKey: firebaseConfig.apiKey || 'demo-api-key',
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId || 'demo-project',
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
      appId: firebaseConfig.appId,
    });
  }
} catch (err) {
  console.warn('Firebase app initialization caught error, using existing or fallback app:', err);
  firebaseApp = getApps().length > 0 ? getApp() : initializeApp({ apiKey: 'demo-api-key', projectId: 'demo-project' });
}

export const app: FirebaseApp = firebaseApp;

// Safely get Auth instance
let authInstance: any = null;
try {
  authInstance = getAuth(app);
} catch (err) {
  console.warn('Firebase getAuth warning:', err);
}
export const auth = authInstance;

// Safely get Firestore instance connected to the specified databaseId
let dbInstance: any = null;
try {
  dbInstance = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app);
} catch (err) {
  console.warn('Firebase getFirestore warning:', err);
}
export const db: Firestore = dbInstance;

// Safely get Firebase Storage instance
let storageInstance: any = null;
try {
  storageInstance = getStorage(app);
} catch (err) {
  console.warn('Firebase getStorage warning:', err);
}
export const storage: FirebaseStorage = storageInstance;

// Helper for Demo Guest Sign-In
export async function quickDemoSignIn() {
  return await signInAnonymously(auth);
}

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged,
};
export type { User };
