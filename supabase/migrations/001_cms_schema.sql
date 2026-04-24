-- ═══════════════════════════════════════════
-- CMS SCHEMA — pages + sections éditables
-- À exécuter dans Supabase → SQL Editor
-- ═══════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── TABLE: pages ──────────────────────────
create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  hero_bg_image text,
  created_at timestamptz default now()
);

-- ── TABLE: sections ───────────────────────
-- type: 'hero' | 'split' | 'cta' | 'gallery' | 'process_intro' | 'list'
-- data: jsonb avec champs spécifiques au type (cf. doc dans /admin/README.md)
create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid references public.pages(id) on delete cascade,
  order_index int not null default 0,
  type text not null,
  data jsonb not null default '{}'::jsonb,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists sections_page_order_idx
  on public.sections (page_id, order_index);

-- Trigger updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists sections_touch on public.sections;
create trigger sections_touch
  before update on public.sections
  for each row execute function public.touch_updated_at();

-- ── RLS ───────────────────────────────────
alter table public.pages enable row level security;
alter table public.sections enable row level security;

-- Lecture publique (pour le rendu côté site)
drop policy if exists "pages_read_all" on public.pages;
create policy "pages_read_all" on public.pages for select using (true);

drop policy if exists "sections_read_published" on public.sections;
create policy "sections_read_published" on public.sections
  for select using (published = true);

-- Écriture réservée aux utilisateurs authentifiés (admin)
drop policy if exists "pages_admin_all" on public.pages;
create policy "pages_admin_all" on public.pages
  for all to authenticated using (true) with check (true);

drop policy if exists "sections_admin_all" on public.sections;
create policy "sections_admin_all" on public.sections
  for all to authenticated using (true) with check (true);

-- ── BUCKET: site-assets (pour les images uploadées) ──
insert into storage.buckets (id, name, public)
  values ('site-assets', 'site-assets', true)
  on conflict (id) do nothing;

drop policy if exists "site_assets_public_read" on storage.objects;
create policy "site_assets_public_read" on storage.objects
  for select using (bucket_id = 'site-assets');

drop policy if exists "site_assets_admin_write" on storage.objects;
create policy "site_assets_admin_write" on storage.objects
  for all to authenticated
  using (bucket_id = 'site-assets')
  with check (bucket_id = 'site-assets');

-- ── SEED: pages éditables ─────────────────
insert into public.pages (slug, title, description) values
  ('accueil', 'Accueil', 'Page d''accueil'),
  ('identite', 'Notre identité', 'Page identité'),
  ('services', 'Nos services', 'Liste des services'),
  ('reparation', 'Réparation & Maintenance', 'Page réparation'),
  ('livraison', 'Vente de pièces & livraison', 'Page livraison'),
  ('preparation', 'Préparation camion neuf', 'Page préparation'),
  ('location', 'Location de toupies', 'Page location'),
  ('achat-revente', 'Achat & Revente', 'Page achat-revente'),
  ('atelier', 'Atelier & SAV', 'Page atelier'),
  ('partenaires', 'Nos partenaires', 'Page partenaires'),
  ('pieces', 'Pièces détachées', 'Page catalogue pièces')
on conflict (slug) do nothing;
