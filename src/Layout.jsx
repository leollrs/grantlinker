import React from 'react';
import { LanguageProvider } from './components/LanguageContext';

export default function Layout({ children }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-950 antialiased">
        {children}
      </div>
    </LanguageProvider>
  );
}