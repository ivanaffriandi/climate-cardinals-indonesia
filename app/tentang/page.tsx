'use client';

import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function TentangPage() {
  const { t } = useLanguage();

  return (
    <div className="text-white min-h-[calc(100vh-80px)] flex flex-col justify-between bg-transparent">
      
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 md:py-20 w-full space-y-20">
        
        {/* Header Title — Bersih, Tanpa Link di Atas */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/80 block">
            {t.about.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            {t.about.headline}
          </h1>
        </div>

        {/* Story & Context — Tulisan Jelas & Nyaman Dibaca */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-base sm:text-lg text-white leading-relaxed pt-8 border-t border-white/20 font-normal">
          <div className="md:col-span-6 space-y-6">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <div className="md:col-span-6 space-y-6">
            <p>{t.about.p3}</p>
            <p>{t.about.p4}</p>
          </div>
        </div>

        {/* 3 Nilai Pokok Gerakan — Font Biasa (Bukan Monospace/Robot), Tulisan Jelas */}
        <div className="space-y-8 pt-8 border-t border-white/20">
          <span className="text-xs uppercase font-bold tracking-widest text-white/80 block">
            {t.about.valuesTag}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            
            {/* 01 */}
            <div className="space-y-3">
              <span className="text-2xl sm:text-3xl font-bold text-white/60 block">01</span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {t.about.v1Title}
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                {t.about.v1Desc}
              </p>
            </div>

            {/* 02 */}
            <div className="space-y-3">
              <span className="text-2xl sm:text-3xl font-bold text-white/60 block">02</span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {t.about.v2Title}
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                {t.about.v2Desc}
              </p>
            </div>

            {/* 03 */}
            <div className="space-y-3">
              <span className="text-2xl sm:text-3xl font-bold text-white/60 block">03</span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {t.about.v3Title}
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                {t.about.v3Desc}
              </p>
            </div>

          </div>
        </div>

        {/* Visi Jangka Panjang */}
        <div className="pt-10 pb-4 border-t border-white/20 space-y-8">
          <span className="text-xs uppercase font-bold tracking-widest text-white/80 block">
            {t.about.visionTag}
          </span>
          
          <p className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-snug tracking-tight max-w-4xl">
            {t.about.visionQuote}
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <a
              href="mailto:indonesia@climatecardinals.org"
              className="bg-white text-[#16276B] hover:bg-white/90 text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all inline-flex items-center gap-3 cursor-pointer rounded-none group"
            >
              <Mail className="w-4 h-4" />
              <span>{t.about.emailBtn}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="https://instagram.com/climatecardinals.id"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/40 hover:border-white text-white hover:bg-white/5 text-xs font-medium uppercase tracking-widest px-8 py-4 transition-all inline-flex items-center gap-2 cursor-pointer rounded-none"
            >
              <Instagram className="w-4 h-4" />
              <span>{t.about.dmBtn}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Strictly Single-Line Footnote */}
      <footer className="border-t border-white/20 py-4 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-row items-center justify-between text-[11px] sm:text-xs text-white/80 whitespace-nowrap gap-2">
          <span>{t.footnote.copyright}</span>
          
          <div className="flex items-center gap-3 sm:gap-5 text-white/90">
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
