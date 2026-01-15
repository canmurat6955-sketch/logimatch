export const i18n = {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'ru', 'it', 'fr'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

// This is a simplified dictionary for the purpose of the demo. 
// In a real app, these would be separate large JSON files.
// I will populate the Turkish content fully as provided, and use English/others as placeholders or partial translations.

export const getDictionary = async (locale: Locale) => {
    // Simulating async load
    return dict[locale] || dict.tr; // Fallback to TR
};

const dict: Record<Locale, any> = {
    tr: {
        hero: {
            badge: "3 Ay Ücretsiz Dene",
            h1: "Yük bulun. Filonuzu yönetin. Kârlılığı kontrol edin.",
            h2: "Gerçek zamanlı yük eşleştirme, rota bazlı dağıtım ve akıllı filo yönetimi tek platformda.",
            valueProp: "Yük sahipleri için doğru araç, araç sahipleri için maksimum kârlılık.",
            cta: "3 Ay Ücretsiz Dene",
            ctaSub: "Kurulum yok · Kredi kartı gerekmez",
        },
        nav: {
            features: "Özellikler",
            pricing: "Fiyatlar",
            about: "Hakkımızda",
            login: "Giriş Yap",
            getStarted: "Hemen Başla",
        },
        problemSolution: {
            problemTitle: "Bugün lojistikte",
            problemHighlight: "yaşanan sorunlar",
            problems: [
                "Uygun yük–araç eşleşmesi yapılamıyor",
                "Araçlar boş ya da yarı dolu gidiyor",
                "Giderler kontrol edilemiyor",
                "Hangi araç gerçekten kazandırıyor bilinmiyor",
                "Şoför performansı ölçülemiyor"
            ],
            solutionTitle: "Haulink",
            solutionHighlight: "Çözümü",
            solutions: [
                "Yükler güzergâha göre otomatik dağıtılır",
                "Navigasyon sistemi entegredir",
                "Fiyatlar araç tipi & yüke göre hesaplanır",
                "Tüm giderler araç bazlı izlenir",
                "Kârlılık anlık olarak görünür"
            ]
        },
        pricing: {
            title: "Ölçeklenebilir Fiyatlandırma",
            badge: "3 Ay Ücretsiz Deneme – Tüm Paketlerde Geçerli",
            note: "Sonrasında araç bazlı SaaS modeli uygulanır.",
            tiers: {
                starter: {
                    name: "Starter",
                    desc: "\"Yük bul, aracı çalıştır.\"",
                    price: "₺ -- / araç",
                    cta: "Ücretsiz Dene"
                },
                pro: {
                    name: "Pro",
                    desc: "\"Filonun gerçek kârlılığını gör.\"",
                    badge: "EN ÇOK TERCİH EDİLEN",
                    price: "₺ -- / araç",
                    cta: "Ücretsiz Dene"
                },
                enterprise: {
                    name: "Enterprise",
                    desc: "\"Filonu veriyle yönetenler için.\"",
                    price: "Özel Teklif",
                    cta: "Teklif Al"
                }
            },
            features: {
                loadMatching: "Yük görme & teklif alma",
                routeDist: "Güzergâh bazlı yük dağıtımı",
                navApi: "Navigasyon API entegrasyonu",
                fuelTrack: "Yakıt gider takibi",
                trailerCap: "Dorse doluluk oranı",
                tireTrack: "Lastik takibi (marka + km)",
                maintCost: "Bakım & Kaza maliyetleri",
                netProfit: "Araç bazlı net kâr",
                driverPerf: "Şoför performans yönetimi",
                lDocTrack: "L belge takibi",
                apiInteg: "API & ERP entegrasyonu",
                more: "... ve daha fazlası"
            },
            socialProof: "\"3 ay sonunda filonun gerçek maliyetlerini gören kullanıcıların ",
            socialProofHighlight: "%80’i Pro pakete geçiyor."
        },
        founderStory: {
            badge: "Kurucunun Hikayesi",
            title: "\"Bu fikir masada değil,",
            titleHighlight: "yolda doğdu.\"",
            p1: "12 yaşındayken kamyonlara olan ilgim, zamanla bir mesleki tutkuya dönüştü. Eğitim hayatımda otomotiv ve maliye alanlarında ilerledim. Bu sayede lojistiğe sadece araç tarafıyla değil, finansal yapı ve maliyet yönetimi perspektifiyle de bakmaya başladım.",
            p2: "Yıllar boyunca ağır vasıta satış sorumlusu olarak çalıştım. Çekici sahipleri, filo yöneticileri ve lojistik firmalarıyla doğrudan temas ettim.",
            quote: "\"Lojistik sektöründe herkes çok çalışıyor ama çok az kişi gerçekten ne kazandığını biliyor.\"",
            p3: "Piyasada yük bulmaya yarayan sistemler var. Piyasada muhasebe programları var. Ama",
            p3Highlight: "yük + rota + maliyet + kârlılığı",
            p3End: "tek ekranda yöneten bir sistem yok.",
            p4: "İşte bu boşluk, Haulink'in doğuş nedeni oldu. Amacımız sadece yük bulmak değil, lojistik sektörünün finansal işletim sistemi olmak."
        },
        faq: {
            title: "Sıkça Sorulan Sorular",
            items: [
                {
                    q: "Ücretsiz deneme süresi ne kadar?",
                    a: "Tüm paketlerimizde 3 ay boyunca ücretsiz deneme süresi sunuyoruz. Kredi kartı gerekmez."
                },
                {
                    q: "Araç takibi için cihaz gerekli mi?",
                    a: "Hayır, Haulink sürücü mobil uygulaması üzerinden GPS verilerini kullanarak takip sağlar. Ek donanım maliyeti yaratmaz."
                },
                {
                    q: "Sadece tek bir tıra sahibiyim, kullanabilir miyim?",
                    a: "Kesinlikle! Starter paketimiz bireysel araç sahipleri ve şoförler için optimize edilmiştir."
                },
                {
                    q: "Enterprise paketi neleri kapsıyor?",
                    a: "Çoklu filo yönetimi, ERP entegrasyonları, özel raporlama ve 7/24 öncelikli destek hizmetini kapsar."
                }
            ]
        },
        footer: {
            description: "Lojistiğin finansal işletim sistemi.",
            sections: {
                product: "Ürün",
                company: "Şirket",
                legal: "Yasal"
            },
            links: {
                features: "Özellikler",
                pricing: "Fiyatlar",
                about: "Hakkımızda",
                contact: "İletişim",
                privacy: "Gizlilik Politikası",
                terms: "Kullanım Koşulları"
            },
            copyright: "© 2026 Haulink. Tüm hakları saklıdır."
        }
    },
    en: {
        hero: {
            badge: "Try 3 Months Free",
            h1: "Find Loads. Manage Fleet. Control Profitability.",
            h2: "Real-time load matching, route-based distribution and smart fleet management in one platform.",
            valueProp: "The right vehicle for load owners, maximum profitability for vehicle owners.",
            cta: "Try 3 Months Free",
            ctaSub: "No setup · No credit card required",
        },
        nav: {
            features: "Features",
            pricing: "Pricing",
            about: "About",
            login: "Login",
            getStarted: "Get Started",
        },
        problemSolution: {
            problemTitle: "Problems in logistics",
            problemHighlight: "today",
            problems: [
                "Cannot match suitable load-vehicle",
                "Vehicles run empty or half-full",
                "Expenses cannot be controlled",
                "Unknown vehicle profitability",
                "Driver performance not measurable"
            ],
            solutionTitle: "Haulink",
            solutionHighlight: "Solution",
            solutions: [
                "Loads distributed automatically by route",
                "Integrated navigation system",
                "Prices calculated by vehicle type & load",
                "All expenses tracked per vehicle",
                "Profitability visible instantly"
            ]
        },
        pricing: {
            title: "Scalable Pricing",
            badge: "Try 3 Months Free – Valid on All Plans",
            note: "Vehicle-based SaaS model applies afterwards.",
            tiers: {
                starter: {
                    name: "Starter",
                    desc: "\"Find load, run vehicle.\"",
                    price: "$ -- / vehicle",
                    cta: "Try Free"
                },
                pro: {
                    name: "Pro",
                    desc: "\"See true fleet profitability.\"",
                    badge: "MOST POPULAR",
                    price: "$ -- / vehicle",
                    cta: "Try Free"
                },
                enterprise: {
                    name: "Enterprise",
                    desc: "\"For data-driven fleet management.\"",
                    price: "Custom Offer",
                    cta: "Get Offer"
                }
            },
            features: {
                loadMatching: "Load view & bidding",
                routeDist: "Route-based load distribution",
                navApi: "Navigation API integration",
                fuelTrack: "Fuel expense tracking",
                trailerCap: "Trailer occupancy rate",
                tireTrack: "Tire tracking (brand + km)",
                maintCost: "Maintenance & Accident costs",
                netProfit: "Vehicle-based net profit",
                driverPerf: "Driver performance management",
                lDocTrack: "L document tracking",
                apiInteg: "API & ERP integration",
                more: "... and more"
            },
            socialProof: "\"Users who see true fleet costs after 3 months ",
            socialProofHighlight: "80% upgrade to Pro plan."
        },
        founderStory: {
            badge: "Founder Story",
            title: "\"This idea wasn't born at a desk,",
            titleHighlight: "it was born on the road.\"",
            p1: "My interest in trucks at age 12 turned into a professional passion over time. I advanced in automotive and finance during my education. This allowed me to look at logistics not just from the vehicle side, but also from a financial structure and cost management perspective.",
            p2: "I worked as a heavy vehicle sales representative for years. I had direct contact with tractor owners, fleet managers, and logistics companies.",
            quote: "\"Everyone in the logistics sector works hard, but very few know what they actually earn.\"",
            p3: "There are systems to find loads. There are accounting programs. But there is no system that manages",
            p3Highlight: "load + route + cost + profitability",
            p3End: "on a single screen.",
            p4: "This gap was the reason for Haulink's birth. Our goal is not just to find loads, but to be the financial operating system of the logistics sector."
        },
        faq: {
            title: "Frequently Asked Questions",
            items: [
                {
                    q: "How long is the free trial?",
                    a: "We offer a 3-month free trial on all our plans. No credit card required."
                },
                {
                    q: "Is a device required for vehicle tracking?",
                    a: "No, Haulink provides tracking using GPS data via the driver mobile app. It creates no extra hardware cost."
                },
                {
                    q: "I own just one truck, can I use it?",
                    a: "Absolutely! Our Starter plan is optimized for individual vehicle owners and drivers."
                },
                {
                    q: "What does the Enterprise plan cover?",
                    a: "It covers multi-fleet management, ERP integrations, custom reporting, and 24/7 priority support."
                }
            ]
        },
        footer: {
            description: "Financial operating system of logistics.",
            sections: {
                product: "Product",
                company: "Company",
                legal: "Legal"
            },
            links: {
                features: "Features",
                pricing: "Pricing",
                about: "About",
                contact: "Contact",
                privacy: "Privacy Policy",
                terms: "Terms of Use"
            },
            copyright: "© 2026 Haulink. All rights reserved."
        }
    },
    ru: { // Placeholder for RU using EN content where needed or simple trans
        hero: {
            badge: "Попробуйте 3 месяца бесплатно",
            h1: "Находите грузы. Управляйте флотом. Контролируйте прибыль.",
            h2: "Сопоставление грузов в реальном времени, маршрутное распределение и умное управление флотом.",
            valueProp: "Правильный транспорт для грузовладельцев, максимальная прибыль для владельцев транспорта.",
            cta: "Попробовать бесплатно",
            ctaSub: "Без установки · Карта не требуется",
        },
        nav: {
            features: "Функции",
            pricing: "Цены",
            about: "О нас",
            login: "Войти",
            getStarted: "Начать",
        },
        problemSolution: {
            problemTitle: "Logistics Problems",
            problemHighlight: "Today",
            problems: ["Cannot match suitable load", "Vehicles run empty", "Uncontrolled expenses", "Unknown profitability", "Unmeasured performance"],
            solutionTitle: "Haulink",
            solutionHighlight: "Solution",
            solutions: ["Automated load distribution", "Integrated navigation", "Dynamic pricing", "Expense tracking", "Instant profitability"]
        },
        pricing: {
            title: "Scalable Pricing",
            badge: "Try 3 Months Free",
            note: "SaaS model applies afterwards.",
            tiers: {
                starter: { name: "Starter", desc: "Find load, run vehicle.", price: "$ --", cta: "Try Free" },
                pro: { name: "Pro", desc: "See true profitability.", badge: "POPULAR", price: "$ --", cta: "Try Free" },
                enterprise: { name: "Enterprise", desc: "For data-driven fleets.", price: "Custom", cta: "Get Offer" }
            },
            features: {
                loadMatching: "Load matching",
                routeDist: "Route distribution",
                navApi: "Navi integration",
                fuelTrack: "Fuel tracking",
                trailerCap: "Trailer capacity",
                tireTrack: "Tire tracking",
                maintCost: "Maintenance costs",
                netProfit: "Net profit",
                driverPerf: "Driver performance",
                lDocTrack: "L Document",
                apiInteg: "API Integration",
                more: "... and more"
            },
            socialProof: "Users who see true costs ",
            socialProofHighlight: "upgrade to Pro."
        },
        founderStory: {
            badge: "Founder Story",
            title: "Idea born on the road",
            titleHighlight: "",
            p1: "My interest in trucks turned into a passion.",
            p2: "I worked with fleet managers for years.",
            quote: "Few know what they actually earn.",
            p3: "No system manages load + cost + profit together.",
            p3Highlight: "",
            p3End: "",
            p4: "This is why Haulink exists."
        },
        faq: {
            title: "FAQ",
            items: [
                { q: "Free trial?", a: "3 months free." },
                { q: "Device needed?", a: "No, app uses GPS." },
                { q: "One truck?", a: "Yes, use Starter." },
                { q: "Enterprise?", a: "For large fleets." }
            ]
        },
        footer: {
            description: "Logistics OS.",
            sections: { product: "Product", company: "Company", legal: "Legal" },
            links: { features: "Features", pricing: "Pricing", about: "About", contact: "Contact", privacy: "Privacy", terms: "Terms" },
            copyright: "© 2026 Haulink."
        }
    },
    it: { // Placeholder IT
        hero: {
            badge: "Prova 3 Mesi Gratis",
            h1: "Trova Carichi. Gestisci la Flotta. Controlla la Redditività.",
            h2: "Abbinamento carichi in tempo reale, distribuzione basata su rotte e gestione intelligente della flotta.",
            valueProp: "Il veicolo giusto per chi ha il carico, massima redditività per i proprietari dei veicoli.",
            cta: "Prova Gratis",
            ctaSub: "Nessuna installazione · Nessuna carta",
        },
        nav: {
            features: "Funzionalità",
            pricing: "Prezzi",
            about: "Chi Siamo",
            login: "Accedi",
            getStarted: "Inizia",
        },
        problemSolution: {
            problemTitle: "Problemi logistici",
            problemHighlight: "Oggi",
            problems: ["Nessuna corrispondenza", "Veicoli vuoti", "Spese incontrollate", "Redditività ignota", "Performance non misurabile"],
            solutionTitle: "Haulink",
            solutionHighlight: "Soluzione",
            solutions: ["Distribuzione automatica", "Navigazione integrata", "Prezzi dinamici", "Tracciamento spese", "Redditività istantanea"]
        },
        pricing: {
            title: "Prezzi Scalabili",
            badge: "3 Mesi Gratis",
            note: "Modello SaaS.",
            tiers: {
                starter: { name: "Starter", desc: "Trova carico.", price: "€ --", cta: "Prova" },
                pro: { name: "Pro", desc: "Vedi redditività.", badge: "POPOLARE", price: "€ --", cta: "Prova" },
                enterprise: { name: "Enterprise", desc: "Per flotte.", price: "Custom", cta: "Offerta" }
            },
            features: {
                loadMatching: "Carichi",
                routeDist: "Rotte",
                navApi: "Navigazione",
                fuelTrack: "Carburante",
                trailerCap: "Capacità",
                tireTrack: "Gomme",
                maintCost: "Manutenzione",
                netProfit: "Profitto netto",
                driverPerf: "Performance autista",
                lDocTrack: "Doc L",
                apiInteg: "API",
                more: "... e altro"
            },
            socialProof: "Chi vede i costi reali ",
            socialProofHighlight: "passa a Pro."
        },
        founderStory: {
            badge: "Storia",
            title: "Idea nata sulla strada",
            titleHighlight: "",
            p1: "La mia passione per i camion.",
            p2: "Ho lavorato con i gestori di flotte.",
            quote: "Pochi sanno quanto guadagnano.",
            p3: "Nessun sistema gestisce tutto insieme.",
            p3Highlight: "",
            p3End: "",
            p4: "Ecco perché Haulink."
        },
        faq: {
            title: "FAQ",
            items: [
                { q: "Prova gratis?", a: "3 mesi." },
                { q: "Dispositivo?", a: "No, GPS app." },
                { q: "Un camion?", a: "Si, Starter." },
                { q: "Enterprise?", a: "Grandi flotte." }
            ]
        },
        footer: {
            description: "OS Logistico.",
            sections: { product: "Prodotto", company: "Azienda", legal: "Legale" },
            links: { features: "Funzioni", pricing: "Prezzi", about: "Chi Siamo", contact: "Contatti", privacy: "Privacy", terms: "Termini" },
            copyright: "© 2026 Haulink."
        }
    },
    fr: { // Placeholder FR
        hero: {
            badge: "Essai Gratuit de 3 Mois",
            h1: "Trouvez du Fret. Gérez votre Flotte. Contrôlez la Rentabilité.",
            h2: "Mise en relation fret en temps réel, distribution par itinéraire et gestion intelligente de flotte.",
            valueProp: "Le bon véhicule pour les expéditeurs, rentabilité maximale pour les transporteurs.",
            cta: "Essai Gratuit",
            ctaSub: "Pas d'installation · Pas de carte bancaire",
        },
        nav: {
            features: "Fonctionnalités",
            pricing: "Tarifs",
            about: "À Propos",
            login: "Connexion",
            getStarted: "Commencer",
        },
        problemSolution: {
            problemTitle: "Problèmes logistiques",
            problemHighlight: "Aujourd'hui",
            problems: ["Pas de correspondance", "Véhicules vides", "Dépenses incontrôlées", "Rentabilité inconnue", "Perf. non mesurable"],
            solutionTitle: "Haulink",
            solutionHighlight: "Solution",
            solutions: ["Distribution auto", "Navigation", "Prix dynamiques", "Suivi dépenses", "Rentabilité instantanée"]
        },
        pricing: {
            title: "Tarifs Évolutifs",
            badge: "3 Mois Gratuits",
            note: "Modèle SaaS.",
            tiers: {
                starter: { name: "Starter", desc: "Trouver fret.", price: "€ --", cta: "Essai" },
                pro: { name: "Pro", desc: "Voir rentabilité.", badge: "POPULAIRE", price: "€ --", cta: "Essai" },
                enterprise: { name: "Enterprise", desc: "Pour flottes.", price: "Sur Devis", cta: "Offre" }
            },
            features: {
                loadMatching: "Fret",
                routeDist: "Itinéraires",
                navApi: "Navigation",
                fuelTrack: "Carburant",
                trailerCap: "Capacité",
                tireTrack: "Pneus",
                maintCost: "Maintenance",
                netProfit: "Profit net",
                driverPerf: "Perf. chauffeur",
                lDocTrack: "Doc L",
                apiInteg: "API",
                more: "... et plus"
            },
            socialProof: "Ceux qui voient les coûts ",
            socialProofHighlight: "passent à Pro."
        },
        founderStory: {
            badge: "Histoire",
            title: "Idée née sur la route",
            titleHighlight: "",
            p1: "Ma passion pour les camions.",
            p2: "Travaillé avec des gestionnaires.",
            quote: "Peu savent ce qu'ils gagnent.",
            p3: "Aucun système ne gère tout.",
            p3Highlight: "",
            p3End: "",
            p4: "C'est pourquoi Haulink."
        },
        faq: {
            title: "FAQ",
            items: [
                { q: "Essai gratuit?", a: "3 mois." },
                { q: "Appareil?", a: "Non, GPS app." },
                { q: "Un camion?", a: "Oui, Starter." },
                { q: "Enterprise?", a: "Grandes flottes." }
            ]
        },
        footer: {
            description: "OS Logistique.",
            sections: { product: "Produit", company: "Société", legal: "Légal" },
            links: { features: "Fonctions", pricing: "Tarifs", about: "À Propos", contact: "Contact", privacy: "Confidentialité", terms: "Conditions" },
            copyright: "© 2026 Haulink."
        }
    }
};
