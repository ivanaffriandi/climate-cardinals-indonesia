# Tech-Driven Reforestation Tracker (Climate Cardinals Indonesia) 🌿

An ultra-minimalist, 100% transparent web application MVP designed for climate donors and Indonesian Social Forestry (*Perhutanan Sosial*) stewards.

Donors can inspect adopted trees via GPS coordinates and monthly photographic updates, with direct legal partnerships ensuring long-term stewardship.

---

## 🎨 Visual Identity & Color System
Based directly on the **Climate Cardinals** brand badge:
- **Cardinal Red (`#E52534`)**: Primary brand accent, live pins, active timeline badges, and CTAs.
- **Deep Navy (`#182677`)**: Primary headers, badges, high-contrast typography, and structure.
- **Ice/Sky Blue (`#96D1FB` / `#F0F7FF`)**: Tints, map coordinate badges, and delicate highlights.
- **Off-White & Warm Canvas (`#FAF9F6`)**: Minimalist, earthy background with ample whitespace.
- **Forest Green (`#1F4E3D`)**: Subtle agricultural verification and MoEF legal certification marks.

---

## 🚀 Core Features & Pages

| Route | Page | Description |
|---|---|---|
| `/` | **Landing Page** | Hero section (*"Transparent Climate Action. Plant, Track, Grow."*), Social Forestry model explanation, live impact stats counter, interactive map teaser, and featured adopted trees. |
| `/map` | **Explorer Map** | Full-width interactive Leaflet.js map with custom Cardinal Red pins, live sync sidebar, species category filter, satellite/light tile switcher, and tree detail popups. |
| `/tree/[id]` | **Tree Timeline** | Dynamic route displaying sub-5m GPS coordinates, Google Maps linking, farmer partner bio, CO2 metrics, and an interactive vertical timeline of verified monthly photos. |
| `/admin/upload` | **Farmer Upload Portal** | Mobile-responsive field tool with HTML5 Geolocation API GPS capture, photo upload preview, height/diameter inputs, and health evaluation. |

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom brand palette
- **Interactive Map**: Leaflet.js (Carto Voyager & Esri Satellite layers)
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel with zero config required

---

## 📦 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 🗺️ Mock Database Structure (`data/trees.json`)
The application comes pre-loaded with realistic Indonesian Social Forestry plots:
- `CC-ID-2024-001`: Butter Avocado (*Alpukat Mentega*) — Mt. Ciremai, Majalengka (HKm Rimba Lestari)
- `CC-ID-2024-002`: Rhizophora Mangrove (*Bakau Minyak*) — Muara Gembong, Bekasi
- `CC-ID-2024-003`: Rainforest Ironwood (*Kayu Ulin*) — Balikpapan, East Kalimantan
- `CC-ID-2024-004`: Musang King Durian — Cikembar, Sukabumi
- `CC-ID-2024-005`: Damar Resin Tree (*Damar Mata Kucing*) — Repong Damar, Krui, Lampung
- `CC-ID-2024-006`: Java Teak & Arabica Agroforestry — Nglanggeran, Gunungkidul

