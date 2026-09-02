import type { SupabaseClient } from '@supabase/supabase-js';
import {
  CONSULTATIONS,
  FIVE_ELEMENTS,
  JOURNAL_ARTICLES,
  METHODOLOGY_STEPS,
  PRODUCTS,
  TESTIMONIALS,
  VASTU_DIRECTIONS,
} from './vastuData';
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
} from './cmsDefaults';
import { DEFAULT_SETTINGS } from '../lib/cmsTypes';

export async function seedCmsContent(client: SupabaseClient) {
  const errors: string[] = [];

  const run = async (label: string, fn: () => PromiseLike<{ error: { message: string } | null }>) => {
    const { error } = await fn();
    if (error) errors.push(`${label}: ${error.message}`);
  };

  await run('settings', () =>
    client.from('site_settings').upsert({ ...DEFAULT_SETTINGS, id: 1 })
  );

  await run('site_copy', () =>
    client.from('site_copy').upsert(
      SITE_COPY_DEFAULTS.map(({ id: _id, ...row }) => row),
      { onConflict: 'page,field_key' }
    )
  );

  await run('nav_items', async () => {
    const { count } = await client.from('nav_items').select('*', { count: 'exact', head: true });
    if ((count || 0) > 0) return { error: null };
    return client.from('nav_items').insert(DEFAULT_NAV);
  });

  await run('marquee_items', async () => {
    const { count } = await client.from('marquee_items').select('*', { count: 'exact', head: true });
    if ((count || 0) > 0) return { error: null };
    return client.from('marquee_items').insert(DEFAULT_MARQUEE);
  });

  await run('hero_highlights', async () => {
    const { count } = await client.from('hero_highlights').select('*', { count: 'exact', head: true });
    if ((count || 0) > 0) return { error: null };
    return client.from('hero_highlights').insert(DEFAULT_HERO_HIGHLIGHTS);
  });

  await run('hero_categories', async () => {
    const { count } = await client.from('hero_categories').select('*', { count: 'exact', head: true });
    if ((count || 0) > 0) return { error: null };
    return client.from('hero_categories').insert(DEFAULT_HERO_CATEGORIES);
  });

  await run('products', () =>
    client.from('products').upsert(
      PRODUCTS.map((p, index) => ({
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
      })),
      { onConflict: 'id' }
    )
  );

  await run('directions', () =>
    client.from('directions').upsert(
      VASTU_DIRECTIONS.map((d, index) => ({
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
      })),
      { onConflict: 'code' }
    )
  );

  await run('elements', () =>
    client.from('elements').upsert(
      FIVE_ELEMENTS.map((e, index) => ({
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
      })),
      { onConflict: 'id' }
    )
  );

  await run('consultations', () =>
    client.from('consultations').upsert(
      CONSULTATIONS.map((c, index) => ({
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
      })),
      { onConflict: 'id' }
    )
  );

  await run('journal_articles', () =>
    client.from('journal_articles').upsert(
      JOURNAL_ARTICLES.map((a, index) => ({
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
      })),
      { onConflict: 'id' }
    )
  );

  await run('testimonials', () =>
    client.from('testimonials').upsert(
      TESTIMONIALS.map((t, index) => ({
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
      })),
      { onConflict: 'id' }
    )
  );

  await run('methodology_steps', async () => {
    const { count } = await client.from('methodology_steps').select('*', { count: 'exact', head: true });
    if ((count || 0) > 0) return { error: null };
    return client.from('methodology_steps').insert(
      METHODOLOGY_STEPS.map((s, index) => ({
        step: s.step,
        title: s.title,
        sanskrit_tag: s.sanskritTag,
        color_hex: s.colorHex,
        description: s.description,
        sort_order: index + 1,
        published: true,
      }))
    );
  });

  await run('methodology_comparisons', async () => {
    const { count } = await client.from('methodology_comparisons').select('*', { count: 'exact', head: true });
    if ((count || 0) > 0) return { error: null };
    return client.from('methodology_comparisons').insert(DEFAULT_COMPARISONS);
  });

  await run('about_values', async () => {
    const { count } = await client.from('about_values').select('*', { count: 'exact', head: true });
    if ((count || 0) > 0) return { error: null };
    return client.from('about_values').insert(DEFAULT_ABOUT_VALUES);
  });

  await run('footer_links', async () => {
    const { count } = await client.from('footer_links').select('*', { count: 'exact', head: true });
    if ((count || 0) > 0) return { error: null };
    return client.from('footer_links').insert(DEFAULT_FOOTER_LINKS);
  });

  await run('time_slots', async () => {
    const { count } = await client.from('time_slots').select('*', { count: 'exact', head: true });
    if ((count || 0) > 0) return { error: null };
    return client.from('time_slots').insert(DEFAULT_TIME_SLOTS);
  });

  await run('property_types', async () => {
    const { count } = await client.from('property_types').select('*', { count: 'exact', head: true });
    if ((count || 0) > 0) return { error: null };
    return client.from('property_types').insert(DEFAULT_PROPERTY_TYPES);
  });

  await run('coupons', () =>
    client.from('coupons').upsert(DEFAULT_COUPONS, { onConflict: 'code' })
  );

  if (errors.length) {
    throw new Error(errors.join('\n'));
  }
}
