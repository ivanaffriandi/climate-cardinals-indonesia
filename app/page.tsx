'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="text-white min-h-[calc(100vh-80px)] flex flex-col justify-between bg-transparent">
      
      {/* 1. HERO SECTION — Natural, Minimalis, Tipografi Editorial Murni */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1 flex flex-col justify-center">
        
        {/* Slogan 2 Baris Bersih */}
        <div className="max-w-4xl space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
            {t.hero.title1}
          </h1>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white/85 tracking-tight leading-[1.08]">
            {t.hero.title2}
          </h1>
        </div>

        {/* Action Buttons: About Us & Get in Touch (Di Atas Tulisan Konten) */}
        <div className="pt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/tentang"
            className="bg-white text-[#16276B] hover:bg-white/90 text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all inline-flex items-center gap-3 cursor-pointer rounded-none group"
          >
            <span>{t.hero.btnAbout}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <a
            href="mailto:climatecardinals.id@icloud.com"
            className="border border-white/40 hover:border-white text-white hover:bg-white/5 text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all inline-flex items-center gap-3 cursor-pointer rounded-none group"
          >
            <Mail className="w-4 h-4" />
            <span>{t.hero.btnContact}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Dua Narasi Konten Utama (Berada di Bawah Tombol Aksi) */}
        <div className="mt-12 pt-10 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 max-w-6xl">
            
            {/* Kolom Kiri: Paragraf 1 */}
            <div className="space-y-3">
              <div className="w-10 h-px bg-white/40 mb-3" />
              <p className="text-base sm:text-lg text-white leading-relaxed font-normal">
                {t.hero.desc1}
              </p>
            </div>

            {/* Kolom Kanan: Paragraf 2 */}
            <div className="space-y-3">
              <div className="w-10 h-px bg-white/40 mb-3" />
              <p className="text-base sm:text-lg text-white leading-relaxed font-normal">
                {t.hero.desc2}
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* 2. FOOTNOTE STRICTLY SATU BARIS (Anti-Wrap, Anti-Potong) */}
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
