import React from 'react';
import { motion } from 'framer-motion';
import { Search, Cpu, Layers } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Search,
      title: t('services.grant.title'),
      items: t('services.grant.items'),
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400'
    },
    {
      icon: Cpu,
      title: t('services.tech.title'),
      items: t('services.tech.items'),
      gradient: 'from-teal-500/20 to-cyan-500/20',
      iconBg: 'bg-teal-500/10',
      iconColor: 'text-teal-400'
    },
    {
      icon: Layers,
      title: t('services.support.title'),
      items: t('services.support.items'),
      gradient: 'from-cyan-500/20 to-emerald-500/20',
      iconBg: 'bg-cyan-500/10',
      iconColor: 'text-cyan-400'
    }
  ];

  return (
    <section id="services" className="relative py-32 bg-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
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
            {t('services.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-slate-50 mb-6">
                    {service.title}
                  </h3>

                  {/* Items */}
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400 group-hover:text-slate-300 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Glow */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}