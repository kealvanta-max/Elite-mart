'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Star, Users, Zap, ChevronDown } from 'lucide-react';
import ParticleField from './ParticleField';

const stats = [
  { value: '1000+', label: 'Accounts Sold', icon: Users },
  { value: '4.9★', label: 'Customer Rating', icon: Star },
  { value: '24/7', label: 'Support', icon: Zap },
  { value: '100%', label: 'Safe & Secure', icon: Shield },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#0A0E17]" />
      <div className="absolute inset-0 bg-grid" />
      <ParticleField />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-bright/15 rounded-full blur-[100px] opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[150px] opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Partner Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary-bright/20">
              <Shield className="w-4 h-4 text-primary-bright" />
              <span className="text-xs font-semibold text-primary-bright tracking-wide uppercase">
                Official Activision CODM Partner
              </span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6"
          >
            <span className="text-white">Premium</span>
            <br />
            <span className="text-gradient-primary">CODM Accounts</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Ghana&apos;s #1 trusted marketplace for Call of Duty Mobile accounts.
            Buy, trade, swap accounts and top up CP with confidence.
          </motion.p>

          {/* Service Tags */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {['Purchase', 'Trade', 'Swap', 'Buy CP'].map((service, i) => (
              <span
                key={service}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                  i === 0
                    ? 'bg-primary-bright/10 text-primary-bright border-primary-bright/20'
                    : 'bg-white/5 text-white/60 border-white/10'
                }`}
              >
                {service}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/products" className="btn-primary group text-base !px-8 !py-4">
              <span>Browse Accounts</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/buy-cp" className="btn-ghost text-base !px-8 !py-4">
              Buy CP Points
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-4 text-center hover:border-primary-bright/20 transition-colors group"
              >
                <stat.icon className="w-5 h-5 text-primary-bright mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-white/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
