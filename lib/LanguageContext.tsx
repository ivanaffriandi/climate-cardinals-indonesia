'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    join: string;
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
  join: {
    tag: string;
    title: string;
    subtitle: string;
    rolesTag: string;
    formTitle: string;
    fieldName: string;
    fieldNamePlaceholder: string;
    fieldEmail: string;
    fieldEmailPlaceholder: string;
    fieldCity: string;
    fieldCityPlaceholder: string;
    fieldRole: string;
    fieldRolePlaceholder: string;
    fieldMotivation: string;
    fieldMotivationPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
    selectRoleBtn: string;
    resetBtn: string;
    roles: { value: string; label: string }[];
    roleDescriptions: { title: string; desc: string }[];
  };
  devBanner: string;
}

const translations: Record<Language, Translations> = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang Kami',
      join: 'Bergabung',
      contact: 'Kontak',
      globalChapter: 'Chapter Resmi Climate Cardinals',
      visitGlobal: 'Web Global ↗',
    },
    hero: {
      badge: 'Chapter Resmi • Gerakan Global Climate Cardinals',
      globalLink: 'climatecardinals.org ↗',
      title1: 'menjaga bumi nusantara,',
      title2: 'merawat harapan bersama.',
      desc1: 'Climate Cardinals Indonesia adalah chapter nasional resmi Climate Cardinals, gerakan nirlaba yang dipimpin pemuda untuk membuka akses sains dan edukasi iklim bagi semua orang, meruntuhkan batasan bahasa.',
      desc2: 'Lebih dari sekadar seminar formal. Kami menerjemahkan riset iklim global yang krusial ke bahasa lokal yang mudah dipahami, memberdayakan sekolah dan kampus, serta menghubungkan pemuda nusantara dengan aksi nyata di akar rumput.',
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
      emailBtn: 'climatecardinals.id@icloud.com',
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
      visionQuote: '"Terwujudnya generasi muda Indonesia yang berdaya, melek sains krisis iklim secara kritis, dan memimpin keadilan lingkungan yang berkelanjutan."',
      emailBtn: 'Hubungi Kami via Email',
      dmBtn: 'DM Instagram',
    },
    join: {
      tag: 'Open Recruitment',
      title: 'Bergabung Bersama Kami',
      subtitle: 'Jadilah bagian dari gerakan pemuda iklim terbesar di Indonesia. Kami mencari individu yang bersemangat untuk membuat perbedaan nyata.',
      rolesTag: 'Peran yang Tersedia',
      formTitle: 'Daftarkan Dirimu',
      fieldName: 'Nama Lengkap',
      fieldNamePlaceholder: 'Masukkan nama lengkapmu',
      fieldEmail: 'Alamat Email',
      fieldEmailPlaceholder: 'nama@email.com',
      fieldCity: 'Domisili / Kota',
      fieldCityPlaceholder: 'Misal: Jakarta, Bandung, Surabaya...',
      fieldRole: 'Peran yang Diminati',
      fieldRolePlaceholder: 'Pilih peran...',
      fieldMotivation: 'Motivasi Bergabung',
      fieldMotivationPlaceholder: 'Ceritakan mengapa kamu ingin bergabung dan apa yang ingin kamu kontribusikan...',
      submitBtn: 'Kirim Pendaftaran',
      submittingBtn: 'Mengirim...',
      successTitle: 'Pendaftaran Terkirim!',
      successDesc: 'Terima kasih sudah mendaftar. Kami akan menghubungimu melalui email dalam waktu dekat.',
      selectRoleBtn: 'Pilih Peran Ini',
      resetBtn: 'Kirim Pendaftaran Lain',
      roles: [
        { value: 'content', label: 'Content Writer' },
        { value: 'social-media', label: 'Social Media' },
        { value: 'design', label: 'Desainer Grafis' },
        { value: 'research', label: 'Peneliti & Penerjemah' },
        { value: 'event', label: 'Koordinator Event' },
        { value: 'outreach', label: 'Outreach & Komunitas' },
        { value: 'other', label: 'Lainnya' },
      ],
      roleDescriptions: [
        {
          title: 'Content Writer',
          desc: 'Menulis artikel, rangkuman riset iklim, dan materi edukasi yang mudah dipahami publik luas.',
        },
        {
          title: 'Social Media',
          desc: 'Mengelola konten dan strategi media sosial untuk memperluas jangkauan gerakan iklim di Indonesia.',
        },
        {
          title: 'Desainer Grafis',
          desc: 'Menciptakan visual yang kuat dan konsisten untuk kampanye edukasi dan materi publikasi kami.',
        },
        {
          title: 'Peneliti & Penerjemah',
          desc: 'Menerjemahkan dan menyederhanakan riset iklim global ke Bahasa Indonesia dan bahasa daerah.',
        },
        {
          title: 'Koordinator Event',
          desc: 'Merencanakan dan mengelola lokakarya, diskusi, dan aksi lapangan bersama komunitas.',
        },
        {
          title: 'Outreach & Komunitas',
          desc: 'Membangun relasi dengan sekolah, kampus, dan komunitas lokal di seluruh penjuru nusantara.',
        },
      ],
    },
    devBanner: '🚧 Website ini masih dalam pengembangan — beberapa fitur belum aktif.',
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      join: 'Join Us',
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
      desc: 'Climate Cardinals is the world\'s largest youth-led non-profit working to make the climate movement accessible by translating climate information into 100+ languages, partnering with UNEP, Google, and global leaders.',
      linkText: 'Visit Global Website (climatecardinals.org) ↗',
    },
    contact: {
      tag: 'Collaboration & Contact',
      title: 'Want to Collaborate?',
      desc: 'We welcome partnerships with schools, universities, youth organizations, media, and grassroots communities across Indonesia.',
      emailBtn: 'climatecardinals.id@icloud.com',
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
      visionQuote: '"Empowering Indonesian youth with critical climate literacy to spearhead sustainable, grassroots environmental justice."',
      emailBtn: 'Contact via Email',
      dmBtn: 'DM on Instagram',
    },
    join: {
      tag: 'Open Recruitment',
      title: 'Join Our Movement',
      subtitle: 'Become part of Indonesia\'s leading youth climate movement. We\'re looking for passionate individuals ready to make a real difference.',
      rolesTag: 'Available Roles',
      formTitle: 'Apply Now',
      fieldName: 'Full Name',
      fieldNamePlaceholder: 'Enter your full name',
      fieldEmail: 'Email Address',
      fieldEmailPlaceholder: 'name@email.com',
      fieldCity: 'City / Location',
      fieldCityPlaceholder: 'e.g. Jakarta, Bandung, Surabaya...',
      fieldRole: 'Role of Interest',
      fieldRolePlaceholder: 'Select a role...',
      fieldMotivation: 'Your Motivation',
      fieldMotivationPlaceholder: 'Tell us why you want to join and what you\'d like to contribute...',
      submitBtn: 'Submit Application',
      submittingBtn: 'Sending...',
      successTitle: 'Application Sent!',
      successDesc: 'Thank you for applying. We\'ll reach out via email soon.',
      selectRoleBtn: 'Select This Role',
      resetBtn: 'Submit Another Application',
      roles: [
        { value: 'content', label: 'Content Writer' },
        { value: 'social-media', label: 'Social Media' },
        { value: 'design', label: 'Graphic Designer' },
        { value: 'research', label: 'Researcher & Translator' },
        { value: 'event', label: 'Event Coordinator' },
        { value: 'outreach', label: 'Outreach & Community' },
        { value: 'other', label: 'Other' },
      ],
      roleDescriptions: [
        {
          title: 'Content Writer',
          desc: 'Write articles, climate research summaries, and educational materials in accessible language for the public.',
        },
        {
          title: 'Social Media',
          desc: 'Manage content and strategy across social media platforms to expand the reach of Indonesia\'s climate movement.',
        },
        {
          title: 'Graphic Designer',
          desc: 'Create compelling, consistent visuals for education campaigns and our publication materials.',
        },
        {
          title: 'Researcher & Translator',
          desc: 'Translate and simplify global climate research into Indonesian and regional languages.',
        },
        {
          title: 'Event Coordinator',
          desc: 'Plan and manage workshops, discussions, and field actions with community partners.',
        },
        {
          title: 'Outreach & Community',
          desc: 'Build relationships with schools, universities, and local communities across the archipelago.',
        },
      ],
    },
    devBanner: '🚧 This website is still under development — some features are not yet active.',
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
