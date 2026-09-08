import { ConsultationsSection } from '../components/ConsultationsSection';
import { MethodologySection } from '../components/MethodologySection';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsProvider';

interface ConsultationsPageProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export function ConsultationsPage({ onOpenBooking }: ConsultationsPageProps) {
  const { copy } = useCms();

  return (
    <div className="animate-fadeIn">
      {/* Editorial Page Header */}
      <div className="bg-[#122218] text-white py-16 sm:py-20 border-b border-[#C5A059]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-vastu-gold text-xs font-sans font-semibold tracking-widest uppercase">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>वास्तु परामर्श • Professional Consultation Services</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-normal tracking-tight">
            Consultations & Space Audits
          </h1>
          <p className="text-[#E8E1D3]/90 text-sm sm:text-base font-sans leading-relaxed font-light">
            Scientific 16-zone mathematical energy mapping, CAD orientation blueprints, and practical 100% non-demolition space alignment for residences, commercial towers, and industrial plants worldwide.
          </p>
        </div>
      </div>

      {/* Main Consultation Services Grid */}
      <ConsultationsSection onOpenBooking={onOpenBooking} />

      {/* Methodology & Non-Demolition Process */}
      <MethodologySection onOpenBooking={() => onOpenBooking()} />
    </div>
  );
}
