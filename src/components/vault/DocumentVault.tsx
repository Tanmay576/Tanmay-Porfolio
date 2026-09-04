import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UploadCloud, 
  Search, 
  Filter, 
  Grid, 
  List as ListIcon, 
  Download, 
  Trash2, 
  Edit3, 
  Eye, 
  FileText, 
  Calendar, 
  HardDrive, 
  ArrowUpDown, 
  Sparkles,
  AlertTriangle,
  FolderOpen,
  Maximize2,
  ExternalLink,
  Shield,
  Clock,
  SortAsc,
  SortDesc,
  CheckCircle2
} from 'lucide-react';
import { VaultDocument, DocumentCategory, SupportedFileType } from '../../types';
import { formatFileSize, downloadFile } from '../../lib/storageService';
import { deleteVaultDocument } from '../../lib/firestoreService';
import { UploadDocumentModal } from './UploadDocumentModal';
import { DocumentPreviewModal } from './DocumentPreviewModal';
import { EditDocumentModal } from './EditDocumentModal';
import { useToast } from '../../context/ToastContext';

interface DocumentVaultProps {
  documents: VaultDocument[];
  onDocumentsChange: (docs: VaultDocument[]) => void;
  userId: string;
}

const VAULT_CATEGORIES = [
  { label: 'All Documents', value: 'All', icon: '🗂' },
  { label: 'Study Materials', value: 'Study Materials', icon: '📚' },
  { label: 'Certificates', value: 'Certificates', icon: '📜' },
  { label: 'Notes', value: 'Notes', icon: '📝' },
  { label: 'Projects', value: 'Projects', icon: '💻' },
  { label: 'Academic Documents', value: 'Academic Documents', icon: '🎓' },
  { label: 'Resume', value: 'Resume', icon: '📄' },
  { label: 'Other', value: 'Other', icon: '🗂' },
];

