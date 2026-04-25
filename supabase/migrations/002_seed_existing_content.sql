-- ═══════════════════════════════════════════
-- SEED — Contenu actuel des pages
-- À exécuter APRÈS 001_cms_schema.sql
-- ═══════════════════════════════════════════
-- Ce script remplit la table sections avec le contenu
-- actuellement en dur dans les pages HTML.

-- Sécurité : vide les sections existantes pour les pages concernées
delete from public.sections
  where page_id in (select id from public.pages);

-- ── Helper: insert section with order ──
do $$
declare
  page_id_v uuid;

begin

-- ════════════════════════════════════════
-- ACCUEIL (homepage)
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'accueil';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'split', jsonb_build_object(
  'eyebrow', 'QUI SOMMES-NOUS',
  'title', 'Une entreprise familiale depuis 3 générations',
  'text', 'Depuis 2001, Eureka BTP c''est la même famille, le même atelier, et la même passion pour le matériel béton. Aujourd''hui portée par la 3ème génération, notre équipe de 6 spécialistes met tout son savoir-faire à votre service.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-31.jpg',
  'variant', 'light',
  'image_position', 'left',
  'cta_label', 'Découvrir notre histoire',
  'cta_url', 'identite.html'
)),
(page_id_v, 1, 'split', jsonb_build_object(
  'eyebrow', 'L''ATELIER & SAV',
  'title', 'Réparation & maintenance toutes marques',
  'text', 'Toupies, pompes à béton et centrales — nos spécialistes prennent en charge votre matériel, quelle que soit la marque, pour qu''il reparte opérationnel et fiable.',
  'image', '/images/soudure/PHOTO-2026-04-18-16-40-33.jpg',
  'variant', 'dark',
  'image_position', 'right',
  'cta_label', 'Découvrir l''atelier',
  'cta_url', 'atelier.html'
)),
(page_id_v, 2, 'split', jsonb_build_object(
  'eyebrow', 'NOS SERVICES',
  'title', 'Une solution complète pour votre matériel béton',
  'text', 'Réparation, pièces détachées pour toupies, pompes et centrales à béton expédiées partout en France, achat-revente et location — tout ce dont vous avez besoin, chez un seul interlocuteur de confiance depuis 2001.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30 2.jpg',
  'variant', 'light',
  'image_position', 'left',
  'cta_label', 'Voir tous nos services',
  'cta_url', 'services.html'
)),
(page_id_v, 3, 'split', jsonb_build_object(
  'eyebrow', 'Catalogue',
  'title', 'Pièces Détachées',
  'text', 'Un stock permanent de pièces détachées toutes marques pour vos toupies, pompes et centrales à béton — IMER, Stetter, Liebherr, Putzmeister, Baryval, CIFA, Sermac.',
  'image', '/images/soudure/PHOTO-2026-04-18-16-40-32 4.jpg',
  'variant', 'dark',
  'image_position', 'right',
  'cta_label', 'Parcourir le catalogue',
  'cta_url', 'pieces.html'
)),
(page_id_v, 4, 'split', jsonb_build_object(
  'eyebrow', 'NOS PARTENAIRES',
  'title', 'Représentant officiel IMER en Île-de-France',
  'text', 'Depuis 2016, Eureka BTP est le représentant officiel IMER en Île-de-France. Une relation de confiance construite sur plus de 25 ans d''expertise du matériel béton.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-32.jpg',
  'logo_image', '/images/logos/imer-logo-group.jpg',
  'variant', 'light',
  'image_position', 'left',
  'cta_label', 'En savoir plus',
  'cta_url', 'partenaires.html'
));

