import { Mail, Phone, MapPin, MessageCircle, Sparkles, ArrowRight, Building2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useCms } from '../context/CmsProvider';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenPolicy?: (tab: 'governance' | 'terms' | 'privacy' | 'refund' | 'shipping') => void;
}

export function Footer({ onNavigate, onOpenBooking, onOpenPolicy }: FooterProps) {
  const { copy, settings, footerLinks, waUrl } = useCms();
  const explore = footerLinks.filter((l) => l.group_name === 'Explore');
  const consults = footerLinks.filter((l) => l.group_name === 'Consultations');

  return (
    <footer className="bg-[#122218] text-vastu-ivory border-t border-vastu-gold/30">
      <div className="border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8 bg-[#183125]/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-vastu-gold text-xs font-sans font-semibold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>{copy('footer.blessing_label', 'Vedic Blessing')}</span>
            </div>
            <p className="font-serif italic text-lg sm:text-xl text-[#FAF7F2]">
              {copy('footer.blessing', '“सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः • May All Beings Inhabit Peaceful & Harmonious Spaces.”')}
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="bg-vastu-gold hover:bg-vastu-goldLight text-vastu-forestDark px-6 py-3 rounded-sm text-xs font-sans font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 flex-shrink-0"
          >
            <span>{copy('footer.cta', 'Begin Your Space Harmony')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <BrandLogo variant="dark" imgClassName="h-11 w-auto max-w-[240px]" />
              <span className="block text-[9px] tracking-[0.25em] uppercase font-sans text-vastu-gold font-medium">
                {settings.brand_tagline}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#E8E1D3]/80 font-sans leading-relaxed max-w-sm font-light">
              {copy('footer.about', 'Thoughtful Vastu consultations, 16-zone energy blueprints, and authentic consecrated remedial artifacts for residences, executive workplaces, and industrial plants worldwide.')}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-vastu-gold hover:text-vastu-forestDark text-white flex items-center justify-center transition-all border border-white/10"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-vastu-gold hover:text-vastu-forestDark text-white flex items-center justify-center transition-all border border-white/10"
                title="Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-vastu-gold hover:text-vastu-forestDark text-white flex items-center justify-center transition-all border border-white/10"
                title="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-base text-vastu-gold">
              {copy('footer.explore_title', 'Explore')}
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#E8E1D3]/80">
              {explore.map((link) => (
                <li key={link.label}>
                  <button onClick={() => onNavigate(link.section_id || 'hero')} className="hover:text-vastu-gold transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-base text-vastu-gold">
              {copy('footer.consult_title', 'Consultations')}
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#E8E1D3]/80">
              {consults.map((link) => (
                <li key={link.label}>
                  <button onClick={() => onNavigate(link.section_id || 'consultations')} className="hover:text-vastu-gold transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-base text-vastu-gold">
              {copy('footer.reach_title', 'Reach Us')}
            </h4>
            <div className="space-y-2.5 text-xs font-sans text-[#E8E1D3]/80">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:text-vastu-gold transition-colors">
                <Phone className="w-3.5 h-3.5 text-vastu-gold flex-shrink-0" />
                <span>{settings.phone}</span>
              </a>
              {settings.phone_secondary && (
                <a href={`tel:${settings.phone_secondary}`} className="flex items-center gap-2 hover:text-vastu-gold transition-colors">
                  <Phone className="w-3.5 h-3.5 text-vastu-gold flex-shrink-0" />
                  <span>{settings.phone_secondary}</span>
                </a>
              )}
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-vastu-gold transition-colors">
                <Mail className="w-3.5 h-3.5 text-vastu-gold flex-shrink-0" />
                <span>{settings.email}</span>
              </a>
              <div className="flex items-center gap-2 text-[#E8E1D3]/70 pt-1">
                <MapPin className="w-3.5 h-3.5 text-vastu-gold flex-shrink-0" />
                <span>{settings.locations}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Governance & Legal Compliance Notice */}
        <div className="mt-10 p-4 sm:p-5 rounded-sm bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] border border-[#C5A059]/30 text-xs text-[#E8E1D3]/85 font-sans">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-4xl">
              <div className="flex items-center gap-2 text-vastu-gold text-[11px] uppercase tracking-wider font-semibold">
                <Building2 className="w-3.5 h-3.5 text-vastu-gold flex-shrink-0" />
                <span>Legal & Corporate Governance Declaration</span>
              </div>
              <p className="text-[12.5px] leading-relaxed text-[#FAF7F2] font-medium">
                <strong>Company Name:</strong> <span className="text-vastu-gold">SRV RESEARCH & LIFE SCIENCES PVT LTD</span>
              </p>
              <p className="text-[11.5px] leading-relaxed text-[#E8E1D3]/80">
                All Terms & Conditions, Privacy Policy, Refund/Cancellation Policy, and other applicable policies of this website shall be governed by and applicable to <strong className="text-[#FAF7F2] font-semibold">SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 pt-3 lg:pt-0 lg:pl-5">
              <button
                type="button"
                onClick={() => onOpenPolicy?.('terms')}
                className="text-vastu-gold hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Terms & Conditions
              </button>
              <span className="text-white/30">•</span>
              <button
                type="button"
                onClick={() => onOpenPolicy?.('privacy')}
                className="text-vastu-gold hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </button>
              <span className="text-white/30">•</span>
              <button
                type="button"
                onClick={() => onOpenPolicy?.('refund')}
                className="text-vastu-gold hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Refund Policy
              </button>
              <span className="text-white/30">•</span>
              <button
                type="button"
                onClick={() => onOpenPolicy?.('governance')}
                className="text-vastu-gold hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Company Details
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E8E1D3]/60 font-sans">
          <div className="flex items-center gap-2">
            <span>Elemental Harmony:</span>
            <div className="flex gap-1.5">
              <span className="w-4 h-1.5 rounded-full bg-[#8B5E3C]" title="Prithvi (Earth)" />
              <span className="w-4 h-1.5 rounded-full bg-[#34657F]" title="Jal (Water)" />
              <span className="w-4 h-1.5 rounded-full bg-[#B44436]" title="Agni (Fire)" />
              <span className="w-4 h-1.5 rounded-full bg-[#52795D]" title="Vayu (Air)" />
              <span className="w-4 h-1.5 rounded-full bg-[#C5A059]" title="Akash (Space)" />
            </div>
          </div>
          <div className="text-center sm:text-right space-y-0.5">
            <div>
              © {new Date().getFullYear()} {copy('footer.copyright', 'Zen Vastu. All Rights Reserved. Sacred Architecture & Living.')}
            </div>
            <div className="text-[10px] text-[#C5A059]/60 tracking-wider uppercase font-sans">
              A Venture of SRV Research & Life Sciences Pvt Ltd
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
