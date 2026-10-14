/* ==========================================================================
   Hurghada International Tours — CATALOGUE DES OFFRES
   --------------------------------------------------------------------------
   👉 C'est ici qu'on modifie les prix, les textes et les photos.
   Textes : [français, anglais, espagnol, portugais]

   pricing.type :
     'pp'    → prix par personne. tiers = tranches d'âge
               { k:'adult'|'child'|'baby'|'person', a:'11+' | '3-11' | 'u12', p: prix, sp: prix haute saison }
               variants = plusieurs formules (durée, musée, créneau…), chacune avec ses tiers
     'group' → forfait (bateau, voiture privée…). variants = [{ p, sp, max, l }]
     'unit'  → prix par unité (ex. par calèche)
   season   : 'xmas' (15 déc–10 janv) ou 'summer' (juin–sept) → utilise sp
   days     : jours de départ habituels (0 = dimanche … 6 = samedi) — info seulement
   photo    : chemin d'image (null = illustration automatique)
   photos   : plusieurs photos → galerie dans la fiche (la 1re sert aussi pour la carte)
   hidden   : true = offre masquée sur le site
   formulas : plusieurs formules dans une même activité (groupe / privé, VAN / BUS…).
              Chaque formule a son libellé l, ses horaires, ses inclus, ses notes et son pricing ;
              elle remplace les champs de l'activité (desc, notes, tags…) quand elle est choisie.
   ========================================================================== */

