-- Disable the trigger temporarily, elevate admin@zenvastu.in to admin, and re-enable trigger
alter table public.profiles disable trigger profiles_protect_role;

update public.profiles
set role = 'admin', updated_at = now()
where email = 'admin@zenvastu.in';

update public.profiles
set role = 'customer', updated_at = now()
where email <> 'admin@zenvastu.in' and role = 'admin';

alter table public.profiles enable trigger profiles_protect_role;

-- Fix protect_profile_role so dashboard/SQL editor (where auth.uid() is null) can manage roles
create or replace function private.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if auth.uid() is not null and not exists (
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

-- Permanently lock handle_new_user so only admin@zenvastu.in can ever be admin
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    case when new.email = 'admin@zenvastu.in' then 'admin' else 'customer' end
  );
  return new;
end;
$$;