export const DocumentVault: React.FC<DocumentVaultProps> = ({
  documents,
  onDocumentsChange,
  userId,
}) => {
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFileType, setSelectedFileType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'az' | 'za'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewDocIndex, setPreviewDocIndex] = useState<number | null>(null);
  const [editDoc, setEditDoc] = useState<VaultDocument | null>(null);
  const [deleteDocTarget, setDeleteDocTarget] = useState<VaultDocument | null>(null);

  // Filter & Sort Logic
  const filteredAndSortedDocs = useMemo(() => {
    return documents
      .filter((doc) => {
        // Map category flexibly if legacy categories exist
        let matchesCat = selectedCategory === 'All';
        if (!matchesCat) {
          if (selectedCategory === 'Academic Documents') {
            matchesCat = doc.category === 'Academic Documents' || 
                         doc.category === 'School Documents' || 
                         doc.category === 'College Documents' || 
                         doc.category === 'Madhyamik' || 
                         doc.category === 'Higher Secondary' || 
                         doc.category === 'Mark Sheets';
          } else if (selectedCategory === 'Other') {
            matchesCat = doc.category === 'Other' || doc.category === 'Other Documents' || doc.category === 'ID Cards';
          } else {
            matchesCat = doc.category.toLowerCase().includes(selectedCategory.toLowerCase());
          }
        }

        const matchesType =
          selectedFileType === 'All' ||
          doc.fileType.toLowerCase() === selectedFileType.toLowerCase();

        const matchesQuery =
          doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (doc.tags && doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

        return matchesCat && matchesType && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sortBy === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else if (sortBy === 'az') {
          return a.fileName.localeCompare(b.fileName);
        } else if (sortBy === 'za') {
          return b.fileName.localeCompare(a.fileName);
        }
        return 0;
      });
  }, [documents, selectedCategory, selectedFileType, searchQuery, sortBy]);

  // Active Preview Doc
  const activePreviewDoc = previewDocIndex !== null && filteredAndSortedDocs[previewDocIndex] 
    ? filteredAndSortedDocs[previewDocIndex] 
    : null;

  const handleOpenPreview = (doc: VaultDocument) => {
    const idx = filteredAndSortedDocs.findIndex((d) => d.id === doc.id);
    setPreviewDocIndex(idx >= 0 ? idx : null);
  };

  const handlePreviousPreview = () => {
    if (previewDocIndex !== null && previewDocIndex > 0) {
      setPreviewDocIndex(previewDocIndex - 1);
    }
  };

  const handleNextPreview = () => {
    if (previewDocIndex !== null && previewDocIndex < filteredAndSortedDocs.length - 1) {
      setPreviewDocIndex(previewDocIndex + 1);
    }
  };

  // Delete Action
  const handleConfirmDelete = async () => {
    if (!deleteDocTarget) return;

    try {
      await deleteVaultDocument(deleteDocTarget.id);
      onDocumentsChange(documents.filter((d) => d.id !== deleteDocTarget.id));
      showToast('success', 'Document Purged', 'Document securely removed from vault.');
    } catch (err: any) {
      showToast('error', 'Error deleting document', err.message || 'Could not delete document.');
    } finally {
      setDeleteDocTarget(null);
    }
  };

  const handleDocumentUploaded = (newDoc: VaultDocument) => {
    onDocumentsChange([newDoc, ...documents]);
  };

  const handleDocumentUpdated = (updatedDoc: VaultDocument) => {
    onDocumentsChange(documents.map((d) => (d.id === updatedDoc.id ? updatedDoc : d)));
  };

  // Compute total size
  const totalSizeBytes = useMemo(() => {
    return documents.reduce((acc, d) => acc + (d.fileSize || 0), 0);
  }, [documents]);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 relative min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* ================= VAULT HERO / HEADER ================= */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0e1638]/90 via-[#0a0f28]/90 to-[#070b1e]/90 border border-cyan-500/30 p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden">
          
          {/* Background cyber ambient lines */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>SECURE DIGITAL ARCHIVE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-mono">
                MY DIGITAL{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  VAULT
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300">
                Everything important, organized in one secure place.
              </p>
            </div>

            {/* Upload Button */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setUploadModalOpen(true)}
                className="interactive-element inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 transition-all focus:outline-none"
              >
                <UploadCloud className="w-4 h-4 text-cyan-200" />
                <span>Upload Document</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80 relative z-10">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Records</span>
              <span className="text-xl font-bold font-mono text-white mt-1 block">
                {documents.length} Files
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Storage Utilized</span>
              <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">
                {formatFileSize(totalSizeBytes)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Security Layer</span>
              <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Encrypted
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Storage Provider</span>
              <span className="text-xl font-bold font-mono text-indigo-300 mt-1 block">
                Firebase Cloud
              </span>
            </div>
          </div>

        </div>

        {/* ================= CATEGORY TABS ================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {VAULT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`interactive-element whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-cyan-400/40'
                  : 'bg-[#090f26]/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* ================= LARGE SEARCH & FILTER CONTROLS ================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#090f26]/90 border border-slate-800/80 shadow-lg backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              placeholder="Search your documents... (by filename, notes, tags)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Controls: FileType, Sort, ViewMode */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            
            {/* File Type Filter */}
            <select
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="All">All Types</option>
              <option value="pdf">PDF (.pdf)</option>
              <option value="png">PNG (.png)</option>
              <option value="jpg">JPG (.jpg)</option>
              <option value="jpeg">JPEG (.jpeg)</option>
              <option value="webp">WEBP (.webp)</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="az">Sort: A-Z</option>
              <option value="za">Sort: Z-A</option>
            </select>

            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="List View"
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* ================= DOCUMENT EXPLORER ================= */}
        {filteredAndSortedDocs.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-[#090f26]/60 border border-slate-800/80 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <FolderOpen className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">No documents found</h3>
              <p className="text-xs text-slate-400 mt-1">
                {searchQuery || selectedCategory !== 'All' 
                  ? 'No documents match your current filter parameters.' 
                  : 'Your document vault is currently empty. Upload a file to get started.'}
              </p>
            </div>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSelectedFileType('All'); }}
              className="text-xs text-cyan-400 font-mono underline"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ================= GRID VIEW ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAndSortedDocs.map((doc) => {
              const isPdf = doc.fileType.toLowerCase() === 'pdf';
              const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(doc.fileType.toLowerCase());

              return (
                <div
                  key={doc.id}
                  className="interactive-element group rounded-2xl bg-[#090f26]/90 border border-slate-800/80 p-5 shadow-lg backdrop-blur-xl hover:border-cyan-500/40 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top Row: File Icon & Format Badge */}
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 text-cyan-400 transition-colors">
                        <FileText className="w-6 h-6" />
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          .{doc.fileType}
                        </span>
                      </div>
                    </div>

                    {/* File Name */}
                    <div>
                      <h3 
                        className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-mono line-clamp-2"
                        title={doc.fileName}
                      >
                        {doc.fileName}
                      </h3>
                      <div className="text-xs text-slate-400 mt-1 font-mono">
                        {doc.category}
                      </div>
                    </div>

                    {/* Meta: Size & Date */}
                    <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between pt-1">
                      <span>{formatFileSize(doc.fileSize)}</span>
                      <span>
                        {new Date(doc.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    {doc.description && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed bg-slate-950/60 p-2 rounded-lg border border-slate-900">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  {/* Actions Strip */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-1">
                    <button
                      onClick={() => handleOpenPreview(doc)}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-cyan-300 border border-blue-800/70 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
                      title="Preview Document"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                      title="Open in new window"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => downloadFile(doc.fileUrl, doc.fileName)}
                      className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                      title="Download File"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setEditDoc(doc)}
                      className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                      title="Edit metadata"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setDeleteDocTarget(doc)}
                      className="p-1.5 rounded-lg bg-slate-950 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-colors"
                      title="Delete document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* ================= LIST VIEW ================= */
          <div className="rounded-2xl bg-[#090f26]/90 border border-slate-800/80 overflow-hidden shadow-xl backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Document Name</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Type</th>
                    <th className="py-3.5 px-4 font-semibold">Size</th>
                    <th className="py-3.5 px-4 font-semibold">Created Date</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredAndSortedDocs.map((doc) => (
                    <tr 
                      key={doc.id}
                      className="hover:bg-slate-900/50 transition-colors group"
                    >
                      <td className="py-3 px-4 flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span 
                          onClick={() => handleOpenPreview(doc)}
                          className="text-white font-bold hover:text-cyan-300 cursor-pointer truncate max-w-xs"
                        >
                          {doc.fileName}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {doc.category}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-1.5 py-0.5 rounded uppercase font-bold text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                          .{doc.fileType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {formatFileSize(doc.fileSize)}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenPreview(doc)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                            title="Preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                            title="Open Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => downloadFile(doc.fileUrl, doc.fileName)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                            title="Download"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditDoc(doc)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteDocTarget(doc)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ================= MODALS ================= */}

      {/* Upload Document Modal */}
      <UploadDocumentModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onDocumentAdded={handleDocumentUploaded}
      />

      {/* Full-Screen Document Preview Modal */}
      {activePreviewDoc && (
        <DocumentPreviewModal
          document={activePreviewDoc}
          isOpen={true}
          onClose={() => setPreviewDocIndex(null)}
          onPrevious={handlePreviousPreview}
          onNext={handleNextPreview}
          hasPrevious={previewDocIndex !== null && previewDocIndex > 0}
          hasNext={previewDocIndex !== null && previewDocIndex < filteredAndSortedDocs.length - 1}
        />
      )}

      {/* Edit Document Modal */}
      <EditDocumentModal
        document={editDoc}
        isOpen={Boolean(editDoc)}
        onClose={() => setEditDoc(null)}
        onDocumentUpdated={handleDocumentUpdated}
      />

      {/* Delete Confirmation Modal */}
      {deleteDocTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div 
            className="relative w-full max-w-md bg-[#090f28] rounded-2xl border border-rose-500/30 shadow-2xl p-6 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-rose-950 text-rose-400 border border-rose-800/80 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white font-mono">
                Confirm Vault Purge
              </h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to permanently delete{' '}
                <strong className="text-cyan-300 font-mono">{deleteDocTarget.fileName}</strong>{' '}
                from Firebase storage?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => setDeleteDocTarget(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono font-semibold border border-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-semibold shadow-lg shadow-rose-600/30"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
