'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeftRight, Repeat, Gem, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const stats = [
  { label: 'Total Orders', value: '0', icon: ShoppingBag, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  { label: 'Trades', value: '0', icon: ArrowLeftRight, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  { label: 'Swaps', value: '0', icon: Repeat, color: 'text-green-400', bgColor: 'bg-green-500/10' },
  { label: 'CP Orders', value: '0', icon: Gem, color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
];

const recentActivity = [
  { type: 'system', message: 'Welcome to Elite Mart! Browse our accounts to get started.', time: 'Just now', icon: CheckCircle, color: 'text-green-400' },
  { type: 'info', message: 'Complete your profile for a better experience.', time: 'Now', icon: Clock, color: 'text-amber-400' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Welcome back, {user?.displayName || 'Gamer'} 👋
        </h1>
        <p className="text-white/50">
          Here&apos;s an overview of your account activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-5"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/40 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Browse Accounts', href: '/products', icon: ShoppingBag, color: 'bg-blue-500/10 text-blue-400' },
            { label: 'Trade Account', href: '/trade', icon: ArrowLeftRight, color: 'bg-purple-500/10 text-purple-400' },
            { label: 'Swap Account', href: '/swap', icon: Repeat, color: 'bg-green-500/10 text-green-400' },
            { label: 'Buy CP', href: '/buy-cp', icon: Gem, color: 'bg-amber-500/10 text-amber-400' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center group"
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
              <activity.icon className={`w-5 h-5 ${activity.color} mt-0.5`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/70">{activity.message}</p>
                <p className="text-xs text-white/30 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
