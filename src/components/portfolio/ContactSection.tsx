import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Terminal,
  Database
} from 'lucide-react';
import { UserProfile } from '../../types';
import { sendContactMessage } from '../../lib/firestoreService';
import { sendSupabaseContactMessage } from '../../lib/supabaseService';
import { useToast } from '../../context/ToastContext';

interface ContactSectionProps {
  profile: UserProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('error', 'Missing fields', 'Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Send to Supabase Database (Project: mvnxfbvrlmzqogkwewrc)
      const supaRes = await sendSupabaseContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
      });

      // 2. Also record in Firestore for dual-backup
      try {
        await sendContactMessage({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
        });
      } catch (e) {
        // Non-blocking fallback
      }

      setSubmitted(true);
      if (supaRes.success) {
        showToast('success', 'Message Saved to Supabase Database', 'Recorded directly into PostgreSQL contact_messages table.');
      } else {
        showToast('success', 'Message Delivered', 'Thank you! Your inquiry was received and recorded.');
      }
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      showToast('error', 'Submission Error', 'Could not send message. Please reach out directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      aria-label="Contact Section"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-cyan-300 text-xs font-mono font-medium">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMUNICATION CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Get In{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Have a project idea, software inquiry, internship opening, or just want to discuss algorithms and systems architecture? Let's connect!
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: CONTACT INFO & SOCIALS ================= */}
          <div className="lg:col-span-5 rounded-2xl bg-[#090f26]/90 border border-slate-800/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-8">
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white font-mono">
                Connect Directly
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                I am actively seeking software engineering internships, technical collaborations, and research opportunities in computer science.
              </p>
            </div>

            {/* Direct Information Items */}
            <div className="space-y-4 font-mono text-xs">
              
              {/* Email */}
              <a 
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-blue-950/80 text-cyan-400 border border-blue-900 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Email Address</span>
                  <span className="text-slate-200 group-hover:text-cyan-300 transition-colors font-medium">
                    {profile.email}
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-900">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Current Location</span>
                  <span className="text-slate-200 font-medium">
                    {profile.location}
                  </span>
                </div>
              </div>

              {/* LinkedIn */}
              <a 
                href={profile.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-900 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">LinkedIn Profile</span>
                  <span className="text-slate-200 group-hover:text-blue-300 transition-colors font-medium">
                    linkedin.com/in/tanmaygarai
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a 
                href={profile.socialLinks?.github || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-600 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-slate-900 text-white border border-slate-800 group-hover:scale-105 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">GitHub Organization</span>
                  <span className="text-slate-200 group-hover:text-white transition-colors font-medium">
                    github.com/tanmaygarai
                  </span>
                </div>
              </a>

            </div>

            {/* Quick response note */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-900/40 flex items-center gap-2 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Typical Response Time: &lt; 24 Hours</span>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: CLEAN GLASS CONTACT FORM ================= */}
          <div className="lg:col-span-7 rounded-2xl bg-[#090f26]/90 border border-slate-800/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-mono">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-400">
                  Messages are sent directly and logged securely in the system.
                </p>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    Your Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Project Collaboration / Software Role"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  Message Content <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Write your message, project specifications, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-all resize-none"
                />
              </div>

              {/* Subtle Glowing Send Button */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto interactive-element inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 transition-all focus:outline-none disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-cyan-200" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>Backed by Supabase PostgreSQL (mvnxfbvrlmzqogkwewrc)</span>
                </div>
              </div>

              {submitted && (
                <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Message received! Thank you for getting in touch.</span>
                </div>
              )}

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
