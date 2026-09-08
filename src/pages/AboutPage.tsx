import { AboutSection } from '../components/AboutSection';
import { MethodologySection } from '../components/MethodologySection';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export function AboutPage({ onOpenBooking }: AboutPageProps) {
  return (
    <div className="animate-fadeIn">
      {/* Editorial Page Header */}
      <div className="bg-[#122218] text-white py-16 sm:py-20 border-b border-[#C5A059]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-vastu-gold text-xs font-sans font-semibold tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4 text-vastu-gold" />
            <span>हमारी दृष्टि • The Vision Behind Zen Vastu</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-normal tracking-tight">
            Sacred Architecture & Living
          </h1>
          <p className="text-[#E8E1D3]/90 text-sm sm:text-base font-sans leading-relaxed font-light">
            Founded on classical Vedic Shastras and modern spatial design, Zen Vastu bridges ancient geomantic wisdom with architectural science — without ever resorting to demolition.
          </p>
        </div>
      </div>

      {/* About Section */}
      <AboutSection onOpenBooking={onOpenBooking} />

      {/* 4-Stage Methodology & Comparison Table */}
      <MethodologySection onOpenBooking={onOpenBooking} />
    </div>
  );
}
