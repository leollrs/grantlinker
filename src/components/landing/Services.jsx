import React, { memo } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { FileSearch, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Services = memo(function Services() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const services = t('services');
  const { block1, block2 } = services;

  const headerAnim = shouldReduceMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5 }
  };

  const blockAnim = shouldReduceMotion ? {} : {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-24 md:py-32 bg-black">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] transform-gpu" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/4 rounded-full blur-[120px] transform-gpu" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <m.div {...headerAnim} className="text-center mb-20">
          <p className="text-sm font-medium text-emerald-400 tracking-wider uppercase mb-4">
            {services.subtitle}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-50">
            {services.title}
          </h2>
        </m.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* BLOCK 1 - Proposals & Grant Intelligence */}
          <m.div
            {...blockAnim}
            className="group relative p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-500"
          >
            {/* Icon */}
            <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FileSearch className="w-8 h-8 text-emerald-400" />
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-50 mb-4">
              {block1.title}
            </h3>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed mb-8">
              {block1.desc}
            </p>

            {/* Services List */}
            <ul className="space-y-3 mb-10">
              {block1.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-400">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-emerald-500/20"
            >
              {block1.cta}
            </button>
          </m.div>

          {/* BLOCK 2 - AI Solutions, Automation & Digital Development */}
          <m.div
            {...blockAnim}
            style={{ transitionDelay: shouldReduceMotion ? '0ms' : '100ms' }}
            className="group relative p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all duration-500"
          >
            {/* Icon */}
            <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-50 mb-4">
              {block2.title}
            </h3>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed mb-8">
              {block2.desc}
            </p>

            {/* Services List */}
            <ul className="space-y-3 mb-10">
              {block2.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-400">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-amber-500/20"
            >
              {block2.cta}
            </button>
          </m.div>
        </div>
      </div>
    </section>
  );
});

export default Services;