import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const WORDS = ["eficiencia", "automatización", "financiamiento", "infraestructura", "escala"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-24">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-slate-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-6 text-center">
        {/* eyebrow */}
        <p className="text-[11px] sm:text-[12px] tracking-[0.35em] uppercase text-[#9AA6B2] mb-8">
          Infraestructura · IA · Automatización
        </p>

        {/* headline */}
        <h1 className="text-balance text-[36px] sm:text-[50px] md:text-[64px] lg:text-[72px] font-semibold text-[#E8EEF5] leading-[1.03] tracking-tight mb-7">
          Sistemas inteligentes para organizaciones que necesitan{" "}
          {/* ✅ FIXED: reserves height + smooth overlay */}
          <span className="inline-grid align-baseline">
            {WORDS.map((word, i) => (
              <span
                key={word}
                className={[
                  "col-start-1 row-start-1",
                  "text-emerald-500",
                  "transition-all duration-300 ease-out",
                  i === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                ].join(" ")}
                aria-hidden={i !== index}
              >
                {word}
              </span>
            ))}
          </span>
          .
        </h1>

        {/* subtitle */}
        <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#9AA6B2] leading-relaxed max-w-[720px] mx-auto mb-10">
          Diseñamos y conectamos llamadas, citas, automatización y datos en un solo sistema que trabaja 24/7 por ti.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            onClick={() => scrollTo("diagnostico")}
            className="px-7 py-3.5 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl"
          >
            Obtener recomendación
          </Button>

          <Button
            variant="outline"
            onClick={() => scrollTo("sistemas")}
            className="px-7 py-3.5 h-auto rounded-xl border-[#1F2630] text-[#9AA6B2] hover:text-[#E8EEF5] hover:border-[#2A3441] bg-transparent hover:bg-transparent"
          >
            Ver soluciones
          </Button>
        </div>
      </div>
    </section>
  );
}