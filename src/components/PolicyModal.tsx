import { useState } from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Truck, Building2 } from 'lucide-react';

export type PolicyTab = 'governance' | 'terms' | 'privacy' | 'refund' | 'shipping';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export function PolicyModal({ isOpen, onClose, initialTab = 'governance' }: PolicyModalProps) {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-vastu-forestDark/85 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-lg shadow-2xl border border-vastu-gold/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D1B13] via-[#14291D] to-[#0D1B13] text-white p-5 sm:p-6 border-b border-[#C5A059]/30 flex items-start justify-between relative">
          <div>
            <div className="flex items-center gap-2 text-vastu-gold text-xs uppercase tracking-widest font-sans font-semibold mb-1">
              <Building2 className="w-4 h-4 text-vastu-gold" />
              <span>Corporate Governance & Compliance</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-normal">
              SRV RESEARCH & LIFE SCIENCES PVT LTD
            </h3>
            <p className="text-[11px] sm:text-xs text-[#E8E1D3]/80 font-sans mt-0.5">
              Operating Entity & Legal Authority for Zen Vastu
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-vastu-border bg-white overflow-x-auto text-xs font-sans">
          <button
            onClick={() => setActiveTab('governance')}
            className={`px-4 py-3 font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'governance'
                ? 'border-vastu-forest text-vastu-forest bg-[#FAF7F2]'
                : 'border-transparent text-vastu-muted hover:text-vastu-charcoal'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-vastu-gold" />
            <span>Company Governance</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-3 font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'terms'
                ? 'border-vastu-forest text-vastu-forest bg-[#FAF7F2]'
                : 'border-transparent text-vastu-muted hover:text-vastu-charcoal'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-vastu-gold" />
            <span>Terms & Conditions</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-3 font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'privacy'
                ? 'border-vastu-forest text-vastu-forest bg-[#FAF7F2]'
                : 'border-transparent text-vastu-muted hover:text-vastu-charcoal'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-vastu-gold" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`px-4 py-3 font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'refund'
                ? 'border-vastu-forest text-vastu-forest bg-[#FAF7F2]'
                : 'border-transparent text-vastu-muted hover:text-vastu-charcoal'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5 text-vastu-gold" />
            <span>Refund & Cancellation</span>
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-3 font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'shipping'
                ? 'border-vastu-forest text-vastu-forest bg-[#FAF7F2]'
                : 'border-transparent text-vastu-muted hover:text-vastu-charcoal'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-vastu-gold" />
            <span>Shipping & Delivery</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-vastu-charcoal font-sans leading-relaxed flex-1">
          {activeTab === 'governance' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#14291D]/5 border-l-4 border-vastu-gold rounded-r">
                <span className="font-serif font-bold text-base text-vastu-forest block mb-1">
                  Parent Company Declaration & Authority
                </span>
                <p className="text-vastu-charcoal font-medium">
                  <strong>Company Name:</strong> SRV RESEARCH & LIFE SCIENCES PVT LTD
                </p>
                <p className="mt-2 text-vastu-muted">
                  All Terms & Conditions, Privacy Policy, Refund/Cancellation Policy, and other applicable policies of this website shall be governed by and applicable to <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-semibold text-base text-vastu-forest">1. Corporate Entity</h4>
                <p className="text-vastu-muted leading-relaxed">
                  <strong>Zen Vastu</strong> operates as a specialized division/venture under <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>. All professional architectural consultations, remedies, consecrated energetic products, educational courses, and digital transactions conducted through this platform are legally registered and managed under the corporate governance of SRV RESEARCH & LIFE SCIENCES PVT LTD.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-semibold text-base text-vastu-forest">2. Payment & Financial Transactions</h4>
                <p className="text-vastu-muted leading-relaxed">
                  All online payments processed via Cashfree Payment Gateway (Cards, NetBanking, UPI, Wallets) or offline transfers are securely received and accounted for by <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>. Customers will see this business name on their banking records and official tax invoices.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-semibold text-base text-vastu-forest">3. Jurisdiction & Dispute Resolution</h4>
                <p className="text-vastu-muted leading-relaxed">
                  Any legal claims, disputes, or proceedings arising out of the use of this website or services rendered shall be subject to the exclusive jurisdiction of the competent courts having jurisdiction over the registered office of <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="p-3 bg-vastu-forest/5 rounded border border-vastu-border text-xs text-vastu-muted">
                Governed by: <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>
              </div>
              <h4 className="font-serif font-semibold text-base text-vastu-forest">Terms of Service</h4>
              <p className="text-vastu-muted">
                By accessing and using this website, booking consultations, or purchasing consecrated remedies, you agree to be bound by the Terms and Conditions set forth by <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>.
              </p>
              <h5 className="font-semibold text-vastu-forest">Consultation Scope & Advisory Nature</h5>
              <p className="text-vastu-muted">
                Vastu consultations and non-demolition energy alignment remedies provided by Zen Vastu are based on traditional Vedic architectural scriptures and spatial environmental sciences. While every effort is made to provide balanced energy analysis, our recommendations complement but do not substitute licensed structural engineering, legal approvals, or certified medical advice.
              </p>
              <h5 className="font-semibold text-vastu-forest">Intellectual Property</h5>
              <p className="text-vastu-muted">
                All diagrams, 3D energy scanning models, journal articles, sacred geometry layouts, and digital publications are the intellectual property of <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>. Unauthorized duplication or commercial distribution is prohibited.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-3 bg-vastu-forest/5 rounded border border-vastu-border text-xs text-vastu-muted">
                Governed by: <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>
              </div>
              <h4 className="font-serif font-semibold text-base text-vastu-forest">Privacy & Data Protection Policy</h4>
              <p className="text-vastu-muted">
                <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong> values the trust you place in us. We are committed to safeguarding the privacy of your architectural floor plans, personal birth details (for astro-vastu charts), contact coordinates, and payment records.
              </p>
              <h5 className="font-semibold text-vastu-forest">Information Collection</h5>
              <p className="text-vastu-muted">
                We collect your name, phone number, email address, property layout blueprints, and billing address strictly for scheduling consultations, customizing energetic remedy kits, and fulfilling delivery.
              </p>
              <h5 className="font-semibold text-vastu-forest">Secure Payment Gateway</h5>
              <p className="text-vastu-muted">
                We do not store your credit card, debit card, or UPI PINs on our servers. All online transactions are processed through <strong>Cashfree Payments</strong>, using PCI-DSS Level 1 certified 256-bit SSL encryption.
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-4">
              <div className="p-3 bg-vastu-forest/5 rounded border border-vastu-border text-xs text-vastu-muted">
                Governed by: <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>
              </div>
              <h4 className="font-serif font-semibold text-base text-vastu-forest">Refund & Cancellation Policy</h4>
              <h5 className="font-semibold text-vastu-forest">1. Consultation Bookings</h5>
              <p className="text-vastu-muted">
                Consultation appointments may be rescheduled or cancelled up to 24 hours prior to the scheduled session. If cancelled within this timeframe, a full refund will be processed to the original payment source within 5-7 business days by <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>. Once a consultation report or on-site survey has commenced, fees are non-refundable.
              </p>
              <h5 className="font-semibold text-vastu-forest">2. Consecrated Remedies & Sacred Products</h5>
              <p className="text-vastu-muted">
                Due to the consecrated and personalized energetic activation of Brass Helix sets, Pyramids, and Yantras, products cannot be returned after unsealing unless received in a damaged or defective condition during transit. In case of transit damage, notify us within 48 hours of delivery with photographic proof for an immediate replacement or full refund.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <div className="p-3 bg-vastu-forest/5 rounded border border-vastu-border text-xs text-vastu-muted">
                Governed by: <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>
              </div>
              <h4 className="font-serif font-semibold text-base text-vastu-forest">Shipping & Fulfillment Policy</h4>
              <p className="text-vastu-muted">
                All physical orders of consecrated remedies, spatial energetic tools, and brass helix items are carefully cleansed, energised, and dispatched within 2-3 business days through reputable express couriers across India.
              </p>
              <p className="text-vastu-muted">
                Standard delivery time ranges between 4-7 business days depending on delivery pincode. Tracking information is sent via SMS and Email as soon as the parcel is dispatched by <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#FAF7F2] border-t border-vastu-border p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-vastu-muted text-center sm:text-left">
            Entity: <strong>SRV RESEARCH & LIFE SCIENCES PVT LTD</strong> • All Rights Reserved
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#1B382B] hover:bg-[#12261D] text-white px-6 py-2 rounded font-sans font-semibold tracking-wider uppercase transition-colors"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
}
