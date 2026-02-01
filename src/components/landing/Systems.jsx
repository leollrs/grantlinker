import React from 'react';

const SYSTEMS = [
  {
    title: 'Inteligencia de Subvenciones',
    desc: 'Encontramos, filtramos y apoyamos la aplicación a grants con IA.',
    bullets: ['Búsqueda y matching automático', 'Análisis de elegibilidad', 'Soporte en propuestas'],
  },
  {
    title: 'Automatización con IA',
    desc: 'Workflows, CRM, chatbots, recordatorios y procesos automáticos.',
    bullets: ['Flujos de trabajo inteligentes', 'Integración con CRM', 'Chatbots y recordatorios'],
  },
  {
    title: 'Infraestructura Digital',
    desc: 'Sitios web, portales, formularios e integraciones.',
    price: 'Desde $247 configuración + $20/mes',
    bullets: ['Sitios web profesionales', 'Portales y formularios', 'Integraciones a medida'],
  },
  {
    title: 'Recepcionista IA',
    desc: 'Atiende llamadas y agenda citas 24/7.',
    price: 'Desde $199/mes',
    bullets: ['Atención 24/7 automática', 'Agendamiento inteligente', 'Transferencia de llamadas'],
  },
];

export default function Systems() {
  return (
    <section id="sistemas" className="py-28 md:py-40">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
          <div className="lg:col-span-2">
            <h2 className="text-[36px] sm:text-[44px] font-semibold text-[#E8EEF5] tracking-tight leading-[1.1] mb-5">
              Sistemas
            </h2>
            <p className="text-[15px] text-[#9AA6B2] leading-relaxed max-w-sm mb-6">
              No vendemos proyectos. Construimos sistemas. Infraestructura modular diseñada para organizaciones que necesitan operar a escala. Cada sistema se integra con los demás.
            </p>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {SYSTEMS.map((system) => (
              <div
                key={system.title}
                className="p-7 rounded-xl bg-[#151B22] border border-[#1F2630]"
              >
                <h3 className="text-[15px] font-semibold text-[#E8EEF5] mb-2">{system.title}</h3>
                <p className="text-[13px] text-[#9AA6B2] leading-relaxed mb-5">{system.desc}</p>

                <ul className="space-y-2 mb-4">
                  {system.bullets.map((b) => (
                    <li key={b} className="text-[13px] text-[#9AA6B2]/70 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#9AA6B2]/40 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                {system.price && (
                  <p className="text-[12px] text-[#9AA6B2]/50 pt-3 border-t border-[#1F2630]">{system.price}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
