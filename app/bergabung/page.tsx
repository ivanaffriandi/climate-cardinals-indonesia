'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function BergabungPage() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    role: '',
    motivation: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Buka popup modal formulir, opsional langsung pre-select peran
  const openModal = (roleValue?: string) => {
    if (roleValue) {
      setFormData((prev) => ({ ...prev, role: roleValue }));
    }
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Keyboard navigation (Esc to close) & Scroll Lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role) return;

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
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 md:py-20 w-full space-y-16">
        
        {/* 1. Header / Intro — Bersih & Minimalis */}
        <div className="space-y-6 max-w-3xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/80 block">
            {t.join.tag}
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            {t.join.title}
          </h1>

          <div className="flex items-start gap-4 pt-1">
            <div className="w-12 h-px bg-white/40 mt-3.5 shrink-0" />
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-2xl">
              {t.join.subtitle}
            </p>
          </div>

          {/* Tombol Buka Pop-up Formulir Langsung dari Hero */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => openModal()}
              className="bg-white text-[#16276B] hover:bg-white/90 text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all inline-flex items-center gap-3 cursor-pointer rounded-none group"
            >
              <span>{t.join.applyBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
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

                  {/* Deskripsi & Tombol Buka Pop-up */}
                  <div className="md:col-span-6 space-y-4">
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                      {role.desc}
                    </p>

                    {matchedRole && (
                      <button
                        type="button"
                        onClick={() => openModal(matchedRole)}
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

          {/* CTA Bawah Daftar Peran */}
          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-sm sm:text-base text-white/80 font-normal">
              Siap berkontribusi bersama jaringan pemuda iklim Indonesia?
            </p>
            <button
              type="button"
              onClick={() => openModal()}
              className="bg-white text-[#16276B] hover:bg-white/90 text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all inline-flex items-center gap-3 cursor-pointer rounded-none group shrink-0"
            >
              <span>{t.join.applyBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. POP-UP MODAL FORMULIR (Model Popup Minimalis Sesuai Tema) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Dialog Content (Sharp Editorial Styling, Sesuai Tema) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#121c45] border border-white/20 text-white p-6 sm:p-10 z-10 my-auto shadow-2xl rounded-none max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Header Modal */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/20">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-white/60 block">
                    {t.join.tag}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {t.join.formTitle}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label={t.join.closeBtn}
                  className="border border-white/30 hover:border-white text-white/80 hover:text-white p-2 text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer rounded-none flex items-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.join.closeBtn}</span>
                </button>
              </div>

              {/* Isi Form atau Status Berhasil */}
              {submitted ? (
                <div className="py-10 space-y-6">
                  <div className="w-12 h-12 flex items-center justify-center border border-white/40 text-white">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {t.join.successTitle}
                  </h3>
                  <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-xl">
                    {t.join.successDesc}
                  </p>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs uppercase font-bold tracking-wider text-white hover:text-white/80 border-b border-white pb-1 transition-colors cursor-pointer"
                    >
                      {t.join.resetBtn} →
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-white text-[#16276B] hover:bg-white/90 text-xs font-bold uppercase tracking-widest px-6 py-2.5 transition-all rounded-none cursor-pointer"
                    >
                      {t.join.closeBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 pt-6">
                  
                  {/* Nama Lengkap & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                        className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white focus:ring-0 rounded-none px-0 py-2.5 text-base text-white placeholder:text-white/40 outline-none transition-colors"
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
                        className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white focus:ring-0 rounded-none px-0 py-2.5 text-base text-white placeholder:text-white/40 outline-none transition-colors"
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
                      className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white focus:ring-0 rounded-none px-0 py-2.5 text-base text-white placeholder:text-white/40 outline-none transition-colors"
                    />
                  </div>

                  {/* Pemilihan Peran */}
                  <div className="space-y-3 pt-1">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {t.join.roles.map((r) => {
                        const isSelected = formData.role === r.value;
                        return (
                          <button
                            key={r.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, role: r.value })}
                            className={`text-left px-3.5 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-150 cursor-pointer rounded-none border flex items-center justify-between gap-2 ${
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
                  <div className="group space-y-2 pt-1">
                    <label className="text-xs uppercase font-bold tracking-wider text-white/80 group-focus-within:text-white transition-colors block">
                      {t.join.fieldMotivation} *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder={t.join.fieldMotivationPlaceholder}
                      className="w-full bg-transparent border-0 border-b border-white/30 focus:border-white focus:ring-0 rounded-none px-0 py-2.5 text-base text-white placeholder:text-white/40 outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto bg-white text-[#16276B] hover:bg-white/90 disabled:opacity-50 text-xs font-bold uppercase tracking-widest px-10 py-4 transition-all inline-flex items-center justify-center gap-4 cursor-pointer rounded-none group"
                    >
                      <span>{submitting ? t.join.submittingBtn : t.join.submitBtn}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="hidden sm:inline-block text-xs uppercase font-bold tracking-wider text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      {t.join.closeBtn}
                    </button>
                  </div>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Strictly Single-Line Footnote (Anti-Wrap, Anti-Potong) */}
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
