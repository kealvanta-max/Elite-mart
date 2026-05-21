'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag, ArrowLeftRight, Repeat, Gem, Users,
  TrendingUp, DollarSign, Clock, CheckCircle, AlertCircle,
  Package, Eye
} from 'lucide-react';

const overviewStats = [
  { label: 'Total Revenue', value: 'GH₵0', change: '+0%', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
  { label: 'Total Orders', value: '0', change: '0', icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Active Products', value: '0', change: '0', icon: Package, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Total Users', value: '0', change: '0', icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

const pendingItems = [
  { type: 'order', label: 'Pending Orders', count: 0, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10', href: '/admin/orders' },
  { type: 'trade', label: 'Trade Requests', count: 0, icon: ArrowLeftRight, color: 'text-purple-400', bg: 'bg-purple-500/10', href: '/admin/trade-requests' },
  { type: 'swap', label: 'Swap Requests', count: 0, icon: Repeat, color: 'text-green-400', bg: 'bg-green-500/10', href: '/admin/swap-requests' },
  { type: 'cp', label: 'CP Orders', count: 0, icon: Gem, color: 'text-amber-400', bg: 'bg-amber-500/10', href: '/admin/cp-packages' },
];

const quickLinks = [
  { label: 'Add New Product', description: 'List a new CODM account', icon: ShoppingBag, href: '/admin/products', color: 'from-blue-500 to-cyan-500' },
  { label: 'Update CP Pricing', description: 'Modify CP packages', icon: Gem, href: '/admin/cp-packages', color: 'from-amber-500 to-orange-500' },
  { label: 'Manage Banners', description: 'Update homepage banners', icon: Eye, href: '/admin/banners', color: 'from-purple-500 to-pink-500' },
  { label: 'Site Settings', description: 'Configure everything', icon: TrendingUp, href: '/admin/settings', color: 'from-green-500 to-emerald-500' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/50 mt-1">Manage your Elite Mart store</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-xs text-green-400 font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/40 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Pending Items */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Pending Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pendingItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass rounded-xl p-5 hover:border-white/10 transition-colors group"
            >
              <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <p className="text-2xl font-bold text-white">{item.count}</p>
              <p className="text-xs text-white/40 mt-1">{item.label}</p>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass rounded-xl p-5 hover:border-white/10 transition-all group hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-primary-bright transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-xs text-white/40">{link.description}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary-bright" />
          Getting Started
        </h2>
        <div className="space-y-3">
          {[
            'Go to Products to add your first CODM account listing',
            'Set up CP packages with your pricing in CP Packages',
            'Customize your homepage with Banners',
            'Configure site settings, contact info, and social links in Settings',
            'Add customer testimonials to build trust',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-white/60">
              <div className="w-6 h-6 rounded-full bg-primary-bright/10 flex items-center justify-center text-xs text-primary-bright font-semibold shrink-0 mt-0.5">
                {i + 1}
              </div>
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
