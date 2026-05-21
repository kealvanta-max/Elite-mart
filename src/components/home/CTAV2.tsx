'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageCircle, Shield, Zap, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-32 lg:py-44 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.06]"
        >
          {/* BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] via-[#0044CC] to-[#6B00FF]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFB800]/10 rounded-full blur-[120px]" />

          {/* Morphing shape */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#00D4FF]/20 to-transparent rounded-full animate-morph" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-[#FFB800]/10 to-transparent rounded-full animate-morph" style={{ animationDelay: '-3s' }} />

          {/* Content */}
          <div className="relative z-10 px-8 sm:px-16 lg:px-24 py-16 sm:py-24 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2 }} className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/90">
                <Zap className="w-4 h-4 text-[#FFB800]" /> Limited Offer
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-[1.1]">
              Ready to Level Up<br />Your Game?
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
              Join 1,000+ gamers who trust Elite Mart. Get your premium account today or chat with us on WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/products" className="group relative px-8 py-4 rounded-full bg-white text-[#0044CC] font-semibold text-sm tracking-wide uppercase overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-transform">
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Browse Accounts
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a href={getWhatsAppLink("Hi Elite Mart! I'm interested.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#00FF88] text-[#050510] font-semibold text-sm tracking-wide uppercase hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-[#00FF88]/20">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Secure</span>
              <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Instant</span>
              <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> 24/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
