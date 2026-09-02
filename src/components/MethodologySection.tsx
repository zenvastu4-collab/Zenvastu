import { Sparkles, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsProvider';

interface MethodologySectionProps {
  onOpenBooking: () => void;
}

export function MethodologySection({ onOpenBooking }: MethodologySectionProps) {
  const { methodologySteps, comparisons, copy } = useCms();
  const comparison = comparisons.length ? comparisons.map((row) => ({
    feature: row.feature,
    traditional: row.traditional,
    zenVastu: row.zen_vastu,
  })) : [
    {
      feature: 'Structural Alterations',
      traditional: 'Often requires breaking walls, shifting toilets or relocating kitchens',
      zenVastu: '100% Zero demolition; uses energy virtual partitioning & metallic strips',
    },
    {
      feature: 'Scientific Grid Mapping',
      traditional: 'Basic 8-direction estimation with handheld compass',
      zenVastu: 'Exact 16-zone mathematical grid aligned with satellite degrees & CAD',
    },
    {
      feature: 'Remedial Approach',
      traditional: 'Fear-based dogmas and costly physical reconstruction',
      zenVastu: 'Elemental balancing using Panchamahabhuta, crystal pyramids & sound',
    },
    {
      feature: 'Post-Consultation Support',
      traditional: 'Single visit with no follow-up measurement',
      zenVastu: 'Structured 45-day follow-up to track energetic and financial shifts',
    },
  ];

  return (
    <section id="method" className="py-20 bg-[#FAF7F2] border-b border-vastu-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-vastu-gold" />
            <span>{copy('method.eyebrow', 'कार्यप्रणाली • The Zen Vastu Methodology')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
            {copy('method.title', 'A Clear, Scientific Process')}
          </h2>
          <p className="mt-3 text-vastu-muted text-sm sm:text-base font-sans leading-relaxed">
            {copy('method.subtitle', 'Our 4-stage systematic methodology bridges ancient Vedic Shastras with contemporary architectural precision to deliver measurable peace and prosperity.')}
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {methodologySteps.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white p-6 rounded-sm border border-vastu-border hover:border-vastu-forest/40 transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-serif text-3xl font-bold"
                    style={{ color: step.colorHex }}
                  >
                    {step.step}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-sans font-semibold px-2 py-0.5 rounded bg-vastu-cream text-vastu-muted">
                    Phase {idx + 1}
                  </span>
                </div>

                <div className="text-[11px] font-sans font-semibold text-vastu-terracotta mb-1">
                  {step.sanskritTag}
                </div>
                <h3 className="font-serif text-xl font-semibold text-vastu-forest mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-vastu-muted font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-vastu-border/40 flex items-center gap-1.5 text-[11px] text-vastu-forest font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-vastu-gold" />
                <span>Zero Demolition</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-[#183125] text-vastu-ivory rounded-sm p-6 sm:p-8 lg:p-10 border border-vastu-gold/30 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-vastu-gold font-sans font-semibold block mb-1">
              Why Zen Vastu?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              The Non-Demolition Difference
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b border-vastu-gold/30 text-vastu-gold font-sans font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Consultation Parameter</th>
                  <th className="py-3 px-4 text-rose-300">Conventional Vastu</th>
                  <th className="py-3 px-4 text-emerald-300">The Zen Vastu Way</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white font-serif text-base">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-[#E8E1D3]/80">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-white font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{row.zenVastu}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-[#E8E1D3]/80 max-w-xl font-sans">
              Ready to experience harmonious living without structural demolition? Let our senior consultant audit your floor plan.
            </p>
            <button
              onClick={onOpenBooking}
              className="bg-vastu-gold hover:bg-vastu-goldLight text-vastu-forestDark px-6 py-2.5 rounded-sm text-xs font-sans font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 flex-shrink-0"
            >
              <span>Schedule Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
