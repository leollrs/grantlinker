import React, { useMemo, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const WEBHOOK_URL =
  "https://leollrs.app.n8n.cloud/webhook/ccf88576-571c-4927-aeb1-4d4ea16cee21";

type Status = "idle" | "loading" | "success" | "error";

type ServiceType = "" | "grant_consulting" | "tech_automation" | "both";

type FormData = {
  fullName: string;
  organization: string;
  email: string;
  serviceType: ServiceType;
  message: string;
  honeypot: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const sanitize = (value: unknown, max = 1000): string => {
  if (value == null) return "";
  return String(value)
    .trim()
    .slice(0, max)
    .replace(/<[^>]*>/g, "");
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

function safeObj<T extends object>(maybe: unknown): Partial<T> {
  return maybe && typeof maybe === "object" ? (maybe as Partial<T>) : {};
}

export default function ContactForm() {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const ui = useMemo(() => {
    // t("contact.form") might be an object, string, or undefined depending on your i18n setup
    const rawForm = t?.("contact.form");
    const formT = safeObj<{
      name: string;
      org: string;
      email: string;
      service: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      privacy: string;
      serviceOptions: { grant: string; tech: string; both: string };
    }>(rawForm);

    const serviceOptions =
      (formT.serviceOptions &&
        typeof formT.serviceOptions === "object" &&
        formT.serviceOptions) ||
      {
        grant: language === "es" ? "Consultoría de Subvenciones" : "Grant Consulting",
        tech: language === "es" ? "Tecnología y Automatización" : "Technology & Automation",
        both: language === "es" ? "Ambos Servicios" : "Both Services",
      };

    return {
      kicker: language === "es" ? "Comienza hoy" : "Get Started Today",
      title: t?.("contact.title") || (language === "es" ? "Contáctanos" : "Get in Touch"),
      subtitle:
        t?.("contact.subtitle") ||
        (language === "es"
          ? "Cuéntanos qué necesitas y te respondemos rápido."
          : "Tell us what you need and we’ll reply quickly."),
      formT: {
        name: formT.name || (language === "es" ? "Nombre Completo" : "Full Name"),
        org: formT.org || (language === "es" ? "Nombre de la Organización" : "Organization Name"),
        email: formT.email || (language === "es" ? "Correo Electrónico" : "Email Address"),
        service: formT.service || (language === "es" ? "Tipo de Servicio" : "Service Type"),
        message: formT.message || (language === "es" ? "Mensaje (opcional)" : "Message (optional)"),
        submit: formT.submit || (language === "es" ? "Enviar Mensaje" : "Send Message"),
        sending: formT.sending || (language === "es" ? "Enviando..." : "Sending..."),
        success:
          formT.success ||
          (language === "es"
            ? "¡Mensaje enviado! Te responderemos pronto."
            : "Message sent! We’ll get back to you soon."),
        error:
          formT.error ||
          (language === "es"
            ? "No se pudo enviar. Intenta de nuevo."
            : "Could not send. Please try again."),
        privacy:
          formT.privacy ||
          (language === "es"
            ? "Respetamos tu privacidad. Tu información nunca será compartida."
            : "We respect your privacy. Your information will never be shared."),
        serviceOptions,
      },
      successTitle: language === "es" ? "¡Mensaje Enviado!" : "Message Sent!",
      successMessage:
        language === "es"
          ? "Gracias por contactarnos. Te responderemos en 24 horas."
          : "Thanks for reaching out. We’ll reply within 24 hours.",
      errorTitle: language === "es" ? "Algo salió mal" : "Something went wrong",
      errorMessage:
        language === "es"
          ? "Intenta otra vez o contáctanos directamente."
          : "Please try again or contact us directly.",
      tryAgain: language === "es" ? "Intentar de nuevo" : "Try Again",
      sendAnother: language === "es" ? "Enviar otro mensaje" : "Send Another",
      required: language === "es" ? "Este campo es requerido" : "This field is required",
      invalidEmail:
        language === "es"
          ? "Por favor ingresa un correo electrónico válido"
          : "Please enter a valid email address",
      placeholders: {
        fullName: language === "es" ? "Juan Pérez" : "John Doe",
        org: language === "es" ? "Su Empresa S.A." : "Your Company Inc.",
        email: language === "es" ? "juan@empresa.com" : "john@company.com",
        message:
          language === "es"
            ? "Cuéntanos sobre tu proyecto o preguntas..."
            : "Tell us about your project or questions...",
        selectService: language === "es" ? "Selecciona un servicio" : "Select a service",
      },
    };
  }, [t, language]);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    organization: "",
    email: "",
    serviceType: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (!formData.fullName.trim()) e.fullName = ui.required;
    if (!formData.organization.trim()) e.organization = ui.required;

    if (!formData.email.trim()) e.email = ui.required;
    else if (!isValidEmail(formData.email)) e.email = ui.invalidEmail;

    if (!formData.serviceType) e.serviceType = ui.required;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetToForm = () => {
    setStatus("idle");
    setErrors({});
  };

  const clearForm = () => {
    setFormData({
      fullName: "",
      organization: "",
      email: "",
      serviceType: "",
      message: "",
      honeypot: "",
    });
    setErrors({});
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    // Honeypot: silent success
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    setStatus("loading");

    const payload = {
      fullName: sanitize(formData.fullName, 100),
      organization: sanitize(formData.organization, 150),
      email: sanitize(formData.email, 100),
      serviceType: formData.serviceType,
      message: sanitize(formData.message, 1000),
      language,
      submittedAt: new Date().toISOString(),
      source: "grantlinker-site",
    };

    // Timeout so we don't hang forever
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (resp.ok) {
        setStatus("success");
        clearForm();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  // Make placeholder styling reliable: if no value, we show muted style in trigger
  const serviceTriggerTextClass =
    formData.serviceType ? "text-white" : "text-slate-500";

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 to-black"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/6 rounded-full blur-[140px] transform-gpu" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-[100px] transform-gpu" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-medium text-emerald-400 tracking-wider uppercase mb-4">
              {ui.kicker}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-50 mb-4">
              {ui.title}
            </h2>
            <p className="text-lg text-slate-300">{ui.subtitle}</p>
          </m.div>

          {/* Form Card */}
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.2,
            }}
            className="w-full max-w-lg mx-auto"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <m.div
                  key="success"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="text-center py-12 px-6 rounded-2xl border border-emerald-500/20 bg-slate-900/40"
                >
                  <m.div
                    initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.15,
                      type: "spring",
                      stiffness: 220,
                    }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </m.div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {ui.successTitle}
                  </h3>
                  <p className="text-zinc-400 mb-6">{ui.successMessage}</p>
                  <Button
                    onClick={() => {
                      resetToForm();
                      clearForm();
                    }}
                    className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl"
                  >
                    {ui.sendAnother}
                  </Button>
                </m.div>
              ) : status === "error" ? (
                <m.div
                  key="error"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="text-center py-12 px-6 rounded-2xl border border-red-500/20 bg-slate-900/40"
                >
                  <m.div
                    initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.15,
                      type: "spring",
                      stiffness: 220,
                    }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
                  >
                    <AlertCircle className="w-10 h-10 text-red-400" />
                  </m.div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {ui.errorTitle}
                  </h3>
                  <p className="text-zinc-400 mb-6">{ui.errorMessage}</p>
                  <Button
                    onClick={resetToForm}
                    className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl"
                  >
                    {ui.tryAgain}
                  </Button>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8"
                >
                  {/* Honeypot */}
                  <div className="sr-only" aria-hidden="true">
                    <Label htmlFor="website">Website</Label>
                    <input
                      id="website"
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) => handleChange("honeypot", e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-slate-300 mb-2 block">
                        {ui.formT.name} <span className="text-emerald-400">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        placeholder={ui.placeholders.fullName}
                        maxLength={100}
                        className={`bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 rounded-xl h-12 focus:border-emerald-500 focus:ring-emerald-500/20 ${
                          errors.fullName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="organization" className="text-slate-300 mb-2 block">
                        {ui.formT.org} <span className="text-emerald-400">*</span>
                      </Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleChange("organization", e.target.value)}
                        placeholder={ui.placeholders.org}
                        maxLength={150}
                        className={`bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 rounded-xl h-12 focus:border-emerald-500 focus:ring-emerald-500/20 ${
                          errors.organization ? "border-red-500" : ""
                        }`}
                      />
                      {errors.organization && (
                        <p className="text-red-400 text-sm mt-1">{errors.organization}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-300 mb-2 block">
                      {ui.formT.email} <span className="text-emerald-400">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder={ui.placeholders.email}
                      maxLength={100}
                      className={`bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 rounded-xl h-12 focus:border-emerald-500 focus:ring-emerald-500/20 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-slate-300 mb-2 block">
                      {ui.formT.service} <span className="text-emerald-400">*</span>
                    </Label>

                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => handleChange("serviceType", value as ServiceType)}
                    >
                      <SelectTrigger
                        className={`bg-slate-900 border-slate-700 rounded-xl h-12 focus:border-emerald-500 focus:ring-emerald-500/20 ${
                          errors.serviceType ? "border-red-500" : ""
                        }`}
                      >
                        <span className={serviceTriggerTextClass}>
                          <SelectValue placeholder={ui.placeholders.selectService} />
                        </span>
                      </SelectTrigger>

                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem
                          value="grant_consulting"
                          className="text-slate-200 focus:bg-slate-800 focus:text-white"
                        >
                          {ui.formT.serviceOptions.grant}
                        </SelectItem>
                        <SelectItem
                          value="tech_automation"
                          className="text-slate-200 focus:bg-slate-800 focus:text-white"
                        >
                          {ui.formT.serviceOptions.tech}
                        </SelectItem>
                        <SelectItem
                          value="both"
                          className="text-slate-200 focus:bg-slate-800 focus:text-white"
                        >
                          {ui.formT.serviceOptions.both}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {errors.serviceType && (
                      <p className="text-red-400 text-sm mt-1">{errors.serviceType}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-slate-300 mb-2 block">
                      {ui.formT.message}
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder={ui.placeholders.message}
                      maxLength={1000}
                      rows={4}
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:border-emerald-500 focus:ring-emerald-500/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-14 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-lg text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {ui.formT.sending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        {ui.formT.submit}
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-sm text-slate-500">
                    {ui.formT.privacy}
                  </p>
                </m.form>
              )}
            </AnimatePresence>
          </m.div>
        </div>
      </div>
    </section>
  );
}