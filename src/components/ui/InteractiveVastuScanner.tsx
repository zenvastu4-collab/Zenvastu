import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card3D } from './Card3D';

interface RoomRule {
  room: string;
  bestZones: string[];
  goodZones: string[];
  doshaZones: string[];
  doshaImpact: string;
  remedy: string;
}

const ROOM_RULES: Record<string, RoomRule> = {
  'master-bedroom': {
    room: 'Master Bedroom',
    bestZones: ['South-West (SW)', 'South (S)'],
    goodZones: ['West (W)'],
    doshaZones: ['North-East (NE)', 'South-East (SE)', 'Center (BS)'],
    doshaImpact: 'Sleeping in NE causes mental restlessness and insomnia; SE causes marital friction and irritability.',
    remedy: 'Place the Sacred Cash Box or Brass grounding pyramid in SW; use warm earth tones and shift bed headboard towards South.',
  },
  'kitchen': {
    room: 'Kitchen & Cooking Range',
    bestZones: ['South-East (SE)', 'North-West (NW)'],
    goodZones: ['East (E)'],
    doshaZones: ['North-East (NE)', 'South-West (SW)', 'North (N)'],
    doshaImpact: 'Fire in NE destroys mental peace and spiritual clarity; in North drains liquidity and cash flow.',
    remedy: 'Install a green Baroda marble slab under the stove and place Himalayan Organic Dhoop & Crystal Pyramid in the SE corner.',
  },
  'pooja-mandir': {
    room: 'Pooja Room / Altar',
    bestZones: ['North-East (NE)', 'North (N)', 'East (E)'],
    goodZones: ['West (W)'],
    doshaZones: ['South-West (SW)', 'South (S)', 'Under Stairs'],
    doshaImpact: 'Temple in SW weakens head-of-family stability and causes heavy financial blockages.',
    remedy: 'Place the Crystal Pyramid with Shri Yantra and Sacred Shankh; maintain white and light gold lighting.',
  },
  'main-door': {
    room: 'Main Entrance (Maha Dvara)',
    bestZones: ['North (N)', 'North-East (NE)', 'East (E)'],
    goodZones: ['West (W)', 'North-West (NW)'],
    doshaZones: ['South-West (SW)', 'South-East (SE)'],
    doshaImpact: 'Entrance in SW causes severe financial drain and unexpected legal disputes.',
    remedy: 'Fix a brass threshold strip (Pattis) along the floor and position a 9-inch Crystal Pyramid above the door lintel.',
  },
  'cash-locker': {
    room: 'Cash Locker / Wealth Safe',
    bestZones: ['North (N)', 'South-West (SW)'],
    goodZones: ['West (W)'],
    doshaZones: ['South-East (SE)', 'North-East (NE)'],
    doshaImpact: 'Cash in SE causes rapid unplanned expenditure; in NE leads to money depletion without tracking.',
    remedy: 'Ensure the locker door opens towards the North. Place the Sacred Cash Box or Kuber Idol inside.',
  },
  'work-desk': {
    room: 'CEO / Executive Work Desk',
    bestZones: ['South-West (SW)', 'West (W)'],
    goodZones: ['North (N)', 'East (E)'],
    doshaZones: ['North-West (NW)', 'South-East (SE)'],
    doshaImpact: 'Seating in NW causes lack of employee retention and unstable business partnerships.',
    remedy: 'Position chair facing North or East with a solid wall behind; place the Crystal Wheel on the executive credenza.',
  },
};

const DIRECTIONS = [
  'North (N)',
  'North-East (NE)',
  'East (E)',
  'South-East (SE)',
  'South (S)',
  'South-West (SW)',
  'West (W)',
  'North-West (NW)',
  'Center (BS)',
];

