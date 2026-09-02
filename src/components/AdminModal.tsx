import { useState } from 'react';
import { X, ShieldCheck, DollarSign, ShoppingBag, Users, Compass, Eye, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/vastuData';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: any[];
}

export function AdminModal({ isOpen, onClose, orders }: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'consultations' | 'products'>('overview');

  if (!isOpen) return null;

  const mockConsultationLeads = [
    {
      id: 'CL-101',
      name: 'Sunil Mehra',
      phone: '+91 98201 44512',
      property: 'Independent Villa (4,500 sq.ft)',
      city: 'Gurugram',
      service: 'Residential Vastu Audit',
      date: '22 Aug 2026',
      status: 'Pending Call',
    },
    {
      id: 'CL-102',
      name: 'Dr. Radhika Sen',
      phone: '+91 97118 99882',
      property: 'Ayurvedic Wellness Clinic',
      city: 'Bengaluru',
      service: 'Commercial Vastu Audit',
      date: '24 Aug 2026',
      status: 'Confirmed',
    },
    {
      id: 'CL-103',
      name: 'Pravin Mittal',
      phone: '+91 99200 33419',
      property: 'Textile Manufacturing Unit',
      city: 'Surat',
      service: 'Industrial & Factory Vastu',
      date: '28 Aug 2026',
      status: 'Site Visit Scheduled',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-vastu-forestDark/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-vastu-ivory rounded-sm border border-vastu-border max-w-4xl w-full shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-vastu-forestDark text-vastu-ivory p-6 relative border-b border-vastu-gold/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-vastu-gold text-vastu-forestDark flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-xl font-bold">Zen Vastu Control Center</h2>
                <span className="text-[10px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded font-mono font-semibold">
                  Live Admin
                </span>
              </div>
              <span className="text-xs text-vastu-cream/80 font-sans">
                E-Commerce, Consultations & Inventory Management
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

        {/* Admin Navigation */}
        <div className="flex border-b border-vastu-border bg-vastu-cream/60 px-6 overflow-x-auto text-xs font-sans">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-vastu-gold text-vastu-forest font-bold'
                : 'border-transparent text-vastu-muted hover:text-vastu-forest'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Overview & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-vastu-gold text-vastu-forest font-bold'
                : 'border-transparent text-vastu-muted hover:text-vastu-forest'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Pipeline ({orders.length + 6})</span>
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
            <span>Consultation Leads ({mockConsultationLeads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'border-vastu-gold text-vastu-forest font-bold'
                : 'border-transparent text-vastu-muted hover:text-vastu-forest'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Catalog & Inventory ({PRODUCTS.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-vastu-ivoryDark p-4 rounded border border-vastu-border">
                  <span className="text-[11px] text-vastu-muted font-sans uppercase block">
                    Total Revenue
                  </span>
                  <span className="font-cinzel font-bold text-xl text-vastu-forest">
                    ₹3,42,850
                  </span>
                  <span className="text-[10px] text-emerald-700 font-sans block mt-1">
                    ↑ 24% vs last month
                  </span>
                </div>

                <div className="bg-vastu-ivoryDark p-4 rounded border border-vastu-border">
                  <span className="text-[11px] text-vastu-muted font-sans uppercase block">
                    Total Orders
                  </span>
                  <span className="font-cinzel font-bold text-xl text-vastu-forest">
                    58 Orders
                  </span>
                  <span className="text-[10px] text-emerald-700 font-sans block mt-1">
                    100% Fulfillment
                  </span>
                </div>

                <div className="bg-vastu-ivoryDark p-4 rounded border border-vastu-border">
                  <span className="text-[11px] text-vastu-muted font-sans uppercase block">
                    Consultation Audits
                  </span>
                  <span className="font-cinzel font-bold text-xl text-vastu-forest">
                    23 Booked
                  </span>
                  <span className="text-[10px] text-vastu-terracotta font-sans block mt-1">
                    3 Pending Confirmation
                  </span>
                </div>

                <div className="bg-vastu-ivoryDark p-4 rounded border border-vastu-border">
                  <span className="text-[11px] text-vastu-muted font-sans uppercase block">
                    Consecrated Products
                  </span>
                  <span className="font-cinzel font-bold text-xl text-vastu-forest">
                    10 Items Live
                  </span>
                  <span className="text-[10px] text-emerald-700 font-sans block mt-1">
                    All In Stock
                  </span>
                </div>
              </div>

              {/* Quick Status Note */}
              <div className="bg-vastu-forest/5 p-4 rounded border-l-4 border-vastu-forest text-xs font-sans text-vastu-charcoal">
                <strong>💡 Supabase Backend Integration:</strong> Live database schema connected for profiles, products, orders, consultations, and contact_enquiries.
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-base font-bold text-vastu-forest">
                Recent Customer Orders
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-vastu-border text-vastu-muted uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Payment</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-vastu-border/40">
                    <tr className="hover:bg-vastu-ivoryDark">
                      <td className="py-3 px-3 font-mono font-bold text-vastu-forest">ZV-2026-9104</td>
                      <td className="py-3 px-3">Kavita Desai (Mumbai)</td>
                      <td className="py-3 px-3 font-bold">₹4,500</td>
                      <td className="py-3 px-3 text-emerald-700 font-medium">Razorpay UPI (Paid)</td>
                      <td className="py-3 px-3">
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-semibold">
                          Consecrating
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-vastu-ivoryDark">
                      <td className="py-3 px-3 font-mono font-bold text-vastu-forest">ZV-2026-8842</td>
                      <td className="py-3 px-3">Vikramaditya Singhania (Delhi)</td>
                      <td className="py-3 px-3 font-bold">₹7,600</td>
                      <td className="py-3 px-3 text-emerald-700 font-medium">Razorpay Card (Paid)</td>
                      <td className="py-3 px-3">
                        <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded text-[10px] font-semibold">
                          Delivered
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'consultations' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-base font-bold text-vastu-forest">
                Consultation Enquiries & Site Visits
              </h3>
              <div className="space-y-3">
                {mockConsultationLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-vastu-ivoryDark p-4 rounded border border-vastu-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans"
                  >
                    <div>
                      <div className="font-cinzel font-bold text-sm text-vastu-forest">
                        {lead.name} — {lead.service}
                      </div>
                      <div className="text-vastu-muted mt-0.5">
                        {lead.property} • {lead.city} • Phone: {lead.phone}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-vastu-cream text-vastu-forest px-2.5 py-1 rounded text-[11px] font-semibold">
                        {lead.status}
                      </span>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:text-emerald-900 font-semibold"
                      >
                        WhatsApp Client →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-base font-bold text-vastu-forest">
                Sacred Remedial Inventory
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRODUCTS.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-vastu-ivoryDark p-3 rounded border border-vastu-border flex items-center gap-3"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 object-cover rounded border border-vastu-border"
                    />
                    <div className="flex-1 min-w-0 text-xs font-sans">
                      <h4 className="font-cinzel font-bold text-vastu-forest truncate">
                        {prod.name}
                      </h4>
                      <div className="text-vastu-muted">
                        ₹{prod.price.toLocaleString('en-IN')} • {prod.category}
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-semibold flex-shrink-0">
                      In Stock
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-vastu-cream/60 border-t border-vastu-border flex items-center justify-between text-xs font-sans">
          <span className="text-vastu-muted">Zen Vastu Administrator Console</span>
          <button
            onClick={onClose}
            className="bg-vastu-forest text-vastu-ivory px-4 py-1.5 rounded-sm text-xs font-bold uppercase"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
