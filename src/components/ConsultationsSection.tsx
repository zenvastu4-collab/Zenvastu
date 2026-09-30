import { useState } from 'react';
import { type ConsultationService } from '../data/vastuData';
import { Compass, CheckCircle2, Clock, Globe, ArrowRight, Sparkles, Building2, Home, Factory } from 'lucide-react';
import { useCms } from '../context/CmsProvider';

interface ConsultationsSectionProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export function ConsultationsSection({ onOpenBooking }: ConsultationsSectionProps) {
  const { consultations, copy } = useCms();
  const [selectedService, setSelectedService] = useState<ConsultationService>(consultations[0]);

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'home-vastu':
        return <Home className="w-5 h-5 text-vastu-forest" />;
      case 'office-corporate-vastu':
        return <Building2 className="w-5 h-5 text-vastu-forest" />;
      case 'factory-industrial-vastu':
        return <Factory className="w-5 h-5 text-vastu-forest" />;
      case 'online-vastu-consultation':
      default:
        return <Globe className="w-5 h-5 text-vastu-forest" />;
    }
  };

  return (
    <section id="consultations" className="py-20 bg-[#FAF7F2] border-b border-vastu-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-vastu-gold animate-spin-slow" />
            <span>{copy('consultations.eyebrow', 'वास्तु परामर्श • Professional Consultation Services')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
            {copy('consultations.title', 'Consultations for Every Space')}
          </h2>
          <p className="mt-3 text-vastu-muted text-sm sm:text-base font-sans leading-relaxed">
            {copy('consultations.subtitle', 'From residential floor plans to multi-acre manufacturing plants, our work combines classical Vedic principles with contemporary architectural blueprints. 100% Non-Demolition.')}
          </p>
        </div>

        {/* Consultation Service Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {consultations.map((service) => {
            const isSelected = service.id === selectedService.id;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`p-6 rounded-sm border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-vastu-forest text-white border-vastu-forest shadow-md'
                    : 'bg-white hover:bg-vastu-cream/50 text-vastu-charcoal border-vastu-border'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-white/15 text-white' : 'bg-vastu-cream/60'
                      }`}
                    >
                      {getServiceIcon(service.slug)}
                    </div>
                    <span
                      className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isSelected ? 'bg-vastu-gold text-vastu-forestDark' : 'bg-vastu-cream text-vastu-muted'
                      }`}
                    >
                      {service.format}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p
                    className={`text-xs font-sans leading-relaxed line-clamp-2 ${
                      isSelected ? 'text-[#E8E1D3]' : 'text-vastu-muted'
                    }`}
                  >
                    {service.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-current/20 flex items-center justify-between">
                  <span className="font-sans font-bold text-sm">
                    ₹{service.price.toLocaleString('en-IN')}
                  </span>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 ${
                      isSelected ? 'text-vastu-gold' : 'text-vastu-terracotta'
                    }`}
                  >
                    <span>Select</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Service Detailed Feature Box */}
        <div className="bg-white rounded-sm border border-vastu-border shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image Preview */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[460px]">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14231A]/90 via-[#14231A]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs uppercase tracking-widest text-vastu-gold font-sans font-semibold">
                  {selectedService.format}
                </span>
                <h3 className="font-serif text-2xl font-medium">
                  {selectedService.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[#E8E1D3] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-vastu-gold" />
                    <span>{selectedService.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-vastu-gold" />
                    <span>100% Non-Demolition</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details & Deliverables */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-vastu-border pb-4 mb-4">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-vastu-forest font-medium">
                      {selectedService.title}
                    </h3>
                    <p className="text-xs text-vastu-muted font-sans mt-0.5">
                      {selectedService.tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-sans font-bold text-2xl text-vastu-forest block">
                      ₹{selectedService.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-vastu-muted uppercase tracking-wider font-sans">
                      Standard Package
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-vastu-charcoal font-sans leading-relaxed mb-6">
                  {selectedService.fullDesc}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-3">
                  <span className="text-xs font-serif font-bold text-vastu-forest uppercase tracking-wider block">
                    What You Will Receive (Deliverables):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 bg-[#FAF7F2] p-2.5 rounded border border-vastu-borderLight text-xs text-vastu-charcoal font-sans"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-vastu-border flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-vastu-muted font-sans">
                  <span>Suitable for: </span>
                  <strong className="text-vastu-charcoal">
                    {selectedService.suitableFor.join(' • ')}
                  </strong>
                </div>

                <button
                  onClick={() => onOpenBooking(selectedService.slug)}
                  className="bg-[#2D4536] hover:bg-[#1E3326] text-white px-6 py-3 rounded-sm text-xs font-sans font-semibold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-vastu-gold" />
                  <span>Book Consultant</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
