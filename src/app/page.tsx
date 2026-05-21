'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroV2';
import ServicesSection from '@/components/home/ServicesV2';
import FeaturedProducts from '@/components/home/ProductsV2';
import TestimonialsSection from '@/components/home/TestimonialsV2';
import CTASection from '@/components/home/CTAV2';
import ScrollProgress from '@/components/ScrollProgress';

const Scene3D = dynamic(() => import('@/components/3d/Scene3D'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Scene3D />
      <div className="noise" />
      <HeroSection />
      <ServicesSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
