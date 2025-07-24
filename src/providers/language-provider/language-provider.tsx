import { createContext, useContext, useState, ReactNode } from 'react';


export type RouteKey =
    | 'dashboard'
    | 'clients'
    | 'finances'
    | 'operations'
    | 'marketing'
    | 'reports'
    | 'partners'
    | 'support'
    | 'settings';

export type Language = 'en' | 'pt' | 'es';

export type RouteSchema = {
    [key in RouteKey]: {
        path: string;
        label: Record<Language, string>;
    }
};

export const routes: RouteSchema = {
    dashboard: {
            path: '/dashboard',
            label: {
            en: 'Dashboard',
            pt: 'Painel',
            es: 'Panel',
        },
    },
    clients: {
            path: '/clients',
            label: {
            en: 'Clients',
            pt: 'Clientes',
            es: 'Clientes',
        },
    },
    finances: {
            path: '/finances',
            label: {
            en: 'Finances',
            pt: 'Financeiro',
            es: 'Finanzas',
        },
    },
    operations: {
            path: '/operations',
            label: {
            en: 'Operations',
            pt: 'Operacional',
            es: 'Operaciones',
        },
    },
    marketing: {
            path: '/marketing',
            label: {
            en: 'Marketing',
            pt: 'Marketing',
            es: 'Marketing',
        },
    },
    reports: {
            path: '/reports',
            label: {
            en: 'Reports',
            pt: 'Relatórios',
            es: 'Informes', 
        },
    },
    partners: {
            path: '/partners',
            label: {
            en: 'Partners',
            pt: 'Parcerias',
            es: 'Alianzas',
        },
    },
    support: {
            path: '/support',
            label: {
            en: 'Support',
            pt: 'Suporte',
            es: 'Soporte',
        },
    },
    settings: {
            path: '/settings',
            label: {
            en: 'Settings',
            pt: 'Configurações',
            es: 'Configuraciones',
        },
    }
};

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('pt');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage precisa ser usado dentro de <LanguageProvider>');
    return context;
}
