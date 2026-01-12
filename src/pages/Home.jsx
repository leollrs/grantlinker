import React from 'react';
import Navigation from '../components/landing/Navigation';
import Hero from '../components/landing/Hero';
import Clients from '../components/landing/Clients';
import WhyUs from '../components/landing/WhyUs';
import Services from '../components/landing/Services';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      
      <main>
        <section id="home" className="scroll-mt-20">
          <Hero />
        </section>
        
        <section id="clients" className="scroll-mt-20">
          <Clients />
        </section>
        
        <section id="why" className="scroll-mt-20">
          <WhyUs />
        </section>
        
        <section id="services" className="scroll-mt-20">
          <Services />
        </section>
        
        <section id="contact" className="scroll-mt-20">
          <ContactForm />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}