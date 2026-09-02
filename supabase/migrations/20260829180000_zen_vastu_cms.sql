-- Zen Vastu CMS: schema, RLS, storage, and first-admin bootstrap

create extension if not exists pgcrypto;

create schema if not exists private;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Core tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text not null default '',
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  has_admin boolean;
begin
  select exists (select 1 from public.profiles where role = 'admin') into has_admin;

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    case when has_admin then 'customer' else 'admin' end
  );

  return new;
end;
$$;

revoke all on function private.handle_new_user() from public;

create or replace function private.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if not exists (
      select 1 from public.profiles
      where id = (select auth.uid())
        and role = 'admin'
    ) then
      new.role := old.role;
    end if;
  end if;
  return new;
end;
$$;

revoke all on function private.protect_profile_role() from public;

create table public.site_settings (
  id int primary key default 1 check (id = 1),
  brand_name text not null default 'ZEN VASTU',
  brand_tagline text not null default 'Sacred Architecture & Living',
  logo_url text not null default '',
  whatsapp_number text not null default '919711855879',
  whatsapp_message text not null default 'Hello Zen Vastu, I would like to consult regarding my property.',
  phone text not null default '+91 97118 55879',
  phone_secondary text not null default '+91 93054 08166',
  email text not null default 'hello@zenvastu.in',
  locations text not null default 'Mumbai • New Delhi • Dubai',
  instagram_url text not null default '',
  facebook_url text not null default '',
  youtube_url text not null default '',
  free_shipping_min numeric(12,2) not null default 2500,
  shipping_fee numeric(12,2) not null default 150,
  updated_at timestamptz not null default now()
);

create table public.site_copy (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section text not null,
  field_key text not null,
  label text not null,
  value text not null default '',
  field_type text not null default 'text' check (field_type in ('text', 'textarea', 'image', 'url')),
  sort_order int not null default 0,
  unique (page, field_key)
);

create table public.nav_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  section_id text not null,
  sort_order int not null default 0,
  visible boolean not null default true
);

create table public.marquee_items (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  icon text not null default 'Sparkles',
  sort_order int not null default 0,
  visible boolean not null default true
);

create table public.hero_highlights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  icon text not null default 'Shield',
  sort_order int not null default 0,
  visible boolean not null default true
);

create table public.hero_categories (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  name text not null,
  tag text not null default '',
  icon text not null default 'Home',
  sort_order int not null default 0,
  visible boolean not null default true
);

create table public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  subtitle text not null default '',
  price numeric(12,2) not null,
  original_price numeric(12,2),
  image text not null default '',
  category text not null default 'Sacred Geometry',
  element text not null default '',
  element_color text not null default '#C5A059',
  description text not null default '',
  symbolism jsonb not null default '[]'::jsonb,
  quote text not null default '',
  vastu_placement text not null default '',
  dimensions text not null default '',
  material text not null default '',
  in_stock boolean not null default true,
  rating numeric(3,2) not null default 5,
  reviews_count int not null default 0,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.directions (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  sanskrit_name text not null default '',
  ruling_deity text not null default '',
  ruling_planet text not null default '',
  element text not null default '',
  color_hex text not null default '#C5A059',
  bg_gradient text not null default 'from-amber-900/20 to-emerald-900/20',
  key_benefits text not null default '',
  ideal_for jsonb not null default '[]'::jsonb,
  avoid_here jsonb not null default '[]'::jsonb,
  remedy_tips text not null default '',
  recommended_products jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  published boolean not null default true
);

create table public.elements (
  id text primary key,
  name text not null,
  sanskrit_name text not null default '',
  zone text not null default '',
  color_hex text not null default '#8B5E3C',
  bg_light text not null default '#F5ECE3',
  description text not null default '',
  qualities jsonb not null default '[]'::jsonb,
  imbalance_signs text not null default '',
  balancing_action text not null default '',
  image text not null default '',
  sort_order int not null default 0,
  published boolean not null default true
);

create table public.consultations (
  id text primary key,
  slug text unique not null,
  title text not null,
  tagline text not null default '',
  short_desc text not null default '',
  full_desc text not null default '',
  price numeric(12,2) not null,
  duration text not null default '',
  format text not null default 'Hybrid',
  image text not null default '',
  color_hex text not null default '#8B5E3C',
  deliverables jsonb not null default '[]'::jsonb,
  suitable_for jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  published boolean not null default true
);

