'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, Mail, Instagram } from 'lucide-react';
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
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 md:py-20 w-full space-y-20">
        
        {/* 1. Header / Intro — Bersih, Tanpa Link Eksternal di Atas, Font Biasa */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/80 block">
            {t.join.tag}
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            {t.join.title}
          </h1>

          <div className="flex items-start gap-4 pt-2">
            <div className="w-12 h-px bg-white/40 mt-3.5 shrink-0" />
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-2xl">
              {t.join.subtitle}
            </p>
          </div>
        </div>

        {/* 2. Daftar Peran — Tulisan Jelas, Font Biasa, Tanpa Card */}
        <div className="space-y-6 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/80 block">
              {t.join.rolesTag}
            </span>
            <span className="text-xs font-semibold text-white/60">
              01 — {String(t.join.roleDescriptions.length).padStart(2, '0')}
            </span>
          </div>

          <div className="divide-y divide-white/20 border-b border-white/20">
            {t.join.roleDescriptions.map((role, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const matchedRole = t.join.roles[idx]?.value || '';

              return (
                <div
                  key={idx}
                  className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-white/[0.02]"
                >
                  {/* Nomor Urut (Font Biasa) */}
                  <div className="md:col-span-2 text-2xl sm:text-3xl text-white/60 font-bold">
                    {num}
                  </div>

                  {/* Judul Peran */}
                  <div className="md:col-span-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {role.title}
                    </h3>
                  </div>

                  {/* Deskripsi & Tombol Pilih */}
                  <div className="md:col-span-6 space-y-4">
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                      {role.desc}
                    </p>

                    {matchedRole && (
                      <button
                        type="button"
                        onClick={() => selectRoleAndScroll(matchedRole)}
                        className="text-xs uppercase font-bold tracking-wider text-white hover:text-white/80 flex items-center gap-2 border-b border-white/40 hover:border-white pb-0.5 transition-all cursor-pointer group"
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

        {/* 3. Formulir Pendaftaran — Garis Bawah Jelas, Tanpa Card, Tanpa Pillbar */}
        <div id="form-pendaftaran" className="pt-4 border-t border-white/20 space-y-10 max-w-3xl scroll-mt-28">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/80 block">
              {t.join.formTitle}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.join.title}
            </h2>
          </div>

          {submitted ? (
            <div className="py-8 space-y-6">
              <div className="w-12 h-12 flex items-center justify-center border border-white/40 text-white">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t.join.successTitle}
              </h3>
              <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-xl">
                {t.join.successDesc}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase font-bold tracking-wider text-white hover:text-white/80 border-b border-white pb-1 transition-colors cursor-pointer"
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
                  <label className="text-xs uppercase font-bold tracking-wider text-white/80 group-focus-within:text-white transition-colors block">
                    {t.join.fieldName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.join.fieldNamePlaceholder}
                    className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white focus:ring-0 rounded-none px-0 py-3 text-base sm:text-lg text-white placeholder:text-white/40 outline-none transition-colors"
                  />
                </div>

                <div className="group space-y-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/80 group-focus-within:text-white transition-colors block">
                    {t.join.fieldEmail} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.join.fieldEmailPlaceholder}
                    className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white focus:ring-0 rounded-none px-0 py-3 text-base sm:text-lg text-white placeholder:text-white/40 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Kota / Domisili */}
              <div className="group space-y-2">
                <label className="text-xs uppercase font-bold tracking-wider text-white/80 group-focus-within:text-white transition-colors block">
                  {t.join.fieldCity} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder={t.join.fieldCityPlaceholder}
                  className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white focus:ring-0 rounded-none px-0 py-3 text-base sm:text-lg text-white placeholder:text-white/40 outline-none transition-colors"
                />
              </div>

              {/* Pemilihan Peran — Tile Tajam Minimalis, Font Biasa, Sangat Jelas */}
              <div id="role-selector" className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/80 block">
                    {t.join.fieldRole} *
                  </label>
                  {!formData.role && (
                    <span className="text-xs text-white/60">
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
                        className={`text-left px-4 py-3.5 text-xs font-semibold tracking-wider uppercase transition-all duration-150 cursor-pointer rounded-none border flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-white text-[#16276B] font-bold border-white'
                            : 'bg-transparent text-white border-white/30 hover:border-white hover:bg-white/5'
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
                <label className="text-xs uppercase font-bold tracking-wider text-white/80 group-focus-within:text-white transition-colors block">
                  {t.join.fieldMotivation} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder={t.join.fieldMotivationPlaceholder}
                  className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white focus:ring-0 rounded-none px-0 py-3 text-base sm:text-lg text-white placeholder:text-white/40 outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button (Sharp Minimalist Editorial) */}
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

      {/* Strictly Single-Line Footnote (Satu Baris, Anti-Potong) */}
      <footer className="border-t border-white/20 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] w-full shrink-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-row items-center justify-between text-[11px] sm:text-xs text-white/80 whitespace-nowrap gap-4">
          <span className="truncate">{t.footnote.copyright}</span>
          
          <a
            href="https://instagram.com/climatecardinals.id"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@climatecardinals.id</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
