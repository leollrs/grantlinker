import React from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        {/* small label */}
        <p className="text-[12px] tracking-[0.25em] uppercase text-[#9AA6B2] mb-8">
          Infraestructura · IA · Automatización
        </p>

        {/* headline */}
        <h1 className="text-[34px] sm:text-[44px] md:text-[60px] font-semibold text-[#E8EEF5] leading-[1.1] tracking-tight mb-8">
          Sistemas inteligentes para
          <br />
          organizaciones que necesitan{" "}
          <span className="text-emerald-500">escala</span>
        </h1>

        {/* subtext */}
        <p className="text-[16px] sm:text-[18px] text-[#9AA6B2] leading-relaxed max-w-[620px] mx-auto mb-12">
          Conectamos llamadas, citas, automatización y datos en una sola
          infraestructura digital que trabaja 24/7 para tu organización.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => scrollTo("diagnostico")}
            className="px-8 py-3 h-auto bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium"
          >
            Obtener recomendación
          </Button>

          <Button
            variant="outline"
            onClick={() => scrollTo("sistemas")}
            className="px-8 py-3 h-auto border-[#1F2630] text-[#9AA6B2] hover:text-[#E8EEF5] hover:border-[#2A3441]"
          >
            Ver soluciones
          </Button>
        </div>
      </div>
    </section>
  );
}