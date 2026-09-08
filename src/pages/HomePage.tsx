import { Hero } from '../components/Hero';
import { InfiniteMarquee } from '../components/ui/InfiniteMarquee';
import { FiveElements } from '../components/FiveElements';
import { InteractiveVastuScanner } from '../components/ui/InteractiveVastuScanner';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { type Product, type ConsultationService } from '../data/vastuData';
import { useCms } from '../context/CmsProvider';
import { ArrowRight, Sparkles, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card3D } from '../components/ui/Card3D';

interface HomePageProps {
  onOpenBooking: (serviceSlug?: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (route: string) => void;
}

export function HomePage({
  onOpenBooking,
  onSelectProduct,
  onAddToCart,
  onNavigate,
}: HomePageProps) {
  const { products, consultations, copy } = useCms();

  // Curated items for a clean, non-overloaded home page
  const featuredProducts = products.slice(0, 4);
  const featuredConsultations = consultations.slice(0, 3);

  return (
    <div className="animate-fadeIn">
      {/* 1. Hero Section with 3D Category Bar & Three.js Sacred Mandala */}
      <Hero
        onOpenBooking={() => onOpenBooking()}
        onExploreDirections={() => onNavigate('/elements')}
        onExploreProducts={() => onNavigate('/shop')}
      />

      {/* Trust & Vedic Invocations Marquee */}
      <InfiniteMarquee />

      {/* 2. Curated Flagship Consultations Spotlight */}
      <section className="py-20 bg-white border-b border-vastu-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
                <Compass className="w-3.5 h-3.5 text-vastu-gold animate-spin-slow" />
                <span>{copy('consultations.eyebrow', 'वास्तु परामर्श • Architectural Audits')}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
                {copy('consultations.title', 'Consultations for Every Space')}
              </h2>
              <p className="mt-2 text-vastu-muted text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
                {copy('consultations.subtitle', 'Scientific 16-zone energy blueprints and practical 100% non-demolition space alignment for residences, workplaces, and factories.')}
              </p>
            </div>
            <button
              onClick={() => onNavigate('/consultations')}
              className="inline-flex items-center gap-2 text-vastu-forest hover:text-vastu-terracotta font-sans text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-vastu-gold" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredConsultations.map((service) => (
              <Card3D key={service.id} intensity={8} className="h-full">
                <div className="bg-[#FAF7F2] p-6 rounded-sm border border-vastu-border hover:border-vastu-forest/40 transition-all flex flex-col justify-between h-full shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-vastu-cream text-vastu-forest uppercase tracking-wider">
                        {service.format}
                      </span>
                      <span className="text-xs font-sans font-bold text-vastu-forest">
                        ₹{service.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-vastu-forest mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-vastu-muted font-sans line-clamp-3 leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-vastu-border/60">
                      {service.deliverables.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-vastu-charcoal font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onNavigate('/consultations')}
                      className="text-xs text-vastu-forest hover:text-vastu-terracotta font-semibold"
                    >
                      Details →
                    </button>
                    <button
                      onClick={() => onOpenBooking(service.slug)}
                      className="bg-vastu-forest hover:bg-vastu-forestLight text-white px-4 py-2 rounded-sm text-xs uppercase font-bold tracking-wider transition-colors"
                    >
                      Book Audit
                    </button>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The 5 Sacred Elements with Vibrant Vedic Colors */}
      <FiveElements />

      {/* 4. Interactive Real-Time Vastu Energy Compatibility Scanner */}
      <InteractiveVastuScanner onOpenBooking={() => onOpenBooking()} />

      {/* 5. Sacred Remedial Collection Spotlight (Curated 4 Items) */}
      <section className="py-20 bg-white border-b border-vastu-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-vastu-gold" />
                <span>{copy('products.eyebrow', 'पवित्र संग्रह • Sacred Objects')}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
                {copy('products.title', 'Objects for Balanced Living')}
              </h2>
              <p className="mt-2 text-vastu-muted text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
                {copy('products.subtitle', 'Consecrated energetic tools, sacred geometry pyramids, and handcrafted Vedic artifacts designed to harmonize your home and workplace.')}
              </p>
            </div>
            <button
              onClick={() => onNavigate('/shop')}
              className="inline-flex items-center gap-2 text-vastu-forest hover:text-vastu-terracotta font-sans text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              <span>Explore Full Sacred Store</span>
              <ArrowRight className="w-4 h-4 text-vastu-gold" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card3D key={product.id} intensity={8} className="h-full">
                <div className="bg-[#FAF7F2] rounded-sm border border-vastu-border hover:border-vastu-forest/40 transition-all flex flex-col justify-between h-full shadow-sm overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-white/90 text-vastu-forest backdrop-blur-sm shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-lg font-semibold text-vastu-forest hover:text-vastu-terracotta transition-colors cursor-pointer line-clamp-1 mb-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-vastu-muted font-sans line-clamp-2 leading-relaxed mb-3">
                        {product.subtitle || product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-vastu-border/60 flex items-center justify-between">
                      <span className="font-serif font-bold text-lg text-vastu-forest">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-vastu-forest hover:bg-vastu-forestLight text-white px-3.5 py-1.5 rounded-sm text-xs uppercase font-bold tracking-wider transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('/shop')}
              className="inline-flex items-center gap-2 bg-[#1B382B] hover:bg-[#12261D] text-white px-8 py-3.5 rounded-sm text-xs uppercase tracking-wider font-semibold shadow-md transition-all border border-[#C5A059]/40"
            >
              <span>View All Consecrated Products</span>
              <ArrowRight className="w-4 h-4 text-vastu-gold" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. The Non-Demolition Philosophy Showcase (Full-Width Balanced 2-Column Layout) */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#0F1E15] via-[#14261B] to-[#0D1811] text-white relative overflow-hidden border-y border-[#C5A059]/30 shadow-2xl">
        {/* Subtle Top & Bottom Hairline Gold Dividers */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />

        {/* Ambient Glowing Orbs */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-900/25 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Narrative, Core Pillars & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-vastu-gold text-xs uppercase font-semibold tracking-widest px-3 py-1 rounded-full bg-white/5 border border-vastu-gold/30 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-vastu-gold" />
                <span>The Zen Vastu Difference • 100% Non-Demolition</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#FAF7F2] tracking-tight">
                100% Non-Demolition <br className="hidden sm:inline" />
                <span className="italic font-light text-vastu-gold">Space Realignment</span>
              </h2>

              <p className="text-sm sm:text-base text-[#E8E1D3]/90 font-sans leading-relaxed font-light">
                We believe sacred living should never bring disruption, stress, or costly reconstruction. By applying precision energy grid partitioning, Panchamahabhutas balancing, and consecrated geometry, we harmonize your property without breaking a single wall.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="bg-white/5 border border-white/10 hover:border-vastu-gold/40 p-4 rounded-sm transition-colors backdrop-blur-xs">
                  <div className="text-vastu-gold font-serif text-2xl font-bold">0%</div>
                  <div className="text-xs font-semibold text-white mt-1">Structural Damage</div>
                  <div className="text-[11px] text-white/60 mt-0.5 leading-snug">Zero walls broken or doors relocated.</div>
                </div>

                <div className="bg-white/5 border border-white/10 hover:border-vastu-gold/40 p-4 rounded-sm transition-colors backdrop-blur-xs">
                  <div className="text-vastu-gold font-serif text-2xl font-bold">16 Zones</div>
                  <div className="text-xs font-semibold text-white mt-1">CAD Degree Precision</div>
                  <div className="text-[11px] text-white/60 mt-0.5 leading-snug">Satellite-aligned mathematical energy mapping.</div>
                </div>

                <div className="bg-white/5 border border-white/10 hover:border-vastu-gold/40 p-4 rounded-sm transition-colors backdrop-blur-xs">
                  <div className="text-vastu-gold font-serif text-2xl font-bold">100%</div>
                  <div className="text-xs font-semibold text-white mt-1">Elemental Balance</div>
                  <div className="text-[11px] text-white/60 mt-0.5 leading-snug">Vedic pyramids, copper helix & crystal cures.</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('/about')}
                  className="bg-vastu-gold hover:bg-vastu-goldLight text-vastu-forestDark px-7 py-3.5 rounded-sm text-xs uppercase tracking-wider font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Our Methodology & Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenBooking()}
                  className="border border-[#C5A059]/50 hover:border-vastu-gold hover:bg-white/5 text-white px-6 py-3.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all cursor-pointer"
                >
                  Schedule Your Audit
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Science vs Conventional Comparison Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#182C20]/90 border border-vastu-gold/40 rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                {/* Background decorative watermark */}
                <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-vastu-gold font-serif text-9xl select-none">
                  ☸
                </div>

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-vastu-gold font-semibold block">
                        Scientific Comparison
                      </span>
                      <h3 className="font-serif text-xl text-white font-medium">Why Zen Vastu?</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-medium border border-emerald-500/30">
                      Verified Science
                    </span>
                  </div>

                  {/* Comparison Items */}
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded bg-black/25 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-stone-400 uppercase tracking-wider">Traditional Vastu</span>
                        <span className="text-vastu-gold uppercase tracking-wider">Zen Vastu Solution</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="text-rose-300/80 flex items-start gap-1">
                          <span className="text-rose-400 font-bold shrink-0">✕</span>
                          <span>Costly wall & toilet breaking</span>
                        </div>
                        <div className="text-emerald-300 flex items-start gap-1 font-medium">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span>Virtual energy partition strips</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-black/25 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-stone-400 uppercase tracking-wider">Compass Guesswork</span>
                        <span className="text-vastu-gold uppercase tracking-wider">CAD Satellite Grid</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="text-rose-300/80 flex items-start gap-1">
                          <span className="text-rose-400 font-bold shrink-0">✕</span>
                          <span>Rough 8-directional estimate</span>
                        </div>
                        <div className="text-emerald-300 flex items-start gap-1 font-medium">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span>Exact 16-zone degree mapping</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-black/25 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-stone-400 uppercase tracking-wider">Fear & Superstition</span>
                        <span className="text-vastu-gold uppercase tracking-wider">Vedic Elemental Cures</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="text-rose-300/80 flex items-start gap-1">
                          <span className="text-rose-400 font-bold shrink-0">✕</span>
                          <span>Disruptive, stressful dogmas</span>
                        </div>
                        <div className="text-emerald-300 flex items-start gap-1 font-medium">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span>Panchamahabhuta resonance</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Footer */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#E8E1D3]/80 border-t border-white/10">
                    <div className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>5,000+ Harmonized Spaces</span>
                    </div>
                    <span className="text-vastu-gold font-serif">15+ Years Practice</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Real Client Testimonials */}
      <TestimonialsSection />
    </div>
  );
}
