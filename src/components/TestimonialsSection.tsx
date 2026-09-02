import { Star, Quote, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsProvider';

export function TestimonialsSection() {
  const { testimonials, copy } = useCms();
  return (
    <section className="py-20 bg-[#FAF7F2] border-b border-vastu-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-vastu-gold" />
            <span>{copy('testimonials.eyebrow', 'अनुभव • Real Client Transformations')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
            {copy('testimonials.title', 'Spaces That Feel Truly Right')}
          </h2>
          <p className="mt-3 text-vastu-muted text-sm sm:text-base font-sans leading-relaxed">
            {copy('testimonials.subtitle', 'Read how thoughtful directional planning and non-demolition remedies brought peace, financial clarity, and growth to homes and businesses across India and abroad.')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-sm border border-vastu-border hover:border-vastu-forest/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-600">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-vastu-gold/40 group-hover:text-vastu-gold transition-colors" />
                </div>

                <p className="text-sm text-vastu-charcoal font-serif leading-relaxed italic text-base">
                  “{t.comment}”
                </p>
              </div>

              <div className="pt-4 border-t border-vastu-border/60">
                <h4 className="font-serif font-semibold text-base text-vastu-forest">
                  {t.name}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-vastu-muted font-sans mt-0.5">
                  <MapPin className="w-3 h-3 text-vastu-terracotta" />
                  <span>{t.city}</span>
                  <span>•</span>
                  <span>{t.propertyType}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-sans font-medium mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified {t.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
