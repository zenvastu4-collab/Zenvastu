import { useState } from 'react';
import { type Product } from '../data/vastuData';
import { useCms } from '../context/CmsProvider';
import { Compass, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

interface DirectionCompassProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function DirectionCompass({ onSelectProduct, onAddToCart }: DirectionCompassProps) {
  const { directions, products, copy } = useCms();
  const [selectedCode, setSelectedCode] = useState<string>('N');

  const selectedDirection = directions.find((d) => d.code === selectedCode) || directions[0];

  const matchedProducts = products.filter((p) =>
    selectedDirection.recommendedProducts.includes(p.slug)
  );

  return (
    <section id="directions" className="py-20 bg-[#FAF7F2] border-b border-vastu-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-vastu-gold animate-spin-slow" />
            <span>{copy('directions.eyebrow', 'अष्टदिक् निर्णय • 8 Cardinal Directions & Brahmasthan')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
            {copy('directions.title', 'Explore Your Space’s Energy Quadrants')}
          </h2>
          <p className="mt-3 text-vastu-muted text-sm sm:text-base font-sans leading-relaxed">
            {copy('directions.subtitle', 'Every quadrant in your home or office is governed by specific cosmic deities, elemental energies, and planetary frequencies. Select any zone to discover its placement rules.')}
          </p>
        </div>

        {/* Direction Selector Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 mb-10">
          {directions.map((dir) => {
            const isSelected = dir.code === selectedCode;
            return (
              <button
                key={dir.code}
                onClick={() => setSelectedCode(dir.code)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-sans tracking-wide transition-all duration-200 border ${
                  isSelected
                    ? 'bg-vastu-forest text-white border-vastu-forest shadow-sm font-semibold'
                    : 'bg-white hover:bg-vastu-cream/60 text-vastu-charcoal border-vastu-border'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: dir.colorHex }}
                />
                <span>{dir.name}</span>
                <span className="text-[10px] opacity-70">({dir.code})</span>
              </button>
            );
          })}
        </div>

        {/* Direction Detail Card */}
        <div className="bg-white rounded-sm border border-vastu-border shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Direction Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-vastu-border pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans text-vastu-terracotta uppercase tracking-wider font-semibold">
                    <span>{selectedDirection.sanskritName}</span>
                    <span>•</span>
                    <span>Zone: {selectedDirection.name}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-vastu-forest font-medium mt-1">
                    {selectedDirection.name} Quadrant
                  </h3>
                </div>

                <div className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-1 rounded border border-vastu-border">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: selectedDirection.colorHex }}
                  />
                  <span className="text-xs font-sans font-medium text-vastu-charcoal">
                    {selectedDirection.element}
                  </span>
                </div>
              </div>

              {/* Deity & Planet Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FAF7F2] p-4 rounded-sm border border-vastu-borderLight">
                  <span className="text-[11px] uppercase tracking-wider text-vastu-muted font-sans block mb-1">
                    Ruling Deity
                  </span>
                  <span className="font-serif text-base font-semibold text-vastu-forest">
                    {selectedDirection.rulingDeity}
                  </span>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-sm border border-vastu-borderLight">
                  <span className="text-[11px] uppercase tracking-wider text-vastu-muted font-sans block mb-1">
                    Ruling Planet
                  </span>
                  <span className="font-serif text-base font-semibold text-vastu-forest">
                    {selectedDirection.rulingPlanet}
                  </span>
                </div>
              </div>

              {/* Core Benefits */}
              <div className="bg-vastu-forest/5 p-4 rounded-sm border-l-3 border-vastu-forest">
                <span className="text-xs font-serif font-bold text-vastu-forest uppercase tracking-wider block mb-1">
                  Primary Energetic Impact:
                </span>
                <p className="text-xs sm:text-sm text-vastu-charcoal font-sans leading-relaxed">
                  {selectedDirection.keyBenefits}
                </p>
              </div>

              {/* Ideal vs Avoid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-emerald-800 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Ideal Placements (Auspicious)</span>
                  </div>
                  <ul className="space-y-1.5">
                    {selectedDirection.idealFor.map((item, idx) => (
                      <li key={idx} className="text-xs text-vastu-charcoal font-sans flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-rose-900 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>Strictly Avoid (Doshas)</span>
                  </div>
                  <ul className="space-y-1.5">
                    {selectedDirection.avoidHere.map((item, idx) => (
                      <li key={idx} className="text-xs text-vastu-charcoal font-sans flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Non-Demolition Remedy */}
              <div className="bg-vastu-gold/10 p-4 rounded-sm border border-vastu-gold/30">
                <div className="flex items-center gap-2 mb-1 text-vastu-forest font-serif font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-vastu-gold" />
                  <span>Non-Demolition Remedy:</span>
                </div>
                <p className="text-xs text-vastu-charcoal font-sans leading-relaxed">
                  {selectedDirection.remedyTips}
                </p>
              </div>
            </div>

            {/* Right: Recommended Remedial Objects */}
            <div className="lg:col-span-5 bg-[#FAF7F2] border-t lg:border-t-0 lg:border-l border-vastu-border p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-vastu-forest uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-4 h-4 text-vastu-gold" />
                  <span>Recommended Remedial Objects for {selectedDirection.name}</span>
                </div>

                <div className="space-y-3.5">
                  {matchedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white p-3 rounded-sm border border-vastu-border hover:border-vastu-forest/40 transition-all shadow-sm flex gap-3.5 items-center group"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-16 h-16 rounded object-cover border border-vastu-border group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-semibold text-vastu-forest truncate">
                          {prod.name}
                        </h4>
                        <p className="text-[11px] text-vastu-muted truncate font-sans">
                          {prod.subtitle}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-sans font-bold text-xs text-vastu-forest">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onSelectProduct(prod)}
                              className="text-[10px] text-vastu-terracotta hover:text-vastu-forest font-semibold uppercase tracking-wider flex items-center gap-0.5"
                            >
                              <span>Details</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onAddToCart(prod)}
                              className="p-1 rounded bg-vastu-forest hover:bg-[#12261D] text-vastu-gold text-xs"
                              title="Add to Cart"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-vastu-border/60 mt-6">
                <p className="text-[11px] text-vastu-muted font-sans leading-relaxed">
                  💡 <strong className="text-vastu-charcoal">Vastu Wisdom:</strong> Energetic shifts begin within 21 to 45 days of placing consecrated elemental remedies in their appropriate directional zone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
