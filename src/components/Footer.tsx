import React, { useState } from 'react';
import { ScreenView } from '../types';
import { Mail, Shield, ArrowUpRight, MessageSquare, CheckCircle2, Bell, Sparkles, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenView, param?: string) => void;
  onOpenDailyEdit: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDailyEdit, onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekend' | 'all'>('daily');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 600);
  };

  return (
    <footer className="bg-[#05080c] text-slate-400 text-xs border-t border-[#161f2c] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* SUBSCRIBE TO NEWSLETTER SECTION */}
        {/* ========================================================================= */}
        <div id="newsletter-subscriber-section" className="mb-12 rounded-2xl bg-gradient-to-br from-[#0a0f18] to-[#070b12] border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle background tech glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-slate-700/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>The Daily Edit Newsletter</span>
                </span>
                <span className="text-slate-500 text-[11px] font-mono">
                  • 07:00 UTC Transmission
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 hidden sm:inline-block">
                  84,000+ Subscribers
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                Subscribe to our morning intelligence wire.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Get high-signal investigative dispatches covering frontier neural architectures, sovereign silicon, and private venture movements delivered directly to your inbox every morning.
              </p>

              {/* Frequency selection pills */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="text-slate-500 text-[10px] uppercase font-bold mr-1">Edition:</span>
                <button
                  type="button"
                  onClick={() => setFrequency('daily')}
                  className={`px-3 py-1 rounded-lg transition-all text-xs ${
                    frequency === 'daily'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Daily Brief (07:00 UTC)
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('weekend')}
                  className={`px-3 py-1 rounded-lg transition-all text-xs ${
                    frequency === 'weekend'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Weekend Longform
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('all')}
                  className={`px-3 py-1 rounded-lg transition-all text-xs ${
                    frequency === 'all'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  All Wires & Breaking
                </button>
              </div>
            </div>

            {/* Right Form / Success Column */}
            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/60 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">
                      Telemetry Synchronized
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Welcome to The Daily Edit. A confirmation token has been dispatched to{' '}
                      <span className="text-emerald-400 font-mono font-semibold">{email}</span>.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={onOpenDailyEdit}
                      className="px-4 py-2 rounded-lg bg-[#00f2aa] hover:bg-[#00df9c] text-slate-950 font-mono font-bold text-xs tracking-wider transition-all"
                    >
                      Read Today&apos;s Edition
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubscribed(false);
                        setEmail('');
                      }}
                      className="text-xs text-slate-400 hover:text-white underline font-mono"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Work / Research Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@organization.com"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-slate-600 focus:border-emerald-400 focus:outline-none text-white placeholder-slate-500 text-xs font-mono transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-h-[44px] flex-1 px-6 py-3 rounded-xl bg-[#00f2aa] hover:bg-[#00df9c] text-slate-950 font-mono font-bold text-xs tracking-wider flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(0,242,170,0.25)] hover:shadow-[0_0_25px_rgba(0,242,170,0.4)] active:scale-95 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Synchronizing...</span>
                      ) : (
                        <>
                          <span>Subscribe to Newsletter</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={onOpenDailyEdit}
                      className="min-h-[44px] px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-colors whitespace-nowrap"
                      title="Preview Current Daily Edition"
                    >
                      <span>Preview Edition</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500 pt-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
                    <span>Zero spam. No tracking pixels. Cryptographic one-click unsubscribe.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Contact & Global Bureaus Wire Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-[#090d14] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold uppercase tracking-wider">Direct Editorial Wire</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">SF • London • Tokyo Bureaus</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Have breaking intelligence, research tips, or corporate inquiries?
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Reach our investigative journalists, editors, and corporate team with encrypted protocol or direct communications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-lg bg-[#00f2aa] hover:bg-[#00df9c] text-slate-950 font-mono font-bold text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(0,242,170,0.25)] flex items-center space-x-2 active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="mailto:contact@nextedit.media"
              className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-mono text-xs flex items-center space-x-2 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>contact@nextedit.media</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-[#161f2c]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                Vol. 24
              </span>
              <span className="text-xl font-black tracking-tighter text-white">
                Next Edit
              </span>
            </div>

            <div className="font-mono text-[11px] leading-relaxed text-emerald-400 space-y-0.5 font-bold">
              <p>What is happening?</p>
              <p>What is next?</p>
              <p>What should I know?</p>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              High-signal investigative technology analysis engineered for global operators, research minds, and builders.
            </p>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-white font-mono text-[11px] tracking-wider font-bold mb-3.5">
              Categories
            </h4>
            <ul className="space-y-2.5 text-[12px]">
              <li>
                <button
                  onClick={() => onNavigate('explore', 'AI')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  AI & Neural Networks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore', 'FINTECH')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Fintech & Sovereign Rails
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore', 'STARTUPS')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Venture & Seed Capital
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore', 'CYBERSECURITY')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Cybersecurity & Threat Mesh
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore', 'ROBOTICS')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Autonomous Robotics
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial Col */}
          <div>
            <h4 className="text-white font-mono text-[11px] tracking-wider font-bold mb-3.5">
              Editorial
            </h4>
            <ul className="space-y-2.5 text-[12px]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Trending Signals
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDailyEdit}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  The Daily Edit Brief
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shorts')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Tech Shorts & Reels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('interview')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Operator Interviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('article')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Deep Dive Monographs
                </button>
              </li>
            </ul>
          </div>

          {/* Retention & Feeds */}
          <div>
            <h4 className="text-white font-mono text-[11px] tracking-wider font-bold mb-3.5">
              Retention & Feeds
            </h4>
            <ul className="space-y-2.5 text-[12px]">
              <li>
                <button
                  onClick={onOpenDailyEdit}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Newsletter Subscription
                </button>
              </li>
              <li>
                <span className="hover:text-slate-200 cursor-pointer">Syndicated RSS Feeds</span>
              </li>
              <li>
                <span className="hover:text-slate-200 cursor-pointer">Telegram Telemetry Wire</span>
              </li>
              <li>
                <span className="hover:text-slate-200 cursor-pointer">Audio Monographs Podcast</span>
              </li>
              <li>
                <span className="hover:text-slate-200 cursor-pointer">Custom Dispatch Alerts</span>
              </li>
            </ul>
          </div>

          {/* Corporate & Contact */}
          <div>
            <h4 className="text-white font-mono text-[11px] tracking-wider font-bold mb-3.5">
              Corporate & Contact
            </h4>
            <ul className="space-y-2.5 text-[12px]">
              <li>
                <button
                  onClick={onOpenContact}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center space-x-1"
                >
                  <span>Contact Us & Bureaus</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Secure Whistleblower Tip Line
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Media Kit & Press Inquiries
                </button>
              </li>
              <li>
                <span className="hover:text-slate-200 cursor-pointer">Masthead & Editorial Code</span>
              </li>
              <li>
                <span className="hover:text-slate-200 cursor-pointer">Institutional Sponsorship</span>
              </li>
              <li>
                <span className="hover:text-slate-200 cursor-pointer">Privacy & Data Protocol</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & system telemetry */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-slate-500 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            <span>© 2025 Next Edit Media Group. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>System protocol: v4.12-live</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">UTC telemetry synchronized</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
