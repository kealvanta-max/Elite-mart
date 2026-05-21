'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Shield, Eye } from 'lucide-react';

const placeholderProducts = [
  {
    id: '1',
    name: 'Legendary Commander Account',
    rank: 'Legendary',
    level: 150,
    skins: 85,
    legendarySkins: 12,
    price: 2500,
    originalPrice: 3200,
    region: 'Global',
    status: 'available',
    image: null,
    featured: true,
  },
  {
    id: '2',
    name: 'Elite Pro Account',
    rank: 'Master',
    level: 120,
    skins: 60,
    legendarySkins: 6,
    price: 1200,
    originalPrice: 1500,
    region: 'NA',
    status: 'available',
    image: null,
    featured: true,
  },
  {
    id: '3',
    name: 'Premium Starter Pack',
    rank: 'Elite',
    level: 80,
    skins: 35,
    legendarySkins: 3,
    price: 600,
    originalPrice: null,
    region: 'EU',
    status: 'available',
    image: null,
    featured: true,
  },
  {
    id: '4',
    name: 'Diamond Ranked Account',
    rank: 'Grand Master',
    level: 100,
    skins: 45,
    legendarySkins: 5,
    price: 1800,
    originalPrice: 2200,
    region: 'ASIA',
    status: 'available',
    image: null,
    featured: true,
  },
  {
    id: '5',
    name: 'Battle-Ready Veteran',
    rank: 'Veteran',
    level: 90,
    skins: 40,
    legendarySkins: 4,
    price: 900,
    originalPrice: 1100,
    region: 'Global',
    status: 'available',
    image: null,
    featured: true,
  },
  {
    id: '6',
    name: 'Ultimate Collection',
    rank: 'Legendary',
    level: 200,
    skins: 120,
    legendarySkins: 20,
    price: 5000,
    originalPrice: 6500,
    region: 'Global',
    status: 'available',
    image: null,
    featured: true,
  },
];

function ProductCard({ product, index }: { product: typeof placeholderProducts[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <div className="relative overflow-hidden rounded-xl border border-white/5 bg-surface-slate hover:border-primary-bright/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
          {/* Product Image Placeholder */}
          <div className="relative aspect-[16/10] bg-gradient-to-br from-surface-navy to-surface-slate-alt overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-12 h-12 text-primary-bright/30 mx-auto mb-2" />
                <span className="text-xs text-white/30 font-medium">CODM Account</span>
              </div>
            </div>

            {/* Rank Badge */}
            <div className="absolute top-3 left-3">
              <span className="badge-primary text-[11px]">
                {product.rank}
              </span>
            </div>

            {/* Discount Badge */}
            {discount && (
              <div className="absolute top-3 right-3">
                <span className="badge-gold text-[11px]">
                  -{discount}%
                </span>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                <Eye className="w-5 h-5" />
                View Details
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-white mb-2 truncate group-hover:text-primary-bright transition-colors">
              {product.name}
            </h3>

            {/* Stats Row */}
            <div className="flex items-center gap-3 mb-3 text-xs text-white/40">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-accent-gold" />
                Lv.{product.level}
              </span>
              <span>🎯 {product.skins} skins</span>
              <span>🌍 {product.region}</span>
            </div>

            {/* Price Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">
                  GH₵{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-white/30 line-through">
                    GH₵{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-primary-bright text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-[#0A0E17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-semibold mb-4">
              Featured Accounts
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Premium <span className="text-gradient-primary">Accounts</span>
            </h2>
            <p className="text-white/50 mt-2 max-w-md">
              Hand-picked premium CODM accounts with the best stats and rarest skins.
            </p>
          </div>
          <Link
            href="/products"
            className="btn-ghost text-sm !px-6"
          >
            View All Accounts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
