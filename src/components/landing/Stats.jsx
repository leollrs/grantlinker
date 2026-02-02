import React from 'react';

export default function Stats() {
  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-[#1F2630]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <p className="text-[28px] sm:text-[32px] font-semibold text-[#E8EEF5] mb-1">50+</p>
            <p className="text-[12px] sm:text-[13px] text-[#9AA6B2]/60">Organizaciones</p>
          </div>
          <div>
            <p className="text-[28px] sm:text-[32px] font-semibold text-[#E8EEF5] mb-1">95%</p>
            <p className="text-[12px] sm:text-[13px] text-[#9AA6B2]/60">Tasa de retención</p>
          </div>
          <div>
            <p className="text-[28px] sm:text-[32px] font-semibold text-[#E8EEF5] mb-1">$2M+</p>
            <p className="text-[12px] sm:text-[13px] text-[#9AA6B2]/60">Fondos asegurados</p>
          </div>
          <div>
            <p className="text-[28px] sm:text-[32px] font-semibold text-[#E8EEF5] mb-1">24/7</p>
            <p className="text-[12px] sm:text-[13px] text-[#9AA6B2]/60">Disponibilidad IA</p>
          </div>
        </div>
      </div>
    </section>
  );
}