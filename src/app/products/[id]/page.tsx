'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Shield, Eye, Globe, Sword, Trophy, ShoppingBag, MessageCircle, Heart, Share2, CheckCircle, Zap, Gem, ArrowLeft } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';
import { useTilt } from '@/hooks/useAnimations';

const p = {
  id:'1', name:'Legendary Commander Account', description:'A premium Legendary-ranked CODM account featuring 12 legendary skins including limited-edition battle pass rewards, exclusive weapon skins, and top-tier operator skins. Perfect for competitive players.', rank:'Legendary', level:150, skins:85, legendarySkins:12, epicSkins:25, rareSkins:48, region:'Global', price:2500, originalPrice:3200, status:'available', battlePass:'Season 1-12 Complete', cpBalance:500, weapons:['AK-47 Legendary','DL Q33 Epic','ASM10 Legendary','HDR Epic'], tags:['featured','premium'],
};

const rankColors: Record<string,string> = { 'Legendary':'from-[#FFB800] to-[#FF6B00]', 'Master':'from-[#6B00FF] to-[#FF3366]', 'Grand Master':'from-[#0066FF] to-[#00D4FF]', 'Elite':'from-[#00FF88] to-[#0066FF]' };

export default function ProductDetailPage() {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

  const handleBuy = () => {
    window.open(getWhatsAppLink(`🛒 *PURCHASE REQUEST*\n\n📦 *${p.name}*\n💰 GH₵${p.price}\n⭐ ${p.rank} | Lv.${p.level}\n🌍 ${p.region}\n\nI want to buy this account.`), '_blank');
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex items-center gap-2 text-xs text-white/20 mb-8">
          <Link href="/" className="hover:text-white/50 transition-colors">Home</Link><span>/</span>
          <Link href="/products" className="hover:text-white/50 transition-colors">Accounts</Link><span>/</span>
          <span className="text-white/40">{p.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#111128] to-[#0a0a1a] border border-white/[0.06]">
              <div className={`absolute inset-0 bg-gradient-to-br ${rankColors[p.rank]||''} opacity-[0.06]`} />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center"><Shield className="w-24 h-24 text-white/[0.04]" /></div>
              <div className="absolute top-5 left-5 flex gap-2">
                <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${rankColors[p.rank]||''} text-white`}>{p.rank}</span>
                {discount > 0 && <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20">-{discount}%</span>}
              </div>
              <div className="absolute top-5 right-5 flex gap-2">
                <button onClick={()=>setWishlisted(!wishlisted)} className={`p-2.5 rounded-full transition-colors ${wishlisted ? 'bg-[#FF3366]/20 text-[#FF3366]' : 'bg-white/5 text-white/30 hover:text-white/60'}`}><Heart className={`w-5 h-5 ${wishlisted?'fill-current':''}`} /></button>
                <button className="p-2.5 rounded-full bg-white/5 text-white/30 hover:text-white/60 transition-colors"><Share2 className="w-5 h-5" /></button>
              </div>
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.1, ease:[0.22,1,0.36,1] }} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF88]/10 text-[#00FF88] text-[10px] font-bold border border-[#00FF88]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" /> Available
                </span>
                <span className="text-[10px] text-white/20">#{p.id}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">{p.name}</h1>
              <p className="text-sm text-white/30 leading-relaxed">{p.description}</p>
            </div>

            {/* Price Card */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-display font-bold text-white">GH₵{p.price.toLocaleString()}</span>
                {p.originalPrice && <span className="text-lg text-white/20 line-through">GH₵{p.originalPrice.toLocaleString()}</span>}
              </div>
              {discount > 0 && <p className="text-sm text-[#00FF88] mt-2 flex items-center gap-1"><Zap className="w-3 h-3" /> You save GH₵{(p.originalPrice! - p.price).toLocaleString()}</p>}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label:'Level', value:p.level, icon:Star, color:'text-[#FFB800]' },
                { label:'Rank', value:p.rank, icon:Trophy, color:'text-[#00D4FF]' },
                { label:'Skins', value:p.skins, icon:Eye, color:'text-[#6B00FF]' },
                { label:'Region', value:p.region, icon:Globe, color:'text-[#00FF88]' },
              ].map(s => (
                <div key={s.label} className="glass rounded-xl p-4 text-center">
                  <s.icon className={`w-4 h-4 ${s.color} mx-auto mb-2`} />
                  <p className="text-sm font-bold text-white">{s.value}</p>
                  <p className="text-[9px] text-white/25 uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Skin Breakdown */}
            <div className="glass rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">Skin Collection</h3>
              {[
                { label:'Legendary', count:p.legendarySkins, color:'bg-gradient-to-r from-[#FFB800] to-[#FF6B00]', pct: (p.legendarySkins!/p.skins)*100 },
                { label:'Epic', count:p.epicSkins, color:'bg-gradient-to-r from-[#6B00FF] to-[#FF3366]', pct: (p.epicSkins/p.skins)*100 },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1"><span className="text-white/30">{s.label}</span><span className="text-white font-semibold">{s.count}</span></div>
                  <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden"><motion.div initial={{ width:0 }} whileInView={{ width:`${s.pct}%` }} viewport={{ once:true }} transition={{ duration:1, delay:0.5 }} className={`h-full rounded-full ${s.color}`} /></div>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="glass rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">Details</h3>
              <div className="flex justify-between text-sm"><span className="text-white/30">Battle Pass</span><span className="text-white">{p.battlePass}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/30">CP Balance</span><span className="text-white">{p.cpBalance} CP</span></div>
              {p.weapons.length > 0 && <div className="pt-2"><p className="text-white/30 text-sm mb-2">Weapons</p>{p.weapons.map(w => <div key={w} className="flex items-center gap-2 text-sm text-white/50 py-1"><Sword className="w-3 h-3 text-[#00D4FF]" />{w}</div>)}</div>}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={handleBuy} className="btn-primary flex-1 !py-4 text-sm"><span className="flex items-center justify-center gap-2"><ShoppingBag className="w-4 h-4" /> Purchase via WhatsApp</span></button>
              <a href={getWhatsAppLink(`Hi! Interested in "${p.name}" (GH₵${p.price}).`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#00FF88] text-[#050510] font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-[#00FF88]/20"><MessageCircle className="w-4 h-4" /> Chat</a>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-white/25 pt-1">
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-[#00FF88]" /> Verified</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[#00D4FF]" /> Secure</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#FFB800]" /> Instant</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
