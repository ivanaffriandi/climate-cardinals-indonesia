'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    contact: string;
    globalChapter: string;
    visitGlobal: string;
  };
  hero: {
    badge: string;
    globalLink: string;
    title1: string;
    title2: string;
    desc1: string;
    desc2: string;
    btnAbout: string;
    btnContact: string;
  };
  globalBanner: {
    tag: string;
    title: string;
    desc: string;
    linkText: string;
  };
  contact: {
    tag: string;
    title: string;
    desc: string;
    emailBtn: string;
    globalNote: string;
    globalLinkText: string;
  };
  footnote: {
    copyright: string;
    globalAffiliation: string;
  };
  about: {
    tag: string;
    headline: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    valuesTag: string;
    v1Title: string;
    v1Desc: string;
    v2Title: string;
    v2Desc: string;
    v3Title: string;
    v3Desc: string;
    visionTag: string;
    visionQuote: string;
    emailBtn: string;
    dmBtn: string;
  };
}

const translations: Record<Language, Translations> = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang Kami',
      contact: 'Kontak',
      globalChapter: 'Chapter Resmi Climate Cardinals',
      visitGlobal: 'Web Global ↗',
    },
    hero: {
      badge: 'Chapter Resmi • Gerakan Global Climate Cardinals',
      globalLink: 'climatecardinals.org ↗',
      title1: 'menjaga bumi nusantara,',
      title2: 'merawat harapan bersama.',
      desc1: 'Climate Cardinals Indonesia adalah perwakilan resmi dari gerakan pemuda nirlaba global Climate Cardinals. Kami hadir untuk mendemokratisasi akses informasi dan edukasi krisis iklim tanpa sekat bahasa.',
      desc2: 'Bukan cuma seminar formal. Kami menerjemahkan riset iklim dunia ke bahasa yang mudah dicerna, merangkul sekolah dan kampus, serta menghubungkan anak muda dengan aksi nyata di pelosok tanah air.',
      btnAbout: 'Tentang Kami',
      btnContact: 'Hubungi Kami',
    },
    globalBanner: {
      tag: 'Afiliasi Global',
      title: 'Bagian dari Gerakan Pemuda Iklim Dunia',
      desc: 'Climate Cardinals adalah organisasi pemuda nirlaba internasional yang didirikan untuk membuka akses sains lingkungan ke lebih dari 100 bahasa di seluruh dunia, bermitra dengan UNEP, Google, dan gerakan iklim global.',
      linkText: 'Kunjungi Situs Global (climatecardinals.org) ↗',
    },
    contact: {
      tag: 'Kolaborasi & Kontak',
      title: 'Ingin Bekerja Sama?',
      desc: 'Kami menyambut kolaborasi dengan sekolah, kampus, organisasi pemuda, media, dan komunitas akar rumput di seluruh Indonesia.',
      emailBtn: 'indonesia@climatecardinals.org',
      globalNote: 'Untuk korespondensi internasional atau markas global:',
      globalLinkText: 'Hubungi Climate Cardinals Global ↗',
    },
    footnote: {
      copyright: '© 2026 Climate Cardinals Indonesia',
      globalAffiliation: 'Chapter Resmi Climate Cardinals Global',
    },
    about: {
      tag: 'Tentang Gerakan',
      headline: 'Sains iklim harus bisa dipahami semua orang, bukan cuma kalangan akademisi.',
      p1: 'Sebagian besar riset iklim dunia ditulis dalam bahasa Inggris dengan istilah teknis yang rumit. Padahal, kita di Indonesia yang merasakan langsung dampaknya—mulai dari kenaikan muka air laut di pesisir, cuaca ekstrem tak menentu, hingga ancaman krisis pangan.',
      p2: 'Climate Cardinals Indonesia hadir sebagai chapter resmi dari gerakan global Climate Cardinals untuk meruntuhkan sekat bahasa tersebut. Kami adalah wadah nirlaba mandiri yang dipimpin generasi muda untuk menerjemahkan sains lingkungan penting ke Bahasa Indonesia dan bahasa daerah.',
      p3: 'Kami percaya bahwa literasi lingkungan adalah hak dasar semua orang. Dari pelajar di pelosok daerah hingga mahasiswa di kota besar, setiap orang berhak tahu apa yang sedang terjadi pada bumi dan bagaimana cara melindunginya.',
      p4: 'Melalui publikasi materi yang mudah dicerna, lokakarya edukatif, dan jejaring relawan inklusif, kami membuka ruang bagi anak muda nusantara untuk memimpin aksi nyata bagi tanah air.',
      valuesTag: 'Nilai & Prinsip Kami',
      v1Title: 'Aksesibel & Multibahasa',
      v1Desc: 'Menghapus kendala bahasa agar riset iklim global dapat dibaca, dipahami, dan dimanfaatkan secara gratis oleh siapa pun di Indonesia.',
      v2Title: 'Dipimpin oleh Pemuda',
      v2Desc: 'Digerakkan secara mandiri oleh pelajar, mahasiswa, dan pemuda yang peduli kelestarian bumi pertiwi.',
      v3Title: '100% Nirlaba & Terbuka',
      v3Desc: 'Gerakan independen non-partisan yang siap berkolaborasi dengan sekolah, kampus, dan inisiatif lingkungan lokal.',
      visionTag: 'Visi Jangka Panjang',
      visionQuote: '“Terwujudnya generasi muda Indonesia yang berdaya, melek sains krisis iklim secara kritis, dan memimpin keadilan lingkungan yang berkelanjutan.”',
      emailBtn: 'Hubungi Kami via Email',
      dmBtn: 'DM Instagram',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      contact: 'Contact',
      globalChapter: 'Official Chapter of Climate Cardinals',
      visitGlobal: 'Global Web ↗',
    },
    hero: {
      badge: 'Official Chapter • Climate Cardinals Global Movement',
      globalLink: 'climatecardinals.org ↗',
      title1: 'guarding our archipelago,',
      title2: 'nurturing hope together.',
      desc1: 'Climate Cardinals Indonesia is the official national chapter of Climate Cardinals, a youth-led non-profit movement dedicated to making climate science and education accessible to everyone, breaking language barriers.',
      desc2: 'Beyond formal seminars. We translate vital global climate research into accessible local languages, empower schools and campuses, and connect Indonesian youth with grassroots action.',
      btnAbout: 'About Us',
      btnContact: 'Get in Touch',
    },
    globalBanner: {
      tag: 'Global Affiliation',
      title: 'Part of a Worldwide Youth Climate Movement',
      desc: 'Climate Cardinals is the world’s largest youth-led non-profit working to make the climate movement accessible by translating climate information into 100+ languages, partnering with UNEP, Google, and global leaders.',
      linkText: 'Visit Global Website (climatecardinals.org) ↗',
    },
    contact: {
      tag: 'Collaboration & Contact',
      title: 'Want to Collaborate?',
      desc: 'We welcome partnerships with schools, universities, youth organizations, media, and grassroots communities across Indonesia.',
      emailBtn: 'indonesia@climatecardinals.org',
      globalNote: 'For international inquiries or global headquarters:',
      globalLinkText: 'Contact Climate Cardinals Global ↗',
    },
    footnote: {
      copyright: '© 2026 Climate Cardinals Indonesia',
      globalAffiliation: 'Official Chapter of Climate Cardinals Global',
    },
    about: {
      tag: 'About The Movement',
      headline: 'Climate science must be accessible to everyone, not just academics.',
      p1: 'The vast majority of global climate research is published in English with dense technical jargon. Yet here in Indonesia, we directly experience the frontlines—from rising sea levels in coastal villages to unpredictable weather and food security risks.',
      p2: 'Climate Cardinals Indonesia stands as the official national chapter to tear down this language barrier. We are an independent, youth-led non-profit translating critical environmental research into Indonesian and regional languages.',
      p3: 'We believe climate literacy is a fundamental human right. From students in remote regions to university youth in urban centers, everyone deserves to understand what is happening to our planet and how to protect it.',
      p4: 'Through accessible materials, interactive workshops, and an inclusive volunteer network, we empower youth across the archipelago to lead meaningful climate action for our homeland.',
      valuesTag: 'Our Values & Principles',
      v1Title: 'Accessible & Multilingual',
      v1Desc: 'Eliminating language barriers so global climate research can be freely accessed, understood, and applied by anyone across Indonesia.',
      v2Title: 'Youth-Led Movement',
      v2Desc: 'Independently spearheaded by students, youth leaders, and young professionals fighting for a sustainable future.',
      v3Title: '100% Non-Profit & Open',
      v3Desc: 'A non-partisan, open movement ready to collaborate with schools, institutions, and grassroots green initiatives.',
      visionTag: 'Long-Term Vision',
      visionQuote: '“Empowering Indonesian youth with critical climate literacy to spearhead sustainable, grassroots environmental justice.”',
      emailBtn: 'Contact via Email',
      dmBtn: 'DM on Instagram',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'id',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.id,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    const saved = localStorage.getItem('cci_lang') as Language;
    if (saved === 'id' || saved === 'en') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('cci_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