-- ════════════════════════════════════════
-- IDENTITÉ
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'identite';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'hero', jsonb_build_object(
  'eyebrow', 'Notre identité',
  'title', 'EUREKA BTP',
  'subtitle', 'Spécialiste toupies, pompes et centrales à béton depuis 2001 — réparation, maintenance et préparation de matériel, toutes marques.',
  'bg_image', '/images/camion/PHOTO-2026-04-18-16-40-31.jpg'
)),
(page_id_v, 1, 'split', jsonb_build_object(
  'eyebrow', 'Qui sommes-nous',
  'title', 'Une entreprise familiale\ndepuis 3 générations',
  'text', E'Tout a commencé en 2001, à Lagny-sur-Marne, avec une idée simple : offrir aux professionnels du BPE un spécialiste du matériel béton sur qui compter. Une équipe soudée, un atelier, et une passion pour le travail bien fait.\n\nEn 2012, l''entreprise prend un nouveau tournant : déménagement à Gretz-Armainvilliers, en Seine-et-Marne, et passage de flambeau à la génération suivante. La famille reste aux commandes, les valeurs aussi.\n\nAujourd''hui, c''est la 3ème génération qui porte Eureka BTP — avec la même exigence, et une vision tournée vers l''avenir. 6 spécialistes, un atelier modernisé, et toujours cette même promesse : que votre matériel reparte plus fiable qu''il n''est arrivé.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30.jpg',
  'variant', 'light',
  'image_position', 'right'
)),
(page_id_v, 2, 'split', jsonb_build_object(
  'eyebrow', 'Toutes marques, une seule adresse',
  'title', 'Un savoir-faire qui ne se\nlimite pas à une marque',
  'text', E'Chez Eureka BTP, nous intervenons sur l''ensemble des marques du marché — IMER, Stetter, Liebherr, Putzmeister, Baryval, CIFA, Sermac et bien d''autres. Peu importe la marque de votre matériel, notre équipe a les compétences et les pièces pour y répondre.\n\nC''est cette indépendance et cette polyvalence qui font d''Eureka BTP un partenaire de confiance pour les professionnels du BPE, qu''ils gèrent un seul camion ou un parc entier.',
  'image', '/images/structure/PHOTO-2026-04-18-16-43-12.jpg',
  'variant', 'dark',
  'image_position', 'left'
)),
(page_id_v, 3, 'split', jsonb_build_object(
  'eyebrow', 'Ce qui nous distingue',
  'title', 'Des valeurs concrètes,\nun engagement total',
  'text', E'Chez Eureka BTP, chaque engagement envers nos clients est le fruit de 25 ans de pratique et de perfectionnement.\n\nNous savons qu''une heure d''immobilisation a un coût direct sur votre activité. C''est pourquoi nous priorisons la réactivité : diagnostic rapide, approvisionnement en pièces optimisé, délais tenus. Notre réseau de fournisseurs nous permet de localiser les références les plus rares dans les meilleurs délais.\n\nDepuis 2001, nos clients nous confient leur matériel parce qu''ils savent que notre travail est de qualité, nos devis transparents et notre suivi rigoureux.',
  'image', '/images/soudure/PHOTO-2026-04-18-16-40-33.jpg',
  'variant', 'light',
  'image_position', 'right'
));

-- ════════════════════════════════════════
-- SERVICES (page liste)
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'services';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'split', jsonb_build_object(
  'title', E'Vente de pièces\n& livraison',
  'text', 'Stock permanent toutes marques, expédié partout en France. Livraison rapide en Île-de-France sur les pièces disponibles en stock.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30 2.jpg',
  'variant', 'dark',
  'image_position', 'right',
  'cta_label', 'Découvrir notre service',
  'cta_url', 'livraison.html'
)),
(page_id_v, 1, 'split', jsonb_build_object(
  'title', E'Préparation\ncamion neuf',
  'text', 'Montage, réglage et mise en service clé en main de vos toupies neuves — votre camion repart prêt pour le chantier dès le premier jour.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-31.jpg',
  'variant', 'light',
  'image_position', 'left',
  'cta_label', 'Découvrir notre service',
  'cta_url', 'preparation.html'
)),
(page_id_v, 2, 'split', jsonb_build_object(
  'title', E'Location\nFlotte',
  'text', 'Toupies contrôlées et prêtes à l''emploi, en courte ou longue durée — en partenariat avec Arkos BTP pour répondre à vos besoins de renfort ou de remplacement.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-29 2.jpg',
  'variant', 'dark',
  'image_position', 'right',
  'cta_label', 'Découvrir notre service',
  'cta_url', 'location.html'
)),
(page_id_v, 3, 'split', jsonb_build_object(
  'title', E'Achat &\nRevente',
  'text', 'Vous vendez ou cherchez du matériel béton d''occasion ? Expertise gratuite, matériel contrôlé et remis en état — partout en France.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30 5.jpg',
  'variant', 'light',
  'image_position', 'left',
  'cta_label', 'Découvrir notre service',
  'cta_url', 'achat-revente.html'
));

