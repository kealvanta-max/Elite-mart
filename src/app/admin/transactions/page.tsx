'use client';

import React from 'react';
import { CreditCard } from 'lucide-react';

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <p className="text-sm text-white/50">Payment history and transaction records</p>
      </div>
      <div className="glass rounded-xl p-16 text-center">
        <CreditCard className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white/50 mb-2">No Transactions</h3>
        <p className="text-sm text-white/30">Payment transactions will appear here</p>
      </div>
    </div>
  );
}
