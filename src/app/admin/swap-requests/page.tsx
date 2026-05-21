'use client';

import React from 'react';
import { Repeat } from 'lucide-react';

export default function AdminSwapRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swap Requests</h1>
        <p className="text-sm text-white/50">Review and manage account swap requests</p>
      </div>
      <div className="glass rounded-xl p-16 text-center">
        <Repeat className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white/50 mb-2">No Swap Requests</h3>
        <p className="text-sm text-white/30">Swap requests from customers will appear here</p>
      </div>
    </div>
  );
}
