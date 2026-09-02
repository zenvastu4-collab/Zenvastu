import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  CONSULTATIONS,
  FIVE_ELEMENTS,
  JOURNAL_ARTICLES,
  METHODOLOGY_STEPS,
  PRODUCTS,
  TESTIMONIALS,
  VASTU_DIRECTIONS,
  type ConsultationService,
  type JournalArticle,
  type Product,
  type Testimonial,
  type VastuDirection,
  type VastuElement,
} from '../data/vastuData';
import {
  DEFAULT_ABOUT_VALUES,
  DEFAULT_COMPARISONS,
  DEFAULT_COUPONS,
  DEFAULT_FOOTER_LINKS,
  DEFAULT_HERO_CATEGORIES,
  DEFAULT_HERO_HIGHLIGHTS,
  DEFAULT_MARQUEE,
  DEFAULT_NAV,
  DEFAULT_PROPERTY_TYPES,
  DEFAULT_TIME_SLOTS,
  SITE_COPY_DEFAULTS,
} from '../data/cmsDefaults';
import { asStringArray, DEFAULT_SETTINGS, type SiteSettings } from '../lib/cmsTypes';
import { supabase, whatsappUrl } from '../lib/supabase';

export interface NavItem {
  id?: string;
  label: string;
  section_id: string;
  sort_order: number;
  visible: boolean;
}

export interface IconItem {
  id?: string;
  title?: string;
  name?: string;
  text?: string;
  description?: string;
  tag?: string;
  code?: string;
  icon: string;
  sort_order: number;
  visible?: boolean;
}

export interface CmsState {
  loading: boolean;
  settings: SiteSettings;
  copyMap: Record<string, string>;
  navItems: NavItem[];
  marqueeItems: IconItem[];
  heroHighlights: IconItem[];
  heroCategories: IconItem[];
  products: Product[];
  directions: VastuDirection[];
  elements: VastuElement[];
  consultations: ConsultationService[];
  articles: JournalArticle[];
  testimonials: Testimonial[];
  methodologySteps: typeof METHODOLOGY_STEPS;
  comparisons: { id?: string; feature: string; traditional: string; zen_vastu: string; sort_order: number }[];
  aboutValues: IconItem[];
  footerLinks: { id?: string; group_name: string; label: string; section_id: string; url: string; sort_order: number; visible: boolean }[];
  coupons: { code: string; discount_percent: number; active: boolean }[];
  timeSlots: string[];
  propertyTypes: string[];
  copy: (key: string, fallback?: string) => string;
  waUrl: (message?: string) => string;
  refresh: () => Promise<void>;
}

const CmsContext = createContext<CmsState | null>(null);