-- ════════════════════════════════════════
-- RÉPARATION
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'reparation';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'hero', jsonb_build_object(
  'eyebrow', 'Nos services',
  'title', 'Réparation & Maintenance de votre matériel béton',
  'bg_image', '/images/soudure/PHOTO-2026-04-18-16-40-33.jpg'
)),
(page_id_v, 1, 'split', jsonb_build_object(
  'eyebrow', 'Réparation & Maintenance',
  'title', '',
  'text', E'Nos spécialistes interviennent sur l''ensemble de votre matériel béton — toupies, pompes, mixo et centrales. IMER, Stetter, Liebherr, Putzmeister, Baryval, CIFA, Sermac et bien d''autres, nous maîtrisons toutes les marques, des diagnostics précis aux interventions complètes.\n\nGrâce à notre atelier de 450 m² en Seine-et-Marne, entièrement équipé et doté d''un stock permanent de pièces détachées toutes marques, nous limitons au maximum l''immobilisation de votre matériel et vous garantissons des réparations durables, réalisées dans les règles de l''art.\n\nChaque machine qui entre dans notre atelier en repart opérationnelle, contrôlée et prête pour le chantier. C''est l''engagement que nous tenons depuis 2001 auprès des professionnels du BPE.',
  'image', '/images/soudure/PHOTO-2026-04-18-16-40-32 4.jpg',
  'variant', 'light',
  'image_position', 'left'
));

-- ════════════════════════════════════════
-- LIVRAISON
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'livraison';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'hero', jsonb_build_object(
  'eyebrow', 'Nos services',
  'title', 'Vente de pièces & livraison',
  'subtitle', 'Stock permanent toutes marques, expédié partout en France. Livraison rapide en Île-de-France sur les pièces disponibles en stock.',
  'bg_image', '/images/camion/PHOTO-2026-04-18-16-40-30 2.jpg'
)),
(page_id_v, 1, 'split', jsonb_build_object(
  'eyebrow', 'Nos pièces',
  'title', E'Tout ce qu''il faut pour\nvotre toupie, pompe ou centrale',
  'text', E'Chez Eureka BTP, nous disposons d''un stock permanent couvrant l''ensemble des pièces nécessaires à l''entretien et la réparation de vos toupies, pompes et centrales à béton. Grâce à notre réseau de fournisseurs multimarques, nous sommes en mesure de sourcer les références les plus courantes comme les plus rares.\n\nNous travaillons sur toutes les marques — IMER, Stetter, Liebherr, Putzmeister, Baryval, CIFA, Sermac et plein d''autres — et disposons des bons contacts pour trouver ce dont vous avez besoin, quelle que soit la marque de votre matériel.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30 2.jpg',
  'variant', 'light',
  'image_position', 'right'
)),
(page_id_v, 2, 'split', jsonb_build_object(
  'eyebrow', 'Livraison',
  'title', E'Expédition partout en France\net à l''international',
  'text', 'Nos pièces sont expédiées partout en France et à l''international. En Île-de-France, bénéficiez d''une livraison rapide sur les pièces disponibles en stock.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-31.jpg',
  'variant', 'dark',
  'image_position', 'left'
)),
(page_id_v, 3, 'split', jsonb_build_object(
  'eyebrow', 'Comment commander',
  'title', 'Simple et rapide',
  'text', 'Pour passer commande ou vérifier la disponibilité d''une pièce, contactez-nous directement par téléphone ou par email — notre équipe vous répond rapidement et vous oriente vers la bonne référence.',
  'image', '/images/structure/PHOTO-2026-04-18-16-43-12.jpg',
  'variant', 'light',
  'image_position', 'right',
  'cta_label', 'Nous contacter',
  'cta_url', 'index.html#contact-strip'
));

