import React from 'react';
import Navigation from '../components/landing/Navigation';
import Hero from '../components/landing/Hero';
import TrustStrip from '../components/landing/TrustStrip';
import ProductOverview from '../components/landing/ProductOverview';
import ModularServices from '../components/landing/ModularServices';
import EnterpriseImplementations from '../components/landing/EnterpriseImplementations';
import BenefitsGrid from '../components/landing/BenefitsGrid';
import Diagnosis from '../components/landing/Diagnosis';
import Contact from '../components/landing/Contact';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';
import Chatbot from '../components/landing/Chatbot';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F14]">
      <Navigation />
      <Chatbot />
      <main>
        <Hero />
        <TrustStrip />
        <ProductOverview />
        <ModularServices />
        <EnterpriseImplementations />
        <BenefitsGrid />
        <Diagnosis />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}