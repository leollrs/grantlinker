import React from "react";
import { Button } from "@/components/ui/button";
import WorkflowVisualization from "./WorkflowVisualization";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export default function Hero() {
  return (
    // ✅ Use 100svh so mobile browser bars don't mess the height
    // ✅ No big top/bottom padding on mobile so it fills the screen
    <section className="relative overflow-hidden min-h-[100svh] flex items-center pt-16 sm:pt-28 lg:pt-48 pb-0 sm:pb-20 lg:pb-32">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/[0.03] blur-[160px]" />
      </div>

      {/* ✅ Make the inner container fill the viewport height on mobile */}
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 min-h-[100svh] flex items-center">
        {/* ✅ On mobile: 2 rows (text + viz) but we cap the viz height so text stays above the fold */}
        <div className="grid w-full grid-rows-[auto_1fr] lg:grid-rows-none lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* TEXT */}
          <div className="max-w-[600px]">
            <h1 className="text-[36px] sm:text-[48px] lg:text-[64px] font-bold text-white leading-[1.05] tracking-tight mb-6 sm:mb-8">
              Automatiza tu operación completa con IA
            </h1>

            <p className="text-[16px] sm:text-[18px] lg:text-[22px] text-[#9AA6B2] leading-[1.5] mb-8 sm:mb-12">
              Llamadas, citas, clientes y procesos internos funcionando 24/7 en un solo sistema.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={() => scrollTo("contacto")}
                className="px-8 sm:px-10 py-5 sm:py-6 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[15px] sm:text-[16px] font-semibold rounded-xl"
              >
                Agendar llamada
              </Button>

              <Button
                variant="outline"
                onClick={() => scrollTo("producto")}
                className="px-8 sm:px-10 py-5 sm:py-6 h-auto rounded-xl border-white/10 text-white hover:text-white hover:border-white/20 bg-transparent hover:bg-white/5 text-[15px] sm:text-[16px] font-semibold"
              >
                Ver cómo funciona
              </Button>
            </div>
          </div>

          {/* VISUAL */}
          <div className="mt-8 lg:mt-0 w-full">
            {/* ✅ Key change: constrain the visualization height on mobile so the hero stays 1-screen */}
            <div className="mx-auto w-full max-w-[520px] lg:max-w-none max-h-[36vh] sm:max-h-[42vh] lg:max-h-none overflow-hidden">
              <WorkflowVisualization />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}