-- ════════════════════════════════════════
-- PRÉPARATION
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'preparation';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'hero', jsonb_build_object(
  'eyebrow', 'Nos services',
  'title', 'Préparation camion neuf et d''occasion',
  'subtitle', 'Votre camion est neuf ? Avant de prendre la route vers la centrale, nous installons tous les équipements nécessaires pour qu''il soit opérationnel dès le premier jour.',
  'bg_image', '/images/camion/PHOTO-2026-04-18-16-40-31.jpg'
)),
(page_id_v, 1, 'split', jsonb_build_object(
  'eyebrow', 'Ce qu''on installe',
  'title', E'Un camion prêt à travailler\ndès la livraison',
  'text', E'Toupies, pompes et mixo — nous prenons en charge l''installation de tous les équipements spécifiques à votre métier : Système de Retenue de Béton (SRB), manette de commande, coffre, brosse et balais, et tout autre équipement selon vos besoins.\n\nUne fois passé entre nos mains, votre camion est équipé, réglé et prêt pour la centrale.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-31 2.jpg',
  'variant', 'light',
  'image_position', 'right'
)),
(page_id_v, 2, 'split', jsonb_build_object(
  'eyebrow', 'Bon à savoir',
  'title', E'Vous avez un camion d''occasion\nà équiper ?',
  'text', 'Contactez-nous, nous étudions votre demande.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30.jpg',
  'variant', 'dark',
  'image_position', 'left',
  'cta_label', 'Nous contacter',
  'cta_url', 'index.html#contact-strip'
));

-- ════════════════════════════════════════
-- LOCATION
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'location';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'hero', jsonb_build_object(
  'eyebrow', 'Nos services',
  'title', 'Location de toupies',
  'subtitle', 'Besoin d''une toupie rapidement ? Grâce à notre partenariat avec Arkos BTP, nous vous donnons accès à une solution de location fiable et flexible.',
  'bg_image', '/images/camion/PHOTO-2026-04-18-16-40-29 2.jpg'
)),
(page_id_v, 1, 'split', jsonb_build_object(
  'eyebrow', 'Un partenaire de confiance, une solution flexible',
  'title', 'En partenariat avec Arkos BTP',
  'text', E'Arkos BTP est un partenaire spécialisé dans la location de toupies à béton. Des véhicules régulièrement contrôlés, entretenus et prêts à l''emploi — vous savez ce que vous mettez sur votre chantier.\n\nLa location se fait à la toupie, en courte ou longue durée, selon vos besoins. Renfort ponctuel, remplacement ou besoin saisonnier — la formule s''adapte à votre situation, dans la limite des disponibilités.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30 4.jpg',
  'variant', 'light',
  'image_position', 'right'
)),
(page_id_v, 2, 'split', jsonb_build_object(
  'eyebrow', 'Comment ça se passe',
  'title', 'Un process simple',
  'text', 'Contactez-nous en décrivant votre besoin. Nous faisons le lien avec Arkos BTP qui vérifie les disponibilités et prend en charge l''ensemble de la location — du devis à la mise à disposition.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-29 2.jpg',
  'variant', 'dark',
  'image_position', 'left',
  'cta_label', 'Nous contacter',
  'cta_url', 'index.html#contact-strip'
));

-- ════════════════════════════════════════
-- ACHAT-REVENTE
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'achat-revente';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'hero', jsonb_build_object(
  'eyebrow', 'Nos services',
  'title', 'Achat & Revente',
  'subtitle', 'Vous cherchez du matériel béton d''occasion ou vous souhaitez vendre le vôtre ? Eureka BTP vous accompagne de l''expertise jusqu''à la transaction.',
  'bg_image', '/images/camion/PHOTO-2026-04-18-16-40-30 5.jpg'
)),
(page_id_v, 1, 'split', jsonb_build_object(
  'eyebrow', 'Un intermédiaire de confiance',
  'title', E'25 ans d''expertise\nau service de votre transaction',
  'text', E'Grâce à notre connaissance du marché et notre réseau de professionnels du BPE, nous mettons en relation acheteurs et vendeurs de matériel béton d''occasion — principalement des toupies, mais aussi des mixo et des pompes à béton.\n\nNous vous accompagnons de A à Z, de l''estimation de votre matériel jusqu''à la finalisation de la transaction — pour que chaque deal se passe dans les meilleures conditions.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30.jpg',
  'variant', 'light',
  'image_position', 'right'
)),
(page_id_v, 2, 'split', jsonb_build_object(
  'eyebrow', 'Vous vendez ?',
  'title', E'Bénéficiez d''une expertise\ngratuite de votre matériel',
  'text', 'Nos spécialistes se déplacent partout en France pour évaluer votre toupie, mixo ou pompe directement sur place — une estimation honnête, basée sur 25 ans d''expérience du marché.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30 5.jpg',
  'variant', 'dark',
  'image_position', 'left'
)),
(page_id_v, 3, 'split', jsonb_build_object(
  'eyebrow', 'Vous achetez ?',
  'title', E'Un stock qui évolue\nselon les opportunités',
  'text', 'Notre stock de matériel d''occasion évolue régulièrement selon les opportunités. Contactez-nous pour connaître les références disponibles au moment de votre recherche — nous vous orientons vers le matériel qui correspond à votre besoin et votre budget.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-31.jpg',
  'variant', 'light',
  'image_position', 'right',
  'cta_label', 'Nous contacter',
  'cta_url', 'index.html#contact-strip'
));

