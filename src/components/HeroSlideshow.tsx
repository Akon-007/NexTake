import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Share2,
  Check,
  Clock,
} from 'lucide-react';
import { ScreenView, HeroSlideStory } from '../types';
import { HERO_SLIDESHOW_STORIES } from '../data/mockData';

interface HeroSlideshowProps {
  onNavigate: (screen: ScreenView, param?: string) => void;
  savedIds?: string[];
  onToggleSave?: (id: string) => void;
}

const SLIDE_DURATION_MS = 12000; // 12 seconds per slide to reduce unnecessary re-renders

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  onNavigate,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Touch handling for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const currentStory: HeroSlideStory = HERO_SLIDESHOW_STORIES[activeIdx] || HERO_SLIDESHOW_STORIES[0];
  const totalSlides = HERO_SLIDESHOW_STORIES.length;

  // Auto-rotation timer with smooth progress ticks
  useEffect(() => {
    if (isPaused) return;

    const intervalMs = 100;
    const increment = (intervalMs / SLIDE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          setActiveIdx((curr) => (curr + 1) % totalSlides);
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  // Handle manual selection from sidebar or gestures
  const handleSelectSlide = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  const handlePrevSlide = () => {
    setActiveIdx((curr) => (curr - 1 + totalSlides) % totalSlides);
    setProgress(0);
  };

  const handleNextSlide = () => {
    setActiveIdx((curr) => (curr + 1) % totalSlides);
    setProgress(0);
  };

  // Open article
  const handleOpenArticle = () => {
    onNavigate('article', currentStory.articleId);
  };

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (diff > minSwipeDistance) {
      // Swiped left -> Next slide
      handleNextSlide();
    } else if (diff < -minSwipeDistance) {
      // Swiped right -> Previous slide
      handlePrevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '#' + currentStory.articleId);
      setCopiedId(currentStory.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section
      id="hero-slideshow-section"
      className="border-b border-slate-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Main Unified Split Frame: 70% Left Main Hero, 30% Right Story Sidebar */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col lg:flex-row">
          
          {/* ========================================================= */}
          {/* 1. LEFT: MAIN HERO SLIDESHOW (~70% desktop width)          */}
          {/* ========================================================= */}
          <div
            className="w-full lg:w-[70%] flex flex-col justify-between relative bg-white transition-colors select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Slim Linear Progress Bar */}
            <div className="w-full h-1 bg-slate-100 overflow-hidden relative">
              <div
                className="h-full bg-emerald-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Slideshow Category & Metadata Header */}
            <div className="px-5 sm:px-7 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center space-x-3 text-xs font-mono">
                {/* Category Badge */}
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 tracking-wide uppercase text-[11px]">
                  {currentStory.category}
                </span>

                <span className="inline-flex items-center space-x-1.5 text-slate-500 text-[11px]">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{currentStory.readTime}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-medium">{currentStory.updatedAgo}</span>
                </span>
              </div>
            </div>

            {/* Slide Content Area (Image + Editorial Headline & Summary) */}
            <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
              
              {/* Text Meta & Headline */}
              <div className="mb-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStory.id + '-text'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <h1
                      id={`hero-headline-${currentStory.number}`}
                      onClick={handleOpenArticle}
                      className="text-2xl sm:text-3xl lg:text-[2.1rem] font-black tracking-tight text-slate-950 hover:text-emerald-700 cursor-pointer transition-colors leading-[1.14] mb-3"
                    >
                      {currentStory.headline}
                    </h1>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl line-clamp-2 sm:line-clamp-3">
                      {currentStory.summary}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Large Editorial Image Stage */}
              <div
                id="hero-image-stage"
                onClick={handleOpenArticle}
                className="relative rounded-lg overflow-hidden border border-slate-800 shadow-md group cursor-pointer aspect-[16/9] sm:aspect-[21/9] bg-slate-950 mb-5"
                title="Click to read full article"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentStory.id + '-img'}
                    src={currentStory.image}
                    alt={currentStory.headline}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0.3, scale: 1.01 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    exit={{ opacity: 0.2 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-700"
                  />
                </AnimatePresence>

                {/* Subtle contrast gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Bottom Image HUD / Telemetry metadata */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300 pointer-events-none">
                  <span className="truncate max-w-[75%] text-slate-300/90">
                    {currentStory.imageAperture || `© NEXT EDIT • DISPATCH ${currentStory.number}`}
                  </span>
                  <span className="text-emerald-400 group-hover:underline flex items-center space-x-1 shrink-0 ml-2 font-semibold">
                    <span>Full dispatch</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Primary Action Row: READ STORY -> + Share */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    id="hero-read-story-btn"
                    onClick={handleOpenArticle}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded bg-slate-950 hover:bg-emerald-600 text-white text-xs font-mono font-bold tracking-wider transition-colors active:scale-95 shadow-sm"
                  >
                    <span>READ STORY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2 rounded border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors"
                    title="Share dispatch link"
                  >
                    {copiedId === currentStory.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Author attribution */}
                <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-500">
                  <img
                    src={currentStory.author.avatar}
                    alt={currentStory.author.name}
                    className="w-5 h-5 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-slate-700 font-semibold">{currentStory.author.name}</span>
                  <span>•</span>
                  <span>{currentStory.author.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. RIGHT: TRENDING STORY SIDEBAR (~30% desktop width)      */}
          {/* ========================================================= */}
          <div
            id="hero-story-sidebar"
            className="w-full lg:w-[30%] border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/40 flex flex-col justify-between"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div>
              {/* Sidebar Header */}
              <div className="px-4 py-2.5 border-b border-slate-200 bg-white/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Click to preview
                </span>
              </div>

              {/* Sidebar Story Items Navigator */}
              <div className="divide-y divide-slate-100">
                {HERO_SLIDESHOW_STORIES.map((story, idx) => {
                  const isActive = idx === activeIdx;

                  return (
                    <div
                      key={story.id}
                      id={`sidebar-story-item-${story.number}`}
                      onClick={() => handleSelectSlide(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectSlide(idx);
                        }
                      }}
                      className={`relative p-3.5 sm:p-4 text-left cursor-pointer transition-all duration-200 ${
                        isActive
                          ? 'bg-white border-l-3 border-emerald-500 shadow-2xs'
                          : 'border-l-3 border-transparent hover:bg-white/80 opacity-75 hover:opacity-100'
                      }`}
                    >
                      {/* Active slide progress line inside the item */}
                      {isActive && (
                        <div className="absolute top-0 right-0 left-0 h-0.5 bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 transition-all duration-75 ease-linear"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}

                      <div className="flex items-start space-x-3">
                        {/* Thumbnail */}
                        <div className="relative w-16 h-12 sm:w-18 sm:h-13 rounded overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                          <img
                            src={story.image}
                            alt={story.headline}
                            className={`w-full h-full object-cover transition-transform duration-300 ${
                              isActive ? 'scale-105 contrast-105' : 'grayscale-25 hover:grayscale-0'
                            }`}
                          />
                          {isActive && (
                            <div className="absolute inset-0 ring-1 ring-inset ring-emerald-500/60" />
                          )}
                        </div>

                        {/* Metadata & Headline */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1.5 text-[11px] font-mono mb-1">
                            {/* Story Number */}
                            <span
                              className={`font-bold ${
                                isActive ? 'text-emerald-700' : 'text-slate-400'
                              }`}
                            >
                              {story.number}
                            </span>
                            <span className="text-slate-300">•</span>
                            {/* Category */}
                            <span
                              className={`font-semibold uppercase tracking-wider ${
                                isActive ? 'text-slate-900' : 'text-slate-500'
                              }`}
                            >
                              {story.category}
                            </span>
                            {isActive && (
                              <span className="ml-auto text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-1 rounded">
                                ACTIVE
                              </span>
                            )}
                          </div>

                          <h2
                            className={`text-xs sm:text-[13px] leading-snug line-clamp-2 transition-colors ${
                              isActive
                                ? 'font-bold text-slate-950'
                                : 'font-medium text-slate-700 group-hover:text-slate-950'
                            }`}
                          >
                            {story.headline}
                          </h2>

                          <div className="mt-1 flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                            <span>{story.readTime}</span>
                            <span>•</span>
                            <span>{story.updatedAgo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Bottom Action */}
            <div className="p-3 border-t border-slate-200 bg-white/70 text-[11px] font-mono text-slate-500 flex items-center justify-end">
              <button
                type="button"
                onClick={handleOpenArticle}
                className="text-emerald-700 hover:text-emerald-900 hover:underline font-semibold flex items-center space-x-1"
              >
                <span>Read active</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. MOBILE: HORIZONTAL STORY SELECTOR (< lg only)           */}
        {/* ========================================================= */}
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold tracking-wider text-slate-700 uppercase">
              Stories in this hero
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Swipe hero or tap story
            </span>
          </div>

          <div className="flex space-x-2.5 overflow-x-auto no-scrollbar pb-1">
            {HERO_SLIDESHOW_STORIES.map((story, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={story.id}
                  type="button"
                  id={`mobile-selector-${story.number}`}
                  onClick={() => handleSelectSlide(idx)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border text-left shrink-0 transition-all ${
                    isActive
                      ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold ${
                      isActive ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    {story.number}
                  </span>
                  <div className="w-6 h-6 rounded overflow-hidden shrink-0 border border-slate-700/40">
                    <img
                      src={story.image}
                      alt={story.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs font-mono font-bold tracking-wide uppercase truncate max-w-[110px]">
                    {story.category}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

