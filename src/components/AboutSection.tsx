import { Sparkles, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsProvider';
import { iconByName } from '../lib/icons';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export function AboutSection({ onOpenBooking }: AboutSectionProps) {
  const { copy, aboutValues } = useCms();
  const coreValues = aboutValues.map((val) => ({
    icon: iconByName(val.icon),
    title: val.title || '',
    desc: val.description || '',
  }));

  return (
    <section id="about" className="py-20 bg-[#FAF7F2] border-b border-vastu-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image & Sacred Badge */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden border border-vastu-border shadow-sm bg-vastu-cream relative">
              <img
                src={copy('about.image', 'https://images.pexels.com/photos/31564207/pexels-photo-31564207.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900')}
                alt="Zen Vastu Sacred Courtyard and Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14231A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-sans font-bold text-vastu-gold uppercase tracking-widest block mb-1">
                  {copy('about.image_caption', 'Sacred Living')}
                </span>
                <p className="font-serif italic text-lg sm:text-xl">
                  “{copy('about.image_quote', 'Space is more than physical walls — it is a living field of energy and consciousness.')}”
                </p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-vastu-forest text-white p-5 rounded-sm border border-vastu-gold/40 shadow-lg hidden sm:block">
              <span className="font-serif text-3xl font-bold text-vastu-gold block leading-none">
                {copy('about.years', '15+')}
              </span>
              <span className="text-[11px] uppercase tracking-wider font-sans text-vastu-cream/90 block mt-1">
                {copy('about.years_label', 'Years of Vedic Architecture Practice')}
              </span>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-vastu-gold" />
                <span>{copy('about.eyebrow', 'हमारी दृष्टि • The Vision Behind Zen Vastu')}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
                {copy('about.title', 'Ancient Vedic Wisdom for Contemporary Living')}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-vastu-muted font-sans leading-relaxed">
              {copy('about.body_1', 'At Zen Vastu, we believe that true well-being begins with the atmosphere of the spaces we inhabit. Rooted in traditional Vastu Shastra, sacred geometry, and modern architectural science, our practice offers thoughtful, practical guidance for homes, workplaces, and industrial enterprises.')}
            </p>

            <p className="text-xs sm:text-sm text-vastu-charcoal font-sans leading-relaxed">
              {copy('about.body_2', 'We reject destructive, fear-based demolition. Instead, we use non-invasive remedial interventions — balancing the five elements (Panchamahabhutas), activating directional vortices with consecrated objects, and aligning energy flows to support your life goals.')}
            </p>

            {/* 4 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded border border-vastu-border hover:border-vastu-forest/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-vastu-forest font-serif font-semibold text-base mb-1">
                      <Icon className="w-4 h-4 text-vastu-gold flex-shrink-0" />
                      <span>{val.title}</span>
                    </div>
                    <p className="text-[11px] text-vastu-muted font-sans leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#2D4536] hover:bg-[#1E3326] text-white px-6 py-3 rounded-sm text-xs font-sans font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
              >
                <span>{copy('about.cta', 'Consult Our Senior Experts')}</span>
                <ArrowRight className="w-4 h-4 text-vastu-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
