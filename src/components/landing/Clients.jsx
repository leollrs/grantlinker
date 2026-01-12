import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Landmark, Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Clients() {
  const { t } = useLanguage();

  const clientTypes = t('clients.types');
  const icons = [Building2, Landmark, Briefcase, GraduationCap];

  return (
    <section className="relative py-20 md:py-28 bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-6">
            {t('clients.title')}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('clients.subtitle')}
          </p>
        </motion.div>

        {/* Client Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientTypes.map((client, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all duration-500 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-emerald-400" />
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-semibold text-slate-50 mb-2">
                    {client.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {client.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}