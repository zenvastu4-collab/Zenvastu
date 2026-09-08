import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BookingModal } from './components/BookingModal';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { Footer } from './components/Footer';
import { type Product } from './data/vastuData';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { useCms } from './context/CmsProvider';

import { HomePage } from './pages/HomePage';
import { ConsultationsPage } from './pages/ConsultationsPage';
import { ShopPage } from './pages/ShopPage';
import { ElementsPage } from './pages/ElementsPage';
import { ScannerPage } from './pages/ScannerPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { waUrl, copy } = useCms();

  // Initialize Lenis Inertia-Based Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingServiceSlug, setBookingServiceSlug] = useState<string | undefined>(undefined);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Placed Orders
  const [userOrders, setUserOrders] = useState<any[]>([]);

  // Handle Cart Operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderComplete = (orderData: any) => {
    setUserOrders((prev) => [orderData, ...prev]);
    setCart([]);
  };

  // Route & Anchor Navigation Helper
  const handleNavigate = (pathOrSectionId: string) => {
    const routeMap: Record<string, string> = {
      hero: '/',
      '/': '/',
      consultations: '/consultations',
      '/consultations': '/consultations',
      products: '/shop',
      '/shop': '/shop',
      shop: '/shop',
      elements: '/elements',
      directions: '/elements',
      '/elements': '/elements',
      scanner: '/scanner',
      '/scanner': '/scanner',
      about: '/about',
      method: '/about',
      '/about': '/about',
      journal: '/journal',
      '/journal': '/journal',
    };

    const target = routeMap[pathOrSectionId] || pathOrSectionId;

    if (target.startsWith('/')) {
      navigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Anchor on same page
    const elem = document.getElementById(target);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (serviceSlug?: string) => {
    setBookingServiceSlug(serviceSlug);
    setIsBookingOpen(true);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-vastu-ivory text-vastu-charcoal selection:bg-vastu-gold/30 selection:text-vastu-forest">
      {/* Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAdmin={() => navigate('/admin')}
        activeSection={location.pathname}
        onNavigate={handleNavigate}
      />

      {/* Main Sanctuary Routes */}
      <main className="flex-grow">
        <Routes>
          {/* 1. Streamlined Flagship Home Sanctuary */}
          <Route
            index
            element={
              <HomePage
                onOpenBooking={handleOpenBooking}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onNavigate={handleNavigate}
              />
            }
          />

          {/* 2. Dedicated Consultations & Space Audits Page */}
          <Route
            path="consultations"
            element={<ConsultationsPage onOpenBooking={handleOpenBooking} />}
          />

          {/* 3. Dedicated Sacred Store E-Commerce Page */}
          <Route
            path="shop"
            element={
              <ShopPage
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
              />
            }
          />

          {/* 4. Dedicated 5 Elements & 8 Directions Principles Page */}
          <Route
            path="elements"
            element={
              <ElementsPage
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
              />
            }
          />

          {/* 5. Dedicated Interactive Energy Compatibility Scanner */}
          <Route
            path="scanner"
            element={<ScannerPage onOpenBooking={() => handleOpenBooking()} />}
          />

          {/* 6. Dedicated About & Non-Demolition Methodology Page */}
          <Route
            path="about"
            element={<AboutPage onOpenBooking={() => handleOpenBooking()} />}
          />

          {/* 7. Dedicated Sacred Wisdom Journal & Articles Page */}
          <Route path="journal" element={<JournalPage />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* WhatsApp Floating Button */}
        <a
          href={waUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all text-xs font-sans font-semibold border border-emerald-500/50"
          title="Chat with Senior Consultant"
        >
          <MessageCircle className="w-4 h-4 text-emerald-300" />
          <span className="hidden sm:inline">{copy('whatsapp.float_label', 'WhatsApp Expert')}</span>
        </a>

        {/* Floating Cart Button */}
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-[#1B382B] hover:bg-[#12261D] text-white px-4 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all text-xs font-sans font-semibold border border-[#C5A059]/40 relative"
            title="Open Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-vastu-gold" />
            <span>Cart ({totalCartCount})</span>
            <span className="absolute -top-1 -right-1 bg-[#B44436] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalCartCount}
            </span>
          </button>
        )}
      </div>

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenBooking={() => handleOpenBooking()}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceSlug={bookingServiceSlug}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderComplete={handleOrderComplete}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        userOrders={userOrders}
      />
    </div>
  );
}
