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
        // ... I will add more sections as I build them
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
    },
    ru: {
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
    },
    it: {
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
    },
    fr: {
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
    }
};
