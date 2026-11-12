export interface CareReport {
  id: string;
  monthNumber: number;
  date: string;
  photoUrl: string;
  heightCm: number;
  healthStatus: 'Sangat Subur' | 'Sehat' | 'Cukup' | 'Perlu Perawatan';
  treatmentNotes: string; // Catatan pupuk/siram/penyiangan
  farmerNotes: string;
  verifiedBy: string;
}

export interface FarmerSteward {
  id: string;
  name: string;
  role: string;
  community: string;
  avatar: string;
  village: string;
  province: string;
}

export interface Tree {
  id: string;
  code: string;
  species: string;
  indonesianName: string;
  category: 'Pohon Buah' | 'Bakau Pesisir' | 'Pohon Rimba' | 'Kayu Multi-Guna' | 'Pohon Hutan' | 'Mangrove';
  status: 'Tersedia' | 'Sudah Diadopsi';
  adoptionFee: number; // e.g. 100000 (Rp 100.000)
  plantedDate: string;
  locationName: string;
  socialForestryScheme: string; // e.g. "HKm Rimba Lestari / SK KemenLHK"
  farmer: FarmerSteward;
  coverImage: string;
  currentHeightCm: number;
  donorName?: string;
  donorMessage?: string;
  adoptedDate?: string;
  reports: CareReport[];
}
