import React from "react";
import { Button } from "@/components/ui/button";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 lg:py-40 border-t border-white/5">
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[32px] sm:text-[44px] lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-6 sm:mb-8">
          ¿Listo para operar en piloto automático?
        </h2>
        
        <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#9AA6B2] leading-relaxed mb-10 sm:mb-14">
          Te ayudamos a implementar tu sistema en días, no meses.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
          <Button
            onClick={() => scrollTo("contacto")}
            className="px-8 sm:px-10 py-5 sm:py-6 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[15px] sm:text-[16px] font-semibold rounded-xl"
          >
            Agendar llamada
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollTo("diagnostico")}
            className="px-8 sm:px-10 py-5 sm:py-6 h-auto rounded-xl border-white/10 text-white hover:text-white hover:border-white/20 bg-transparent hover:bg-white/5 text-[15px] sm:text-[16px] font-semibold"
          >
            Diagnóstico rápido
          </Button>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/10 flex flex-wrap justify-center gap-6 sm:gap-10 text-[14px] sm:text-[15px] text-[#9AA6B2]">
          <span>✓ Sin contratos largos</span>
          <span>✓ Onboarding en días</span>
          <span>✓ Escala con tu negocio</span>
        </div>
      </div>
    </section>
  );
}