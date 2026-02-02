import React, { useState, useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Button } from '@/components/ui/button';

const WORDS = ['financiamiento', 'automatización', 'infraestructura', 'eficiencia', 'escala'];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-36 md:pb-28">
        <p className="text-[11px] sm:text-[13px] text-[#9AA6B2] tracking-widest uppercase mb-6 sm:mb-8">
          Infraestructura &middot; IA &middot; Financiamiento
        </p>

        <h1 className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[68px] font-semibold text-[#E8EEF5] leading-[1.08] tracking-tight max-w-[900px] mb-5 sm:mb-7">
          Infraestructura Inteligente para Organizaciones que Necesitan{' '}
          <span className="relative inline-block">
            <AnimatePresence mode="wait">
              <m.span
                key={WORDS[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="text-emerald-500"
              >
                {WORDS[index]}
              </m.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="text-[15px] sm:text-[17px] md:text-[19px] text-[#9AA6B2] leading-relaxed max-w-[640px] mb-8 sm:mb-12">
          Combinamos inteligencia de subvenciones, automatización con IA y desarrollo digital para ayudar a organizaciones a asegurar más fondos y operar con máxima eficiencia.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 mb-12 sm:mb-20">
          <Button
            onClick={() => scrollTo('diagnostico')}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-3 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg"
          >
            Agendar llamada
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollTo('sistemas')}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-3 h-auto text-[#9AA6B2] hover:text-[#E8EEF5] text-sm font-medium rounded-lg border-[#1F2630] hover:border-[#2A3441] bg-transparent hover:bg-transparent"
          >
            Ver sistemas
          </Button>
        </div>

        <p className="text-[12px] sm:text-[13px] text-[#9AA6B2]/60">
          50+ organizaciones &nbsp;&middot;&nbsp; 95% retención &nbsp;&middot;&nbsp; $2M+ asegurado
        </p>
      </div>
    </section>
  );
}