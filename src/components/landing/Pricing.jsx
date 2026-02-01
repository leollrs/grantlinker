import React from 'react';
import { Button } from '@/components/ui/button';

const ROW1 = [
  {
    name: 'Recepcionista IA',
    price: 'Desde $199/mes',
    features: [
      'Atención de llamadas 24/7',
      'Agendamiento automático',
      'Transferencia inteligente',
    ],
  },
  {
    name: 'Sistema Operativo Básico',
    price: '$599/mes',
    popular: true,
    features: [
      'Automatización de workflows',
      'CRM integrado',
      'Chatbot con IA',
      'Recordatorios automáticos',
      'Soporte prioritario',
    ],
  },
  {
    name: 'Presencia + Automatización',
    price: '$997 instalación + $599/mes',
    features: [
      'Sitio web profesional',
      'Sistema de automatización',
      'Integraciones personalizadas',
      'Soporte dedicado',
    ],
  },
];

const ROW2 = [
  {
    name: 'Implementación Completa',
    price: 'Desde $2,499',
    features: [
      'Infraestructura digital completa',
      'Automatización end-to-end',
      'Inteligencia de subvenciones',
      'Onboarding personalizado',
    ],
  },
  {
    name: 'Desarrollo Institucional',
    price: 'Desde $9,999+',
    enterprise: true,
    features: [
      'Arquitectura de sistemas completa',
      'Equipo dedicado de implementación',
      'SLA garantizado',
      'Solución enterprise a medida',
    ],
  },
];

function PlanCard({ plan }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`relative flex flex-col p-7 rounded-xl ${
        plan.popular
          ? 'bg-[#151B22] border-2 border-emerald-600/60'
          : plan.enterprise
          ? 'bg-[#11161C] border border-[#1F2630]'
          : 'bg-[#151B22] border border-[#1F2630]'
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-2.5 left-6 px-2.5 py-0.5 bg-emerald-600 text-white text-[11px] font-medium rounded-md">
          Más popular
        </span>
      )}

      <h3 className="text-[14px] font-semibold text-[#E8EEF5] mb-1">{plan.name}</h3>
      <p className="text-[13px] text-[#9AA6B2] mb-6">{plan.price}</p>

      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="text-[13px] text-[#9AA6B2]/70 flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-[#9AA6B2]/40 flex-shrink-0 mt-1.5" />
            {f}
          </li>
        ))}
      </ul>

      <Button
        onClick={() => scrollTo('diagnostico')}
        className={`w-full py-2.5 h-auto text-[13px] font-medium rounded-lg ${
          plan.popular
            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
            : plan.enterprise
            ? 'bg-[#1F2630] hover:bg-[#2A3441] text-[#E8EEF5]'
            : 'bg-[#1F2630] hover:bg-[#2A3441] text-[#E8EEF5]'
        }`}
      >
        {plan.enterprise ? 'Contactar' : 'Agendar llamada'}
      </Button>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="planes" className="py-28 md:py-40 border-t border-[#1F2630]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[36px] sm:text-[44px] font-semibold text-[#E8EEF5] tracking-tight leading-[1.1] mb-4">
          Planes
        </h2>
        <p className="text-[15px] text-[#9AA6B2] mb-16 max-w-lg">
          Infraestructura a la medida de tu organización. Sin contratos largos. Escala cuando lo necesites.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {ROW1.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {ROW2.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
