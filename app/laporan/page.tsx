'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTrees } from '@/lib/treeService';
import { Tree, CareReport } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';

interface FlatReport extends CareReport {
  treeId: string;
  treeCode: string;
  treeSpecies: string;
  treeLocation: string;
  farmerName: string;
}

export default function LaporanPage() {
  const [reports, setReports] = useState<FlatReport[]>([]);

  useEffect(() => {
    const trees = getAllTrees();
    const list: FlatReport[] = [];

    trees.forEach((tree) => {
      tree.reports.forEach((rep) => {
        list.push({
          ...rep,
          treeId: tree.id,
          treeCode: tree.code,
          treeSpecies: tree.species,
          treeLocation: tree.locationName,
          farmerName: tree.farmer.name,
        });
      });
    });

    list.sort((a, b) => b.monthNumber - a.monthNumber);
    setReports(list);
  }, []);

  return (
    <div className="bg-[#D91A2A] text-white min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Laporan Perawatan Pohon
            </h1>
            <p className="text-xs sm:text-sm text-white/80">
              Catatan berkala dan dokumentasi foto langsung dari kebun oleh petani pendamping.
            </p>
          </div>

          <Link
            href="/adopsi"
            className="text-xs font-bold text-white underline underline-offset-4 hover:text-white/80 shrink-0 self-start sm:self-auto"
          >
            Katalog Adopsi Pohon →
          </Link>
        </div>

        {/* Reports List */}
        {reports.length === 0 ? (
          <div className="py-24 px-6 text-center space-y-4 bg-black/15 rounded-3xl border border-white/15 max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60 block">
              Sistem Keterbukaan Data
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Belum Ada Laporan Rawat yang Diunggah
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Semua catatan foto perkembangan pohon, tinggi fisik, dan tindakan perawatan dari petani akan ditampilkan terbuka di sini saat penanaman dimulai.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/upload"
                className="inline-block text-xs font-bold text-white underline underline-offset-4 hover:text-white/70"
              >
                Portal Petani: Kirim Laporan Lapangan Baru →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-black/20 border border-white/20 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* Foto Thumbnail with Fallback */}
                <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                  {report.photoUrl ? (
                    <Image
                      src={report.photoUrl}
                      alt={`Laporan Bulan ${report.monthNumber}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40 text-[10px]">
                      Dokumentasi Foto
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Bulan {report.monthNumber}
                  </div>
                </div>

              {/* Info Text */}
              <div className="flex-1 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-white/60 block">{report.treeCode}</span>
                  <h3 className="text-base font-bold text-white">
                    {report.treeSpecies}
                  </h3>
                </div>

                <div className="text-white/80 space-y-0.5">
                  <p>Petani: <span className="text-white font-medium">{report.farmerName}</span></p>
                  <p>Tanggal: <span className="text-white font-medium">{report.date}</span></p>
                  <p>Tinggi pohon: <span className="text-white font-medium">{report.heightCm} cm</span> • Kondisi: <span className="text-white font-medium">{report.healthStatus}</span></p>
                </div>

                <p className="text-white/90 bg-black/30 p-2.5 rounded-lg border border-white/10">
                  {report.treatmentNotes}
                </p>
              </div>

              {/* Link */}
              <div className="sm:self-center shrink-0 w-full sm:w-auto">
                <Link
                  href={`/tree/${report.treeId}`}
                  className="block text-center border border-white/40 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  Lihat Detail Pohon
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
