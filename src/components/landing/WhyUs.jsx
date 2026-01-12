import React, { memo } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const WhyUs = memo(function WhyUs() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const points = t('why.points');

  return (
    <section className="relative py-20 md:py-28 bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-8">
              {t('why.title')}
            </h2>
            
            <div className="space-y-5">
              {points.map((point, index) => (
                <m.div
                  key={index}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-lg text-slate-300">{point}</span>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Right Column - Visual Element */}
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Animated Rings */}
              {!shouldReduceMotion && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <m.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full rounded-full border border-slate-700/50"
                    />
                  </div>
                  <div className="absolute inset-8 flex items-center justify-center">
                    <m.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full rounded-full border border-emerald-500/20"
                    />
                  </div>
                  <div className="absolute inset-16 flex items-center justify-center">
                    <m.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full rounded-full border border-teal-500/30"
                    />
                  </div>
                </>
              )}
              
              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/25">
                  <span className="text-4xl font-bold text-slate-900">GL</span>
                </div>
              </div>

              {/* Floating Elements */}
              {!shouldReduceMotion && (
                <>
                  <m.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-8 right-8 w-4 h-4 rounded-full bg-emerald-400"
                  />
                  <m.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-12 left-12 w-3 h-3 rounded-full bg-teal-400"
                  />
                  <m.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 left-4 w-2 h-2 rounded-full bg-cyan-400"
                  />
                </>
              )}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
});

export default WhyUs;