import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Download, 
  Eye, 
  Search, 
  ShieldCheck,
  Building,
  X,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { CertificateItem } from '../../types';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
  onAddCertificateClick?: () => void;
  isOwner?: boolean;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  onAddCertificateClick,
  isOwner,
}) => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = certificates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.certificateId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section 
      id="certificates" 
      aria-label="Certificates Gallery"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>ACCREDITATIONS &amp; LICENSES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Certificate{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                Gallery
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Verified certifications from global technology authorities, professional cloud platforms, and algorithmic computing institutions.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0a0f26]/80 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-all"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cert) => (
            <div
              key={cert.id}
              className="interactive-element group rounded-2xl bg-[#090f26]/90 border border-slate-800/80 p-6 shadow-xl backdrop-blur-xl hover:border-indigo-500/40 hover:shadow-[0_10px_35px_rgba(99,102,241,0.15)] hover:-translate-y-1.5 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Organization & Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 shadow-inner group-hover:scale-105 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-cyan-400 block font-semibold">
                        {cert.organization}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Issued: {cert.issueDate}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/70 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Certificate Name */}
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                  {cert.name}
                </h3>

                {/* Credential ID */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-[10px] uppercase text-slate-500">Credential ID</div>
                  <div className="text-slate-300 font-bold truncate">
                    {cert.certificateId}
                  </div>
                </div>

                {/* Skills Learned */}
                {cert.skillsLearned && cert.skillsLearned.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skillsLearned.slice(0, 3).map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons: Preview & Verify */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-mono font-medium border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preview</span>
                </button>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 rounded-2xl bg-[#090f26]/50 border border-slate-800 text-slate-400">
            <p className="text-sm font-mono">No certificate matching "{searchQuery}"</p>
          </div>
        )}

      </div>

      {/* Certificate Lightbox Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#090f28] border border-cyan-500/30 p-6 shadow-2xl space-y-6">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-950 text-cyan-300 border border-indigo-800">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                    {selectedCert.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono">
                    {selectedCert.organization} • {selectedCert.issueDate}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Preview Image */}
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 max-h-96 flex items-center justify-center p-2">
              <img
                src={selectedCert.fileUrl}
                alt={selectedCert.name}
                referrerPolicy="no-referrer"
                className="max-h-80 w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-slate-400">
                ID: <span className="text-white">{selectedCert.certificateId}</span>
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow"
                >
                  <span>Open Verification Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
