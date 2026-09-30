import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsProvider';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  onOpenAccount: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({
  cartCount,
  onOpenCart,
  onOpenBooking,
  onOpenAccount,
  onOpenAdmin,
  activeSection,
  onNavigate,
}: NavbarProps) {
  const { copy, settings, navItems, waUrl } = useCms();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isItemActive = (sectionId: string) => {
    const path = location.pathname;
    if ((sectionId === 'hero' || sectionId === '/') && path === '/') return true;
    if ((sectionId === 'consultations' || sectionId === '/consultations') && path === '/consultations') return true;
    if ((sectionId === 'products' || sectionId === 'shop' || sectionId === '/shop') && path === '/shop') return true;
    if ((sectionId === 'elements' || sectionId === 'directions' || sectionId === '/elements') && path === '/elements') return true;
    if ((sectionId === 'about' || sectionId === 'method' || sectionId === '/about') && path === '/about') return true;
    if ((sectionId === 'journal' || sectionId === '/journal') && path === '/journal') return true;
    if ((sectionId === 'scanner' || sectionId === '/scanner') && path === '/scanner') return true;
    return activeSection === sectionId;
  };

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Ultra-Luxury Top Announcement Ribbon */}
      <div className="relative bg-gradient-to-r from-[#0D1B13] via-[#14291D] to-[#0D1B13] text-vastu-ivory py-2 px-4 sm:px-6 text-[11px] font-sans border-b border-[#C5A059]/30 shadow-inner">
        {/* Subtle Gold Shimmer Line at Top */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Vedic Sanskrit Invocation & Philosophy */}
          <div className="flex items-center gap-2.5 truncate">
            <span className="font-serif italic text-vastu-gold text-xs hidden md:inline tracking-wider">
              {copy('nav.sanskrit', 'ॐ वास्तुपुरुषाय नमः')}
            </span>
            <span className="hidden md:inline text-vastu-gold/40">•</span>
            <div className="flex items-center gap-1.5 text-vastu-cream/90 truncate">
              <Sparkles className="w-3 h-3 text-vastu-gold flex-shrink-0 animate-pulse" />
              <span className="truncate tracking-wide">
                {copy('nav.ribbon', 'Vedic Architecture: 100% Non-Demolition Space Alignment for Homes & Workplaces')}
              </span>
            </div>
          </div>

          {/* Right: Live Consultant Status, WhatsApp & Admin */}
          <div className="flex items-center gap-3.5 flex-shrink-0 text-vastu-cream/90">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#1B382B]/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 text-[10px] text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{copy('nav.experts_label', 'Senior Experts Online')}</span>
            </div>

            {/* Direct WhatsApp Callout */}
            <a
              href={waUrl('Hello Zen Vastu, I would like to inquire about a Vastu Consultation.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-vastu-gold transition-colors flex items-center gap-1.5 text-[11px] font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden lg:inline">{settings.phone}</span>
            </a>

            <span className="text-vastu-gold/30">|</span>

            {/* Admin Portal */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[11px] text-vastu-gold/80 hover:text-vastu-gold transition-colors font-medium"
            >
              <ShieldCheck className="w-3 h-3 text-vastu-gold/80" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Header Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#DED7C9]'
            : 'bg-[#FAF7F2] border-b border-[#E8E1D3]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 sm:gap-4">
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 sm:gap-3 group text-left flex-shrink-0"
            >
              <BrandLogo imgClassName="h-9 sm:h-10 xl:h-11 w-auto max-w-[170px] sm:max-w-[210px] group-hover:opacity-90 transition-opacity" />
              <span className="hidden 2xl:block text-[9px] tracking-[0.28em] uppercase font-sans text-vastu-terracotta font-medium leading-tight max-w-[9rem]">
                {settings.brand_tagline}
              </span>
            </button>

            {/* Desktop Navigation Links (Visible on xl screens: 1280px+) */}
            <nav className="hidden xl:flex items-center justify-center gap-3.5 2xl:gap-6 flex-1 mx-2 2xl:mx-4 min-w-0">
              {navItems.map((item) => {
                const active = isItemActive(item.section_id);
                return (
                  <button
                    key={item.section_id}
                    onClick={() => handleNavClick(item.section_id)}
                    className={`text-[12px] 2xl:text-[13px] font-sans tracking-wide whitespace-nowrap transition-all py-1.5 relative group ${
                      active
                        ? 'text-[#1B382B] font-semibold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#C5A059]'
                        : 'text-vastu-muted hover:text-[#1B382B]'
                    }`}
                  >
                    {item.label === '5 Elements & Directions' ? (
                      <>
                        <span className="hidden 2xl:inline">{item.label}</span>
                        <span className="2xl:hidden">5 Elements</span>
                      </>
                    ) : item.label === 'About & Method' ? (
                      <>
                        <span className="hidden 2xl:inline">{item.label}</span>
                        <span className="2xl:hidden">About</span>
                      </>
                    ) : item.label === 'Energy Scanner' ? (
                      <>
                        <span className="hidden 2xl:inline">{item.label}</span>
                        <span className="2xl:hidden">Scanner</span>
                      </>
                    ) : (
                      <span>{item.label}</span>
                    )}
                    {!active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C5A059]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons & Booking CTA */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* User Account */}
              <button
                onClick={onOpenAccount}
                className="hidden sm:flex p-1.5 sm:p-2 text-[#1B382B] hover:text-[#C5A059] transition-colors rounded-full hover:bg-black/5"
                title="Customer Account"
              >
                <User className="w-5 h-5 stroke-[1.75]" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="p-1.5 sm:p-2 text-[#1B382B] hover:text-[#C5A059] transition-colors relative rounded-full hover:bg-black/5"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#B44436] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Book Consultant CTA Button */}
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#1B382B] to-[#12261D] hover:from-[#12261D] hover:to-[#0D1B13] text-white px-3 sm:px-4 2xl:px-5 py-2 sm:py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold shadow-sm hover:shadow transition-all border border-[#C5A059]/40 hover:border-[#C5A059] whitespace-nowrap"
              >
                <span>{copy('nav.book_cta', 'Book Consultant')}</span>
              </button>

              {/* Mobile / Tablet Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded text-[#1B382B] hover:bg-black/5"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF7F2] border-b border-[#DED7C9] px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const active = isItemActive(item.section_id);
                return (
                  <button
                    key={item.section_id}
                    onClick={() => handleNavClick(item.section_id)}
                    className={`text-left text-sm uppercase tracking-wider font-sans py-2.5 px-3 rounded transition-colors ${
                      active
                        ? 'bg-vastu-cream text-vastu-forest font-bold'
                        : 'text-vastu-muted hover:text-vastu-forest'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#DED7C9] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#1B382B] text-white py-3 rounded-sm text-xs uppercase tracking-wider font-semibold shadow-sm text-center border border-[#C5A059]/40"
              >
                Book Consultant
              </button>
              <div className="flex items-center justify-between text-xs text-vastu-muted pt-1">
                <button onClick={onOpenAccount} className="hover:text-vastu-forest">
                  My Account
                </button>
                <button onClick={onOpenAdmin} className="hover:text-vastu-forest">
                  Admin Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
