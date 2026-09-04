import React, { useState } from 'react';
import { BookOpen, ArrowRight, X, Calendar, Clock, Tag, Sparkles } from 'lucide-react';
import { INITIAL_BLOG_POSTS } from '../../data/initialData';
import { BlogPostItem } from '../../types';

export const NotesBlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);
  const posts: BlogPostItem[] = INITIAL_BLOG_POSTS;

  return (
    <section 
      id="notes" 
      aria-label="Learning and Notes"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>LEARNING &amp; NOTES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Engineering <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">Notes &amp; Insights</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Concise write-ups, algorithmic breakdowns, and conceptual technical notes written while exploring computer science at Pandit Raghunath Murmu Smriti Mahavidyalaya.
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-6 rounded-2xl bg-[#090f26]/85 border border-slate-800/80 hover:border-cyan-500/40 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 text-[11px] font-mono font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-400 text-[11px] font-mono border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {post.date}
                </span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="interactive-element inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Notes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Reading Notes */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
            <div className="w-full max-w-2xl bg-[#0b122e] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              
              {/* Top Bar */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 text-[10px] font-mono">
                      {selectedPost.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {selectedPost.date} • {selectedPost.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {selectedPost.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="interactive-element p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Paragraphs */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    {p}
                  </p>
                ))}
              </div>

              {/* Tags and Close */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
                >
                  Close Note
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
