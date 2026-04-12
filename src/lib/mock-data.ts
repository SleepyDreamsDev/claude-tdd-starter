// src/lib/mock-data.ts — POC mock data layer (replaced by Prisma/Supabase in MVP)

import {
  ADD_ONS,
  BUNDLE_DISCOUNT_PERCENT,
  BUNDLE_DISCOUNT_THRESHOLD,
  NEIGHBORHOODS,
  SERVICE_TYPES,
} from "@/lib/constants";
import { calculatePrice, calculateTotalSqm } from "@/lib/pricing";
import type {
  AddOn,
  BookingConfirmation,
  BookingFormData,
  Neighborhood,
  Provider,
  ProviderFilters,
  Review,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Providers
// ---------------------------------------------------------------------------

const ALL_NEIGHBORHOODS: Neighborhood[] = [
  "centru",
  "botanica",
  "buiucani",
  "ciocana",
  "riscani",
  "telecentru",
  "durlesti",
  "sculeni",
  "posta-veche",
  "rascanovca",
];

const PROVIDERS: Provider[] = [
  {
    id: "1",
    slug: "cristal-plus",
    companyName: "Cristal Plus",
    bio: {
      ro: "Cristal Plus oferă servicii de curățenie profesională în Chișinău de peste 8 ani. Echipa noastră folosește produse ecologice certificate și tehnici moderne pentru rezultate impecabile. Satisfacția clientului este prioritatea noastră numărul unu.",
      ru: "Cristal Plus предоставляет профессиональные услуги уборки в Кишинёве уже более 8 лет. Наша команда использует сертифицированные экологические средства и современные методы для безупречных результатов. Удовлетворённость клиента — наш главный приоритет.",
    },
    phone: "+373 69 123 456",
    email: "contact@cristalplus.md",
    instagramHandle: "cristalplus.md",
    photoUrls: [
      "/images/providers/cristal-plus-1.jpg",
      "/images/providers/cristal-plus-2.jpg",
      "/images/providers/cristal-plus-3.jpg",
    ],
    services: ["GENERAL_CLEANING", "DEEP_CLEANING", "WINDOW_CLEANING"],
    pricePerSqm: 35,
    minBooking: 700,
    coverageAreas: ["centru", "botanica"],
    availability: [
      { dayOfWeek: "MON", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "TUE", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "WED", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "THU", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "FRI", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "SAT", startTime: "09:00", endTime: "17:00" },
    ],
    ratingAvg: 4.8,
    reviewCount: 47,
    verified: true,
    createdAt: "2023-03-15",
  },
  {
    id: "2",
    slug: "aquafresh-clean",
    companyName: "AquaFresh Clean",
    bio: {
      ro: "AquaFresh Clean este specializată în curățenie după reparație și tratarea covoarelor. Folosim echipamente profesionale de extracție și detergenți hipoalergenici. Lucrăm rapid, fără a deranja rutina dumneavoastră zilnică.",
      ru: "AquaFresh Clean специализируется на уборке после ремонта и чистке ковров. Мы используем профессиональное экстракционное оборудование и гипоаллергенные моющие средства. Работаем быстро, не нарушая ваш повседневный распорядок.",
    },
    phone: "+373 78 234 567",
    email: "info@aquafresh.md",
    instagramHandle: "aquafresh_clean",
    photoUrls: [
      "/images/providers/aquafresh-clean-1.jpg",
      "/images/providers/aquafresh-clean-2.jpg",
      "/images/providers/aquafresh-clean-3.jpg",
      "/images/providers/aquafresh-clean-4.jpg",
    ],
    services: ["GENERAL_CLEANING", "POST_RENOVATION", "CARPET_CLEANING"],
    pricePerSqm: 42,
    minBooking: 800,
    coverageAreas: ["buiucani", "riscani"],
    availability: [
      { dayOfWeek: "MON", startTime: "08:00", endTime: "18:00" },
      { dayOfWeek: "TUE", startTime: "08:00", endTime: "18:00" },
      { dayOfWeek: "WED", startTime: "08:00", endTime: "18:00" },
      { dayOfWeek: "THU", startTime: "08:00", endTime: "18:00" },
      { dayOfWeek: "FRI", startTime: "08:00", endTime: "18:00" },
      { dayOfWeek: "SAT", startTime: "09:00", endTime: "16:00" },
    ],
    ratingAvg: 4.6,
    reviewCount: 31,
    verified: true,
    createdAt: "2023-07-20",
  },
  {
    id: "3",
    slug: "procurat",
    companyName: "ProCurat",
    bio: {
      ro: "ProCurat este liderul pieței de curățenie din Chișinău, cu o echipă de 12 specialiști certificați. Oferim gama completă de servicii — de la curățenie generală până la tratamente specializate post-renovare. Garanție de calitate 100% sau repetăm gratuit.",
      ru: "ProCurat — лидер рынка уборки в Кишинёве с командой из 12 сертифицированных специалистов. Предлагаем полный спектр услуг — от общей уборки до специализированных работ после ремонта. Гарантия качества 100% или повторим бесплатно.",
    },
    phone: "+373 60 345 678",
    email: "hello@procurat.md",
    instagramHandle: "procurat_md",
    website: "https://procurat.md",
    photoUrls: [
      "/images/providers/procurat-1.jpg",
      "/images/providers/procurat-2.jpg",
      "/images/providers/procurat-3.jpg",
      "/images/providers/procurat-4.jpg",
      "/images/providers/procurat-5.jpg",
      "/images/providers/procurat-6.jpg",
    ],
    services: [
      "GENERAL_CLEANING",
      "DEEP_CLEANING",
      "POST_RENOVATION",
      "WINDOW_CLEANING",
      "CARPET_CLEANING",
    ],
    pricePerSqm: 50,
    minBooking: 1000,
    coverageAreas: ["centru", "telecentru", "botanica"],
    availability: [
      { dayOfWeek: "MON", startTime: "07:00", endTime: "20:00" },
      { dayOfWeek: "TUE", startTime: "07:00", endTime: "20:00" },
      { dayOfWeek: "WED", startTime: "07:00", endTime: "20:00" },
      { dayOfWeek: "THU", startTime: "07:00", endTime: "20:00" },
      { dayOfWeek: "FRI", startTime: "07:00", endTime: "20:00" },
      { dayOfWeek: "SAT", startTime: "08:00", endTime: "18:00" },
      { dayOfWeek: "SUN", startTime: "10:00", endTime: "16:00" },
    ],
    ratingAvg: 4.9,
    reviewCount: 62,
    verified: true,
    createdAt: "2022-11-01",
  },
  {
    id: "4",
    slug: "sunshine-md",
    companyName: "SunShine MD",
    bio: {
      ro: "SunShine MD aduce lumina soarelui în casa dumneavoastră prin servicii de curățenie accesibile și de calitate. Ne ocupăm de curățenia periodică și de întreținere, astfel încât locuința dvs. să fie mereu în ordine. Prețuri corecte, fără surprize.",
      ru: "SunShine MD приносит солнечный свет в ваш дом через доступные и качественные услуги уборки. Мы занимаемся периодической уборкой и обслуживанием, чтобы ваше жильё всегда было в порядке. Честные цены, никаких сюрпризов.",
    },
    phone: "+373 79 456 789",
    email: "sunshine@mail.md",
    instagramHandle: "sunshine_md_clean",
    photoUrls: [
      "/images/providers/sunshine-md-1.jpg",
      "/images/providers/sunshine-md-2.jpg",
      "/images/providers/sunshine-md-3.jpg",
    ],
    services: ["GENERAL_CLEANING", "MAINTENANCE"],
    pricePerSqm: 38,
    minBooking: 600,
    coverageAreas: ["ciocana", "botanica"],
    availability: [
      { dayOfWeek: "MON", startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: "TUE", startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: "WED", startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: "THU", startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: "FRI", startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: "SAT", startTime: "10:00", endTime: "16:00" },
    ],
    ratingAvg: 4.3,
    reviewCount: 18,
    verified: false,
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    slug: "ecoclean-moldova",
    companyName: "EcoClean Moldova",
    bio: {
      ro: "EcoClean Moldova este prima companie de curățenie eco-certificată din Chișinău. Folosim exclusiv produse biodegradabile, sigure pentru copii și animale de companie. Acoperim toate cartierele orașului și oferim flexibilitate maximă în programare.",
      ru: "EcoClean Moldova — первая экологически сертифицированная компания по уборке в Кишинёве. Используем исключительно биоразлагаемые средства, безопасные для детей и домашних животных. Охватываем все районы города и предлагаем максимальную гибкость в планировании.",
    },
    phone: "+373 68 567 890",
    email: "eco@ecoclean.md",
    instagramHandle: "ecoclean_moldova",
    website: "https://ecoclean.md",
    photoUrls: [
      "/images/providers/ecoclean-moldova-1.jpg",
      "/images/providers/ecoclean-moldova-2.jpg",
      "/images/providers/ecoclean-moldova-3.jpg",
      "/images/providers/ecoclean-moldova-4.jpg",
      "/images/providers/ecoclean-moldova-5.jpg",
    ],
    services: [
      "GENERAL_CLEANING",
      "DEEP_CLEANING",
      "UPHOLSTERY_CLEANING",
      "CARPET_CLEANING",
    ],
    pricePerSqm: 45,
    minBooking: 900,
    coverageAreas: ALL_NEIGHBORHOODS,
    availability: [
      { dayOfWeek: "MON", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "TUE", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "WED", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "THU", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "FRI", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "SAT", startTime: "08:00", endTime: "17:00" },
    ],
    ratingAvg: 4.7,
    reviewCount: 39,
    verified: true,
    createdAt: "2023-05-18",
  },
  {
    id: "6",
    slug: "casa-curata",
    companyName: "CasaCurată",
    bio: {
      ro: "CasaCurată oferă servicii de curățenie personalizate pentru familii din Sculeni, Buiucani și Poșta Veche. Suntem o echipă mică și de încredere, cu clienți fideli de ani de zile. Fiecare apartament îl tratăm ca și cum ar fi al nostru.",
      ru: "CasaCurată предлагает персонализированные услуги уборки для семей из Скулень, Буюкан и Старой Почты. Мы небольшая и надёжная команда с постоянными клиентами на протяжении многих лет. Каждую квартиру мы обрабатываем так, будто она наша.",
    },
    phone: "+373 76 678 901",
    email: "casacurata@gmail.com",
    instagramHandle: "casa_curata_md",
    photoUrls: [
      "/images/providers/casa-curata-1.jpg",
      "/images/providers/casa-curata-2.jpg",
      "/images/providers/casa-curata-3.jpg",
    ],
    services: ["GENERAL_CLEANING", "MAINTENANCE", "WINDOW_CLEANING"],
    pricePerSqm: 33,
    minBooking: 500,
    coverageAreas: ["sculeni", "buiucani", "posta-veche"],
    availability: [
      { dayOfWeek: "MON", startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: "TUE", startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: "WED", startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: "THU", startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: "FRI", startTime: "09:00", endTime: "18:00" },
      { dayOfWeek: "SAT", startTime: "10:00", endTime: "15:00" },
    ],
    ratingAvg: 4.4,
    reviewCount: 22,
    verified: false,
    createdAt: "2024-01-05",
  },
  {
    id: "7",
    slug: "diamond-cleaning",
    companyName: "Diamond Cleaning",
    bio: {
      ro: "Diamond Cleaning este alegerea premium pentru clienții care nu fac compromisuri la calitate. Cu cei mai buni specialiști din oraș și echipamente de ultimă generație, livrăm rezultate de nivel 5 stele la fiecare vizită. Toate serviciile, toate cartierele centrale.",
      ru: "Diamond Cleaning — премиальный выбор для клиентов, которые не идут на компромисс в вопросе качества. С лучшими специалистами города и оборудованием последнего поколения мы обеспечиваем результаты уровня 5 звёзд при каждом визите. Все услуги, все центральные районы.",
    },
    phone: "+373 60 789 012",
    email: "contact@diamond-cleaning.md",
    instagramHandle: "diamond_cleaning_md",
    website: "https://diamond-cleaning.md",
    photoUrls: [
      "/images/providers/diamond-cleaning-1.jpg",
      "/images/providers/diamond-cleaning-2.jpg",
      "/images/providers/diamond-cleaning-3.jpg",
      "/images/providers/diamond-cleaning-4.jpg",
      "/images/providers/diamond-cleaning-5.jpg",
      "/images/providers/diamond-cleaning-6.jpg",
    ],
    services: [
      "GENERAL_CLEANING",
      "DEEP_CLEANING",
      "POST_RENOVATION",
      "MAINTENANCE",
      "WINDOW_CLEANING",
      "CARPET_CLEANING",
      "UPHOLSTERY_CLEANING",
      "MOVE_IN_OUT",
    ],
    pricePerSqm: 55,
    minBooking: 1200,
    coverageAreas: ["centru", "botanica", "telecentru"],
    availability: [
      { dayOfWeek: "MON", startTime: "07:00", endTime: "21:00" },
      { dayOfWeek: "TUE", startTime: "07:00", endTime: "21:00" },
      { dayOfWeek: "WED", startTime: "07:00", endTime: "21:00" },
      { dayOfWeek: "THU", startTime: "07:00", endTime: "21:00" },
      { dayOfWeek: "FRI", startTime: "07:00", endTime: "21:00" },
      { dayOfWeek: "SAT", startTime: "08:00", endTime: "20:00" },
      { dayOfWeek: "SUN", startTime: "09:00", endTime: "18:00" },
    ],
    ratingAvg: 4.9,
    reviewCount: 85,
    verified: true,
    createdAt: "2022-06-01",
  },
  {
    id: "8",
    slug: "moldoclean-express",
    companyName: "MoldoClean Express",
    bio: {
      ro: "MoldoClean Express se concentrează pe curățenie rapidă și eficientă în Ciocana, Rîșcani și Durlești. Suntem specialiști în curățenie post-renovare și servicii de mutare, cu prețuri competitive și timp de răspuns rapid. Rezervare confirmată în 2 ore.",
      ru: "MoldoClean Express специализируется на быстрой и эффективной уборке в Чеканах, Рышкановке и Дурлештах. Мы эксперты в уборке после ремонта и услугах при переезде, с конкурентными ценами и быстрым временем отклика. Бронирование подтверждается в течение 2 часов.",
    },
    phone: "+373 79 890 123",
    email: "express@moldoclean.md",
    instagramHandle: "moldoclean_express",
    photoUrls: [
      "/images/providers/moldoclean-express-1.jpg",
      "/images/providers/moldoclean-express-2.jpg",
      "/images/providers/moldoclean-express-3.jpg",
      "/images/providers/moldoclean-express-4.jpg",
    ],
    services: ["GENERAL_CLEANING", "POST_RENOVATION", "MOVE_IN_OUT"],
    pricePerSqm: 40,
    minBooking: 750,
    coverageAreas: ["ciocana", "riscani", "durlesti"],
    availability: [
      { dayOfWeek: "MON", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "TUE", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "WED", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "THU", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "FRI", startTime: "08:00", endTime: "19:00" },
      { dayOfWeek: "SAT", startTime: "09:00", endTime: "17:00" },
    ],
    ratingAvg: 4.5,
    reviewCount: 28,
    verified: true,
    createdAt: "2023-09-12",
  },
];

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

const REVIEWS: Review[] = [
  // Cristal Plus (id: "1") — 5 reviews
  {
    id: "r1",
    providerId: "1",
    clientName: "Maria T.",
    rating: 5,
    comment:
      "Serviciu excelent! Apartamentul arată ca nou după curățenie. Recomand cu căldură.",
    locale: "ro",
    createdAt: "2026-03-28",
  },
  {
    id: "r2",
    providerId: "1",
    clientName: "Ольга К.",
    rating: 5,
    comment:
      "Очень довольна результатом. Команда профессиональная, вежливая, работают аккуратно.",
    locale: "ru",
    createdAt: "2026-02-14",
  },
  {
    id: "r3",
    providerId: "1",
    clientName: "Andrei B.",
    rating: 4,
    comment:
      "Bun raport calitate-preț. Au venit la timp și au finalizat în termenul promis.",
    locale: "ro",
    createdAt: "2026-01-20",
  },
  {
    id: "r4",
    providerId: "1",
    clientName: "Наталья В.",
    rating: 5,
    comment:
      "Заказываю у них уже третий раз. Стабильное качество, всегда чисто и свежо.",
    locale: "ru",
    createdAt: "2025-12-05",
  },
  {
    id: "r5",
    providerId: "1",
    clientName: "Elena M.",
    rating: 5,
    comment:
      "Au curățat geamurile perfect, nu au lăsat nici o urmă. Mulțumesc!",
    locale: "ro",
    createdAt: "2025-11-18",
  },

  // AquaFresh Clean (id: "2") — 4 reviews
  {
    id: "r6",
    providerId: "2",
    clientName: "Сергей П.",
    rating: 5,
    comment:
      "После ремонта квартира была в ужасном состоянии. AquaFresh привела всё в порядок за один день!",
    locale: "ru",
    createdAt: "2026-03-15",
  },
  {
    id: "r7",
    providerId: "2",
    clientName: "Ion D.",
    rating: 4,
    comment:
      "Curățenia covoarelor a ieșit foarte bine, mirosul proaspăt durează de 2 săptămâni.",
    locale: "ro",
    createdAt: "2026-02-01",
  },
  {
    id: "r8",
    providerId: "2",
    clientName: "Марина С.",
    rating: 5,
    comment:
      "Профессионально, быстро, без лишних вопросов. Цена соответствует качеству.",
    locale: "ru",
    createdAt: "2025-12-20",
  },
  {
    id: "r9",
    providerId: "2",
    clientName: "Cristina L.",
    rating: 4,
    comment:
      "Am folosit serviciul post-renovare și sunt mulțumită. Ar fi putut fi mai atenți la detalii.",
    locale: "ro",
    createdAt: "2025-11-30",
  },

  // ProCurat (id: "3") — 6 reviews
  {
    id: "r10",
    providerId: "3",
    clientName: "Alexandru M.",
    rating: 5,
    comment:
      "Cei mai buni din Chișinău. Prețul e mai mare dar calitatea justifică totul.",
    locale: "ro",
    createdAt: "2026-04-01",
  },
  {
    id: "r11",
    providerId: "3",
    clientName: "Ирина Б.",
    rating: 5,
    comment:
      "Лучшая компания по уборке в городе! Работают быстро, качественно, с гарантией.",
    locale: "ru",
    createdAt: "2026-03-10",
  },
  {
    id: "r12",
    providerId: "3",
    clientName: "Vasile C.",
    rating: 5,
    comment:
      "A treia oară când apelez la ProCurat. Niciodată dezamăgit. Echipă profesionistă.",
    locale: "ro",
    createdAt: "2026-02-22",
  },
  {
    id: "r13",
    providerId: "3",
    clientName: "Дмитрий Л.",
    rating: 4,
    comment:
      "Отличная работа. Небольшая задержка по времени, но результат превосходный.",
    locale: "ru",
    createdAt: "2026-01-15",
  },
  {
    id: "r14",
    providerId: "3",
    clientName: "Natalia P.",
    rating: 5,
    comment:
      "Curățenie post-renovare impecabilă. Au scos praful de construcție din locuri imposibile.",
    locale: "ro",
    createdAt: "2025-12-28",
  },
  {
    id: "r15",
    providerId: "3",
    clientName: "Алёна Г.",
    rating: 5,
    comment: "Профессионалы своего дела. Рекомендую всем без исключения.",
    locale: "ru",
    createdAt: "2025-11-10",
  },

  // SunShine MD (id: "4") — 3 reviews
  {
    id: "r16",
    providerId: "4",
    clientName: "Lidia F.",
    rating: 4,
    comment:
      "Serviciu decent la un preț accesibil. Potrivit pentru curățenie de întreținere lunară.",
    locale: "ro",
    createdAt: "2026-03-05",
  },
  {
    id: "r17",
    providerId: "4",
    clientName: "Виктор Н.",
    rating: 4,
    comment:
      "Нормально сделали уборку. Ничего выдающегося, но и нареканий нет.",
    locale: "ru",
    createdAt: "2026-01-28",
  },
  {
    id: "r18",
    providerId: "4",
    clientName: "Rodica A.",
    rating: 5,
    comment:
      "Prețul este cel mai bun din zonă. Am rămas plăcut surprinsă de calitate.",
    locale: "ro",
    createdAt: "2025-12-12",
  },

  // EcoClean Moldova (id: "5") — 5 reviews
  {
    id: "r19",
    providerId: "5",
    clientName: "Анна Ф.",
    rating: 5,
    comment:
      "Наконец-то нашла компанию с экологичными средствами. У меня аллергия, теперь уборка без проблем!",
    locale: "ru",
    createdAt: "2026-03-20",
  },
  {
    id: "r20",
    providerId: "5",
    clientName: "Marian V.",
    rating: 5,
    comment:
      "Folosesc EcoClean de 1 an. Calitate constantă, produse fără chimicale agresive.",
    locale: "ro",
    createdAt: "2026-02-08",
  },
  {
    id: "r21",
    providerId: "5",
    clientName: "Татьяна М.",
    rating: 4,
    comment:
      "Хорошая компания, средства действительно экологичные. Чуть дольше обычного, но это нормально.",
    locale: "ru",
    createdAt: "2026-01-05",
  },
  {
    id: "r22",
    providerId: "5",
    clientName: "Gabriela S.",
    rating: 5,
    comment:
      "Îmi pasă de mediu și de copilul meu. EcoClean este singura alegere pentru mine.",
    locale: "ro",
    createdAt: "2025-12-18",
  },
  {
    id: "r23",
    providerId: "5",
    clientName: "Светлана О.",
    rating: 5,
    comment:
      "Убирают качественно и безопасно. Диван почистили отлично, как новый.",
    locale: "ru",
    createdAt: "2025-11-25",
  },

  // CasaCurată (id: "6") — 4 reviews
  {
    id: "r24",
    providerId: "6",
    clientName: "Valentina C.",
    rating: 4,
    comment:
      "Echipă mică dar de nădejde. Vin regulat la noi de 6 luni fără probleme.",
    locale: "ro",
    createdAt: "2026-03-12",
  },
  {
    id: "r25",
    providerId: "6",
    clientName: "Михаил Б.",
    rating: 5,
    comment:
      "Отличная небольшая команда. Цена ниже средней, качество выше ожиданий.",
    locale: "ru",
    createdAt: "2026-01-30",
  },
  {
    id: "r26",
    providerId: "6",
    clientName: "Alina N.",
    rating: 4,
    comment:
      "Geamurile au ieșit strălucitoare! Serviciu de întreținere la prețuri corecte.",
    locale: "ro",
    createdAt: "2025-12-08",
  },
  {
    id: "r27",
    providerId: "6",
    clientName: "Людмила Т.",
    rating: 4,
    comment: "Аккуратно и честно. Порекомендую соседям.",
    locale: "ru",
    createdAt: "2025-11-15",
  },

  // Diamond Cleaning (id: "7") — 8 reviews
  {
    id: "r28",
    providerId: "7",
    clientName: "Bogdan R.",
    rating: 5,
    comment:
      "Premium în adevăratul sens al cuvântului. Fiecare detaliu este perfect. Merită fiecare leu.",
    locale: "ro",
    createdAt: "2026-04-05",
  },
  {
    id: "r29",
    providerId: "7",
    clientName: "Екатерина С.",
    rating: 5,
    comment:
      "Лучшая уборка в моей жизни. Работают как швейцарские часы — точно, быстро, безупречно.",
    locale: "ru",
    createdAt: "2026-03-22",
  },
  {
    id: "r30",
    providerId: "7",
    clientName: "Mircea P.",
    rating: 5,
    comment:
      "Am cerut curățenie completă înainte de mutare. Diamond a depășit orice așteptare.",
    locale: "ro",
    createdAt: "2026-02-28",
  },
  {
    id: "r31",
    providerId: "7",
    clientName: "Андрей К.",
    rating: 5,
    comment:
      "Заказываю раз в месяц. Каждый раз на высшем уровне. Никаких нареканий за 2 года.",
    locale: "ru",
    createdAt: "2026-02-05",
  },
  {
    id: "r32",
    providerId: "7",
    clientName: "Irina V.",
    rating: 5,
    comment:
      "Curățenie post-renovare desăvârșită. Au scos ciment de pe gresie fără să o zgârie.",
    locale: "ro",
    createdAt: "2026-01-10",
  },
  {
    id: "r33",
    providerId: "7",
    clientName: "Юлия Д.",
    rating: 4,
    comment:
      "Очень дорого, но очень качественно. Для особых случаев — идеально.",
    locale: "ru",
    createdAt: "2025-12-15",
  },
  {
    id: "r34",
    providerId: "7",
    clientName: "Stefan C.",
    rating: 5,
    comment:
      "Mobilierul a fost curățat impecabil. Recomand serviciul de tapițerie.",
    locale: "ro",
    createdAt: "2025-11-20",
  },
  {
    id: "r35",
    providerId: "7",
    clientName: "Роман П.",
    rating: 5,
    comment:
      "Полный спектр услуг, всё в одном месте. Очень удобно и качественно.",
    locale: "ru",
    createdAt: "2025-10-30",
  },

  // MoldoClean Express (id: "8") — 4 reviews
  {
    id: "r36",
    providerId: "8",
    clientName: "Victor M.",
    rating: 5,
    comment:
      "Rapid și eficient! Au confirmat rezervarea în 1 oră și au venit a doua zi.",
    locale: "ro",
    createdAt: "2026-03-18",
  },
  {
    id: "r37",
    providerId: "8",
    clientName: "Ксения В.",
    rating: 4,
    comment:
      "Хорошо справились с уборкой после ремонта. Быстрый отклик, вежливые сотрудники.",
    locale: "ru",
    createdAt: "2026-02-10",
  },
  {
    id: "r38",
    providerId: "8",
    clientName: "Dorin A.",
    rating: 5,
    comment:
      "La mutare au curățat tot apartamentul temeinic. Recomand pentru servicii de mutare.",
    locale: "ro",
    createdAt: "2026-01-22",
  },
  {
    id: "r39",
    providerId: "8",
    clientName: "Павел Ш.",
    rating: 4,
    comment: "Нормальное соотношение цены и качества. Работают оперативно.",
    locale: "ru",
    createdAt: "2025-12-02",
  },
];

// ---------------------------------------------------------------------------
// In-memory booking counter (resets on page refresh — POC only)
// ---------------------------------------------------------------------------

let bookingCounter = 41;

// ---------------------------------------------------------------------------
// Exported query functions
// ---------------------------------------------------------------------------

export function getProviders(filters?: ProviderFilters): Provider[] {
  let results = [...PROVIDERS];

  if (filters) {
    results = results.filter((p) => {
      if (filters.serviceType && !p.services.includes(filters.serviceType))
        return false;
      if (
        filters.neighborhood &&
        !p.coverageAreas.includes(filters.neighborhood)
      )
        return false;
      if (filters.minRating !== undefined && p.ratingAvg < filters.minRating)
        return false;
      if (filters.maxPrice !== undefined && p.pricePerSqm > filters.maxPrice)
        return false;
      if (filters.minPrice !== undefined && p.pricePerSqm < filters.minPrice)
        return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !p.companyName.toLowerCase().includes(q) &&
          !p.bio.ro.toLowerCase().includes(q) &&
          !p.bio.ru.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "rating":
          results.sort((a, b) => b.ratingAvg - a.ratingAvg);
          break;
        case "price_asc":
          results.sort((a, b) => a.pricePerSqm - b.pricePerSqm);
          break;
        case "price_desc":
          results.sort((a, b) => b.pricePerSqm - a.pricePerSqm);
          break;
        case "reviews":
          results.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    }
  }

  return results;
}

export function getProviderBySlug(slug: string): Provider | null {
  return PROVIDERS.find((p) => p.slug === slug) ?? null;
}

export function getReviewsByProvider(providerId: string): Review[] {
  return REVIEWS.filter((r) => r.providerId === providerId).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getFeaturedProviders(): Provider[] {
  return getProviders({ sortBy: "rating" }).slice(0, 4);
}

export function getNeighborhoods(): {
  value: Neighborhood;
  label: { ro: string; ru: string };
}[] {
  return NEIGHBORHOODS;
}

export function getServiceTypes(): {
  value: import("@/lib/types").ServiceType;
  label: { ro: string; ru: string };
  icon: string;
}[] {
  return SERVICE_TYPES;
}

export function getServiceTypesWithMinPrice(): {
  value: import("@/lib/types").ServiceType;
  label: { ro: string; ru: string };
  icon: string;
  minPricePerSqm: number;
}[] {
  const providers = getProviders();
  return SERVICE_TYPES.map((st) => {
    const prices = providers
      .filter((p) => p.services.includes(st.value))
      .map((p) => p.pricePerSqm);
    return {
      ...st,
      minPricePerSqm: prices.length > 0 ? Math.min(...prices) : 0,
    };
  })
    .filter((st) => st.minPricePerSqm > 0)
    .slice(0, 4);
}

export function getAddOns(): AddOn[] {
  return ADD_ONS;
}

export function submitBookingRequest(
  data: BookingFormData,
): BookingConfirmation {
  const provider = PROVIDERS.find((p) => p.id === data.providerId);
  if (!provider) throw new Error(`Provider not found: ${data.providerId}`);

  const selectedAddOns = ADD_ONS.filter((a) => data.addOns.includes(a.type));
  const discountPercent =
    selectedAddOns.length >= BUNDLE_DISCOUNT_THRESHOLD
      ? BUNDLE_DISCOUNT_PERCENT
      : 0;
  const { total } = calculatePrice(
    data.totalSqm,
    provider.pricePerSqm,
    selectedAddOns,
    discountPercent,
  );

  const timeLabels = {
    morning: "08:00–12:00",
    afternoon: "12:00–17:00",
    evening: "17:00–20:00",
  };

  bookingCounter += 1;

  return {
    id: `booking-${bookingCounter}`,
    referenceNumber: `FC-2026-${String(bookingCounter).padStart(5, "0")}`,
    provider: {
      companyName: provider.companyName,
      phone: provider.phone,
      slug: provider.slug,
    },
    serviceType: data.serviceType,
    scheduledDate: data.preferredDate,
    scheduledTime: timeLabels[data.preferredTime],
    totalPriceMdl: total,
    status: "REQUESTED",
  };
}
