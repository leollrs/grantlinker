import React from "react";

export default function TrustStrip() {
  const sectors = ["Clínicas", "ONGs", "Municipios", "Empresas", "Educación"];

  return (
    <section className="py-20 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-8">
        <p className="text-center text-[13px] text-[#9AA6B2]/60 uppercase tracking-wider mb-12">
          Organizaciones que ya automatizan con GrantLinker
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6">
          {sectors.map((name) => (
            <div
              key={name}
              className="rounded-lg border border-white/5 bg-white/[0.01] px-8 py-4"
            >
              <span className="text-[15px] font-medium text-[#9AA6B2]">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}