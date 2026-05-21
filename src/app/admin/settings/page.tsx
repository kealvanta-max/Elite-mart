'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Save, Globe, Palette, Mail, Phone, MessageCircle,
  Image, Shield, Upload, Eye, Bell, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const settingTabs = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'social', label: 'Social Links', icon: MessageCircle },
  { id: 'seo', label: 'SEO & Meta', icon: Eye },
  { id: 'advanced', label: 'Advanced', icon: Shield },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'ELITE MART',
    tagline: 'Premium CODM Accounts & Services',
    description: "Ghana's #1 trusted marketplace for Call of Duty Mobile accounts.",
    heroTitle: 'Premium CODM Accounts',
    heroSubtitle: 'Buy • Trade • Swap • Top Up CP',
    heroDescription: "Ghana's #1 trusted marketplace for Call of Duty Mobile accounts. Official Activision CODM partner.",
    aboutText: 'ELITE MART is a verified Activision CODM partner providing premium gaming accounts, trading, swapping, and CP top-up services.',
    contactEmail: 'support@elitemart.com',
    contactPhone: '0203548373',
    whatsappNumber: '233203548373',
    instagram: 'https://instagram.com/elitemart',
    twitter: 'https://twitter.com/elitemart',
    facebook: '',
    youtube: '',
    tiktok: '',
    primaryColor: '#0000EE',
    accentColor: '#DF9B13',
    partnerBadge: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    // In production: save to Firebase Firestore 'settings/site'
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-sm text-white/50">Configure every aspect of your website</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-green-400 flex items-center gap-1"
            >
              <CheckCircle className="w-4 h-4" /> Saved!
            </motion.span>
          )}
          <button onClick={handleSave} className="btn-primary-blue text-sm !py-2.5">
            <Save className="w-4 h-4 mr-2" /> Save Settings
          </button>
        </div>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-56 shrink-0">
          <div className="glass rounded-xl p-2 lg:sticky lg:top-20 space-y-0.5">
            {settingTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full text-left transition-colors',
                  activeTab === tab.id
                    ? 'bg-primary-bright/10 text-primary-bright'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="glass rounded-xl p-6 sm:p-8">
            {/* General */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
                  <p className="text-sm text-white/40 mb-6">Basic site information that appears across your website.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Site Name</label>
                    <input type="text" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Tagline</label>
                    <input type="text" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Site Description</label>
                    <textarea value={settings.description} onChange={(e) => setSettings({ ...settings, description: e.target.value })} className="input-field !h-20 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Hero Title</label>
                    <input type="text" value={settings.heroTitle} onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Hero Subtitle</label>
                    <input type="text" value={settings.heroSubtitle} onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Hero Description</label>
                    <textarea value={settings.heroDescription} onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })} className="input-field !h-20 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">About Text</label>
                    <textarea value={settings.aboutText} onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })} className="input-field !h-24 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Logo</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-primary-bright/30 transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-white/20 mx-auto mb-2" />
                      <p className="text-sm text-white/40">Click to upload logo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={settings.partnerBadge} onChange={(e) => setSettings({ ...settings, partnerBadge: e.target.checked })} className="w-4 h-4 rounded" />
                    <label className="text-sm text-white/60">Show &quot;Official Activision CODM Partner&quot; badge</label>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
                  <p className="text-sm text-white/40 mb-6">Customize your site&apos;s colors and visual identity.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="w-10 h-10 rounded-lg border-0 cursor-pointer" />
                      <input type="text" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="input-field !w-40" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={settings.accentColor} onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })} className="w-10 h-10 rounded-lg border-0 cursor-pointer" />
                      <input type="text" value={settings.accentColor} onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })} className="input-field !w-40" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Favicon</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center cursor-pointer">
                      <Upload className="w-5 h-5 text-white/20 mx-auto mb-1" />
                      <p className="text-xs text-white/40">Upload favicon (.ico, .png)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                  <p className="text-sm text-white/40 mb-6">How customers can reach you.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2 flex items-center gap-2"><Mail className="w-3 h-3" /> Contact Email</label>
                    <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2 flex items-center gap-2"><Phone className="w-3 h-3" /> Phone Number</label>
                    <input type="tel" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2 flex items-center gap-2"><MessageCircle className="w-3 h-3" /> WhatsApp Number (with country code)</label>
                    <input type="text" value={settings.whatsappNumber} onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })} className="input-field" />
                  </div>
                </div>
              </div>
            )}

            {/* Social Links */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Social Media Links</h3>
                  <p className="text-sm text-white/40 mb-6">Your social media profiles shown in the footer.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Instagram</label>
                    <input type="url" value={settings.instagram} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} className="input-field" placeholder="https://instagram.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Twitter / X</label>
                    <input type="url" value={settings.twitter} onChange={(e) => setSettings({ ...settings, twitter: e.target.value })} className="input-field" placeholder="https://twitter.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Facebook</label>
                    <input type="url" value={settings.facebook} onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} className="input-field" placeholder="https://facebook.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">YouTube</label>
                    <input type="url" value={settings.youtube} onChange={(e) => setSettings({ ...settings, youtube: e.target.value })} className="input-field" placeholder="https://youtube.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">TikTok</label>
                    <input type="url" value={settings.tiktok} onChange={(e) => setSettings({ ...settings, tiktok: e.target.value })} className="input-field" placeholder="https://tiktok.com/..." />
                  </div>
                </div>
              </div>
            )}

            {/* SEO */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">SEO & Meta Tags</h3>
                  <p className="text-sm text-white/40 mb-6">Control how your site appears in search engines.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Meta Title</label>
                    <input type="text" value={settings.siteName + ' — ' + settings.tagline} className="input-field" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Meta Description</label>
                    <textarea value={settings.description} className="input-field !h-20 resize-none" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">OG Image</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center cursor-pointer">
                      <Upload className="w-5 h-5 text-white/20 mx-auto mb-1" />
                      <p className="text-xs text-white/40">Upload social sharing image (1200×630)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Advanced Settings</h3>
                  <p className="text-sm text-white/40 mb-6">Advanced configuration options. Use with caution.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <p className="text-sm font-medium text-white">Maintenance Mode</p>
                      <p className="text-xs text-white/40">Temporarily disable the site for maintenance</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.maintenanceMode ? 'bg-red-500' : 'bg-white/10'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.maintenanceMode ? 'translate-x-6.5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-400">Danger Zone</p>
                        <p className="text-xs text-white/40 mt-1">
                          These actions cannot be undone. Be careful when modifying advanced settings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
