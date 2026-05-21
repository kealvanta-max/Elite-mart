'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { id:'1', name:'Kwame Asante', service:'Purchase', text:'Bought a Legendary account and it was exactly as described. Delivery was instant and the support team was amazing. Best CODM marketplace in Ghana!', rating:5 },
  { id:'2', name:'Abena Mensah', service:'Trade', text:'Traded my old account for a better one. The process was smooth and fair. I got way more value than I expected. Highly recommend!', rating:5 },
  { id:'3', name:'Yaw Owusu', service:'Buy CP', text:'Fastest CP top-up service ever. Got my points in under 5 minutes. Mobile money payment was super easy too. Will use again!', rating:5 },
  { id:'4', name:'Ama Darko', service:'Swap', text:'Swapped my NA account for a Global one and couldn\'t be happier. The team made sure everything was secure. Truly professional.', rating:5 },
  { id:'5', name:'Kofi Boateng', service:'Purchase', text:'Third account I\'ve bought from Elite Mart. Always legit, always as described. They\'re the real deal — official partner for a reason!', rating:5 },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a1a]/80 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF] rounded-full blur-[250px] opacity-[0.03]" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#6B00FF]/5 text-[#6B00FF] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#6B00FF]/10 mb-6">
            💬 Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">
            <span className="text-white">Trusted by </span>
            <span className="text-gradient-cyber">Gamers</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-8 sm:p-12 text-center"
            >
              <Quote className="w-10 h-10 text-[#0066FF]/20 mx-auto mb-6" />
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FFB800] fill-[#FFB800]" />
                ))}
              </div>
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-8 italic max-w-2xl mx-auto">
                &ldquo;{testimonials[active].text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#6B00FF] flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[active].name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{testimonials[active].name}</p>
                  <p className="text-xs text-[#00D4FF]">{testimonials[active].service}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length)} className="p-2.5 rounded-full border border-white/[0.06] hover:border-white/20 text-white/30 hover:text-white transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-[#0066FF]' : 'w-1.5 bg-white/10 hover:bg-white/20'}`} />
              ))}
            </div>
            <button onClick={() => setActive((p) => (p + 1) % testimonials.length)} className="p-2.5 rounded-full border border-white/[0.06] hover:border-white/20 text-white/30 hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
