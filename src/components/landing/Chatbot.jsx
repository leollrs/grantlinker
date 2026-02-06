import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WEBHOOK_URL = 'https://leollrs.app.n8n.cloud/webhook/ccf88576-571c-4927-aeb1-4d4ea16cee21';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('initial'); // initial, form, sent
  const [sending, setSending] = useState(false);

  const handleQuickAction = (action) => {
    if (action === 'diagnostic') {
      const el = document.getElementById('diagnostico');
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
        window.scrollTo({ top, behavior: 'smooth' });
        setIsOpen(false);
      }
    } else if (action === 'contact') {
      setStep('form');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name,
          email,
          mensaje: message,
          type: 'chatbot',
          submittedAt: new Date().toISOString(),
          source: 'grantlinker-chatbot',
        }),
      });
      setStep('sent');
    } catch {
      setStep('sent');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-emerald-600 hover:bg-emerald-500 p-4 shadow-2xl transition-all hover:scale-105"
        aria-label="Chat"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-[380px] rounded-2xl border border-white/10 bg-[#11161C] shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-500/20 p-2">
                <MessageCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-white">GrantLinker</p>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[11px] text-[#9AA6B2]">En línea</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 max-h-[400px] overflow-y-auto">
            {step === 'initial' && (
              <div className="space-y-4">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-[14px] text-white leading-relaxed mb-4">
                    ¡Hola! ¿Cómo podemos ayudarte hoy?
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleQuickAction('diagnostic')}
                    className="w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-[13px] text-white transition-all"
                  >
                    📊 Análisis de diagnóstico
                  </button>
                  <button
                    onClick={() => handleQuickAction('contact')}
                    className="w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-[13px] text-white transition-all"
                  >
                    💬 Enviar mensaje
                  </button>
                </div>
              </div>
            )}

            {step === 'form' && (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="rounded-xl bg-white/5 p-4 mb-4">
                  <p className="text-[13px] text-white leading-relaxed">
                    Déjanos tus datos y te contactaremos pronto.
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Nombre *"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0F14] border border-white/10 text-[13px] text-white placeholder-[#9AA6B2]/40 focus:outline-none focus:border-emerald-600/50"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0F14] border border-white/10 text-[13px] text-white placeholder-[#9AA6B2]/40 focus:outline-none focus:border-emerald-600/50"
                />
                <textarea
                  placeholder="Mensaje (opcional)"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0F14] border border-white/10 text-[13px] text-white placeholder-[#9AA6B2]/40 focus:outline-none focus:border-emerald-600/50 resize-none"
                />

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('initial')}
                    className="flex-1 border-white/10 text-[#9AA6B2] hover:text-white"
                  >
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    disabled={sending}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    {sending ? 'Enviando...' : 'Enviar'}
                  </Button>
                </div>
              </form>
            )}

            {step === 'sent' && (
              <div className="text-center py-8">
                <div className="rounded-full bg-emerald-500/20 p-3 inline-block mb-4">
                  <div className="h-8 w-8 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[16px] font-semibold text-white mb-2">
                  ¡Mensaje enviado!
                </p>
                <p className="text-[13px] text-[#9AA6B2] mb-6">
                  Te contactaremos pronto.
                </p>
                <Button
                  onClick={() => {
                    setStep('initial');
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  variant="outline"
                  className="border-white/10 text-white"
                >
                  Volver al inicio
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}