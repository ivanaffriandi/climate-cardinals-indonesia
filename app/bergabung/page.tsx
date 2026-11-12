'use client';

import React, { useState } from 'react';
import { Instagram, CheckCircle2, ArrowUpRight, Send } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function BergabungPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    role: '',
    motivation: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        city: '',
        role: '',
        motivation: '',
      });
    }, 700);
  };

  return (
    <div className="text-white min-h-[calc(100vh-80px)] flex flex-col justify-between bg-transparent">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 md:py-20 w-full space-y-20">
        
        {/* Header Title */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-white/70 block">
              {t.join.tag}
            </span>
            <span className="text-white/40">•</span>
            <a
              href="https://www.climatecardinals.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/70 hover:text-white flex items-center gap-1 transition-colors underline"
            >
              <span>climatecardinals.org</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            {t.join.title}
          </h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light pt-2 max-w-2xl">
            {t.join.subtitle}
          </p>
        </div>

        {/* Roles Section — Editorial Minimalist Grid */}
        <div className="space-y-8 pt-8 border-t border-white/15">
          <span className="text-xs uppercase font-bold tracking-widest text-white/60 block">
            {t.join.rolesTag}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {t.join.roleDescriptions.map((role, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              return (
                <div key={idx} className="space-y-2.5">
                  <span className="text-2xl font-light text-white/40 block font-mono">
                    {num}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {role.title}
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed font-light">
                    {role.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Section */}
        <div className="pt-8 border-t border-white/15 space-y-8 max-w-3xl">
          <span className="text-xs uppercase font-bold tracking-widest text-white/60 block">
            {t.join.formTitle}
          </span>

          {submitted ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 sm:p-10 space-y-4">
              <div className="flex items-center gap-3 text-emerald-300">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <h3 className="text-xl font-bold text-white">{t.join.successTitle}</h3>
              </div>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                {t.join.successDesc}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-white text-black hover:bg-stone-100 text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full transition-all cursor-pointer"
              >
                Kirim Pendaftaran Lain / Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-semibold tracking-wider text-white/80 block">
                    {t.join.fieldName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.join.fieldNamePlaceholder}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-sm transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-semibold tracking-wider text-white/80 block">
                    {t.join.fieldEmail} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.join.fieldEmailPlaceholder}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* City */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-semibold tracking-wider text-white/80 block">
                    {t.join.fieldCity} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder={t.join.fieldCityPlaceholder}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-sm transition-all"
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-semibold tracking-wider text-white/80 block">
                    {t.join.fieldRole} *
                  </label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-stone-900 sm:bg-white/10 border border-white/20 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-sm transition-all [&>option]:bg-stone-900 [&>option]:text-white"
                  >
                    <option value="" disabled className="text-white/40">
                      {t.join.fieldRolePlaceholder}
                    </option>
                    {t.join.roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-semibold tracking-wider text-white/80 block">
                  {t.join.fieldMotivation} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder={t.join.fieldMotivationPlaceholder}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-sm transition-all resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-white text-black hover:bg-stone-100 disabled:opacity-60 text-xs sm:text-sm font-semibold px-8 py-3.5 rounded-full transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? t.join.submittingBtn : t.join.submitBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Strictly Single-Line Footnote */}
      <footer className="border-t border-white/15 py-4 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-row items-center justify-between text-[11px] sm:text-xs text-white/70 whitespace-nowrap gap-2">
          <span>{t.footnote.copyright}</span>
          
          <div className="flex items-center gap-3 sm:gap-5 text-white/80">
            <a
              href="https://instagram.com/climatecardinals.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@climatecardinals.id</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
