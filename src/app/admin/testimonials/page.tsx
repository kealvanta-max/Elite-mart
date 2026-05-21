'use client';

import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-sm text-white/50">Manage customer reviews and testimonials</p>
        </div>
        <button className="btn-primary-blue !py-2.5 text-sm">
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
        </button>
      </div>
      <div className="glass rounded-xl p-16 text-center">
        <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white/50 mb-2">No Testimonials</h3>
        <p className="text-sm text-white/30 mb-6">Add customer testimonials to build trust</p>
        <button className="btn-primary-blue text-sm">
          <Plus className="w-4 h-4 mr-2" /> Add First Testimonial
        </button>
      </div>
    </div>
  );
}
