import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const WEBHOOK_URL = 'https://leollrs.app.n8n.cloud/webhook/ccf88576-571c-4927-aeb1-4d4ea16cee21';

const SYSTEM_OPTIONS = [
  'Recepcionista IA',
  'Sistema Operativo Básico',
  'Presencia + Automatización',
  'Implementación Completa',
  'Desarrollo Institucional',
  'No estoy seguro',
];

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', organizacion: '', email: '', sistema: '', mensaje: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          type: 'contact',
          submittedAt: new Date().toISOString(),
          source: 'grantlinker-contact',
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-lg bg-[#0B0F14] border border-[#1F2630] text-[14px] text-[#E8EEF5] placeholder-[#9AA6B2]/40 focus:outline-none focus:border-emerald-600/50 transition-colors';

  return (
    <section id="contacto" className="py-16 sm:py-24 md:py-28 lg:py-40 border-t border-[#1F2630]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="rounded-xl border border-[#1F2630] bg-[#11161C] overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left */}
            <div className="p-8 sm:p-10 md:p-12">
              <h2 className="text-[32px] sm:text-[36px] font-bold text-white tracking-tight leading-[1.1] mb-4">
                Hablemos
              </h2>
              <p className="text-[16px] text-[#9AA6B2] leading-relaxed mb-8 max-w-md">
                Cuéntanos sobre tu organización. Te contactamos con una propuesta en menos de 24 horas.
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-emerald-500/10 p-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#9AA6B2] uppercase tracking-wider mb-1">Email</p>
                    <p className="text-[15px] text-white font-medium">hello@grantlinker.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#9AA6B2] uppercase tracking-wider mb-1">Respuesta</p>
                    <p className="text-[15px] text-white font-medium">{"<"} 24 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-purple-500/10 p-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#9AA6B2] uppercase tracking-wider mb-1">Ubicación</p>
                    <p className="text-[15px] text-white font-medium">Puerto Rico</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-500/10 p-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#9AA6B2] uppercase tracking-wider mb-1">Consulta</p>
                    <p className="text-[15px] text-white font-medium">Llamada gratuita</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="border-t md:border-t-0 md:border-l border-[#1F2630] p-8 sm:p-10 md:p-12">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="rounded-full bg-emerald-500/10 p-4 mb-4">
                    <div className="h-8 w-8 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[22px] font-bold text-white mb-2">Mensaje enviado</p>
                  <p className="text-[14px] text-[#9AA6B2]">Te contactaremos pronto.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre *"
                    required
                    value={form.nombre}
                    onChange={(e) => update('nombre', e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Organización"
                    value={form.organizacion}
                    onChange={(e) => update('organizacion', e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputClass}
                  />
                  <select
                    value={form.sistema}
                    onChange={(e) => update('sistema', e.target.value)}
                    className={`${inputClass} ${!form.sistema ? 'text-[#9AA6B2]/40' : ''}`}
                  >
                    <option value="">Tipo de sistema</option>
                    {SYSTEM_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Cuéntanos sobre tu situación (opcional)"
                    rows={4}
                    value={form.mensaje}
                    onChange={(e) => update('mensaje', e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-[14px] font-semibold rounded-xl shadow-lg shadow-emerald-900/20"
                  >
                    {sending ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>
                  <p className="text-[11px] text-[#9AA6B2]/40 text-center pt-2">
                    ✓ Datos privados y seguros • ✓ Sin spam
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}