import React, { memo } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Testimonials = memo(function Testimonials() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const testimonials = t('testimonials');
  const items = testimonials.items || [];

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
      transition: { staggerChildren: 0.12 }
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
    <section id="testimonials" className="relative py-24 md:py-32 bg-gradient-to-b from-black to-slate-950">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/4 rounded-full blur-[150px] transform-gpu" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <m.div {...headerAnim} className="text-center mb-16">
          <p className="text-sm font-medium text-emerald-400 tracking-wider uppercase mb-4">
            {testimonials.subtitle}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-50">
            {testimonials.title}
          </h2>
        </m.div>

        {/* Testimonials Grid */}
        <m.div
          variants={containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "show"}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {items.map((testimonial, idx) => (
            <m.div
              key={idx}
              variants={itemVariants}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-slate-800"
            >
              {/* Quote Icon */}
              <div className="mb-5 w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Quote className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Quote */}
              <p className="text-slate-300 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-slate-800 pt-4">
                <p className="font-semibold text-slate-50">
                  {testimonial.author}
                </p>
                <p className="text-sm text-slate-500">
                  {testimonial.role}
                </p>
              </div>
            </m.div>
          ))}
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
            {testimonials.cta}
          </button>
        </m.div>
      </div>
    </section>
  );
});

export default Testimonials;