import React from 'react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[#1F2630] bg-[#11161C]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div>
            <span className="text-[14px] sm:text-[15px] font-semibold text-[#E8EEF5] tracking-tight">GrantLinker</span>
            <p className="text-[12px] sm:text-[13px] text-[#9AA6B2]/60 mt-2 sm:mt-3 leading-relaxed max-w-[240px]">
              Infraestructura inteligente para organizaciones que necesitan asegurar financiamiento y escalar operaciones.
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#9AA6B2]/40 uppercase tracking-wider mb-4">Navegación</p>
            <ul className="space-y-2.5">
              {[
                { id: 'producto', label: 'Producto' },
                { id: 'planes', label: 'Planes' },
                { id: 'diagnostico', label: 'Diagnóstico' },
                { id: 'contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-[13px] text-[#9AA6B2] hover:text-[#E8EEF5] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] text-[#9AA6B2]/40 uppercase tracking-wider mb-4">Contacto</p>
            <p className="text-[13px] text-[#9AA6B2]">hello@grantlinker.com</p>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1F2630]">
          <p className="text-[12px] text-[#9AA6B2]/30">
            &copy; {new Date().getFullYear()} GrantLinker. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}