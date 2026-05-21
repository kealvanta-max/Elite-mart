'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Eye, Shield, Flame } from 'lucide-react';
import { useTilt } from '@/hooks/useAnimations';

const products = [
  { id:'1', name:'Legendary Commander', rank:'Legendary', level:150, skins:85, legendarySkins:12, price:2500, originalPrice:3200, region:'Global', hot:true },
  { id:'2', name:'Elite Pro Sniper', rank:'Master', level:120, skins:60, legendarySkins:6, price:1200, originalPrice:1500, region:'NA', hot:false },
  { id:'3', name:'Starter Pack', rank:'Elite', level:80, skins:35, legendarySkins:3, price:600, originalPrice:null, region:'EU', hot:false },
  { id:'4', name:'Diamond Ranked', rank:'Grand Master', level:100, skins:45, legendarySkins:5, price:1800, originalPrice:2200, region:'ASIA', hot:true },
  { id:'5', name:'Veteran Warrior', rank:'Veteran', level:90, skins:40, legendarySkins:4, price:900, originalPrice:1100, region:'Global', hot:false },
  { id:'6', name:'Ultimate Collection', rank:'Legendary', level:200, skins:120, legendarySkins:20, price:5000, originalPrice:6500, region:'Global', hot:true },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const tiltRef = useTilt(6);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;

  const rankColors: Record<string, string> = {
    'Legendary': 'from-[#FFB800] to-[#FF6B00]',
    'Master': 'from-[#6B00FF] to-[#FF3366]',
    'Grand Master': 'from-[#0066FF] to-[#00D4FF]',
    'Elite': 'from-[#00FF88] to-[#0066FF]',
    'Veteran': 'from-[#FF3366] to-[#FFB800]',
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <div ref={tiltRef} className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a1a] hover:border-[#0066FF]/20 transition-all duration-700 hover:-translate-y-2">
          {/* Image Area */}
          <div className="relative aspect-[16/10] bg-gradient-to-br from-[#111128] to-[#0a0a1a] overflow-hidden">
            {/* Rank Gradient BG */}
            <div className={`absolute inset-0 bg-gradient-to-br ${rankColors[product.rank] || 'from-[#0066FF] to-[#00D4FF]'} opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700`} />
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-16 h-16 text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500" />
            </div>

            {/* Hot Badge */}
            {product.hot && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF3366]/10 border border-[#FF3366]/20">
                <Flame className="w-3 h-3 text-[#FF3366]" />
                <span className="text-[10px] font-bold text-[#FF3366] uppercase">Hot</span>
              </div>
            )}

            {/* Rank Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${rankColors[product.rank] || ''} text-white shadow-lg`}>
                {product.rank}
              </span>
            </div>

            {/* Discount */}
            {discount && (
              <div className="absolute bottom-4 right-4">
                <span className="px-2.5 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-[10px] font-bold border border-[#FFB800]/20">
                  -{discount}%
                </span>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-medium"
              >
                <Eye className="w-4 h-4" /> View Details
              </motion.div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5">
            <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#00D4FF] transition-colors duration-300 truncate">
              {product.name}
            </h3>

            {/* Stats */}
            <div className="flex items-center gap-3 mb-4 text-[11px] text-white/25">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-[#FFB800]/60" /> Lv.{product.level}
              </span>
              <span>🎯 {product.skins} skins</span>
              <span>🌍 {product.region}</span>
            </div>

            {/* Price */}
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xl font-bold text-white">GH₵{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xs text-white/20 line-through ml-2">GH₵{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-[#0066FF] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FFB800]/5 text-[#FFB800] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#FFB800]/10 mb-6">
              ⭐ Featured
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1]">
              <span className="text-white">Premium</span>{' '}
              <span className="text-gradient-gold">Accounts</span>
            </h2>
            <p className="text-white/30 mt-4 max-w-md text-sm leading-relaxed">
              Hand-picked premium CODM accounts with the rarest skins and highest stats.
            </p>
          </div>
          <Link href="/products" className="btn-outline text-xs !px-6 !py-3 group">
            <span className="flex items-center gap-2">View All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
