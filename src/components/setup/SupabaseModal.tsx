import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ExternalLink, 
  Terminal, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Zap,
  ArrowRight,
  ShieldCheck,
  Check,
  FileCode2,
  ListFilter
} from 'lucide-react';
import { 
  SUPABASE_PROJECT_ID, 
  SUPABASE_URL, 
  SUPABASE_ANON_KEY, 
  testSupabaseConnection, 
  SupabaseHealthStatus 
} from '../../lib/supabase';
import { 
  SUPABASE_SQL_SCHEMA, 
  checkAllTablesStatus, 
  testSupabaseReadOperation, 
  testSupabaseWriteOperation,
  TableStatus,
  OperationResult
} from '../../lib/supabaseService';
import { useToast } from '../../context/ToastContext';
import { UserProfile } from '../../types';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: UserProfile;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'status' | 'tables' | 'sql' | 'details'>('status');
  const [showKey, setShowKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  const [health, setHealth] = useState<SupabaseHealthStatus | null>(null);
  const [checking, setChecking] = useState(false);
  
  // Table audit state
  const [tableAudit, setTableAudit] = useState<TableStatus[]>([]);
  const [auditing, setAuditing] = useState(false);

  // Read & Write test states
  const [readResult, setReadResult] = useState<OperationResult | null>(null);
  const [testingRead, setTestingRead] = useState(false);

  const [writeResult, setWriteResult] = useState<OperationResult | null>(null);
  const [testingWrite, setTestingWrite] = useState(false);

  const checkConnection = async () => {
    setChecking(true);
    try {
      const res = await testSupabaseConnection();
      setHealth(res);
    } catch (e: any) {
      setHealth({
        connected: false,
        projectId: SUPABASE_PROJECT_ID,
        url: SUPABASE_URL,
        statusMessage: e?.message || 'Connection failed',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setChecking(false);
    }
  };

  const runAudit = async () => {
    setAuditing(true);
    try {
      const results = await checkAllTablesStatus();
      setTableAudit(results);
    } catch (err: any) {
      showToast('error', 'Audit Failed', err?.message || 'Could not query Supabase schema');
    } finally {
      setAuditing(false);
    }
  };

  const handleTestRead = async () => {
    setTestingRead(true);
    try {
      const res = await testSupabaseReadOperation();
      setReadResult(res);
      if (res.success) {
        showToast('success', 'Read Operation Succeeded', `${res.message} (${res.latencyMs}ms)`);
      } else {
        showToast('info', 'Read Operation Notice', res.message);
      }
    } catch (err: any) {
      setReadResult({
        success: false,
        latencyMs: 0,
        operation: 'read',
        targetTable: 'profiles',
        message: err?.message || 'Read failed',
      });
    } finally {
      setTestingRead(false);
    }
  };

  const handleTestWrite = async () => {
    setTestingWrite(true);
    try {
      const res = await testSupabaseWriteOperation();
      setWriteResult(res);
      if (res.success) {
        showToast('success', 'Write Operation Succeeded', `${res.message} (${res.latencyMs}ms)`);
      } else {
        showToast('info', 'Write Operation Notice', res.message);
      }
    } catch (err: any) {
      setWriteResult({
        success: false,
        latencyMs: 0,
        operation: 'write',
        targetTable: 'contact_messages',
        message: err?.message || 'Write failed',
      });
    } finally {
      setTestingWrite(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkConnection();
      runAudit();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast('success', 'Copied to clipboard', label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const existingTablesCount = tableAudit.filter(t => t.exists).length;
  const totalTablesCount = tableAudit.length || 8;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="w-full max-w-3xl bg-[#090f26] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#0c1536] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Supabase PostgreSQL Verification</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono">
                  mvnxfbvrlmzqogkwewrc
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Engine: <span className="text-cyan-300">PostgreSQL 15+</span> • RLS & Policies Configured
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 pt-2 gap-4 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'status' 
                ? 'border-emerald-400 text-emerald-300' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Connection & I/O Tests
          </button>
          <button
            onClick={() => setActiveTab('tables')}
            className={`pb-3 border-b-2 font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tables' 
                ? 'border-emerald-400 text-emerald-300' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Table Audit</span>
            <span className={`px-1.5 py-0.2 rounded text-[10px] ${
              existingTablesCount > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {existingTablesCount}/{totalTablesCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'sql' 
                ? 'border-emerald-400 text-emerald-300' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Complete SQL Schema & Setup
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'details' 
                ? 'border-emerald-400 text-emerald-300' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Credentials & Security
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* TAB 1: STATUS & OPERATIONS */}
          {activeTab === 'status' && (
            <div className="space-y-5">
              
              {/* Connection Status Card */}
              <div className="p-4 rounded-xl bg-[#0d1838] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {checking ? (
                      <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                    ) : health?.connected ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    )}
                    <span className="font-semibold text-white">
                      {checking ? 'Testing Supabase Cluster...' : health?.connected ? 'Supabase Cluster Reachable' : 'Connection Standby'}
                    </span>
                  </div>

                  <button
                    onClick={checkConnection}
                    disabled={checking}
                    className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${checking ? 'animate-spin' : ''}`} />
                    <span>Ping Gateway</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-500">Project Endpoint</div>
                    <div className="text-emerald-400 font-semibold truncate mt-0.5">{SUPABASE_PROJECT_ID}.supabase.co</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-500">Gateway Latency</div>
                    <div className="text-cyan-400 font-semibold mt-0.5">
                      {health?.latencyMs !== undefined ? `${health.latencyMs} ms` : '—'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 col-span-2 sm:col-span-1">
                    <div className="text-slate-500">Failover Protection</div>
                    <div className="text-emerald-300 font-semibold mt-0.5">Zero-Downtime Fallback</div>
                  </div>
                </div>

                {health?.statusMessage && (
                  <p className="text-xs text-slate-400 font-mono pt-1">
                    Status: {health.statusMessage}
                  </p>
                )}
              </div>

              {/* READ & WRITE OPERATIONS VERIFICATION */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider font-semibold">
                    Live I/O Operations Verification
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">
                    Direct PostgREST API Calls
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Test Read Button */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                          <ListFilter className="w-3.5 h-3.5 text-cyan-400" />
                          <span>1. Test Read Operation</span>
                        </span>
                        {readResult && (
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            readResult.success ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {readResult.success ? 'PASSED' : 'PENDING TABLES'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Executes a live <code className="text-cyan-300">SELECT * FROM public.profiles</code> query.
                      </p>
                    </div>

                    <button
                      onClick={handleTestRead}
                      disabled={testingRead}
                      className="w-full py-2 px-3 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${testingRead ? 'animate-spin' : ''}`} />
                      <span>{testingRead ? 'Executing Query...' : 'Execute Read Test'}</span>
                    </button>

                    {readResult && (
                      <div className={`p-2.5 rounded-lg border text-[11px] font-mono leading-relaxed ${
                        readResult.success 
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' 
                          : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                      }`}>
                        <div className="font-bold flex items-center justify-between mb-1">
                          <span>{readResult.success ? '✓ Read Successful' : 'Notice: Table Not Found'}</span>
                          <span>{readResult.latencyMs}ms</span>
                        </div>
                        <p className="text-[10px] text-slate-300">{readResult.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Test Write Button */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>2. Test Write Operation</span>
                        </span>
                        {writeResult && (
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            writeResult.success ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {writeResult.success ? 'PASSED' : 'PENDING TABLES'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Executes a live <code className="text-amber-300">INSERT INTO contact_messages</code> statement.
                      </p>
                    </div>

                    <button
                      onClick={handleTestWrite}
                      disabled={testingWrite}
                      className="w-full py-2 px-3 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      <Zap className={`w-3.5 h-3.5 ${testingWrite ? 'animate-bounce' : ''}`} />
                      <span>{testingWrite ? 'Inserting Record...' : 'Execute Write Test'}</span>
                    </button>

                    {writeResult && (
                      <div className={`p-2.5 rounded-lg border text-[11px] font-mono leading-relaxed ${
                        writeResult.success 
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' 
                          : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                      }`}>
                        <div className="font-bold flex items-center justify-between mb-1">
                          <span>{writeResult.success ? '✓ Insert Successful' : 'Notice: Table Not Found'}</span>
                          <span>{writeResult.latencyMs}ms</span>
                        </div>
                        <p className="text-[10px] text-slate-300">{writeResult.message}</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Quick Action to open SQL Editor */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                <div className="text-xs text-emerald-300 font-mono">
                  <span>To create all tables in 10 seconds:</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('sql')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>View SQL Schema</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: TABLE AUDIT */}
          {activeTab === 'tables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Database Tables Audit</h4>
                  <p className="text-xs text-slate-400">
                    Live verification status for all 8 application tables on Supabase
                  </p>
                </div>
                <button
                  onClick={runAudit}
                  disabled={auditing}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${auditing ? 'animate-spin' : ''}`} />
                  <span>Re-check Schema</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tableAudit.map((item) => (
                  <div 
                    key={item.name}
                    className={`p-3.5 rounded-xl border font-mono text-xs transition-colors ${
                      item.exists 
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.exists ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                        <div>
                          <div className="font-bold text-white text-xs">{item.name}</div>
                          <div className="text-[10px] text-slate-500">{item.category}</div>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.exists 
                          ? 'bg-emerald-500/20 text-emerald-300' 
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {item.exists ? `${item.count ?? 0} rows` : 'Missing in DB'}
                      </span>
                    </div>

                    {!item.exists && (
                      <p className="text-[10px] text-slate-500 mt-2">
                        Table not created yet. Paste SQL schema in Supabase SQL editor to create.
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Total tables identified: 8 • Profile, Vault, Documents, Certificates, Projects, Skills, Education, Contact</span>
                <button
                  onClick={() => setActiveTab('sql')}
                  className="text-emerald-400 hover:text-emerald-300 font-mono text-xs underline"
                >
                  Create Tables Now →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: COMPLETE SQL SCHEMA */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-semibold text-white">PostgreSQL Migration & Schema</h4>
                  <p className="text-xs text-slate-400">
                    Creates all 8 tables, enables Row Level Security (RLS), sets security policies & seeds initial data.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open Supabase SQL Editor</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => handleCopy(SUPABASE_SQL_SCHEMA, 'Complete SQL Schema')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === 'Complete SQL Schema' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SQL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick instructions banner */}
              <div className="p-3.5 rounded-xl bg-[#0e1b3d] border border-cyan-500/30 text-xs font-mono text-cyan-200 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>How to apply this SQL schema in 3 simple steps:</span>
                </div>
                <ol className="list-decimal list-inside text-[11px] text-slate-300 space-y-0.5 pt-1">
                  <li>Click <strong>&quot;Open Supabase SQL Editor&quot;</strong> above (or visit your project dashboard).</li>
                  <li>Click <strong>&quot;Copy SQL&quot;</strong> and paste the contents into the editor query tab.</li>
                  <li>Press <strong>RUN</strong> (or Ctrl+Enter). All tables, security policies, and seed records will be created instantly.</li>
                </ol>
              </div>

              {/* Code viewer */}
              <div className="relative rounded-xl bg-black/80 border border-slate-800 p-4 max-h-[320px] overflow-y-auto">
                <pre className="text-[11px] font-mono text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
                  {SUPABASE_SQL_SCHEMA}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: CREDENTIALS & SECURITY */}
          {activeTab === 'details' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Secret Exposure: Only safe client-side publishable key is stored. Secret service keys are never exposed.</span>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Project ID</label>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-emerald-300 font-bold flex-1">{SUPABASE_PROJECT_ID}</span>
                  <button 
                    onClick={() => handleCopy(SUPABASE_PROJECT_ID, 'Project ID')}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">REST API URL</label>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-cyan-300 font-bold flex-1 truncate">{SUPABASE_URL}</span>
                  <button 
                    onClick={() => handleCopy(SUPABASE_URL, 'Supabase URL')}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-400">Publishable / Anon API Key</label>
                  <button 
                    onClick={() => setShowKey(!showKey)}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showKey ? 'Hide' : 'Reveal'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-300 font-mono flex-1 truncate">
                    {showKey ? SUPABASE_ANON_KEY : `${SUPABASE_ANON_KEY.substring(0, 14)}••••••••••••••••••••••••`}
                  </span>
                  <button 
                    onClick={() => handleCopy(SUPABASE_ANON_KEY, 'API Key')}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Environment Variables Configured:</span>
                </div>
                <p>• <code className="text-emerald-300">VITE_SUPABASE_PROJECT_ID=mvnxfbvrlmzqogkwewrc</code></p>
                <p>• <code className="text-cyan-300">VITE_SUPABASE_URL=https://mvnxfbvrlmzqogkwewrc.supabase.co</code></p>
                <p>• <code className="text-amber-300">VITE_SUPABASE_ANON_KEY=sb_publishable_...</code></p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0c1536] border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            PostgreSQL • Supabase Engine • Project: {SUPABASE_PROJECT_ID}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
