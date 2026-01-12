import React from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { LazyMotion, domAnimation } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <LanguageProvider>
        <div className="min-h-screen bg-slate-950 antialiased">
          {children}
        </div>
      </LanguageProvider>
    </LazyMotion>
  );
}