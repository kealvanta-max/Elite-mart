'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Shield, MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getWhatsAppLink } from '@/lib/utils';

const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL;
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Accounts' },
  { href: '#', label: 'Services', children: [
    { href: '/products', label: 'Purchase', icon: '🛒' },
    { href: '/trade', label: 'Trade', icon: '🔄' },
    { href: '/swap', label: 'Swap', icon: '🔁' },
    { href: '/buy-cp', label: 'Buy CP', icon: '💎' },
  ]},
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [userMenu, setUserMenu] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {LOGO_URL ? (
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#0066FF]/30 transition-colors">
                <Image src={LOGO_URL} alt="ELITE MART" fill className="object-contain p-0.5" sizes="40px" priority />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#6B00FF] flex items-center justify-center font-display font-bold text-white group-hover:shadow-lg group-hover:shadow-[#0066FF]/20 transition-shadow">EM</div>
            )}
            <div className="hidden sm:block">
              <span className="block text-base font-display font-bold text-white leading-none tracking-tight">ELITE MART</span>
              <span className="block text-[9px] text-[#00D4FF] font-medium tracking-[0.25em] uppercase mt-0.5">CODM Partner</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative" onMouseEnter={() => link.children && setDropdown(link.label)} onMouseLeave={() => setDropdown(null)}>
                <Link href={link.href} className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-white/50 hover:text-white rounded-lg hover:bg-white/[0.03] transition-all duration-300">
                  {link.label}
                  {link.children && <ChevronDown className="w-3 h-3 opacity-40" />}
                </Link>
                <AnimatePresence>
                  {link.children && dropdown === link.label && (
                    <motion.div initial={{ opacity:0, y:8, scale:0.96 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:8, scale:0.96 }} transition={{ duration:0.2 }} className="absolute top-full left-0 mt-2 w-52 glass rounded-2xl overflow-hidden shadow-2xl shadow-black/30 py-2">
                      {link.children.map((c) => (
                        <Link key={c.label} href={c.href} className="flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors">
                          <span className="text-base">{c.icon}</span>{c.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <a href={getWhatsAppLink("Hi Elite Mart!")} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-[#00FF88]/5 text-[#00FF88] hover:bg-[#00FF88]/10 transition-colors text-xs font-semibold border border-[#00FF88]/10">
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            {user ? (
              <div className="relative" onMouseLeave={() => setUserMenu(false)}>
                <button onClick={() => setUserMenu(!userMenu)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0066FF] to-[#6B00FF] flex items-center justify-center text-[10px] font-bold text-white">{user.displayName?.charAt(0) || 'U'}</div>
                  <ChevronDown className="w-3 h-3 text-white/30" />
                </button>
                <AnimatePresence>
                  {userMenu && (
                    <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }} className="absolute right-0 top-full mt-2 w-52 glass rounded-2xl overflow-hidden shadow-2xl py-2">
                      <div className="px-4 py-2.5 border-b border-white/[0.05]">
                        <p className="text-xs font-medium text-white truncate">{user.displayName}</p>
                        <p className="text-[10px] text-white/30 truncate">{user.email}</p>
                      </div>
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-xs text-white/50 hover:text-white hover:bg-white/[0.03]"><LayoutDashboard className="w-3.5 h-3.5" /> Dashboard</Link>
                      {isAdmin && <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#00D4FF] hover:bg-white/[0.03]"><Shield className="w-3.5 h-3.5" /> Admin</Link>}
                      <button onClick={signOut} className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#FF3366] hover:bg-white/[0.03] w-full text-left"><LogOut className="w-3.5 h-3.5" /> Sign Out</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/auth/login" className="px-4 py-2 text-xs font-medium text-white/40 hover:text-white transition-colors">Sign In</Link>
                <Link href="/auth/register" className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white text-xs font-semibold hover:shadow-lg hover:shadow-[#0066FF]/20 transition-all">Get Started</Link>
              </div>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-white/[0.03] text-white/50">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }} transition={{ type:'spring', damping:25 }} className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#0a0a1a] border-l border-white/[0.04]">
              <div className="pt-24 px-6 pb-6 h-full flex flex-col">
                <nav className="flex-1 space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      <Link href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/[0.03] transition-colors">{link.label}</Link>
                      {link.children && (
                        <div className="ml-4 space-y-0.5">
                          {link.children.map((c) => (
                            <Link key={c.label} href={c.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-white/40 hover:text-white rounded-lg hover:bg-white/[0.02] transition-colors">
                              <span>{c.icon}</span>{c.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="border-t border-white/[0.05] pt-4 space-y-2">
                  {!user ? (
                    <>
                      <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3 text-sm text-white/50 border border-white/[0.06] rounded-xl">Sign In</Link>
                      <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3 text-sm bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white rounded-xl font-semibold">Get Started</Link>
                    </>
                  ) : (
                    <button onClick={() => { signOut(); setMobileOpen(false); }} className="block w-full text-center py-3 text-sm text-[#FF3366] border border-[#FF3366]/20 rounded-xl">Sign Out</button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
