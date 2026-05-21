'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { SiteSettings } from '@/types';

const defaultSettings: SiteSettings = {
  siteName: 'ELITE MART',
  tagline: 'Premium CODM Accounts & Services',
  description: "Your trusted partner for premium Call of Duty Mobile accounts. Official Activision CODM partner.",
  logo: '/logo.svg',
  favicon: '/favicon.ico',
  primaryColor: '#0000EE',
  accentColor: '#DF9B13',
  contactEmail: 'support@elitemart.com',
  contactPhone: '0203548373',
  whatsappNumber: '233203548373',
  socialLinks: {
    instagram: 'https://instagram.com/elitemart',
    twitter: 'https://twitter.com/elitemart',
  },
  heroTitle: 'Premium CODM Accounts',
  heroSubtitle: 'Buy • Trade • Swap • Top Up CP',
  heroDescription: "Ghana's #1 trusted marketplace for Call of Duty Mobile accounts. Official Activision CODM partner with 1000+ successful transactions.",
  heroImage: '',
  aboutText: 'ELITE MART is a verified Activision CODM partner providing premium gaming accounts, trading, swapping, and CP top-up services across Ghana and Africa.',
  partnerBadge: true,
  maintenanceMode: false,
};

interface SiteContextType {
  settings: SiteSettings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType>({} as SiteContextType);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);

  const loadSettings = async () => {
    // Will load from Firebase when configured
    // For now, use defaults
  };

  return (
    <SiteContext.Provider value={{ settings, loading, refreshSettings: loadSettings }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