-- ════════════════════════════════════════
-- ATELIER & SAV
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'atelier';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'hero', jsonb_build_object(
  'eyebrow', 'L''atelier',
  'title', 'Un outil de travail à la hauteur de vos exigences',
  'subtitle', '450 m² dédiés à la réparation et la maintenance de votre matériel béton — pour que chaque intervention soit réalisée dans les meilleures conditions.',
  'bg_image', '/images/soudure/PHOTO-2026-04-18-16-40-33.jpg'
)),
(page_id_v, 1, 'split', jsonb_build_object(
  'eyebrow', 'Nos interventions',
  'title', E'Toutes les interventions,\ntoutes les marques',
  'text', E'Notre atelier prend en charge l''ensemble des interventions sur vos toupies, pompes et centrales à béton, quelle que soit la marque : changement de cuve, changement de galets, changement de tôle d''usure, changement de réducteur (neuf ou occasion), passage de commande électrique à manuel, déplombage de cuve, révision hydraulique, préparation de camions neufs.\n\nEt bien d''autres interventions — chaque matériel est unique, notre équipe s''adapte à chaque situation.\n\nNous intervenons sur toutes les marques — IMER, Stetter, Liebherr, Putzmeister, Baryval, CIFA, Sermac, et bien d''autres.',
  'image', '/images/soudure/PHOTO-2026-04-18-16-40-32 4.jpg',
  'variant', 'light',
  'image_position', 'right'
)),
(page_id_v, 2, 'split', jsonb_build_object(
  'eyebrow', 'Maintenance préventive',
  'title', E'Anticiper plutôt\nque subir',
  'text', 'Une panne coûte toujours plus cher qu''un entretien régulier. C''est pourquoi nous proposons également un suivi préventif de votre matériel — pour détecter les signes d''usure avant qu''ils ne deviennent un problème et maintenir votre parc en état de marche toute l''année.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-31.jpg',
  'variant', 'dark',
  'image_position', 'left'
)),
(page_id_v, 3, 'split', jsonb_build_object(
  'eyebrow', 'Nos équipements',
  'title', E'Un atelier professionnel,\npensé pour l''efficacité',
  'text', E'Avec ses 450 m² et son pont élévateur, notre atelier est équipé pour accueillir et traiter tous types de matériel béton dans les meilleures conditions.\n\nOutillage professionnel, pièces détachées en stock permanent — nous mettons tout en œuvre pour intervenir vite et bien.',
  'image', '/images/structure/PHOTO-2026-04-18-16-43-12.jpg',
  'variant', 'light',
  'image_position', 'right'
)),
(page_id_v, 4, 'process_intro', jsonb_build_object(
  'eyebrow', 'Comment ça se passe',
  'title', 'Un process simple et transparent'
)),
(page_id_v, 5, 'split', jsonb_build_object(
  'eyebrow', 'Étape 01 — Dépôt',
  'title', 'Dépôt de votre matériel',
  'text', 'Vous amenez votre machine à notre atelier de Gretz-Armainvilliers, en Seine-et-Marne. Notre équipe vous accueille et prend en charge votre véhicule.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-29.jpg',
  'variant', 'light',
  'image_position', 'right'
)),
(page_id_v, 6, 'split', jsonb_build_object(
  'eyebrow', 'Étape 02 — Diagnostic',
  'title', 'Diagnostic',
  'text', 'Nos spécialistes analysent l''état de votre matériel et identifient précisément les interventions nécessaires — carrosserie, mécanique, hydraulique.',
  'image', '/images/soudure/PHOTO-2026-04-18-16-40-33.jpg',
  'variant', 'dark',
  'image_position', 'left'
)),
(page_id_v, 7, 'split', jsonb_build_object(
  'eyebrow', 'Étape 03 — Devis',
  'title', 'Devis',
  'text', 'Vous recevez un devis clair et transparent avant tout démarrage. Le devis est établi sur présentation du véhicule, chaque intervention étant différente.',
  'image', '/images/structure/PHOTO-2026-04-18-16-43-13.jpg',
  'variant', 'light',
  'image_position', 'right'
)),
(page_id_v, 8, 'split', jsonb_build_object(
  'eyebrow', 'Étape 04 — Intervention',
  'title', 'Intervention',
  'text', 'Nos techniciens prennent en charge votre matériel — vous pouvez attendre sur place ou revenir le chercher une fois les travaux terminés.',
  'image', '/images/soudure/PHOTO-2026-04-18-16-40-32 4.jpg',
  'variant', 'dark',
  'image_position', 'left'
)),
(page_id_v, 9, 'split', jsonb_build_object(
  'eyebrow', 'Étape 05 — Restitution',
  'title', 'Restitution',
  'text', 'Votre matériel repart opérationnel, contrôlé et prêt pour le chantier. Notre signature : qu''il reparte plus fiable qu''il n''est arrivé.',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30.jpg',
  'variant', 'light',
  'image_position', 'right'
));

