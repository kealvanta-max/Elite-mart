'use client';

import React from 'react';
import { Gem, Plus } from 'lucide-react';

export default function AdminCPPackagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">CP Packages</h1>
          <p className="text-sm text-white/50">Manage COD Point packages and pricing</p>
        </div>
        <button className="btn-primary-blue !py-2.5 text-sm">
          <Plus className="w-4 h-4 mr-2" /> Add Package
        </button>
      </div>
      <div className="glass rounded-xl p-16 text-center">
        <Gem className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white/50 mb-2">No CP Packages</h3>
        <p className="text-sm text-white/30 mb-6">Add CP point packages with pricing for customers to purchase</p>
        <button className="btn-primary-blue text-sm">
          <Plus className="w-4 h-4 mr-2" /> Add First Package
        </button>
      </div>
    </div>
  );
}
