'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Star, Users, Zap, ChevronDown, Sparkles } from 'lucide-react';
import { useParallax, useCounter, staggerContainer, staggerItem } from '@/hooks/useAnimations';

const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL;

const stats = [
  { value: 1000, suffix: '+', label: 'Accounts Sold', icon: Users },
  { value: 49, suffix: '/5★', label: 'Customer Rating', icon: Star },
  { value: 24, suffix: '/7', label: 'Live Support', icon: Zap },
  { value: 100, suffix: '%', label: 'Secure & Verified', icon: Shield },
];

const services = ['Purchase', 'Trade', 'Swap', 'Buy CP'];

function StatCounter({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref } = useCounter(stat.value, 2500);
  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="glass rounded-2xl p-6 text-center group cursor-default hover:border-[#0066FF]/20 transition-all duration-500 hover:-translate-y-1"
    >
      <stat.icon className="w-5 h-5 text-[#00D4FF] mx-auto mb-3 group-hover:scale-125 transition-transform duration-300" />
      <p className="text-3xl sm:text-4xl font-bold font-display text-white">
        {count}<span className="text-[#00D4FF]">{stat.suffix}</span>
      </p>
      <p className="text-xs text-white/30 mt-2 uppercase tracking-widest">{stat.label}</p>
    </motion.div>
  );
}

function TypeWriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const speed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(word.slice(0, text.length + 1));
        if (text === word) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setText(word.slice(0, -1));
        if (text === '') { setIsDeleting(false); setIndex((index + 1) % words.length); }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words]);

  return (
    <span className="text-gradient-cyber">
      {text}<span className="animate-pulse">|</span>
    </span>
  );
}

export default function HeroSection() {
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.3);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#0066FF] rounded-full blur-[200px] opacity-[0.07] animate-morph" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#6B00FF] rounded-full blur-[180px] opacity-[0.06] animate-morph" style={{ animationDelay: '-4s' }} />
      <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-[#00D4FF] rounded-full blur-[160px] opacity-[0.04] animate-morph" style={{ animationDelay: '-2s' }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Floating Geometric Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#0066FF" strokeWidth="1" />
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#0066FF" strokeWidth="0.5" />
        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#6B00FF" strokeWidth="0.5" />
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#0066FF" strokeWidth="1" />
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#0066FF" strokeWidth="0.5" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#6B00FF" strokeWidth="1" />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#0066FF" strokeWidth="0.5" />
      </svg>

      {/* Content */}
      <div ref={parallaxRef} style={parallaxStyle} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 w-full pt-32 lg:pt-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Partner Badge */}
          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-[#0066FF]/10">
              <div className="relative">
                <Shield className="w-4 h-4 text-[#00D4FF]" />
                <div className="absolute inset-0 animate-ping">
                  <Shield className="w-4 h-4 text-[#00D4FF] opacity-20" />
                </div>
              </div>
              <span className="text-xs font-semibold text-[#00D4FF] tracking-wider uppercase">
                Official Activision Partner
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[0.95] tracking-tight mb-8"
          >
            <span className="text-gradient-hero block">Premium</span>
            <span className="text-white block mt-1">
              <TypeWriter words={['CODM Accounts', 'Gaming Experience', 'Digital Assets', 'Victory Loadout']} />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-base sm:text-lg text-white/40 max-w-xl leading-relaxed mb-4"
          >
            Ghana&apos;s most trusted marketplace for premium Call of Duty Mobile
            accounts. Buy, trade, swap, and top up CP — all in one place.
          </motion.p>

          {/* Service Pills */}
          <motion.div variants={staggerItem} className="flex flex-wrap gap-2 mb-10">
            {services.map((s, i) => (
              <span
                key={s}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                  i === 0
                    ? 'bg-[#0066FF]/10 text-[#00D4FF] border-[#0066FF]/20'
                    : 'bg-white/[0.02] text-white/40 border-white/[0.06] hover:border-white/20'
                }`}
              >
                {s === 'Purchase' && '🛒 '}
                {s === 'Trade' && '🔄 '}
                {s === 'Swap' && '🔁 '}
                {s === 'Buy CP' && '💎 '}
                {s}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link href="/products" className="btn-primary group">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Browse Accounts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/buy-cp" className="btn-outline group">
              <span className="flex items-center gap-2">
                💎 Buy CP Points
              </span>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl"
          >
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} index={i} />
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-white/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
