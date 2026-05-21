'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, ArrowLeftRight, Repeat, Gem,
  Image, Users, Settings, MessageSquare, CreditCard, Menu, X,
  Shield, BarChart3, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & Analytics' },
  { href: '/admin/products', label: 'Products', icon: ShoppingBag, description: 'Manage CODM accounts' },
  { href: '/admin/orders', label: 'Orders', icon: CreditCard, description: 'View & manage orders' },
  { href: '/admin/trade-requests', label: 'Trade Requests', icon: ArrowLeftRight, description: 'Review trade requests' },
  { href: '/admin/swap-requests', label: 'Swap Requests', icon: Repeat, description: 'Review swap requests' },
  { href: '/admin/cp-packages', label: 'CP Packages', icon: Gem, description: 'Manage CP pricing' },
  { href: '/admin/banners', label: 'Banners', icon: Image, description: 'Homepage banners' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare, description: 'Customer reviews' },
  { href: '/admin/users', label: 'Users', icon: Users, description: 'Manage users' },
  { href: '/admin/transactions', label: 'Transactions', icon: CreditCard, description: 'Payment history' },
  { href: '/admin/settings', label: 'Settings', icon: Settings, description: 'Site configuration' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAdmin, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-bright border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Access check (in production, this would redirect)
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-12 text-center max-w-md">
          <Shield className="w-16 h-16 text-red-400/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-white/50 mb-6">You don&apos;t have admin privileges to access this area.</p>
          <Link href="/" className="btn-primary-blue">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E17]">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-[280px] bg-surface-slate border-r border-white/5 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-white/5">
            <Link href="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-lg text-white">
                EM
              </div>
              <div>
                <span className="text-base font-bold text-white block leading-none">ELITE MART</span>
                <span className="text-[10px] text-primary-bright font-medium tracking-widest uppercase">Admin Panel</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group',
                  pathname === link.href
                    ? 'bg-primary-bright/10 text-primary-bright'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                )}
              >
                <link.icon className="w-4 h-4 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block font-medium">{link.label}</span>
                  <span className={cn(
                    'block text-[10px] truncate',
                    pathname === link.href ? 'text-primary-bright/60' : 'text-white/25'
                  )}>
                    {link.description}
                  </span>
                </div>
                {pathname === link.href && (
                  <ChevronRight className="w-3 h-3 shrink-0" />
                )}
              </Link>
            ))}
          </nav>

          {/* Admin Footer */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-white">
                {user?.displayName?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.displayName || 'Admin'}</p>
                <p className="text-[10px] text-primary-bright">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-[280px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass-dark border-b border-white/5">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-white/50"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-white/30">
                <BarChart3 className="w-4 h-4" />
                <span>Admin Panel</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs text-white/40 hover:text-white transition-colors"
              >
                View Site →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
