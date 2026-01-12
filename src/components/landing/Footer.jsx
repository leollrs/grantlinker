import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative py-16 bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="text-slate-900 font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-semibold text-slate-50 tracking-tight">
              Grant<span className="text-emerald-400">Linker</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-slate-400 mb-8">
            {t('footer.tagline')}
          </p>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8" />

          {/* Copyright */}
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} GrantLinker. {t('footer.rights')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}