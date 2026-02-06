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
    <section className="py-40 border-t border-white/5">
      <div className="mx-auto max-w-[900px] px-8 text-center">
        <h2 className="text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-8">
          ¿Listo para operar en piloto automático?
        </h2>
        
        <p className="text-[20px] text-[#9AA6B2] leading-relaxed mb-14">
          Te ayudamos a implementar tu sistema en días, no meses.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Button
            onClick={() => scrollTo("contacto")}
            className="px-10 py-6 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[16px] font-semibold rounded-xl"
          >
            Agendar llamada
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollTo("diagnostico")}
            className="px-10 py-6 h-auto rounded-xl border-white/10 text-white hover:text-white hover:border-white/20 bg-transparent hover:bg-white/5 text-[16px] font-semibold"
          >
            Diagnóstico rápido
          </Button>
        </div>

        <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-10 text-[15px] text-[#9AA6B2]">
          <span>✓ Sin contratos largos</span>
          <span>✓ Onboarding en días</span>
          <span>✓ Escala con tu negocio</span>
        </div>
      </div>
    </section>
  );
}