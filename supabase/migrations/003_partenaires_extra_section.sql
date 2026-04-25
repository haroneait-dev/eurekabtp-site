-- ═══════════════════════════════════════════
-- AJOUT — section "Multimarques avant tout" sur partenaires
-- À exécuter APRÈS 002_seed_existing_content.sql
-- ═══════════════════════════════════════════
-- Cette migration AJOUTE seulement la 3ème section de partenaires
-- sans toucher au reste. Idempotente : si la section existe déjà,
-- elle est mise à jour.

do $$
declare
  page_id_v uuid;
  next_order int;

begin
  select id into page_id_v from public.pages where slug = 'partenaires';

  -- Cherche le prochain order_index libre
  select coalesce(max(order_index), -1) + 1 into next_order
    from public.sections where page_id = page_id_v;

  -- Vérifie si la section "MULTIMARQUES AVANT TOUT" existe déjà
  if not exists (
    select 1 from public.sections
      where page_id = page_id_v
        and data->>'eyebrow' = 'MULTIMARQUES AVANT TOUT'
  ) then
    insert into public.sections (page_id, order_index, type, data) values
    (page_id_v, next_order, 'split', jsonb_build_object(
      'eyebrow', 'MULTIMARQUES AVANT TOUT',
      'title', 'Notre force ? Ne pas se limiter à une seule marque.',
      'text', E'Être représentant IMER est une reconnaissance de notre expertise — mais ce n''est pas ce qui nous définit. Depuis 25 ans, nous avons toujours fait le choix de rester indépendants et multimarques.\n\nStetter, Liebherr, Putzmeister, Baryval, CIFA, Sermac et bien d''autres — peu importe la marque de votre matériel, vous êtes le bienvenu dans notre atelier. Pas de favoritisme, pas d''exclusivité — juste le meilleur service possible pour votre machine.',
      'image', '/images/camion/PHOTO-2026-04-18-16-40-31.jpg',
      'variant', 'light',
      'image_position', 'left'
    ));
  end if;
end $$;
