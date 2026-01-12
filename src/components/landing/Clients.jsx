import React, { memo, useMemo } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Building2, Landmark, Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const ICONS = [Building2, Landmark, Briefcase, GraduationCap];

const Clients = memo(function Clients() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Memoize translated list (still updates when language changes)
  const clientTypes = useMemo(() => t('clients.types') ?? [], [t]);

  const headerAnim = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.5, ease: 'easeOut' },
      };

  // One in-view trigger for the whole grid (cheaper than per-card whileInView)
  const containerVariants = shouldReduceMotion
    ? {}
    : {
        hidden: { opacity: 1 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.04 },
        },
      };

  const itemVariants = shouldReduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: 'easeOut' },
        },
      };

  return (
    <section className="relative py-20 md:py-28 bg-slate-950">
      {/* Background (GPU + not interactive) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-emerald-500/5 rounded-full blur-[140px] transform-gpu" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <m.div {...headerAnim} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-6">
            {t('clients.title')}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('clients.subtitle')}
          </p>
        </m.div>

        {/* Client Grid (single whileInView) */}
        <m.div
          variants={containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "show"}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {clientTypes.map((client, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <m.div
                key={client.name}
                variants={itemVariants}
                className="group will-change-transform"
              >
                <div className="relative h-full p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all duration-500 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 transform-gpu">
                    <Icon className="w-8 h-8 text-emerald-400" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-50 mb-2">
                    {client.name}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {client.desc}
                  </p>
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
});

export default Clients;