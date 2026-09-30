import { useState, type FormEvent } from 'react';
import { X, Check, Compass, Calendar, Clock, MessageCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCms } from '../context/CmsProvider';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceSlug?: string;
}

export function BookingModal({ isOpen, onClose, initialServiceSlug }: BookingModalProps) {
  const { consultations, timeSlots, propertyTypes, waUrl } = useCms();
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(
    initialServiceSlug || consultations[0]?.slug || 'home-vastu'
  );
  const [propertyType, setPropertyType] = useState<string>(propertyTypes[0] || 'Apartment / Flat');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0] || '11:00 AM - 12:30 PM');
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentServiceObj =
    consultations.find((c) => c.slug === selectedService) || consultations[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (supabase) {
      const { error } = await supabase.from('bookings').insert({
        service_slug: currentServiceObj?.slug || selectedService,
        service_title: currentServiceObj?.title || '',
        property_type: propertyType,
        preferred_date: selectedDate || null,
        preferred_time: selectedTime,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        notes: formData.notes,
        status: 'pending',
      });
      if (error) {
        setSubmitError(error.message);
        return;
      }
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  const slots = timeSlots.length ? timeSlots : ['10:00 AM - 11:30 AM'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-vastu-forestDark/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-vastu-ivory rounded-sm border border-vastu-border max-w-2xl w-full shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-vastu-forest text-vastu-ivory p-6 sm:p-8 relative border-b border-vastu-gold/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-vastu-ivory/80 hover:text-white hover:bg-vastu-forestLight transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-vastu-gold text-xs font-cinzel font-semibold tracking-widest uppercase mb-1">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Vastu Audit Appointment</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold">
            Schedule Your Consultation
          </h2>
          <p className="text-xs text-vastu-cream/80 font-sans mt-1">
            100% Non-Demolition Remedial Vastu Analysis for Residences & Commercial Spaces
          </p>

          {/* Progress Indicator */}
          {!isSubmitted && (
            <div className="flex items-center gap-2 mt-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      step >= s ? 'bg-vastu-gold' : 'bg-vastu-forestLight'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-cinzel text-2xl text-vastu-forest font-bold">
                  Consultation Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-vastu-muted font-sans max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-vastu-charcoal">{formData.name}</strong>. Our senior Vastu consultant has received your booking for{' '}
                  <strong className="text-vastu-charcoal">{currentServiceObj.title}</strong> on{' '}
                  <strong className="text-vastu-charcoal">{selectedDate || 'Upcoming Slot'} ({selectedTime})</strong>.
                </p>
              </div>

              <div className="bg-vastu-ivoryDark p-4 rounded border border-vastu-border max-w-md mx-auto text-left text-xs font-sans space-y-1.5 text-vastu-charcoal">
                <div><strong>Phone:</strong> {formData.phone}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Property:</strong> {propertyType} ({formData.city})</div>
                <div className="text-emerald-700 pt-1">
                  ✓ Our team will WhatsApp your CAD upload link & Google Meet invitation shortly.
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={waUrl(`Hello Zen Vastu, I have booked a ${currentServiceObj?.title} for ${formData.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-sm text-xs uppercase font-bold tracking-wider"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Consultant on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-vastu-forest text-vastu-ivory px-6 py-2.5 rounded-sm text-xs uppercase font-bold tracking-wider"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <span className="text-xs font-cinzel font-bold text-vastu-forest uppercase tracking-wider block">
                    Step 1: Select Consultation Type & Space
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {consultations.map((c) => (
                      <button
                        type="button"
                        key={c.slug}
                        onClick={() => setSelectedService(c.slug)}
                        className={`p-3.5 rounded border text-left transition-all ${
                          selectedService === c.slug
                            ? 'bg-vastu-forest text-vastu-ivory border-vastu-gold shadow-sm font-semibold'
                            : 'bg-vastu-ivory hover:bg-vastu-cream text-vastu-charcoal border-vastu-border'
                        }`}
                      >
                        <div className="font-cinzel text-xs font-bold">{c.title}</div>
                        <div className="text-[10px] opacity-80 mt-1 font-sans">
                          ₹{c.price.toLocaleString('en-IN')} • {c.duration}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="text-xs font-cinzel font-bold text-vastu-charcoal uppercase tracking-wider block mb-1.5">
                      Property Category:
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-vastu-ivory border border-vastu-border rounded p-2.5 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold"
                    >
                      {propertyTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-vastu-forest hover:bg-vastu-forestLight text-vastu-ivory px-6 py-2.5 rounded-sm text-xs uppercase font-bold tracking-wider flex items-center gap-1.5"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <span className="text-xs font-cinzel font-bold text-vastu-forest uppercase tracking-wider block">
                    Step 2: Preferred Date & Time Slot
                  </span>

                  <div>
                    <label className="text-xs text-vastu-muted font-sans block mb-1">
                      Preferred Date:
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-vastu-ivory border border-vastu-border rounded p-2.5 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-vastu-muted font-sans block mb-1.5">
                      Select Preferred Time Slot:
                    </label>
                    <div className="space-y-2">
                      {slots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`w-full p-2.5 rounded border text-left text-xs font-sans flex items-center justify-between ${
                            selectedTime === slot
                              ? 'bg-vastu-forest text-vastu-ivory border-vastu-gold font-semibold'
                              : 'bg-vastu-ivory hover:bg-vastu-cream text-vastu-charcoal border-vastu-border'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-vastu-gold" />
                            <span>{slot}</span>
                          </div>
                          {selectedTime === slot && <Check className="w-3.5 h-3.5 text-vastu-gold" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-vastu-muted hover:text-vastu-forest uppercase font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-vastu-forest hover:bg-vastu-forestLight text-vastu-ivory px-6 py-2.5 rounded-sm text-xs uppercase font-bold tracking-wider flex items-center gap-1.5"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <span className="text-xs font-cinzel font-bold text-vastu-forest uppercase tracking-wider block">
                    Step 3: Your Contact Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-vastu-muted font-sans block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-vastu-ivory border border-vastu-border rounded p-2.5 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-vastu-muted font-sans block mb-1">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-vastu-ivory border border-vastu-border rounded p-2.5 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-vastu-muted font-sans block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-vastu-ivory border border-vastu-border rounded p-2.5 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-vastu-muted font-sans block mb-1">
                        City / Location *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. New Delhi / Dubai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-vastu-ivory border border-vastu-border rounded p-2.5 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-vastu-muted font-sans block mb-1">
                      Brief Notes / Main Concerns (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Health issues in family, low sales in business, planning new home purchase..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-vastu-ivory border border-vastu-border rounded p-2.5 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs text-vastu-muted hover:text-vastu-forest uppercase font-bold"
                    >
                      Back
                    </button>
                    {submitError && <p className="text-xs text-rose-700">{submitError}</p>}
                    <button
                      type="submit"
                      className="bg-vastu-gold hover:bg-vastu-goldLight text-vastu-forestDark px-8 py-3 rounded-sm text-xs font-sans font-bold uppercase tracking-wider shadow-vastu flex items-center gap-2"
                    >
                      <span>Confirm & Book Consultant</span>
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
