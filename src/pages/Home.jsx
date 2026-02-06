import React from 'react';
import Navigation from '../components/landing/Navigation';
import Hero from '../components/landing/Hero';
import TrustStrip from '../components/landing/TrustStrip';
import ProductOverview from '../components/landing/ProductOverview';
import Pricing from '../components/landing/Pricing';
import BenefitsGrid from '../components/landing/BenefitsGrid';
import Diagnosis from '../components/landing/Diagnosis';
import Contact from '../components/landing/Contact';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F14]">
      <Navigation />
      <main>
        <Hero />
        <TrustStrip />
        <ProductOverview />
        <Pricing />
        <BenefitsGrid />
        <Diagnosis />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}