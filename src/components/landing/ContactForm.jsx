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

const sanitize = (str) => {
  if (!str) return "";
  return String(str)
    .trim()
    .slice(0, 1000)
    .replace(/<[^>]*>/g, "");
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

export default function ContactForm() {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Keep your existing translation structure, but add safe fallbacks
  const ui = useMemo(() => {
    const formT = t?.("contact.form") || {};
    return {
      title: t?.("contact.title") || (language === "es" ? "Contáctanos" : "Get in Touch"),
      subtitle:
        t?.("contact.subtitle") ||
        (language === "es"
          ? "¿Listo para desbloquear oportunidades de financiamiento? Hablemos."
          : "Ready to unlock funding opportunities? Let's talk."),
      formT: {
        name: formT?.name || (language === "es" ? "Nombre Completo" : "Full Name"),
        org: formT?.org || (language === "es" ? "Nombre de la Organización" : "Organization Name"),
        email: formT?.email || (language === "es" ? "Correo Electrónico" : "Email Address"),
        service: formT?.service || (language === "es" ? "Tipo de Servicio" : "Service Type"),
        message: formT?.message || (language === "es" ? "Mensaje (opcional)" : "Message (optional)"),
        submit: formT?.submit || (language === "es" ? "Enviar Mensaje" : "Send Message"),
        sending: formT?.sending || (language === "es" ? "Enviando..." : "Sending..."),
        success:
          formT?.success ||
          (language === "es"
            ? "¡Mensaje enviado! Te responderemos pronto."
            : "Message sent! We’ll get back to you soon."),
        error:
          formT?.error ||
          (language === "es"
            ? "No se pudo enviar. Intenta de nuevo."
            : "Could not send. Please try again."),
        privacy:
          formT?.privacy ||
          (language === "es"
            ? "Respetamos tu privacidad. Tu información nunca será compartida."
            : "We respect your privacy. Your information will never be shared."),
        // If your translations have these, we’ll use them:
        serviceOptions: formT?.serviceOptions || {
          grant: language === "es" ? "Consultoría de Subvenciones" : "Grant Consulting",
          tech: language === "es" ? "Tecnología y Automatización" : "Technology & Automation",
          both: language === "es" ? "Ambos Servicios" : "Both Services",
        },
      },
      // Extra UI strings for the “nice” success/error cards:
      successTitle: language === "es" ? "¡Mensaje Enviado!" : "Message Sent!",
      successMessage:
        language === "es"
          ? "Gracias por contactarnos. Te responderemos en 24 horas."
          : "Thanks for reaching out. We’ll reply within 24 hours.",
      errorTitle: language === "es" ? "Algo salió mal" : "Something went wrong",
      errorMessage:
        language === "es"
          ? "Por favor intenta de nuevo o contáctanos directamente."
          : "Please try again or contact us directly.",
      tryAgain: language === "es" ? "Intentar de Nuevo" : "Try Again",
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
        selectService:
          language === "es" ? "Seleccione un servicio" : "Select a service",
      },
    };
  }, [t, language]);

  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    serviceType: "", // require selection
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: null }));
  };

  const validate = () => {
    const e = {};
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

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    // Honeypot: silent success so bots think it worked
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    setStatus("loading");

    const payload = {
      fullName: sanitize(formData.fullName).slice(0, 100),
      organization: sanitize(formData.organization).slice(0, 150),
      email: sanitize(formData.email).slice(0, 100),
      serviceType: formData.serviceType,
      message: sanitize(formData.message).slice(0, 1000),
      honeypot: formData.honeypot,
      language,
      submittedAt: new Date().toISOString(),
      source: "grantlinker-site",
    };

    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        setStatus("success");
        setFormData({
          fullName: "",
          organization: "",
          email: "",
          serviceType: "",
          message: "",
          honeypot: "",
        });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
              {ui.title}
            </h2>
            <p className="text-lg text-slate-400">{ui.subtitle}</p>
          </m.div>

          {/* Form Card */}
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
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
                    transition={{ delay: shouldReduceMotion ? 0 : 0.15, type: "spring", stiffness: 220 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </m.div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {ui.successTitle}
                  </h3>
                  <p className="text-zinc-400">{ui.successMessage}</p>
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
                    transition={{ delay: shouldReduceMotion ? 0 : 0.15, type: "spring", stiffness: 220 }}
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
                  {/* Honeypot (hidden) */}
                  <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) => handleChange("honeypot", e.target.value)}
                    className="absolute opacity-0 pointer-events-none"
                    tabIndex={-1}
                    autoComplete="off"
                  />

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
                      <Label
                        htmlFor="organization"
                        className="text-slate-300 mb-2 block"
                      >
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
                        <p className="text-red-400 text-sm mt-1">
                          {errors.organization}
                        </p>
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
                      onValueChange={(value) => handleChange("serviceType", value)}
                    >
                      <SelectTrigger
                        className={`bg-slate-900 border-slate-700 text-white rounded-xl h-12 focus:border-emerald-500 focus:ring-emerald-500/20 ${
                          errors.serviceType ? "border-red-500" : ""
                        } ${!formData.serviceType ? "text-slate-500" : ""}`}
                      >
                        <SelectValue placeholder={ui.placeholders.selectService} />
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
                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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