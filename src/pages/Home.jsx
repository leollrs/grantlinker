import React, { lazy, Suspense } from 'react';
import Navigation from '../components/landing/Navigation';
import Hero from '../components/landing/Hero';

// Lazy load non-critical sections
const AboutUs = lazy(() => import('../components/landing/AboutUs'));
const Services = lazy(() => import('../components/landing/Services'));
const Testimonials = lazy(() => import('../components/landing/Testimonials'));
const ContactForm = lazy(() => import('../components/landing/ContactForm'));
const Footer = lazy(() => import('../components/landing/Footer'));

// Minimal loading fallback
const SectionFallback = () => (
  <div className="py-20 md:py-28 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main>
        <Hero />
        
        <Suspense fallback={<SectionFallback />}>
          <AboutUs />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <ContactForm />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}