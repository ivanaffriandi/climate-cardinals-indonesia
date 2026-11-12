'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getTreeById, adoptTree } from '@/lib/treeService';
import { Tree } from '@/lib/types';
import { ArrowLeft, X } from 'lucide-react';

export default function TreeDetailPage() {
  const params = useParams();
  const treeId = params?.id as string;

  const [tree, setTree] = useState<Tree | null>(null);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // Modal adopsi
  const [showModal, setShowModal] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);

  const loadTree = () => {
    if (!treeId) return;
    const found = getTreeById(treeId);
    if (found) setTree(found);
  };

  useEffect(() => {
    loadTree();
    window.addEventListener('trees-updated', loadTree);
    return () => window.removeEventListener('trees-updated', loadTree);
  }, [treeId]);

  if (!tree) {
    return (
      <div className="p-12 text-center space-y-3 bg-[#D91A2A] text-white min-h-screen">
        <h2 className="text-lg font-bold">Pohon tidak ditemukan</h2>
        <Link
          href="/adopsi"
          className="inline-block text-xs font-semibold text-white/80 underline"
        >
          Kembali ke katalog adopsi
        </Link>
      </div>
    );
  }

  const handleAdopt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) return;

    adoptTree(tree.id, donorName.trim(), message.trim());
    setDone(true);
    setTimeout(loadTree, 50);
  };

  const isAvailable = tree.status === 'Tersedia';

  return (
    <div className="bg-[#D91A2A] text-white min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Back button */}
        <div>
          <Link
            href="/adopsi"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke katalog adopsi</span>
          </Link>
        </div>

        {/* Main Info Card */}
        <div className="bg-black/20 border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold font-mono bg-black text-white px-2.5 py-1 rounded">
                {tree.code}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                {tree.species}
              </h1>
              <p className="text-xs text-white/70 italic">
                {tree.indonesianName} • Ditanam sejak {tree.plantedDate}
              </p>
            </div>

            <div>
              {isAvailable ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-white hover:bg-stone-100 text-black text-xs font-bold px-5 py-3 rounded-full transition-colors"
                >
                  Adopsi Pohon (Rp {tree.adoptionFee.toLocaleString('id-ID')})
                </button>
              ) : (
                <div className="text-xs bg-black/40 text-white font-medium px-4 py-2 rounded-full border border-white/10">
                  Diadopsi oleh: <strong>{tree.donorName}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-white/80">
            <div>
              <span className="text-white/50 block text-[10px] uppercase">Lokasi Lahan</span>
              <span className="font-semibold text-white">{tree.locationName}</span>
            </div>
            <div>
              <span className="text-white/50 block text-[10px] uppercase">Petani Pengasuh</span>
              <span className="font-semibold text-white">{tree.farmer.name} ({tree.farmer.community})</span>
            </div>
            <div>
              <span className="text-white/50 block text-[10px] uppercase">Tinggi Sekarang</span>
              <span className="font-semibold text-white">{tree.currentHeightCm} cm</span>
            </div>
          </div>
        </div>

        {/* Care Timeline List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Riwayat Perawatan ({tree.reports.length} Laporan)
            </h2>
            <Link
              href={`/admin/upload?treeId=${tree.id}`}
              className="text-xs text-white/80 hover:text-white underline"
            >
              + Input Laporan Petani
            </Link>
          </div>

          <div className="space-y-4">
            {tree.reports.map((report) => (
              <div
                key={report.id}
                className="bg-black/20 border border-white/20 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
              >
                {/* Photo with Fallback */}
                <div
                  className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 cursor-pointer"
                  onClick={() => report.photoUrl && setActivePhoto(report.photoUrl)}
                >
                  {report.photoUrl ? (
                    <Image
                      src={report.photoUrl}
                      alt={`Bulan ${report.monthNumber}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40 text-[10px] text-center p-2">
                      Dokumentasi Foto
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Bulan {report.monthNumber}
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-white/70">
                    <span>Tanggal: <strong className="text-white">{report.date}</strong></span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-white font-medium">
                      Kondisi: {report.healthStatus}
                    </span>
                  </div>

                  <p className="text-white/90">
                    Tinggi tanaman: <strong className="text-white">{report.heightCm} cm</strong>
                  </p>

                  <p className="text-white/90 bg-black/30 p-2.5 rounded-lg border border-white/10">
                    {report.treatmentNotes}
                  </p>

                  {report.farmerNotes && (
                    <p className="text-white/60 italic text-[11px]">
                      Catatan petani: "{report.farmerNotes}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Adopsi */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-[#B81422] border border-white/20 text-white rounded-3xl max-w-sm w-full p-6 sm:p-8 space-y-4 relative">
              <button
                onClick={() => {
                  setShowModal(false);
                  setDone(false);
                }}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {done ? (
                <div className="text-center py-4 space-y-3">
                  <h4 className="text-lg font-bold text-white">Adopsi Berhasil</h4>
                  <p className="text-xs text-white/80">
                    Terima kasih <strong>{donorName}</strong>. Status pohon sudah diperbarui.
                  </p>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setDone(false);
                    }}
                    className="w-full bg-white text-black text-xs font-bold py-2.5 rounded-xl"
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-lg text-white">
                      Adopsi {tree.species}
                    </h4>
                    <p className="text-xs text-white/70">
                      Biaya perawatan: Rp {tree.adoptionFee.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <form onSubmit={handleAdopt} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white block">
                        Nama Kamu *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama lengkap"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white block">
                        Pesan Dedikasi (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Pesan kamu"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-black text-white text-xs font-bold py-3 rounded-xl hover:bg-stone-900 transition-colors"
                    >
                      Konfirmasi Adopsi
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* Lightbox Photo */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setActivePhoto(null)}
          >
            <div className="relative max-w-3xl max-h-[80vh] w-full h-[70vh]">
              <Image
                src={activePhoto}
                alt="Foto pohon"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
