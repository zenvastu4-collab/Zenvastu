export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'Wealth & Prosperity' | 'Meditation & Clarity' | 'Sacred Geometry' | 'Ritual & Purification' | 'Spiritual Protection';
  element: string;
  elementColor: string;
  description: string;
  symbolism: string[];
  quote: string;
  vastuPlacement: string;
  dimensions?: string;
  material?: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export interface VastuDirection {
  code: string;
  name: string;
  sanskritName: string;
  rulingDeity: string;
  rulingPlanet: string;
  element: string;
  colorHex: string;
  bgGradient: string;
  keyBenefits: string;
  idealFor: string[];
  avoidHere: string[];
  remedyTips: string;
  recommendedProducts: string[];
}

export interface VastuElement {
  id: string;
  name: string;
  sanskritName: string;
  zone: string;
  colorHex: string;
  bgLight: string;
  description: string;
  qualities: string[];
  imbalanceSigns: string;
  balancingAction: string;
  image: string;
}

export interface ConsultationService {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  duration: string;
  format: 'Online Video / CAD' | 'On-Site Visit' | 'Hybrid';
  image: string;
  colorHex: string;
  deliverables: string[];
  suitableFor: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  content: string[];
  quote: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  propertyType: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

// REAL CLIENT PRODUCTS WITH AUTHENTIC CONSECRATED ARTIFACT PHOTOGRAPHY
export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'illuminated-crystal',
    name: 'Illuminated Crystal — The Light Within',
    subtitle: 'A Symbol of Clarity, Intuition & Inner Awareness',
    price: 4200,
    originalPrice: 4800,
    image: '/vastu/IMG-20260818-WA0017.jpg',
    category: 'Meditation & Clarity',
    element: 'Akash (Space) & Agni (Light)',
    elementColor: '#9B8F77',
    description: 'A beautiful interplay of crystal, light, and intention, this illuminated crystal creates a captivating focal point for spaces dedicated to meditation, reflection, relaxation, and spiritual practice. Its luminous purple radiance is traditionally associated with intuition, inner wisdom, tranquillity, and higher awareness.',
    symbolism: [
      'Purple Light — Intuition, awareness & inner wisdom',
      'Crystal — Clarity, focus & conscious intention',
      'Light — Illumination, transformation & awakening',
      'Natural Form — Grounding, harmony & connection with nature'
    ],
    quote: 'When the inner light awakens, darkness does not need to be removed — it simply fades.',
    vastuPlacement: 'Meditation corner, North-East (Ishanya) zone, or study desk to awaken higher clarity.',
    dimensions: '14 × 14 × 18 cm',
    material: 'Natural Healing Crystal with Warm LED Base',
    inStock: true,
    rating: 5.0,
    reviewsCount: 38,
  },
  {
    id: 'prod-2',
    slug: 'kuber-guardian-abundance',
    name: 'Kuber — The Guardian of Abundance',
    subtitle: 'Where Prosperity Begins with Balance',
    price: 3800,
    originalPrice: 4500,
    image: '/vastu/IMG-20260818-WA0018.jpg',
    category: 'Wealth & Prosperity',
    element: 'Prithvi (Earth) & Jal (Water)',
    elementColor: '#8B5E3C',
    description: 'In the ancient wisdom of Vastu Shastra, Kuber is revered as the guardian of wealth and abundance. Yet, his significance extends far beyond material prosperity. Kuber represents the deeper essence of abundance — a harmonious balance of wealth, wisdom, gratitude, integrity, and generosity.',
    symbolism: [
      'North Zone — Governs the flow of new opportunities and financial liquidity',
      'Wisdom & Integrity — Sustained growth anchored in ethical living',
      'Gratitude & Generosity — Circulating energy freely to invite more abundance',
      'Reverence — Respecting resources as divine cosmic trust'
    ],
    quote: 'True prosperity is not simply about acquiring more; it is about creating the right environment to receive, nurture, and sustain abundance in our lives.',
    vastuPlacement: 'North zone (Kuber Sthan) facing North or East, cash lockers, or office executive suites.',
    dimensions: '12 × 10 × 16 cm',
    material: 'Sacred Brass & Bronze Alloy with Antique Patina',
    inStock: true,
    rating: 4.9,
    reviewsCount: 52,
  },
  {
    id: 'prod-3',
    slug: 'sacred-cash-box',
    name: 'Sacred Cash Box — Financial Consciousness',
    subtitle: 'Where Wealth Meets Responsibility',
    price: 2950,
    originalPrice: 3400,
    image: '/vastu/IMG-20260818-WA0019.jpg',
    category: 'Wealth & Prosperity',
    element: 'Prithvi (Earth)',
    elementColor: '#8B5E3C',
    description: 'A cash box is more than a place to store money. It represents our relationship with wealth — built on responsibility, trust, discipline, and integrity. Traditionally crafted from auspicious wood associated with prosperity, bringing together timeless Vastu symbolism with conscious financial discipline.',
    symbolism: [
      'Auspicious Sacred Wood — Earth grounding to stabilize money outflows',
      'Responsibility & Trust — Nurturing an attitude of clear financial order',
      'Conscious Storage — Keeping wealth organized and dignified',
      'Wealth Preservation — Honoring money with daily gratitude'
    ],
    quote: 'When prosperity is valued with gratitude and responsibility, abundance becomes more meaningful.',
    vastuPlacement: 'North or South-West zone (hinge opening towards North), accounts cabin, or family safe.',
    dimensions: '22 × 15 × 11 cm',
    material: 'Seasoned Rosewood & Solid Brass Accents',
    inStock: true,
    rating: 4.8,
    reviewsCount: 29,
  },
  {
    id: 'prod-4',
    slug: 'crystal-wheel-abundance',
    name: 'Crystal Wheel — The Geometry of Abundance',
    subtitle: 'A Symbol of Balanced Energy & Multidimensional Prosperity',
    price: 4500,
    originalPrice: 5200,
    image: '/vastu/IMG-20260818-WA0020.jpg',
    category: 'Sacred Geometry',
    element: 'Akash (Space) & Panchamahabhutas',
    elementColor: '#C5A059',
    description: 'The Crystal Wheel is a powerful symbolic representation of abundance, clarity, and harmonious energy. At its centre, the crystal sphere represents wholeness and primal energy source. Surrounding it, seven carefully placed crystals symbolise the balanced movement of energy across all dimensions of life.',
    symbolism: [
      'Receive with openness — Unlocking blocked energy paths',
      'Create with integrity — Pure intentional focus',
      'Preserve with wisdom — Sustainable retention of wealth',
      'Share with generosity & Appreciate with gratitude'
    ],
    quote: 'When receiving and giving are in balance, abundance flows with greater ease.',
    vastuPlacement: 'Central Brahmasthan, living room credenza, or conference room table.',
    dimensions: '18 × 18 × 14 cm',
    material: 'Natural Quartz Spheres on Hand-Finished Brass Mandala',
    inStock: true,
    rating: 5.0,
    reviewsCount: 44,
  },
  {
    id: 'prod-5',
    slug: 'crystal-pyramid-shri-yantra',
    name: 'Crystal Pyramid with Shri Yantra',
    subtitle: 'The Power of Sacred Geometry — Where Intention Meets Energy',
    price: 3400,
    originalPrice: 3900,
    image: '/vastu/IMG-20260818-WA0021.jpg',
    category: 'Sacred Geometry',
    element: 'Agni (Fire) & Akash (Space)',
    elementColor: '#B44436',
    description: 'Brings together sacred geometry, crystal energy, and the apex power of the pyramid to represent harmony, clarity, prosperity, and spiritual growth. At its heart lies the Shri Yantra, an ancient geometric form symbolising the divine union of Shiva and Shakti — complementary cosmic forces.',
    symbolism: [
      'Shri Yantra — Divine cosmic harmony, abundance & balance',
      'Pyramid Structure — Focus, stability & upward energy movement',
      'Pure Crystal — Amplification of thoughts, prayers and intentions',
      'Earth Elements — Grounding, stability & cosmic alignment'
    ],
    quote: 'When intention becomes clear, energy finds direction; and when energy finds direction, creation begins.',
    vastuPlacement: 'North-East (Ishanya), pooja altar, study desk, or business entrance console.',
    dimensions: '10 × 10 × 10 cm',
    material: 'Optical Grade Crystal with 24K Gold Plated Shri Yantra Core',
    inStock: true,
    rating: 4.9,
    reviewsCount: 63,
  },
  {
    id: 'prod-6',
    slug: 'sacred-shankh-purity',
    name: 'Sacred Shankh — The Sound of Purity',
    subtitle: 'A Sacred Vibration That Awakens & Harmonises',
    price: 2800,
    originalPrice: 3300,
    image: '/vastu/IMG-20260818-WA0022.jpg',
    category: 'Ritual & Purification',
    element: 'Jal (Water) & Akash (Sound)',
    elementColor: '#34657F',
    description: 'The Shankh (Conch) is revered as a sacred symbol of purity, auspiciousness, protection, and divine abundance. Its powerful resonance purifies the atmosphere and invites deep harmony into the space. Its spiral form carries the journey from outer noise towards inner stillness.',
    symbolism: [
      'Sacred Spiral — Journey of consciousness from movement towards silence',
      'Lord Vishnu Vibration — Invocating positive vibrations during pooja',
      'Atmospheric Purification — Dispersing heavy electromagnetic static',
      'Divine Protection — Warding off negative planetary influences'
    ],
    quote: 'Sound, intention, and consciousness transform the physical and energetic experience of a space.',
    vastuPlacement: 'Pooja room, North-East zone, or near water features on a brass stand.',
    dimensions: '16 × 9 × 8 cm',
    material: 'Natural Ocean Conch with Carved Brass Mount',
    inStock: true,
    rating: 4.9,
    reviewsCount: 31,
  },
  {
    id: 'prod-7',
    slug: 'himalayan-organic-dhoop',
    name: 'Himalayan Dhoop — Purifying Essence of Tradition',
    subtitle: 'Cleanse the Space. Elevate the Atmosphere.',
    price: 850,
    originalPrice: 1050,
    image: '/vastu/IMG-20260818-WA0023.jpg',
    category: 'Ritual & Purification',
    element: 'Agni (Fire) & Vayu (Air)',
    elementColor: '#52795D',
    description: 'Rooted in traditional Indian practices, crafted using indigenous cow dung along with Himalayan herbs, natural resins, and sacred spices. When gently burned, its fragrant smoke transforms the ambience, cleansing stagnant energies and creating a sanctified sanctuary.',
    symbolism: [
      'Purification — Refreshing the subtle energetic atmosphere of the home',
      'Harmony — Creating a calm, grounded and sacred ambience',
      'Tradition — Preserving an age-old Vedic space-cleansing ritual',
      'Connection — Infusing raw natural botanical elements into everyday living'
    ],
    quote: 'From the richness of the earth to the healing traditions of the Himalayas, every element carries a story of nature and heritage.',
    vastuPlacement: 'Burn in South-East or circulate in a clockwise path through all rooms at sunrise and sunset.',
    dimensions: 'Box of 30 Premium Dhoop Sticks + Ceramic Holder',
    material: '100% Charcoal-Free Himalayan Herbs, Guggal, Loban & Cow Dung',
    inStock: true,
    rating: 4.8,
    reviewsCount: 76,
  },
  {
    id: 'prod-8',
    slug: 'shiva-lingam-rudraksha',
    name: 'Shiva Lingam & Rudraksha — Stillness & Strength',
    subtitle: 'The Essence of Shiva Within — Stillness, Creation & Awakening',
    price: 3200,
    originalPrice: 3800,
    image: '/vastu/IMG-20260818-WA0024.jpg',
    category: 'Spiritual Protection',
    element: 'Prithvi (Earth) & Akash (Cosmic Space)',
    elementColor: '#1B382B',
    description: 'The Shiva Lingam represents the timeless essence of pure consciousness — a symbol of stillness, creation, transformation, and the eternal rhythm of existence. Paired with authentic Rudraksha beads, it reminds us that beneath the movement of life lies a deeper state of calm and eternal awareness.',
    symbolism: [
      'Shiva Lingam — Pure unmanifest consciousness and center of stillness',
      'Rudraksha — Spiritual strength, aura protection and mental poise',
      'Journey Inward — From outer restlessness to deep inner awareness',
      'Transformation — Dissolving stagnation into purposeful evolution'
    ],
    quote: 'Be still like Shiva. Be aware like Rudraksha. Let inner awareness transform your outer world.',
    vastuPlacement: 'North-East (Ishanya) corner, personal altar, or quiet reading alcove.',
    dimensions: '11 × 11 × 14 cm',
    material: 'Natural Narmadeshwar Stone with 5-Mukhi Panchmukhi Rudraksha',
    inStock: true,
    rating: 5.0,
    reviewsCount: 41,
  },
  {
    id: 'prod-9',
    slug: 'gomti-chakra-prosperity-tree',
    name: 'Gomti Chakra Tree — The Growth of Abundance',
    subtitle: 'A Symbol of Prosperity, Protection & Positive Energy',
    price: 2650,
    originalPrice: 3100,
    image: '/vastu/IMG-20260818-WA0025.jpg',
    category: 'Wealth & Prosperity',
    element: 'Jal (Water) & Prithvi (Earth)',
    elementColor: '#34657F',
    description: 'The Gomti Chakra Tree combines the symbolism of nature with the auspicious energy of Gomti Chakras. Naturally occurring spiral shells associated with Lord Vishnu and Goddess Lakshmi, arranged in a flourishing tree formation symbolizing continuous growth, grounding, and prosperity.',
    symbolism: [
      'Gomti Chakra — Sacred spiral of cosmic energy & divine protection',
      'Flourishing Tree — Grounded stability expanding into multi-branched growth',
      'Continuous Flow — Evolution and positive financial movement',
      'Harmonious Arrangement — Intention rooted in sacred geometry'
    ],
    quote: 'Just as a tree grows from a single seed into abundance, may every positive intention take root, flourish, and reach its fullest expression.',
    vastuPlacement: 'North or East zone, cashier desk, living room sideboard, or study.',
    dimensions: '15 × 15 × 20 cm',
    material: 'Natural Sacred Gomti Chakras on Copper Wire & Wooden Base',
    inStock: true,
    rating: 4.9,
    reviewsCount: 58,
  }
];

