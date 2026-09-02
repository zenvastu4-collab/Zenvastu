/**
 * Builds seed SQL from the site's default content.
 * Run: npx tsx scripts/generate-seed-sql.mjs
 */
import { writeFileSync } from 'node:fs';

const { CONSULTATIONS, FIVE_ELEMENTS, JOURNAL_ARTICLES, METHODOLOGY_STEPS, PRODUCTS, TESTIMONIALS, VASTU_DIRECTIONS } =
  await import('../src/data/vastuData.ts');
const {
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
} = await import('../src/data/cmsDefaults.ts');
const { DEFAULT_SETTINGS } = await import('../src/lib/cmsTypes.ts');

function lit(value) {
  return JSON.stringify(value);
}

function sqlJson(value) {
  return `('${lit(value).replace(/'/g, "''")}'::jsonb)`;
}

const settings = { ...DEFAULT_SETTINGS, id: 1 };
const products = PRODUCTS.map((p, index) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  subtitle: p.subtitle,
  price: p.price,
  original_price: p.originalPrice ?? null,
  image: p.image,
  category: p.category,
  element: p.element,
  element_color: p.elementColor,
  description: p.description,
  symbolism: p.symbolism,
  quote: p.quote,
  vastu_placement: p.vastuPlacement,
  dimensions: p.dimensions || '',
  material: p.material || '',
  in_stock: p.inStock,
  rating: p.rating,
  reviews_count: p.reviewsCount,
  sort_order: index + 1,
  published: true,
}));

const directions = VASTU_DIRECTIONS.map((d, index) => ({
  code: d.code,
  name: d.name,
  sanskrit_name: d.sanskritName,
  ruling_deity: d.rulingDeity,
  ruling_planet: d.rulingPlanet,
  element: d.element,
  color_hex: d.colorHex,
  bg_gradient: d.bgGradient,
  key_benefits: d.keyBenefits,
  ideal_for: d.idealFor,
  avoid_here: d.avoidHere,
  remedy_tips: d.remedyTips,
  recommended_products: d.recommendedProducts,
  sort_order: index + 1,
  published: true,
}));

const elements = FIVE_ELEMENTS.map((e, index) => ({
  id: e.id,
  name: e.name,
  sanskrit_name: e.sanskritName,
  zone: e.zone,
  color_hex: e.colorHex,
  bg_light: e.bgLight,
  description: e.description,
  qualities: e.qualities,
  imbalance_signs: e.imbalanceSigns,
  balancing_action: e.balancingAction,
  image: e.image,
  sort_order: index + 1,
  published: true,
}));

const consultations = CONSULTATIONS.map((c, index) => ({
  id: c.id,
  slug: c.slug,
  title: c.title,
  tagline: c.tagline,
  short_desc: c.shortDesc,
  full_desc: c.fullDesc,
  price: c.price,
  duration: c.duration,
  format: c.format,
  image: c.image,
  color_hex: c.colorHex,
  deliverables: c.deliverables,
  suitable_for: c.suitableFor,
  sort_order: index + 1,
  published: true,
}));

const articles = JOURNAL_ARTICLES.map((a, index) => ({
  id: a.id,
  slug: a.slug,
  category: a.category,
  title: a.title,
  date: a.date,
  read_time: a.readTime,
  image: a.image,
  summary: a.summary,
  content: a.content,
  quote: a.quote,
  sort_order: index + 1,
  published: true,
}));

const testimonials = TESTIMONIALS.map((t, index) => ({
  id: t.id,
  name: t.name,
  city: t.city,
  property_type: t.propertyType,
  rating: t.rating,
  comment: t.comment,
  date: t.date,
  service: t.service,
  sort_order: index + 1,
  published: true,
}));

const steps = METHODOLOGY_STEPS.map((s, index) => ({
  step: s.step,
  title: s.title,
  sanskrit_tag: s.sanskritTag,
  color_hex: s.colorHex,
  description: s.description,
  sort_order: index + 1,
  published: true,
}));

