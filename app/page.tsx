'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="text-white min-h-[calc(100vh-80px)] flex flex-col justify-between bg-transparent">
      
      {/* 1. HERO SECTION — Natural, Minimalis, Tipografi Murni, Layar Awal 100% Merah Solid */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-36 max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1 flex flex-col justify-center">
        
        {/* Slogan 2 Baris Bersih */}
        <div className="max-w-4xl space-y-2">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
            {t.hero.title1}
          </h1>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white/70 tracking-tight leading-[1.08]">
            {t.hero.title2}
          </h1>
        </div>

        {/* Asymmetrical Line Annotations & Two Human Paragraphs */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: Garis Tipis 1 */}
          <div className="md:col-span-5 flex items-start gap-3">
            <div className="w-12 h-px bg-white/40 mt-3 shrink-0" />
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
              {t.hero.desc1}
            </p>
          </div>

          {/* Kolom Kanan: Garis Tipis 2 + Tombol Pil Minimalis */}
          <div className="md:col-span-7 md:pl-10 space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-16 h-px bg-white/40 mt-3 shrink-0" />
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                {t.hero.desc2}
              </p>
            </div>

            {/* Action Buttons: Solid White Pill & Clean Outline */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/tentang"
                className="bg-white text-black hover:bg-stone-100 text-sm font-semibold px-8 py-3.5 rounded-full transition-all inline-block shadow-md cursor-pointer"
              >
                {t.hero.btnAbout}
              </Link>

              <a
                href="#kontak"
                className="border border-white/60 hover:bg-white/10 text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all inline-block cursor-pointer"
              >
                {t.hero.btnContact}
              </a>
            </div>
          </div>

        </div>

      </section>

      {/* 2. HUBUNGI KAMI / KOLABORASI (#kontak) */}
      <section id="kontak" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-8 border-t border-white/15">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-white/70 block">
              {t.contact.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.contact.title}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              {t.contact.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="mailto:indonesia@climatecardinals.org"
              className="bg-black text-white hover:bg-stone-900 text-sm font-semibold px-8 py-3.5 rounded-full transition-all cursor-pointer inline-flex items-center gap-2 shadow-md border border-white/20"
            >
              <Mail className="w-4 h-4" />
              <span>{t.contact.emailBtn}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. FOOTNOTE ULTRA SIMPLE (Satu Baris Bersih & Anti-Overflow) */}
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