-- ════════════════════════════════════════
-- PARTENAIRES
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'partenaires';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'hero', jsonb_build_object(
  'eyebrow', 'Nos partenaires',
  'title', 'IMER',
  'subtitle', 'Depuis 2016, Eureka BTP est le représentant officiel IMER en Île-de-France. Une relation de confiance construite sur plus de 25 ans d''expertise du matériel béton.',
  'bg_image', '/images/camion/PHOTO-2026-04-18-16-40-32.jpg'
)),
(page_id_v, 1, 'split', jsonb_build_object(
  'eyebrow', 'IMER Group',
  'title', 'IMER, spécialiste du matériel béton',
  'text', E'Fondé en Italie, le groupe IMER est l''un des principaux constructeurs d''équipements pour le béton : toupies, pompes à béton, centrales à béton et malaxeurs. Reconnu pour la robustesse et la fiabilité de ses machines, IMER équipe des milliers de professionnels du BPE en Europe et dans le monde.',
  'logo_image', '/images/logos/imer-logo-group.jpg',
  'image', '/images/camion/PHOTO-2026-04-18-16-40-30.jpg',
  'variant', 'light',
  'image_position', 'right'
)),
(page_id_v, 2, 'split', jsonb_build_object(
  'eyebrow', 'Notre engagement',
  'title', E'Représentant officiel IMER\nen Île-de-France depuis 2016',
  'text', 'Depuis 2016, Eureka BTP est le représentant officiel IMER en Île-de-France. Un partenariat qui nous donne un accès privilégié aux pièces d''origine et aux équipements neufs IMER — pour vous garantir des interventions conformes aux standards du constructeur.',
  'image', '/images/soudure/PHOTO-2026-04-18-16-40-33.jpg',
  'variant', 'dark',
  'image_position', 'left'
));

-- ════════════════════════════════════════
-- PIÈCES (intro de la page catalogue)
-- ════════════════════════════════════════
select id into page_id_v from public.pages where slug = 'pieces';

insert into public.sections (page_id, order_index, type, data) values
(page_id_v, 0, 'hero', jsonb_build_object(
  'eyebrow', 'Catalogue complet',
  'title', 'Pièces Détachées',
  'subtitle', 'Stock permanent pour toupies, mixo-pompes et pompes à béton — toutes marques. Centrales à béton sur commande. Expédition 24–48h partout en France.',
  'bg_image', '/images/soudure/PHOTO-2026-04-18-16-40-32 4.jpg'
));

end $$;
