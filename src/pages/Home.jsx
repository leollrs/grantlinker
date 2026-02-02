import React from 'react';
import Navigation from '../components/landing/Navigation';
import Hero from '../components/landing/Hero';
import Stats from '../components/landing/Stats';
import Systems from '../components/landing/Systems';
import Pricing from '../components/landing/Pricing';
import Diagnosis from '../components/landing/Diagnosis';
import CTA from '../components/landing/CTA';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F14]">
      <Navigation />
      <main>
        <Hero />
        <Systems />
        <Pricing />
        <Diagnosis />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
