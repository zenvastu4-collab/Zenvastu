import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Product } from '../data/vastuData';
import { Star, ShoppingBag, Eye, Sparkles, MessageCircle, Check } from 'lucide-react';
import { Card3D, ScrollReveal3D } from './ui/Card3D';
import { useCms } from '../context/CmsProvider';

interface ProductsSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductsSection({ onSelectProduct, onAddToCart }: ProductsSectionProps) {
  const { products, copy } = useCms();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Wealth & Prosperity',
    'Meditation & Clarity',
    'Sacred Geometry',
    'Ritual & Purification',
    'Spiritual Protection',
  ];

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAddWithFeedback = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="products" className="py-20 bg-[#FAF7F2] border-b border-vastu-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal3D direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-vastu-gold" />
              <span>{copy('products.eyebrow', 'पवित्र संग्रह • The Sacred Remedial Collection')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
              {copy('products.title', 'Objects for Balanced Living')}
            </h2>
            <p className="mt-3 text-vastu-muted text-sm sm:text-base font-sans leading-relaxed">
              {copy('products.subtitle', 'Consecrated energetic tools, sacred geometry pyramids, and handcrafted Vedic artifacts designed to harmonize your home and workplace.')}
            </p>
          </div>
        </ScrollReveal3D>

        {/* Category Filters with Smooth Spring Animation */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-colors ${
                  isActive
                    ? 'text-white font-semibold shadow-sm'
                    : 'bg-white hover:bg-vastu-cream/60 text-vastu-charcoal border border-vastu-border'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-vastu-forest rounded-full -z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Products Grid with 3D Tilt Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => {
              const isJustAdded = addedId === product.id;
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Card3D intensity={10} className="h-full">
                    <div className="bg-white rounded-sm border border-vastu-border hover:border-vastu-forest/40 transition-all duration-300 shadow-sm hover:shadow-xl group flex flex-col justify-between overflow-hidden h-full">
                      {/* Product Image Container */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-vastu-cream">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        {/* Element Tag Badge */}
                        <div className="absolute top-3 left-3 bg-[#183125]/85 backdrop-blur-sm text-vastu-goldLight text-[10px] font-sans font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-sm border border-vastu-gold/30 shadow-sm">
                          {product.element.split(' ')[0]}
                        </div>

                        {/* Quick Action Overlay on Hover */}
                        <div className="absolute inset-0 bg-[#183125]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="p-3 bg-white text-vastu-forest rounded-full hover:bg-vastu-gold hover:text-vastu-forestDark transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0 duration-300"
                            title="Quick View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAddWithFeedback(product)}
                            className="p-3 bg-vastu-forest text-vastu-gold rounded-full hover:bg-[#12261D] transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                        <div>
                          {/* Rating & Category */}
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-[11px] text-vastu-terracotta font-sans font-medium uppercase tracking-wider">
                              {product.category}
                            </span>
                            <div className="flex items-center gap-1 text-amber-600">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span className="text-xs font-bold text-vastu-charcoal">
                                {product.rating}
                              </span>
                              <span className="text-[10px] text-vastu-muted">
                                ({product.reviewsCount})
                              </span>
                            </div>
                          </div>

                          {/* Title & Subtitle */}
                          <h3
                            onClick={() => onSelectProduct(product)}
                            className="font-serif text-xl font-semibold text-vastu-forest hover:text-vastu-terracotta cursor-pointer transition-colors leading-snug"
                          >
                            {product.name}
                          </h3>
                          <p className="text-xs text-vastu-muted font-sans line-clamp-2 mt-1.5 leading-relaxed">
                            {product.subtitle}
                          </p>
                        </div>

                        {/* Pricing & Add to Cart Button */}
                        <div className="pt-4 border-t border-vastu-border flex items-center justify-between gap-3">
                          <div className="flex flex-col">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-sans font-bold text-base text-vastu-forest">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-vastu-muted line-through font-sans">
                                  ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-emerald-700 font-sans font-medium">
                              ✓ In Stock • Insured Delivery
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/919711855879?text=Hello%20Zen%20Vastu%2C%20I%20am%20interested%20in%20purchasing%20the%20${encodeURIComponent(product.name)}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded border border-vastu-border hover:border-emerald-500 text-emerald-700 hover:bg-emerald-50 transition-colors"
                              title="Inquire on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>

                            <button
                              onClick={() => handleAddWithFeedback(product)}
                              className={`px-3.5 py-2 rounded-sm text-xs font-sans font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                                isJustAdded
                                  ? 'bg-emerald-700 text-white'
                                  : 'bg-vastu-forest hover:bg-[#12261D] text-white shadow-sm'
                              }`}
                            >
                              {isJustAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3.5 h-3.5 text-vastu-gold" />
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