export function InteractiveVastuScanner({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [selectedRoomKey, setSelectedRoomKey] = useState<string>('master-bedroom');
  const [selectedZone, setSelectedZone] = useState<string>('South-West (SW)');

  const currentRule = ROOM_RULES[selectedRoomKey];

  // Calculate Compatibility
  let score = 50;
  let status = 'Moderate Placement';
  let statusColor = 'text-amber-600 bg-amber-50 border-amber-200';

  if (currentRule.bestZones.some((z) => selectedZone.includes(z.split(' ')[0]))) {
    score = 98;
    status = 'Optimal Auspicious Alignment';
    statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  } else if (currentRule.goodZones.some((z) => selectedZone.includes(z.split(' ')[0]))) {
    score = 80;
    status = 'Favorable Secondary Zone';
    statusColor = 'text-sky-700 bg-sky-50 border-sky-200';
  } else if (currentRule.doshaZones.some((z) => selectedZone.includes(z.split(' ')[0]))) {
    score = 25;
    status = 'Active Vastu Dosha Detected';
    statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
  }

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF7F2] to-[#F4EDE2] border-b border-vastu-border relative overflow-hidden">
      {/* Background Sacred Geometric Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-vastu-gold animate-spin-slow" />
            <span>ऊर्जा विश्लेषण • Real-Time Vastu Energy Scanner</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
            Check Your Room’s Energy Compatibility
          </h2>
          <p className="mt-3 text-vastu-muted text-sm sm:text-base font-sans leading-relaxed">
            Select any room and its current directional position to analyze energy alignment and receive instant 100% non-demolition recommendations.
          </p>
        </div>

        {/* Bento Interactive Grid Scanner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Room & Direction Selectors */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step 1: Select Room Type */}
            <div className="bg-white p-6 rounded-sm border border-vastu-border shadow-sm space-y-3">
              <span className="text-xs font-serif font-bold text-vastu-forest uppercase tracking-wider block">
                1. Select Room / Architectural Feature:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(ROOM_RULES).map(([key, item]) => {
                  const isSelected = key === selectedRoomKey;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedRoomKey(key)}
                      className={`p-2.5 rounded-sm text-xs font-sans transition-all text-left border flex flex-col justify-between ${
                        isSelected
                          ? 'bg-vastu-forest text-white border-vastu-forest font-semibold shadow-sm'
                          : 'bg-[#FAF7F2] hover:bg-vastu-cream/60 text-vastu-charcoal border-vastu-border'
                      }`}
                    >
                      <span className="truncate">{item.room.split(' ')[0]}</span>
                      <span className="text-[10px] opacity-75 truncate">
                        {item.room.split(' ').slice(1).join(' ') || 'Zone'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Current Direction */}
            <div className="bg-white p-6 rounded-sm border border-vastu-border shadow-sm space-y-3">
              <span className="text-xs font-serif font-bold text-vastu-forest uppercase tracking-wider block">
                2. Select Its Current Direction / Location:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {DIRECTIONS.map((dir) => {
                  const isSelected = dir === selectedZone;
                  return (
                    <button
                      key={dir}
                      onClick={() => setSelectedZone(dir)}
                      className={`p-2.5 rounded-sm text-xs font-sans transition-all text-center border ${
                        isSelected
                          ? 'bg-[#C5A059] text-vastu-forestDark border-[#C5A059] font-bold shadow-sm'
                          : 'bg-[#FAF7F2] hover:bg-vastu-cream/60 text-vastu-charcoal border-vastu-border'
                      }`}
                    >
                      {dir}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Computed 3D Energy Report Card */}
          <div className="lg:col-span-6">
            <Card3D intensity={10} className="h-full">
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-vastu-border shadow-md flex flex-col justify-between space-y-6 h-full">
                {/* Result Header & Score Gauge */}
                <div>
                  <div className="flex items-center justify-between border-b border-vastu-border pb-4 mb-4">
                    <div>
                      <span className="text-xs font-sans text-vastu-terracotta uppercase tracking-wider font-semibold">
                        Instant Energy Analysis
                      </span>
                      <h3 className="font-serif text-2xl text-vastu-forest font-semibold mt-0.5">
                        {currentRule.room} in {selectedZone}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="font-serif font-bold text-3xl text-vastu-forest block leading-none">
                        {score}%
                      </span>
                      <span className="text-[10px] text-vastu-muted uppercase tracking-wider font-sans">
                        Vastu Score
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className={`p-3 rounded border text-xs font-sans font-semibold flex items-center gap-2 mb-6 ${statusColor}`}>
                    {score >= 80 ? (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span>{status}</span>
                  </div>

                  {/* Analysis Content */}
                  <div className="space-y-4">
                    {/* Impact Details */}
                    <div className="bg-[#FAF7F2] p-4 rounded border border-vastu-borderLight text-xs font-sans leading-relaxed">
                      <span className="font-serif font-bold text-vastu-forest uppercase tracking-wider block mb-1 text-[11px]">
                        Energetic Observation:
                      </span>
                      <p className="text-vastu-charcoal">
                        {score >= 80
                          ? `This placement harmonizes well with the planetary ruler and elemental flow of ${selectedZone}. It supports health, stability, and positive prana circulation.`
                          : currentRule.doshaImpact}
                      </p>
                    </div>

                    {/* Non-Demolition Remedy */}
                    <div className="bg-vastu-gold/10 p-4 rounded border border-vastu-gold/40 text-xs font-sans leading-relaxed">
                      <div className="flex items-center gap-1.5 font-serif font-bold text-vastu-forest uppercase tracking-wider text-[11px] mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-vastu-gold" />
                        <span>Recommended 100% Non-Demolition Remedy:</span>
                      </div>
                      <p className="text-vastu-charcoal">
                        {currentRule.remedy}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-vastu-border flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-vastu-muted font-sans">
                    <span>Need a complete 16-Zone CAD Blueprint?</span>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="bg-[#2D4536] hover:bg-[#1E3326] text-white px-5 py-2.5 rounded-sm text-xs font-sans font-semibold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>Consult Senior Expert</span>
                    <ArrowRight className="w-3.5 h-3.5 text-vastu-gold" />
                  </button>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
}
