import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Database, 
  HardDrive, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink,
  Key,
  Layers
} from 'lucide-react';
import { firebaseConfig } from '../../lib/firebase';
import { useToast } from '../../context/ToastContext';

interface FirebaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseGuideModal: React.FC<FirebaseGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'config' | 'rules' | 'storage' | 'deploy'>('config');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('success', 'Copied to clipboard!', key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const firestoreRulesText = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() { return request.auth != null; }
    function isOwner(userId) { return isAuthenticated() && request.auth.uid == userId; }

    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }
    match /profile/{profileId} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    match /education/{eduId} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    match /skills/{skillId} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    match /projects/{projectId} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    match /certificates/{certId} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    // PRIVATE VAULT: Strictly authenticated owner only!
    match /documents/{docId} {
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAuthenticated() && resource.data.userId == request.auth.uid;
    }
    match /messages/{messageId} {
      allow create: if true;
      allow read, delete: if isAuthenticated();
    }
  }
}`;

  const storageRulesText = `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/resume/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/certificates/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    // STRICTLY PRIVATE ACADEMIC VAULT
    match /users/{userId}/documents/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Firebase & Security Architecture Setup
              </h3>
              <p className="text-xs text-zinc-500">
                Configuration details, deployed security rules, and cloud instructions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 px-5 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('config')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'config'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Project Status
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'rules'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Security Rules
          </button>
          <button
            onClick={() => setActiveTab('storage')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'storage'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            Cloud Storage
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'deploy'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Deployment Guide
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4 text-xs">
          {activeTab === 'config' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                    Firebase Provisioned & Ready
                  </p>
                  <p className="text-emerald-800/90 dark:text-emerald-300/90 mt-0.5">
                    Your Firebase project is linked and Firestore rules have been deployed.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-400 block text-[10px] uppercase font-mono">Firebase Project ID</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold">{firebaseConfig.projectId || 'ferrous-airfoil-wghtt'}</span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-400 block text-[10px] uppercase font-mono">Auth Domain</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold">{firebaseConfig.authDomain || 'ferrous-airfoil-wghtt.firebaseapp.com'}</span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-400 block text-[10px] uppercase font-mono">Firestore Database ID</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold truncate block" title={firebaseConfig.firestoreDatabaseId}>
                    {firebaseConfig.firestoreDatabaseId || '(default)'}
                  </span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-400 block text-[10px] uppercase font-mono">Storage Bucket</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold">{firebaseConfig.storageBucket || 'ferrous-airfoil-wghtt.firebasestorage.app'}</span>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                  Environment Variables (.env)
                </h4>
                <div className="relative bg-zinc-950 text-zinc-300 font-mono p-3 rounded-xl border border-zinc-800 overflow-x-auto">
                  <button
                    onClick={() => copyToClipboard(`VITE_FIREBASE_API_KEY=${firebaseConfig.apiKey}\nVITE_FIREBASE_AUTH_DOMAIN=${firebaseConfig.authDomain}\nVITE_FIREBASE_PROJECT_ID=${firebaseConfig.projectId}\nVITE_FIREBASE_STORAGE_BUCKET=${firebaseConfig.storageBucket}\nVITE_FIREBASE_MESSAGING_SENDER_ID=${firebaseConfig.messagingSenderId}\nVITE_FIREBASE_APP_ID=${firebaseConfig.appId}\nVITE_FIREBASE_FIRESTORE_DATABASE_ID=${firebaseConfig.firestoreDatabaseId}`, 'env_vars')}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                    title="Copy env configuration"
                  >
                    {copiedKey === 'env_vars' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <pre className="text-[11px] leading-relaxed">
{`VITE_FIREBASE_API_KEY=${firebaseConfig.apiKey}
VITE_FIREBASE_AUTH_DOMAIN=${firebaseConfig.authDomain}
VITE_FIREBASE_PROJECT_ID=${firebaseConfig.projectId}
VITE_FIREBASE_STORAGE_BUCKET=${firebaseConfig.storageBucket}
VITE_FIREBASE_MESSAGING_SENDER_ID=${firebaseConfig.messagingSenderId}
VITE_FIREBASE_APP_ID=${firebaseConfig.appId}
VITE_FIREBASE_FIRESTORE_DATABASE_ID=${firebaseConfig.firestoreDatabaseId}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Firestore Security Rules</h4>
                  <p className="text-zinc-500">Deployed to protect private documents so only the owner can access them.</p>
                </div>
                <button
                  onClick={() => copyToClipboard(firestoreRulesText, 'firestore_rules')}
                  className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium text-[11px] flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'firestore_rules' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Rules</span>
                </button>
              </div>

              <div className="bg-zinc-950 text-emerald-400 font-mono p-3 rounded-xl border border-zinc-800 overflow-x-auto text-[11px]">
                <pre>{firestoreRulesText}</pre>
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Firebase Storage Rules & Fallback</h4>
              <p className="text-zinc-500 leading-relaxed">
                Academic files are stored in organized user folders:
                <code className="text-sky-500 font-mono ml-1">/users/{'{userId}'}/documents/</code>
              </p>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                <span className="font-semibold block mb-1">Built-in Hybrid Upload Protection:</span>
                <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                  If your Firebase Storage bucket is awaiting first-time activation in GCP Console, our architecture automatically detects it and seamlessly retains your uploaded documents with instant preview, zoom, and download capabilities.
                </p>
              </div>

              <div className="bg-zinc-950 text-sky-400 font-mono p-3 rounded-xl border border-zinc-800 overflow-x-auto text-[11px]">
                <pre>{storageRulesText}</pre>
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="space-y-3">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Production Build & Deployment</h4>
              
              <div className="space-y-2">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="font-bold block text-zinc-900 dark:text-zinc-100 mb-1">1. Cloud Run / AI Studio Deploy</span>
                  <p className="text-zinc-500">Deploy directly via the Deploy button in the AI Studio top bar to your Google Cloud Run instance.</p>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="font-bold block text-zinc-900 dark:text-zinc-100 mb-1">2. Local Build Command</span>
                  <div className="bg-zinc-950 text-zinc-300 font-mono p-2 rounded-lg mt-1 text-[11px]">
                    npm run build
                  </div>
                  <p className="text-zinc-500 mt-1">Generates an optimized static bundle in the <code className="text-sky-500 font-mono">dist/</code> directory ready for any CDN or web host.</p>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="font-bold block text-zinc-900 dark:text-zinc-100 mb-1">3. Firebase Hosting (Optional)</span>
                  <div className="bg-zinc-950 text-zinc-300 font-mono p-2 rounded-lg mt-1 text-[11px]">
                    firebase init hosting &amp;&amp; firebase deploy
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-xl text-xs hover:opacity-90 transition-opacity"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
