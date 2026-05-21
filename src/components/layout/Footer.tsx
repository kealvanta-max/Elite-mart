'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Award, MessageCircle, Mail, Phone, Instagram, Twitter, ChevronUp } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL;

const links = {
  Services: [
    { label:'Purchase Account', href:'/products' },
    { label:'Trade Account', href:'/trade' },
    { label:'Swap Account', href:'/swap' },
    { label:'Buy CP', href:'/buy-cp' },
  ],
  Company: [
    { label:'About Us', href:'/about' },
    { label:'Contact', href:'/contact' },
    { label:'FAQ', href:'/faq' },
    { label:'Terms', href:'/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#050510] border-t border-white/[0.04]">
      {/* Partner Bar */}
      <div className="bg-gradient-to-r from-[#0066FF] via-[#6B00FF] to-[#0066FF] bg-[length:200%_100%] animate-gradient py-3">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 flex items-center justify-center gap-3">
          <Shield className="w-4 h-4 text-white" />
          <p className="text-xs font-semibold text-white tracking-wider uppercase">Official Activision CODM Partner — Trusted by 1000+ Gamers</p>
          <Award className="w-4 h-4 text-[#FFB800]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              {LOGO_URL ? (
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10"><Image src={LOGO_URL} alt="ELITE MART" fill className="object-contain p-0.5" sizes="40px" /></div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#6B00FF] flex items-center justify-center font-display font-bold text-white">EM</div>
              )}
              <div><span className="block text-base font-display font-bold text-white leading-none">ELITE MART</span><span className="block text-[9px] text-[#00D4FF] tracking-[0.25em] uppercase mt-0.5">CODM Partner</span></div>
            </Link>
            <p className="text-sm text-white/25 leading-relaxed mb-6 max-w-sm">Ghana&apos;s #1 trusted marketplace for premium Call of Duty Mobile accounts. Buy, trade, swap and top up CP.</p>
            <div className="space-y-2">
              <a href={getWhatsAppLink('Hi Elite Mart!')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#00FF88] hover:text-[#00FF88]/80 transition-colors"><MessageCircle className="w-4 h-4" />+233 20 354 8373</a>
              <a href="tel:+233203548373" className="flex items-center gap-2 text-sm text-white/25 hover:text-white/50 transition-colors"><Phone className="w-4 h-4" />020 354 8373</a>
              <a href="mailto:support@elitemart.com" className="flex items-center gap-2 text-sm text-white/25 hover:text-white/50 transition-colors"><Mail className="w-4 h-4" />support@elitemart.com</a>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">{title}</h4>
              <ul className="space-y-2.5">{items.map(l => <li key={l.label}><Link href={l.href} className="text-sm text-white/25 hover:text-[#00D4FF] transition-colors">{l.label}</Link></li>)}</ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/15">© {new Date().getFullYear()} ELITE MART. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/15 hover:text-[#00D4FF] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="text-white/15 hover:text-[#00D4FF] transition-colors"><Twitter className="w-4 h-4" /></a>
            <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} className="p-2 rounded-lg bg-white/[0.03] text-white/15 hover:text-white/40 transition-colors"><ChevronUp className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </footer>
  );
}
