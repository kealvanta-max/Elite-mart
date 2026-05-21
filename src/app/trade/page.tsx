'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Send, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { getWhatsAppLink } from '@/lib/utils';

export default function TradePage() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', offerLevel:'', offerRank:'Legendary', offerRegion:'Global', offerSkins:'', offerLegendary:'', offerDesc:'', wantDesc:'', additional:'' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🔄 *TRADE REQUEST*\n\n👤 ${form.name}\n📱 ${form.phone}\n\n📥 YOUR ACCOUNT:\n• Level: ${form.offerLevel}\n• Rank: ${form.offerRank}\n• Region: ${form.offerRegion}\n• Skins: ${form.offerSkins}\n• Legendary: ${form.offerLegendary}\n• ${form.offerDesc}\n\n📤 WANT:\n• ${form.wantDesc}\n\n📝 ${form.additional||'None'}`;
    window.open(getWhatsAppLink(msg), '_blank');
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="glass rounded-3xl p-12 text-center max-w-md mx-4">
        <div className="w-16 h-16 rounded-full bg-[#00FF88]/10 flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-[#00FF88]" /></div>
        <h3 className="text-2xl font-display font-bold text-white mb-2">Request Sent!</h3>
        <p className="text-white/30 mb-6">Your trade request has been sent via WhatsApp. We&apos;ll respond shortly!</p>
        <Link href="/" className="btn-primary text-sm">Back to Home</Link>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6B00FF] to-[#FF3366] flex items-center justify-center mx-auto mb-4"><ArrowLeftRight className="w-8 h-8 text-white" /></div>
          <h1 className="text-4xl font-display font-bold mb-3"><span className="text-gradient-cyber">Trade</span> Account</h1>
          <p className="text-white/30">Exchange your current CODM account for a better one.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { title:'Your Info', color:'from-[#0066FF] to-[#00D4FF]', fields: [
              { name:'name', label:'Full Name', type:'text', required:true, placeholder:'Your name' },
              { name:'phone', label:'Phone', type:'tel', required:true, placeholder:'020 354 8373' },
              { name:'email', label:'Email', type:'email', required:false, placeholder:'you@email.com' },
            ]},
            { title:'Your Account', color:'from-[#6B00FF] to-[#FF3366]', fields: [
              { name:'offerLevel', label:'Account Level', type:'number', required:true, placeholder:'150' },
              { name:'offerRank', label:'Rank', type:'select', required:true, options:['Legendary','Master','Grand Master','Elite','Veteran','Pro'] },
              { name:'offerRegion', label:'Region', type:'select', required:true, options:['Global','NA','EU','ASIA','ME'] },
              { name:'offerSkins', label:'Total Skins', type:'number', required:false, placeholder:'85' },
              { name:'offerLegendary', label:'Legendary Skins', type:'number', required:false, placeholder:'12' },
              { name:'offerDesc', label:'Description', type:'textarea', required:false, placeholder:'Describe your account...' },
            ]},
            { title:'What You Want', color:'from-[#00FF88] to-[#0066FF]', fields: [
              { name:'wantDesc', label:'What you want', type:'textarea', required:false, placeholder:'Describe the account you want...' },
              { name:'additional', label:'Additional Info', type:'textarea', required:false, placeholder:'Anything else?' },
            ]},
          ].map((section, si) => (
            <motion.div key={section.title} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:si*0.1 }} className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full bg-gradient-to-r ${section.color} flex items-center justify-center text-[10px] text-white font-bold`}>{si+1}</span>
                {section.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.fields.map(f => (
                  <div key={f.name} className={f.type==='textarea' ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs text-white/30 mb-2">{f.label}{f.required && ' *'}</label>
                    {f.type === 'select' ? (
                      <select value={(form as any)[f.name]} onChange={e=>setForm({...form,[f.name]:e.target.value})} className="input-field">
                        {f.options?.map(o => <option key={o}>{o}</option>)}
                      </select>
                    ) : f.type === 'textarea' ? (
                      <textarea value={(form as any)[f.name]} onChange={e=>setForm({...form,[f.name]:e.target.value})} className="input-field !h-24 resize-none" placeholder={f.placeholder} />
                    ) : (
                      <input type={f.type} value={(form as any)[f.name]} onChange={e=>setForm({...form,[f.name]:e.target.value})} className="input-field" placeholder={f.placeholder} required={f.required} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-white/20 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Sent via WhatsApp</p>
            <button type="submit" className="btn-gold text-sm !px-8"><span className="flex items-center gap-2"><Send className="w-4 h-4" /> Submit</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}
