'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTrees, adoptTree } from '@/lib/treeService';
import { Tree } from '@/lib/types';
import { Search, X, ArrowLeft, ArrowUpRight, CheckCircle2, Instagram } from 'lucide-react';

export default function AdopsiPage() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [filter, setFilter] = useState<'all' | 'available' | 'adopted'>('all');
  const [search, setSearch] = useState('');

  // Modal adopsi
  const [targetTree, setTargetTree] = useState<Tree | null>(null);
  const [donorName, setDonorName] = useState('');
  const [dedicationMessage, setDedicationMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const refreshTrees = () => {
    setTrees(getAllTrees());
  };

  useEffect(() => {
    refreshTrees();
    window.addEventListener('trees-updated', refreshTrees);
    return () => window.removeEventListener('trees-updated', refreshTrees);
  }, []);

  const filteredTrees = trees.filter((tree) => {
    if (filter === 'available' && tree.status !== 'Tersedia') return false;
    if (filter === 'adopted' && tree.status !== 'Sudah Diadopsi') return false;

    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      tree.species.toLowerCase().includes(q) ||
      tree.indonesianName.toLowerCase().includes(q) ||
      tree.farmer.name.toLowerCase().includes(q) ||
      tree.locationName.toLowerCase().includes(q)
    );
  });

  const handleAdoptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetTree || !donorName.trim()) return;

    adoptTree(targetTree.id, donorName.trim(), dedicationMessage.trim());
    setIsSuccess(true);
    setTimeout(refreshTrees, 50);
  };

  const closeModal = () => {
    setTargetTree(null);
    setDonorName('');
    setDedicationMessage('');
    setIsSuccess(false);
  };

  return (
    <div className="bg-[#D91A2A] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
        
        {/* Top Header & Breadcrumb */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/75 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-white/70 block">
              Program Restorasi Hutan & Agroforestri
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Katalog Adopsi Pohon
            </h1>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              Pohon yang kamu asuh dirawat langsung oleh kelompok tani Perhutanan Sosial di Jawa Barat, Banten, Lampung, Kalimantan, dan Yogyakarta. Kamu menerima sertifikat digital dan laporan berkala foto perkembangan pohon tiap bulan.
            </p>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-white/10 pb-6">
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl text-xs font-medium w-fit border border-white/10">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-white text-black font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Semua ({trees.length})
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                filter === 'available' ? 'bg-white text-black font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Siap Diadopsi ({trees.filter(t => t.status === 'Tersedia').length})
            </button>
            <button
              onClick={() => setFilter('adopted')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                filter === 'adopted' ? 'bg-white text-black font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Sudah Diadopsi ({trees.filter(t => t.status === 'Sudah Diadopsi').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari alpukat, durian, petani, lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/20 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
            />
          </div>

        </div>

        {/* Trees Grid / Empty State */}
        {trees.length === 0 ? (
          <div className="py-24 px-6 text-center space-y-4 bg-black/15 rounded-3xl border border-white/15 max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60 block">
              Fase 01: Inisiasi & Kurasi
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Pendataan Pohon Batch Perdana
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Saat ini tim Climate Cardinals Indonesia bersama mitra kelompok Perhutanan Sosial sedang melakukan kurasi dan verifikasi bibit pohon di lapangan.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/upload"
                className="inline-block text-xs font-bold text-white underline underline-offset-4 hover:text-white/70"
              >
                Portal Petani: Registrasi Bibit Baru →
              </Link>
            </div>
          </div>
        ) : filteredTrees.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-black/10 rounded-3xl border border-white/10">
            <p className="text-base font-medium text-white/80">Tidak ada pohon yang cocok dengan pencarian.</p>
            <button
              onClick={() => { setSearch(''); setFilter('all'); }}
              className="text-xs text-white underline underline-offset-4 hover:text-white/70"
            >
              Reset filter pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrees.map((tree) => {
              const isAvailable = tree.status === 'Tersedia';

              return (
                <div
                  key={tree.id}
                  className="bg-black/20 border border-white/20 rounded-2xl overflow-hidden flex flex-col justify-between p-6 space-y-5 transition-all duration-200 hover:border-white/40"
                >
                  <div>
                    {/* Cover Photo with Fallback */}
                    <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/10">
                      {tree.coverImage ? (
                        <Image
                          src={tree.coverImage}
                          alt={tree.species}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/40 gap-1">
                          <span className="text-[11px] font-semibold text-white/60">Dokumentasi Lapangan</span>
                          <span className="text-[10px] text-white/40">{tree.code}</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {tree.code}
                      </div>
                      <div className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isAvailable ? 'bg-white text-black' : 'bg-black/70 text-white border border-white/20'
                      }`}>
                        {isAvailable ? 'Siap Diadopsi' : 'Sudah Diadopsi'}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-white/60 block">
                        {tree.category}
                      </span>
                      <h2 className="font-bold text-lg text-white leading-snug">
                        {tree.species}
                      </h2>
                      <p className="text-xs text-white/70 italic">
                        {tree.indonesianName}
                      </p>
                    </div>

                    <div className="mt-3 text-xs text-white/80 space-y-1">
                      <p>Lokasi: <span className="text-white font-medium">{tree.locationName}</span></p>
                      <p>Petani: <span className="text-white font-medium">{tree.farmer.name} ({tree.farmer.community})</span></p>
                      <p>Tinggi pohon: <span className="text-white font-medium">{tree.currentHeightCm} cm</span></p>
                    </div>

                    {!isAvailable && tree.donorName && (
                      <div className="mt-3 text-xs p-2.5 bg-black/30 rounded-xl border border-white/10 text-white/85">
                        Orang tua asuh: <strong className="text-white">{tree.donorName}</strong>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    {isAvailable ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-white/70">Donasi Rawat:</span>
                          <span className="text-white font-bold text-sm">
                            Rp {tree.adoptionFee.toLocaleString('id-ID')}
                          </span>
                        </div>

                        <button
                          onClick={() => setTargetTree(tree)}
                          className="w-full bg-white hover:bg-stone-100 text-black text-xs font-bold py-3 rounded-xl transition-colors cursor-pointer"
                        >
                          Adopsi Pohon Ini
                        </button>
                      </div>
                    ) : (
                      <div className="py-2 text-center text-xs text-white/50 font-medium">
                        Pohon sudah aktif diasuh
                      </div>
                    )}

                    <Link
                      href={`/tree/${tree.id}`}
                      className="block w-full text-center border border-white/30 hover:bg-white/10 text-white text-xs font-medium py-2 rounded-xl transition-colors"
                    >
                      Lihat Laporan Rawat ({tree.reports.length})
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Interactive Modal Adopsi */}
      {targetTree && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#C41524] border border-white/20 text-white rounded-3xl max-w-sm w-full p-6 sm:p-8 space-y-5 relative shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-1 rounded-full text-white/60 hover:text-white cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="text-center py-4 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-white mx-auto" />
                <h3 className="text-lg font-bold text-white">
                  Adopsi Berhasil!
                </h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  Terima kasih <strong>{donorName}</strong>. Pohon {targetTree.species} ({targetTree.code}) sekarang resmi menjadi pohon asuhmu dan dirawat langsung oleh bapak/ibu {targetTree.farmer.name}.
                </p>
                <div className="pt-2">
                  <button
                    onClick={closeModal}
                    className="w-full bg-white text-black text-xs font-bold py-3 rounded-xl hover:bg-stone-100 cursor-pointer"
                  >
                    Tutup & Lihat Katalog
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/60 block">
                    Formulir Adopsi Pohon
                  </span>
                  <h3 className="font-bold text-xl text-white">
                    {targetTree.species}
                  </h3>
                  <p className="text-xs text-white/70 mt-1">
                    Donasi perawatan: <strong className="text-white">Rp {targetTree.adoptionFee.toLocaleString('id-ID')}</strong>
                  </p>
                </div>

                <form onSubmit={handleAdoptSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white block">
                      Nama Kamu / Nama Donatur *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white block">
                      Pesan atau Doa Dedikasi (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Tumbuh subur untuk bumi"
                      value={dedicationMessage}
                      onChange={(e) => setDedicationMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-stone-900 text-xs font-bold py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Konfirmasi Adopsi Sekarang
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/20 mt-20 pt-12 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
        <p>© {new Date().getFullYear()} Climate Cardinals Indonesia. Youth-Led Climate Non-Profit.</p>
        <div className="flex items-center gap-6 text-white/80">
          <Link href="/" className="hover:underline">Beranda</Link>
          <Link href="/laporan" className="hover:underline">Laporan Rawat</Link>
          <a
            href="https://instagram.com/climatecardinals.id"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors"
            aria-label="Instagram @climatecardinals.id"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </footer>

    </div>
  );
}

