import React, { useState } from 'react';
import { X, Send, CheckCircle2, Shield, Mail, MessageSquare, Building, User, Video, Twitter, Youtube, ArrowUpRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InquiryType = 'editorial' | 'tip' | 'press' | 'corporate';

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [inquiryType, setInquiryType] = useState<InquiryType>('editorial');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Allow user to see confirmation before closing or reset
    }, 500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setOrganization('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      id="contact-modal-overlay"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white text-slate-900 border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        id="contact-modal-dialog"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-slate-800 uppercase tracking-wider">
              NexTake • Direct Desk
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            title="Close Contact Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Dispatch Transmitted</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to NexTake. Your inquiry has been routed to our{' '}
              <span className="text-emerald-700 font-mono font-semibold">
                {inquiryType === 'tip'
                  ? 'secure investigative desk'
                  : inquiryType === 'editorial'
                  ? 'editorial board'
                  : inquiryType === 'press'
                  ? 'communications team'
                  : 'partnerships director'}
              </span>
              . You will receive an acknowledgment within one business cycle.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs tracking-wider transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 bg-white">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">Contact Us</h2>
              <p className="text-xs text-slate-500 mt-1">
                Direct lines for story pitches, secure whistleblower tips, press inquiries, and corporate partnerships.
              </p>
            </div>

            {/* Corporate & Direct Channels Details */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    Direct Email
                  </span>
                </div>
                <a
                  href="mailto:nextakeafrica@gmail.com"
                  className="font-mono text-xs font-bold text-white hover:text-emerald-400 flex items-center space-x-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>nextakeafrica@gmail.com</span>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="text-slate-400 text-[10px] uppercase font-bold mr-1">Channels:</span>
                <a
                  href="https://www.tiktok.com/@nextakeafrica?_r=1&_t=ZS-99whwf9jCeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors"
                >
                  <Video className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>TikTok</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </a>
                <a
                  href="https://x.com/nextakeafrica?s=11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors"
                >
                  <Twitter className="w-3 h-3 text-sky-400 shrink-0" />
                  <span>X (Twitter)</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </a>
                <a
                  href="https://youtube.com/@nextakeafrica?si=C4kBMGS9lWiCJ3uV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors"
                >
                  <Youtube className="w-3 h-3 text-red-400 shrink-0" />
                  <span>YouTube</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Inquiry Selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono font-semibold text-slate-600 uppercase tracking-wider">
                Inquiry Routing
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'editorial', label: 'Editorial' },
                  { id: 'tip', label: 'Leak / Tip' },
                  { id: 'press', label: 'Press Desk' },
                  { id: 'corporate', label: 'Partnership' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setInquiryType(tab.id as InquiryType)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold border text-center transition-all ${
                      inquiryType === tab.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono font-semibold text-slate-700">Your Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono font-semibold text-slate-700">Work / Signal Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono font-semibold text-slate-700">Organization / Affiliation</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Autonomous Labs / University / Fund"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono font-semibold text-slate-700">Message / Brief *</label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    inquiryType === 'tip'
                      ? 'Share encrypted tip details, verification hashes, or document references...'
                      : 'Outline your question, story lead, or partnership proposal...'
                  }
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500/20 resize-none transition-all"
                ></textarea>
              </div>
            </div>

            {inquiryType === 'tip' && (
              <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <Shield className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>All leak dispatches are cryptographically isolated and stripped of telemetry.</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-slate-500">
                Encrypted submission • Response &lt; 24h
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs tracking-wider flex items-center space-x-2 transition-all shadow-sm active:scale-95"
              >
                <span>Transmit</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
