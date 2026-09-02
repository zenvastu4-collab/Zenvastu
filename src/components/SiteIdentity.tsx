import { useEffect } from 'react';
import { useCms } from '../context/CmsProvider';

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el?.setAttribute(key, value));
}

function upsertLink(rel: string, href: string, extra: Record<string, string> = {}) {
  const selector = extra.sizes
    ? `link[rel="${rel}"][sizes="${extra.sizes}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  Object.entries(extra).forEach(([key, value]) => el?.setAttribute(key, value));
}

export function SiteIdentity() {
  const { settings } = useCms();

  useEffect(() => {
    const title = settings.site_title || 'Zen Vastu';
    const description = settings.site_description || '';
    const origin = window.location.origin;
    const favicon = settings.favicon_url || '/favicon-32x32.png';
    const apple = settings.apple_touch_icon_url || '/apple-touch-icon.png';
    const og = settings.og_image_url || '/og-image.png';
    const theme = settings.theme_color || '#1B382B';
    const ogAbs = og.startsWith('http') ? og : `${origin}${og}`;

    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: theme });
    upsertMeta('meta[name="application-name"]', { name: 'application-name', content: settings.brand_name });
    upsertMeta('meta[name="apple-mobile-web-app-title"]', {
      name: 'apple-mobile-web-app-title',
      content: settings.brand_name,
    });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogAbs });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: settings.brand_name });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogAbs });

    upsertLink('icon', favicon, { type: 'image/png', sizes: '32x32' });
    upsertLink('icon', '/favicon-16x16.png', { type: 'image/png', sizes: '16x16' });
    upsertLink('shortcut icon', '/favicon.ico');
    upsertLink('apple-touch-icon', apple, { sizes: '180x180' });
    upsertLink('manifest', '/site.webmanifest');
  }, [settings]);

  return null;
}
