'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, Instagram, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll color sync:
  // - Top fold (scrollY 0 - 220px): 100% Solid Red (#D91A2A), belum gradasi sama sekali
  // - Scroll down (220px - 680px): Berangsur-angsur bertransisi halus ke Deep Navy Blue (#16276B)
  const { scrollY } = useScroll();

  const pageBgColor = useTransform(
    scrollY,
    [0, 220, 680],
    ['#D91A2A', '#D91A2A', '#16276B']
  );

  const navBgColor = useTransform(
    scrollY,
    [0, 220, 680],
    ['rgba(217, 26, 42, 0.98)', 'rgba(217, 26, 42, 0.98)', 'rgba(22, 39, 107, 0.98)']
  );

  // Status Bar Dynamic Color Adapter:
  // - Menyesuaikan warna <meta name="theme-color">, <html>, dan <body> secara otomatis saat discroll
  // - Otomatis berganti ke Deep Navy Blue (#16276B) saat menu dibuka
  // - Mengembalikan warna status bar secara presisi saat menu ditutup
  useEffect(() => {
    const updateTheme = (color: string) => {
      // 1. Update <meta name="theme-color"> untuk Safari iOS & Chrome Android
      let metaTheme = document.querySelector('meta[name="theme-color"]');
      if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.setAttribute('name', 'theme-color');
        document.head.appendChild(metaTheme);
      }
      metaTheme.setAttribute('content', color);

      // 2. Sinkronkan background <html> & <body>
      document.documentElement.style.backgroundColor = color;
      document.body.style.backgroundColor = color;
    };

    if (menuOpen) {
      updateTheme('#16276B');
      return;
    }

    // Set warna awal
    updateTheme(pageBgColor.get());

    // Berlangganan perubahan scroll secara real-time
    const unsubscribe = pageBgColor.on('change', (latestColor) => {
      if (!menuOpen) {
        updateTheme(latestColor);
      }
    });

    return () => unsubscribe();
  }, [menuOpen, pageBgColor]);

  const menuItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/tentang' },
    { label: t.nav.contact, href: '/#kontak' },
  ];

  return (
    <>
      {/* Dynamic Background Layer: Menempel di belakang seluruh halaman, mulus bertransisi */}
      <motion.div
        style={{ backgroundColor: pageBgColor }}
        className="fixed inset-0 -z-50 pointer-events-none transition-colors duration-100"
        aria-hidden="true"
      />

      {/* Top Navbar — Mengikuti Transisi Warna Latar, Mengisi Safe Area Status Bar */}
      <motion.header
        style={{ backgroundColor: navBgColor }}
        className="w-full text-white sticky top-0 z-40 backdrop-blur-md pt-[env(safe-area-inset-top,0px)]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Brand with Logo: Tipografi CLIMATE CARDINALS (Uppercase, Heavy Bold, 1 Baris) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Climate Cardinals Indonesia"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-sm sm:text-base tracking-tight uppercase text-white font-sans leading-none whitespace-nowrap">
                CLIMATE CARDINALS
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/85 tracking-[0.28em] uppercase font-bold mt-1 leading-none">
                INDONESIA
              </span>
            </div>
          </Link>

          {/* Right: Desktop Links & Clean Hamburger (Tanpa tombol bahasa di navbar) */}
          <div className="flex items-center gap-6 sm:gap-8 text-sm font-medium">
            <Link
              href="/tentang"
              className={`hidden md:inline-block transition-colors ${
                pathname === '/tentang' ? 'text-white font-bold underline underline-offset-8' : 'text-white/85 hover:text-white'
              }`}
            >
              {t.nav.about}
            </Link>

            <Link
              href="/#kontak"
              className="hidden md:inline-block text-white/85 hover:text-white transition-colors"
            >
              {t.nav.contact}
            </Link>

            {/* Clean 2-Line Hamburger Button (NO CIRCLE BORDER, ukuran w-10 h-10 presisi) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 flex flex-col items-end justify-center gap-1.5 p-2 text-white hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
              aria-label="Buka Menu"
            >
              <span className="w-6 h-[2px] bg-white rounded-full transition-all duration-200"></span>
              <span className="w-4 h-[2px] bg-white rounded-full transition-all duration-200 group-hover:w-6"></span>
            </button>
          </div>

        </div>
      </motion.header>

      {/* Fullscreen Minimalist Menu Overlay (Deep Navy Blue dari logo) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-[#16276B] text-white flex flex-col justify-between overflow-y-auto no-scrollbar pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
          >
            {/* Top Bar inside Menu: POSISI, PADDING, DAN UKURAN 100% PERSIS DENGAN NAVBAR UTAMA */}
            <div className="w-full h-20 shrink-0">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                
                {/* Brand Identik */}
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 group"
                >
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Climate Cardinals Indonesia"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-black text-sm sm:text-base tracking-tight uppercase text-white font-sans leading-none whitespace-nowrap">
                      CLIMATE CARDINALS
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-white/85 tracking-[0.28em] uppercase font-bold mt-1 leading-none">
                      INDONESIA
                    </span>
                  </div>
                </Link>

                {/* Right: Tombol X Saja (Ukuran w-10 h-10 p-2 PERSIS dengan tombol hamburger) */}
                <div className="flex items-center">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center p-2 text-white hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                    aria-label="Tutup Menu"
                  >
                    <X className="w-6 h-6 text-white" strokeWidth={2} />
                  </button>
                </div>

              </div>
            </div>

            {/* Center: Large Clean Typography Links & Controls */}
            <div className="max-w-xl w-full mx-auto my-auto py-6 px-6 flex flex-col items-center justify-center text-center">
              
              {/* Language Switcher Segmented Control di dalam Menu */}
              <div className="inline-flex items-center bg-black/30 p-1 rounded-full border border-white/15 mb-8">
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    language === 'id' ? 'bg-white text-black shadow-sm font-bold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Bahasa Indonesia
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    language === 'en' ? 'bg-white text-black shadow-sm font-bold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>

              {/* Main Navigation Links */}
              <motion.nav
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.05,
                    },
                  },
                }}
                className="space-y-6 sm:space-y-8"
              >
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.label}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block text-3xl sm:text-5xl font-medium tracking-tight transition-all duration-200 ${
                          isActive
                            ? 'text-white font-extrabold'
                            : 'text-white/80 hover:text-white hover:scale-105'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Official Link to climatecardinals.org */}
              <div className="pt-8">
                <a
                  href="https://www.climatecardinals.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full group cursor-pointer"
                >
                  <span>climatecardinals.org</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Thin Divider Line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.6 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.25 }}
                className="w-48 sm:w-64 h-px bg-white/20 my-6"
              />

              {/* Manifesto Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed font-light px-4"
              >
                {language === 'id'
                  ? 'Membuka akses sains iklim, merawat bumi pertiwi, digerakkan oleh pemuda nusantara.'
                  : 'Empowering youth across Indonesia to make climate science accessible to everyone.'}
              </motion.p>
            </div>

            {/* Bottom Bar: Ultra Simple Single-line Footer inside Menu */}
            <div className="w-full pb-6 px-6 lg:px-12 shrink-0">
              <div className="max-w-7xl mx-auto flex flex-row items-center justify-between text-[11px] text-white/60 pt-4 border-t border-white/10 whitespace-nowrap gap-2">
                <span>© {new Date().getFullYear()} Climate Cardinals ID</span>
                
                <a
                  href="https://instagram.com/climatecardinals.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@climatecardinals.id</span>
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
