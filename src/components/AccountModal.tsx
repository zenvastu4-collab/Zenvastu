import { useState } from 'react';
import { X, User, ShoppingBag, Compass, MapPin, CheckCircle2, Clock, LogOut } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userOrders: any[];
}

export function AccountModal({ isOpen, onClose, userOrders }: AccountModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'consultations' | 'addresses'>('orders');

  if (!isOpen) return null;

  const allOrders = userOrders.map((o) => ({
    orderId: o.orderId,
    date: o.date,
    productName: o.items.map((i: any) => i.product.name).join(', '),
    amount: o.total,
    status: o.status,
    image: o.items[0]?.product.image || '/vastu/IMG-20260818-WA0017.jpg',
  }));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-vastu-forestDark/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-vastu-ivory rounded-sm border border-vastu-border max-w-3xl w-full shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-vastu-forest text-vastu-ivory p-6 relative border-b border-vastu-gold/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-vastu-gold text-vastu-forestDark flex items-center justify-center font-bold text-lg font-cinzel">
              AS
            </div>
            <div>
              <h2 className="font-cinzel text-xl font-bold">Ananya Sharma</h2>
              <span className="text-xs text-vastu-cream/80 font-sans">
                ananya.sharma@example.com • Member since 2026
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-vastu-ivory/80 hover:text-white hover:bg-vastu-forestLight transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-vastu-border bg-vastu-cream/40 px-6 overflow-x-auto text-xs font-sans">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-vastu-gold text-vastu-forest font-bold'
                : 'border-transparent text-vastu-muted hover:text-vastu-forest'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders ({allOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`py-3 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'consultations'
                ? 'border-vastu-gold text-vastu-forest font-bold'
                : 'border-transparent text-vastu-muted hover:text-vastu-forest'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Consultation Blueprints (1)</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'addresses'
                ? 'border-vastu-gold text-vastu-forest font-bold'
                : 'border-transparent text-vastu-muted hover:text-vastu-forest'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-vastu-gold text-vastu-forest font-bold'
                : 'border-transparent text-vastu-muted hover:text-vastu-forest'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Vastu Energy Profile</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-base font-bold text-vastu-forest">
                Order History & Shipments
              </h3>
              <div className="space-y-3">
                {allOrders.length === 0 && (
                  <p className="text-sm text-vastu-muted font-sans">
                    No orders yet. Sacred objects you check out on this device will appear here.
                  </p>
                )}
                {allOrders.map((ord, idx) => (
                  <div
                    key={idx}
                    className="bg-vastu-ivoryDark p-4 rounded border border-vastu-border flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={ord.image}
                        alt={ord.productName}
                        className="w-12 h-12 object-cover rounded border border-vastu-border flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-cinzel text-xs font-bold text-vastu-forest truncate">
                          {ord.productName}
                        </div>
                        <div className="text-[11px] text-vastu-muted font-sans">
                          {ord.orderId} • Ordered on {ord.date}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="font-sans font-bold text-xs text-vastu-forest">
                        ₹{ord.amount.toLocaleString('en-IN')}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-medium mt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{ord.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'consultations' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-base font-bold text-vastu-forest">
                Your Property Audits & Blueprints
              </h3>
              <div className="bg-vastu-ivoryDark p-5 rounded border border-vastu-border space-y-3">
                <div className="flex items-center justify-between border-b border-vastu-border pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-cinzel text-vastu-terracotta font-bold">
                      Online Video & CAD Audit
                    </span>
                    <h4 className="font-cinzel text-sm font-bold text-vastu-forest">
                      Residential Home Vastu — Flat 402, South Delhi
                    </h4>
                  </div>
                  <span className="text-xs font-bold font-sans text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                    Audit Completed
                  </span>
                </div>
                <p className="text-xs text-vastu-muted font-sans leading-relaxed">
                  16-Zone Energy Grid Blueprint delivered. Recommended remedial placements: Crystal Pyramid in North-East mandir, Sacred Cash Box in South-West master bedroom.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-vastu-muted font-sans">Consultant: Rohit / Zen Vastu Senior Panel</span>
                  <a
                    href="https://wa.me/919711855879?text=Hello%20Zen%20Vastu%2C%20I%20would%20like%20to%20follow%20up%20on%20my%20Residential%20Audit."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vastu-terracotta hover:text-vastu-forest font-semibold"
                  >
                    Schedule 45-Day Follow-Up →
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-base font-bold text-vastu-forest">
                Saved Delivery Addresses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-vastu-ivoryDark p-4 rounded border border-vastu-gold/40 relative">
                  <span className="text-[10px] bg-vastu-forest text-vastu-gold px-2 py-0.5 rounded uppercase font-bold absolute top-3 right-3">
                    Default
                  </span>
                  <h4 className="font-cinzel text-xs font-bold text-vastu-forest mb-1">
                    Home Sanctuary
                  </h4>
                  <p className="text-xs text-vastu-charcoal font-sans leading-relaxed">
                    B-402, Lotus Grand Residences, Palm Beach Road, Mumbai, Maharashtra - 400706
                  </p>
                  <p className="text-[11px] text-vastu-muted font-sans mt-2">
                    Phone: +91 98765 43210
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-base font-bold text-vastu-forest">
                Personal Vastu & Energy Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="bg-vastu-ivoryDark p-4 rounded border border-vastu-border">
                  <span className="text-vastu-muted block mb-1">Dominant Element:</span>
                  <span className="font-cinzel font-bold text-sm text-vastu-forest">
                    Prithvi (Earth) • Stability & Grounding
                  </span>
                </div>
                <div className="bg-vastu-ivoryDark p-4 rounded border border-vastu-border">
                  <span className="text-vastu-muted block mb-1">Auspicious Entrance Direction:</span>
                  <span className="font-cinzel font-bold text-sm text-vastu-forest">
                    North-East (Ishanya) / North (Kuber)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-vastu-cream/60 border-t border-vastu-border flex items-center justify-between text-xs">
          <span className="text-vastu-muted font-sans">Zen Vastu Sanctuary Account</span>
          <button
            onClick={onClose}
            className="text-rose-800 hover:text-rose-900 font-semibold flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
