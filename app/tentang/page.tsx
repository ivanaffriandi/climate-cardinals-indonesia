'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function TentangPage() {
  const { t } = useLanguage();

  return (
    <div className="text-white min-h-[calc(100vh-80px)] flex flex-col justify-between bg-transparent">
      
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 md:py-20 w-full space-y-20">
        
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
              <span>climatecardinals.org</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            {t.about.headline}
          </h1>
        </div>

        {/* Story & Context */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm sm:text-base text-white/85 leading-relaxed pt-8 border-t border-white/15">
          <div className="md:col-span-6 space-y-5">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <div className="md:col-span-6 space-y-5">
            <p>{t.about.p3}</p>
            <p>{t.about.p4}</p>
          </div>
        </div>

        {/* 3 Nilai Pokok Gerakan — Editorial Minimalis Murni (TANPA MODEL CARD) */}
        <div className="space-y-8 pt-8 border-t border-white/15">
          <span className="text-xs uppercase font-bold tracking-widest text-white/60 block">
            {t.about.valuesTag}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            
            {/* 01 */}
            <div className="space-y-3">
              <span className="text-3xl font-light text-white/40 block font-mono">01</span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {t.about.v1Title}
              </h3>
              <p className="text-sm text-white/75 leading-relaxed font-light">
                {t.about.v1Desc}
              </p>
            </div>

            {/* 02 */}
            <div className="space-y-3">
              <span className="text-3xl font-light text-white/40 block font-mono">02</span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {t.about.v2Title}
              </h3>
              <p className="text-sm text-white/75 leading-relaxed font-light">
                {t.about.v2Desc}
              </p>
            </div>

            {/* 03 */}
            <div className="space-y-3">
              <span className="text-3xl font-light text-white/40 block font-mono">03</span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {t.about.v3Title}
              </h3>
              <p className="text-sm text-white/75 leading-relaxed font-light">
                {t.about.v3Desc}
              </p>
            </div>

          </div>
        </div>

        {/* Visi Jangka Panjang — Tipografi Besar Organik (TANPA MODEL CARD / BOX) */}
        <div className="pt-10 pb-4 border-t border-white/15 space-y-8">
          <span className="text-xs uppercase font-bold tracking-widest text-white/60 block">
            {t.about.visionTag}
          </span>
          
          <p className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.18] tracking-tight max-w-4xl">
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
