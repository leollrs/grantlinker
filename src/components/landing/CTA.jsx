import React from 'react';
import { Button } from '@/components/ui/button';

export default function CTA() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 md:py-28 lg:py-40 border-t border-[#1F2630]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2 className="text-[30px] sm:text-[36px] md:text-[44px] font-semibold text-[#E8EEF5] tracking-tight leading-[1.1] max-w-[700px] mb-6 sm:mb-8">
          ¿Listo para escalar tu organización?
        </h2>
        <Button
          onClick={() => scrollTo('diagnostico')}
          className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-3 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg"
        >
          Agendar llamada
        </Button>
      </div>
    </section>
  );
}