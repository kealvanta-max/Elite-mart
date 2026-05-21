'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, Zap, Check, Send, Shield, Star } from 'lucide-react';
import Link from 'next/link';
import { getWhatsAppLink } from '@/lib/utils';
import { cn } from '@/lib/utils';

const packages = [
  { id:'1', name:'Starter', cp:80, price:12, bonus:0, popular:false },
  { id:'2', name:'Silver', cp:400, price:55, bonus:10, popular:false },
  { id:'3', name:'Gold', cp:800, price:100, bonus:25, popular:true },
  { id:'4', name:'Diamond', cp:2000, price:240, bonus:80, popular:false },
  { id:'5', name:'Elite', cp:4000, price:450, bonus:200, popular:false },
  { id:'6', name:'Legendary', cp:8000, price:850, bonus:500, popular:false },
];

export default function BuyCPPage() {
  const [selected, setSelected] = useState<string|null>(null);
  const [form, setForm] = useState({ name:'', phone:'', uid:'', username:'' });
  const [submitted, setSubmitted] = useState(false);
  const pkg = packages.find(p => p.id === selected);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg) return;
    const msg = `💎 *CP PURCHASE*\n\n👤 ${form.name}\n📱 ${form.phone}\n🎮 UID: ${form.uid}\n🎮 Username: ${form.username}\n\n📦 ${pkg.name} — ${pkg.cp.toLocaleString()} CP${pkg.bonus ? ` + ${pkg.bonus} Bonus` : ''}\n💰 GH₵${pkg.price}`;
    window.open(getWhatsAppLink(msg), '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-20">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-16">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FFB800] to-[#FF6B00] flex items-center justify-center mx-auto mb-6 animate-float"><Gem className="w-10 h-10 text-white" /></div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4"><span className="text-gradient-gold">COD Points</span></h1>
          <p className="text-white/30 max-w-lg mx-auto">Top up your CP instantly. Best rates in Ghana with mobile money support.</p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="glass rounded-3xl p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#00FF88]/10 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-[#00FF88]" /></div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">Order Sent!</h3>
            <p className="text-white/30 mb-6">Complete payment on WhatsApp and your CP will be delivered.</p>
            <Link href="/" className="btn-primary text-sm">Back to Home</Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {packages.map((pkg, i) => (
                <motion.div key={pkg.id} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08 }}
                  onClick={() => setSelected(pkg.id)}
                  className={cn("relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-500 hover:-translate-y-1",
                    selected === pkg.id ? "border-[#00D4FF] bg-[#0066FF]/5 glow-blue" : "border-white/[0.04] bg-[#0a0a1a] hover:border-white/[0.08]"
                  )}>
                  {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#FFB800] to-[#FF6B00] text-[#050510]">POPULAR</span></div>}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-display font-semibold text-white">{pkg.name}</h3>
                    {selected === pkg.id && <div className="w-6 h-6 rounded-full bg-[#00D4FF] flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <Gem className="w-6 h-6 text-[#FFB800]" />
                    <span className="text-3xl font-display font-bold text-white">{pkg.cp.toLocaleString()}</span>
                    <span className="text-xs text-white/20">CP</span>
                  </div>
                  {pkg.bonus > 0 && <p className="text-xs text-[#00FF88] mb-3 flex items-center gap-1"><Zap className="w-3 h-3" /> +{pkg.bonus} Bonus</p>}
                  <div className="pt-4 border-t border-white/[0.04] mt-4"><span className="text-2xl font-display font-bold text-white">GH₵{pkg.price}</span></div>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {pkg && (
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:20 }} className="max-w-lg mx-auto">
                  <div className="glass rounded-3xl p-8">
                    <h3 className="text-lg font-display font-bold text-white mb-6">Complete Order — {pkg.name}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="text" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="input-field" placeholder="Full Name" />
                      <input type="tel" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="input-field" placeholder="Phone Number" />
                      <input type="text" required value={form.uid} onChange={e=>setForm({...form,uid:e.target.value})} className="input-field" placeholder="CODM UID" />
                      <input type="text" required value={form.username} onChange={e=>setForm({...form,username:e.target.value})} className="input-field" placeholder="CODM Username" />
                      <div className="glass rounded-xl p-4 space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-white/30">{pkg.name}</span><span className="text-white">GH₵{pkg.price}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-white/30">CP</span><span className="text-white">{pkg.cp.toLocaleString()}</span></div>
                        {pkg.bonus > 0 && <div className="flex justify-between text-sm"><span className="text-[#00FF88]">Bonus</span><span className="text-[#00FF88]">+{pkg.bonus}</span></div>}
                        <div className="flex justify-between pt-2 border-t border-white/[0.05]"><span className="text-sm font-semibold text-white">Total</span><span className="text-xl font-display font-bold text-white">GH₵{pkg.price}</span></div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-white/20"><Shield className="w-3 h-3" />Secure payment via WhatsApp</div>
                      <button type="submit" className="btn-gold w-full !py-4 text-sm"><span className="flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Order — GH₵{pkg.price}</span></button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
