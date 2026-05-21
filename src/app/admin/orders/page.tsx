'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle, XCircle, Search, Eye } from 'lucide-react';

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-sm text-white/50">View and manage customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {['all', 'pending', 'paid', 'delivered', 'cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === f ? 'bg-primary-bright/10 text-primary-bright' : 'bg-white/5 text-white/50 hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="glass rounded-xl p-16 text-center">
        <ShoppingBag className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white/50 mb-2">No Orders Yet</h3>
        <p className="text-sm text-white/30">Orders will appear here when customers make purchases</p>
      </div>
    </div>
  );
}
