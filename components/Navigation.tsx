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

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ULTRA-SMOOTH SCROLL COLOR ENGINE
  // 10 keyframe stops from pure red → deep navy.
  // Every pixel of scroll = perfectly blended continuous color.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const { scrollY } = useScroll();

  const themeColor = useTransform(
    scrollY,
    [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350],
    [
      '#D91A2A', // 0px   — Cardinal Red (locked hero)
      '#D91A2A', // 150px — still pure red (hold before transition)
      '#B5162A', // 300px — deep crimson
      '#8C1535', // 450px — dark rose / wine
      '#631240', // 600px — burgundy-purple
      '#3C1252', // 750px — deep violet
      '#28155E', // 900px — dark indigo
      '#1E1E68', // 1050px — indigo-navy
      '#192370', // 1200px — cool navy
      '#16276B', // 1350px — Deep Navy Blue (locked)
    ]
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STATUS BAR + NAVBAR + PAGE BG SYNCHRONIZER
  // Single MotionValue subscription → rAF batching → zero desync
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.setAttribute('name', 'theme-color');
      document.head.appendChild(metaTheme);
    }

    let rafId: number | null = null;
    let lastColor = '';

    const syncTheme = (color: string) => {
      if (color === lastColor) return;
      lastColor = color;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        metaTheme?.setAttribute('content', color);
        document.documentElement.style.backgroundColor = color;
        document.body.style.backgroundColor = color;
      });
    };

    if (menuOpen) {
      syncTheme('#16276B');
      return;
    }

    syncTheme(themeColor.get());

    const unsubscribe = themeColor.on('change', (latestColor) => {
      if (!menuOpen) syncTheme(latestColor);
    });

    return () => {
      unsubscribe();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [menuOpen, themeColor]);

  const menuItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/tentang' },
    { label: t.nav.join, href: '/bergabung' },
    { label: t.nav.contact, href: '/#kontak' },
  ];

  return (
    <>
      {/* Dynamic Background Layer */}
      <motion.div
        style={{ backgroundColor: themeColor }}
        className="fixed inset-0 -z-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Navbar */}
      <motion.header
        style={{ backgroundColor: themeColor }}
        className="w-full text-white sticky top-0 z-40 backdrop-blur-md pt-[env(safe-area-inset-top,0px)]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

          {/* Brand */}
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
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-sans leading-none whitespace-nowrap">
                Climate Cardinals
              </span>
              <span className="text-[10px] text-white/80 tracking-widest uppercase font-semibold mt-1 leading-none">
                INDONESIA
              </span>
            </div>
          </Link>

          {/* Right: Desktop Links & Hamburger */}
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

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 flex flex-col items-end justify-center gap-1.5 p-2 text-white hover:opacity-80 transition-opacity focus:outline-none cursor-pointer group"
              aria-label="Buka Menu"
            >
              <span className="w-6 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:scale-x-110 origin-right"></span>
              <span className="w-4 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-6 origin-right"></span>
            </button>
          </div>

        </div>
      </motion.header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#16276B] text-white flex flex-col overflow-y-auto no-scrollbar pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
          >
            {/* Menu Top Bar */}
            <div className="w-full h-20 shrink-0">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

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
                    <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-sans leading-none whitespace-nowrap">
                      Climate Cardinals
                    </span>
                    <span className="text-[10px] text-white/80 tracking-widest uppercase font-semibold mt-1 leading-none">
                      INDONESIA
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center p-2 text-white hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                  aria-label="Tutup Menu"
                >
                  <motion.div
                    initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <X className="w-6 h-6 text-white" strokeWidth={2} />
                  </motion.div>
                </button>

              </div>
            </div>

            {/* Center: Nav Links */}
            <div className="max-w-xl w-full mx-auto flex-1 py-8 px-6 flex flex-col items-center justify-center text-center">

              <motion.nav
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.07,
                      delayChildren: 0.06,
                    },
                  },
                }}
                className="space-y-6 sm:space-y-8"
              >
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: 'blur(0px)',
                          transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
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
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="pt-10"
              >
                <a
                  href="https://www.climatecardinals.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full group cursor-pointer shadow-sm"
                >
                  <span>climatecardinals.org</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>

              {/* Thin Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.34, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-48 sm:w-64 h-px bg-white/20 my-6 origin-center"
              />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4 }}
                className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed font-light px-4"
              >
                {language === 'id'
                  ? 'Membuka akses sains iklim, merawat bumi pertiwi, digerakkan oleh pemuda nusantara.'
                  : 'Empowering youth across Indonesia to make climate science accessible to everyone.'}
              </motion.p>

            </div>

            {/* Bottom: Language Switcher + Footer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4 }}
              className="w-full px-6 lg:px-12 pb-6 shrink-0"
            >
              {/* Language Toggle — simple ID / EN centered above footer */}
              <div className="flex justify-center mb-5">
                <div className="inline-flex items-center bg-white/10 border border-white/15 rounded-full p-1 gap-0.5">
                  <button
                    onClick={() => setLanguage('id')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                      language === 'id'
                        ? 'bg-white text-[#16276B] shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    ID
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                      language === 'en'
                        ? 'bg-white text-[#16276B] shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Footer line */}
              <div className="max-w-7xl mx-auto flex flex-row items-center justify-between text-[11px] text-white/50 pt-4 border-t border-white/10 whitespace-nowrap gap-2">
                <span>© {new Date().getFullYear()} Climate Cardinals ID</span>
                <a
                  href="https://instagram.com/climatecardinals.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@climatecardinals.id</span>
                </a>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
