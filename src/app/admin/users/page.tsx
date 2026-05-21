'use client';

import React from 'react';
import { Users } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-sm text-white/50">View and manage registered users</p>
      </div>
      <div className="glass rounded-xl p-16 text-center">
        <Users className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white/50 mb-2">No Users Yet</h3>
        <p className="text-sm text-white/30">Registered users will appear here</p>
      </div>
    </div>
  );
}
