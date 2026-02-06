import React from "react";
import { Button } from "@/components/ui/button";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export default function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        <h2 className="text-[36px] sm:text-[48px] font-bold text-white leading-[1.1] tracking-tight mb-6">
          ¿Listo para operar en piloto automático?
        </h2>
        
        <p className="text-[18px] text-[#9AA6B2] leading-relaxed mb-10 max-w-[600px] mx-auto">
          Te ayudamos a implementar tu sistema en días, no meses.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => scrollTo("contacto")}
            className="px-8 py-4 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-emerald-900/20"
          >
            Agendar llamada
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollTo("diagnostico")}
            className="px-8 py-4 h-auto rounded-xl border-[#1F2630] text-[#E8EEF5] hover:text-white hover:border-[#2A3441] bg-transparent hover:bg-white/5 text-[15px] font-semibold"
          >
            Diagnóstico rápido
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 text-[13px] text-[#9AA6B2]">
          <span>✓ Sin contratos largos</span>
          <span>✓ Onboarding en días</span>
          <span>✓ Escala con tu negocio</span>
        </div>
      </div>
    </section>
  );
}