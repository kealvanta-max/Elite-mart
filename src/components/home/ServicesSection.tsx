'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShoppingBag, ArrowLeftRight, Repeat, Gem, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Purchase Account',
    description: 'Browse our curated collection of premium CODM accounts. Fully verified with legendary skins, high ranks, and exclusive content.',
    icon: ShoppingBag,
    href: '/products',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    badge: 'Popular',
  },
  {
    title: 'Trade Account',
    description: 'Got an account you want to trade? Exchange your current CODM account for a better one. Fair and transparent trading.',
    icon: ArrowLeftRight,
    href: '/trade',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    badge: null,
  },
  {
    title: 'Swap Account',
    description: 'Want something different? Swap your current CODM account with another player. Quick and hassle-free account swapping.',
    icon: Repeat,
    href: '/swap',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
    badge: null,
  },
  {
    title: 'Buy CP',
    description: 'Top up your COD Points instantly. Get the best rates for CP in Ghana. Fast delivery, secure transactions, multiple payment options.',
    icon: Gem,
    href: '/buy-cp',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-500/10 to-orange-500/10',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    badge: 'Hot Deal',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={service.href} className="block group">
        <div className={`relative overflow-hidden rounded-2xl border border-white/5 p-8 transition-all duration-500 hover:border-white/10 hover:-translate-y-2 bg-gradient-to-br ${service.bgGradient}`}>
          {/* Background Glow */}
          <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

          {/* Badge */}
          {service.badge && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-accent-gold/20 text-accent-gold text-xs font-semibold rounded-full">
              {service.badge}
            </div>
          )}

          {/* Icon */}
          <div className={`w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <service.icon className={`w-7 h-7 ${service.iconColor}`} />
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed mb-6">
            {service.description}
          </p>

          {/* CTA */}
          <div className={`flex items-center gap-2 text-sm font-medium ${service.iconColor} group-hover:gap-3 transition-all duration-300`}>
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E17] via-surface-slate/50 to-[#0A0E17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-bright/10 text-primary-bright text-xs font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything You Need for
            <br />
            <span className="text-gradient-primary">CODM</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            From purchasing premium accounts to trading and swapping — we&apos;ve got you covered with secure, fast, and reliable services.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
