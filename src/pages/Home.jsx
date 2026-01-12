import React, { lazy, Suspense } from 'react';
import Navigation from '../components/landing/Navigation';
import Hero from '../components/landing/Hero';

// Lazy load non-critical sections
const Clients = lazy(() => import('../components/landing/Clients'));
const WhyUs = lazy(() => import('../components/landing/WhyUs'));
const Services = lazy(() => import('../components/landing/Services'));
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
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      
      <main>
        <section id="home" className="scroll-mt-20">
          <Hero />
        </section>
        
        <Suspense fallback={<SectionFallback />}>
          <section id="clients" className="scroll-mt-20">
            <Clients />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <section id="why" className="scroll-mt-20">
            <WhyUs />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <section id="services" className="scroll-mt-20">
            <Services />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <section id="contact" className="scroll-mt-20">
            <ContactForm />
          </section>
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}