const OFFERS = [
  /* ===================== ACTIVITÉS AQUATIQUES ===================== */

  /* --- Dauphins --- */
  {
    id: 'dolphin-swim', cat: 'aqua', sub: 'dolphins', icon: 'dolphin', photo: 'img/dauphins-baignade.jpg',
    title: ['Nager avec les dauphins', 'Swim with dolphins', 'Nadar con delfines', 'Nadar com golfinhos'],
    place: 'hurghada', hours: '15:00–17:00', tags: ['family'],
    desc: [
      'Vivez un moment magique : une baignade au plus près des dauphins, ces créatures fascinantes. Un souvenir unique, pour petits et grands.',
      'Live a magical moment swimming right alongside dolphins, these fascinating creatures. A unique memory for young and old.',
      'Vive un momento mágico nadando junto a los delfines, estas criaturas fascinantes. Un recuerdo único para grandes y pequeños.',
      'Viva um momento mágico a nadar ao lado dos golfinhos, estas criaturas fascinantes. Uma recordação única para miúdos e graúdos.'
    ],
    notes: [[
      'Les photos au téléphone ne sont pas autorisées pendant la baignade. Photo officielle : 8 € la photo.',
      'Phones are not allowed during the swim. Official photo: €8 each.',
      'No se permiten fotos con el móvil durante el baño. Foto oficial: 8 € cada una.',
      'Não são permitidas fotos com telemóvel durante o banho. Foto oficial: 8 € cada.'
    ]],
    incl: ['hotelTransfer', 'swimSession'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', vk: 'vk_duration', variants: [
      { id: '5min', l: ['5 minutes', '5 minutes', '5 minutos', '5 minutos'], tiers: [{ k: 'person', p: 50 }] },
      { id: '10min', l: ['10 minutes', '10 minutes', '10 minutos', '10 minutos'], tiers: [{ k: 'person', p: 80 }] }
    ] },
    addons: ['dolphinPhoto']
  },
  {
    id: 'dolphin-show', cat: 'aqua', sub: 'dolphins', icon: 'dolphin', photo: 'img/dauphins-spectacle.jpg',
    title: ['Spectacle de dauphins', 'Dolphin show', 'Espectáculo de delfines', 'Espetáculo de golfinhos'],
    place: 'hurghada', dur: { h: 1.5 }, hours: '09:00–12:00', tags: ['family'],
    desc: [
      'Entrez dans l’univers des dauphins, phoques et otaries : un spectacle plein d’énergie qui enchantera petits et grands.',
      'Step into the world of dolphins, seals and sea lions: an energetic show that delights kids and adults alike.',
      'Entra en el mundo de los delfines, focas y leones marinos: un espectáculo lleno de energía que encantará a grandes y pequeños.',
      'Entre no mundo dos golfinhos, focas e leões-marinhos: um espetáculo cheio de energia que encanta miúdos e graúdos.'
    ],
    incl: ['hotelTransfer', 'showTicket'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 15 }] }
  },
  {
    id: 'dolphin-photo', cat: 'aqua', sub: 'dolphins', icon: 'camera', photo: 'img/dauphins-photo.jpg',
    title: ['Photo avec les dauphins', 'Photo with the dolphins', 'Foto con los delfines', 'Foto com os golfinhos'],
    place: 'hurghada', dur: { min: 5 }, hours: '15:00–17:00',
    desc: [
      'Un shooting photo avec les dauphins pour immortaliser chaque sourire, câlin et instant magique.',
      'A photo shoot with the dolphins to capture every smile, cuddle and magical moment.',
      'Una sesión de fotos con los delfines para inmortalizar cada sonrisa, abrazo e instante mágico.',
      'Uma sessão fotográfica com os golfinhos para eternizar cada sorriso, abraço e momento mágico.'
    ],
    incl: ['hotelTransfer', 'digitalPhotos'], excl: ['personal'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 40 }] }
  },
  {
    id: 'dolphin-house', cat: 'aqua', sub: 'dolphins', icon: 'sailboat', photo: 'img/maison-dauphins.jpg',
    title: ['Maison des dauphins en bateau', 'Dolphin House boat trip', 'Casa de los Delfines en barco', 'Casa dos Golfinhos de barco'],
    place: 'hurghada', hours: '09:00–16:00', tags: ['family'],
    desc: [
      'Cap sur la Maison des dauphins, un récif où l’on observe ces créatures dans leur habitat naturel, avec une session de snorkeling pour explorer la vie marine.',
      'Head to Dolphin House, a reef where you can watch dolphins in their natural habitat, with a snorkeling session to explore the marine life.',
      'Rumbo a la Casa de los Delfines, un arrecife donde observar a estos animales en su hábitat natural, con una sesión de snorkel para explorar la vida marina.',
      'Rumo à Casa dos Golfinhos, um recife onde se observam estes animais no seu habitat natural, com uma sessão de snorkeling para explorar a vida marinha.'
    ],
    incl: ['hotelTransfer', 'snorkelSession', 'lunch'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '10+', p: 25 }, { k: 'child', a: '3-10', p: 15 }, { k: 'baby', a: '0-2', p: 0 }] }
  },
  {
    id: 'dive-dolphin-house', cat: 'aqua', sub: 'dolphins', icon: 'scuba-diving', photo: 'img/plongee-dauphin-2.jpg',
    photos: ['img/plongee-dauphin-2.jpg', 'img/plongee-dauphin-1.jpg'],
    title: ['Plongée + Maison des dauphins', 'Scuba dive + Dolphin House', 'Buceo + Casa de los Delfines', 'Mergulho + Casa dos Golfinhos'],
    place: 'hurghada', hours: '08:00–16:00',
    desc: [
      'Cap sur la Maison des dauphins : deux plongées encadrées au milieu des coraux, avec la chance de croiser les dauphins. Ceux qui ne plongent pas profitent du snorkeling. Repas et boissons inclus.',
      'Head to Dolphin House: two guided dives among the corals, with a chance to meet the dolphins. Non-divers enjoy snorkeling instead. Meal and drinks included.',
      'Rumbo a la Casa de los Delfines: dos inmersiones guiadas entre corales, con la posibilidad de cruzarse con los delfines. Quien no bucea hace snorkel. Comida y bebidas incluidas.',
      'Rumo à Casa dos Golfinhos: dois mergulhos acompanhados entre os corais, com a hipótese de encontrar os golfinhos. Quem não mergulha faz snorkeling. Refeição e bebidas incluídas.'
    ],
    notes: [[
      'Programme : 2 plongées de 12 min, recherche des dauphins et repas vers 12 h 30.',
      'Schedule: 2 dives of 12 min, dolphin spotting and a meal around 12:30.',
      'Programa: 2 inmersiones de 12 min, búsqueda de delfines y comida hacia las 12:30.',
      'Programa: 2 mergulhos de 12 min, procura de golfinhos e refeição por volta das 12h30.'
    ], [
      'Plongée à partir de 10 ans. Pendant la plongée, ceux qui ne plongent pas font 2 sessions de snorkeling de 45 min : 23 €, adulte ou enfant ; gratuit pour les moins de 3 ans.',
      'Diving from age 10. During the dives, non-divers enjoy 2 snorkeling sessions of 45 min: €23, adult or child; free for children under 3.',
      'Buceo a partir de 10 años. Durante las inmersiones, quien no bucea hace 2 sesiones de snorkel de 45 min: 23 €, adulto o niño; gratis para menores de 3 años.',
      'Mergulho a partir dos 10 anos. Durante os mergulhos, quem não mergulha faz 2 sessões de snorkeling de 45 min: 23 €, adulto ou criança; grátis para menores de 3 anos.'
    ]],
    incl: ['hotelTransfer', 'boat', 'twoDives', 'snorkelGear', 'dolphinSearch', 'mealWithDrinks'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'diver', a: '10+', p: 45 }, { k: 'snorkeler', a: '3+', p: 23 }, { k: 'baby', a: 'u3', p: 0 }] }
  },

  /* --- Îles & plages --- */
  {
    id: 'eden', cat: 'aqua', sub: 'islands', icon: 'beach', photo: 'img/ile-eden.jpg', photoPos: 'center top',
    title: ['Eden Island', 'Eden Island', 'Eden Island', 'Eden Island'],
    place: 'hurghada', tags: ['family'],
    desc: [
      'Une journée all-inclusive sur Eden Island : plage, eau turquoise et session de snorkeling pour explorer les fonds de la mer Rouge.',
      'An all-inclusive day on Eden Island: beach, turquoise water and a snorkeling session to explore the Red Sea reefs.',
      'Un día todo incluido en Eden Island: playa, agua turquesa y una sesión de snorkel para explorar los fondos del mar Rojo.',
      'Um dia com tudo incluído em Eden Island: praia, água turquesa e uma sessão de snorkeling para explorar os fundos do mar Vermelho.'
    ],
    excl: ['personal', 'photographer'],
    formulas: [
      {
        id: 'group', l: ['Excursion en groupe', 'Group excursion', 'Excursión en grupo', 'Excursão em grupo'],
        hours: '09:00–15:30', tags: ['family'],
        notes: [['Jusqu’à 6 h sur l’île', 'Up to 6 hours on the island', 'Hasta 6 horas en la isla', 'Até 6 horas na ilha']],
        incl: ['hotelTransfer', 'islandEntry', 'boat', 'morningSnack', 'buffet2h', 'openDrinks'],
        pricing: { type: 'pp', tiers: [{ k: 'adult', a: '11+', p: 60 }, { k: 'child', a: '3-11', p: 35 }, { k: 'baby', a: '0-2', p: 0 }] }
      },
      {
        id: 'private', l: ['Privé en speed boat', 'Private speedboat', 'Privado en lancha', 'Privado de lancha'],
        dur: { h: 5 }, max: 3, tags: ['private'],
        desc: [
          'Rejoignez Eden Island à bord d’un speed boat privé pour explorer ses eaux cristallines et sa beauté sauvage, à votre rythme.',
          'Reach Eden Island aboard a private speedboat and explore its crystal-clear waters and wild beauty at your own pace.',
          'Llega a Eden Island a bordo de una lancha privada y explora sus aguas cristalinas y su belleza salvaje a tu ritmo.',
          'Chegue a Eden Island a bordo de uma lancha privada e explore as suas águas cristalinas e beleza selvagem ao seu ritmo.'
        ],
        notes: [['Tarif unique, quel que soit l’âge : les enfants sont facturés au même prix que les adultes.', 'Single rate regardless of age: children are charged the same price as adults.', 'Tarifa única sin distinción de edad: los niños pagan el mismo precio que los adultos.', 'Tarifa única, independentemente da idade: as crianças pagam o mesmo preço que os adultos.']],
        incl: ['hotelTransfer', 'snorkelGear', 'mealIsland', 'islandEntry'],
        pricing: { type: 'pp', tiers: [{ k: 'person', p: 220 }] }
      }
    ]
  },
  {
    id: 'paradise', cat: 'aqua', sub: 'islands', icon: 'sun-high', photo: 'img/paradise-coeur.jpg', photoPos: 'center 10%',
    title: ['Paradise Island', 'Paradise Island', 'Paradise Island', 'Paradise Island'],
    place: 'hurghada', hours: '09:00–15:30', tags: ['family'],
    desc: [
      'Une journée détente sur une île aux eaux turquoise : baignade, snorkeling en mer Rouge et bouée tractée (banane).',
      'A relaxing day on an island with turquoise waters: swimming, Red Sea snorkeling and a banana-boat ride.',
      'Un día de relax en una isla de aguas turquesas: baño, snorkel en el mar Rojo y banana boat.',
      'Um dia de descanso numa ilha de águas turquesa: banhos, snorkeling no mar Vermelho e banana boat.'
    ],
    notes: [['Jusqu’à 6 h sur l’île', 'Up to 6 hours on the island', 'Hasta 6 horas en la isla', 'Até 6 horas na ilha']],
    incl: ['hotelTransfer', 'islandEntry', 'yacht', 'snorkelGear', 'lunchOpenDrinks'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '13+', p: 55 }, { k: 'child', a: '4-12', p: 27.5 }, { k: 'baby', a: '0-3', p: 0 }] }
  },
  {
    id: 'mahmya', cat: 'aqua', sub: 'islands', icon: 'anchor', photo: 'img/mahmya-vue.jpg',
    title: ['Mahmya Island', 'Mahmya Island', 'Mahmya Island', 'Mahmya Island'],
    place: 'hurghada', tags: ['family'],
    desc: [
      'Sable doux et eau d’un bleu turquoise éclatant : Mahmya est l’île idéale pour se relaxer toute la journée dans un cadre naturel préservé.',
      'Soft sand and dazzling turquoise water: Mahmya is the perfect island to relax all day in unspoilt nature.',
      'Arena suave y agua de un turquesa deslumbrante: Mahmya es la isla ideal para relajarse todo el día en plena naturaleza.',
      'Areia macia e água de um turquesa deslumbrante: Mahmya é a ilha ideal para relaxar o dia inteiro em plena natureza.'
    ],
    excl: ['personal', 'photographer'],
    formulas: [
      {
        id: 'group', l: ['Excursion en groupe', 'Group excursion', 'Excursión en grupo', 'Excursão em grupo'],
        hours: '09:00–15:30', tags: ['family'],
        notes: [['Jusqu’à 6 h sur l’île', 'Up to 6 hours on the island', 'Hasta 6 horas en la isla', 'Até 6 horas na ilha']],
        incl: ['hotelTransfer', 'islandEntry', 'boat', 'snorkelGear', 'buffetDrinks'],
        pricing: { type: 'pp', tiers: [{ k: 'adult', a: '10+', p: 85 }, { k: 'child', a: '2-10', p: 40 }, { k: 'baby', a: '0-1', p: 0 }] }
      },
      {
        id: 'private', l: ['Privé en speed boat', 'Private speedboat', 'Privado en lancha', 'Privado de lancha'],
        hours: '09:00–15:30', tags: ['private'],
        desc: [
          'Une sortie privée en speed boat jusqu’à Mahmya, puis détente sur la plage de l’île. Entrée à Mahmya incluse.',
          'A private speedboat trip to Mahmya, then time to relax on the island’s beach. Mahmya entrance included.',
          'Una salida privada en lancha hasta Mahmya y después relax en la playa de la isla. Entrada a Mahmya incluida.',
          'Um passeio privado de lancha até Mahmya e depois descanso na praia da ilha. Entrada em Mahmya incluída.'
        ],
        notes: [['Tarif unique, quel que soit l’âge : les enfants sont facturés au même prix que les adultes.', 'Single rate regardless of age: children are charged the same price as adults.', 'Tarifa única sin distinción de edad: los niños pagan el mismo precio que los adultos.', 'Tarifa única, independentemente da idade: as crianças pagam o mesmo preço que os adultos.']],
        incl: ['hotelTransfer', 'mahmyaEntry'],
        pricing: { type: 'group', variants: [{ id: 'sb', p: 210, max: 3 }] }
      }
    ]
  },
  {
    id: 'magawish', cat: 'aqua', sub: 'islands', icon: 'speedboat', photo: 'img/magawish-panneau.jpg',
    title: ['L’île Magawish', 'Magawish Island', 'Isla Magawish', 'Ilha Magawish'],
    place: 'hurghada', hours: '09:00–16:00', tags: ['family'],
    desc: [
      'Une sortie en bateau le long de la côte jusqu’à l’île de Magawish : vues magiques, détente et baignade dans les plus beaux spots de la mer Rouge.',
      'A boat trip along the coast to Magawish Island: stunning views, relaxing and swimming at some of the best spots in the Red Sea.',
      'Una salida en barco por la costa hasta la isla de Magawish: vistas mágicas, relax y baño en los mejores rincones del mar Rojo.',
      'Um passeio de barco ao longo da costa até à ilha de Magawish: vistas mágicas, descanso e banhos nos melhores recantos do mar Vermelho.'
    ],
    notes: [['1 h 45 sur l’île', '1 h 45 on the island', '1 h 45 en la isla', '1 h 45 na ilha']],
    incl: ['hotelTransfer', 'boatTrip', 'lunch'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '10+', p: 25 }, { k: 'child', a: '3-10', p: 15 }, { k: 'baby', a: '0-2', p: 0 }] }
  },
  {
    id: 'hulahula', cat: 'aqua', sub: 'islands', icon: 'scuba-mask', photo: 'img/ile-hulahula.jpg',
    title: ['L’île Hula Hula', 'Hula Hula Island', 'Isla Hula Hula', 'Ilha Hula Hula'],
    place: 'hurghada', hours: '09:00–16:00', tags: ['family'],
    desc: [
      'Une escapade sur l’île Hula Hula, un petit paradis aux eaux translucides et à la faune marine fascinante.',
      'A getaway to Hula Hula Island, a little paradise of crystal-clear water and fascinating marine life.',
      'Una escapada a la isla Hula Hula, un pequeño paraíso de aguas cristalinas y fauna marina fascinante.',
      'Uma escapadinha à ilha Hula Hula, um pequeno paraíso de águas cristalinas e vida marinha fascinante.'
    ],
    notes: [['1 h 45 sur l’île', '1 h 45 on the island', '1 h 45 en la isla', '1 h 45 na ilha']],
    incl: ['hotelTransfer', 'diveSnorkelGear', 'lunchDrink'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '10+', p: 25 }, { k: 'child', a: '3-10', p: 15 }, { k: 'baby', a: '0-2', p: 0 }] }
  },
  {
    id: 'orangebay', cat: 'aqua', sub: 'islands', icon: 'sunrise', photo: 'img/ile-orangebay.jpg',
    photos: ['img/ile-orangebay.jpg', 'img/orangebay-giftun.jpg', 'img/orangebay-vue.jpg', 'img/orangebay-coeurs.jpg', 'img/orangebay-escalier.jpg'],
    title: ['L’île Orange Bay', 'Orange Bay Island', 'Isla Orange Bay', 'Ilha Orange Bay'],
    place: 'hurghada', hours: '09:00–16:00', tags: ['family'],
    desc: [
      'Cap sur Orange Bay en yacht : hamacs et balançoires sur la plage, eau cristalline et activités nautiques pour découvrir la faune de la mer Rouge.',
      'Sail to Orange Bay by yacht: hammocks and swings on the beach, crystal-clear water and water activities to discover Red Sea marine life.',
      'Navega en yate hasta Orange Bay: hamacas y columpios en la playa, agua cristalina y actividades acuáticas para descubrir la fauna del mar Rojo.',
      'Navegue de iate até Orange Bay: redes e baloiços na praia, água cristalina e atividades aquáticas para descobrir a vida marinha do mar Vermelho.'
    ],
    notes: [['1 h 45 sur l’île', '1 h 45 on the island', '1 h 45 en la isla', '1 h 45 na ilha']],
    incl: ['hotelTransfer', 'islandEntry', 'yacht', 'snorkelGear', 'lunchBoat', 'openDrinksBoat'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '10+', p: 25 }, { k: 'child', a: '3-10', p: 12.5 }, { k: 'baby', a: '0-2', p: 0 }] }
  },
  {
    id: 'amwaj', cat: 'aqua', sub: 'islands', icon: 'beach', photo: 'img/amwaj-plage.jpg',
    photos: ['img/amwaj-plage.jpg', 'img/amwaj-tour.jpg'],
    title: ['L’île Amwaj', 'Amwaj Island', 'Isla Amwaj', 'Ilha Amwaj'],
    place: 'hurghada', hours: '09:00–15:30', tags: ['family'],
    desc: [
      'Une journée sur l’île Amwaj : longue plage de sable blanc, parasols en paille et eau turquoise. Deux sessions de snorkeling, repas à bord, boissons et fruits inclus.',
      'A day on Amwaj Island: a long white-sand beach, straw parasols and turquoise water. Two snorkeling sessions, meal on board, drinks and fruit included.',
      'Un día en la isla Amwaj: larga playa de arena blanca, sombrillas de paja y agua turquesa. Dos sesiones de snorkel, comida a bordo, bebidas y fruta incluidas.',
      'Um dia na ilha Amwaj: longa praia de areia branca, chapéus de palha e água turquesa. Duas sessões de snorkeling, refeição a bordo, bebidas e fruta incluídas.'
    ],
    notes: [[
      'Programme : 1 h 45 sur l’île, 2 sessions de snorkeling de 30 min avec le matériel et repas à bord vers 12 h 30.',
      'Schedule: 1 h 45 on the island, 2 snorkeling sessions of 30 min with gear, and a meal on board around 12:30.',
      'Programa: 1 h 45 en la isla, 2 sesiones de snorkel de 30 min con el equipo y comida a bordo hacia las 12:30.',
      'Programa: 1h45 na ilha, 2 sessões de snorkeling de 30 min com o equipamento e refeição a bordo por volta das 12h30.'
    ]],
    incl: ['hotelTransfer', 'boat', 'snorkelGear', 'lunchBoat', 'drinksFruits'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '10+', p: 30 }, { k: 'child', a: '3-10', p: 15 }, { k: 'baby', a: 'u3', p: 0 }] }
  },
  /* --- Combos : deux activités sur une journée --- */
  {
    id: 'combo-orange-hula', cat: 'aqua', sub: 'islands', icon: 'beach', photo: 'img/hulahula-plage.jpg',
    photos: ['img/hulahula-plage.jpg', 'img/orangebay-coeurs.jpg', 'img/orangebay-vue.jpg', 'img/hulahula-panneau.jpg', 'img/orangebay-escalier.jpg', 'img/hulahula-hamac.jpg', 'img/hulahula-etoile.jpg'],
    title: ['Orange Bay + Hula Hula (2 îles)', 'Orange Bay + Hula Hula (2 islands)', 'Orange Bay + Hula Hula (2 islas)', 'Orange Bay + Hula Hula (2 ilhas)'],
    place: 'hurghada', hours: '08:00–16:30', tags: ['family'],
    desc: [
      'Deux îles en une seule journée : Orange Bay et ses pontons en bois sur une eau turquoise, puis Hula Hula, sa plage de sable blanc et ses hamacs. Un arrêt snorkeling en pleine mer et le repas complètent la journée.',
      'Two islands in one day: Orange Bay with its wooden jetties over turquoise water, then Hula Hula with its white-sand beach and hammocks. A snorkeling stop in open sea and a meal complete the day.',
      'Dos islas en un solo día: Orange Bay y sus pasarelas de madera sobre agua turquesa, y después Hula Hula, con su playa de arena blanca y sus hamacas. Una parada de snorkel en mar abierto y la comida completan el día.',
      'Duas ilhas num só dia: Orange Bay e os seus passadiços de madeira sobre água turquesa e depois Hula Hula, com a sua praia de areia branca e as suas redes. Uma paragem de snorkeling em mar aberto e a refeição completam o dia.'
    ],
    notes: [[
      'Programme : 1 h sur Orange Bay, 1 h sur Hula Hula, un arrêt snorkeling de 45 min à 1 h et repas vers 12 h 30.',
      'Schedule: 1 h on Orange Bay, 1 h on Hula Hula, one snorkeling stop of 45 min to 1 h, and a meal around 12:30.',
      'Programa: 1 h en Orange Bay, 1 h en Hula Hula, una parada de snorkel de 45 min a 1 h y comida hacia las 12:30.',
      'Programa: 1 h em Orange Bay, 1 h em Hula Hula, uma paragem de snorkeling de 45 min a 1 h e refeição por volta das 12h30.'
    ]],
    incl: ['hotelTransfer', 'boat', 'snorkelGear', 'mealWithDrinks'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '12+', p: 50 }, { k: 'child', a: '5-12', p: 25 }, { k: 'baby', a: 'u5', p: 0 }] }
  },
  {
    id: 'combo-orange-magawish', cat: 'aqua', sub: 'islands', icon: 'beach', photo: 'img/orangebay-giftun.jpg',
    photos: ['img/orangebay-giftun.jpg', 'img/magawish-panneau.jpg', 'img/orangebay-vue.jpg', 'img/orangebay-coeurs.jpg', 'img/orangebay-escalier.jpg'],
    title: ['Orange Bay + Magawish (2 îles)', 'Orange Bay + Magawish (2 islands)', 'Orange Bay + Magawish (2 islas)', 'Orange Bay + Magawish (2 ilhas)'],
    place: 'hurghada', hours: '08:00–16:30', tags: ['family'],
    desc: [
      'Deux îles en une seule journée : Orange Bay et ses pontons en bois sur une eau turquoise, puis Magawish et sa plage de sable fin. Snorkeling en pleine mer et repas inclus.',
      'Two islands in one day: Orange Bay with its wooden jetties over turquoise water, then Magawish and its fine-sand beach. Open-sea snorkeling and a meal included.',
      'Dos islas en un solo día: Orange Bay y sus pasarelas de madera sobre agua turquesa, y después Magawish y su playa de arena fina. Snorkel en mar abierto y comida incluidos.',
      'Duas ilhas num só dia: Orange Bay e os seus passadiços de madeira sobre água turquesa e depois Magawish e a sua praia de areia fina. Snorkeling em mar aberto e refeição incluídos.'
    ],
    notes: [[
      'Programme : 1 h sur Orange Bay, 1 h sur Magawish, 1 h de snorkeling avec le matériel et repas vers 12 h 30.',
      'Schedule: 1 h on Orange Bay, 1 h on Magawish, 1 h of snorkeling with gear and a meal around 12:30.',
      'Programa: 1 h en Orange Bay, 1 h en Magawish, 1 h de snorkel con el equipo y comida hacia las 12:30.',
      'Programa: 1 h em Orange Bay, 1 h em Magawish, 1 h de snorkeling com o equipamento e refeição por volta das 12h30.'
    ]],
    incl: ['hotelTransfer', 'boat', 'snorkelGear', 'mealWithDrinks'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '12+', p: 50 }, { k: 'child', a: '5-12', p: 25 }, { k: 'baby', a: 'u5', p: 0 }] }
  },
  {
    id: 'combo-orange-amwaj', cat: 'aqua', sub: 'islands', icon: 'beach', photo: 'img/amwaj-plage.jpg',
    photos: ['img/amwaj-plage.jpg', 'img/orangebay-giftun.jpg', 'img/amwaj-tour.jpg', 'img/orangebay-vue.jpg', 'img/orangebay-coeurs.jpg'],
    title: ['Orange Bay + Amwaj (2 îles)', 'Orange Bay + Amwaj (2 islands)', 'Orange Bay + Amwaj (2 islas)', 'Orange Bay + Amwaj (2 ilhas)'],
    place: 'hurghada', hours: '08:00–16:30', tags: ['family'],
    desc: [
      'Deux îles en une seule journée : Orange Bay et ses pontons en bois sur une eau turquoise, puis Amwaj, sa longue plage de sable blanc et ses parasols en paille. Snorkeling en pleine mer et repas inclus.',
      'Two islands in one day: Orange Bay with its wooden jetties over turquoise water, then Amwaj with its long white-sand beach and straw parasols. Open-sea snorkeling and a meal included.',
      'Dos islas en un solo día: Orange Bay y sus pasarelas de madera sobre agua turquesa, y después Amwaj, con su larga playa de arena blanca y sus sombrillas de paja. Snorkel en mar abierto y comida incluidos.',
      'Duas ilhas num só dia: Orange Bay e os seus passadiços de madeira sobre água turquesa e depois Amwaj, com a sua longa praia de areia branca e chapéus de palha. Snorkeling em mar aberto e refeição incluídos.'
    ],
    notes: [[
      'Programme : 1 h sur Orange Bay, 1 h sur Amwaj, 1 h de snorkeling avec le matériel et repas vers 12 h 30.',
      'Schedule: 1 h on Orange Bay, 1 h on Amwaj, 1 h of snorkeling with gear and a meal around 12:30.',
      'Programa: 1 h en Orange Bay, 1 h en Amwaj, 1 h de snorkel con el equipo y comida hacia las 12:30.',
      'Programa: 1 h em Orange Bay, 1 h em Amwaj, 1 h de snorkeling com o equipamento e refeição por volta das 12h30.'
    ]],
    incl: ['hotelTransfer', 'boat', 'snorkelGear', 'mealWithDrinks'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '12+', p: 50 }, { k: 'child', a: '5-12', p: 25 }, { k: 'baby', a: 'u5', p: 0 }] }
  },
  {
    id: 'combo-hula-dive', cat: 'aqua', sub: 'islands', icon: 'scuba-diving', photo: 'img/hulahula-panneau.jpg',
    photos: ['img/hulahula-panneau.jpg', 'img/plongee-duo.jpg', 'img/plongee-coraux.jpg', 'img/bateau-elyazia.jpg', 'img/hulahula-plage.jpg', 'img/hulahula-hamac.jpg', 'img/hulahula-etoile.jpg'],
    title: ['Hula Hula + plongée sous-marine', 'Hula Hula + scuba dive', 'Hula Hula + buceo', 'Hula Hula + mergulho'],
    place: 'hurghada', hours: '08:00–16:30',
    desc: [
      'Détente et découverte dans la même journée : 1 h 30 sur la plage de Hula Hula, deux sessions de snorkeling et une plongée sous-marine encadrée pour admirer de près les coraux de la mer Rouge.',
      'Relaxation and discovery in the same day: 1.5 hours on the beach at Hula Hula, two snorkeling sessions and a guided scuba dive to see the Red Sea corals up close.',
      'Relax y descubrimiento en el mismo día: 1 h 30 en la playa de Hula Hula, dos sesiones de snorkel y una inmersión guiada para admirar de cerca los corales del mar Rojo.',
      'Descanso e descoberta no mesmo dia: 1h30 na praia de Hula Hula, duas sessões de snorkeling e um mergulho acompanhado para admirar de perto os corais do mar Vermelho.'
    ],
    notes: [[
      'Programme : 1 h 30 sur Hula Hula, 2 sessions de snorkeling de 30 min, plongée de 12 min à 5 m de profondeur et repas vers 12 h 30.',
      'Schedule: 1.5 hours on Hula Hula, 2 snorkeling sessions of 30 min, a 12-min dive at 5 m depth, and a meal around 12:30.',
      'Programa: 1 h 30 en Hula Hula, 2 sesiones de snorkel de 30 min, inmersión de 12 min a 5 m de profundidad y comida hacia las 12:30.',
      'Programa: 1h30 em Hula Hula, 2 sessões de snorkeling de 30 min, mergulho de 12 min a 5 m de profundidade e refeição por volta das 12h30.'
    ], [
      'Avec plongée : 45 € (journée 15 € + plongée 30 €), à partir de 12 ans. Sans plongée : 15 € dès 5 ans ; gratuit pour les moins de 5 ans.',
      'With dive: €45 (day €15 + dive €30), from age 12. Without dive: €15 from age 5; free for children under 5.',
      'Con buceo: 45 € (día 15 € + buceo 30 €), a partir de 12 años. Sin buceo: 15 € desde 5 años; gratis para menores de 5 años.',
      'Com mergulho: 45 € (dia 15 € + mergulho 30 €), a partir dos 12 anos. Sem mergulho: 15 € a partir dos 5 anos; grátis para menores de 5 anos.'
    ]],
    incl: ['hotelTransfer', 'boat', 'snorkelGear', 'diveIntro', 'mealWithDrinks'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'diver', a: '12+', p: 45 }, { k: 'escort', a: '5+', p: 15 }, { k: 'baby', a: 'u5', p: 0 }] }
  },
  {
    id: 'combo-orange-dive', cat: 'aqua', sub: 'islands', icon: 'scuba-diving', photo: 'img/orangebay-vue.jpg',
    photos: ['img/orangebay-vue.jpg', 'img/plongee-duo.jpg', 'img/plongee-coraux.jpg', 'img/bateau-elyazia.jpg', 'img/orangebay-coeurs.jpg', 'img/orangebay-escalier.jpg'],
    title: ['Orange Bay + plongée sous-marine', 'Orange Bay + scuba dive', 'Orange Bay + buceo', 'Orange Bay + mergulho'],
    place: 'hurghada', hours: '08:00–16:30',
    desc: [
      'Détente et découverte dans la même journée : 1 h 45 sur la plage d’Orange Bay, deux sessions de snorkeling et une plongée sous-marine encadrée pour admirer de près les coraux de la mer Rouge.',
      'Relaxation and discovery in the same day: 1 h 45 on the beach at Orange Bay, two snorkeling sessions and a guided scuba dive to see the Red Sea corals up close.',
      'Relax y descubrimiento en el mismo día: 1 h 45 en la playa de Orange Bay, dos sesiones de snorkel y una inmersión guiada para admirar de cerca los corales del mar Rojo.',
      'Descanso e descoberta no mesmo dia: 1h45 na praia de Orange Bay, duas sessões de snorkeling e um mergulho acompanhado para admirar de perto os corais do mar Vermelho.'
    ],
    notes: [[
      'Programme : 1 h 45 sur Orange Bay, 2 sessions de snorkeling de 30 min, plongée de 12 min à 5 m de profondeur et repas vers 12 h 30.',
      'Schedule: 1 h 45 on Orange Bay, 2 snorkeling sessions of 30 min, a 12-min dive at 5 m depth, and a meal around 12:30.',
      'Programa: 1 h 45 en Orange Bay, 2 sesiones de snorkel de 30 min, inmersión de 12 min a 5 m de profundidad y comida hacia las 12:30.',
      'Programa: 1h45 em Orange Bay, 2 sessões de snorkeling de 30 min, mergulho de 12 min a 5 m de profundidade e refeição por volta das 12h30.'
    ], [
      'Avec plongée : 45 € (journée 15 € + plongée 30 €), à partir de 12 ans. Sans plongée : 15 € dès 5 ans ; gratuit pour les moins de 5 ans.',
      'With dive: €45 (day €15 + dive €30), from age 12. Without dive: €15 from age 5; free for children under 5.',
      'Con buceo: 45 € (día 15 € + buceo 30 €), a partir de 12 años. Sin buceo: 15 € desde 5 años; gratis para menores de 5 años.',
      'Com mergulho: 45 € (dia 15 € + mergulho 30 €), a partir dos 12 anos. Sem mergulho: 15 € a partir dos 5 anos; grátis para menores de 5 anos.'
    ]],
    incl: ['hotelTransfer', 'boat', 'snorkelGear', 'diveIntro', 'mealWithDrinks'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'diver', a: '12+', p: 45 }, { k: 'escort', a: '5+', p: 15 }, { k: 'baby', a: 'u5', p: 0 }] }
  },
  {
    id: 'combo-orange-hula-dive', cat: 'aqua', sub: 'islands', icon: 'scuba-diving', photo: 'img/orangebay-vue.jpg',
    photos: ['img/orangebay-vue.jpg', 'img/plongee-duo.jpg', 'img/hulahula-panneau.jpg', 'img/orangebay-escalier.jpg', 'img/plongee-coraux.jpg', 'img/hulahula-plage.jpg'],
    title: ['Orange Bay + Hula Hula + plongée', 'Orange Bay + Hula Hula + scuba dive', 'Orange Bay + Hula Hula + buceo', 'Orange Bay + Hula Hula + mergulho'],
    place: 'hurghada', hours: '08:00–16:30',
    desc: [
      'La journée complète : deux îles, Orange Bay et Hula Hula, une plongée sous-marine encadrée et une session de snorkeling, avec repas et boissons à bord.',
      'The full day: two islands, Orange Bay and Hula Hula, a guided scuba dive and a snorkeling session, with meal and drinks on board.',
      'El día completo: dos islas, Orange Bay y Hula Hula, una inmersión guiada y una sesión de snorkel, con comida y bebidas a bordo.',
      'O dia completo: duas ilhas, Orange Bay e Hula Hula, um mergulho acompanhado e uma sessão de snorkeling, com refeição e bebidas a bordo.'
    ],
    notes: [[
      'Programme : 1 h sur Orange Bay, 1 h sur Hula Hula, une plongée de 12 min, 30 min de snorkeling et repas à bord vers 12 h 30.',
      'Schedule: 1 h on Orange Bay, 1 h on Hula Hula, a 12-min dive, 30 min of snorkeling and a meal on board around 12:30.',
      'Programa: 1 h en Orange Bay, 1 h en Hula Hula, una inmersión de 12 min, 30 min de snorkel y comida a bordo hacia las 12:30.',
      'Programa: 1 h em Orange Bay, 1 h em Hula Hula, um mergulho de 12 min, 30 min de snorkeling e refeição a bordo por volta das 12h30.'
    ], [
      'Plongée à partir de 10 ans. Sans plongée (snorkeling) : 30 €, adulte ou enfant ; gratuit pour les moins de 3 ans.',
      'Diving from age 10. Without dive (snorkeling): €30, adult or child; free for children under 3.',
      'Buceo a partir de 10 años. Sin buceo (snorkel): 30 €, adulto o niño; gratis para menores de 3 años.',
      'Mergulho a partir dos 10 anos. Sem mergulho (snorkeling): 30 €, adulto ou criança; grátis para menores de 3 anos.'
    ]],
    incl: ['hotelTransfer', 'boat', 'snorkelGear', 'diveOnce12', 'lunchBoat', 'drinksBoat'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'diver', a: '10+', p: 60 }, { k: 'snorkeler', a: '3+', p: 30 }, { k: 'baby', a: 'u3', p: 0 }] }
  },
  {
    id: 'combo-orange-white', cat: 'aqua', sub: 'islands', icon: 'sailboat', photo: 'img/white-island-bancs.jpg',
    photos: ['img/white-island-bancs.jpg', 'img/orangebay-vue.jpg', 'img/orangebay-coeurs.jpg', 'img/orangebay-escalier.jpg'],
    title: ['Orange Bay + White Island', 'Orange Bay + White Island', 'Orange Bay + White Island', 'Orange Bay + White Island'],
    place: 'hurghada', hours: '08:00–16:00', tags: ['family'],
    desc: [
      'Deux escales de rêve en une journée : Orange Bay et ses pontons en bois, puis les bancs de sable blanc de White Island. Snorkeling, repas et boissons à bord.',
      'Two dream stops in one day: Orange Bay with its wooden jetties, then the white sandbanks of White Island. Snorkeling, meal and drinks on board.',
      'Dos paradas de ensueño en un día: Orange Bay y sus pasarelas de madera, y después los bancos de arena blanca de White Island. Snorkel, comida y bebidas a bordo.',
      'Duas paragens de sonho num dia: Orange Bay e os seus passadiços de madeira e depois os bancos de areia branca de White Island. Snorkeling, refeição e bebidas a bordo.'
    ],
    notes: [[
      'Programme : 1 h 45 sur Orange Bay, 1 h sur White Island, 2 sessions de snorkeling de 30 min et repas à bord vers 12 h 30.',
      'Schedule: 1 h 45 on Orange Bay, 1 h on White Island, 2 snorkeling sessions of 30 min and a meal on board around 12:30.',
      'Programa: 1 h 45 en Orange Bay, 1 h en White Island, 2 sesiones de snorkel de 30 min y comida a bordo hacia las 12:30.',
      'Programa: 1h45 em Orange Bay, 1 h em White Island, 2 sessões de snorkeling de 30 min e refeição a bordo por volta das 12h30.'
    ]],
    incl: ['hotelTransfer', 'boat', 'snorkelGear', 'lunchBoat', 'drinksBoat'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '10+', p: 30 }, { k: 'child', a: '3-10', p: 15 }, { k: 'baby', a: 'u3', p: 0 }] }
  },
  {
    id: 'bianca', cat: 'aqua', sub: 'islands', icon: 'ripple', photo: 'img/bianca-vue.jpg',
    title: ['L’île Bianca', 'Bianca Island', 'Isla Bianca', 'Ilha Bianca'],
    place: 'hurghada', hours: '09:00–16:00', tags: ['family'],
    desc: [
      'Plages de sable blanc, snorkeling et activités nautiques incluses (banana boat, sofa tracté, bateau à fond de verre) : une journée complète en mer Rouge.',
      'White-sand beaches, snorkeling and water activities included (banana boat, towed sofa, glass-bottom boat): a full day on the Red Sea.',
      'Playas de arena blanca, snorkel y actividades acuáticas incluidas (banana boat, sofá, barco con fondo de cristal): un día completo en el mar Rojo.',
      'Praias de areia branca, snorkeling e atividades aquáticas incluídas (banana boat, sofá, barco com fundo de vidro): um dia completo no mar Vermelho.'
    ],
    incl: ['hotelTransfer', 'islandEntry', 'snorkelGear', 'meal', 'drink', 'dessert', 'bananaSofa', 'glassBoat'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '11+', p: 65 }, { k: 'child', a: '3-11', p: 35 }, { k: 'baby', a: '0-2', p: 0 }] }
  },
  {
    id: 'ozeria', cat: 'aqua', sub: 'islands', icon: 'kayak', photo: 'img/ozeria-piscine.jpg',
    title: ['L’île Ozeria', 'Ozeria Island', 'Isla Ozeria', 'Ilha Ozeria'],
    place: 'hurghada', hours: '09:00–15:30', tags: ['family'],
    desc: [
      'Une journée de plaisir et de détente sur l’île Ozeria : plages paisibles, snorkeling et balades en bord de mer.',
      'A day of fun and relaxation on Ozeria Island: peaceful beaches, snorkeling and seaside walks.',
      'Un día de diversión y relax en la isla Ozeria: playas tranquilas, snorkel y paseos junto al mar.',
      'Um dia de diversão e descanso na ilha Ozeria: praias tranquilas, snorkeling e passeios à beira-mar.'
    ],
    incl: ['hotelTransfer', 'islandEntry', 'snorkelGear', 'meal', 'drink'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '11+', p: 60 }, { k: 'child', a: '4-10', p: 30 }, { k: 'baby', a: '0-3', p: 0 }] }
  },
  {
    id: 'white-island', cat: 'aqua', sub: 'islands', icon: 'sunset', photo: 'img/ile-white-island.jpg',
    title: ['White Island', 'White Island', 'White Island', 'White Island'],
    place: 'hurghada', dur: { h: 4 }, tags: ['private', 'sunset'],
    desc: [
      'Snorkeling dans les eaux cristallines de White Island, au milieu des poissons tropicaux et des coraux colorés. Boissons et fruits inclus, en famille ou entre amis.',
      'Snorkel the crystal-clear waters of White Island among tropical fish and colourful coral. Drinks and fruit included — perfect with family or friends.',
      'Snorkel en las aguas cristalinas de White Island entre peces tropicales y corales de colores. Bebidas y fruta incluidas, en familia o con amigos.',
      'Snorkeling nas águas cristalinas de White Island entre peixes tropicais e corais coloridos. Bebidas e fruta incluídas, em família ou entre amigos.'
    ],
    incl: ['hotelTransferHrg', 'drinks', 'fruits'], excl: ['personal', 'photographer'],
    pricing: { type: 'group', vk: 'vk_slot', min: 2, variants: [
      { id: 'day', l: ['En journée', 'Daytime', 'De día', 'De dia'], p: 150, max: 6 },
      { id: 'sunset', l: ['Coucher du soleil', 'Sunset', 'Atardecer', 'Pôr do sol'], p: 160, max: 6 }
    ] }
  },

  /* --- Plongée & fonds marins --- */
  {
    id: 'diving', supp: 'cairo', cat: 'aqua', sub: 'sea', icon: 'scuba-diving', photo: 'img/plongee.jpg',
    title: ['Plongée sous-marine', 'Scuba diving', 'Buceo', 'Mergulho'],
    place: 'hurghada', hours: '09:00–16:00',
    desc: [
      'Explorez deux sites de plongée d’Hurghada, réputés pour la richesse de leurs fonds marins, accessibles aux débutants comme aux plongeurs confirmés.',
      'Explore two Hurghada dive sites known for their rich marine life — suitable for beginners and experienced divers alike.',
      'Explora dos puntos de buceo de Hurghada, famosos por la riqueza de sus fondos, aptos para principiantes y buceadores con experiencia.',
      'Explore dois pontos de mergulho de Hurghada, famosos pela riqueza dos seus fundos, acessíveis a principiantes e a mergulhadores experientes.'
    ],
    notes: [['Option snorkeling uniquement : +15 € / pers.', 'Snorkeling-only option: +€15 / person', 'Opción solo snorkel: +15 € / pers.', 'Opção só snorkeling: +15 € / pessoa']],
    incl: ['hotelTransfer', 'diveSnorkelGear', 'lunchDrink'], excl: ['photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 30 }] }
  },
  {
    id: 'seascope', supp: 'none', cat: 'aqua', sub: 'sea', icon: 'fish', photo: 'img/seascope.jpg',
    title: ['Seascope – bateau à fond de verre', 'Seascope glass-bottom boat', 'Seascope – barco con fondo de cristal', 'Seascope – barco com fundo de vidro'],
    place: 'hurghada', dur: { h: 2 }, tags: ['family'],
    slots: ['09:00–11:00', '11:00–13:00', '13:00–15:00', '15:00–18:00'],
    desc: [
      'À bord de ce bateau au fond vitré panoramique, admirez les récifs coralliens et leur faune de tout près, puis profitez d’un arrêt snorkeling.',
      'Aboard this panoramic glass-bottom boat, admire the coral reefs and their marine life up close, then enjoy a snorkeling stop.',
      'A bordo de este barco con fondo de cristal panorámico, admira de cerca los arrecifes de coral y su fauna, y disfruta de una parada de snorkel.',
      'A bordo deste barco com fundo de vidro panorâmico, admire de perto os recifes de coral e a sua fauna e aproveite uma paragem para snorkeling.'
    ],
    incl: ['hotelTransfer', 'seascopeTicket', 'snorkelGear', 'drink'], excl: [],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '10+', p: 20 }, { k: 'child', a: '3-10', p: 10 }, { k: 'baby', a: '0-2', p: 0 }] }
  },
  {
    id: 'panorama', cat: 'aqua', sub: 'sea', icon: 'fish', photo: 'img/seascope.jpg',
    title: ['Panorama Wolf – fond de verre', 'Panorama Wolf glass-bottom boat', 'Panorama Wolf – fondo de cristal', 'Panorama Wolf – fundo de vidro'],
    place: 'hurghada', tags: ['family'],
    slots: ['09:00–11:00', '11:00–13:00', '13:00–15:00', '15:00–18:00'],
    desc: [
      'Observez récifs, poissons et flore marine à travers le fond vitré panoramique du Panorama Wolf, puis mettez-vous à l’eau pour une session de snorkeling.',
      'Watch reefs, fish and marine plants through the Panorama Wolf’s panoramic glass bottom, then jump in for a snorkeling session.',
      'Observa arrecifes, peces y flora marina a través del fondo de cristal panorámico del Panorama Wolf y luego lánzate al agua para hacer snorkel.',
      'Observe recifes, peixes e flora marinha através do fundo de vidro panorâmico do Panorama Wolf e depois mergulhe para uma sessão de snorkeling.'
    ],
    incl: ['hotelTransfer', 'panoramaTicket', 'snorkelGear'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '10+', p: 20 }, { k: 'child', a: '3-10', p: 10 }, { k: 'baby', a: '0-2', p: 0 }] }
  },
  {
    id: 'abu-dabbab', supp: 'cairo', cat: 'aqua', sub: 'sea', icon: 'swimming', photo: 'img/tortues.jpg',
    title: ['Tortues d’Abu Dabbab', 'Abu Dabbab turtles', 'Tortugas de Abu Dabbab', 'Tartarugas de Abu Dabbab'],
    place: 'marsaalam', hours: '05:00–18:00',
    desc: [
      'Direction Abu Dabbab, réserve naturelle de Marsa Alam, pour nager avec les tortues de mer et explorer les récifs coralliens. Sortie dugongs en option.',
      'Head to Abu Dabbab, a nature reserve in Marsa Alam, to swim with sea turtles and explore the coral reefs. Dugong trip available as an extra.',
      'Rumbo a Abu Dabbab, reserva natural de Marsa Alam, para nadar con tortugas marinas y explorar los arrecifes. Salida para ver dugongos opcional.',
      'Rumo a Abu Dabbab, reserva natural de Marsa Alam, para nadar com tartarugas marinhas e explorar os recifes. Saída para ver dugongos opcional.'
    ],
    incl: ['hotelTransfer', 'turtles', 'dugongSearch', 'reef'], excl: [],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '13+', p: 80 }, { k: 'child', a: '5-12', p: 40 }, { k: 'baby', a: '0-4', p: 0 }] },
    addons: ['dugong']
  },
  {
    id: 'marsa-mubarak', supp: 'none', cat: 'aqua', sub: 'sea', icon: 'ship', photo: 'img/marsa-mubarak.jpg',
    title: ['Marsa Mubarak', 'Marsa Mubarak', 'Marsa Mubarak', 'Marsa Mubarak'],
    place: 'portghalib', tags: ['family'],
    desc: [
      'À environ 230 km d’Hurghada (≈ 2 h de route), près de Port Ghalib : sortie en grand bateau avec un premier arrêt pour observer les tortues marines, puis un second pour les poissons colorés et les coraux.',
      'About 230 km from Hurghada (≈ 2 h drive), near Port Ghalib: a big-boat trip with a first stop to watch sea turtles and a second for colourful fish and coral.',
      'A unos 230 km de Hurghada (≈ 2 h de carretera), cerca de Port Ghalib: salida en barco grande con una primera parada para ver tortugas marinas y una segunda para peces de colores y corales.',
      'A cerca de 230 km de Hurghada (≈ 2 h de estrada), perto de Port Ghalib: saída num barco grande com uma primeira paragem para ver tartarugas marinhas e uma segunda para peixes coloridos e corais.'
    ],
    incl: ['hotelTransfer', 'turtleWatch', 'fishCorals', 'reef', 'mealsDrinks'], excl: ['photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', p: 80 }, { k: 'child', a: '3-12', p: 40 }, { k: 'baby', a: '0-2', p: 0 }] }
  },

  /* --- Bateaux privés --- */
  {
    id: 'speedboat', cat: 'aqua', sub: 'boats', icon: 'speedboat', photo: 'img/speedboat-prive.jpg',
    title: ['Speed boat privé', 'Private speedboat', 'Lancha privada', 'Lancha privada'],
    place: 'hurghada', dur: { h: 4 }, tags: ['private'],
    desc: [
      'Une sortie privée en speed boat sur la mer Rouge, en famille, entre amis ou en couple : recherche des dauphins, banc de sable blanc et spots de snorkeling.',
      'A private speedboat trip on the Red Sea with family, friends or your partner: dolphin spotting, a white sandbank and snorkeling spots.',
      'Una salida privada en lancha por el mar Rojo, en familia, con amigos o en pareja: búsqueda de delfines, banco de arena blanca y puntos de snorkel.',
      'Um passeio privado de lancha no mar Vermelho, em família, com amigos ou a dois: procura de golfinhos, banco de areia branca e pontos de snorkeling.'
    ],
    incl: ['hotelTransfer', 'privateSpeedboat', 'snorkelGear', 'drinks', 'dolphinSearch'], excl: ['personal', 'photographer'],
    pricing: { type: 'group', variants: [{ id: 'sb', p: 140 }] },
    addons: ['islands10', 'islands20']
  },
  {
    id: 'combo-dolphin-white', cat: 'aqua', sub: 'boats', icon: 'dolphin', photo: 'img/speedboat-prive.jpg',
    title: ['Maison des dauphins + White Island en speed boat', 'Dolphin House + White Island by speedboat', 'Casa de los Delfines + White Island en lancha', 'Casa dos Golfinhos + White Island de lancha'],
    place: 'hurghada', dur: { h: 4 }, tags: ['private'],
    desc: [
      'En speed boat, visitez la Maison des dauphins puis White Island, avec une session de snorkeling au milieu des dauphins, des poissons tropicaux et des coraux. Boissons et fruits inclus.',
      'By speedboat, visit Dolphin House then White Island, with a snorkeling session among dolphins, tropical fish and coral. Drinks and fruit included.',
      'En lancha, visita la Casa de los Delfines y White Island, con una sesión de snorkel entre delfines, peces tropicales y corales. Bebidas y fruta incluidas.',
      'De lancha, visite a Casa dos Golfinhos e White Island, com uma sessão de snorkeling entre golfinhos, peixes tropicais e corais. Bebidas e fruta incluídas.'
    ],
    incl: ['hotelTransferHrg', 'snorkelSession', 'drinks', 'fruits'], excl: ['personal', 'photographer'],
    pricing: { type: 'group', min: 2, variants: [{ id: 'sb', p: 170, max: 6 }] }
  },
  {
    id: 'boat-family-15', cat: 'aqua', sub: 'boats', icon: 'ship', photo: 'img/bateau-yacht.jpg',
    title: ['Bateau privé en famille – 15 pers.', 'Private family boat – 15 people', 'Barco privado en familia – 15 pers.', 'Barco privado em família – 15 pessoas'],
    place: 'hurghada', tags: ['private', 'sunset'], season: 'summer',
    slots: ['08:00–15:00', ['10:00 → coucher du soleil', '10:00 → sunset', '10:00 → atardecer', '10:00 → pôr do sol']],
    choice: { k: 'vk_island', opts: ['Orange Bay', 'Hula Hula', 'Paradise', 'Magawish', 'Eden'] },
    desc: [
      'Un bateau rien que pour vous, jusqu’à 15 personnes. Choisissez votre île (Orange Bay, Hula Hula, Paradise, Magawish ou Eden) et restez jusqu’au coucher du soleil si vous le souhaitez.',
      'A boat all to yourselves, for up to 15 people. Pick your island (Orange Bay, Hula Hula, Paradise, Magawish or Eden) and stay until sunset if you like.',
      'Un barco solo para vosotros, hasta 15 personas. Elige tu isla (Orange Bay, Hula Hula, Paradise, Magawish o Eden) y quédate hasta el atardecer si quieres.',
      'Um barco só para vocês, até 15 pessoas. Escolha a sua ilha (Orange Bay, Hula Hula, Paradise, Magawish ou Eden) e fique até ao pôr do sol, se quiser.'
    ],
    incl: ['hotelTransfer', 'meals', 'drinks', 'birthdayOption', 'swimCorals'], excl: ['personal', 'photographer'],
    pricing: { type: 'group', min: 2, variants: [{ id: 'b15', p: 700, sp: 850, max: 15 }] }
  },
  {
    /* ⚠️ Masquée : même texte que l'offre à 700 € — à clarifier avec le client (voir A-VERIFIER.md) */
    id: 'boat-family-15b', cat: 'aqua', sub: 'boats', icon: 'ship', photo: 'img/bateau-yacht.jpg', hidden: true,
    title: ['Bateau privé en famille – 15 pers. (formule 2)', 'Private family boat – 15 people (option 2)', 'Barco privado en familia – 15 pers. (opción 2)', 'Barco privado em família – 15 pessoas (opção 2)'],
    place: 'hurghada', tags: ['private', 'sunset'], season: 'summer',
    slots: ['08:00–15:00', ['10:00 → coucher du soleil', '10:00 → sunset', '10:00 → atardecer', '10:00 → pôr do sol']],
    choice: { k: 'vk_island', opts: ['Orange Bay', 'Hula Hula', 'Paradise', 'Magawish', 'Eden'] },
    desc: [
      'Un bateau rien que pour vous, jusqu’à 15 personnes. Choisissez votre île et restez jusqu’au coucher du soleil si vous le souhaitez.',
      'A boat all to yourselves, for up to 15 people. Pick your island and stay until sunset if you like.',
      'Un barco solo para vosotros, hasta 15 personas. Elige tu isla y quédate hasta el atardecer si quieres.',
      'Um barco só para vocês, até 15 pessoas. Escolha a sua ilha e fique até ao pôr do sol, se quiser.'
    ],
    incl: ['hotelTransfer', 'meals', 'drinks', 'birthdayOption', 'swimCorals'], excl: ['personal', 'photographer'],
    pricing: { type: 'group', min: 2, variants: [{ id: 'b15b', p: 800, sp: 1000, max: 15 }] }
  },
  {
    id: 'boat-family-6', cat: 'aqua', sub: 'boats', icon: 'sailboat', photo: 'img/bateau-yacht.jpg',
    title: ['Bateau privé en famille – 6 pers.', 'Private family boat – 6 people', 'Barco privado en familia – 6 pers.', 'Barco privado em família – 6 pessoas'],
    place: 'hurghada', tags: ['private', 'sunset'], season: 'summer',
    slots: ['08:00–15:00', ['10:00 → coucher du soleil', '10:00 → sunset', '10:00 → atardecer', '10:00 → pôr do sol']],
    choice: { k: 'vk_island', opts: ['Orange Bay', 'Hula Hula', 'Paradise', 'Magawish', 'Eden'] },
    desc: [
      'Une journée inoubliable en mer sur votre bateau privé, jusqu’à 6 personnes. Choisissez votre île (Orange Bay, Hula Hula, Paradise, Magawish ou Eden) et nagez au milieu des poissons et des coraux.',
      'An unforgettable day at sea on your private boat, for up to 6 people. Pick your island (Orange Bay, Hula Hula, Paradise, Magawish or Eden) and swim among fish and coral.',
      'Un día inolvidable en el mar en tu barco privado, hasta 6 personas. Elige tu isla (Orange Bay, Hula Hula, Paradise, Magawish o Eden) y nada entre peces y corales.',
      'Um dia inesquecível no mar no seu barco privado, até 6 pessoas. Escolha a sua ilha (Orange Bay, Hula Hula, Paradise, Magawish ou Eden) e nade entre peixes e corais.'
    ],
    incl: ['hotelTransfer', 'meals', 'drinks', 'swimCorals'], excl: ['personal', 'photographer'],
    pricing: { type: 'group', min: 2, variants: [{ id: 'b6', p: 400, sp: 500, max: 6 }] }
  },
  {
    id: 'boat-dolphin-house', cat: 'aqua', sub: 'boats', icon: 'dolphin', photo: 'img/bateau-yacht.jpg',
    photos: ['img/bateau-yacht.jpg', 'img/maison-dauphins.jpg'],
    title: ['Bateau privé – Maison des dauphins', 'Private boat – Dolphin House', 'Barco privado – Casa de los Delfines', 'Barco privado – Casa dos Golfinhos'],
    place: 'hurghada', hours: '08:00–14:00', tags: ['private'], season: 'summer',
    desc: [
      'Votre bateau privé jusqu’à la Maison des dauphins : nagez aux côtés des dauphins, profitez du soleil et de la mer dans un cadre paradisiaque.',
      'Your private boat to Dolphin House: swim alongside dolphins and soak up the sun and sea in a paradise setting.',
      'Tu barco privado hasta la Casa de los Delfines: nada junto a los delfines y disfruta del sol y el mar en un entorno paradisíaco.',
      'O seu barco privado até à Casa dos Golfinhos: nade ao lado dos golfinhos e aproveite o sol e o mar num cenário paradisíaco.'
    ],
    incl: ['hotelTransfer', 'meals', 'drinks', 'swimCorals'], excl: ['personal', 'photographer'],
    pricing: { type: 'group', min: 2, variants: [{ id: 'dh', p: 500, sp: 700, max: 15 }] }
  },

  /* --- Loisirs --- */
  {
    id: 'aquapark', cat: 'aqua', sub: 'fun', icon: 'pool', photo: 'img/aquapark.jpg',
    title: ['Aqua Park Waterworld', 'Waterworld Aqua Park', 'Aqua Park Waterworld', 'Aqua Park Waterworld'],
    place: 'hurghada', tags: ['family'],
    desc: [
      'Une journée de glisse et de fun dans le plus grand parc aquatique d’Hurghada, avec des toboggans pour tous les âges.',
      'A day of slides and fun at Hurghada’s largest water park, with slides for every age.',
      'Un día de toboganes y diversión en el mayor parque acuático de Hurghada, con toboganes para todas las edades.',
      'Um dia de escorregas e diversão no maior parque aquático de Hurghada, com escorregas para todas as idades.'
    ],
    incl: ['hotelTransfer', 'slides', 'snack', 'drink'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '11+', p: 55 }, { k: 'child', a: '3-10', p: 27.5 }, { k: 'baby', a: '0-2', p: 0 }] }
  },
  {
    id: 'aquarium', cat: 'aqua', sub: 'fun', icon: 'fish', photo: 'img/aquarium.jpg',
    title: ['Aquarium d’Hurghada', 'Hurghada Aquarium', 'Acuario de Hurghada', 'Aquário de Hurghada'],
    place: 'hurghada', tags: ['family'],
    desc: [
      'Plus de 1 200 espèces : requins gris et requins tigres, raies, tortues vertes… et un mini-zoo avec crocodiles, singes et oiseaux.',
      'Over 1,200 species: grey and tiger sharks, stingrays, green turtles… plus a mini zoo with crocodiles, monkeys and birds.',
      'Más de 1.200 especies: tiburones grises y tigre, rayas, tortugas verdes… y un minizoo con cocodrilos, monos y aves.',
      'Mais de 1.200 espécies: tubarões-cinzentos e tubarões-tigre, raias, tartarugas-verdes… e um mini zoo com crocodilos, macacos e aves.'
    ],
    incl: ['hotelTransfer', 'aquariumTicket', 'showTicket'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '11+', p: 55 }, { k: 'child', a: '3-10', p: 27.5 }, { k: 'baby', a: '0-2', p: 0 }] }
  },
  {
    id: 'parachute', cat: 'aqua', sub: 'fun', icon: 'parachute', photo: 'img/parachute.jpg',
    title: ['Parachute ascensionnel', 'Parasailing', 'Parasailing', 'Parasailing'],
    place: 'hurghada', dur: { min: 5 }, transfer: 'none',
    slots: [['Matin', 'Morning', 'Mañana', 'Manhã'], ['Soir', 'Evening', 'Tarde', 'Fim de tarde']],
    desc: [
      'Envolez-vous au-dessus de la mer Rouge pour des vues à couper le souffle. Le parachute peut accueillir 1 à 2 personnes.',
      'Soar above the Red Sea for breathtaking views. Each flight takes 1 or 2 people.',
      'Vuela sobre el mar Rojo con vistas impresionantes. Cada vuelo admite 1 o 2 personas.',
      'Voe sobre o mar Vermelho com vistas de cortar a respiração. Cada voo leva 1 ou 2 pessoas.'
    ],
    incl: ['parachuteTicket'], excl: ['transfer', 'personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 20 }] }
  },
  {
    id: 'banana-sofa', cat: 'aqua', sub: 'fun', icon: 'ripple', photo: 'img/sofa-tracte.jpg',
    photos: ['img/sofa-tracte.jpg', 'img/banana-boat.jpg'],
    title: ['Banana boat + sofa tracté', 'Banana boat + towed sofa', 'Banana boat + sofá remolcado', 'Banana boat + sofá rebocado'],
    place: 'hurghada', dur: { min: 20 }, tags: ['family'], smallGroup: { under: 3, fee: 20 },
    desc: [
      'Fous rires garantis : 10 minutes de banana boat puis 10 minutes de sofa tracté sur la mer Rouge, au départ de la plage. Pour toute la famille, sans âge minimum.',
      'Laughs guaranteed: 10 minutes on the banana boat, then 10 minutes on the towed sofa across the Red Sea, from the beach. For the whole family, no minimum age.',
      'Risas aseguradas: 10 minutos de banana boat y después 10 minutos de sofá remolcado por el mar Rojo, desde la playa. Para toda la familia, sin edad mínima.',
      'Gargalhadas garantidas: 10 minutos de banana boat e depois 10 minutos de sofá rebocado no mar Vermelho, a partir da praia. Para toda a família, sem idade mínima.'
    ],
    notes: [[
      'Tarif unique, quel que soit l’âge.',
      'Single rate regardless of age.',
      'Tarifa única sin distinción de edad.',
      'Tarifa única, independentemente da idade.'
    ], [
      'Horaires à convenir avec l’agence lors du devis.',
      'Times to be arranged with the agency when you send your quote.',
      'Horario a convenir con la agencia al enviar el presupuesto.',
      'Horário a combinar com a agência no pedido de orçamento.'
    ], [
      'Transfert inclus à partir de 3 personnes. Pour 1 ou 2 personnes : supplément de 20 € pour le groupe.',
      'Transfer included from 3 people. For 1 or 2 people: €20 surcharge for the group.',
      'Traslado incluido a partir de 3 personas. Para 1 o 2 personas: suplemento de 20 € para el grupo.',
      'Transfer incluído a partir de 3 pessoas. Para 1 ou 2 pessoas: suplemento de 20 € para o grupo.'
    ]],
    incl: ['hotelTransfer3', 'bananaSofa'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 25 }] }
  },

  /* --- Moments spéciaux --- */
  {
    id: 'birthday', cat: 'aqua', sub: 'special', icon: 'cake', photo: 'img/anniversaire.jpg',
    title: ['Anniversaire en speed boat + 2 îles', 'Speedboat birthday + 2 islands', 'Cumpleaños en lancha + 2 islas', 'Aniversário de lancha + 2 ilhas'],
    place: 'hurghada', tags: ['private'],
    slots: ['08:00–12:00', '12:00–16:00'],
    desc: [
      'Fêtez un anniversaire en mer ! Speed boat privé, gâteau, recherche des dauphins et deux îles au choix : White Island et Orange Bay, ou Hula Hula, Eden Island ou Ozeria.',
      'Celebrate a birthday at sea! Private speedboat, cake, dolphin spotting and two islands of your choice: White Island and Orange Bay, or Hula Hula, Eden Island or Ozeria.',
      '¡Celebra un cumpleaños en el mar! Lancha privada, tarta, búsqueda de delfines y dos islas a elegir: White Island y Orange Bay, o Hula Hula, Eden Island u Ozeria.',
      'Festeje um aniversário no mar! Lancha privada, bolo, procura de golfinhos e duas ilhas à escolha: White Island e Orange Bay, ou Hula Hula, Eden Island ou Ozeria.'
    ],
    incl: ['hotelTransfer', 'islandsEntry', 'drinksFruits', 'birthdayCake', 'dolphinSearch'], excl: ['meal', 'personal', 'photographer'],
    pricing: { type: 'group', vk: 'vk_formula', variants: [
      { id: 'p2', l: ['Jusqu’à 2 personnes', 'Up to 2 people', 'Hasta 2 personas', 'Até 2 pessoas'], p: 200, max: 2 },
      { id: 'p6', l: ['Jusqu’à 6 personnes', 'Up to 6 people', 'Hasta 6 personas', 'Até 6 pessoas'], p: 250, max: 6 }
    ] }
  },
  {
    id: 'proposal', cat: 'aqua', sub: 'special', icon: 'rings', photo: 'img/demande-mariage.jpg',
    title: ['Demande en mariage à White Island', 'Marriage proposal on White Island', 'Pedida de mano en White Island', 'Pedido de casamento em White Island'],
    place: 'hurghada', tags: ['private'],
    slots: ['08:30–12:00', '12:30–16:30'],
    desc: [
      'Un speed boat rien que pour vous deux, direction White Island, pour une demande en mariage inoubliable en pleine mer, dans un décor de carte postale.',
      'A speedboat just for the two of you, heading to White Island for an unforgettable proposal out at sea, in a postcard setting.',
      'Una lancha solo para vosotros dos, rumbo a White Island, para una pedida de mano inolvidable en pleno mar, en un escenario de postal.',
      'Uma lancha só para os dois, rumo a White Island, para um pedido de casamento inesquecível em pleno mar, num cenário de postal.'
    ],
    incl: ['hotelTransfer', 'islandEntry', 'drinksFruits', 'dolphinSearch'], excl: ['meal', 'otherIslands', 'personal', 'photographer'],
    pricing: { type: 'group', variants: [{ id: 'p2', p: 200, max: 2 }] }
  },

  /* ===================== EXCURSIONS ===================== */

  /* --- Luxor --- */
  {
    id: 'luxor-day', cat: 'excursions', sub: 'luxor', icon: 'building-arch', photo: 'img/luxor.jpg',
    title: ['Luxor en une journée', 'Luxor in one day', 'Luxor en un día', 'Luxor num dia'],
    place: 'luxor',
    desc: [
      'L’Égypte ancienne en une journée : temples de Karnak et d’Hatchepsout, traversée du Nil en bateau traditionnel, Vallée des Rois et colosses de Memnon.',
      'Ancient Egypt in one day: the temples of Karnak and Hatshepsut, a Nile crossing by traditional boat, the Valley of the Kings and the Colossi of Memnon.',
      'El Antiguo Egipto en un día: templos de Karnak y Hatshepsut, travesía del Nilo en barco tradicional, Valle de los Reyes y colosos de Memnón.',
      'O Antigo Egito num dia: templos de Karnak e Hatshepsut, travessia do Nilo em barco tradicional, Vale dos Reis e colossos de Mémnon.'
    ],
    excl: ['personal', 'photographer'],
    formulas: [
      {
        id: 'van', l: ['VAN (minivan)', 'Minivan tour', 'En minivan', 'Em minivan'],
        days: [2, 4, 0], dep: '04:00', ret: '20:00',
        incl: ['entryFees', 'lunchLocal', 'minivan'],
        pricing: { type: 'pp', tiers: [{ k: 'person', p: 80 }] }
      },
      {
        id: 'bus', l: ['BUS (autocar)', 'Coach tour', 'En autobús', 'Em autocarro'],
        days: [0, 2, 4, 5], dep: '03:30', ret: '20:00',
        incl: ['entryFees', 'lunchLocal', 'coach'],
        pricing: { type: 'pp', tiers: [{ k: 'person', p: 60 }] }
      },
      {
        id: 'private', l: ['Privé (minivan ou voiture)', 'Private (minivan or car)', 'Privado (minivan o coche)', 'Privado (minivan ou carro)'],
        daily: true, hours: '04:00–20:00', tags: ['private'],
        desc: [
          'Luxor en toute intimité, à votre rythme : minivan ou voiture privée avec guide francophone, temples, Vallée des Rois et déjeuner inclus.',
          'Luxor in complete privacy, at your own pace: private minivan or car with a French-speaking guide, temples, the Valley of the Kings and lunch included.',
          'Luxor con total intimidad y a tu ritmo: minivan o coche privado con guía francófono, templos, Valle de los Reyes y almuerzo incluidos.',
          'Luxor com toda a privacidade e ao seu ritmo: minivan ou carro privado com guia francófono, templos, Vale dos Reis e almoço incluídos.'
        ],
        notes: [['Tarif unique, quel que soit l’âge : les enfants sont facturés au même prix que les adultes.', 'Single rate regardless of age: children are charged the same price as adults.', 'Tarifa única sin distinción de edad: los niños pagan el mismo precio que los adultos.', 'Tarifa única, independentemente da idade: as crianças pagam o mesmo preço que os adultos.']],
        incl: ['entryFees', 'lunch', 'minivanCar', 'valleyKings', 'frGuide'],
        pricing: { type: 'group', vk: 'vk_size', variants: [
            { id: 'p2', l: ['2 personnes', '2 people', '2 personas', '2 pessoas'], p: 320, max: 2 },
            { id: 'p4', l: ['4 personnes', '4 people', '4 personas', '4 pessoas'], p: 420, max: 4 }
          ] }
      }
    ]
  },
  {
    id: 'luxor-overnight', cat: 'excursions', sub: 'luxor', icon: 'moon-stars', photo: 'img/luxor.jpg',
    title: ['Luxor – formule overnight', 'Luxor overnight tour', 'Luxor con noche', 'Luxor com pernoita'],
    place: 'luxor', dur: { d: 2, n: 1 }, dep: '04:00', ret: '12:00', retNext: true,
    desc: [
      'Deux jours à Luxor : Karnak, temple d’Hatchepsout, Vallée des Rois, colosses de Memnon et temple de Louxor, une nuit à l’hôtel, puis un vol en montgolfière au lever du soleil au-dessus des sites antiques.',
      'Two days in Luxor: Karnak, Hatshepsut’s temple, the Valley of the Kings, the Colossi of Memnon and Luxor Temple, a night in a hotel, then a sunrise hot-air balloon flight over the ancient sites.',
      'Dos días en Luxor: Karnak, templo de Hatshepsut, Valle de los Reyes, colosos de Memnón y templo de Luxor, una noche de hotel y un vuelo en globo al amanecer sobre los sitios antiguos.',
      'Dois dias em Luxor: Karnak, templo de Hatshepsut, Vale dos Reis, colossos de Mémnon e templo de Luxor, uma noite em hotel e um voo de balão ao nascer do sol sobre os locais antigos.'
    ],
    incl: ['entryFees', 'lunchDinnerDrink', 'minivan', 'hotelNight', 'balloon'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 300 }] },
    addons: ['nileRide', 'banana']
  },
  {
    id: 'luxor-balloon', cat: 'excursions', sub: 'luxor', icon: 'air-balloon', photo: 'img/luxor.jpg',
    title: ['Luxor – formule montgolfière', 'Luxor hot-air balloon', 'Luxor en globo', 'Luxor de balão'],
    place: 'luxor', days: [2, 4, 0], dep: '00:00', ret: '20:00',
    desc: [
      'Survolez les sites historiques de Luxor en montgolfière avec un pilote expérimenté : une aventure aérienne unique au-dessus des trésors de l’Égypte ancienne.',
      'Fly over Luxor’s historic sites in a hot-air balloon with an experienced pilot: a unique aerial adventure above the treasures of ancient Egypt.',
      'Sobrevuela los sitios históricos de Luxor en globo con un piloto experimentado: una aventura aérea única sobre los tesoros del Antiguo Egipto.',
      'Sobrevoe os locais históricos de Luxor de balão com um piloto experiente: uma aventura aérea única sobre os tesouros do Antigo Egito.'
    ],
    incl: ['hotelTransfer', 'breakfastDinner', 'balloon', 'hotelNight'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 220 }] }
  },

  /* --- Le Caire --- */
  {
    id: 'cairo-day', supp: 'cairo', cat: 'excursions', sub: 'cairo', icon: 'pyramid', photo: 'img/le-caire.jpg',
    title: ['Le Caire en une journée', 'Cairo in one day', 'El Cairo en un día', 'Cairo num dia'],
    place: 'cairo', tags: ['family'],
    desc: [
      'La pyramide de Khéops, l’une des sept merveilles du monde antique, le Sphinx, gardien millénaire, puis le musée du Caire et ses trésors. Au choix : nouveau ou ancien musée.',
      'The Great Pyramid of Khufu, one of the Seven Wonders of the Ancient World, the age-old Sphinx, then the Cairo museum and its treasures. Choose the new or the old museum.',
      'La pirámide de Keops, una de las siete maravillas del mundo antiguo, la milenaria Esfinge y después el museo de El Cairo y sus tesoros. A elegir: museo nuevo o antiguo.',
      'A pirâmide de Quéops, uma das sete maravilhas do mundo antigo, a milenar Esfinge e depois o museu do Cairo e os seus tesouros. À escolha: museu novo ou antigo.'
    ],
    excl: ['drinks'],
    addons: ['felucca', 'camel'],
    formulas: [
      {
        id: 'van', l: ['VAN (minivan)', 'Minivan tour', 'En minivan', 'Em minivan'],
        days: [2, 4, 0], dep: '01:00', ret: '21:00', tags: ['family'],
        incl: ['entryMuseum', 'lunchRestaurant', 'minivan'],
        pricing: { type: 'pp', vk: 'vk_museum', variants: [
            { id: 'new', l: ['Nouveau musée', 'New museum', 'Museo nuevo', 'Museu novo'], tiers: [{ k: 'adult', a: '11+', p: 100 }, { k: 'child', a: '6-11', p: 65 }, { k: 'child2', a: '3-5', p: 45 }] },
            { id: 'old', l: ['Ancien musée', 'Old museum', 'Museo antiguo', 'Museu antigo'], tiers: [{ k: 'adult', a: '11+', p: 75 }, { k: 'child', a: '6-11', p: 45 }, { k: 'child2', a: '3-5', p: 25 }] }
        ] }
      },
      {
        id: 'bus', l: ['BUS (autocar)', 'Coach tour', 'En autobús', 'Em autocarro'],
        days: [0, 2, 4, 5], dep: '00:30', ret: '21:00', tags: ['family'],
        incl: ['entryMuseum', 'lunchRestaurant', 'coach'],
        pricing: { type: 'pp', vk: 'vk_museum', variants: [
            { id: 'new', l: ['Nouveau musée', 'New museum', 'Museo nuevo', 'Museu novo'], tiers: [{ k: 'adult', a: '11+', p: 80 }, { k: 'child', a: '6-11', p: 60 }, { k: 'child2', a: '3-5', p: 40 }] },
            { id: 'old', l: ['Ancien musée', 'Old museum', 'Museo antiguo', 'Museu antigo'], tiers: [{ k: 'adult', a: '11+', p: 55 }, { k: 'child', a: '6-11', p: 35 }, { k: 'child2', a: '3-5', p: 20 }] }
        ] }
      },
      {
        id: 'private', l: ['Privé (minivan ou voiture)', 'Private (minivan or car)', 'Privado (minivan o coche)', 'Privado (minivan ou carro)'],
        daily: true, hours: '04:00–20:00', tags: ['private'],
        desc: [
          'Les pyramides et le Sphinx en toute intimité, en minivan ou voiture privée, à votre rythme.',
          'The Pyramids and the Sphinx in complete privacy, by private minivan or car, at your own pace.',
          'Las pirámides y la Esfinge con total intimidad, en minivan o coche privado, a tu ritmo.',
          'As pirâmides e a Esfinge com toda a privacidade, em minivan ou carro privado, ao seu ritmo.'
        ],
        notes: [['Tarif unique, quel que soit l’âge : les enfants sont facturés au même prix que les adultes.', 'Single rate regardless of age: children are charged the same price as adults.', 'Tarifa única sin distinción de edad: los niños pagan el mismo precio que los adultos.', 'Tarifa única, independentemente da idade: as crianças pagam o mesmo preço que os adultos.']],
        incl: ['entryFees', 'pyramidsSphinx', 'minivanCar'],
        pricing: { type: 'group', vk: 'vk_size', variants: [
            { id: 'p2', l: ['2 personnes', '2 people', '2 personas', '2 pessoas'], p: 320, max: 2 },
            { id: 'p4', l: ['4 personnes', '4 people', '4 personas', '4 pessoas'], p: 420, max: 4 }
          ] }
      }
    ]
  },
  {
    id: 'cairo-plane', supp: 'cairo', cat: 'excursions', sub: 'cairo', icon: 'plane', photo: 'img/le-caire.jpg',
    title: ['Le Caire en avion', 'Cairo by plane', 'El Cairo en avión', 'Cairo de avião'],
    place: 'cairo', daily: true, hours: '04:00–20:00', tags: ['family'],
    desc: [
      'Pyramides, Sphinx et musée du Caire en une journée, sans les longues heures de route : vols aller-retour et guide francophone inclus.',
      'The Pyramids, the Sphinx and the Cairo museum in one day, without the long drive: return flights and a French-speaking guide included.',
      'Pirámides, Esfinge y museo de El Cairo en un día, sin largas horas de carretera: vuelos de ida y vuelta y guía francófono incluidos.',
      'Pirâmides, Esfinge e museu do Cairo num dia, sem longas horas de estrada: voos de ida e volta e guia francófono incluídos.'
    ],
    notes: [[
      'Réservez au moins 3 jours à l’avance (préparation des billets d’avion).',
      'Book at least 3 days ahead (flight tickets need to be arranged).',
      'Reserva con al menos 3 días de antelación (preparación de los billetes de avión).',
      'Reserve com pelo menos 3 dias de antecedência (preparação dos bilhetes de avião).'
    ]],
    incl: ['airportTransfer', 'flights', 'frGuide', 'entryMuseum'], excl: ['drinks'],
    pricing: { type: 'pp', vk: 'vk_museum', variants: [
      { id: 'new', l: ['Nouveau musée', 'New museum', 'Museo nuevo', 'Museu novo'], tiers: [{ k: 'adult', a: '12+', p: 300 }, { k: 'child', a: '3-12', p: 270 }, { k: 'baby', a: 'u3', p: 250 }] },
      { id: 'old', l: ['Ancien musée', 'Old museum', 'Museo antiguo', 'Museu antigo'], tiers: [{ k: 'adult', a: '12+', p: 280 }, { k: 'child', a: '3-12', p: 250 }, { k: 'baby', a: 'u3', p: 230 }] }
    ] },
    addons: ['felucca', 'camel']
  },

  /* --- El Gouna --- */
  {
    id: 'elgouna', supp: 'none', cat: 'excursions', sub: 'elgouna', icon: 'sailboat', photo: 'img/el-gouna.jpg',
    title: ['El Gouna', 'El Gouna', 'El Gouna', 'El Gouna'],
    place: 'elgouna', slots: ['10:00', '16:00'], slotKey: 'vk_departure',
    desc: [
      'Vue panoramique depuis la tour d’El Gouna, croisière sur le lagon entre plages, hôtels et villas, balade dans le centre-ville animé, puis une heure libre à la marina.',
      'Panoramic views from the El Gouna tower, a lagoon cruise past beaches, hotels and villas, a stroll through the lively town centre, then an hour of free time at the marina.',
      'Vistas panorámicas desde la torre de El Gouna, crucero por la laguna entre playas, hoteles y villas, paseo por el animado centro y una hora libre en la marina.',
      'Vista panorâmica da torre de El Gouna, cruzeiro na lagoa entre praias, hotéis e vivendas, passeio pelo centro animado e uma hora livre na marina.'
    ],
    incl: ['hotelTransfer', 'guide', 'viewpoint', 'lagoonCruise', 'freeDrink'], excl: [],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 35 }] }
  },

  /* --- Croisières & séjours --- */
  {
    id: 'nile-4d', supp: 'none', cat: 'excursions', sub: 'circuits', icon: 'sailboat', photo: 'img/croisiere-nil.jpg',
    title: ['Croisière sur le Nil – 4 j / 3 n', 'Nile cruise – 4 days / 3 nights', 'Crucero por el Nilo – 4 días / 3 noches', 'Cruzeiro no Nilo – 4 dias / 3 noites'],
    place: 'aswanluxor', dur: { d: 4, n: 3 }, season: 'xmas',
    desc: [
      'D’Assouan à Luxor : Abou Simbel, le village nubien, l’obélisque inachevé, les temples de Philae, Kom Ombo et Edfou, puis Karnak, les colosses de Memnon, le temple d’Hatchepsout, la Vallée des Rois… et un vol en montgolfière.',
      'From Aswan to Luxor: Abu Simbel, the Nubian village, the Unfinished Obelisk, the temples of Philae, Kom Ombo and Edfu, then Karnak, the Colossi of Memnon, Hatshepsut’s temple, the Valley of the Kings… and a hot-air balloon flight.',
      'De Asuán a Luxor: Abu Simbel, el poblado nubio, el obelisco inacabado, los templos de Filé, Kom Ombo y Edfu, y después Karnak, los colosos de Memnón, el templo de Hatshepsut, el Valle de los Reyes… y un vuelo en globo.',
      'De Assuão a Luxor: Abu Simbel, a aldeia núbia, o obelisco inacabado, os templos de Filae, Kom Ombo e Edfu, depois Karnak, os colossos de Mémnon, o templo de Hatshepsut, o Vale dos Reis… e um voo de balão.'
    ],
    incl: ['hotelTransfer', 'fullBoard', 'balloon', 'accommodation'], excl: ['drinks', 'personal'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 750, sp: 900 }] }
  },
  {
    id: 'nile-5d', supp: 'none', cat: 'excursions', sub: 'circuits', icon: 'sailboat', photo: 'img/croisiere-nil.jpg',
    title: ['Croisière sur le Nil – 5 j / 4 n', 'Nile cruise – 5 days / 4 nights', 'Crucero por el Nilo – 5 días / 4 noches', 'Cruzeiro no Nilo – 5 dias / 4 noites'],
    place: 'aswanluxor', dur: { d: 5, n: 4 }, season: 'xmas',
    desc: [
      'D’Assouan à Luxor : Abou Simbel, le village nubien, l’obélisque inachevé, les temples de Philae, Kom Ombo et Edfou, puis Karnak, les colosses de Memnon, le temple d’Hatchepsout, la Vallée des Rois… et un vol en montgolfière.',
      'From Aswan to Luxor: Abu Simbel, the Nubian village, the Unfinished Obelisk, the temples of Philae, Kom Ombo and Edfu, then Karnak, the Colossi of Memnon, Hatshepsut’s temple, the Valley of the Kings… and a hot-air balloon flight.',
      'De Asuán a Luxor: Abu Simbel, el poblado nubio, el obelisco inacabado, los templos de Filé, Kom Ombo y Edfu, y después Karnak, los colosos de Memnón, el templo de Hatshepsut, el Valle de los Reyes… y un vuelo en globo.',
      'De Assuão a Luxor: Abu Simbel, a aldeia núbia, o obelisco inacabado, os templos de Filae, Kom Ombo e Edfu, depois Karnak, os colossos de Mémnon, o templo de Hatshepsut, o Vale dos Reis… e um voo de balão.'
    ],
    incl: ['hotelTransfer', 'fullBoard', 'balloon', 'accommodation'], excl: ['drinks', 'personal'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 850, sp: 1050 }] }
  },
  {
    id: 'white-desert-2', supp: 'none', cat: 'excursions', sub: 'circuits', icon: 'tent', photo: 'img/desert-blanc.jpg',
    title: ['Désert Blanc – 2 j / 1 n', 'White Desert – 2 days / 1 night', 'Desierto Blanco – 2 días / 1 noche', 'Deserto Branco – 2 dias / 1 noite'],
    place: 'whitedesert', dur: { d: 2, n: 1 },
    desc: [
      'Aventure dans le Désert Blanc, paysage surréaliste sculpté par le vent : formations rocheuses uniques, sable immaculé, sandboard et nuit sous la tente.',
      'Adventure in the White Desert, a surreal wind-sculpted landscape: unique rock formations, pristine sand, sandboarding and a night under canvas.',
      'Aventura en el Desierto Blanco, un paisaje surrealista esculpido por el viento: formaciones rocosas únicas, arena inmaculada, sandboard y noche en tienda.',
      'Aventura no Deserto Branco, uma paisagem surreal esculpida pelo vento: formações rochosas únicas, areia imaculada, sandboard e noite em tenda.'
    ],
    incl: ['hotelTransfer', 'meals', 'tentNight', 'sandboarding', 'entryFees', 'visits'], excl: [],
    pricing: { type: 'group', variants: [{ id: 'p2', l: ['Tarif pour 2 personnes', 'Price for 2 people', 'Precio para 2 personas', 'Preço para 2 pessoas'], p: 250, max: 2 }] }
  },
  {
    id: 'white-desert-3', supp: 'none', cat: 'excursions', sub: 'circuits', icon: 'tent', photo: 'img/desert-blanc.jpg',
    title: ['Désert Blanc – 3 j / 2 n', 'White Desert – 3 days / 2 nights', 'Desierto Blanco – 3 días / 2 noches', 'Deserto Branco – 3 dias / 2 noites'],
    place: 'whitedesert', dur: { d: 3, n: 2 },
    desc: [
      'Aventure dans le Désert Blanc, paysage surréaliste sculpté par le vent : formations rocheuses uniques, sable immaculé, sandboard et nuits sous la tente.',
      'Adventure in the White Desert, a surreal wind-sculpted landscape: unique rock formations, pristine sand, sandboarding and nights under canvas.',
      'Aventura en el Desierto Blanco, un paisaje surrealista esculpido por el viento: formaciones rocosas únicas, arena inmaculada, sandboard y noches en tienda.',
      'Aventura no Deserto Branco, uma paisagem surreal esculpida pelo vento: formações rochosas únicas, areia imaculada, sandboard e noites em tenda.'
    ],
    incl: ['hotelTransfer', 'meals', 'tentNight', 'sandboarding', 'entryFees', 'visits'], excl: [],
    pricing: { type: 'group', variants: [{ id: 'p2', l: ['Tarif pour 2 personnes', 'Price for 2 people', 'Precio para 2 personas', 'Preço para 2 pessoas'], p: 410, max: 2 }] }
  },
  {
    id: 'fayoum', supp: 'none', cat: 'excursions', sub: 'circuits', icon: 'mountain', photo: 'img/fayoum.jpg',
    title: ['Fayoum – 2 j / 1 n', 'Faiyum – 2 days / 1 night', 'El Fayum – 2 días / 1 noche', 'Faiyum – 2 dias / 1 noite'],
    place: 'fayoum', dur: { d: 2, n: 1 },
    desc: [
      'Fayoum, trésor caché de l’Égypte : lac Qaroun, vallée de Rayan, Magic Lake, montagne Mudawara, atelier de poterie et musée des fossiles marins.',
      'Faiyum, Egypt’s hidden gem: Lake Qarun, Wadi El Rayan, Magic Lake, Mudawara Mountain, a pottery workshop and the marine fossil museum.',
      'El Fayum, el tesoro escondido de Egipto: lago Qarun, Wadi El Rayan, Lago Mágico, montaña Mudawara, taller de cerámica y museo de fósiles marinos.',
      'Faiyum, o tesouro escondido do Egito: lago Qarun, Wadi El Rayan, Lago Mágico, montanha Mudawara, oficina de olaria e museu de fósseis marinhos.'
    ],
    incl: ['breakfast', 'dinner', 'pottery', 'qaroun', 'rayan', 'magicLake', 'mudawara', 'fossils'], excl: [],
    pricing: { type: 'group', variants: [{ id: 'p2', l: ['Tarif pour 2 personnes', 'Price for 2 people', 'Precio para 2 personas', 'Preço para 2 pessoas'], p: 380, max: 2 }] }
  },
  {
    id: 'siwa-3', supp: 'none', cat: 'excursions', sub: 'circuits', icon: 'building-castle', photo: 'img/siwa.jpg',
    title: ['Oasis de Siwa – 3 j / 2 n', 'Siwa Oasis – 3 days / 2 nights', 'Oasis de Siwa – 3 días / 2 noches', 'Oásis de Siwa – 3 dias / 2 noites'],
    place: 'siwa', dur: { d: 3, n: 2 },
    desc: [
      'Lacs salés, grottes de sel, sources chaudes et bains de Cléopâtre ; temple d’Amon, vieille ville et forteresse de Shali ; safari dans les dunes et nuit sous les étoiles.',
      'Salt lakes, salt caves, hot springs and Cleopatra’s Bath; the Temple of Amun, the old town and Shali fortress; a dune safari and a night under the stars.',
      'Lagos salados, cuevas de sal, fuentes termales y baños de Cleopatra; templo de Amón, ciudad vieja y fortaleza de Shali; safari por las dunas y noche bajo las estrellas.',
      'Lagos salgados, grutas de sal, fontes termais e banhos de Cleópatra; templo de Ámon, cidade velha e fortaleza de Shali; safari nas dunas e noite sob as estrelas.'
    ],
    incl: ['cairoSiwa', 'meals', 'entryFees', 'visits', 'hotelNights'], excl: [],
    pricing: { type: 'group', variants: [{ id: 'p2', l: ['Tarif pour 2 personnes', 'Price for 2 people', 'Precio para 2 personas', 'Preço para 2 pessoas'], p: 380, max: 2 }] }
  },
  {
    id: 'siwa-4', supp: 'none', cat: 'excursions', sub: 'circuits', icon: 'building-castle', photo: 'img/siwa.jpg',
    title: ['Oasis de Siwa – 4 j / 3 n', 'Siwa Oasis – 4 days / 3 nights', 'Oasis de Siwa – 4 días / 3 noches', 'Oásis de Siwa – 4 dias / 3 noites'],
    place: 'siwa', dur: { d: 4, n: 3 },
    desc: [
      'Lacs salés, grottes de sel, sources chaudes et bains de Cléopâtre ; temple d’Amon, vieille ville et forteresse de Shali ; safari dans les dunes et nuit sous les étoiles.',
      'Salt lakes, salt caves, hot springs and Cleopatra’s Bath; the Temple of Amun, the old town and Shali fortress; a dune safari and a night under the stars.',
      'Lagos salados, cuevas de sal, fuentes termales y baños de Cleopatra; templo de Amón, ciudad vieja y fortaleza de Shali; safari por las dunas y noche bajo las estrellas.',
      'Lagos salgados, grutas de sal, fontes termais e banhos de Cleópatra; templo de Ámon, cidade velha e fortaleza de Shali; safari nas dunas e noite sob as estrelas.'
    ],
    incl: ['cairoSiwa', 'meals', 'entryFees', 'visits', 'hotelNights'], excl: [],
    pricing: { type: 'group', variants: [{ id: 'p2', l: ['Tarif pour 2 personnes', 'Price for 2 people', 'Precio para 2 personas', 'Preço para 2 pessoas'], p: 480, max: 2 }] }
  },

  /* ===================== EXPLORATION & BIEN-ÊTRE ===================== */

  /* --- Désert & sensations --- */
  {
    id: 'mini-quad', supp: 'safari', cat: 'explore', sub: 'desert', icon: 'sun', photo: 'img/quad.jpg',
    title: ['Mini safari en quad', 'Mini quad safari', 'Mini safari en quad', 'Mini safari de quad'],
    place: 'hurghada', dur: { h: 2.5 }, minAge: 16,
    desc: [
      '2 h 30 de quad à travers les étendues de sable et les falaises du désert égyptien, visite d’un village bédouin et photo avec un chameau.',
      '2 h 30 of quad biking across the sands and cliffs of the Egyptian desert, a Bedouin village visit and a photo with a camel.',
      '2 h 30 de quad entre la arena y los acantilados del desierto egipcio, visita a un poblado beduino y foto con un camello.',
      '2 h 30 de quad pelas areias e falésias do deserto egípcio, visita a uma aldeia beduína e foto com um camelo.'
    ],
    incl: ['hotelTransferHrg', 'quadRental', 'camelPhotos'], excl: ['turban', 'photographer', 'personal'],
    pricing: { type: 'pp', vk: 'vk_slot', variants: [
      { id: 'am', l: ['Matin · 09:00–12:00', 'Morning · 09:00–12:00', 'Mañana · 09:00–12:00', 'Manhã · 09:00–12:00'], tiers: [{ k: 'person', p: 25 }] },
      { id: 'pm', l: ['Après-midi · 12:00–16:00', 'Afternoon · 12:00–16:00', 'Tarde · 12:00–16:00', 'Tarde · 12:00–16:00'], tiers: [{ k: 'person', p: 28 }] },
      { id: 'sunset', l: ['Coucher du soleil · 16:00–19:00', 'Sunset · 16:00–19:00', 'Atardecer · 16:00–19:00', 'Pôr do sol · 16:00–19:00'], tiers: [{ k: 'person', p: 30 }] }
    ] }
  },
  {
    id: 'super-safari', supp: 'safari', cat: 'explore', sub: 'desert', icon: 'car-4wd', photo: 'img/super-safari.jpg',
    title: ['Super safari désert', 'Super desert safari', 'Super safari por el desierto', 'Super safari no deserto'],
    place: 'hurghada', hours: '11:00–18:30', minAge: 16, from: true,
    desc: [
      'Quad et buggy dans le désert, visite d’un village bédouin reconstitué, rencontre avec les chameaux, puis dîner et spectacle oriental.',
      'Quad and buggy in the desert, a visit to a reconstructed Bedouin village, time with the camels, then dinner and an oriental show.',
      'Quad y buggy por el desierto, visita a un poblado beduino recreado, encuentro con camellos y después cena y espectáculo oriental.',
      'Quad e buggy no deserto, visita a uma aldeia beduína recriada, tempo com os camelos e depois jantar e espetáculo oriental.'
    ],
    notes: [['Tarif adulte de 23 à 28 € selon l’horaire.', 'Adult price €23–28 depending on the time slot.', 'Precio adulto de 23 a 28 € según el horario.', 'Preço adulto de 23 a 28 € consoante o horário.']],
    incl: ['hotelTransferHrg', 'quadBuggy', 'dinnerShow'], excl: ['turban', 'photographer', 'personal'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '16+', p: 25 }, { k: 'child', a: '3-16', p: 12.5 }, { k: 'baby', a: '0-2', p: 0 }] }
  },
  {
    id: 'camel-ride', supp: 'safari', cat: 'explore', sub: 'desert', icon: 'sunset', photo: 'img/chameau.jpg',
    title: ['Balade à dos de chameau', 'Camel ride', 'Paseo en camello', 'Passeio de camelo'],
    place: 'hurghada', tags: ['family', 'sunset'],
    desc: [
      'Partez à dos de chameau à travers le désert, au rythme tranquille de la caravane, pour une heure ou deux. Au coucher du soleil, les dunes se teintent d’or : un moment magique.',
      'Ride a camel through the desert at the calm pace of the caravan, for one or two hours. At sunset the dunes turn golden: a magical moment.',
      'Recorre el desierto a lomos de un camello, al ritmo tranquilo de la caravana, durante una o dos horas. Al atardecer las dunas se tiñen de oro: un momento mágico.',
      'Atravesse o deserto de camelo, ao ritmo calmo da caravana, durante uma ou duas horas. Ao pôr do sol as dunas ficam douradas: um momento mágico.'
    ],
    notes: [['Tarif unique, quel que soit l’âge.', 'Single rate regardless of age.', 'Tarifa única sin distinción de edad.', 'Tarifa única, independentemente da idade.'],
      ['Horaires à convenir avec l’agence lors du devis.', 'Times to be arranged with the agency when you send your quote.', 'Horario a convenir con la agencia al enviar el presupuesto.', 'Horário a combinar com a agência no pedido de orçamento.']],
    incl: ['hotelTransfer', 'camelRide'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', vk: 'vk_duration', variants: [
      { id: '1h', l: ['1 heure', '1 hour', '1 hora', '1 hora'], tiers: [{ k: 'person', p: 35 }] },
      { id: '1hs', l: ['1 heure · coucher du soleil', '1 hour · sunset', '1 hora · atardecer', '1 hora · pôr do sol'], tiers: [{ k: 'person', p: 40 }] },
      { id: '2h', l: ['2 heures', '2 hours', '2 horas', '2 horas'], tiers: [{ k: 'person', p: 60 }] },
      { id: '2hs', l: ['2 heures · coucher du soleil', '2 hours · sunset', '2 horas · atardecer', '2 horas · pôr do sol'], tiers: [{ k: 'person', p: 70 }] }
    ] }
  },
  {
    id: 'fantastic-sahara', supp: 'safari', cat: 'explore', sub: 'desert', icon: 'telescope', photo: 'img/fantastic-sahara.jpg',
    title: ['Fantastic Sahara', 'Fantastic Sahara', 'Fantastic Sahara', 'Fantastic Sahara'],
    place: 'hurghada', hours: '15:00–21:00', minAge: 16,
    desc: [
      'La totale : 2 h 30 de quad, balade à dos de chameau puis à cheval, visite d’un village bédouin, dîner-spectacle oriental et observation des étoiles au télescope avec des experts.',
      'The full experience: 2 h 30 of quad biking, a camel ride then a horse ride, a Bedouin village visit, an oriental dinner show and stargazing through a telescope with experts.',
      'La experiencia completa: 2 h 30 de quad, paseo en camello y a caballo, visita a un poblado beduino, cena espectáculo oriental y observación de estrellas con telescopio junto a expertos.',
      'A experiência completa: 2 h 30 de quad, passeio de camelo e a cavalo, visita a uma aldeia beduína, jantar-espetáculo oriental e observação de estrelas ao telescópio com especialistas.'
    ],
    incl: ['hotelTransferHrg', 'quadHorseCamel', 'orientalDinner', 'telescope'], excl: ['turban', 'photographer', 'personal'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 50 }] }
  },
  {
    id: 'buggy', cat: 'explore', sub: 'desert', icon: 'car-4wd', photo: 'img/buggy.jpg',
    title: ['Balade en buggy', 'Buggy ride', 'Paseo en buggy', 'Passeio de buggy'],
    place: 'hurghada', dur: { h: 2 },
    desc: [
      'En buggy, entre amis ou en famille, partez à la découverte du désert d’Hurghada et de ses panoramas sur les falaises, avec une pause photo aux côtés d’un chameau.',
      'Hop in a buggy with friends or family to explore the Hurghada desert and its views over the cliffs, with a photo stop next to a camel.',
      'Sube a un buggy con amigos o en familia para descubrir el desierto de Hurghada y sus vistas sobre los acantilados, con parada para fotos junto a un camello.',
      'Suba para um buggy com amigos ou família e descubra o deserto de Hurghada e as vistas sobre as falésias, com paragem para fotos ao lado de um camelo.'
    ],
    incl: ['hotelTransfer', 'buggyRental', 'camelPhotos'], excl: ['personal', 'photographer'],
    pricing: { type: 'group', vk: 'vk_formula', variants: [
      { id: 'b2', l: ['Buggy 2 personnes', '2-seat buggy', 'Buggy 2 personas', 'Buggy 2 pessoas'], p: 110, max: 2 },
      { id: 'b4', l: ['Buggy 4 personnes', '4-seat buggy', 'Buggy 4 personas', 'Buggy 4 pessoas'], p: 150, max: 4 }
    ] }
  },
  {
    id: 'karting', cat: 'explore', sub: 'desert', icon: 'helmet', photo: 'img/karting.jpg',
    title: ['Karting à El Gouna', 'Karting in El Gouna', 'Karting en El Gouna', 'Karting em El Gouna'],
    place: 'elgouna',
    desc: [
      'Virages serrés, lignes droites et dépassements audacieux : prenez le volant sur un vrai circuit de karting.',
      'Tight bends, fast straights and daring overtakes: take the wheel on a real karting track.',
      'Curvas cerradas, rectas y adelantamientos audaces: ponte al volante en un circuito de karting de verdad.',
      'Curvas apertadas, retas e ultrapassagens ousadas: pegue no volante num verdadeiro circuito de karting.'
    ],
    incl: ['hotelTransfer', 'kartTicket'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', vk: 'vk_duration', variants: [
      { id: '15', l: ['15 minutes', '15 minutes', '15 minutos', '15 minutos'], tiers: [{ k: 'person', p: 30 }] },
      { id: '30', l: ['30 minutes', '30 minutes', '30 minutos', '30 minutos'], tiers: [{ k: 'person', p: 50 }] }
    ] }
  },
  {
    id: 'motocross', cat: 'explore', sub: 'desert', icon: 'motorbike', photo: 'img/motocross.jpg',
    title: ['Moto-cross', 'Dirt bike', 'Motocross', 'Motocross'],
    place: 'hurghada',
    desc: [
      'Une expérience palpitante en moto-cross à travers des paysages spectaculaires, avec de beaux souvenirs en photo.',
      'A thrilling dirt-bike ride through spectacular landscapes, with great photo memories.',
      'Una experiencia trepidante en moto de cross por paisajes espectaculares, con grandes recuerdos en foto.',
      'Uma experiência empolgante de mota de cross por paisagens espetaculares, com ótimas recordações em foto.'
    ],
    incl: ['hotelTransfer', 'motoRental'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 110 }] }
  },

  /* --- Balades --- */
  {
    id: 'horse-dinner', cat: 'explore', sub: 'rides', icon: 'horse', photo: 'img/cheval-diner.jpg',
    title: ['Balade à cheval + dîner-spectacle', 'Horse ride + dinner show', 'Paseo a caballo + cena espectáculo', 'Passeio a cavalo + jantar-espetáculo'],
    place: 'hurghada', hours: '15:00–20:00',
    desc: [
      'Une balade à cheval dans un paysage magnifique, au calme, suivie d’un dîner-spectacle oriental.',
      'A peaceful horse ride through stunning scenery, followed by an oriental dinner show.',
      'Un tranquilo paseo a caballo por un paisaje magnífico, seguido de una cena espectáculo oriental.',
      'Um passeio tranquilo a cavalo por uma paisagem magnífica, seguido de um jantar-espetáculo oriental.'
    ],
    incl: ['hotelTransfer', 'horse', 'dinnerShow'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', vk: 'vk_slot', variants: [
      { id: 'am', l: ['Matin', 'Morning', 'Mañana', 'Manhã'], tiers: [{ k: 'person', p: 30 }] },
      { id: 'sunset', l: ['Coucher du soleil', 'Sunset', 'Atardecer', 'Pôr do sol'], tiers: [{ k: 'person', p: 35 }] }
    ] }
  },
  {
    id: 'horse', cat: 'explore', sub: 'rides', icon: 'horse', photo: 'img/cheval.jpg',
    title: ['Balade à cheval', 'Horse ride', 'Paseo a caballo', 'Passeio a cavalo'],
    place: 'hurghada', dur: { h: 2 }, hours: '14:30–18:00',
    desc: [
      'Deux heures à cheval à travers un paysage magnifique, dans le calme et la tranquillité de la nature.',
      'Two hours on horseback through beautiful scenery, in the peace and quiet of nature.',
      'Dos horas a caballo por un paisaje precioso, en la calma de la naturaleza.',
      'Duas horas a cavalo por uma paisagem lindíssima, na calma da natureza.'
    ],
    incl: ['hotelTransfer', 'horse', 'ride2h'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 30 }] }
  },
  {
    id: 'caleche', cat: 'explore', sub: 'rides', icon: 'horse', photo: 'img/caleche.jpg',
    title: ['Balade en calèche', 'Horse-drawn carriage ride', 'Paseo en calesa', 'Passeio de charrete'],
    place: 'hurghada', dur: { h: 2 }, hours: '15:00–18:00', tags: ['family'],
    desc: [
      'Une balade en calèche à travers un magnifique paysage désertique, puis dîner-spectacle oriental au cœur du centre équestre d’Hurghada.',
      'A carriage ride through beautiful desert scenery, followed by an oriental dinner show at Hurghada’s equestrian centre.',
      'Un paseo en calesa por un precioso paisaje desértico y después cena espectáculo oriental en el centro ecuestre de Hurghada.',
      'Um passeio de charrete por uma bela paisagem desértica e depois jantar-espetáculo oriental no centro equestre de Hurghada.'
    ],
    notes: [['Tarif par calèche : 1 adulte (avec enfant ou bébé).', 'Price per carriage: 1 adult (with a child or baby).', 'Precio por calesa: 1 adulto (con niño o bebé).', 'Preço por charrete: 1 adulto (com criança ou bebé).']],
    incl: ['hotelTransfer', 'carriage', 'dinnerShow'], excl: ['personal', 'photographer'],
    pricing: { type: 'unit', p: 60, unit: ['Calèches', 'Carriages', 'Calesas', 'Charretes'], unitOne: ['calèche', 'carriage', 'calesa', 'charrete'] }
  },

  /* --- Spa & bien-être --- */
  {
    id: 'spa', cat: 'explore', sub: 'wellness', icon: 'massage', photo: 'img/spa.jpg',
    title: ['Spa & massage', 'Spa & massage', 'Spa y masaje', 'Spa e massagem'],
    place: 'hurghada', dur: { h: 2 },
    slots: ['10:00–12:00', '12:00–15:00', '15:00–18:00'],
    desc: [
      'Massages et soins du visage, puis détente au hammam, au sauna et au jacuzzi : deux heures pour récupérer loin de l’agitation.',
      'Massages and facial treatments, then unwind in the hammam, sauna and jacuzzi: two hours to recharge away from it all.',
      'Masajes y tratamientos faciales, y después relax en el hammam, la sauna y el jacuzzi: dos horas para recuperarse lejos del bullicio.',
      'Massagens e tratamentos de rosto, seguidos de relaxamento no hammam, sauna e jacuzzi: duas horas para recuperar longe da agitação.'
    ],
    incl: ['hotelTransfer', 'drinks'], excl: ['personal'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 25 }] }
  },
  {
    id: 'spa-rivoli', cat: 'explore', sub: 'wellness', icon: 'flower', photo: 'img/spa-rivoli.jpg',
    title: ['Spa & massage Rivoli', 'Rivoli spa & massage', 'Spa y masaje Rivoli', 'Spa e massagem Rivoli'],
    place: 'hurghada', dur: { h: 2 },
    slots: [['Matin', 'Morning', 'Mañana', 'Manhã'], ['Après-midi', 'Afternoon', 'Tarde', 'Tarde']],
    desc: [
      'Programme complet : hammam, sauna, jacuzzi, massage à la mousse, gommage, enveloppement corporel, masque visage et massage de 30 minutes.',
      'The full programme: hammam, sauna, jacuzzi, foam massage, body scrub and wrap, face mask and a 30-minute massage.',
      'Programa completo: hammam, sauna, jacuzzi, masaje con espuma, exfoliación, envoltura corporal, mascarilla facial y masaje de 30 minutos.',
      'Programa completo: hammam, sauna, jacuzzi, massagem com espuma, esfoliação, envolvimento corporal, máscara facial e massagem de 30 minutos.'
    ],
    incl: ['hotelTransfer', 'drinks'], excl: ['personal'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 30 }] }
  },

  /* --- Culture --- */
  {
    id: 'historic-sahara', cat: 'explore', sub: 'culture', icon: 'car-4wd', photo: 'img/historic-sahara.jpg',
    title: ['Historic Sahara', 'Historic Sahara', 'Historic Sahara', 'Historic Sahara'],
    place: 'hurghada', hours: '08:30–18:00',
    desc: [
      'Traversez le désert égyptien en jeep à la découverte de sites historiques, de vestiges de civilisations anciennes et de paysages à couper le souffle.',
      'Cross the Egyptian desert by jeep to discover historic sites, remains of ancient civilisations and breathtaking landscapes.',
      'Cruza el desierto egipcio en jeep para descubrir sitios históricos, vestigios de civilizaciones antiguas y paisajes impresionantes.',
      'Atravesse o deserto egípcio de jipe à descoberta de locais históricos, vestígios de civilizações antigas e paisagens de cortar a respiração.'
    ],
    incl: ['hotelTransferHrg', 'jeep', 'lunchTea'], excl: ['personal', 'photographer'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 55 }] }
  },
  {
    id: 'souk', cat: 'explore', sub: 'culture', icon: 'lamp', photo: 'img/souk.jpg',
    title: ['Souk d’El Dahar', 'El Dahar souk', 'Zoco de El Dahar', 'Souk de El Dahar'],
    place: 'hurghada', hours: '20:00–22:00',
    desc: [
      'Plongez dans le souk traditionnel d’El Dahar : étals colorés, senteurs d’épices, artisanat local et ambiance animée du vieil Hurghada.',
      'Dive into the traditional El Dahar souk: colourful stalls, the scent of spices, local crafts and the lively buzz of old Hurghada.',
      'Sumérgete en el zoco tradicional de El Dahar: puestos de colores, aroma a especias, artesanía local y el ambiente animado del viejo Hurghada.',
      'Mergulhe no souk tradicional de El Dahar: bancas coloridas, aroma a especiarias, artesanato local e o ambiente animado da velha Hurghada.'
    ],
    incl: ['hotelTransfer'], excl: ['personal'],
    pricing: { type: 'pp', tiers: [{ k: 'person', p: 20 }] }
  },

  /* --- Animaux --- */
  {
    id: 'lions', cat: 'explore', sub: 'animals', icon: 'camera', photo: 'img/lions.jpg',
    title: ['Photos avec les lions', 'Photos with lions', 'Fotos con leones', 'Fotos com leões'],
    place: 'hurghada', dur: { min: 5 }, tags: ['family'], smallGroup: { under: 3, fee: 20 },
    desc: [
      'Un face-à-face inoubliable : approchez les lions, caressez-les et repartez avec photos et vidéos de ce moment unique.',
      'An unforgettable encounter: get close to the lions, stroke them and leave with photos and videos of this unique moment.',
      'Un encuentro inolvidable: acércate a los leones, acarícialos y llévate fotos y vídeos de este momento único.',
      'Um encontro inesquecível: aproxime-se dos leões, faça-lhes festas e leve fotos e vídeos deste momento único.'
    ],
    notes: [[
      'Séance de 5 minutes avec les lions, photos et vidéos incluses.',
      '5-minute session with the lions, photos and videos included.',
      'Sesión de 5 minutos con los leones, fotos y vídeos incluidos.',
      'Sessão de 5 minutos com os leões, fotos e vídeos incluídos.'
    ], [
      'Horaires à convenir avec l’agence lors du devis.',
      'Times to be arranged with the agency when you send your quote.',
      'Horario a convenir con la agencia al enviar el presupuesto.',
      'Horário a combinar com a agência no pedido de orçamento.'
    ], [
      'Transfert inclus à partir de 3 personnes. Pour 1 ou 2 personnes : supplément de 20 € pour le groupe.',
      'Transfer included from 3 people. For 1 or 2 people: €20 surcharge for the group.',
      'Traslado incluido a partir de 3 personas. Para 1 o 2 personas: suplemento de 20 € para el grupo.',
      'Transfer incluído a partir de 3 pessoas. Para 1 ou 2 pessoas: suplemento de 20 € para o grupo.'
    ]],
    incl: ['hotelTransfer3', 'photosVideos'], excl: ['personal'],
    pricing: { type: 'pp', tiers: [{ k: 'adult', a: '10+', p: 30 }, { k: 'child', a: '3-10', p: 15 }, { k: 'baby', a: 'u3', p: 10 }] }
  }
];