// 8 VASTU DIRECTIONS & BRAHMASTHAN
export const VASTU_DIRECTIONS: VastuDirection[] = [
  {
    code: 'N',
    name: 'North',
    sanskritName: 'Uttar (उत्तर)',
    rulingDeity: 'Lord Kuber (Wealth & Treasury)',
    rulingPlanet: 'Mercury (Budha)',
    element: 'Jal (Water)',
    colorHex: '#34657F',
    bgGradient: 'from-blue-900/20 to-emerald-900/20',
    keyBenefits: 'Attracts new financial opportunities, career growth, cash flow, and commercial expansion.',
    idealFor: ['Cash Box & Safe', 'Living Room', 'Main Entrance', 'Water Fountains', 'Open Green Spaces'],
    avoidHere: ['Heavy Master Bedroom', 'Toilets / Waste', 'Kitchen / Fire elements', 'Clutter & Storage'],
    remedyTips: 'Place the Sacred Cash Box or Kuber idol here. Keep this area lightweight, illuminated, and clean.',
    recommendedProducts: ['sacred-cash-box', 'kuber-guardian-abundance', 'gomti-chakra-prosperity-tree'],
  },
  {
    code: 'NE',
    name: 'North-East',
    sanskritName: 'Ishanya (ईशान्य)',
    rulingDeity: 'Lord Shiva (Pure Consciousness)',
    rulingPlanet: 'Jupiter (Brihaspati)',
    element: 'Jal (Water) & Akash (Space)',
    colorHex: '#C5A059',
    bgGradient: 'from-amber-900/20 to-sky-900/20',
    keyBenefits: 'Supreme spiritual energy, clarity of thought, intuition, divine blessings, and mental peace.',
    idealFor: ['Pooja Altar / Mandir', 'Meditation Corner', 'Study & Reading', 'Underground Water Tank'],
    avoidHere: ['Kitchen / Cooking Fire', 'Toilets & Septic Tank', 'Heavy Wardrobes', 'Dustbins / Junk'],
    remedyTips: 'Place the Crystal Pyramid with Shri Yantra or Shiva Lingam & Rudraksha. Maintain utmost sanctity.',
    recommendedProducts: ['crystal-pyramid-shri-yantra', 'illuminated-crystal', 'shiva-lingam-rudraksha'],
  },
  {
    code: 'E',
    name: 'East',
    sanskritName: 'Poorva (पूर्व)',
    rulingDeity: 'Lord Indra & Surya Dev (Vitality & Honor)',
    rulingPlanet: 'Sun (Surya)',
    element: 'Vayu (Air) & Agni (Light)',
    colorHex: '#52795D',
    bgGradient: 'from-emerald-900/20 to-amber-900/20',
    keyBenefits: 'Social connectivity, government relations, vitality, public recognition, and positive health.',
    idealFor: ['Main Entrance', 'Balconies & Large Windows', 'Living Room', 'Children Study Area'],
    avoidHere: ['High boundary walls', 'Heavy storage', 'Dark enclosed rooms', 'Toilets'],
    remedyTips: 'Allow morning sunlight to penetrate. Place green lush plants and the Gomti Chakra Tree.',
    recommendedProducts: ['gomti-chakra-prosperity-tree', 'sacred-shankh-purity'],
  },
  {
    code: 'SE',
    name: 'South-East',
    sanskritName: 'Agneya (आग्नेय)',
    rulingDeity: 'Agni Dev (Fire & Transformation)',
    rulingPlanet: 'Venus (Shukra)',
    element: 'Agni (Fire)',
    colorHex: '#B44436',
    bgGradient: 'from-rose-900/20 to-amber-900/20',
    keyBenefits: 'Cash liquidity, digestion, passion, active energy, speed of decision-making, and marital warmth.',
    idealFor: ['Kitchen & Cooking Range', 'Electrical Panel & Inverter', 'Boiler / Geyser', 'Candles & Lamps'],
    avoidHere: ['Water features / Aquariums', 'Master Bedroom', 'Underground Water Tanks', 'Blue/Black colors'],
    remedyTips: 'Burn Himalayan Organic Dhoop daily. Use warm lighting and copper/brass remedial elements.',
    recommendedProducts: ['himalayan-organic-dhoop', 'crystal-pyramid-shri-yantra'],
  },
  {
    code: 'S',
    name: 'South',
    sanskritName: 'Dakshin (दक्षिण)',
    rulingDeity: 'Lord Yama (Dharma & Justice)',
    rulingPlanet: 'Mars (Mangal)',
    element: 'Prithvi (Earth) & Agni (Fire)',
    colorHex: '#8B5E3C',
    bgGradient: 'from-orange-900/20 to-red-900/20',
    keyBenefits: 'Fame, reputation, relaxation, deep restorative sleep, legal stability, and brand recognition.',
    idealFor: ['Master Bedroom', 'CEO / Manager Cabin', 'Heavy Furniture', 'Storeroom'],
    avoidHere: ['Main Entrance (without remedial grid)', 'Water tanks', 'Underground bores', 'Temple / Pooja'],
    remedyTips: 'Keep south walls elevated and heavier than north walls. Use warm terracotta and earth tones.',
    recommendedProducts: ['kuber-guardian-abundance', 'shiva-lingam-rudraksha'],
  },
  {
    code: 'SW',
    name: 'South-West',
    sanskritName: 'Nairutya (नैऋत्य)',
    rulingDeity: 'Nirriti (Earth Strength & Stability)',
    rulingPlanet: 'Rahu (Mastery & Dominance)',
    element: 'Prithvi (Earth)',
    colorHex: '#73482C',
    bgGradient: 'from-amber-950/25 to-stone-900/25',
    keyBenefits: 'Ultimate stability, leadership authority, family harmony, financial accumulation, and longevity.',
    idealFor: ['Head of Family Bedroom', 'Owner / Chairman Desk', 'Heavy Master Wardrobes', 'Safe Lockers'],
    avoidHere: ['Main Entrance', 'Toilets / Septic Tanks', 'Borewells / Water Cuts', 'Pooja Mandir'],
    remedyTips: 'Keep highest and heaviest zone. Place Sacred Cash Box and solid brass grounding artifacts.',
    recommendedProducts: ['sacred-cash-box', 'kuber-guardian-abundance'],
  },
  {
    code: 'W',
    name: 'West',
    sanskritName: 'Pashchim (पश्चिम)',
    rulingDeity: 'Lord Varuna (Water & Profits)',
    rulingPlanet: 'Saturn (Shani)',
    element: 'Vayu (Air) & Metal',
    colorHex: '#4A6984',
    bgGradient: 'from-slate-900/20 to-blue-900/20',
    keyBenefits: 'Realization of profits, business gains, customer retention, fulfillment of desires, and savings.',
    idealFor: ['Dining Room', 'Children Bedroom', 'Study Cabin', 'Overhead Water Tank'],
    avoidHere: ['Main entrance facing NW-W cuts', 'Underground water sumps', 'Dark clutter'],
    remedyTips: 'Great location for dining with family. Place the Crystal Wheel to harmonize multi-stream gains.',
    recommendedProducts: ['crystal-wheel-abundance', 'sacred-shankh-purity'],
  },
  {
    code: 'NW',
    name: 'North-West',
    sanskritName: 'Vayavya (वायव्य)',
    rulingDeity: 'Vayu Dev (Air & Movement)',
    rulingPlanet: 'Moon (Chandra)',
    element: 'Vayu (Air)',
    colorHex: '#52795D',
    bgGradient: 'from-teal-900/20 to-stone-900/20',
    keyBenefits: 'Support from banks, business partners, guests, staff loyalty, travel, and smooth dispatch of goods.',
    idealFor: ['Guest Bedroom', 'Finished Goods Dispatch', 'Daughter Bedroom', 'Vehicle Parking', 'Air Bells'],
    avoidHere: ['Master Bedroom', 'Heavy Permanent Storage', 'Pooja Altar', 'Fire / Kitchen'],
    remedyTips: 'Ensure free air movement. Place wind chimes or Himalayan Dhoop to activate supportive social networks.',
    recommendedProducts: ['himalayan-organic-dhoop', 'crystal-wheel-abundance'],
  },
  {
    code: 'BS',
    name: 'Brahmasthan',
    sanskritName: 'Center (ब्रह्मस्थान)',
    rulingDeity: 'Lord Brahma (Creator of the Universe)',
    rulingPlanet: 'Cosmic Center',
    element: 'Akash (Pure Space & Ether)',
    colorHex: '#C5A059',
    bgGradient: 'from-amber-900/30 to-emerald-900/30',
    keyBenefits: 'The cosmic navel of the property; circulates life-force prana energy to all 8 surrounding quadrants.',
    idealFor: ['Open Courtyard / Atrium', 'Lobby / Central Passage', 'Crystal Wheel Installation', 'Soft Lighting'],
    avoidHere: ['Pillars / Heavy Load Columns', 'Toilets / Septic Tanks', 'Kitchen / Fire', 'Staircases'],
    remedyTips: 'Must be kept lightweight, pristine, and clutter-free. Place the Crystal Wheel or Sacred Mandala here.',
    recommendedProducts: ['crystal-wheel-abundance', 'crystal-pyramid-shri-yantra'],
  },
];

