import React from 'react';
import Navigation from '../components/landing/Navigation';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import Clients from '../components/landing/Clients';
import WhyUs from '../components/landing/WhyUs';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      <Hero />
      <Services />
      <Clients />
      <WhyUs />
      <ContactForm />
      <Footer />
    </div>
  );
}