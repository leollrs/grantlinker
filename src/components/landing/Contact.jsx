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
            <div className="p-6 sm:p-8 md:p-12">
              <h2 className="text-[26px] sm:text-[28px] md:text-[36px] font-semibold text-[#E8EEF5] tracking-tight leading-[1.1] mb-3 sm:mb-4">
                Hablemos
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#9AA6B2] leading-relaxed mb-6 sm:mb-8 max-w-sm">
                Cuéntanos sobre tu organización y te contactamos con una propuesta personalizada.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-[12px] text-[#9AA6B2]/40 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-[14px] text-[#E8EEF5]">hello@grantlinker.com</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#9AA6B2]/40 uppercase tracking-wider mb-1">Tiempo de respuesta</p>
                  <p className="text-[14px] text-[#E8EEF5]">Menos de 24 horas</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="border-t md:border-t-0 md:border-l border-[#1F2630] p-6 sm:p-8 md:p-12">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <p className="text-[18px] sm:text-[20px] font-semibold text-[#E8EEF5] mb-2">Mensaje enviado</p>
                  <p className="text-[13px] sm:text-[14px] text-[#9AA6B2]">Te contactaremos pronto.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre"
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
                    placeholder="Email"
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
                    placeholder="Mensaje (opcional)"
                    rows={3}
                    value={form.mensaje}
                    onChange={(e) => update('mensaje', e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 sm:py-3 h-auto bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg"
                  >
                    {sending ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>
                  <p className="text-[10px] sm:text-[11px] text-[#9AA6B2]/30 text-center">
                    Tu información se mantiene privada y segura.
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