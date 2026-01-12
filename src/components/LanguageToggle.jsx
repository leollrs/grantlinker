import React from 'react';
import { motion } from 'framer-motion';

export default function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="flex items-center gap-1 bg-zinc-800/50 rounded-full p-1 border border-zinc-700/50">
      <button
        onClick={() => setLanguage('en')}
        className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
          language === 'en' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'
        }`}
      >
        {language === 'en' && (
          <motion.div
            layoutId="langBg"
            className="absolute inset-0 bg-emerald-600 rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
          language === 'es' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'
        }`}
      >
        {language === 'es' && (
          <motion.div
            layoutId="langBg"
            className="absolute inset-0 bg-emerald-600 rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10">ES</span>
      </button>
    </div>
  );
}