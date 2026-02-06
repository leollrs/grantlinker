import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { id: 'producto', label: 'Producto' },
  { id: 'planes', label: 'Planes' },
  { id: 'diagnostico', label: 'Diagnóstico' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#11161C]/90 backdrop-blur-md border-b border-[#1F2630]'
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-[15px] font-semibold text-[#E8EEF5] tracking-tight"
            >
              GrantLinker
            </a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-[13px] text-[#9AA6B2] hover:text-[#E8EEF5] transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollTo('contacto')}
                className="text-[13px] font-medium px-4 py-2 h-auto bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
              >
                Agendar llamada
              </Button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#9AA6B2] hover:text-[#E8EEF5] transition-colors"
              aria-label="Menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-px bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                <span className={`block h-px bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
          <div className="relative pt-20 px-6 flex flex-col gap-0.5 bg-black">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left px-4 py-4 text-[15px] text-[#9AA6B2] hover:text-[#E8EEF5] border-b border-[#1F2630] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo('contacto')}
              className="mt-6 w-full py-3 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg"
            >
              Agendar llamada
            </Button>
          </div>
        </div>
      )}
    </>
  );
}