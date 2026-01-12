import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import LanguageToggle from '@/components/LanguageToggle';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-emerald-900/10 to-transparent rounded-full" />
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">GrantLinker</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </motion.div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative z-10 px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Hero content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">
                  {language === 'en' ? 'Funding Opportunities Await' : 'Oportunidades de Financiamiento'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {language === 'en' ? (
                  <>
                    Unlock <span className="text-emerald-400">Grant Funding</span> for Your Organization
                  </>
                ) : (
                  <>
                    Desbloquee <span className="text-emerald-400">Subvenciones</span> para Su Organización
                  </>
                )}
              </h1>
              
              <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto lg:mx-0">
                {language === 'en' 
                  ? 'Expert consulting and cutting-edge technology solutions to maximize your funding potential and streamline your grant processes.'
                  : 'Consultoría experta y soluciones tecnológicas de vanguardia para maximizar su potencial de financiamiento y optimizar sus procesos de subvenciones.'
                }
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 text-xs">✓</span>
                  </div>
                  <span className="text-sm">
                    {language === 'en' ? 'Grant Research' : 'Investigación de Subvenciones'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 text-xs">✓</span>
                  </div>
                  <span className="text-sm">
                    {language === 'en' ? 'Proposal Writing' : 'Redacción de Propuestas'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 text-xs">✓</span>
                  </div>
                  <span className="text-sm">
                    {language === 'en' ? 'Automation Tools' : 'Herramientas de Automatización'}
                  </span>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-3xl blur-xl" />
              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 md:p-10">
                <ContactForm language={language} />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            © 2024 GrantLinker. {language === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
        </div>
      </footer>
    </div>
  );
}