import { useState } from 'react';
import { useCms } from '../context/CmsProvider';
import { Flame, Droplets, Mountain, Wind, Sparkles, Check, AlertCircle } from 'lucide-react';

export function FiveElements() {
  const { elements, copy } = useCms();
  const [activeElementId, setActiveElementId] = useState<string>('prithvi');

  const activeElement = elements.find((e) => e.id === activeElementId) || elements[0];

  const getElementIcon = (id: string) => {
    switch (id) {
      case 'prithvi':
        return <Mountain className="w-5 h-5" />;
      case 'jal':
        return <Droplets className="w-5 h-5" />;
      case 'agni':
        return <Flame className="w-5 h-5" />;
      case 'vayu':
        return <Wind className="w-5 h-5" />;
      case 'akash':
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="elements" className="py-20 bg-[#FAF7F2] border-b border-vastu-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-vastu-gold" />
            <span>{copy('elements.eyebrow', 'पञ्चमहाभूत • The Five Primal Cosmic Elements')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
            {copy('elements.title', 'The Five Elements of Spatial Balance')}
          </h2>
          <p className="mt-3 text-vastu-muted text-sm sm:text-base font-sans leading-relaxed">
            {copy('elements.subtitle', 'According to Vedic Shastras, every structure is a living organism composed of the five cosmic elements. Harmony is achieved when each element resides in its designated zone.')}
          </p>
        </div>

        {/* 5 Element Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {elements.map((el) => {
            const isActive = el.id === activeElementId;
            return (
              <button
                key={el.id}
                onClick={() => setActiveElementId(el.id)}
                className={`p-4 rounded-sm border transition-all duration-200 flex flex-col items-center justify-center text-center group ${
                  isActive
                    ? 'bg-vastu-forest text-white border-vastu-forest shadow-sm'
                    : 'bg-white hover:bg-vastu-cream/50 text-vastu-charcoal border-vastu-border'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-105 ${
                    isActive ? 'bg-vastu-gold text-vastu-forestDark' : 'bg-vastu-ivoryDark text-vastu-forest'
                  }`}
                  style={{ color: isActive ? undefined : el.colorHex }}
                >
                  {getElementIcon(el.id)}
                </div>
                <span className="font-serif text-base font-semibold tracking-wide">
                  {el.name}
                </span>
                <span className="text-[10px] opacity-75 font-sans truncate">
                  {el.sanskritName.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Element Showcase Card */}
        <div className="bg-white rounded-sm border border-vastu-border shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Element Image */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[420px]">
              <img
                src={activeElement.image}
                alt={activeElement.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vastu-forestDark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-vastu-ivory">
                <span className="text-xs uppercase tracking-widest text-vastu-gold font-sans font-semibold block mb-1">
                  Sacred Zone
                </span>
                <h3 className="font-serif text-2xl font-medium">
                  {activeElement.zone}
                </h3>
              </div>
            </div>

            {/* Element Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-vastu-border pb-4 mb-4">
                  <div>
                    <span className="text-xs font-sans text-vastu-terracotta uppercase tracking-wider font-semibold">
                      {activeElement.sanskritName}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-vastu-forest font-medium">
                      {activeElement.name} Principle
                    </h3>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: activeElement.colorHex }}
                  >
                    {getElementIcon(activeElement.id)}
                  </div>
                </div>

                <p className="text-sm text-vastu-muted font-sans leading-relaxed">
                  {activeElement.description}
                </p>

                {/* Qualities & Imbalance Warning */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-emerald-50/60 p-4 rounded border border-emerald-200/60">
                    <span className="text-[11px] font-serif font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                      When Balanced:
                    </span>
                    <ul className="space-y-1">
                      {activeElement.qualities.map((q, idx) => (
                        <li key={idx} className="text-xs text-emerald-950 font-sans flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-rose-50/60 p-4 rounded border border-rose-200/60">
                    <div className="flex items-center gap-1.5 text-[11px] font-serif font-bold text-rose-800 uppercase tracking-wider mb-2">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Signs of Imbalance:</span>
                    </div>
                    <p className="text-xs text-rose-950 font-sans leading-relaxed">
                      {activeElement.imbalanceSigns}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actionable Balancing Action */}
              <div className="bg-[#FAF7F2] p-4 rounded-sm border border-vastu-border">
                <span className="text-xs font-serif font-bold text-vastu-forest uppercase tracking-wider block mb-1">
                  How to Harmonize:
                </span>
                <p className="text-xs sm:text-sm text-vastu-charcoal font-sans">
                  {activeElement.balancingAction}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
