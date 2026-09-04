import React, { useRef, useState } from 'react';
import { 
  FileText, 
  Download, 
  Upload, 
  RefreshCw, 
  Eye, 
  Calendar, 
  CheckCircle2, 
  HardDrive,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Award
} from 'lucide-react';
import { UserProfile } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { uploadVaultFile, downloadFile } from '../../lib/storageService';
import { saveUserProfile } from '../../lib/firestoreService';

interface ResumeSectionProps {
  profile: UserProfile;
  onProfileUpdated: (updated: UserProfile) => void;
  onOpenAuth: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  profile,
  onProfileUpdated,
  onOpenAuth,
}) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const sampleResumePdfUrl = profile.resumeUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user) {
      showToast('info', 'Authentication Required', 'Please sign in to upload or replace your resume.');
      onOpenAuth();
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      const res = await uploadVaultFile(user.uid, 'resume', file, (prog) => {
        setUploadProgress(prog);
      });

      const updatedProfile: UserProfile = {
        ...profile,
        resumeUrl: res.fileUrl,
        resumeFileName: file.name,
        resumeUpdatedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      };

      await saveUserProfile(updatedProfile);
      onProfileUpdated(updatedProfile);
      showToast('success', 'Resume Updated', `${file.name} successfully uploaded and updated.`);
    } catch (err: any) {
      showToast('error', 'Resume Upload Failed', err.message || 'Could not upload resume');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    downloadFile(sampleResumePdfUrl, profile.resumeFileName || 'Tanmay_Garai_Resume.pdf');
    showToast('info', 'Downloading Resume', profile.resumeFileName || 'Tanmay_Garai_Resume.pdf');
  };

  return (
    <section 
      id="resume" 
      aria-label="Resume & Curriculum Vitae"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>CURRICULUM VITAE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Resume &amp;{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Credentials
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            ATS-optimized computer science engineering resume featuring core coursework, verified competencies, and software engineering projects.
          </p>
        </div>

        {/* Card Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#090f26]/90 border border-slate-800/80 shadow-2xl backdrop-blur-xl overflow-hidden space-y-6 p-6 sm:p-8">
          
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-blue-950/80 text-cyan-400 border border-blue-900">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-mono">
                    {profile.resumeFileName || 'Tanmay_Garai_CSE_Resume.pdf'}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                    <span>Updated: {profile.resumeUpdatedAt || '2026'}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">ATS Score: 94/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownload}
                className="interactive-element inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-mono font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
              >
                <Download className="w-4 h-4 text-cyan-200" />
                <span>Download Resume</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-file-input"
              />

              {user && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="interactive-element inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono font-medium border border-slate-800 transition-all"
                >
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span>{isUploading ? `Uploading (${uploadProgress}%)` : 'Replace PDF'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Highlights Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Education</span>
              <span className="text-slate-200 font-bold">B.Tech Computer Science</span>
              <span className="text-cyan-400 block text-[11px]">MAKAUT (8.85 CGPA)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Core Stack</span>
              <span className="text-slate-200 font-bold">React, TypeScript, C++, Java</span>
              <span className="text-indigo-400 block text-[11px]">Full-Stack &amp; Distributed</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Security</span>
              <span className="text-slate-200 font-bold">Encrypted Document Vault</span>
              <span className="text-emerald-400 block text-[11px]">Firebase Cloud Storage</span>
            </div>
          </div>

          {/* Embedded PDF Frame Preview */}
          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner h-[500px]">
            <iframe
              src={`${sampleResumePdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              title="Resume Preview"
              className="w-full h-full border-0"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