// 5 SACRED ELEMENTS (PANCHAMAHABHUTAS)
export const FIVE_ELEMENTS: VastuElement[] = [
  {
    id: 'prithvi',
    name: 'Earth',
    sanskritName: 'Prithvi (पृथ्वी)',
    zone: 'South-West (Nairutya)',
    colorHex: '#8B5E3C',
    bgLight: '#F5ECE3',
    description: 'Represents stability, structural strength, grounded authority, and sustained financial accumulation. It anchors the physical and psychological foundation of the home.',
    qualities: ['Grounded Mindset', 'Leadership Authority', 'Wealth Retention', 'Emotional Resilience'],
    imbalanceSigns: 'Constant instability, frequent shifting, insecure career, and inability to save money.',
    balancingAction: 'Incorporate heavy natural stone, warm terracotta pottery, and the Sacred Cash Box in the South-West.',
    image: 'https://images.pexels.com/photos/14781780/pexels-photo-14781780.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  },
  {
    id: 'jal',
    name: 'Water',
    sanskritName: 'Jal (जल)',
    zone: 'North & North-East (Ishanya)',
    colorHex: '#34657F',
    bgLight: '#E8F1F5',
    description: 'Symbolizes flow, purity, clarity of thought, opportunities, and emotional balance. Water governs the movement of wealth and new avenues of prosperity.',
    qualities: ['Fluid Opportunities', 'Emotional Peace', 'Spiritual Receptivity', 'Clarity of Vision'],
    imbalanceSigns: 'Blocked business deals, financial stagnation, mental fog, and restless anxiety.',
    balancingAction: 'Place still water bowls, the Sacred Shankh, or the Kuber idol in the North to activate liquidity.',
    image: 'https://images.pexels.com/photos/13752246/pexels-photo-13752246.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  },
  {
    id: 'agni',
    name: 'Fire',
    sanskritName: 'Agni (अग्नि)',
    zone: 'South-East (Agneya)',
    colorHex: '#B44436',
    bgLight: '#FAECE9',
    description: 'The source of dynamic energy, passion, metabolism, transformation, and motivation. Governs cash flow and the speed with which plans turn into tangible reality.',
    qualities: ['Drive & Vitality', 'Fast Decision Making', 'Health & Digestion', 'Charismatic Presence'],
    imbalanceSigns: 'Sluggishness, cash crunch, frequent accidents, digestive issues, and lack of enthusiasm.',
    balancingAction: 'Burn Himalayan Organic Dhoop daily and install the Crystal Pyramid in the South-East zone.',
    image: 'https://images.pexels.com/photos/3974152/pexels-photo-3974152.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  },
  {
    id: 'vayu',
    name: 'Air',
    sanskritName: 'Vayu (वायु)',
    zone: 'East & North-West (Vayavya)',
    colorHex: '#52795D',
    bgLight: '#EBF3ED',
    description: 'Represents movement, breath, communication, fresh perspectives, and supportive relationships. Governs smooth transitions and loyal partnerships.',
    qualities: ['Harmonious Communication', 'Smooth Logistics', 'Helpful Partnerships', 'Mental Freshness'],
    imbalanceSigns: 'Isolation, delayed shipments, lack of external support, and communication breakdowns.',
    balancingAction: 'Open North-West windows regularly and introduce delicate wind bells and lush natural greenery.',
    image: 'https://images.pexels.com/photos/13573493/pexels-photo-13573493.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  },
  {
    id: 'akash',
    name: 'Space',
    sanskritName: 'Akash (आकाश)',
    zone: 'Center (Brahmasthan) & North-East',
    colorHex: '#9B8F77',
    bgLight: '#F3EFE9',
    description: 'Ether / Pure Space provides the expansive vessel in which all other four elements interact. Governs higher purpose, intuition, expansion, and peace.',
    qualities: ['Infinite Possibility', 'Inner Stillness', 'Spiritual Awakening', 'Visionary Thinking'],
    imbalanceSigns: 'Feeling claustrophobic, lack of growth space, creative burnout, and narrow perspective.',
    balancingAction: 'Declutter the Brahmasthan center, use the Illuminated Crystal, and position the Crystal Wheel.',
    image: 'https://images.pexels.com/photos/31564207/pexels-photo-31564207.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  },
];

// HIGH-END CONSULTATION SERVICES WITH CLEAN ARCHITECTURAL PHOTOGRAPHY
export const CONSULTATIONS: ConsultationService[] = [
  {
    id: 'cons-home',
    slug: 'home-vastu',
    title: 'Residential / Home Vastu Audit',
    tagline: 'Harmonize your living sanctuary for health, peace and family prosperity.',
    shortDesc: 'A considered directional and energy analysis of your apartment, villa, or bungalow with 100% non-demolition remedies.',
    fullDesc: 'Your home is an extension of your bio-energetic field. Our residential Vastu consultation begins with a deep study of your floor plan, primary entrance orientation, room allocations (kitchen, master bedroom, mandir, study), and energetic flow across all 16 directional zones. We provide practical, non-destructive remedies using sacred geometry, metallic strips, color corrections, and sacred elemental artifacts.',
    price: 7500,
    duration: '90 – 120 Minutes',
    format: 'Hybrid',
    image: 'https://images.pexels.com/photos/13752246/pexels-photo-13752246.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    colorHex: '#8B5E3C',
    deliverables: [
      'Detailed 16-Zone Energy Grid Overlay on your CAD / PDF Floor Plan',
      'Entrance (Padavinyasa) Auspiciousness Assessment',
      'Room-by-Room Directional Optimization Guide',
      'Non-Demolition Vastu Remedies & Elemental Object Placement Plan',
      'Personal 1-on-1 Strategy Session with Senior Vastu Consultant',
      'Post-Audit Follow-up Call after 45 Days to track energetic shifts'
    ],
    suitableFor: ['Apartments & Flats', 'Independent Villas', 'Duplexes & Penthouses', 'Renovation Projects'],
  },
  {
    id: 'cons-office',
    slug: 'office-corporate-vastu',
    title: 'Office & Corporate Vastu',
    tagline: 'Enhance leadership clarity, team productivity and financial liquidity.',
    shortDesc: 'Custom workplace layout planning that aligns executive seating, accounts, and client zones for peak commercial performance.',
    fullDesc: 'Modern workspaces require a harmonious balance between open collaboration and authoritative focus. We evaluate the CEO / Director cabin placement, accounts department orientation in the Kuber zone, sales team motivation in the Agni zone, and client meeting rooms to maximize closed deals and employee retention.',
    price: 15000,
    duration: '2 Hours + Strategy Deck',
    format: 'Hybrid',
    image: 'https://images.pexels.com/photos/5547570/pexels-photo-5547570.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    colorHex: '#34657F',
    deliverables: [
      'Comprehensive Executive Cabin & Staff Seating Alignment Plan',
      'Cash Counter / Accounts Dept Directional Audit for Profit Retention',
      'Client Meeting Room & Negotiation Zone Energy Enhancement',
      'Customized Vastu Remedial Placement Matrix',
      'Executive Leadership Briefing & Team Alignment Guidelines'
    ],
    suitableFor: ['Corporate Headquarters', 'Startup Co-working Spaces', 'Consulting & Legal Offices', 'Retail Chains'],
  },
  {
    id: 'cons-factory',
    slug: 'factory-industrial-vastu',
    title: 'Industrial & Factory Vastu',
    tagline: 'Optimize manufacturing flow, machinery safety and uninterrupted output.',
    shortDesc: 'Strategic industrial layout design for raw material entry, heavy machinery load zones, boiler placement, and goods dispatch.',
    fullDesc: 'Industrial setups involve immense mechanical, thermal, and human energy. Aligning heavy machinery with the South-West, boilers/furnaces with the South-East, water reservoirs with the North-East, and finished goods with the North-West eliminates unexplained breakdowns, labor disputes, and dispatch bottlenecks.',
    price: 25000,
    duration: 'Full-Day Comprehensive Audit',
    format: 'On-Site Visit',
    image: 'https://images.pexels.com/photos/34718930/pexels-photo-34718930.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    colorHex: '#B44436',
    deliverables: [
      'Industrial Plant Layout & Flow Direction Diagram',
      'Heavy Machinery, Transformer & Boiler Placement Blueprint',
      'Raw Material Storage vs Finished Goods Dispatch Optimization',
      'Workforce Welfare & Accident-Prevention Zone Balancing',
      'Full On-Site Energy Scanning with Lecher Antenna / Geo-Sensors'
    ],
    suitableFor: ['Manufacturing Plants', 'Warehouses & Logistics Hubs', 'Food Processing Units', 'Chemical Refineries'],
  },
  {
    id: 'cons-online',
    slug: 'online-vastu-consultation',
    title: 'Global Online Vastu Consultation',
    tagline: 'Expert guidance wherever you are in the world.',
    shortDesc: 'Full CAD floor plan analysis and high-definition video consultation for international and remote clients.',
    fullDesc: 'Distance is no barrier to sacred Vedic architecture. Using Google Earth satellite orientation, compass degree calculations, and your architect floor plans, we deliver the exact same meticulous precision as an on-site consultation via interactive screen-sharing and detailed digital blueprints.',
    price: 5500,
    duration: '75 Minutes Video Call',
    format: 'Online Video / CAD',
    image: 'https://images.pexels.com/photos/3974152/pexels-photo-3974152.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    colorHex: '#C5A059',
    deliverables: [
      'Digital 16-Zone Grid Map with Degree Compass Alignment',
      'Comprehensive PDF Recommendation Report (15+ Pages)',
      'Recorded 1-on-1 Video Consultation Session',
      'Curated List of Non-Demolition Sacred Remedial Objects with Placement Photos',
      'Direct WhatsApp Support for 30 Days'
    ],
    suitableFor: ['Global NRI Clients', 'Remote Properties', 'Pre-Rental Decision Audits', 'Interior Design Phase'],
  },
];

// SACRED WISDOM ARTICLES WITH CLEAN ARCHITECTURAL PHOTOGRAPHY
export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    slug: 'entrance-as-first-impression',
    category: 'Vedic Architecture',
    title: 'The Entrance as a First Impression: Sacred Doorways & Energy Flow',
    date: '18 Aug 2026',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/13573493/pexels-photo-13573493.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    summary: 'How arrival, orientation, and the first few steps into a home shape the mental and energetic atmosphere of everyone who enters.',
    content: [
      'Every space begins with an arrival. Before we notice the furniture, the colour palette, or the architectural finish, we register the subtle quality of the threshold. In classical Vastu Shastra, the main entrance (Maha Dvara) is considered the mouth of the property (Mukhya) through which cosmic prana energy enters.',
      'Auspicious entrance positions along the 32 perimeter energy fields (such as Jayanta in the East or Mukhya in the North) bring vitality and sustained growth. If an entrance falls in a challenging zone, non-demolition remedies such as sacred brass thresholds, crystal pyramids, and specific metallic alignments neutralize negative currents without tearing down walls.',
      'Keeping the entryway well-illuminated, clutter-free, and blessed with natural elements instantly elevates the vibration of the entire dwelling.'
    ],
    quote: 'The entrance does not merely welcome guests — it sets the energetic tone for how life is experienced inside.',
  },
  {
    id: 'art-2',
    slug: 'sound-of-shankh-purification',
    category: 'Sacred Rituals',
    title: 'The Sacred Resonance of Shankh: Purifying the Atmospheric Aura',
    date: '14 Aug 2026',
    readTime: '5 min read',
    image: '/vastu/IMG-20260818-WA0022.jpg',
    summary: 'How sound waves and sacred geometry in the conch shell dispel electromagnetic static and invoke deep stillness.',
    content: [
      'Sound has always been the primary medium of cosmic creation. In Vedic tradition, the sacred Shankh carries the primordial vibration of Om. When blown or simply kept reverently in the North-East zone, its natural logarithmic spiral geometry acts as a natural harmonic resonator.',
      'Modern environmental studies show that enclosed spaces accumulate static energetic friction from electronic appliances, Wi-Fi radiation, and emotional stress. The acoustic frequency of a genuine sacred conch dissipates this heaviness, restoring atmospheric purity.',
      'Combined with the gentle burning of Himalayan herbs and pure dhoop, sound transforms ordinary rooms into sanctified havens of peace.'
    ],
    quote: 'When sound moves with sacred intention, the noise of the world softens into the silence of being.',
  },
  {
    id: 'art-3',
    slug: 'kuber-north-zone-wealth',
    category: 'Abundance & Flow',
    title: 'The North Zone of Kuber: Aligning Spaces for Financial Abundance',
    date: '08 Aug 2026',
    readTime: '6 min read',
    image: '/vastu/IMG-20260818-WA0018.jpg',
    summary: 'Understanding the relationship between physical direction, financial consciousness, and the flow of opportunities.',
    content: [
      'Lord Kuber governs the northern quadrant of every plot, building, and individual room. In Vastu philosophy, the North is governed by the water element and the planet Mercury — the planetary archetype of intellect, commerce, and communication.',
      'When the North zone is blocked by heavy storage, clutter, or fire elements (like kitchens or red walls), opportunities dry up and financial receivables get delayed. Conversely, keeping the North light, open, and adorned with the Sacred Cash Box or Kuber idol invites consistent commercial expansion.',
      'True wealth according to Vastu is not merely hoarding resources, but maintaining an uninterrupted flow of receiving with gratitude and giving with generosity.'
    ],
    quote: 'Abundance flourishes where there is clarity in thought, integrity in action, and balance in direction.',
  },
];

// TESTIMONIALS
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Vikramaditya Singhania',
    city: 'New Delhi',
    propertyType: '4-BHK Luxury Penthouse',
    rating: 5,
    comment: 'The non-demolition approach was a blessing. Rohit and the Zen Vastu team analyzed our floor plan with immense precision. Placing the Crystal Pyramid and correcting our entrance energy brought an immediate sense of calm and noticeable business breakthroughs within 60 days.',
    date: 'August 2026',
    service: 'Residential Vastu Audit',
  },
  {
    id: 't-2',
    name: 'Ananya & Rajesh Kulkarni',
    city: 'Mumbai',
    propertyType: 'Corporate Office (12,000 sq.ft)',
    rating: 5,
    comment: 'Our tech startup was experiencing strange friction in sales and high employee turnover. Following the Zen Vastu corporate layout adjustments — realigning the accounts desk to North and executive cabins to South-West — brought harmony and closed our Series A funding.',
    date: 'July 2026',
    service: 'Corporate Vastu Consultation',
  },
  {
    id: 't-3',
    name: 'Sameer Merchant',
    city: 'Dubai / London',
    propertyType: 'International Villa (Online Consultation)',
    rating: 5,
    comment: 'I was initially skeptical about online consultations, but the depth of the 16-zone CAD blueprint and video briefing was phenomenal. The Sacred Cash Box and Gomti Chakra Tree arrived in pristine packaging and transformed our living room.',
    date: 'June 2026',
    service: 'Global Online Consultation',
  },
];

// THE ZEN VASTU 4-STAGE METHODOLOGY
export const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Understand & Audit',
    sanskritTag: 'निरीक्षण (Observation)',
    colorHex: '#8B5E3C',
    description: 'We review your architectural plans, exact satellite compass degrees, property history, and the specific personal or business goals you wish to unlock.',
  },
  {
    step: '02',
    title: '16-Zone Energy Mapping',
    sanskritTag: 'दिशा चक्र (Directional Grid)',
    colorHex: '#34657F',
    description: 'Using advanced Vedic directional calculations, we overlay the 16 subtle zones onto your floor plan, pinpointing active energy vortexes and subtle imbalances.',
  },
  {
    step: '03',
    title: 'Non-Demolition Remedies',
    sanskritTag: 'संशोधन (Harmonization)',
    colorHex: '#B44436',
    description: 'We formulate precise, zero-destruction remedies utilizing sacred geometry, metallic strips, crystal pyramids, elemental balancing, and color harmonies.',
  },
  {
    step: '04',
    title: 'Activation & Ongoing Flow',
    sanskritTag: 'प्राण प्रतिष्ठा (Energy Flow)',
    colorHex: '#52795D',
    description: 'We guide you through the sacred placement of energizing objects and conduct a scheduled follow-up audit to verify lasting peace, health, and prosperity.',
  },
];
