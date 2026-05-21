'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Send, Shield } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

const methods = [
  { icon:MessageCircle, label:'WhatsApp', value:'+233 20 354 8373', desc:'Chat with us instantly', href:getWhatsAppLink('Hi Elite Mart!'), color:'text-[#00FF88]', bg:'bg-[#00FF88]/10' },
  { icon:Phone, label:'Phone', value:'020 354 8373', desc:'Call us directly', href:'tel:+233203548373', color:'text-[#00D4FF]', bg:'bg-[#00D4FF]/10' },
  { icon:Mail, label:'Email', value:'support@elitemart.com', desc:'Send us an email', href:'mailto:support@elitemart.com', color:'text-[#6B00FF]', bg:'bg-[#6B00FF]/10' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">Get in <span className="text-gradient-blue">Touch</span></h1>
          <p className="text-white/30 max-w-lg mx-auto">Have a question? We typically respond within minutes.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {methods.map((m, i) => (
            <motion.a key={m.label} href={m.href} target={m.label==='WhatsApp'?'_blank':undefined} rel={m.label==='WhatsApp'?'noopener noreferrer':undefined}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              className="glass rounded-2xl p-6 text-center hover:border-white/10 transition-all hover:-translate-y-1 group">
              <div className={`w-14 h-14 rounded-2xl ${m.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <m.icon className={`w-7 h-7 ${m.color}`} />
              </div>
              <h3 className="text-lg font-display font-semibold text-white mb-1">{m.label}</h3>
              <p className="text-sm text-white/60 mb-2">{m.value}</p>
              <p className="text-xs text-white/20">{m.desc}</p>
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }} className="glass rounded-3xl p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-display font-bold text-white mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" className="input-field" placeholder="Your name" />
              <input type="email" className="input-field" placeholder="your@email.com" />
            </div>
            <select className="input-field">
              <option>General Inquiry</option><option>Purchase</option><option>Trade</option><option>Swap</option><option>CP Purchase</option><option>Support</option>
            </select>
            <textarea className="input-field !h-32 resize-none" placeholder="How can we help?" />
            <button type="submit" className="btn-primary w-full text-sm"><span className="flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Send Message</span></button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