/* Avis Google (extraits visibles — à compléter) */
const REVIEWS = [
  { name: 'Sarah', ago: 'rv_ago_month', text: 'Partis 15 jours à Hurghada avec mon mari et nos 4 enfants de 18 à 8 ans, nous avons pu profiter de magnifiques excursions et activités grâce à cette agence que nous recommandons à 💯 %. Mohamed, notre guide, a su nous écouter et nous orienter selon nos besoins 🤲🏻 Nous avons pu découvrir Hurghada en toute confiance et rentrer avec de magnifiques souvenirs en famille. Van mis à disposition pour nos transferts aéroport/hôtel, speed boat à la recherche des dauphins et snorkeling, Orange Bay, plongée, parachute ascensionnel, balade à cheval, quad dans le désert… Super expérience 💫 Encore merci !' },
  { name: 'Lucas V.', ago: 'rv_ago_8m', text: 'Excellente expérience avec Hurghada International Tours ! Organisation parfaite du début à la fin, guides très professionnels et sympathiques, et excursions vraiment bien encadrées. Tout s’est déroulé comme prévu…' },
  { name: 'Dindé K.', ago: 'rv_ago_month', text: 'J’ai passé un séjour inoubliable, accompagné de ma femme et mes enfants. Mohamed est un guide exceptionnel qui parle plusieurs langues, qui connaît très bien la culture égyptienne et nous a fait découvrir plein de choses. Que ce soit la tarification, le service proposé, mais surtout son côté humain, je recommande à tous de passer par cette agence… Merci pour tout ce que tu as fait pour nous.' },
  { name: 'Rose-Marie G.', ago: 'rv_ago_month', text: 'Toutes les activités de notre séjour ont été organisées et planifiées avec cette agence. Tout s’est super bien passé, tout était parfait, du trajet aux activités elles-mêmes. Merci à Mohamed pour avoir tout bien organisé et conseillé. Je vous recommande de passer par cette agence qui vous fait rencontrer des personnes formidables.' },
  { name: 'Carole T.', ago: 'rv_ago_2m', photo: 'img/avis-carole.jpg', text: 'Une expérience incroyable avec Hurghada International Tours, et un guide exceptionnel, Mohammed, passionné, qui nous transmet toutes ses connaissances. Il est bienveillant et soucieux de notre bien-être. Les activités sont super bien organisées, je les recommande à 2000 % 😊' },
  { name: 'Alexia B.', ago: 'rv_ago_2m', text: 'Nous avons passé une semaine à Hurghada et avons fait appel à Momo pour nos excursions : tout était incroyable ! Merci à toi, tu es un guide exceptionnel, très attentif à nos besoins et toujours présent. Tu as rendu ce voyage encore plus incroyable, nous avons eu un petit pincement au cœur en rentrant en France ! Je recommande sans hésitation. Encore merci pour tout !' },
  { name: 'Maelle G.', ago: 'rv_ago_7m', photo: 'img/avis-maelle.jpg', text: 'Mohamed a été un guide exceptionnel en Égypte. Il était très gentil, toujours à l’écoute et attentif à nos besoins. Grâce à lui, le voyage a été encore plus agréable et enrichissant. Je le recommande sans hésitation ! 🫶🫶' },
  { name: 'Théo V.', ago: 'rv_ago_8m', text: 'Nous avons passé un voyage exceptionnel de 10 jours en Égypte, et une grande partie de cette expérience incroyable est due à notre guide privé Mohamed. Il a été tout simplement parfait du début à la fin : extrêmement professionnel, toujours ponctuel, très cultivé et passionné par l’histoire de son pays. Ses explications étaient claires, captivantes et adaptées à nos attentes. Toujours à l’écoute, bienveillant, attentif à notre confort et à notre sécurité, il nous a fait découvrir l’Égypte authentique. Un immense merci à Mohamed pour sa gentillesse, son sérieux et son enthousiasme. Nous le recommandons les yeux fermés !' }
];

/* Coordonnées */
const CONTACT = {
  whatsapp: '201035061676',
  phoneDisplay: '+20 10 3506 1676',
  googleReviews: 'https://share.google/a9kv6eJvHVPhulZPE',
  social: {
    instagram: 'https://www.instagram.com/hurghada_international_tours/',
    tiktok: 'https://www.tiktok.com/@hurghada.internat',
    snapchat: 'https://www.snapchat.com/add/hurghadainter07',
    facebook: 'https://www.facebook.com/flip.plip.77'
  }
};
