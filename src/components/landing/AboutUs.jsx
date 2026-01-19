import React, { memo } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Brain, Boxes, Shield } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const ICONS = [Brain, Boxes, Shield];

const AboutUs = memo(function AboutUs() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const about = t('about');
  const points = about.points || [];

  const headerAnim = shouldReduceMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5 }
  };

  const containerVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
    <section id="about" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 to-black">
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] transform-gpu" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-[100px] transform-gpu" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <m.div {...headerAnim} className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-medium text-emerald-400 tracking-wider uppercase mb-4">
            {about.subtitle}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-50 mb-6">
            {about.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
            {about.description}
          </p>
        </m.div>

        {/* Points Grid */}
        <m.div
          variants={containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "show"}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {points.map((point, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <m.div
                key={point.title}
                variants={itemVariants}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="mb-5 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 to-amber-500/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-50 mb-3">
                  {point.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {point.desc}
                </p>
              </m.div>
            );
          })}
        </m.div>

        {/* CTA */}
        <m.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/25"
          >
            {about.cta}
          </button>
        </m.div>
      </div>
    </section>
  );
});

export default AboutUs;