import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0B0F14]">
      {/* Header */}
      <header className="border-b border-[#1F2630] bg-[#11161C]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6">
          <Link
            to={createPageUrl('Home')}
            className="inline-flex items-center gap-2 text-[14px] text-[#9AA6B2] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <h1 className="text-[36px] sm:text-[48px] font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-[14px] text-[#9AA6B2] mb-12">
          Last updated: 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8">
          {/* Intro */}
          <div className="border-l-2 border-emerald-600 pl-6">
            <p className="text-[16px] text-[#E8EEF5] leading-relaxed">
              GrantLinker CRM ("we", "our", or "us") provides business management software to help businesses manage appointments, clients, and operations.
            </p>
          </div>

          {/* Information We Collect */}
          <section>
            <h2 className="text-[24px] font-bold text-white mb-4">
              Information We Collect
            </h2>
            <p className="text-[15px] text-[#9AA6B2] leading-relaxed mb-3">
              We may collect information you provide directly, including:
            </p>
            <ul className="space-y-2 text-[15px] text-[#9AA6B2] ml-6">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Name</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Email address</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Business information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Appointment and client data entered into the app</span>
              </li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-[24px] font-bold text-white mb-4">
              How We Use Information
            </h2>
            <p className="text-[15px] text-[#9AA6B2] leading-relaxed mb-3">
              We use information to:
            </p>
            <ul className="space-y-2 text-[15px] text-[#9AA6B2] ml-6">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Provide and operate the app</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Improve features and performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Provide customer support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Communicate service updates</span>
              </li>
            </ul>
          </section>

          {/* Data Storage */}
          <section>
            <h2 className="text-[24px] font-bold text-white mb-4">
              Data Storage
            </h2>
            <p className="text-[15px] text-[#9AA6B2] leading-relaxed">
              Information may be stored securely using third-party cloud providers that follow industry security standards.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-[24px] font-bold text-white mb-4">
              Data Sharing
            </h2>
            <p className="text-[15px] text-[#9AA6B2] leading-relaxed">
              We do not sell personal information. We only share data with service providers necessary to operate the application (such as hosting or analytics providers).
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-[24px] font-bold text-white mb-4">
              Security
            </h2>
            <p className="text-[15px] text-[#9AA6B2] leading-relaxed">
              We implement reasonable safeguards to protect information.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-[24px] font-bold text-white mb-4">
              Your Rights
            </h2>
            <p className="text-[15px] text-[#9AA6B2] leading-relaxed">
              You may request deletion of your data by contacting us.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-[#1F2630] pt-8">
            <h2 className="text-[24px] font-bold text-white mb-4">
              Contact
            </h2>
            <p className="text-[15px] text-[#9AA6B2] leading-relaxed">
              For questions regarding this policy, contact:{' '}
              <a href="mailto:support@grantlinker.com" className="text-emerald-500 hover:text-emerald-400 transition-colors">
                support@grantlinker.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}