function pick<T>(rows: T[] | null | undefined, fallback: T[]): T[] {
  return rows && rows.length > 0 ? rows : fallback;
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [copyMap, setCopyMap] = useState<Record<string, string>>(() =>
    Object.fromEntries(SITE_COPY_DEFAULTS.map((row) => [row.field_key, row.value]))
  );
  const [navItems, setNavItems] = useState<NavItem[]>(DEFAULT_NAV);
  const [marqueeItems, setMarqueeItems] = useState<IconItem[]>(DEFAULT_MARQUEE);
  const [heroHighlights, setHeroHighlights] = useState<IconItem[]>(DEFAULT_HERO_HIGHLIGHTS);
  const [heroCategories, setHeroCategories] = useState<IconItem[]>(DEFAULT_HERO_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [directions, setDirections] = useState<VastuDirection[]>(VASTU_DIRECTIONS);
  const [elements, setElements] = useState<VastuElement[]>(FIVE_ELEMENTS);
  const [consultations, setConsultations] = useState<ConsultationService[]>(CONSULTATIONS);
  const [articles, setArticles] = useState<JournalArticle[]>(JOURNAL_ARTICLES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [methodologySteps, setMethodologySteps] = useState(METHODOLOGY_STEPS);
  const [comparisons, setComparisons] = useState(DEFAULT_COMPARISONS);
  const [aboutValues, setAboutValues] = useState<IconItem[]>(DEFAULT_ABOUT_VALUES);
  const [footerLinks, setFooterLinks] = useState(DEFAULT_FOOTER_LINKS);
  const [coupons, setCoupons] = useState(DEFAULT_COUPONS);
  const [timeSlots, setTimeSlots] = useState(DEFAULT_TIME_SLOTS.map((s) => s.label));
  const [propertyTypes, setPropertyTypes] = useState(DEFAULT_PROPERTY_TYPES.map((s) => s.label));

  const refresh = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const [
      settingsRes,
      copyRes,
      navRes,
      marqueeRes,
      highlightsRes,
      categoriesRes,
      productsRes,
      directionsRes,
      elementsRes,
      consultationsRes,
      journalRes,
      testimonialsRes,
      stepsRes,
      comparisonsRes,
      aboutRes,
      footerRes,
      couponsRes,
      slotsRes,
      propertyRes,
    ] = await Promise.all([
      supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      supabase.from('site_copy').select('*').order('sort_order'),
      supabase.from('nav_items').select('*').eq('visible', true).order('sort_order'),
      supabase.from('marquee_items').select('*').eq('visible', true).order('sort_order'),
      supabase.from('hero_highlights').select('*').eq('visible', true).order('sort_order'),
      supabase.from('hero_categories').select('*').eq('visible', true).order('sort_order'),
      supabase.from('products').select('*').eq('published', true).order('sort_order'),
      supabase.from('directions').select('*').eq('published', true).order('sort_order'),
      supabase.from('elements').select('*').eq('published', true).order('sort_order'),
      supabase.from('consultations').select('*').eq('published', true).order('sort_order'),
      supabase.from('journal_articles').select('*').eq('published', true).order('sort_order'),
      supabase.from('testimonials').select('*').eq('published', true).order('sort_order'),
      supabase.from('methodology_steps').select('*').eq('published', true).order('sort_order'),
      supabase.from('methodology_comparisons').select('*').order('sort_order'),
      supabase.from('about_values').select('*').eq('visible', true).order('sort_order'),
      supabase.from('footer_links').select('*').eq('visible', true).order('sort_order'),
      supabase.from('coupons').select('*').eq('active', true),
      supabase.from('time_slots').select('*').eq('visible', true).order('sort_order'),
      supabase.from('property_types').select('*').eq('visible', true).order('sort_order'),
    ]);

    if (settingsRes.data) {
      setSettings({ ...DEFAULT_SETTINGS, ...settingsRes.data });
    }

    const defaults = Object.fromEntries(SITE_COPY_DEFAULTS.map((row) => [row.field_key, row.value]));
    if (copyRes.data?.length) {
      setCopyMap({
        ...defaults,
        ...Object.fromEntries(copyRes.data.map((row) => [row.field_key, row.value])),
      });
    }

    setNavItems(pick(navRes.data, DEFAULT_NAV));
    setMarqueeItems(pick(marqueeRes.data, DEFAULT_MARQUEE));
    setHeroHighlights(pick(highlightsRes.data, DEFAULT_HERO_HIGHLIGHTS));
    setHeroCategories(pick(categoriesRes.data, DEFAULT_HERO_CATEGORIES));

    if (productsRes.data?.length) {
      setProducts(
        productsRes.data.map((row) => ({
          id: row.id,
          slug: row.slug,
          name: row.name,
          subtitle: row.subtitle,
          price: Number(row.price),
          originalPrice: row.original_price ? Number(row.original_price) : undefined,
          image: row.image,
          category: row.category as Product['category'],
          element: row.element,
          elementColor: row.element_color,
          description: row.description,
          symbolism: asStringArray(row.symbolism),
          quote: row.quote,
          vastuPlacement: row.vastu_placement,
          dimensions: row.dimensions,
          material: row.material,
          inStock: row.in_stock,
          rating: Number(row.rating),
          reviewsCount: row.reviews_count,
        }))
      );
    }

    if (directionsRes.data?.length) {
      setDirections(
        directionsRes.data.map((row) => ({
          code: row.code,
          name: row.name,
          sanskritName: row.sanskrit_name,
          rulingDeity: row.ruling_deity,
          rulingPlanet: row.ruling_planet,
          element: row.element,
          colorHex: row.color_hex,
          bgGradient: row.bg_gradient,
          keyBenefits: row.key_benefits,
          idealFor: asStringArray(row.ideal_for),
          avoidHere: asStringArray(row.avoid_here),
          remedyTips: row.remedy_tips,
          recommendedProducts: asStringArray(row.recommended_products),
        }))
      );
    }

    if (elementsRes.data?.length) {
      setElements(
        elementsRes.data.map((row) => ({
          id: row.id,
          name: row.name,
          sanskritName: row.sanskrit_name,
          zone: row.zone,
          colorHex: row.color_hex,
          bgLight: row.bg_light,
          description: row.description,
          qualities: asStringArray(row.qualities),
          imbalanceSigns: row.imbalance_signs,
          balancingAction: row.balancing_action,
          image: row.image,
        }))
      );
    }

    if (consultationsRes.data?.length) {
      setConsultations(
        consultationsRes.data.map((row) => ({
          id: row.id,
          slug: row.slug,
          title: row.title,
          tagline: row.tagline,
          shortDesc: row.short_desc,
          fullDesc: row.full_desc,
          price: Number(row.price),
          duration: row.duration,
          format: row.format as ConsultationService['format'],
          image: row.image,
          colorHex: row.color_hex,
          deliverables: asStringArray(row.deliverables),
          suitableFor: asStringArray(row.suitable_for),
        }))
      );
    }

    if (journalRes.data?.length) {
      setArticles(
        journalRes.data.map((row) => ({
          id: row.id,
          slug: row.slug,
          category: row.category,
          title: row.title,
          date: row.date,
          readTime: row.read_time,
          image: row.image,
          summary: row.summary,
          content: asStringArray(row.content),
          quote: row.quote,
        }))
      );
    }

    if (testimonialsRes.data?.length) {
      setTestimonials(
        testimonialsRes.data.map((row) => ({
          id: row.id,
          name: row.name,
          city: row.city,
          propertyType: row.property_type,
          rating: row.rating,
          comment: row.comment,
          date: row.date,
          service: row.service,
        }))
      );
    }

    if (stepsRes.data?.length) {
      setMethodologySteps(
        stepsRes.data.map((row) => ({
          step: row.step,
          title: row.title,
          sanskritTag: row.sanskrit_tag,
          colorHex: row.color_hex,
          description: row.description,
        }))
      );
    }

    setComparisons(pick(comparisonsRes.data, DEFAULT_COMPARISONS));
    setAboutValues(pick(aboutRes.data, DEFAULT_ABOUT_VALUES));
    setFooterLinks(pick(footerRes.data, DEFAULT_FOOTER_LINKS));
    setCoupons(pick(couponsRes.data, DEFAULT_COUPONS));
    if (slotsRes.data?.length) setTimeSlots(slotsRes.data.map((row) => row.label));
    if (propertyRes.data?.length) setPropertyTypes(propertyRes.data.map((row) => row.label));
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const copy = useCallback(
    (key: string, fallback = '') => copyMap[key] ?? fallback,
    [copyMap]
  );

  const waUrl = useCallback(
    (message?: string) => whatsappUrl(settings.whatsapp_number, message || settings.whatsapp_message),
    [settings]
  );

  const value = useMemo<CmsState>(
    () => ({
      loading,
      settings,
      copyMap,
      navItems,
      marqueeItems,
      heroHighlights,
      heroCategories,
      products,
      directions,
      elements,
      consultations,
      articles,
      testimonials,
      methodologySteps,
      comparisons,
      aboutValues,
      footerLinks,
      coupons,
      timeSlots,
      propertyTypes,
      copy,
      waUrl,
      refresh,
    }),
    [
      loading,
      settings,
      copyMap,
      navItems,
      marqueeItems,
      heroHighlights,
      heroCategories,
      products,
      directions,
      elements,
      consultations,
      articles,
      testimonials,
      methodologySteps,
      comparisons,
      aboutValues,
      footerLinks,
      coupons,
      timeSlots,
      propertyTypes,
      copy,
      waUrl,
      refresh,
    ]
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
}
