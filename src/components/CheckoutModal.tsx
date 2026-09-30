import { useState, type FormEvent } from 'react';
import { X, Check, ShieldCheck, CreditCard, Smartphone, Truck, Sparkles, ShoppingBag } from 'lucide-react';
import { type CartItem } from './CartDrawer';
import { supabase } from '../lib/supabase';
import { useCms } from '../context/CmsProvider';
import { createCashfreeOrder, openCashfreeCheckout } from '../lib/cashfree';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (orderData: any) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}: CheckoutModalProps) {
  const { settings, coupons } = useCms();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cashfree_upi' | 'cashfree_card' | 'cod'>(
    'cashfree_upi'
  );
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = (rawSubtotal * appliedDiscount) / 100;
  const shippingFee = rawSubtotal >= Number(settings.free_shipping_min) ? 0 : Number(settings.shipping_fee);
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = () => {
    const match = coupons.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.active);
    if (match) {
      setAppliedDiscount(Number(match.discount_percent));
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code.');
      setAppliedDiscount(0);
    }
  };

  const handleProcessOrder = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setSubmitError('');

    const paymentLabel =
      paymentMethod === 'cashfree_upi'
        ? 'Cashfree UPI (Instant)'
        : paymentMethod === 'cashfree_card'
        ? 'Cashfree Card / NetBanking'
        : 'Cash on Delivery';

    const fallbackRef = `ZV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderRef = fallbackRef;
    const orderId = crypto.randomUUID();

    // 1. Cash on Delivery (COD) Flow
    if (paymentMethod === 'cod') {
      if (supabase) {
        const { error: orderError } = await supabase.from('orders').insert({
          id: orderId,
          order_ref: orderRef,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          subtotal: rawSubtotal,
          discount: discountAmount,
          shipping: shippingFee,
          total: grandTotal,
          payment_method: paymentLabel,
          payment_status: 'pending',
          status: 'processing',
        });
        if (orderError) {
          setSubmitError(orderError.message);
          setIsProcessing(false);
          return;
        }

        const { error: itemsError } = await supabase.from('order_items').insert(
          items.map((it) => ({
            order_id: orderId,
            product_id: it.product.id,
            product_name: it.product.name,
            product_image: it.product.image,
            unit_price: it.product.price,
            quantity: it.quantity,
            line_total: it.product.price * it.quantity,
          }))
        );
        if (itemsError) {
          setSubmitError(itemsError.message);
          setIsProcessing(false);
          return;
        }
      }

      const order = {
        orderId: orderRef,
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        customer: formData,
        items,
        subtotal: rawSubtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: grandTotal,
        paymentMethod: paymentLabel,
        status: 'Confirmed / Cash on Delivery',
      };

      setPlacedOrder(order);
      setIsProcessing(false);
      onOrderComplete(order);
      return;
    }

    // 2. Cashfree Live Online Payment (UPI / Card / NetBanking)
    try {
      // Record pending order in database first
      if (supabase) {
        const { error: orderError } = await supabase.from('orders').insert({
          id: orderId,
          order_ref: orderRef,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          subtotal: rawSubtotal,
          discount: discountAmount,
          shipping: shippingFee,
          total: grandTotal,
          payment_method: paymentLabel,
          payment_status: 'pending',
          status: 'pending',
        });
        if (orderError) {
          setSubmitError(orderError.message);
          setIsProcessing(false);
          return;
        }

        const { error: itemsError } = await supabase.from('order_items').insert(
          items.map((it) => ({
            order_id: orderId,
            product_id: it.product.id,
            product_name: it.product.name,
            product_image: it.product.image,
            unit_price: it.product.price,
            quantity: it.quantity,
            line_total: it.product.price * it.quantity,
          }))
        );
        if (itemsError) {
          setSubmitError(itemsError.message);
          setIsProcessing(false);
          return;
        }
      }

      // Step 1: Create Cashfree order via Supabase Edge Function
      const cfOrder = await createCashfreeOrder({
        orderId,
        orderRef,
        amount: grandTotal,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
      });

      // Step 2: Open Cashfree drop-in checkout
      await openCashfreeCheckout({
        paymentSessionId: cfOrder.paymentSessionId,
      });

      // Payment successful! Update Supabase status
      if (supabase) {
        await supabase
          .from('orders')
          .update({
            payment_status: 'paid',
            status: 'processing',
            cashfree_order_id: cfOrder.cfOrderId,
          })
          .eq('id', orderId);
      }

      const order = {
        orderId: orderRef,
        paymentId: cfOrder.cfOrderId,
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        customer: formData,
        items,
        subtotal: rawSubtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: grandTotal,
        paymentMethod: `${paymentLabel} (Verified)`,
        status: 'Confirmed / Paid',
      };

      setPlacedOrder(order);
      setIsProcessing(false);
      onOrderComplete(order);
    } catch (err: any) {
      setIsProcessing(false);
      const message = err?.message || 'Payment could not be completed. You can try again or choose Cash on Delivery.';
      setSubmitError(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-vastu-forestDark/85 backdrop-blur-sm flex justify-center items-start sm:items-center p-2.5 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-vastu-ivory rounded-md border border-vastu-border max-w-4xl lg:max-w-5xl w-full shadow-2xl overflow-hidden relative m-auto my-2 sm:my-4 flex flex-col max-h-[calc(100vh-1.5rem)] sm:max-h-[92vh]">
        {/* Header */}
        <div className="bg-vastu-forest text-vastu-ivory px-4 py-3 sm:px-6 sm:py-4 relative border-b border-vastu-gold/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-vastu-gold shrink-0" />
            <div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold leading-tight">
                {placedOrder ? 'Order Confirmed' : 'Secure Vedic Checkout'}
              </h2>
              <span className="text-[10px] sm:text-xs text-vastu-cream/80 font-sans block">
                {placedOrder
                  ? 'Your sacred objects are being consecrated for dispatch'
                  : 'Fast, Encrypted & Insured Delivery across India and Worldwide'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-vastu-ivory/80 hover:text-white hover:bg-vastu-forestLight transition-colors shrink-0 ml-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 overscroll-contain">
          {placedOrder ? (
            /* Order Success Receipt */
            <div className="space-y-6 animate-fadeIn text-center py-4 max-w-xl mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-cinzel text-2xl font-bold text-vastu-forest">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-vastu-muted font-sans">
                  Order Reference:{' '}
                  <strong className="text-vastu-charcoal font-mono font-bold">
                    {placedOrder.orderId}
                  </strong>{' '}
                  • Date: {placedOrder.date}
                </p>
              </div>

              <div className="bg-vastu-ivoryDark p-5 rounded border border-vastu-border text-left text-xs font-sans space-y-3">
                <div className="flex justify-between border-b border-vastu-border pb-2">
                  <span className="text-vastu-muted">Deliver To:</span>
                  <span className="font-bold text-vastu-charcoal">
                    {placedOrder.customer.name} ({placedOrder.customer.phone})
                  </span>
                </div>
                <div className="flex justify-between border-b border-vastu-border pb-2">
                  <span className="text-vastu-muted">Shipping Address:</span>
                  <span className="font-medium text-vastu-charcoal text-right max-w-xs">
                    {placedOrder.customer.address}, {placedOrder.customer.city},{' '}
                    {placedOrder.customer.state} - {placedOrder.customer.pincode}
                  </span>
                </div>
                <div className="flex justify-between border-b border-vastu-border pb-2">
                  <span className="text-vastu-muted">Payment:</span>
                  <div className="text-right">
                    <span className="font-semibold text-emerald-800 block">
                      {placedOrder.paymentMethod} (₹{placedOrder.total.toLocaleString('en-IN')})
                    </span>
                    {placedOrder.paymentId && (
                      <span className="text-[10px] text-vastu-muted font-mono block">
                        Cashfree Txn: {placedOrder.paymentId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Items in Order */}
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-cinzel font-bold text-vastu-forest block uppercase">
                    Ordered Sacred Artifacts:
                  </span>
                  {placedOrder.items.map((it: CartItem) => (
                    <div
                      key={it.product.id}
                      className="flex items-center justify-between text-xs text-vastu-charcoal"
                    >
                      <span className="truncate pr-2">
                        {it.product.name} × {it.quantity}
                      </span>
                      <span className="font-bold shrink-0">
                        ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-emerald-800 font-sans">
                ✓ An order confirmation with tracking details has been sent to {placedOrder.customer.email}.
              </p>

              <button
                onClick={onClose}
                className="bg-vastu-forest hover:bg-vastu-forestLight text-vastu-ivory px-8 py-3 rounded-sm text-xs font-sans font-bold uppercase tracking-wider shadow-vastu transition-colors"
              >
                Return to Sanctuary
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleProcessOrder} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 pb-4">
                {/* Left: Contact & Shipping Address Form */}
                <div className="md:col-span-7 space-y-4">
                  <span className="text-xs font-cinzel font-bold text-vastu-forest uppercase tracking-wider block">
                    01 · Contact & Delivery Address
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-vastu-muted font-sans font-medium block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-vastu-ivory border border-vastu-border rounded py-2 px-3 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-vastu-muted font-sans font-medium block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-vastu-ivory border border-vastu-border rounded py-2 px-3 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-vastu-muted font-sans font-medium block mb-1">
                      Email Address (for Receipt & Updates) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-vastu-ivory border border-vastu-border rounded py-2 px-3 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-vastu-muted font-sans font-medium block mb-1">
                      Street Address & Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Flat No, Building Name, Street..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-vastu-ivory border border-vastu-border rounded py-2 px-3 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="text-[11px] text-vastu-muted font-sans font-medium block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-vastu-ivory border border-vastu-border rounded py-2 px-3 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-vastu-muted font-sans font-medium block mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Maharashtra"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-vastu-ivory border border-vastu-border rounded py-2 px-3 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-vastu-muted font-sans font-medium block mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="400001"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full bg-vastu-ivory border border-vastu-border rounded py-2 px-3 text-xs text-vastu-charcoal font-sans focus:outline-none focus:border-vastu-gold transition-colors"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="pt-2">
                    <span className="text-xs font-cinzel font-bold text-vastu-forest uppercase tracking-wider block mb-2">
                      02 · Select Payment Gateway
                    </span>
                    <div className="space-y-2">
                      <label
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded border cursor-pointer text-xs font-sans transition-all ${
                          paymentMethod === 'cashfree_upi'
                            ? 'bg-vastu-forest text-vastu-ivory border-vastu-gold font-semibold shadow-sm'
                            : 'bg-vastu-ivory hover:bg-vastu-cream text-vastu-charcoal border-vastu-border'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <Smartphone className="w-4 h-4 text-vastu-gold shrink-0" />
                          <span className="truncate">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        </div>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'cashfree_upi'}
                          onChange={() => setPaymentMethod('cashfree_upi')}
                          className="accent-vastu-gold shrink-0"
                        />
                      </label>

                      <label
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded border cursor-pointer text-xs font-sans transition-all ${
                          paymentMethod === 'cashfree_card'
                            ? 'bg-vastu-forest text-vastu-ivory border-vastu-gold font-semibold shadow-sm'
                            : 'bg-vastu-ivory hover:bg-vastu-cream text-vastu-charcoal border-vastu-border'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <CreditCard className="w-4 h-4 text-vastu-gold shrink-0" />
                          <span className="truncate">Credit / Debit Cards & NetBanking</span>
                        </div>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'cashfree_card'}
                          onChange={() => setPaymentMethod('cashfree_card')}
                          className="accent-vastu-gold shrink-0"
                        />
                      </label>

                      <label
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded border cursor-pointer text-xs font-sans transition-all ${
                          paymentMethod === 'cod'
                            ? 'bg-vastu-forest text-vastu-ivory border-vastu-gold font-semibold shadow-sm'
                            : 'bg-vastu-ivory hover:bg-vastu-cream text-vastu-charcoal border-vastu-border'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <Truck className="w-4 h-4 text-vastu-gold shrink-0" />
                          <span className="truncate">Cash on Delivery / WhatsApp Confirmation</span>
                        </div>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="accent-vastu-gold shrink-0"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right: Order Summary */}
                <div className="md:col-span-5 bg-vastu-ivoryDark p-4 sm:p-5 rounded-md border border-vastu-border flex flex-col justify-between space-y-4 h-fit md:sticky md:top-0">
                  <div>
                    <span className="text-xs font-cinzel font-bold text-vastu-forest uppercase tracking-wider block mb-2.5">
                      Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
                    </span>

                    <div className="max-h-36 sm:max-h-44 overflow-y-auto space-y-2 pr-1 divide-y divide-vastu-border/50">
                      {items.map((it) => (
                        <div
                          key={it.product.id}
                          className="pt-2 first:pt-0 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <img
                              src={it.product.image}
                              alt={it.product.name}
                              className="w-8 h-8 rounded object-cover border border-vastu-border flex-shrink-0"
                            />
                            <span className="truncate text-vastu-charcoal font-sans">
                              {it.product.name} × {it.quantity}
                            </span>
                          </div>
                          <span className="font-bold text-vastu-forest font-sans shrink-0">
                            ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Coupon Input */}
                    <div className="pt-3 border-t border-vastu-border mt-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. ZEN10)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 bg-vastu-ivory border border-vastu-border rounded px-3 py-1.5 text-xs text-vastu-charcoal font-sans uppercase focus:outline-none focus:border-vastu-gold"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="bg-vastu-forest hover:bg-vastu-forestLight text-vastu-ivory px-3 py-1.5 rounded text-xs font-bold font-sans transition-colors shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                      {appliedDiscount > 0 && (
                        <span className="text-[10px] text-emerald-700 font-sans mt-1 block">
                          ✓ {appliedDiscount}% Sacred Blessing Discount applied!
                        </span>
                      )}
                      {couponError && (
                        <span className="text-[10px] text-rose-600 font-sans mt-1 block">
                          {couponError}
                        </span>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="pt-3 border-t border-vastu-border space-y-1.5 text-xs font-sans text-vastu-charcoal">
                      <div className="flex justify-between">
                        <span className="text-vastu-muted">Subtotal</span>
                        <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
                      </div>
                      {appliedDiscount > 0 && (
                        <div className="flex justify-between text-emerald-800">
                          <span>Discount ({appliedDiscount}%)</span>
                          <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-vastu-muted">Insured Delivery</span>
                        <span className="text-emerald-800 font-medium">
                          {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-vastu-border font-bold text-sm text-vastu-forest">
                        <span>Total Payable</span>
                        <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="p-2 rounded bg-rose-50 border border-rose-200">
                      <p className="text-xs text-rose-700 font-sans">{submitError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-vastu-gold hover:bg-vastu-goldLight text-vastu-forestDark py-3 px-4 rounded-sm text-xs font-sans font-bold uppercase tracking-wider shadow-vastu flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>Opening Secure Payment Portal...</span>
                    ) : paymentMethod === 'cod' ? (
                      <>
                        <Truck className="w-4 h-4 shrink-0" />
                        <span>Confirm Cash on Delivery (₹{grandTotal.toLocaleString('en-IN')})</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>Pay ₹{grandTotal.toLocaleString('en-IN')} Securely</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-vastu-muted text-center leading-relaxed">
                    Orders & payments are processed under the governance and terms of <strong className="text-vastu-forest font-medium">SRV RESEARCH & LIFE SCIENCES PVT LTD</strong>.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

