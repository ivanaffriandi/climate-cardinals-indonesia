'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { getAllTrees, addCareReport, addTree } from '@/lib/treeService';
import { Tree, CareReport } from '@/lib/types';
import { ArrowLeft, PlusCircle, FileText, CheckCircle2 } from 'lucide-react';

function UploadFormContent() {
  const searchParams = useSearchParams();
  const initialTreeId = searchParams.get('treeId') || '';

  const [mode, setMode] = useState<'report' | 'new-tree'>('report');
  const [trees, setTrees] = useState<Tree[]>([]);
  const [selectedTreeId, setSelectedTreeId] = useState(initialTreeId);
  const [monthNumber, setMonthNumber] = useState<number>(1);
  const [heightCm, setHeightCm] = useState<number>(120);
  const [healthStatus, setHealthStatus] = useState<CareReport['healthStatus']>('Sangat Subur');
  const [treatmentNotes, setTreatmentNotes] = useState<string>('Penyiraman berkala dan pembersihan lingkar tajuk.');
  const [farmerNotes, setFarmerNotes] = useState<string>('Bibit tumbuh dengan baik.');

  // Form pohon baru
  const [newCode, setNewCode] = useState('CC-001');
  const [newSpecies, setNewSpecies] = useState('');
  const [newIndonesianName, setNewIndonesianName] = useState('');
  const [newCategory, setNewCategory] = useState<'Pohon Buah' | 'Pohon Hutan' | 'Mangrove'>('Pohon Buah');
  const [newFarmerName, setNewFarmerName] = useState('');
  const [newCommunity, setNewCommunity] = useState('Kelompok Tani Hutan (KTH)');
  const [newLocation, setNewLocation] = useState('');
  const [newAdoptionFee, setNewAdoptionFee] = useState(100000);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const loadTrees = () => {
    const list = getAllTrees();
    setTrees(list);

    if (list.length > 0) {
      if (!initialTreeId) {
        setSelectedTreeId(list[0].id);
        setMonthNumber(list[0].reports.length + 1);
      } else {
        const found = list.find(t => t.id === initialTreeId || t.code === initialTreeId);
        if (found) {
          setSelectedTreeId(found.id);
          setMonthNumber(found.reports.length + 1);
        }
      }
    } else {
      setMode('new-tree');
    }
  };

  useEffect(() => {
    loadTrees();
  }, [initialTreeId]);

  const handleTreeChange = (id: string) => {
    setSelectedTreeId(id);
    const found = trees.find(t => t.id === id);
    if (found) setMonthNumber(found.reports.length + 1);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTreeId) return;

    setSubmitting(true);

    const newReport: CareReport = {
      id: `rep-${Date.now()}`,
      monthNumber: Number(monthNumber),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      photoUrl: photoPreview || '',
      heightCm: Number(heightCm),
      healthStatus: healthStatus,
      treatmentNotes: treatmentNotes,
      farmerNotes: farmerNotes,
      verifiedBy: 'Pendamping Lapangan KTH',
    };

    setTimeout(() => {
      addCareReport(selectedTreeId, newReport);
      setSubmitting(false);
      setSuccess(`Laporan Bulan ${monthNumber} berhasil disimpan!`);
      loadTrees();
    }, 250);
  };

  const handleCreateTreeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpecies.trim() || !newLocation.trim()) return;

    setSubmitting(true);

    const tree: Tree = {
      id: `CC-${String(trees.length + 1).padStart(3, '0')}`,
      code: newCode.trim() || `CC-${String(trees.length + 1).padStart(3, '0')}`,
      species: newSpecies.trim(),
      indonesianName: newIndonesianName.trim() || newSpecies.trim(),
      category: newCategory,
      status: 'Tersedia',
      adoptionFee: Number(newAdoptionFee) || 100000,
      plantedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      locationName: newLocation.trim(),
      socialForestryScheme: 'Perhutanan Sosial Kemitraan KemenLHK',
      coverImage: photoPreview || '',
      currentHeightCm: Number(heightCm) || 100,
      farmer: {
        id: `FMR-${Date.now()}`,
        name: newFarmerName.trim() || 'Petani Pengasuh',
        role: 'Anggota Kelompok Tani Hutan',
        community: newCommunity.trim(),
        avatar: '',
        village: newLocation.trim(),
        province: 'Indonesia',
      },
      reports: [],
    };

    setTimeout(() => {
      addTree(tree);
      setSubmitting(false);
      setSuccess(`Pohon ${tree.species} (${tree.code}) berhasil didaftarkan!`);
      loadTrees();
      setMode('report');
      setSelectedTreeId(tree.id);
      setPhotoPreview(null);
    }, 250);
  };

  return (
    <div className="bg-[#D91A2A] text-white min-h-screen p-6 md:p-12">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Back button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Success banner */}
        {success && (
          <div className="bg-black/40 border border-white/20 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <p className="text-xs font-bold text-white">{success}</p>
            </div>
            <div className="pt-2 flex items-center gap-4 text-xs">
              <Link href="/adopsi" className="font-bold text-white underline">
                Lihat di Katalog Adopsi →
              </Link>
              <button
                onClick={() => setSuccess(null)}
                className="text-white/60 hover:text-white"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Title */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">
            Portal Petani & Fasilitator Lapangan
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {mode === 'report' ? 'Input Laporan Perawatan' : 'Registrasi Bibit Pohon Baru'}
          </h1>
          <p className="text-xs text-white/80">
            {mode === 'report'
              ? 'Catat perkembangan tinggi pohon dan unggah foto dokumentasi dari kebun.'
              : 'Daftarkan pohon asuh perdana untuk masuk ke sistem katalog adopsi.'}
          </p>
        </div>

        {/* Mode Switcher */}
        {trees.length > 0 && (
          <div className="flex items-center gap-2 bg-black/20 p-1 rounded-xl text-xs font-medium border border-white/10 w-fit">
            <button
              type="button"
              onClick={() => { setMode('report'); setSuccess(null); }}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                mode === 'report' ? 'bg-white text-black font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Unggah Laporan ({trees.length} Pohon)
            </button>
            <button
              type="button"
              onClick={() => { setMode('new-tree'); setSuccess(null); }}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                mode === 'new-tree' ? 'bg-white text-black font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              + Daftarkan Pohon Baru
            </button>
          </div>
        )}

        {/* 1. FORM LAPORAN RAWAT */}
        {mode === 'report' && trees.length > 0 && (
          <form onSubmit={handleReportSubmit} className="bg-black/20 border border-white/20 rounded-2xl p-6 sm:p-8 space-y-5">
            
            {/* Pilih Pohon */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-white block">
                Pilih Pohon Terdata *
              </label>
              <select
                value={selectedTreeId}
                onChange={(e) => handleTreeChange(e.target.value)}
                className="w-full p-2.5 bg-black/40 border border-white/20 rounded-xl text-white text-xs focus:outline-none focus:border-white"
              >
                {trees.map((t) => (
                  <option key={t.id} value={t.id} className="bg-stone-900 text-white">
                    {t.code} — {t.species} ({t.farmer.name} • {t.locationName})
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Foto */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-white block">
                Foto Pohon Bulan Ini (Kamera/Galeri)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-white/30 hover:border-white p-4 rounded-xl text-center cursor-pointer bg-black/20"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />

                {photoPreview ? (
                  <div className="space-y-2">
                    <div className="relative h-40 w-full max-w-xs mx-auto rounded-lg overflow-hidden">
                      <Image
                        src={photoPreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-[11px] text-white/70 underline">Ketuk untuk ganti foto</p>
                  </div>
                ) : (
                  <p className="text-xs text-white/60 py-4">Ketuk untuk mengambil atau memilih foto dari HP/laptop</p>
                )}
              </div>
            </div>

            {/* Bulan & Tinggi */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-white block">
                  Bulan Ke
                </label>
                <input
                  type="number"
                  min="1"
                  value={monthNumber}
                  onChange={(e) => setMonthNumber(parseInt(e.target.value) || 1)}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white block">
                  Tinggi (cm)
                </label>
                <input
                  type="number"
                  min="1"
                  value={heightCm}
                  onChange={(e) => setHeightCm(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white font-semibold"
                />
              </div>
            </div>

            {/* Kondisi */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white block">
                Kondisi Tanaman
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {['Sangat Subur', 'Sehat', 'Cukup', 'Perlu Perawatan'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setHealthStatus(st as any)}
                    className={`py-2 px-2 rounded-lg text-xs font-medium border transition-colors ${
                      healthStatus === st
                        ? 'bg-white text-black border-white'
                        : 'bg-black/20 text-white border-white/20 hover:bg-black/30'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Tindakan Perawatan */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-white block">
                Tindakan Perawatan
              </label>
              <textarea
                rows={2}
                value={treatmentNotes}
                onChange={(e) => setTreatmentNotes(e.target.value)}
                className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                placeholder="Pemupukan, penyiangan gulma, penyiraman..."
              />
            </div>

            {/* Catatan Petani */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-white block">
                Catatan Petani (Opsional)
              </label>
              <input
                type="text"
                value={farmerNotes}
                onChange={(e) => setFarmerNotes(e.target.value)}
                className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                placeholder="Kondisi daun atau tanah..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-stone-100 text-black font-bold text-xs sm:text-sm transition-colors disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Menyimpan...' : `Simpan Laporan Bulan ${monthNumber}`}
            </button>

          </form>
        )}

        {/* 2. FORM DAFTAR POHON BARU */}
        {mode === 'new-tree' && (
          <form onSubmit={handleCreateTreeSubmit} className="bg-black/20 border border-white/20 rounded-2xl p-6 sm:p-8 space-y-5">
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-white block">Kode Pohon *</label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white font-mono"
                  placeholder="CC-001"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white block">Kategori *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-black/40 border border-white/20 rounded-xl text-white text-xs focus:outline-none"
                >
                  <option value="Pohon Buah" className="bg-stone-900">Pohon Buah</option>
                  <option value="Pohon Hutan" className="bg-stone-900">Pohon Hutan</option>
                  <option value="Mangrove" className="bg-stone-900">Mangrove</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white block">Nama Pohon / Spesies *</label>
              <input
                type="text"
                required
                value={newSpecies}
                onChange={(e) => setNewSpecies(e.target.value)}
                className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white"
                placeholder="Contoh: Alpukat Mentega Super"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white block">Nama Lokal / Varietas</label>
              <input
                type="text"
                value={newIndonesianName}
                onChange={(e) => setNewIndonesianName(e.target.value)}
                className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white"
                placeholder="Contoh: Alpukat Ciremai"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-white block">Nama Petani *</label>
                <input
                  type="text"
                  required
                  value={newFarmerName}
                  onChange={(e) => setNewFarmerName(e.target.value)}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white"
                  placeholder="Contoh: Pak Dedi"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white block">Donasi Adopsi (Rp)</label>
                <input
                  type="number"
                  value={newAdoptionFee}
                  onChange={(e) => setNewAdoptionFee(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white block">Lokasi Kawasan / Desa *</label>
              <input
                type="text"
                required
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white"
                placeholder="Contoh: Lereng Gunung Ciremai, Majalengka"
              />
            </div>

            {/* Foto Bibit (Opsional) */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-white block">
                Foto Bibit Pohon (Opsional)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-white/30 hover:border-white p-4 rounded-xl text-center cursor-pointer bg-black/20"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />

                {photoPreview ? (
                  <div className="space-y-2">
                    <div className="relative h-40 w-full max-w-xs mx-auto rounded-lg overflow-hidden">
                      <Image
                        src={photoPreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-[11px] text-white/70 underline">Ketuk untuk ganti foto</p>
                  </div>
                ) : (
                  <p className="text-xs text-white/60 py-4">Ketuk untuk mengunggah foto bibit (opsional)</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-stone-100 text-black font-bold text-xs sm:text-sm transition-colors disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Mendaftarkan...' : 'Daftarkan Pohon Ini'}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}

export default function AdminUploadPage() {
  return (
    <Suspense fallback={<div className="text-xs text-white/50 p-12 text-center">Memuat formulir...</div>}>
      <UploadFormContent />
    </Suspense>
  );
}
