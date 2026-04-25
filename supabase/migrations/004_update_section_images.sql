-- ═══════════════════════════════════════════
-- MISE À JOUR — Affectation intelligente des nouvelles photos
-- À exécuter APRÈS 002_seed_existing_content.sql
-- ═══════════════════════════════════════════
-- Cette migration met à jour les champs 'image' et 'bg_image' de
-- certaines sections pour utiliser les nouvelles photos plus pertinentes.
-- Les images existantes restent là où elles sont déjà bien adaptées.

do $$
declare
  page_id_v uuid;

begin

-- ═══════════════════════════════════════════
-- ACCUEIL — la 3ème section (services) bénéficie de la pompe Putzmeister
-- ═══════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'accueil';

-- Section #3 (catalogue pièces) → stock garde-boue
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-43 3.jpg')
  where page_id = page_id_v and order_index = 3;

-- ═══════════════════════════════════════════
-- IDENTITÉ — hero avec les 3 toupies devant l'enseigne EUREKA BTP
-- ═══════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'identite';

-- Hero (order 0) → photo des 3 toupies devant enseigne
update public.sections
  set data = data || jsonb_build_object('bg_image', '/images/nouvelles/PHOTO-2026-04-24-15-11-43.jpg')
  where page_id = page_id_v and order_index = 0;

-- Section #1 (famille 3 générations) → la même photo en 2ème (vue extérieure)
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-43.jpg')
  where page_id = page_id_v and order_index = 1;

-- ═══════════════════════════════════════════
-- RÉPARATION — soudeur en action (étincelles bleues)
-- ═══════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'reparation';

-- Section #1 (le bloc principal) → soudeur en action
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-10-51.jpg')
  where page_id = page_id_v and order_index = 1;

-- ═══════════════════════════════════════════
-- LIVRAISON — stock pièces filmées
-- ═══════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'livraison';

-- Section #1 (Nos pièces) → stock garde-boue intérieur
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-43 3.jpg')
  where page_id = page_id_v and order_index = 1;

-- Section #2 (Livraison) → stock garde-boue extérieur prêt à expédier
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-43 5.jpg')
  where page_id = page_id_v and order_index = 2;

-- ═══════════════════════════════════════════
-- PRÉPARATION — cabine Renault Trucks neuve + pompe automotrice
-- ═══════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'preparation';

-- Hero (order 0) → pompe automotrice Mercedes en arrière plan
update public.sections
  set data = data || jsonb_build_object('bg_image', '/images/nouvelles/PHOTO-2026-04-24-15-11-44.jpg')
  where page_id = page_id_v and order_index = 0;

-- Section #1 (Ce qu'on installe) → cabine Renault neuve
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-44 2.jpg')
  where page_id = page_id_v and order_index = 1;

-- Section #2 (Bon à savoir occasion) → goulotte peinte (réfection)
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-44 3.jpg')
  where page_id = page_id_v and order_index = 2;

-- ═══════════════════════════════════════════
-- ATELIER — interventions, équipements, process
-- ═══════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'atelier';

-- Hero (order 0) → soudeur en action en background
update public.sections
  set data = data || jsonb_build_object('bg_image', '/images/nouvelles/PHOTO-2026-04-24-15-10-51.jpg')
  where page_id = page_id_v and order_index = 0;

-- Section #1 (Nos interventions) → meuleuse étincelles oranges
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-39.jpg')
  where page_id = page_id_v and order_index = 1;

-- Section #2 (Maintenance préventive) → mécanique fine cardan
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-43 2.jpg')
  where page_id = page_id_v and order_index = 2;

-- Section #3 (Nos équipements) → pompe Putzmeister dans atelier
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-43 4.jpg')
  where page_id = page_id_v and order_index = 3;

-- Process #5 (Étape 02 Diagnostic) → soudeur en action
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-10-51.jpg')
  where page_id = page_id_v and order_index = 6;

-- Process #6 (Étape 04 Intervention) → découpe au chalumeau sur cuve
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-41.jpg')
  where page_id = page_id_v and order_index = 8;

-- ═══════════════════════════════════════════
-- PARTENAIRES — pompe Putzmeister (rappel partenariat constructeurs)
-- ═══════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'partenaires';

-- Section #2 (notre partenariat) → pompe Putzmeister M21 dans l'atelier
update public.sections
  set data = data || jsonb_build_object('image', '/images/nouvelles/PHOTO-2026-04-24-15-11-43 4.jpg')
  where page_id = page_id_v and order_index = 2;

-- ═══════════════════════════════════════════
-- PIÈCES — hero plus contextualisé (stock pièces)
-- ═══════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'pieces';

update public.sections
  set data = data || jsonb_build_object('bg_image', '/images/nouvelles/PHOTO-2026-04-24-15-11-43 5.jpg')
  where page_id = page_id_v and order_index = 0;

end $$;
