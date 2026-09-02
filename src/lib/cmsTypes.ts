export type CopyFieldType = 'text' | 'textarea' | 'image' | 'url';

export interface SiteCopyRow {
  id?: string;
  page: string;
  section: string;
  field_key: string;
  label: string;
  value: string;
  field_type: CopyFieldType;
  sort_order: number;
}

export interface SiteSettings {
  id: number;
  brand_name: string;
  brand_tagline: string;
  logo_url: string;
  logo_on_dark_url: string;
  mark_url: string;
  favicon_url: string;
  apple_touch_icon_url: string;
  og_image_url: string;
  site_title: string;
  site_description: string;
  theme_color: string;
  whatsapp_number: string;
  whatsapp_message: string;
  phone: string;
  phone_secondary: string;
  email: string;
  locations: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  free_shipping_min: number;
  shipping_fee: number;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  brand_name: 'ZEN VASTU',
  brand_tagline: 'Sacred Architecture & Living',
  logo_url: '/brand/zen-vastu-logo-transparent.png',
  logo_on_dark_url: '/brand/zen-vastu-logo-on-dark.png',
  mark_url: '/brand/zen-vastu-mark.png',
  favicon_url: '/favicon-32x32.png',
  apple_touch_icon_url: '/apple-touch-icon.png',
  og_image_url: '/brand/og-image.png',
  site_title: 'Zen Vastu — Sacred Living, Harmonious Spaces & Vedic Architecture',
  site_description:
    'Premium Vastu consultation, non-demolition remedies, and sacred energetic objects for homes, workplaces, factories and commercial spaces.',
  theme_color: '#1B382B',
  whatsapp_number: '919711855879',
  whatsapp_message: 'Hello Zen Vastu, I would like to consult regarding my property.',
  phone: '+91 97118 55879',
  phone_secondary: '+91 93054 08166',
  email: 'hello@zenvastu.in',
  locations: 'Mumbai • New Delhi • Dubai',
  instagram_url: '',
  facebook_url: '',
  youtube_url: '',
  free_shipping_min: 2500,
  shipping_fee: 150,
};

export function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map((item) => String(item));
    } catch {
      return value.split('\n').map((line) => line.trim()).filter(Boolean);
    }
  }
  return [];
}
