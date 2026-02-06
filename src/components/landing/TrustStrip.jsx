import React from "react";

export default function TrustStrip() {
  const sectors = ["Clínicas", "ONGs", "Municipios", "Empresas", "Educación"];

  return (
    <section className="py-12 sm:py-16 lg:py-20 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] sm:text-[13px] text-[#9AA6B2]/60 uppercase tracking-wider mb-8 sm:mb-12">
          Organizaciones que ya automatizan con GrantLinker
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {sectors.map((name) => (
            <div
              key={name}
              className="rounded-lg border border-white/5 bg-white/[0.01] px-5 sm:px-8 py-3 sm:py-4"
            >
              <span className="text-[13px] sm:text-[15px] font-medium text-[#9AA6B2]">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}