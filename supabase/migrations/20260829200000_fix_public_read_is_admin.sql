-- Public SELECT policies must not call private.is_admin(): anon has no EXECUTE
-- on that function (PostgREST 42501). Admins still see unpublished/inactive
-- rows via existing FOR ALL policies.

drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products
  for select to anon, authenticated
  using (published = true);

drop policy if exists directions_public_read on public.directions;
create policy directions_public_read on public.directions
  for select to anon, authenticated
  using (published = true);

drop policy if exists elements_public_read on public.elements;
create policy elements_public_read on public.elements
  for select to anon, authenticated
  using (published = true);

drop policy if exists consultations_public_read on public.consultations;
create policy consultations_public_read on public.consultations
  for select to anon, authenticated
  using (published = true);

drop policy if exists journal_public_read on public.journal_articles;
create policy journal_public_read on public.journal_articles
  for select to anon, authenticated
  using (published = true);

drop policy if exists testimonials_public_read on public.testimonials;
create policy testimonials_public_read on public.testimonials
  for select to anon, authenticated
  using (published = true);

drop policy if exists methodology_steps_public_read on public.methodology_steps;
create policy methodology_steps_public_read on public.methodology_steps
  for select to anon, authenticated
  using (published = true);

drop policy if exists coupons_public_read on public.coupons;
create policy coupons_public_read on public.coupons
  for select to anon, authenticated
  using (active = true);
