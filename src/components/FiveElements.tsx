import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCms } from '../context/CmsProvider';
import { Flame, Droplets, Mountain, Wind, Sparkles, Check, AlertCircle, Compass, Palette, Activity, Zap } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  angle: number;
  angularSpeed: number;
  life: number;
  maxLife: number;
}

export function FiveElements() {
  const { elements, copy } = useCms();
  const [activeElementId, setActiveElementId] = useState<string>('prithvi');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeElement = elements.find((e) => e.id === activeElementId) || elements[0];

  const getElementIcon = (id: string) => {
    switch (id) {
      case 'prithvi':
        return <Mountain className="w-5 h-5" />;
      case 'jal':
        return <Droplets className="w-5 h-5" />;
      case 'agni':
        return <Flame className="w-5 h-5" />;
      case 'vayu':
        return <Wind className="w-5 h-5" />;
      case 'akash':
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getElementDetails = (id: string) => {
    switch (id) {
      case 'prithvi':
        return {
          label: 'Golden Ochre & Terracotta',
          sanskritColor: 'पीत वर्ण (Peeta - Earth Amber)',
          energyTone: 'Grounding & Stability Frequency',
          bijaMantra: 'लं',
          bijaName: 'LAM (Root / Muladhara)',
          frequency: '396 Hz',
          yantraShape: 'Square / Cube (Chathurasra)',
          yantraSymbol: '■',
          bgGradient: 'from-[#FAF4E8] via-[#FDF9F2] to-[#F3E7D3]',
          accentGlow: 'rgba(217, 119, 6, 0.25)',
          tagline: 'Anchors Wealth, Physical Vitality & Leadership Authority',
        };
      case 'jal':
        return {
          label: 'Oceanic Azure & Sapphire Flow',
          sanskritColor: 'नील वर्ण (Neela - Celestial Blue)',
          energyTone: 'Fluid Wealth & Clarity Waves',
          bijaMantra: 'वं',
          bijaName: 'VAM (Sacral / Svadhisthana)',
          frequency: '417 Hz',
          yantraShape: 'Crescent Moon (Ardha Chandra)',
          yantraSymbol: '☽',
          bgGradient: 'from-[#EDF6FB] via-[#F6FAFD] to-[#DCEEF8]',
          accentGlow: 'rgba(2, 132, 199, 0.25)',
          tagline: 'Activates Monetary Inflow, Intuition & Spiritual Receptivity',
        };
      case 'agni':
        return {
          label: 'Sacred Vermilion & Ruby Flame',
          sanskritColor: 'रक्त वर्ण (Rakta - Crimson Fire)',
          energyTone: 'Vitality & Dynamic Transformation',
          bijaMantra: 'रं',
          bijaName: 'RAM (Solar / Manipura)',
          frequency: '528 Hz',
          yantraShape: 'Upward Triangle (Trikona)',
          yantraSymbol: '▲',
          bgGradient: 'from-[#FDF1EE] via-[#FCF7F5] to-[#F9DDD8]',
          accentGlow: 'rgba(220, 38, 38, 0.25)',
          tagline: 'Ignites Fame, Rapid Action, Cash Liquidity & Digestive Power',
        };
      case 'vayu':
        return {
          label: 'Verdant Jade & Sacred Emerald',
          sanskritColor: 'हरित वर्ण (Harita - Forest Green)',
          energyTone: 'Expansion, Breath & Motion',
          bijaMantra: 'यं',
          bijaName: 'YAM (Heart / Anahata)',
          frequency: '639 Hz',
          yantraShape: 'Hexagram / Star (Shatkona)',
          yantraSymbol: '✡',
          bgGradient: 'from-[#EFF8F2] via-[#F7FCF9] to-[#DEF2E4]',
          accentGlow: 'rgba(5, 150, 105, 0.25)',
          tagline: 'Fosters Supportive Partnerships, Logistics & Clear Speech',
        };
      case 'akash':
      default:
        return {
          label: 'Cosmic Amethyst & Ether Violet',
          sanskritColor: 'श्याम/धूसर वर्ण (Celestial Ether)',
          energyTone: 'Spiritual Intuition & Infinite Vessel',
          bijaMantra: 'हं',
          bijaName: 'HAM (Throat & Crown / Vishuddha)',
          frequency: '741 Hz',
          yantraShape: 'Circle / Bindu (Vritta)',
          yantraSymbol: '●',
          bgGradient: 'from-[#F4EFFB] via-[#FAF7FD] to-[#E7DBF7]',
          accentGlow: 'rgba(124, 58, 237, 0.25)',
          tagline: 'Vessel of Infinite Possibility, Peace & Higher Consciousness',
        };
    }
  };

  const activeMeta = getElementDetails(activeElement.id);

  // Dynamic Animated Elemental Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      particles.push(createParticle(width, height, activeElementId, activeElement.colorHex));
    }

    function createParticle(w: number, h: number, elementId: string, baseColor: string): Particle {
      const isFire = elementId === 'agni';
      const isWater = elementId === 'jal';
      const isAir = elementId === 'vayu';
      const isSpace = elementId === 'akash';

      return {
        x: Math.random() * w,
        y: isFire ? h + Math.random() * 50 : Math.random() * h,
        vx: isAir
          ? 0.8 + Math.random() * 2
          : (Math.random() - 0.5) * (isWater ? 1.2 : 0.8),
        vy: isFire
          ? -(1 + Math.random() * 2.2)
          : isWater
          ? 0.3 + Math.sin(Math.random() * Math.PI) * 0.8
          : (Math.random() - 0.5) * 0.8,
        size: isSpace ? 1 + Math.random() * 2.5 : 2 + Math.random() * 4.5,
        alpha: 0.15 + Math.random() * 0.55,
        color: baseColor,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        life: 0,
        maxLife: 150 + Math.random() * 200,
      };
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Connect subtle constellation lines for Akash (Space)
      if (activeElementId === 'akash') {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              ctx.strokeStyle = `rgba(124, 58, 237, ${(1 - dist / 110) * 0.15})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw undulating water waves for Jal
      if (activeElementId === 'jal') {
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.08)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width; x += 15) {
          const waveY = height * 0.75 + Math.sin(x * 0.01 + frame * 0.02) * 18;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }

      // Draw and update each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.angularSpeed;

        // Custom elemental physics
        if (activeElementId === 'jal') {
          p.x += Math.sin(frame * 0.02 + p.life * 0.05) * 0.6;
        } else if (activeElementId === 'vayu') {
          p.y += Math.sin(frame * 0.03 + p.x * 0.01) * 0.8;
        } else if (activeElementId === 'agni') {
          p.x += (Math.random() - 0.5) * 0.9;
        }

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.save();
        ctx.globalAlpha = p.alpha * Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.fillStyle = p.color;

        // Render distinct elemental shapes
        if (activeElementId === 'agni') {
          // Flame teardrop / upward spark
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#DC2626';
          ctx.fill();
        } else if (activeElementId === 'prithvi') {
          // Grounded square / diamond crystal
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
        } else if (activeElementId === 'vayu') {
          // Swirling leaf/breeze particle
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 1.8, p.size * 0.7, p.angle, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Luminous spherical orb for Jal & Akash
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.shadowBlur = activeElementId === 'akash' ? 10 : 6;
          ctx.shadowColor = p.color;
          ctx.fill();
        }

        ctx.restore();

        // Respawn particle after life ends
        if (p.life >= p.maxLife) {
          particles[i] = createParticle(width, height, activeElementId, activeElement.colorHex);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeElementId, activeElement.colorHex]);

  return (
    <section
      id="elements"
      className={`py-20 border-b border-vastu-border relative overflow-hidden transition-colors duration-700 bg-gradient-to-b ${activeMeta.bgGradient}`}
    >
      {/* 1. Dynamic Canvas: Elemental Flow Particles (Water, Fire, Air, Earth, Space) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 2. Dynamic Ambient Color Auras */}
      <motion.div
        key={`glow-top-${activeElementId}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute -top-24 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none blur-[140px]"
        style={{ backgroundColor: activeElement.colorHex }}
      />
      <motion.div
        key={`glow-bottom-${activeElementId}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        className="absolute -bottom-24 left-1/4 w-[550px] h-[550px] rounded-full pointer-events-none blur-[130px]"
        style={{ backgroundColor: activeElement.colorHex }}
      />

      {/* Background Sacred Geometric Lattice */}
      <div
        className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none"
        style={{ color: activeElement.colorHex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-vastu-gold animate-pulse" />
            <span>{copy('elements.eyebrow', 'पञ्चमहाभूत • The Five Primal Cosmic Elements')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
            {copy('elements.title', 'The Five Elements of Spatial Balance')}
          </h2>
          <p className="mt-3 text-vastu-muted text-sm sm:text-base font-sans leading-relaxed">
            {copy('elements.subtitle', 'According to Vedic Shastras, every structure is a living organism composed of the five cosmic elements. Select any element to experience its vibrational color frequency, Bija sound seed, and spatial balance.')}
          </p>
        </div>

        {/* Sacred Vedic Elemental Color Swatches Bar with Bija Mantras */}
        <div className="mb-8 p-3.5 sm:p-4 bg-white/85 backdrop-blur-md rounded-sm border border-vastu-border shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 font-serif text-vastu-forest font-semibold text-sm">
              <Palette className="w-4 h-4 text-vastu-gold flex-shrink-0" />
              <span className="tracking-wide">Vedic Cosmic Color Resonance & Bija Vibrations:</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {elements.map((el) => {
                const isCurrent = el.id === activeElementId;
                const meta = getElementDetails(el.id);
                return (
                  <motion.button
                    key={el.id}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveElementId(el.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer border ${
                      isCurrent
                        ? 'bg-vastu-forest text-white shadow-md font-semibold border-vastu-forest'
                        : 'bg-white/90 hover:bg-white text-vastu-charcoal border-vastu-border/70 hover:border-vastu-border'
                    }`}
                  >
                    {/* Glowing Color Dot */}
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-inner ring-2 ring-white transition-transform"
                      style={{
                        backgroundColor: el.colorHex,
                        boxShadow: isCurrent ? `0 0 10px ${el.colorHex}` : undefined,
                      }}
                    />
                    <span className="font-medium">{el.name}</span>
                    <span
                      className="text-[10px] font-serif font-bold px-1.5 py-0.2 rounded"
                      style={{
                        backgroundColor: isCurrent ? `${el.colorHex}40` : `${el.colorHex}18`,
                        color: isCurrent ? '#FFFFFF' : el.colorHex,
                      }}
                    >
                      {meta.bijaMantra}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5 Element Navigation Cards with Dynamic Elemental Theme */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {elements.map((el) => {
            const isActive = el.id === activeElementId;
            const meta = getElementDetails(el.id);
            return (
              <motion.button
                key={el.id}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveElementId(el.id)}
                className={`relative p-4 sm:p-5 rounded-sm border transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer overflow-hidden ${
                  isActive
                    ? 'bg-white shadow-xl'
                    : 'bg-white/80 hover:bg-white text-vastu-charcoal border-vastu-border/80 hover:shadow-md'
                }`}
                style={{
                  borderColor: isActive ? el.colorHex : undefined,
                  boxShadow: isActive ? `0 12px 30px -5px ${el.colorHex}40` : undefined,
                }}
              >
                {/* Active Indicator Top Accent Bar with Shimmer */}
                {isActive && (
                  <motion.div
                    layoutId="activeElementTopBar"
                    className="absolute top-0 inset-x-0 h-1.5"
                    style={{ backgroundColor: el.colorHex }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Yantra Geometric Watermark Symbol */}
                <span
                  className="absolute right-2 top-1 text-2xl font-serif font-bold opacity-10 pointer-events-none select-none transition-transform group-hover:scale-125"
                  style={{ color: el.colorHex }}
                >
                  {meta.yantraSymbol}
                </span>

                {/* Element Colored Icon Badge with Dynamic Glow */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 shadow-sm relative"
                  style={{
                    backgroundColor: isActive ? el.colorHex : `${el.colorHex}18`,
                    color: isActive ? '#FFFFFF' : el.colorHex,
                    boxShadow: isActive ? `0 0 20px ${el.colorHex}60` : undefined,
                  }}
                >
                  {getElementIcon(el.id)}
                </div>

                <div className="space-y-0.5">
                  <span
                    className="font-serif text-lg font-bold tracking-wide block transition-colors"
                    style={{ color: isActive ? el.colorHex : undefined }}
                  >
                    {el.name}
                  </span>
                  <span className="text-[11px] font-sans font-medium text-vastu-muted block">
                    {el.sanskritName.split(' ')[0]}
                  </span>
                </div>

                {/* Bija Mantra & Frequency Capsule */}
                <div className="mt-3 flex items-center gap-1.5">
                  <span
                    className="text-[10px] font-serif font-bold px-2 py-0.5 rounded-full shadow-xs"
                    style={{
                      backgroundColor: `${el.colorHex}18`,
                      color: el.colorHex,
                    }}
                  >
                    {meta.bijaMantra} • {meta.frequency}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Element Showcase Card with Dynamic Aura */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeElement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-sm border shadow-2xl overflow-hidden relative"
            style={{
              borderColor: `${activeElement.colorHex}70`,
              boxShadow: `0 25px 60px -15px ${activeElement.colorHex}30`,
            }}
          >
            {/* Top Multi-Tone Elemental Rainbow Bar */}
            <div
              className="h-2 w-full transition-all duration-500"
              style={{
                background: `linear-gradient(90deg, ${activeElement.colorHex}, #C5A059 50%, ${activeElement.colorHex})`,
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Element Image & Atmospheric Scene */}
              <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-[500px] overflow-hidden">
                <motion.img
                  key={`img-${activeElement.id}`}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                  src={activeElement.image}
                  alt={activeElement.name}
                  className="w-full h-full object-cover"
                />

                {/* Elemental Color Vignette Overlay */}
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: `linear-gradient(to top, #0F1D15 0%, transparent 60%, ${activeElement.colorHex}40 100%)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101D15]/95 via-transparent to-transparent" />

                {/* Floating Element Color & Bija Capsule */}
                <div className="absolute top-6 left-6 flex flex-wrap items-center gap-2 z-10">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-semibold text-white backdrop-blur-md shadow-lg border border-white/20"
                    style={{ backgroundColor: `${activeElement.colorHex}E6` }}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>{activeMeta.label}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-bold text-white bg-black/50 backdrop-blur-md border border-white/20">
                    <span>बीज मंत्र:</span>
                    <span style={{ color: '#E5C578' }}>{activeMeta.bijaMantra}</span>
                    <span>({activeMeta.frequency})</span>
                  </div>
                </div>

                {/* Bottom Architectural Direction & Tagline */}
                <div className="absolute bottom-6 left-6 right-6 text-vastu-ivory space-y-1.5 z-10">
                  <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase">
                    <Compass className="w-3.5 h-3.5" style={{ color: '#E5C578' }} />
                    <span style={{ color: '#E5C578' }}>Sacred Directional Zone</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white leading-tight">
                    {activeElement.zone}
                  </h3>
                  <p className="text-xs text-[#E8E1D3]/80 font-sans italic">
                    {activeMeta.tagline}
                  </p>
                </div>
              </div>

              {/* Right Column: Element Details & Live Energy Wave */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between bg-white">
                <div>
                  {/* Header Title & Color Capsule */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-vastu-border pb-5 mb-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider font-semibold">
                        <span style={{ color: activeElement.colorHex }}>{activeElement.sanskritName}</span>
                        <span className="text-vastu-muted">•</span>
                        <span className="text-vastu-muted">{activeMeta.sanskritColor}</span>
                      </div>
                      <h3 className="font-serif text-3xl sm:text-4xl text-vastu-forest font-medium mt-1 flex items-center gap-3">
                        <span>{activeElement.name} Principle</span>
                        <span
                          className="text-xl font-bold font-serif opacity-80"
                          style={{ color: activeElement.colorHex }}
                          title={`Yantra Geometry: ${activeMeta.yantraShape}`}
                        >
                          {activeMeta.yantraSymbol}
                        </span>
                      </h3>
                    </div>

                    {/* Cosmic Color Hex & Frequency Pill */}
                    <div
                      className="flex items-center gap-3 px-4 py-2.5 rounded-md border text-xs font-sans shadow-xs"
                      style={{
                        backgroundColor: `${activeElement.colorHex}0C`,
                        borderColor: `${activeElement.colorHex}40`,
                      }}
                    >
                      <span
                        className="w-4 h-4 rounded-full shadow-md ring-2 ring-white flex-shrink-0 animate-pulse"
                        style={{ backgroundColor: activeElement.colorHex }}
                      />
                      <div className="flex flex-col">
                        <span className="font-bold font-mono text-xs" style={{ color: activeElement.colorHex }}>
                          {activeElement.colorHex}
                        </span>
                        <span className="text-[10px] text-vastu-muted font-sans font-medium">
                          {activeMeta.frequency} • {activeMeta.yantraShape.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-vastu-charcoal/90 font-sans leading-relaxed">
                    {activeElement.description}
                  </p>

                  {/* Dual Energy State Cards: Balanced vs Imbalanced */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {/* Balanced State Card with Accent Aura */}
                    <div
                      className="p-4 rounded border transition-all relative overflow-hidden"
                      style={{
                        backgroundColor: `${activeElement.colorHex}08`,
                        borderColor: `${activeElement.colorHex}35`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: activeElement.colorHex }}
                          />
                          <span
                            className="text-[11px] font-serif font-bold uppercase tracking-wider"
                            style={{ color: activeElement.colorHex }}
                          >
                            When Balanced:
                          </span>
                        </div>
                        <Activity className="w-3.5 h-3.5 opacity-60" style={{ color: activeElement.colorHex }} />
                      </div>
                      <ul className="space-y-1.5">
                        {activeElement.qualities.map((q, idx) => (
                          <li key={idx} className="text-xs text-vastu-charcoal font-sans flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: activeElement.colorHex }} />
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Imbalance Signs Card */}
                    <div className="bg-rose-50/70 p-4 rounded border border-rose-200/70">
                      <div className="flex items-center gap-1.5 text-[11px] font-serif font-bold text-rose-800 uppercase tracking-wider mb-2.5">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                        <span>Signs of Imbalance:</span>
                      </div>
                      <p className="text-xs text-rose-950 font-sans leading-relaxed">
                        {activeElement.imbalanceSigns}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actionable Harmonization Card with Radiant Border */}
                <div
                  className="bg-[#FAF7F2] p-4 sm:p-5 rounded-sm border-l-4 shadow-sm relative overflow-hidden mt-6"
                  style={{
                    borderLeftColor: activeElement.colorHex,
                    borderTop: '1px solid #DED7C9',
                    borderRight: '1px solid #DED7C9',
                    borderBottom: '1px solid #DED7C9',
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-vastu-gold" />
                      <span className="text-xs font-serif font-bold text-vastu-forest uppercase tracking-wider">
                        How to Harmonize in Your Space:
                      </span>
                    </div>
                    {/* Live Frequency Pulses */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((bar) => (
                        <motion.span
                          key={bar}
                          animate={{ height: ['6px', '14px', '6px'] }}
                          transition={{
                            duration: 0.8 + bar * 0.15,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="w-1 rounded-full"
                          style={{ backgroundColor: activeElement.colorHex }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-vastu-charcoal font-sans leading-relaxed">
                    {activeElement.balancingAction}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
