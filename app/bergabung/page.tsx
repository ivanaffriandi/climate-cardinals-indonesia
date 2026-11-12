'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';
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

  const selectRoleAndScroll = (roleValue: string) => {
    setFormData((prev) => ({ ...prev, role: roleValue }));
    const formElem = document.getElementById('form-pendaftaran');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role) {
      const roleSection = document.getElementById('role-selector');
      if (roleSection) {
        roleSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

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
    }, 600);
  };

  return (
    <div className="text-white min-h-[calc(100vh-80px)] flex flex-col justify-between bg-transparent">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-14 md:py-24 w-full space-y-24">
        
        {/* 1. Header / Intro — Tipografi Editorial Bersih */}
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 block">
              {t.join.tag}
            </span>
            <span className="text-white/30">•</span>
            <a
              href="https://www.climatecardinals.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-1 transition-colors underline underline-offset-4"
            >
              <span>climatecardinals.org</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
            {t.join.title}
          </h1>

          <div className="flex items-start gap-4 pt-2">
            <div className="w-12 h-px bg-white/40 mt-3.5 shrink-0" />
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light max-w-2xl">
              {t.join.subtitle}
            </p>
          </div>
        </div>

        {/* 2. Daftar Peran (Editorial Hairline Rows, Tanpa Card) */}
        <div className="space-y-6 pt-4 border-t border-white/15">
          <div className="flex items-center justify-between pb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 block">
              {t.join.rolesTag}
            </span>
            <span className="text-[11px] font-mono text-white/40">
              01 — {String(t.join.roleDescriptions.length).padStart(2, '0')}
            </span>
          </div>

          <div className="divide-y divide-white/15 border-b border-white/15">
            {t.join.roleDescriptions.map((role, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const matchedRole = t.join.roles[idx]?.value || '';

              return (
                <div
                  key={idx}
                  className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-white/[0.02]"
                >
                  {/* Nomor Urut */}
                  <div className="md:col-span-2 font-mono text-2xl md:text-3xl text-white/30 font-light">
                    {num}
                  </div>

                  {/* Judul Peran */}
                  <div className="md:col-span-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {role.title}
                    </h3>
                  </div>

                  {/* Deskripsi & Quick Action */}
                  <div className="md:col-span-6 space-y-4">
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                      {role.desc}
                    </p>

                    {matchedRole && (
                      <button
                        type="button"
                        onClick={() => selectRoleAndScroll(matchedRole)}
                        className="text-xs uppercase font-mono tracking-widest text-white/70 hover:text-white flex items-center gap-2 border-b border-white/30 hover:border-white pb-0.5 transition-all cursor-pointer group"
                      >
                        <span>{t.join.selectRoleBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Formulir Pendaftaran (Minimalis Garis Bawah, Tanpa Card, Tanpa Pillbar) */}
        <div id="form-pendaftaran" className="pt-4 border-t border-white/15 space-y-10 max-w-3xl scroll-mt-28">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 block">
              {t.join.formTitle}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.join.title}
            </h2>
          </div>

          {submitted ? (
            <div className="py-8 space-y-6">
              <div className="w-12 h-12 flex items-center justify-center border border-white/30 text-white">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t.join.successTitle}
              </h3>
              <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl">
                {t.join.successDesc}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase font-mono tracking-widest text-white hover:text-white/80 border-b border-white pb-1 transition-colors cursor-pointer"
                >
                  {t.join.resetBtn} →
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Nama Lengkap & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-white/60 group-focus-within:text-white transition-colors block">
                    {t.join.fieldName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.join.fieldNamePlaceholder}
                    className="w-full bg-transparent border-0 border-b border-white/25 focus:border-white focus:ring-0 rounded-none px-0 py-3 text-base sm:text-lg text-white placeholder:text-white/25 outline-none transition-colors"
                  />
                </div>

                <div className="group space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-white/60 group-focus-within:text-white transition-colors block">
                    {t.join.fieldEmail} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.join.fieldEmailPlaceholder}
                    className="w-full bg-transparent border-0 border-b border-white/25 focus:border-white focus:ring-0 rounded-none px-0 py-3 text-base sm:text-lg text-white placeholder:text-white/25 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Kota / Domisili */}
              <div className="group space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-widest text-white/60 group-focus-within:text-white transition-colors block">
                  {t.join.fieldCity} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder={t.join.fieldCityPlaceholder}
                  className="w-full bg-transparent border-0 border-b border-white/25 focus:border-white focus:ring-0 rounded-none px-0 py-3 text-base sm:text-lg text-white placeholder:text-white/25 outline-none transition-colors"
                />
              </div>

              {/* Pemilihan Peran — Minimalist Sharp Tiles (Bukan Select Dropdown Bawaan OS, Bukan Pillbar) */}
              <div id="role-selector" className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-white/60 block">
                    {t.join.fieldRole} *
                  </label>
                  {!formData.role && (
                    <span className="text-[11px] font-mono text-white/40">
                      (Wajib dipilih)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {t.join.roles.map((r) => {
                    const isSelected = formData.role === r.value;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: r.value })}
                        className={`text-left px-4 py-3.5 text-xs font-mono tracking-wider uppercase transition-all duration-150 cursor-pointer rounded-none border flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-white text-[#16276B] font-bold border-white'
                            : 'bg-transparent text-white/75 border-white/20 hover:border-white/60 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{r.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Motivasi Singkat */}
              <div className="group space-y-2 pt-2">
                <label className="text-[11px] font-mono uppercase tracking-widest text-white/60 group-focus-within:text-white transition-colors block">
                  {t.join.fieldMotivation} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder={t.join.fieldMotivationPlaceholder}
                  className="w-full bg-transparent border-0 border-b border-white/25 focus:border-white focus:ring-0 rounded-none px-0 py-3 text-base sm:text-lg text-white placeholder:text-white/25 outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button (Sharp Editorial Geometry, NO PILLBAR) */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-white text-[#16276B] hover:bg-white/90 disabled:opacity-50 text-xs font-bold uppercase tracking-widest px-10 py-4 transition-all inline-flex items-center justify-center gap-4 cursor-pointer rounded-none group"
                >
                  <span>{submitting ? t.join.submittingBtn : t.join.submitBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>

      {/* Footer — Strictly Single Line */}
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
              <span>@climatecardinals.id</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
