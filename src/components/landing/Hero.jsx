import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black">
        {/* Subtle Gradient Accents */}
        <div className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[140px] transform-gpu" />
        <div className="absolute bottom-1/3 -right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] transform-gpu" />
        
        {/* Minimal Grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo/Title */}
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-slate-50 mb-2 tracking-tight">
              {t('hero.title')}
            </h1>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full" />
          </m.div>

          {/* Main Headline */}
          <m.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-200 mb-6 leading-tight"
          >
            {t('hero.headline')}
          </m.h2>

          {/* Subheadline */}
          <m.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t('hero.subheadline')}
          </m.p>

          {/* CTAs */}
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollTo('contact')}
              className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/25"
            >
              {t('hero.cta')}
            </button>
            <button
              onClick={() => scrollTo('services')}
              className="px-10 py-4 text-slate-300 hover:text-white font-medium rounded-lg border-2 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:bg-slate-900/50"
            >
              {t('hero.secondary')}
            </button>
          </m.div>
        </div>

        {/* Scroll Indicator */}
        {!shouldReduceMotion && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <m.button
              onClick={() => scrollTo('about')}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 text-slate-500 hover:text-emerald-400 transition-colors"
            >
              <ChevronDown className="w-6 h-6" />
            </m.button>
          </m.div>
        )}
      </div>
    </section>
  );
}