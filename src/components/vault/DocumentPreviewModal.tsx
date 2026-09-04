import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Calendar, 
  HardDrive, 
  Tag, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  RotateCcw,
  ShieldCheck,
  Maximize2,
  Minimize2,
  Printer,
  Info,
  RefreshCw,
  Eye,
  AlertCircle,
  Cloud,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { VaultDocument } from '../../types';
import { formatFileSize, downloadFile } from '../../lib/storageService';

interface DocumentPreviewModalProps {
  document: VaultDocument | null;
  isOpen?: boolean;
  onClose: () => void;
  onEdit?: (doc: VaultDocument) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document: doc,
  isOpen = true,
  onClose,
  onEdit,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Viewport & Mode States
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [showMetadata, setShowMetadata] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<boolean>(false);

  // Image Manipulation States
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Reset controls when document changes
  useEffect(() => {
    if (doc) {
      setIsLoading(true);
      setLoadError(false);
      setZoomLevel(1);
      setRotation(0);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [doc?.id, doc?.fileUrl]);

  // Keyboard shortcut listeners
  useEffect(() => {
    if (!doc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullScreen((prev) => !prev);
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(prev + 0.25, 3.5));
      } else if (e.key === '-' || e.key === '_') {
        setZoomLevel((prev) => Math.max(prev - 0.25, 0.4));
      } else if (e.key === 'r' || e.key === 'R') {
        setRotation((prev) => (prev + 90) % 360);
      } else if (e.key === 'i' || e.key === 'I') {
        setShowMetadata((prev) => !prev);
      } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      } else if (e.key === '0') {
        setZoomLevel(1);
        setRotation(0);
        setPanPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [doc, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  if (!doc) return null;

  const isPdf = doc.fileType.toLowerCase() === 'pdf';
  const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(doc.fileType.toLowerCase());

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.4));
  const handleRotateCw = () => setRotation((prev) => (prev + 90) % 360);
  const handleRotateCcw = () => setRotation((prev) => (prev - 90 + 360) % 360);
  
  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
    try {
      if (!window.document.fullscreenElement && containerRef.current) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else if (window.document.fullscreenElement) {
        window.document.exitFullscreen().catch(() => {});
      }
    } catch {}
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-3 md:p-6 bg-[#030612]/95 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        ref={containerRef}
        className={`relative flex flex-col bg-[#070b1e] text-slate-100 border border-cyan-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 ${
          isFullScreen 
            ? 'w-full h-full rounded-none border-none max-w-none max-h-none' 
            : 'w-full max-w-6xl h-[92vh] rounded-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Action Controls Bar */}
        <header className="px-4 sm:px-6 py-3 border-b border-slate-800/80 bg-[#090f26]/90 flex flex-wrap items-center justify-between gap-3 shrink-0 z-20">
          
          {/* Document Title, Category & Cloud Status */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-950/80 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 
                  className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md font-mono"
                  title={doc.fileName}
                >
                  {doc.fileName}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 font-bold border border-cyan-800 shrink-0">
                  .{doc.fileType}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-mono">
                <span className="text-cyan-400">{doc.category}</span>
                <span>•</span>
                <span>{formatFileSize(doc.fileSize)}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <Cloud className="w-3 h-3" />
                  <span>Verified Vault</span>
                </span>
              </div>
            </div>
          </div>

          {/* Central Manipulation Controls for Images */}
          {isImage && (
            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 px-2 py-1 rounded-xl text-xs">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.4}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              
              <span className="font-mono text-[11px] px-1.5 min-w-[44px] text-center font-bold text-cyan-400">
                {Math.round(zoomLevel * 100)}%
              </span>
              
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3.5}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-slate-800 mx-1" />

              <button
                onClick={handleRotateCcw}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Rotate Counter-Clockwise"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleRotateCw}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Rotate Clockwise (R)"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                title="Reset View (0)"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Previous & Next Navigation */}
            {onPrevious && (
              <button
                onClick={onPrevious}
                disabled={!hasPrevious}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all"
                title="Previous Document (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {onNext && (
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all"
                title="Next Document (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Toggle Metadata Drawer */}
            <button
              onClick={() => setShowMetadata((prev) => !prev)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                showMetadata 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="Toggle Document Details (I)"
            >
              <Info className="w-4 h-4" />
              <span className="hidden md:inline">{showMetadata ? 'Hide Details' : 'Details'}</span>
            </button>

            {/* Download */}
            <button
              onClick={() => downloadFile(doc.fileUrl, doc.fileName)}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 shadow transition-all"
              title="Download File"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Full Screen Toggle */}
            <button
              onClick={handleToggleFullScreen}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isFullScreen ? 'Exit Full Screen (F)' : 'Full Screen (F)'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/30 transition-all"
              title="Close Preview (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Central Document Display Area with optional Metadata Drawer */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Main Document Viewer Canvas */}
          <div 
            className="flex-1 relative flex items-center justify-center p-2 sm:p-4 overflow-hidden bg-[#040716] select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#040716]/80 backdrop-blur-sm space-y-3">
                <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
                <p className="text-xs font-mono text-cyan-300">Rendering document from secure vault...</p>
              </div>
            )}

            {/* PDF Viewer */}
            {isPdf && (
              <div className="w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col">
                <iframe
                  src={`${doc.fileUrl}#toolbar=1&navpanes=1&statusbar=1&view=FitH`}
                  title={doc.fileName}
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setLoadError(true);
                  }}
                />
              </div>
            )}

            {/* Image Viewer with Zoom, Rotation & Pan */}
            {isImage && (
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={doc.fileUrl}
                  alt={doc.fileName}
                  referrerPolicy="no-referrer"
                  className="max-h-[85vh] max-w-[85vw] object-contain transition-transform duration-100 ease-out select-none shadow-2xl rounded-lg"
                  style={{
                    transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel}) rotate(${rotation}deg)`,
                  }}
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setLoadError(true);
                  }}
                />
              </div>
            )}

            {/* Other Unsupported File Types */}
            {!isPdf && !isImage && (
              <div className="p-8 max-w-md text-center space-y-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <FileText className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono">{doc.fileName}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct browser inline preview is not supported for .{doc.fileType} files.
                  </p>
                </div>
                <button
                  onClick={() => downloadFile(doc.fileUrl, doc.fileName)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold"
                >
                  Download File
                </button>
              </div>
            )}
          </div>

          {/* Right Side Metadata Drawer */}
          {showMetadata && (
            <aside className="w-80 border-l border-slate-800 bg-[#070b20] p-5 flex flex-col justify-between overflow-y-auto space-y-5 animate-in slide-in-from-right-4 duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Document Metadata
                  </span>
                  <button
                    onClick={() => setShowMetadata(false)}
                    className="p-1 rounded-lg text-slate-500 hover:text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Properties */}
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Category</span>
                    <span className="text-cyan-400 font-medium">{doc.category}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">File Size</span>
                    <span className="text-slate-200">{formatFileSize(doc.fileSize)}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Format</span>
                    <span className="text-slate-200 uppercase">.{doc.fileType}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Created On</span>
                    <span className="text-slate-300">
                      {new Date(doc.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {doc.description && (
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Description</span>
                      <p className="text-slate-300 text-xs font-sans mt-0.5 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        {doc.description}
                      </p>
                    </div>
                  )}

                  {doc.tags && doc.tags.length > 0 && (
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block mb-1">Index Tags</span>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] border border-slate-800">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/50 text-[11px] text-cyan-300 font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Encrypted in Firebase Cloud Storage</span>
              </div>
            </aside>
          )}

        </div>

      </div>
    </div>
  );
};
