import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';

const WEBHOOK_URL = 'https://leollrs.app.n8n.cloud/webhook/ccf88576-571c-4927-aeb1-4d4ea16cee21';

const translations = {
  en: {
    title: 'Get in Touch',
    subtitle: 'Ready to unlock funding opportunities? Let\'s talk.',
    fullName: 'Full Name',
    fullNamePlaceholder: 'John Doe',
    organization: 'Organization Name',
    organizationPlaceholder: 'Your Company Inc.',
    email: 'Email Address',
    emailPlaceholder: 'john@company.com',
    serviceType: 'Service Type',
    selectService: 'Select a service',
    grantConsulting: 'Grant Consulting',
    techAutomation: 'Technology & Automation',
    both: 'Both Services',
    message: 'Message (Optional)',
    messagePlaceholder: 'Tell us about your project or questions...',
    submit: 'Send Message',
    sending: 'Sending...',
    successTitle: 'Message Sent!',
    successMessage: 'Thank you for reaching out. We\'ll get back to you within 24 hours.',
    errorTitle: 'Something went wrong',
    errorMessage: 'Please try again or contact us directly.',
    tryAgain: 'Try Again',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address'
  },
  es: {
    title: 'Contáctenos',
    subtitle: '¿Listo para desbloquear oportunidades de financiamiento? Hablemos.',
    fullName: 'Nombre Completo',
    fullNamePlaceholder: 'Juan Pérez',
    organization: 'Nombre de la Organización',
    organizationPlaceholder: 'Su Empresa S.A.',
    email: 'Correo Electrónico',
    emailPlaceholder: 'juan@empresa.com',
    serviceType: 'Tipo de Servicio',
    selectService: 'Seleccione un servicio',
    grantConsulting: 'Consultoría de Subvenciones',
    techAutomation: 'Tecnología y Automatización',
    both: 'Ambos Servicios',
    message: 'Mensaje (Opcional)',
    messagePlaceholder: 'Cuéntenos sobre su proyecto o preguntas...',
    submit: 'Enviar Mensaje',
    sending: 'Enviando...',
    successTitle: '¡Mensaje Enviado!',
    successMessage: 'Gracias por contactarnos. Le responderemos en 24 horas.',
    errorTitle: 'Algo salió mal',
    errorMessage: 'Por favor intente de nuevo o contáctenos directamente.',
    tryAgain: 'Intentar de Nuevo',
    required: 'Este campo es requerido',
    invalidEmail: 'Por favor ingrese un correo electrónico válido'
  }
};

const sanitize = (str) => {
  if (!str) return '';
  return str.trim().slice(0, 1000).replace(/<[^>]*>/g, '');
};

export default function ContactForm({ language }) {
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    serviceType: '',
    message: '',
    honeypot: ''
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = t.required;
    }
    if (!formData.organization.trim()) {
      newErrors.organization = t.required;
    }
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    if (!formData.serviceType) {
      newErrors.serviceType = t.required;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    // Honeypot check - silently succeed if filled
    if (formData.honeypot) {
      setStatus('success');
      return;
    }
    
    setStatus('loading');
    
    const payload = {
      fullName: sanitize(formData.fullName),
      organization: sanitize(formData.organization),
      email: sanitize(formData.email),
      serviceType: formData.serviceType,
      message: sanitize(formData.message),
      honeypot: formData.honeypot,
      language: language,
      submittedAt: new Date().toISOString()
    };
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({
          fullName: '',
          organization: '',
          email: '',
          serviceType: '',
          message: '',
          honeypot: ''
        });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  
  const resetForm = () => {
    setStatus('idle');
    setErrors({});
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12 px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-3">{t.successTitle}</h3>
            <p className="text-zinc-400">{t.successMessage}</p>
          </motion.div>
        ) : status === 'error' ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12 px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
            >
              <AlertCircle className="w-10 h-10 text-red-400" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-3">{t.errorTitle}</h3>
            <p className="text-zinc-400 mb-6">{t.errorMessage}</p>
            <Button
              onClick={resetForm}
              className="bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              {t.tryAgain}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t.title}</h2>
              <p className="text-zinc-400">{t.subtitle}</p>
            </div>
            
            {/* Honeypot - hidden from users */}
            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={(e) => handleChange('honeypot', e.target.value)}
              className="absolute opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
            />
            
            <div className="space-y-5">
              <div>
                <Label htmlFor="fullName" className="text-zinc-300 mb-2 block">
                  {t.fullName} <span className="text-emerald-400">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder={t.fullNamePlaceholder}
                  maxLength={100}
                  className={`bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl h-12 focus:border-emerald-500 focus:ring-emerald-500/20 ${
                    errors.fullName ? 'border-red-500' : ''
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="organization" className="text-zinc-300 mb-2 block">
                  {t.organization} <span className="text-emerald-400">*</span>
                </Label>
                <Input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  placeholder={t.organizationPlaceholder}
                  maxLength={150}
                  className={`bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl h-12 focus:border-emerald-500 focus:ring-emerald-500/20 ${
                    errors.organization ? 'border-red-500' : ''
                  }`}
                />
                {errors.organization && (
                  <p className="text-red-400 text-sm mt-1">{errors.organization}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email" className="text-zinc-300 mb-2 block">
                  {t.email} <span className="text-emerald-400">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder={t.emailPlaceholder}
                  maxLength={100}
                  className={`bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl h-12 focus:border-emerald-500 focus:ring-emerald-500/20 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="serviceType" className="text-zinc-300 mb-2 block">
                  {t.serviceType} <span className="text-emerald-400">*</span>
                </Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => handleChange('serviceType', value)}
                >
                  <SelectTrigger 
                    className={`bg-zinc-800/50 border-zinc-700 text-white rounded-xl h-12 focus:border-emerald-500 focus:ring-emerald-500/20 ${
                      errors.serviceType ? 'border-red-500' : ''
                    } ${!formData.serviceType ? 'text-zinc-500' : ''}`}
                  >
                    <SelectValue placeholder={t.selectService} />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="grant_consulting" className="text-zinc-200 focus:bg-zinc-700 focus:text-white">
                      {t.grantConsulting}
                    </SelectItem>
                    <SelectItem value="tech_automation" className="text-zinc-200 focus:bg-zinc-700 focus:text-white">
                      {t.techAutomation}
                    </SelectItem>
                    <SelectItem value="both" className="text-zinc-200 focus:bg-zinc-700 focus:text-white">
                      {t.both}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.serviceType && (
                  <p className="text-red-400 text-sm mt-1">{errors.serviceType}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="message" className="text-zinc-300 mb-2 block">
                  {t.message}
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder={t.messagePlaceholder}
                  maxLength={1000}
                  rows={4}
                  className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl focus:border-emerald-500 focus:ring-emerald-500/20 resize-none"
                />
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.sending}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  {t.submit}
                </span>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}