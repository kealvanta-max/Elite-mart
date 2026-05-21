'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag, ArrowLeftRight, Repeat, Gem, ArrowRight, Sparkles } from 'lucide-react';
import { useTilt, staggerContainer, staggerItem } from '@/hooks/useAnimations';

const services = [
  {
    title: 'Purchase',
    subtitle: 'Premium Accounts',
    description: 'Handpicked CODM accounts with verified stats, legendary skins, and exclusive content. Instant delivery, full access guaranteed.',
    icon: ShoppingBag,
    href: '/products',
    gradient: 'from-[#0066FF] to-[#00D4FF]',
    glow: '#0066FF',
    badge: 'Most Popular',
    number: '01',
  },
  {
    title: 'Trade',
    subtitle: 'Exchange Accounts',
    description: 'Upgrade your gaming experience. Trade your current CODM account for a better one with our fair and transparent process.',
    icon: ArrowLeftRight,
    href: '/trade',
    gradient: 'from-[#6B00FF] to-[#FF3366]',
    glow: '#6B00FF',
    badge: null,
    number: '02',
  },
  {
    title: 'Swap',
    subtitle: 'Switch Accounts',
    description: 'Want something different? Swap your account with another player seamlessly. Quick, secure, and hassle-free process.',
    icon: Repeat,
    href: '/swap',
    gradient: 'from-[#00FF88] to-[#0066FF]',
    glow: '#00FF88',
    badge: null,
    number: '03',
  },
  {
    title: 'Buy CP',
    subtitle: 'Top Up Points',
    description: 'Get the best CP rates in Ghana. Instant delivery, multiple payment options including mobile money. Fast and secure.',
    icon: Gem,
    href: '/buy-cp',
    gradient: 'from-[#FFB800] to-[#FF6B00]',
    glow: '#FFB800',
    badge: '🔥 Hot Deal',
    number: '04',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const tiltRef = useTilt(8);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={service.href} className="block group">
        <div
          ref={tiltRef}
          className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0a0a1a] p-8 sm:p-10 h-full transition-all duration-700 hover:border-white/[0.12]"
        >
          {/* Glow */}
          <div
            className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-[100px] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700"
            style={{ background: service.glow }}
          />

          {/* Scan Line */}
          <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{ animation: 'scanline 4s linear infinite' }} />
          </div>

          {/* Badge */}
          {service.badge && (
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20">
                {service.badge}
              </span>
            </div>
          )}

          {/* Number */}
          <span className="absolute top-6 left-6 text-6xl font-display font-bold text-white/[0.02] leading-none select-none">
            {service.number}
          </span>

          {/* Icon */}
          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
            <service.icon className="w-7 h-7 text-white" />
          </div>

          {/* Content */}
          <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-2">{service.subtitle}</p>
          <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-gradient-blue transition-all duration-300">
            {service.title}
          </h3>
          <p className="text-sm text-white/30 leading-relaxed mb-8">
            {service.description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-4 transition-all duration-500">
            <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
              Get Started
            </span>
            <ArrowRight className={`w-4 h-4 bg-gradient-to-r ${service.gradient} group-hover:translate-x-1 transition-transform duration-300`} style={{ color: service.glow }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a1a] to-transparent" />
      <div className="absolute inset-0 dot-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0066FF]/5 text-[#00D4FF] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#0066FF]/10 mb-6">
            <Sparkles className="w-3 h-3" />
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1]">
            <span className="text-white">Everything You Need</span>
            <br />
            <span className="text-gradient-cyber">For CODM</span>
          </h2>
          <p className="text-white/30 mt-6 max-w-lg text-base leading-relaxed">
            From purchasing premium accounts to trading and topping up — we&apos;ve built the ultimate platform for CODM gamers.
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
