alter table public.site_settings
  add column if not exists favicon_url text not null default '/favicon-32x32.png',
  add column if not exists mark_url text not null default '/brand/zen-vastu-mark.png',
  add column if not exists logo_on_dark_url text not null default '/brand/zen-vastu-logo-on-dark.png',
  add column if not exists og_image_url text not null default '/brand/og-image.png',
  add column if not exists apple_touch_icon_url text not null default '/apple-touch-icon.png',
  add column if not exists site_title text not null default 'Zen Vastu — Sacred Living, Harmonious Spaces & Vedic Architecture',
  add column if not exists site_description text not null default 'Premium Vastu consultation, non-demolition remedies, and sacred energetic objects for homes, workplaces, factories and commercial spaces.',
  add column if not exists theme_color text not null default '#1B382B';

update public.site_settings
set
  logo_url = case when logo_url is null or logo_url = '' then '/brand/zen-vastu-logo-transparent.png' else logo_url end,
  favicon_url = coalesce(nullif(favicon_url, ''), '/favicon-32x32.png'),
  mark_url = coalesce(nullif(mark_url, ''), '/brand/zen-vastu-mark.png'),
  logo_on_dark_url = coalesce(nullif(logo_on_dark_url, ''), '/brand/zen-vastu-logo-on-dark.png'),
  og_image_url = coalesce(nullif(og_image_url, ''), '/brand/og-image.png'),
  apple_touch_icon_url = coalesce(nullif(apple_touch_icon_url, ''), '/apple-touch-icon.png')
where id = 1;
