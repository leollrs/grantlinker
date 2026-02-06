import React from "react";

export default function TrustStrip() {
  return (
    <section className="py-16 border-t border-white/5">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="text-center text-[12px] text-[#9AA6B2] uppercase tracking-wider mb-10">
          Organizaciones que ya automatizan con GrantLinker
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {["Clínicas", "ONGs", "Municipios", "Empresas", "Educación"].map((name) => (
            <div
              key={name}
              className="flex items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] px-8 py-4 backdrop-blur"
            >
              <span className="text-[14px] font-medium text-[#9AA6B2]">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}