const copyRows = SITE_COPY_DEFAULTS.map(({ id: _id, ...row }) => row);

const sql = `
insert into public.site_settings (id, brand_name, brand_tagline, logo_url, whatsapp_number, whatsapp_message, phone, phone_secondary, email, locations, instagram_url, facebook_url, youtube_url, free_shipping_min, shipping_fee)
select id, brand_name, brand_tagline, logo_url, whatsapp_number, whatsapp_message, phone, phone_secondary, email, locations, instagram_url, facebook_url, youtube_url, free_shipping_min, shipping_fee
from jsonb_to_record(${sqlJson(settings)}) as x(
  id int, brand_name text, brand_tagline text, logo_url text, whatsapp_number text, whatsapp_message text,
  phone text, phone_secondary text, email text, locations text, instagram_url text, facebook_url text, youtube_url text,
  free_shipping_min numeric, shipping_fee numeric
)
on conflict (id) do update set
  brand_name = excluded.brand_name,
  brand_tagline = excluded.brand_tagline,
  logo_url = excluded.logo_url,
  whatsapp_number = excluded.whatsapp_number,
  whatsapp_message = excluded.whatsapp_message,
  phone = excluded.phone,
  phone_secondary = excluded.phone_secondary,
  email = excluded.email,
  locations = excluded.locations,
  instagram_url = excluded.instagram_url,
  facebook_url = excluded.facebook_url,
  youtube_url = excluded.youtube_url,
  free_shipping_min = excluded.free_shipping_min,
  shipping_fee = excluded.shipping_fee;

insert into public.site_copy (page, section, field_key, label, value, field_type, sort_order)
select page, section, field_key, label, value, field_type, sort_order
from jsonb_to_recordset(${sqlJson(copyRows)}) as x(
  page text, section text, field_key text, label text, value text, field_type text, sort_order int
)
on conflict (page, field_key) do update set
  section = excluded.section,
  label = excluded.label,
  value = excluded.value,
  field_type = excluded.field_type,
  sort_order = excluded.sort_order;

insert into public.nav_items (label, section_id, sort_order, visible)
select label, section_id, sort_order, visible
from jsonb_to_recordset(${sqlJson(DEFAULT_NAV)}) as x(label text, section_id text, sort_order int, visible boolean)
where not exists (select 1 from public.nav_items);

insert into public.marquee_items (text, icon, sort_order, visible)
select text, icon, sort_order, visible
from jsonb_to_recordset(${sqlJson(DEFAULT_MARQUEE)}) as x(text text, icon text, sort_order int, visible boolean)
where not exists (select 1 from public.marquee_items);

insert into public.hero_highlights (title, description, icon, sort_order, visible)
select title, description, icon, sort_order, visible
from jsonb_to_recordset(${sqlJson(DEFAULT_HERO_HIGHLIGHTS)}) as x(title text, description text, icon text, sort_order int, visible boolean)
where not exists (select 1 from public.hero_highlights);

insert into public.hero_categories (code, name, tag, icon, sort_order, visible)
select code, name, tag, icon, sort_order, visible
from jsonb_to_recordset(${sqlJson(DEFAULT_HERO_CATEGORIES)}) as x(code text, name text, tag text, icon text, sort_order int, visible boolean)
where not exists (select 1 from public.hero_categories);

insert into public.products (id, slug, name, subtitle, price, original_price, image, category, element, element_color, description, symbolism, quote, vastu_placement, dimensions, material, in_stock, rating, reviews_count, sort_order, published)
select id, slug, name, subtitle, price, original_price, image, category, element, element_color, description, symbolism, quote, vastu_placement, dimensions, material, in_stock, rating, reviews_count, sort_order, published
from jsonb_to_recordset(${sqlJson(products)}) as x(
  id text, slug text, name text, subtitle text, price numeric, original_price numeric, image text, category text, element text, element_color text,
  description text, symbolism jsonb, quote text, vastu_placement text, dimensions text, material text, in_stock boolean, rating numeric, reviews_count int, sort_order int, published boolean
)
on conflict (id) do update set
  slug = excluded.slug, name = excluded.name, subtitle = excluded.subtitle, price = excluded.price, original_price = excluded.original_price,
  image = excluded.image, category = excluded.category, element = excluded.element, element_color = excluded.element_color,
  description = excluded.description, symbolism = excluded.symbolism, quote = excluded.quote, vastu_placement = excluded.vastu_placement,
  dimensions = excluded.dimensions, material = excluded.material, in_stock = excluded.in_stock, rating = excluded.rating,
  reviews_count = excluded.reviews_count, sort_order = excluded.sort_order, published = excluded.published;

insert into public.directions (code, name, sanskrit_name, ruling_deity, ruling_planet, element, color_hex, bg_gradient, key_benefits, ideal_for, avoid_here, remedy_tips, recommended_products, sort_order, published)
select code, name, sanskrit_name, ruling_deity, ruling_planet, element, color_hex, bg_gradient, key_benefits, ideal_for, avoid_here, remedy_tips, recommended_products, sort_order, published
from jsonb_to_recordset(${sqlJson(directions)}) as x(
  code text, name text, sanskrit_name text, ruling_deity text, ruling_planet text, element text, color_hex text, bg_gradient text,
  key_benefits text, ideal_for jsonb, avoid_here jsonb, remedy_tips text, recommended_products jsonb, sort_order int, published boolean
)
on conflict (code) do update set
  name = excluded.name, sanskrit_name = excluded.sanskrit_name, ruling_deity = excluded.ruling_deity, ruling_planet = excluded.ruling_planet,
  element = excluded.element, color_hex = excluded.color_hex, bg_gradient = excluded.bg_gradient, key_benefits = excluded.key_benefits,
  ideal_for = excluded.ideal_for, avoid_here = excluded.avoid_here, remedy_tips = excluded.remedy_tips,
  recommended_products = excluded.recommended_products, sort_order = excluded.sort_order, published = excluded.published;

insert into public.elements (id, name, sanskrit_name, zone, color_hex, bg_light, description, qualities, imbalance_signs, balancing_action, image, sort_order, published)
select id, name, sanskrit_name, zone, color_hex, bg_light, description, qualities, imbalance_signs, balancing_action, image, sort_order, published
from jsonb_to_recordset(${sqlJson(elements)}) as x(
  id text, name text, sanskrit_name text, zone text, color_hex text, bg_light text, description text, qualities jsonb,
  imbalance_signs text, balancing_action text, image text, sort_order int, published boolean
)
on conflict (id) do update set
  name = excluded.name, sanskrit_name = excluded.sanskrit_name, zone = excluded.zone, color_hex = excluded.color_hex,
  bg_light = excluded.bg_light, description = excluded.description, qualities = excluded.qualities,
  imbalance_signs = excluded.imbalance_signs, balancing_action = excluded.balancing_action, image = excluded.image,
  sort_order = excluded.sort_order, published = excluded.published;

insert into public.consultations (id, slug, title, tagline, short_desc, full_desc, price, duration, format, image, color_hex, deliverables, suitable_for, sort_order, published)
select id, slug, title, tagline, short_desc, full_desc, price, duration, format, image, color_hex, deliverables, suitable_for, sort_order, published
from jsonb_to_recordset(${sqlJson(consultations)}) as x(
  id text, slug text, title text, tagline text, short_desc text, full_desc text, price numeric, duration text, format text,
  image text, color_hex text, deliverables jsonb, suitable_for jsonb, sort_order int, published boolean
)
on conflict (id) do update set
  slug = excluded.slug, title = excluded.title, tagline = excluded.tagline, short_desc = excluded.short_desc, full_desc = excluded.full_desc,
  price = excluded.price, duration = excluded.duration, format = excluded.format, image = excluded.image, color_hex = excluded.color_hex,
  deliverables = excluded.deliverables, suitable_for = excluded.suitable_for, sort_order = excluded.sort_order, published = excluded.published;

insert into public.journal_articles (id, slug, category, title, date, read_time, image, summary, content, quote, sort_order, published)
select id, slug, category, title, date, read_time, image, summary, content, quote, sort_order, published
from jsonb_to_recordset(${sqlJson(articles)}) as x(
  id text, slug text, category text, title text, date text, read_time text, image text, summary text, content jsonb, quote text, sort_order int, published boolean
)
on conflict (id) do update set
  slug = excluded.slug, category = excluded.category, title = excluded.title, date = excluded.date, read_time = excluded.read_time,
  image = excluded.image, summary = excluded.summary, content = excluded.content, quote = excluded.quote,
  sort_order = excluded.sort_order, published = excluded.published;

insert into public.testimonials (id, name, city, property_type, rating, comment, date, service, sort_order, published)
select id, name, city, property_type, rating, comment, date, service, sort_order, published
from jsonb_to_recordset(${sqlJson(testimonials)}) as x(
  id text, name text, city text, property_type text, rating int, comment text, date text, service text, sort_order int, published boolean
)
on conflict (id) do update set
  name = excluded.name, city = excluded.city, property_type = excluded.property_type, rating = excluded.rating,
  comment = excluded.comment, date = excluded.date, service = excluded.service, sort_order = excluded.sort_order, published = excluded.published;

insert into public.methodology_steps (step, title, sanskrit_tag, color_hex, description, sort_order, published)
select step, title, sanskrit_tag, color_hex, description, sort_order, published
from jsonb_to_recordset(${sqlJson(steps)}) as x(step text, title text, sanskrit_tag text, color_hex text, description text, sort_order int, published boolean)
where not exists (select 1 from public.methodology_steps);

insert into public.methodology_comparisons (feature, traditional, zen_vastu, sort_order)
select feature, traditional, zen_vastu, sort_order
from jsonb_to_recordset(${sqlJson(DEFAULT_COMPARISONS)}) as x(feature text, traditional text, zen_vastu text, sort_order int)
where not exists (select 1 from public.methodology_comparisons);

insert into public.about_values (title, description, icon, sort_order, visible)
select title, description, icon, sort_order, visible
from jsonb_to_recordset(${sqlJson(DEFAULT_ABOUT_VALUES)}) as x(title text, description text, icon text, sort_order int, visible boolean)
where not exists (select 1 from public.about_values);

insert into public.footer_links (group_name, label, section_id, url, sort_order, visible)
select group_name, label, section_id, url, sort_order, visible
from jsonb_to_recordset(${sqlJson(DEFAULT_FOOTER_LINKS)}) as x(group_name text, label text, section_id text, url text, sort_order int, visible boolean)
where not exists (select 1 from public.footer_links);

insert into public.time_slots (label, sort_order, visible)
select label, sort_order, visible
from jsonb_to_recordset(${sqlJson(DEFAULT_TIME_SLOTS)}) as x(label text, sort_order int, visible boolean)
where not exists (select 1 from public.time_slots);

insert into public.property_types (label, sort_order, visible)
select label, sort_order, visible
from jsonb_to_recordset(${sqlJson(DEFAULT_PROPERTY_TYPES)}) as x(label text, sort_order int, visible boolean)
where not exists (select 1 from public.property_types);

insert into public.coupons (code, discount_percent, active)
select code, discount_percent, active
from jsonb_to_recordset(${sqlJson(DEFAULT_COUPONS)}) as x(code text, discount_percent int, active boolean)
on conflict (code) do update set discount_percent = excluded.discount_percent, active = excluded.active;
`.trim();

writeFileSync(new URL('./.seed.sql', import.meta.url), sql);
console.log('Wrote scripts/.seed.sql', sql.length, 'chars');
