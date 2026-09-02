import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { type Product } from '../data/vastuData';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 2500;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-vastu-forestDark/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-vastu-ivory border-l border-vastu-border shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-vastu-border bg-vastu-forest text-vastu-ivory flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-vastu-gold" />
              <h2 className="font-cinzel text-lg font-bold">
                Your Sacred Cart ({items.reduce((a, i) => a + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-vastu-ivory/80 hover:text-white hover:bg-vastu-forestLight transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-vastu-cream/60 px-6 py-3 border-b border-vastu-border text-xs font-sans">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>🎉 You have unlocked Free Insured Vedic Delivery!</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-vastu-charcoal text-[11px]">
                  <span>Add ₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')} more for Free Delivery</span>
                  <span>{Math.round(progressToFreeShipping)}%</span>
                </div>
                <div className="w-full h-1.5 bg-vastu-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-vastu-gold transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-vastu-ivoryDark flex items-center justify-center mx-auto text-vastu-muted">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-cinzel text-lg font-bold text-vastu-forest">
                  Your Cart is Empty
                </h3>
                <p className="text-xs text-vastu-muted font-sans max-w-xs mx-auto">
                  Explore our collection of consecrated crystals, Kuber statues, and sacred pyramids to harmonize your sanctuary.
                </p>
                <button
                  onClick={onClose}
                  className="bg-vastu-forest text-vastu-ivory text-xs px-6 py-2.5 rounded-sm uppercase font-bold tracking-wider"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-vastu-ivoryDark/60 p-3.5 rounded border border-vastu-border flex gap-3.5 items-center justify-between"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded border border-vastu-border"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-cinzel text-xs font-bold text-vastu-forest truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] text-vastu-terracotta uppercase font-sans">
                      {item.product.category}
                    </span>
                    <div className="font-sans font-bold text-xs text-vastu-charcoal mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-vastu-border rounded bg-vastu-ivory text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-vastu-cream font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-vastu-cream font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-vastu-muted hover:text-rose-700 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-sans font-bold text-xs text-vastu-forest">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 bg-vastu-ivory border-t border-vastu-border space-y-4">
              <div className="space-y-1.5 text-xs font-sans text-vastu-charcoal">
                <div className="flex justify-between">
                  <span className="text-vastu-muted">Subtotal</span>
                  <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vastu-muted">Insured Vedic Shipping</span>
                  <span className="text-emerald-700 font-semibold">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '₹150'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-vastu-border text-sm font-bold font-sans text-vastu-forest">
                  <span>Total Amount</span>
                  <span>
                    ₹
                    {(
                      subtotal + (subtotal >= freeShippingThreshold ? 0 : 150)
                    ).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-vastu-gold hover:bg-vastu-goldLight text-vastu-forestDark py-3.5 px-6 rounded-sm text-xs font-sans font-bold uppercase tracking-wider shadow-vastu flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-vastu-muted font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-vastu-gold" />
                <span>256-Bit SSL Encrypted • Razorpay Certified Payment</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