create table public.journal_articles (
  id text primary key,
  slug text unique not null,
  category text not null default '',
  title text not null,
  date text not null default '',
  read_time text not null default '',
  image text not null default '',
  summary text not null default '',
  content jsonb not null default '[]'::jsonb,
  quote text not null default '',
  sort_order int not null default 0,
  published boolean not null default true
);

create table public.testimonials (
  id text primary key,
  name text not null,
  city text not null default '',
  property_type text not null default '',
  rating int not null default 5 check (rating between 1 and 5),
  comment text not null,
  date text not null default '',
  service text not null default '',
  sort_order int not null default 0,
  published boolean not null default true
);

create table public.methodology_steps (
  id uuid primary key default gen_random_uuid(),
  step text not null,
  title text not null,
  sanskrit_tag text not null default '',
  color_hex text not null default '#8B5E3C',
  description text not null default '',
  sort_order int not null default 0,
  published boolean not null default true
);

create table public.methodology_comparisons (
  id uuid primary key default gen_random_uuid(),
  feature text not null,
  traditional text not null default '',
  zen_vastu text not null default '',
  sort_order int not null default 0
);

create table public.about_values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  icon text not null default 'Shield',
  sort_order int not null default 0,
  visible boolean not null default true
);

create table public.footer_links (
  id uuid primary key default gen_random_uuid(),
  group_name text not null,
  label text not null,
  section_id text not null default '',
  url text not null default '',
  sort_order int not null default 0,
  visible boolean not null default true
);

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  discount_percent numeric(5,2) not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.time_slots (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  sort_order int not null default 0,
  visible boolean not null default true
);

create table public.property_types (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  sort_order int not null default 0,
  visible boolean not null default true
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null default '',
  service_title text not null default '',
  property_type text not null default '',
  preferred_date date,
  preferred_time text not null default '',
  name text not null,
  phone text not null,
  email text not null default '',
  city text not null default '',
  notes text not null default '',
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_ref text unique not null,
  customer_name text not null,
  customer_email text not null default '',
  customer_phone text not null default '',
  address text not null default '',
  city text not null default '',
  state text not null default '',
  pincode text not null default '',
  subtotal numeric(12,2) not null default 0,
  discount numeric(12,2) not null default 0,
  shipping numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  payment_method text not null default '',
  payment_status text not null default 'pending',
  status text not null default 'processing',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id text,
  product_name text not null,
  product_image text not null default '',
  unit_price numeric(12,2) not null default 0,
  quantity int not null default 1,
  line_total numeric(12,2) not null default 0
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index site_copy_page_idx on public.site_copy (page, sort_order);
create index products_published_idx on public.products (published, sort_order);
create index consultations_published_idx on public.consultations (published, sort_order);
create index journal_published_idx on public.journal_articles (published, sort_order);
create index testimonials_published_idx on public.testimonials (published, sort_order);
create index bookings_created_idx on public.bookings (created_at desc);
create index bookings_status_idx on public.bookings (status);
create index orders_created_idx on public.orders (created_at desc);
create index orders_status_idx on public.orders (status);
create index order_items_order_idx on public.order_items (order_id);
create index coupons_code_idx on public.coupons (code);

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function private.protect_profile_role();

create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.site_copy enable row level security;
alter table public.nav_items enable row level security;
alter table public.marquee_items enable row level security;
alter table public.hero_highlights enable row level security;
alter table public.hero_categories enable row level security;
alter table public.products enable row level security;
alter table public.directions enable row level security;
alter table public.elements enable row level security;
alter table public.consultations enable row level security;
alter table public.journal_articles enable row level security;
alter table public.testimonials enable row level security;
alter table public.methodology_steps enable row level security;
alter table public.methodology_comparisons enable row level security;
alter table public.about_values enable row level security;
alter table public.footer_links enable row level security;
alter table public.coupons enable row level security;
alter table public.time_slots enable row level security;
alter table public.property_types enable row level security;
alter table public.bookings enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Profiles
create policy profiles_select_own on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or private.is_admin());

create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = (select auth.uid()) or private.is_admin())
  with check (id = (select auth.uid()) or private.is_admin());

-- Public-readable CMS tables
create policy site_settings_public_read on public.site_settings
  for select to anon, authenticated using (true);
create policy site_settings_admin_write on public.site_settings
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy site_copy_public_read on public.site_copy
  for select to anon, authenticated using (true);
create policy site_copy_admin_write on public.site_copy
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy nav_items_public_read on public.nav_items
  for select to anon, authenticated using (true);
create policy nav_items_admin_write on public.nav_items
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy marquee_items_public_read on public.marquee_items
  for select to anon, authenticated using (true);
