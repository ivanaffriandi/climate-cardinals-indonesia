'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, ArrowUpRight, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function TentangPage() {
  const { t } = useLanguage();

  return (
    <div className="text-white min-h-[calc(100vh-80px)] flex flex-col justify-between bg-transparent">
      
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 md:py-20 w-full space-y-16">
        
        {/* Header Title (Tanpa Tombol Back) */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-white/70 block">
              {t.about.tag}
            </span>
            <span className="text-white/40">•</span>
            <a
              href="https://www.climatecardinals.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/70 hover:text-white flex items-center gap-1 transition-colors underline"
            >
              <span>Climate Cardinals Global</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            {t.about.headline}
          </h1>
        </div>

        {/* Story & Context */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm sm:text-base text-white/85 leading-relaxed pt-6 border-t border-white/15">
          <div className="md:col-span-6 space-y-4">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <div className="md:col-span-6 space-y-4">
            <p>{t.about.p3}</p>
            <p>{t.about.p4}</p>
          </div>
        </div>

        {/* 3 Nilai Pokok Gerakan */}
        <div className="space-y-6 pt-6 border-t border-white/15">
          <span className="text-xs uppercase font-bold tracking-widest text-white/70 block">
            {t.about.valuesTag}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-black/25 border border-white/15 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 block">01 • Bahasa</span>
              <h3 className="font-bold text-lg text-white">{t.about.v1Title}</h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {t.about.v1Desc}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-black/25 border border-white/15 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 block">02 • Pemuda</span>
              <h3 className="font-bold text-lg text-white">{t.about.v2Title}</h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {t.about.v2Desc}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-black/25 border border-white/15 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 block">03 • Kolaborasi</span>
              <h3 className="font-bold text-lg text-white">{t.about.v3Title}</h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {t.about.v3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Visi & Misi Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-black/30 border border-white/20 space-y-6 shadow-xl">
          <span className="text-xs uppercase font-bold tracking-widest text-white/70 block">
            {t.about.visionTag}
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug">
            {t.about.visionQuote}
          </p>
          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center">
            <a
              href="mailto:indonesia@climatecardinals.org"
              className="bg-white text-black hover:bg-stone-100 text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{t.about.emailBtn}</span>
            </a>
            <a
              href="https://instagram.com/climatecardinals.id"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/60 hover:bg-white/10 text-white text-xs sm:text-sm font-medium px-7 py-3.5 rounded-full transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>{t.about.dmBtn}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Strictly Single-Line Footnote (Ultra Simple & Anti-Overflow) */}
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
