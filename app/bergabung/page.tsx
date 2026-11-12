'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X, ChevronDown, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function BergabungPage() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openRoleIndex, setOpenRoleIndex] = useState<number | null>(null);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    role: 'research', // Default ke peran yang masih open (researcher & translator)
    motivation: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleRole = (idx: number) => {
    setOpenRoleIndex(openRoleIndex === idx ? null : idx);
  };

  const openModal = () => {
    setSubmitted(false);
    setIsRoleDropdownOpen(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsRoleDropdownOpen(false);
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
        role: 'research',
        motivation: '',
      });
    }, 600);
  };

  const selectedRoleLabel =
    t.join.roles.find((r) => r.value === formData.role)?.label || t.join.fieldRolePlaceholder;

  return (
    <div className="text-white min-h-[calc(100vh-80px)] flex flex-col justify-between bg-transparent">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 md:py-20 w-full space-y-14">
        
        {/* 1. Header / Intro — Bersih, Minimalis dengan 1 Tombol Utama */}
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

          {/* Tombol Utama Buka Pop-up Formulir */}
          <div className="pt-2">
            <button
              type="button"
              onClick={openModal}
              className="bg-white text-[#16276B] hover:bg-white/90 text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all inline-flex items-center gap-3 cursor-pointer rounded-none group"
            >
              <span>{t.join.applyBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 2. Daftar Peran (Roles) — Model Dropdown / Accordion Interaktif */}
        <div className="space-y-4 pt-6 border-t border-white/20">
          <div className="flex items-center justify-between pb-3">
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
              const isOpen = openRoleIndex === idx;
              const isAvailable = role.available;

              return (
                <div key={idx} className="transition-colors hover:bg-white/[0.02]">
                  {/* Baris Judul Peran (Dropdown Toggle) */}
                  <button
                    type="button"
                    onClick={() => toggleRole(idx)}
                    className="w-full py-6 md:py-8 flex items-center justify-between text-left cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
                        <span className="text-xl sm:text-2xl font-bold text-white/40 group-hover:text-white/80 transition-colors">
                          {num}
                        </span>
                        <h3
                          className={`text-lg sm:text-2xl font-bold tracking-tight transition-colors ${
                            isAvailable ? 'text-white' : 'text-white/75 group-hover:text-white'
                          }`}
                        >
                          {role.title}
                        </h3>

                        {/* Status Ketersediaan — Tipografis Elegan & Minimalis (Tanpa Kotak Hijau) */}
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {t.join.openStatus}
                          </span>
                        ) : (
                          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-white/35 font-normal">
                            {t.join.closedStatus}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-2 border border-white/20 group-hover:border-white transition-colors shrink-0 rounded-none ml-2">
                      <ChevronDown
                        className={`w-4 h-4 text-white/70 group-hover:text-white transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Isi Deskripsi Dropdown yang Mulus Terbuka */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pt-1 pl-10 sm:pl-14 pr-4 max-w-2xl space-y-4">
                          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                            {role.desc}
                          </p>
                          {isAvailable && (
                            <button
                              type="button"
                              onClick={openModal}
                              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white hover:text-white/80 border-b border-white pb-1 transition-colors cursor-pointer group"
                            >
                              <span>{t.join.applyBtn} ({role.title})</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. POP-UP MODAL FORMULIR (Aesthetic, Bersih, Tanpa Garis Putih di Atas) */}
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

            {/* Modal Dialog Content (Flush, Tanpa Garis Putih Tebal) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#0e1638] border border-white/15 text-white p-6 sm:p-8 z-10 my-auto shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-none max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Header Modal */}
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/15">
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
                  className="text-white/60 hover:text-white p-1 transition-colors cursor-pointer rounded-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Berhasil atau Formulir */}
              {submitted ? (
                <div className="py-8 space-y-6">
                  <div className="w-12 h-12 flex items-center justify-center border border-white/40 text-white">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {t.join.successTitle}
                  </h3>
                  <p className="text-base text-white/90 font-normal leading-relaxed">
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
                <form onSubmit={handleSubmit} className="space-y-6 pt-6">
                  
                  {/* Nama Lengkap */}
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

                  {/* Email & Kota */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  </div>

                  {/* Pemilihan Peran — Dropdown Kompak Bersih Tanpa Indikator Kotak */}
                  <div className="relative group space-y-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-white/80 block">
                      {t.join.fieldRole} *
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                      className="w-full bg-transparent border-0 border-b border-white/30 hover:border-white focus:border-white rounded-none px-0 py-2.5 text-base text-left flex items-center justify-between text-white transition-colors cursor-pointer"
                    >
                      <span className="text-white font-medium">
                        {selectedRoleLabel}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-white/60 transition-transform duration-200 ${
                          isRoleDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Menu Pilihan Peran Melayang — Bersih Tanpa Badge/Kotak */}
                    {isRoleDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-[#080d24] border border-white/20 shadow-2xl z-30 divide-y divide-white/10 max-h-56 overflow-y-auto rounded-none">
                        {t.join.roles.map((r) => {
                          const isAvailable = r.available;
                          return (
                            <button
                              key={r.value}
                              type="button"
                              disabled={!isAvailable}
                              onClick={() => {
                                if (isAvailable) {
                                  setFormData({ ...formData, role: r.value });
                                  setIsRoleDropdownOpen(false);
                                }
                              }}
                              className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-between ${
                                isAvailable
                                  ? formData.role === r.value
                                    ? 'bg-white text-[#16276B] cursor-pointer'
                                    : 'text-white hover:bg-white/10 cursor-pointer'
                                  : 'text-white/30 cursor-not-allowed bg-black/30'
                              }`}
                            >
                              <span>{r.label}</span>
                              {formData.role === r.value && <Check className="w-4 h-4" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Motivasi Singkat */}
                  <div className="group space-y-2">
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

                  {/* Tombol Kirim */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto bg-white text-[#16276B] hover:bg-white/90 disabled:opacity-50 text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-all inline-flex items-center justify-center gap-3 cursor-pointer rounded-none group"
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
