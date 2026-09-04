import React from 'react';
import { 
  LayoutDashboard, 
  FolderLock, 
  HardDrive, 
  UploadCloud, 
  Layers, 
  Clock, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { VaultDocument, UserProfile, EducationItem, ProjectItem, CertificateItem } from '../../types';
import { formatFileSize, downloadFile } from '../../lib/storageService';
import { useAuth } from '../../context/AuthContext';

interface DashboardProps {
  profile: UserProfile;
  documents: VaultDocument[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  onNavigateToVault: () => void;
  onNavigateToPortfolio: (sectionId?: string) => void;
  onOpenUpload: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  documents,
  projects,
  certificates,
  onNavigateToVault,
  onNavigateToPortfolio,
  onOpenUpload,
}) => {
  const { user } = useAuth();

  // Storage metric
  const totalBytes = documents.reduce((acc, d) => acc + (d.fileSize || 0), 0);

  // Group by category
  const categoryCounts = documents.reduce((acc: Record<string, number>, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {});

  // Profile completeness score
  const completenessChecks = [
    { label: 'Profile Information', done: !!profile.name && !!profile.email },
    { label: 'Resume Uploaded', done: !!profile.resumeUrl },
    { label: 'College Documents Stored', done: (categoryCounts['College Documents'] || 0) > 0 },
    { label: 'Academic Mark Sheets', done: (categoryCounts['Mark Sheets'] || 0) > 0 },
    { label: 'Identity Proofs / ID', done: (categoryCounts['ID Cards'] || 0) > 0 },
    { label: 'Projects Published', done: projects.length > 0 },
    { label: 'Industry Certificates', done: certificates.length > 0 },
  ];

  const completedCount = completenessChecks.filter((c) => c.done).length;
  const completenessPercent = Math.round((completedCount / completenessChecks.length) * 100);

  // Recent 5 uploads
  const recentDocs = [...documents]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Hero Banner */}
      <div className="p-7 rounded-2xl bg-gradient-to-r from-zinc-900 via-sky-950 to-zinc-900 text-white border border-sky-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-mono font-medium border border-sky-500/30">
            <UserCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Authenticated Student Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {user?.displayName || profile.name || 'Engineer'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
            {profile.course} • {profile.department} • CGPA {profile.cgpa}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenUpload}
            id="dash-quick-upload-btn"
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Quick Upload</span>
          </button>

          <button
            onClick={onNavigateToVault}
            className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs rounded-xl border border-zinc-700 flex items-center gap-2 transition-all"
          >
            <FolderLock className="w-4 h-4 text-sky-400" />
            <span>Open Vault</span>
          </button>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Total Vault Documents</span>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <FolderLock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-zinc-900 dark:text-zinc-50">
            {documents.length}
          </div>
          <p className="text-[11px] text-zinc-500">Across {Object.keys(categoryCounts).length} academic categories</p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Encrypted Storage</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-zinc-900 dark:text-zinc-50">
            {formatFileSize(totalBytes)}
          </div>
          <p className="text-[11px] text-zinc-500">Cloud Storage Bucket allocated</p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Projects Featured</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-zinc-900 dark:text-zinc-50">
            {projects.length}
          </div>
          <p className="text-[11px] text-zinc-500">Publicly showcased on portfolio</p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Certificates</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-zinc-900 dark:text-zinc-50">
            {certificates.length}
          </div>
          <p className="text-[11px] text-zinc-500">Verified industry accreditations</p>
        </div>

      </div>

      {/* Grid: Completeness & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Category Breakdown */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Vault Distribution by Category</span>
            </h3>
            <button
              onClick={onNavigateToVault}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'School Documents',
              'Madhyamik',
              'Higher Secondary',
              'College Documents',
              'Mark Sheets',
              'ID Cards',
              'Certificates',
              'Resume',
              'Other Documents',
            ].map((cat) => {
              const count = categoryCounts[cat] || 0;
              return (
                <div
                  key={cat}
                  onClick={onNavigateToVault}
                  className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-zinc-700/60 flex items-center justify-between cursor-pointer hover:border-sky-500 transition-colors"
                >
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{cat}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                    count > 0 
                      ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300' 
                      : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-400'
                  }`}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Portfolio Completeness */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>Profile & Vault Readiness</span>
              </h3>
              <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {completenessPercent}%
              </span>
            </div>

            {/* Progress meter */}
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-sky-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${completenessPercent}%` }}
              />
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-2">
              {completenessChecks.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${item.done ? 'text-emerald-500' : 'text-zinc-300 dark:text-zinc-700'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono ${item.done ? 'text-emerald-600 font-semibold' : 'text-zinc-400'}`}>
                    {item.done ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => onNavigateToPortfolio('about')}
              className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold rounded-xl text-xs transition-colors"
            >
              Update Profile Information
            </button>
          </div>
        </div>

      </div>

      {/* Recent Uploads Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Recently Uploaded Records</span>
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Latest documents encrypted and saved to your cloud repository</p>
          </div>
          
          <button
            onClick={onNavigateToVault}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>Open Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400 font-mono uppercase border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-4 py-2.5">Document</th>
                <th className="px-4 py-2.5">Category</th>
                <th className="px-4 py-2.5">Size</th>
                <th className="px-4 py-2.5">Uploaded</th>
                <th className="px-4 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
              {recentDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
                  <td className="px-4 py-3 flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
                    <FileText className="w-3.5 h-3.5 text-sky-500" />
                    <span>{doc.fileName}</span>
                  </td>
                  <td className="px-4 py-3 text-sky-600 dark:text-sky-400">{doc.category}</td>
                  <td className="px-4 py-3 font-mono text-zinc-500">{formatFileSize(doc.fileSize)}</td>
                  <td className="px-4 py-3 text-zinc-400 font-mono">{new Date(doc.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => downloadFile(doc.fileUrl, doc.fileName)}
                      className="text-xs font-semibold text-sky-600 hover:underline"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
