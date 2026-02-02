import React, { useState, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Button } from "@/components/ui/button";

const WORDS = [
  "financiamiento",
  "automatización",
  "infraestructura",
  "eficiencia",
  "escala",
];

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
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="relative pt-24 sm:pt-32 md:pt-40 pb-20 md:pb-28">
      <div className="max-w-[980px] mx-auto px-6 text-center">
        {/* Eyebrow */}
        <p className="text-[12px] text-[#9AA6B2] tracking-[0.25em] uppercase mb-6">
          Infraestructura · IA · Automatización
        </p>

        {/* Headline */}
        <h1 className="text-[34px] sm:text-[44px] md:text-[60px] lg:text-[68px] font-semibold text-[#E8EEF5] leading-[1.05] tracking-tight mb-7">
          Sistemas inteligentes para organizaciones que necesitan{" "}
          <span className="relative inline-block text-emerald-500">
            <AnimatePresence mode="wait">
              <m.span
                key={WORDS[index]}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
              >
                {WORDS[index]}
              </m.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-[16px] sm:text-[18px] text-[#9AA6B2] leading-relaxed max-w-[640px] mx-auto mb-10">
          Diseñamos y conectamos tus operaciones digitales — llamadas, citas,
          automatización y datos — en un solo sistema que trabaja 24/7 para ti.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            onClick={() => scrollTo("diagnostico")}
            className="px-7 py-3 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg"
          >
            Obtener recomendación
          </Button>

          <Button
            variant="outline"
            onClick={() => scrollTo("sistemas")}
            className="px-7 py-3 h-auto border-[#1F2630] text-[#9AA6B2] hover:text-[#E8EEF5] hover:border-[#2A3441] bg-transparent"
          >
            Ver soluciones
          </Button>
        </div>
      </div>
    </section>
  );
}