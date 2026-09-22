import React, { useState, useEffect } from 'react';
import { ScreenView } from '../types';
import { Search, Menu, X, Bookmark, Newspaper, Video, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenView;
  onNavigate: (screen: ScreenView, param?: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenDailyEdit: () => void;
  onOpenContact?: () => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  savedCount,
  onOpenSaved,
  onOpenDailyEdit,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileNav = (screen: ScreenView) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070b10] border-b border-[#1f2937] text-white">
      {/* Main Nav Bar */}
      <div className="w-full px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center min-w-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2.5 sm:space-x-3.5 text-left focus:outline-none group py-1"
            id="brand-logo-btn"
          >
            <img
              src="/icon.png"
              alt="NexTake Main Icon"
              className="w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl object-contain shadow-md group-hover:scale-105 transition-transform shrink-0"
              referrerPolicy="no-referrer"
            />
            {/* Header Brand Display: Responsive & Overlap-Free */}
            <div className="flex flex-col justify-center min-w-0">
              {/* Mobile: Clean, bold text that never overlaps with right-side controls */}
              <div className="sm:hidden flex items-center">
                <span className="text-lg font-black tracking-tight leading-none text-white group-hover:text-emerald-400 transition-colors">
                  NEXT<span className="text-[#00f2aa]">AKE</span>
                </span>
              </div>
              {/* Desktop/Tablet: High-res full header banner with icon, text, and motto */}
              <img
                src="/header.png"
                alt="NexTake — Technology News. Intelligently Curated."
                className="h-10 sm:h-12 md:h-14 w-auto object-contain hidden sm:block"
                referrerPolicy="no-referrer"
              />
            </div>
          </button>
        </div>

        {/* Right Side: Desktop Navigation Links & CTA */}
        <div className="hidden sm:flex items-center space-x-2 sm:space-x-4 shrink-0">
          <nav className="flex items-center space-x-1 sm:space-x-2" id="nav-links-right">
            <button
              onClick={() => onNavigate('home')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono tracking-wider font-semibold rounded transition-colors ${
                currentScreen === 'home' ? 'text-emerald-400 bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => onNavigate('shorts')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono tracking-wider font-semibold rounded transition-colors flex items-center space-x-1.5 ${
                currentScreen === 'shorts' ? 'text-emerald-400 bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              <span>Shorts</span>
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono tracking-wider font-semibold rounded transition-colors flex items-center space-x-1.5 ${
                currentScreen === 'explore' ? 'text-emerald-400 bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Explore</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded border border-slate-700 hidden md:inline">⌘K</span>
            </button>
          </nav>

          {/* Contact Us Pill */}
          <button
            onClick={onOpenContact}
            id="contact-us-btn"
            className="px-3 sm:px-4 py-1.5 text-xs font-mono font-bold tracking-wider rounded bg-[#00f2aa] hover:bg-[#00df9c] text-slate-950 transition-all shadow-[0_0_15px_rgba(0,242,170,0.3)] hover:shadow-[0_0_20px_rgba(0,242,170,0.5)] active:scale-95"
          >
            Contact
          </button>
        </div>

        {/* Right Side: Mobile Viewport Controls (Compact & Non-Overlapping) */}
        <div className="flex sm:hidden items-center space-x-1 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className={`px-2 py-1 text-xs font-mono font-semibold rounded transition-colors ${
              currentScreen === 'home' ? 'text-emerald-400 bg-white/10' : 'text-slate-300 hover:text-white'
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => onNavigate('shorts')}
            className={`px-2 py-1 text-xs font-mono font-semibold rounded transition-colors flex items-center space-x-1 ${
              currentScreen === 'shorts' ? 'text-emerald-400 bg-white/10' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
            <span>Shorts</span>
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className={`p-1.5 rounded text-slate-300 hover:text-white transition-colors ${
              currentScreen === 'explore' ? 'text-emerald-400 bg-white/10' : ''
            }`}
            aria-label="Explore and Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="p-1.5 rounded text-slate-300 hover:text-white active:scale-95 bg-slate-900 border border-slate-800 ml-0.5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-emerald-400" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dedicated News Wire Bar: Displays the Tagline with Zero Overlap */}
      <div className="sm:hidden bg-[#040810] border-t border-[#16202e] px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div className="flex items-center space-x-1.5 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider truncate">
            Technology News. Intelligently Curated.
          </span>
        </div>
        {onOpenContact && (
          <button
            onClick={onOpenContact}
            className="text-slate-300 hover:text-[#00f2aa] font-bold shrink-0 ml-2 uppercase text-[9px] tracking-wider border-b border-emerald-500/50"
          >
            Contact
          </button>
        )}
      </div>

      {/* Mobile Expandable Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#070d18] border-b border-[#1f2d3d] px-4 py-4 space-y-3 shadow-2xl">
          <div className="rounded-xl bg-[#0d1624] p-3 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">NexTake Intelligence</p>
              <p className="text-xs font-semibold text-slate-200">Technology News. Intelligently Curated.</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
            <button
              onClick={() => handleMobileNav('home')}
              className={`flex items-center space-x-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentScreen === 'home'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Newspaper className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Feed Wire</span>
            </button>

            <button
              onClick={() => handleMobileNav('shorts')}
              className={`flex items-center space-x-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentScreen === 'shorts'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Shorts</span>
            </button>

            <button
              onClick={() => handleMobileNav('explore')}
              className={`flex items-center space-x-2 p-2.5 rounded-lg border text-left transition-colors ${
                currentScreen === 'explore'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Explore</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDailyEdit();
              }}
              className="flex items-center space-x-2 p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white text-left transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>The Daily Edit</span>
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSaved();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-900/40 text-slate-300 hover:text-white font-mono text-xs"
          >
            <div className="flex items-center space-x-2">
              <Bookmark className="w-4 h-4 text-emerald-400" />
              <span>Saved Intelligence Dossier</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
              {savedCount}
            </span>
          </button>

          {onOpenContact && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 rounded-lg bg-[#00f2aa] hover:bg-[#00df9c] text-slate-950 font-mono font-bold text-xs tracking-wider transition-colors shadow-lg text-center"
            >
              Contact Editorial Team
            </button>
          )}
        </div>
      )}
    </header>
  );
};

