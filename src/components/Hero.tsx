import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Card3D, ScrollReveal3D } from './ui/Card3D';
import { ThreeSacredMandala } from './ui/ThreeSacredMandala';
import { useCms } from '../context/CmsProvider';
import { iconByName } from '../lib/icons';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreDirections: () => void;
  onExploreProducts: () => void;
}

export function Hero({ onOpenBooking, onExploreDirections, onExploreProducts }: HeroProps) {
  const { copy, heroHighlights, heroCategories } = useCms();
  const [activeCategory, setActiveCategory] = useState<string>(heroCategories[0]?.code || 'HOME');

  return (
    <section id="hero" className="relative overflow-hidden bg-[#FAF7F2] border-b border-vastu-border">
      {/* Parent Company Attribution Badge */}
      <div className="relative bg-gradient-to-r from-[#0D1B13] via-[#14291D] to-[#0D1B13] py-2 px-4 sm:px-6 overflow-hidden">
        {/* Subtle gold shimmer lines */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <span className="hidden sm:inline-block w-8 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/50" />
          <div className="flex items-center gap-2.5 text-center">
            <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-sans text-[#C5A059]/70 font-medium whitespace-nowrap">
              A Venture of
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-serif text-[#FAF7F2] font-semibold whitespace-nowrap">
              SRV Research & Life Sciences Pvt Ltd
            </span>
          </div>
          <span className="hidden sm:inline-block w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/50" />
        </div>
      </div>

      {/* Hero Banner with Sunlit Architectural Photography & Parallax Depth */}
      <div className="relative min-h-[600px] lg:min-h-[680px] flex items-center">
        {/* Background Image with Ambient Zoom */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={copy('hero.bg_image', 'https://images.pexels.com/photos/13752246/pexels-photo-13752246.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920')}
            alt="Zen Vastu Architectural Sanctuary"
            className="w-full h-full object-cover object-center brightness-[0.7] contrast-[1.05]"
          />
          {/* Multi-tier luxury vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#101D15]/95 via-[#101D15]/75 to-[#101D15]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101D15] via-transparent to-transparent opacity-75" />
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 3D Animated Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-[#1B382B]/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#C5A059]/40 text-vastu-goldLight text-xs tracking-[0.2em] uppercase font-sans font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5 text-vastu-gold animate-pulse" />
                <span>{copy('hero.eyebrow', 'Premium Vastu Consultation & Solutions')}</span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-serif font-normal leading-[1.08] tracking-tight">
                {copy('hero.headline', 'Balance Your Space.')}
                <motion.em
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="block italic text-vastu-gold font-normal mt-1"
                >
                  {copy('hero.headline_em', 'Elevate Your Life.')}
                </motion.em>
              </h1>

              {/* Subtitle */}
              <p className="text-[#E8E1D3] text-base sm:text-lg font-sans leading-relaxed max-w-xl font-light">
                {copy('hero.subtitle', 'Thoughtful Vastu consultation for homes, offices, factories and commercial spaces — approached with traditional principles and practical understanding of modern spaces.')}
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2D4536] to-[#1E3326] hover:from-[#1E3326] hover:to-[#122218] text-white px-7 py-3.5 rounded-sm text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-md transition-all border border-vastu-gold/40 hover:border-vastu-gold"
                >
                  <span>{copy('hero.cta_primary', 'Book Consultant')}</span>
                  <ArrowRight className="w-4 h-4 text-vastu-gold" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onExploreProducts}
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/15 text-[#FAF7F2] border border-white/40 hover:border-white px-6 py-3.5 rounded-sm text-xs sm:text-sm uppercase tracking-wider font-medium transition-all backdrop-blur-sm"
                >
                  <span>{copy('hero.cta_secondary', 'Explore Services')}</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column: Interactive 3D WebGL Sacred Mandala & Prana Field */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 hidden lg:flex items-center justify-center relative perspective-1000"
            >
              <div className="relative w-[380px] h-[380px] flex items-center justify-center">
                {/* Ambient Golden Compass Grid Background */}
                <svg
                  className="absolute inset-0 w-full h-full text-vastu-gold/25 stroke-current stroke-[0.75] animate-spin-slow pointer-events-none"
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <circle cx="100" cy="100" r="92" strokeDasharray="3 3" />
                  <circle cx="100" cy="100" r="80" />
                  <circle cx="100" cy="100" r="64" strokeDasharray="4 2" />
                  <line x1="100" y1="8" x2="100" y2="192" />
                  <line x1="8" y1="100" x2="192" y2="100" />
                  <line x1="36" y1="36" x2="164" y2="164" strokeDasharray="2 4" />
                  <line x1="36" y1="164" x2="164" y2="36" strokeDasharray="2 4" />
                </svg>

                {/* 3D WebGL Interactive Three.js Canvas */}
                <div className="relative z-10">
                  <ThreeSacredMandala />
                </div>

                {/* Cardinal Markers with Symmetrical Positioning */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#101D15]/85 backdrop-blur-md px-3 py-0.5 rounded-full border border-vastu-gold/40 text-[11px] font-serif text-vastu-goldLight font-medium tracking-wider shadow-sm z-20 pointer-events-none">
                  N (Kuber)
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#101D15]/85 backdrop-blur-md px-3 py-0.5 rounded-full border border-vastu-gold/40 text-[11px] font-serif text-vastu-goldLight font-medium tracking-wider shadow-sm z-20 pointer-events-none">
                  E (Indra)
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#101D15]/85 backdrop-blur-md px-3 py-0.5 rounded-full border border-vastu-gold/40 text-[11px] font-serif text-vastu-goldLight font-medium tracking-wider shadow-sm z-20 pointer-events-none">
                  S (Yama)
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#101D15]/85 backdrop-blur-md px-3 py-0.5 rounded-full border border-vastu-gold/40 text-[11px] font-serif text-vastu-goldLight font-medium tracking-wider shadow-sm z-20 pointer-events-none">
                  W (Varuna)
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic 3D Animated Section Categories Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-[#0F1D15]/95 border-t border-white/10 backdrop-blur-md py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-vastu-gold font-sans font-semibold whitespace-nowrap pl-2">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{copy('hero.categories_label', 'Space Categories:')}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end">
              {heroCategories.map((c) => {
                const Icon = iconByName(c.icon);
                const isSelected = activeCategory === c.code;
                return (
                  <motion.button
                    key={c.code}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setActiveCategory(c.code || '');
                      onExploreDirections();
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-sm transition-all text-left whitespace-nowrap border ${
                      isSelected
                        ? 'bg-vastu-forest border-vastu-gold text-white shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#C4BDA8] hover:text-white'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-vastu-gold' : 'text-[#C4BDA8]'}`} />
                    <div className="flex flex-col">
                      <span className="text-xs font-sans font-medium tracking-wide">
                        {c.name}
                      </span>
                      <span className="text-[9px] opacity-70 hidden sm:inline">
                        {c.tag}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Trust Highlights with 3D Tilt Physics Below Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {heroHighlights.map((t, idx) => {
            const Icon = iconByName(t.icon);
            return (
              <ScrollReveal3D key={t.title || idx} delay={idx * 0.1} direction="up">
                <Card3D intensity={12} className="h-full">
                  <div className="bg-white p-6 rounded-sm border border-vastu-border hover:border-vastu-forest/40 transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full group">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-vastu-cream text-vastu-forest flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-vastu-forest group-hover:text-vastu-gold transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-vastu-forest mb-1.5">
                        {t.title}
                      </h3>
                      <p className="text-xs text-vastu-muted font-sans leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
