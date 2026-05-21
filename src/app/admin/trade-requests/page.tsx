'use client';

import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function AdminTradeRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Trade Requests</h1>
        <p className="text-sm text-white/50">Review and manage account trade requests</p>
      </div>
      <div className="glass rounded-xl p-16 text-center">
        <ArrowLeftRight className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white/50 mb-2">No Trade Requests</h3>
        <p className="text-sm text-white/30">Trade requests from customers will appear here</p>
      </div>
    </div>
  );
}
