import { useCms } from '../../context/CmsProvider';
import { iconByName } from '../../lib/icons';

export function InfiniteMarquee() {
  const { marqueeItems } = useCms();

  return (
    <div className="relative overflow-hidden bg-[#122218] border-y border-vastu-gold/30 py-3.5 select-none">
      <div className="pointer-events-none absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#122218] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#122218] to-transparent z-10" />

      <div className="flex w-max animate-marquee gap-8">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => {
          const Icon = iconByName(item.icon);
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.18em] text-[#E8E1D3]/90 font-medium"
            >
              <Icon className="w-3.5 h-3.5 text-vastu-gold flex-shrink-0" />
              <span>{item.text}</span>
              <span className="text-vastu-gold/40 ml-4 font-normal">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
