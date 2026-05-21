'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Star, Shield, Eye, Flame, X, ArrowRight } from 'lucide-react';
import { useTilt } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

const products = [
  { id:'1', name:'Legendary Commander', rank:'Legendary', level:150, skins:85, legendarySkins:12, price:2500, originalPrice:3200, region:'Global', hot:true, status:'available' },
  { id:'2', name:'Elite Pro Sniper', rank:'Master', level:120, skins:60, legendarySkins:6, price:1200, originalPrice:1500, region:'NA', hot:false, status:'available' },
  { id:'3', name:'Budget Starter', rank:'Elite', level:80, skins:35, legendarySkins:3, price:600, originalPrice:null, region:'EU', hot:false, status:'available' },
  { id:'4', name:'Diamond Ranked', rank:'Grand Master', level:100, skins:45, legendarySkins:5, price:1800, originalPrice:2200, region:'ASIA', hot:true, status:'available' },
  { id:'5', name:'Veteran Warrior', rank:'Veteran', level:90, skins:40, legendarySkins:4, price:900, originalPrice:1100, region:'Global', hot:false, status:'available' },
  { id:'6', name:'Ultimate Collection', rank:'Legendary', level:200, skins:120, legendarySkins:20, price:5000, originalPrice:6500, region:'Global', hot:true, status:'available' },
  { id:'7', name:'Competitive Pro', rank:'Master', level:110, skins:50, legendarySkins:7, price:1400, originalPrice:1700, region:'NA', hot:false, status:'available' },
  { id:'8', name:'Fresh Account', rank:'Pro', level:60, skins:20, legendarySkins:1, price:350, originalPrice:null, region:'Global', hot:false, status:'available' },
  { id:'9', name:'Elite Global', rank:'Elite', level:95, skins:42, legendarySkins:4, price:1100, originalPrice:1350, region:'Global', hot:false, status:'available' },
];

const ranks = ['All','Legendary','Master','Grand Master','Elite','Veteran','Pro'];
const regions = ['All','Global','NA','EU','ASIA'];
const rankColors: Record<string,string> = {
  'Legendary':'from-[#FFB800] to-[#FF6B00]', 'Master':'from-[#6B00FF] to-[#FF3366]',
  'Grand Master':'from-[#0066FF] to-[#00D4FF]', 'Elite':'from-[#00FF88] to-[#0066FF]',
  'Veteran':'from-[#FF3366] to-[#FFB800]', 'Pro':'from-[#00D4FF] to-[#0066FF]',
};

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef(null);
  const tiltRef = useTilt(5);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;

  return (
    <motion.div ref={ref} initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:index*0.08, ease:[0.22,1,0.36,1] }}>
      <Link href={`/products/${product.id}`} className="block group">
        <div ref={tiltRef} className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a1a] hover:border-[#0066FF]/20 transition-all duration-700 hover:-translate-y-2">
          <div className="relative aspect-[16/10] bg-gradient-to-br from-[#111128] to-[#0a0a1a] overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${rankColors[product.rank]||''} opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700`} />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-16 h-16 text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500" />
            </div>
            {product.hot && <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF3366]/10 border border-[#FF3366]/20"><Flame className="w-3 h-3 text-[#FF3366]" /><span className="text-[10px] font-bold text-[#FF3366] uppercase">Hot</span></div>}
            <div className="absolute top-4 left-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${rankColors[product.rank]||''} text-white shadow-lg`}>{product.rank}</span></div>
            {discount && <div className="absolute bottom-4 right-4"><span className="px-2.5 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-[10px] font-bold border border-[#FFB800]/20">-{discount}%</span></div>}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-medium"><Eye className="w-4 h-4" /> View</div>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#00D4FF] transition-colors truncate">{product.name}</h3>
            <div className="flex items-center gap-3 mb-4 text-[11px] text-white/25">
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-[#FFB800]/60" /> Lv.{product.level}</span>
              <span>🎯 {product.skins}</span>
              <span>🌍 {product.region}</span>
            </div>
            <div className="flex items-end justify-between">
              <div><span className="text-xl font-bold text-white">GH₵{product.price.toLocaleString()}</span>{product.originalPrice && <span className="text-xs text-white/20 line-through ml-2">GH₵{product.originalPrice.toLocaleString()}</span>}</div>
              <ArrowRight className="w-4 h-4 text-[#0066FF] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [rank, setRank] = useState('All');
  const [region, setRegion] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (rank !== 'All') list = list.filter(p => p.rank === rank);
    if (region !== 'All') list = list.filter(p => p.region === region);
    if (sort === 'Price: Low') list.sort((a,b) => a.price - b.price);
    if (sort === 'Price: High') list.sort((a,b) => b.price - a.price);
    if (sort === 'Level') list.sort((a,b) => b.level - a.level);
    return list;
  }, [search, rank, region, sort]);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-display font-bold"><span className="text-white">Browse </span><span className="text-gradient-blue">Accounts</span></h1>
          <p className="text-white/30 mt-2">{filtered.length} accounts available</p>
        </motion.div>

        {/* Search + Controls */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search accounts..." className="input-field !pl-11" />
          </div>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="input-field !w-48">
            <option>Featured</option><option>Price: Low</option><option>Price: High</option><option>Level</option>
          </select>
          <button onClick={()=>setFiltersOpen(!filtersOpen)} className={cn("btn-outline !px-5 !py-3 text-xs gap-2", filtersOpen && "border-[#0066FF]/30 text-[#00D4FF] bg-[#0066FF]/5")}>
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} className="overflow-hidden mb-8">
              <div className="glass rounded-2xl p-6 space-y-4">
                <div>
                  <label className="text-[10px] text-white/30 uppercase tracking-widest mb-2 block">Rank</label>
                  <div className="flex flex-wrap gap-2">{ranks.map(r => <button key={r} onClick={()=>setRank(r)} className={cn("px-3 py-1.5 rounded-full text-xs font-medium transition-all", rank===r ? "bg-[#0066FF] text-white" : "bg-white/[0.03] text-white/40 hover:bg-white/[0.06]")}>{r}</button>)}</div>
                </div>
                <div>
                  <label className="text-[10px] text-white/30 uppercase tracking-widest mb-2 block">Region</label>
                  <div className="flex flex-wrap gap-2">{regions.map(r => <button key={r} onClick={()=>setRegion(r)} className={cn("px-3 py-1.5 rounded-full text-xs font-medium transition-all", region===r ? "bg-[#0066FF] text-white" : "bg-white/[0.03] text-white/40 hover:bg-white/[0.06]")}>{r}</button>)}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20"><Shield className="w-12 h-12 text-white/10 mx-auto mb-4" /><p className="text-white/30">No accounts found</p></div>
        )}
      </div>
    </div>
  );
}