create policy marquee_items_admin_write on public.marquee_items
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy hero_highlights_public_read on public.hero_highlights
  for select to anon, authenticated using (true);
create policy hero_highlights_admin_write on public.hero_highlights
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy hero_categories_public_read on public.hero_categories
  for select to anon, authenticated using (true);
create policy hero_categories_admin_write on public.hero_categories
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy products_public_read on public.products
  for select to anon, authenticated using (published = true);
create policy products_admin_write on public.products
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy directions_public_read on public.directions
  for select to anon, authenticated using (published = true);
create policy directions_admin_write on public.directions
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy elements_public_read on public.elements
  for select to anon, authenticated using (published = true);
create policy elements_admin_write on public.elements
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy consultations_public_read on public.consultations
  for select to anon, authenticated using (published = true);
create policy consultations_admin_write on public.consultations
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy journal_public_read on public.journal_articles
  for select to anon, authenticated using (published = true);
create policy journal_admin_write on public.journal_articles
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy testimonials_public_read on public.testimonials
  for select to anon, authenticated using (published = true);
create policy testimonials_admin_write on public.testimonials
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy methodology_steps_public_read on public.methodology_steps
  for select to anon, authenticated using (published = true);
create policy methodology_steps_admin_write on public.methodology_steps
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy methodology_comparisons_public_read on public.methodology_comparisons
  for select to anon, authenticated using (true);
create policy methodology_comparisons_admin_write on public.methodology_comparisons
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy about_values_public_read on public.about_values
  for select to anon, authenticated using (true);
create policy about_values_admin_write on public.about_values
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy footer_links_public_read on public.footer_links
  for select to anon, authenticated using (true);
create policy footer_links_admin_write on public.footer_links
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy coupons_public_read on public.coupons
  for select to anon, authenticated using (active = true);
create policy coupons_admin_write on public.coupons
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy time_slots_public_read on public.time_slots
  for select to anon, authenticated using (true);
create policy time_slots_admin_write on public.time_slots
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy property_types_public_read on public.property_types
  for select to anon, authenticated using (true);
create policy property_types_admin_write on public.property_types
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- Public can create bookings and orders; only admin can manage them
create policy bookings_public_insert on public.bookings
  for insert to anon, authenticated
  with check (true);
create policy bookings_admin_select on public.bookings
  for select to authenticated
  using (private.is_admin());
create policy bookings_admin_update on public.bookings
  for update to authenticated
  using (private.is_admin())
  with check (private.is_admin());
create policy bookings_admin_delete on public.bookings
  for delete to authenticated
  using (private.is_admin());

create policy orders_public_insert on public.orders
  for insert to anon, authenticated
  with check (true);
create policy orders_admin_select on public.orders
  for select to authenticated
  using (private.is_admin());
create policy orders_admin_update on public.orders
  for update to authenticated
  using (private.is_admin())
  with check (private.is_admin());
create policy orders_admin_delete on public.orders
  for delete to authenticated
  using (private.is_admin());

create policy order_items_public_insert on public.order_items
  for insert to anon, authenticated
  with check (true);
create policy order_items_admin_select on public.order_items
  for select to authenticated
  using (private.is_admin());
create policy order_items_admin_update on public.order_items
  for update to authenticated
  using (private.is_admin())
  with check (private.is_admin());
create policy order_items_admin_delete on public.order_items
  for delete to authenticated
  using (private.is_admin());

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated;
grant usage on schema private to authenticated;

grant select, insert, update, delete on all tables in schema public to authenticated;
grant select on public.site_settings, public.site_copy, public.nav_items, public.marquee_items,
  public.hero_highlights, public.hero_categories, public.products, public.directions,
  public.elements, public.consultations, public.journal_articles, public.testimonials,
  public.methodology_steps, public.methodology_comparisons, public.about_values,
  public.footer_links, public.coupons, public.time_slots, public.property_types
  to anon;
grant insert on public.bookings, public.orders, public.order_items to anon;

-- ---------------------------------------------------------------------------
-- Storage
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do nothing;

create policy media_public_read
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy media_admin_insert
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and private.is_admin());

create policy media_admin_update
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and private.is_admin())
  with check (bucket_id = 'media' and private.is_admin());

create policy media_admin_delete
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and private.is_admin());

-- ---------------------------------------------------------------------------
-- Default settings row
-- ---------------------------------------------------------------------------

insert into public.site_settings (id) values (1)
on conflict (id) do nothing;
