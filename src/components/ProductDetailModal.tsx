import { useState } from 'react';
import { type Product } from '../data/vastuData';
import { X, Star, ShoppingBag, MessageCircle, Sparkles, Compass, Check, Shield, Truck, RefreshCw } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenBooking: () => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onOpenBooking,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-vastu-forestDark/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-vastu-ivory rounded-sm border border-vastu-border max-w-4xl w-full shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-vastu-ivory/80 hover:bg-vastu-cream text-vastu-forest transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Product Image Gallery */}
            <div className="md:col-span-5 space-y-4">
              <div className="aspect-square rounded-sm overflow-hidden border border-vastu-border bg-vastu-cream shadow-vastu-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-vastu-muted font-sans pt-2">
                <div className="p-2 bg-vastu-ivoryDark rounded border border-vastu-borderLight flex flex-col items-center">
                  <Shield className="w-4 h-4 text-vastu-gold mb-1" />
                  <span>100% Consecrated</span>
                </div>
                <div className="p-2 bg-vastu-ivoryDark rounded border border-vastu-borderLight flex flex-col items-center">
                  <Truck className="w-4 h-4 text-vastu-gold mb-1" />
                  <span>Insured Shipping</span>
                </div>
                <div className="p-2 bg-vastu-ivoryDark rounded border border-vastu-borderLight flex flex-col items-center">
                  <RefreshCw className="w-4 h-4 text-vastu-gold mb-1" />
                  <span>Easy Exchange</span>
                </div>
              </div>
            </div>

            {/* Product Story & Purchase Info */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-cinzel font-semibold text-vastu-terracotta uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold text-vastu-charcoal">
                      {product.rating}
                    </span>
                    <span className="text-[11px] text-vastu-muted">
                      ({product.reviewsCount} verified reviews)
                    </span>
                  </div>
                </div>

                <h2 className="font-cinzel text-2xl sm:text-3xl text-vastu-forest font-bold leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-vastu-muted font-sans mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 border-y border-vastu-border py-3">
                <span className="font-sans font-bold text-2xl text-vastu-forest">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-vastu-muted line-through font-sans">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded font-sans font-medium">
                  Inclusive of all taxes & Vedic energization
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-vastu-charcoal font-sans leading-relaxed">
                {product.description}
              </p>

              {/* Quantity & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-vastu-border rounded bg-vastu-ivory">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-vastu-charcoal hover:bg-vastu-cream font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold font-sans">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-vastu-charcoal hover:bg-vastu-cream font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-vastu-forest hover:bg-vastu-forestLight text-vastu-ivory py-3 px-6 rounded-sm text-xs font-sans font-semibold uppercase tracking-wider shadow-vastu-sm hover:shadow-vastu transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-vastu-gold" />
                    <span>Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  </button>
                </div>

                {addedNotice && (
                  <div className="bg-emerald-100 text-emerald-900 text-xs py-2 px-3 rounded flex items-center gap-2 animate-fadeIn font-sans font-medium">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Item added to your sacred cart successfully!</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-1">
                  <a
                    href={`https://wa.me/919711855879?text=Hello%20Zen%20Vastu%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}%20priced%20at%20Rs.%20${product.price}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-emerald-600 text-emerald-800 hover:bg-emerald-50 py-2.5 px-4 rounded-sm text-xs font-sans font-semibold tracking-wide transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Order via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="flex items-center justify-center gap-1.5 border border-vastu-border text-vastu-muted hover:text-vastu-forest py-2.5 px-4 rounded-sm text-xs font-sans tracking-wide transition-colors"
                  >
                    <span>Need Placement Advice?</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Vedic Symbolism & Placement Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-vastu-border">
            {/* 4 Pillars of Symbolism */}
            <div className="bg-vastu-ivoryDark/60 p-5 rounded-sm border border-vastu-border space-y-3">
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-vastu-forest uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-vastu-gold" />
                <span>Sacred Symbolism & Energetic Meaning</span>
              </div>
              <ul className="space-y-2">
                {product.symbolism.map((item, idx) => (
                  <li key={idx} className="text-xs text-vastu-charcoal font-sans flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vastu-terracotta mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vastu Direction Placement Rules */}
            <div className="bg-vastu-cream/60 p-5 rounded-sm border border-vastu-border space-y-3">
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-vastu-forest uppercase tracking-wider">
                <Compass className="w-4 h-4 text-vastu-gold" />
                <span>Authentic Vastu Placement Guide</span>
              </div>
              <p className="text-xs text-vastu-charcoal font-sans leading-relaxed">
                {product.vastuPlacement}
              </p>
              {product.material && (
                <div className="text-[11px] text-vastu-muted font-sans pt-2 border-t border-vastu-border/60">
                  <strong>Specifications:</strong> {product.material} • Dimensions: {product.dimensions}
                </div>
              )}
            </div>
          </div>

          {/* Inspiring Sacred Quote */}
          {product.quote && (
            <div className="bg-vastu-forest text-vastu-ivory p-5 rounded-sm text-center font-serif italic text-sm sm:text-base border border-vastu-gold/30">
              “{product.quote}”
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
