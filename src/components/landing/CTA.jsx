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
    <section className="py-28 md:py-40 border-t border-[#1F2630]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[36px] sm:text-[44px] font-semibold text-[#E8EEF5] tracking-tight leading-[1.1] max-w-[700px] mb-8">
          ¿Listo para escalar tu organización?
        </h2>
        <Button
          onClick={() => scrollTo('diagnostico')}
          className="px-7 py-3 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg"
        >
          Agendar llamada
        </Button>
      </div>
    </section>
  );
}
