import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const WORDS = [
  "eficiencia",
  "automatización",
  "financiamiento",
  "infraestructura",
  "escala",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((p) => (p + 1) % WORDS.length);
    }, 2600);
    return () => clearInterval(i);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 pb-24">
      <div className="max-w-[980px] mx-auto px-6 text-center">
        {/* eyebrow */}
        <p className="text-[12px] tracking-[0.25em] uppercase text-[#9AA6B2] mb-8">
          Infraestructura · IA · Automatización
        </p>

        {/* headline */}
        <h1 className="text-[34px] sm:text-[46px] md:text-[62px] font-semibold text-[#E8EEF5] leading-[1.08] tracking-tight mb-8">
          Sistemas inteligentes para organizaciones que necesitan{" "}
          
          {/* smooth word switch */}
          <span className="relative inline-block min-w-[14ch] text-emerald-500">
            {WORDS.map((word, i) => (
              <span
                key={word}
                className={`absolute left-0 top-0 transition-opacity duration-400 ease-in-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* subtitle */}
        <p className="text-[16px] sm:text-[18px] text-[#9AA6B2] leading-relaxed max-w-[640px] mx-auto mb-10">
          Diseñamos y conectamos tus llamadas, citas, automatización y datos en
          un solo sistema que trabaja 24/7 por ti.
        </p>

        {/* buttons */}
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
            className="px-7 py-3 h-auto border-[#1F2630] text-[#9AA6B2] hover:text-[#E8EEF5] hover:border-[#2A3441]"
          >
            Ver soluciones
          </Button>
        </div>
      </div>
    </section>
  );
}