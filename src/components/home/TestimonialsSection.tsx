'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    name: 'Kwame Asante',
    service: 'Purchase',
    rating: 5,
    text: 'Bought a Legendary account and it was exactly as described. Delivery was instant and the support team was amazing. Best CODM marketplace in Ghana!',
    avatar: null,
  },
  {
    id: '2',
    name: 'Abena Mensah',
    service: 'Trade',
    rating: 5,
    text: 'Traded my old account for a better one. The process was smooth and fair. I got way more value than I expected. Highly recommend Elite Mart!',
    avatar: null,
  },
  {
    id: '3',
    name: 'Yaw Owusu',
    service: 'Buy CP',
    rating: 5,
    text: 'Fastest CP top-up service I\'ve ever used. Got my points in under 5 minutes. Mobile money payment was super easy too.',
    avatar: null,
  },
  {
    id: '4',
    name: 'Ama Darko',
    service: 'Swap',
    rating: 5,
    text: 'Swapped my NA account for a Global one and couldn\'t be happier. The team made sure everything was secure and I got exactly what I wanted.',
    avatar: null,
  },
  {
    id: '5',
    name: 'Kofi Boateng',
    service: 'Purchase',
    rating: 5,
    text: 'Third account I\'ve bought from Elite Mart. Always legit, always as described. They\'re the real deal — official partner for a reason!',
    avatar: null,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E17] via-surface-navy/30 to-[#0A0E17]" />

      {/* Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-bright/10 text-primary-bright text-xs font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by <span className="text-gradient-primary">Gamers</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            See what our satisfied customers have to say about their experience with Elite Mart.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-8 sm:p-12 text-center"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-bright/10 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary-bright" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent-gold fill-accent-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                  {testimonials[activeIndex].name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{testimonials[activeIndex].name}</p>
                  <p className="text-xs text-primary-bright">{testimonials[activeIndex].service}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'bg-primary-bright w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
