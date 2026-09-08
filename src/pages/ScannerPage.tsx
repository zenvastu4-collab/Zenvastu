import { InteractiveVastuScanner } from '../components/ui/InteractiveVastuScanner';
import { Compass } from 'lucide-react';

interface ScannerPageProps {
  onOpenBooking: () => void;
}

export function ScannerPage({ onOpenBooking }: ScannerPageProps) {
  return (
    <div className="animate-fadeIn">
      {/* Editorial Page Header */}
      <div className="bg-[#122218] text-white py-16 sm:py-20 border-b border-[#C5A059]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-vastu-gold text-xs font-sans font-semibold tracking-widest uppercase">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>ऊर्जा विश्लेषण • Real-Time Energy Compatibility Scanner</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-normal tracking-tight">
            Vastu Room Diagnostic Tool
          </h1>
          <p className="text-[#E8E1D3]/90 text-sm sm:text-base font-sans leading-relaxed font-light">
            Evaluate the energetic compatibility of your Master Bedroom, Kitchen, Pooja Mandir, Main Door, Cash Locker, and Executive Office with 100% non-demolition recommendations.
          </p>
        </div>
      </div>

      {/* Interactive Vastu Scanner Tool */}
      <InteractiveVastuScanner onOpenBooking={onOpenBooking} />
    </div>
  );
}
