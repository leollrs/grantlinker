import React, { useState, useEffect, memo } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Navigation = memo(function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMobileMenuOpen(false);
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

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'testimonials', label: t('nav.testimonials') },
    { id: 'contact', label: t('nav.contact') }
  ];

  return (
    <>
      <m.nav
        initial={shouldReduceMotion ? { y: 0 } : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-xl border-b border-slate-800/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <m.a 
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            >
              <span className="text-xl sm:text-2xl font-serif font-bold text-slate-50 tracking-tight">
                Grant<span className="text-emerald-400">Linker</span>
              </span>
            </m.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 transition-colors duration-300 rounded-lg hover:bg-slate-800/50"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Language Toggle */}
              <div className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
                <Globe className="w-4 h-4 text-slate-400" />
                <button
                  onClick={() => setLanguage('en')}
                  className={`text-sm px-2 py-0.5 rounded transition-all ${
                    language === 'en' 
                      ? 'text-emerald-400 bg-emerald-400/10' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  EN
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={() => setLanguage('es')}
                  className={`text-sm px-2 py-0.5 rounded transition-all ${
                    language === 'es' 
                      ? 'text-emerald-400 bg-emerald-400/10' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  ES
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </m.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative pt-24 px-6">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <m.button
                    key={item.id}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
                    onClick={() => scrollTo(item.id)}
                    className="text-left px-4 py-4 text-lg text-slate-200 hover:text-emerald-400 border-b border-slate-800/50 transition-colors"
                  >
                    {item.label}
                  </m.button>
                ))}
              </div>
              
              {/* Mobile Language Toggle */}
              <m.div 
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
                className="mt-8 flex items-center justify-center gap-4"
              >
                <Globe className="w-5 h-5 text-slate-400" />
                <button
                  onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}
                  className={`text-base px-4 py-2 rounded-lg transition-all ${
                    language === 'en' 
                      ? 'text-emerald-400 bg-emerald-400/10' 
                      : 'text-slate-400'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => { setLanguage('es'); setIsMobileMenuOpen(false); }}
                  className={`text-base px-4 py-2 rounded-lg transition-all ${
                    language === 'es' 
                      ? 'text-emerald-400 bg-emerald-400/10' 
                      : 'text-slate-400'
                  }`}
                >
                  Español
                </button>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navigation;