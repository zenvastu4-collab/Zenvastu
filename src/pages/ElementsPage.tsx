import { FiveElements } from '../components/FiveElements';
import { DirectionCompass } from '../components/DirectionCompass';
import { type Product } from '../data/vastuData';
import { Compass, Sparkles, Palette } from 'lucide-react';
import { useCms } from '../context/CmsProvider';

interface ElementsPageProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ElementsPage({ onSelectProduct, onAddToCart }: ElementsPageProps) {
  const { copy } = useCms();

  return (
    <div className="animate-fadeIn">
      {/* Editorial Page Header */}
      <div className="bg-[#122218] text-white py-16 sm:py-20 border-b border-[#C5A059]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-vastu-gold text-xs font-sans font-semibold tracking-widest uppercase">
            <Palette className="w-4 h-4 text-vastu-gold" />
            <span>वैदिक तत्त्व एवं दिशा ज्ञान • Vedic Cosmic Principles</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-normal tracking-tight">
            5 Elements & 8 Energy Directions
          </h1>
          <p className="text-[#E8E1D3]/90 text-sm sm:text-base font-sans leading-relaxed font-light">
            Discover the elemental vibrations of Earth, Water, Fire, Air, and Space alongside the 8 directional vortices and their governing planetary rulers.
          </p>
        </div>
      </div>

      {/* 1. Five Elements with Authentic Vibrant Vedic Colors */}
      <FiveElements />

      {/* 2. Eight Directions & Energy Zones Compass */}
      <DirectionCompass
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
