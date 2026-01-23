# Laporan Teknis Mendalam: Resolusi Build Error FitAI Evolution (YOLO)

**Tanggal:** 21 Januari 2026  
**Status Akhir:** Solved (Exit Code 0)  
**Tantangan Utama:** Inkompatibilitas Ekosistem ESM/CJS, Konflik Dependensi Bertingkat (Nested Dependencies), dan Limitasi Cache PWA.

---

## 1. Latar Belakang Masalah (The Root Cause)
Proyek ini menggunakan stack teknologi yang sangat modern namun kompleks: Vite (sebagai bundler), React, Web3 (Wagmi/Privy), dan AI (TensorFlow/ONNX). Masalah pecah ketika kita mencoba melakukan *production build* (`npm run build`).

Penyebab utamanya adalah **perubahan perilaku pada Vite 6 dan Rollup** (engine di balik Vite). Vite 6 sangat ketat dalam memproses modul JavaScript. Ia menuntut kejelasan: sebuah file harus murni ESM (`import/export`) atau murni CommonJS (`require/module.exports`). Sayangnya, banyak library di ekosistem Web3 dan AI yang masih "hybrid" atau memiliki struktur export yang tidak standar, menyebabkan Vite gagal membaca isinya.

---

## 2. Kronologi Error & Solusi Teknis

Berikut adalah detail teknis dari setiap rintangan yang kita hadapi dan logika di balik solusinya:

### Fase 1: Kegagalan Masif Modul Dasar
*   **Gejala:** Ratusan error muncul dengan pesan `"is not exported by"`. Rollup tidak bisa menemukan export dasar dari library populer seperti `framer-motion` dan `@privy-io/react-auth`.
*   **Analisis:** Vite 6 mencoba membaca entry point ESM (`index.mjs`), namun gagal mengurai sintaks tertentu atau memetakan *named exports*.
*   **Solusi Strategis:** **Downgrade ke Vite 5.4.11**.
    *   *Kenapa?* Vite 5 memiliki toleransi kesalahan (fault tolerance) yang lebih baik untuk paket-paket legacy atau hybrid dibanding Vite 6. Langkah ini langsung menghilangkan sekitar 60% error dasar.

### Fase 2: Konflik Dependensi Bertingkat (Nested Dependency Hell)
Ini adalah fase tersulit. Setelah downgrade, kita menghadapi error spesifik pada library state management yang dibawa oleh library lain (`@reown/appkit` dan `@wagmi`).

#### Kasus A: Zustand & Valtio
*   **Error:** `'createStore' is not exported by node_modules/zustand/...`
*   **Penyebab:** Library `@wagmi` membawa versi `zustand` sendiri di dalam `node_modules/@wagmi/node_modules/zustand`. Versi internal ini konflik dengan versi root proyek, dan Vite bingung harus me-resolve ke file yang mana.
*   **Solusi:** **Folder Aliasing**.
    ```typescript
    alias: {
      'zustand': path.resolve(__dirname, 'node_modules/zustand'),
      'valtio': path.resolve(__dirname, 'node_modules/valtio')
    }
    ```
    *   *Logika:* Perintah ini memaksa bundler: "Setiap kali ada kode (di mana pun letaknya) yang memanggil `import ... from 'zustand'`, JANGAN cari di folder lokalnya. Langsung arahkan ke `node_modules/zustand` utama di root." Ini menyatukan semua referensi ke satu versi tunggal.

#### Kasus B: Zod (Schema Validation)
*   **Error:** Serupa dengan Zustand, `@reown/appkit-wallet` gagal menemukan export `z` dari `zod`.
*   **Solusi:** Terapkan strategi Folder Alias yang sama untuk `zod`.

### Fase 3: Anomali `tslib` dan `__rest`
*   **Error:** `"__rest" is not exported by ... tslib.es6.mjs"`
*   **Analisis:** Library `@motionone` (dependensi `framer-motion`) membutuhkan fungsi helper `__rest`. Vite mencoba mengambilnya dari file ESM (`tslib.es6.mjs`), tapi gagal mendeteksinya sebagai export valid karena isu interop.
*   **Solusi:** **Direct File Alias (Hardfix)**.
    ```typescript
    alias: {
      'tslib': path.resolve(__dirname, 'node_modules/tslib/tslib.js')
    }
    ```
    *   *Logika:* Kita tidak hanya mengarahkan ke folder, kita "tembak langsung" ke file `tslib.js` (versi CommonJS). Versi CommonJS lebih stabil dan pasti mengekspos semua fungsi helper secara global, mem-bypass kesulitan parsing pada versi ESM.

### Fase 4: The Clean-up
*   **Error:** `Could not resolve entry module "@teachablemachine/pose"`
*   **Penyebab:** Pada `vite.config.ts`, terdapat konfigurasi `manualChunks` (pemecahan file JS) yang mendaftarkan `@teachablemachine/pose`. Padahal, library ini tidak terinstall di paket ini (mungkin sisa kodingan dari fitur lain).
*   **Solusi:** Menghapus entri tersebut dari konfigurasi `manualChunks`.

---

## 3. Rintangan Terakhir: Progressive Web App (PWA)
Setelah kode bersih dari error sintaks, build gagal di langkah terakhir: pembuatan *Service Worker*.

*   **Error:** `Assets exceeding the limit... won't be precached.`
*   **Detail:** Plugin PWA memiliki batas aman 2 MB untuk file yang akan disimpan di cache browser. Namun, file otak AI kita (`onnx-wasm-simd-threaded.wasm`) ukurannya mencapai **~25 MB**.
*   **Dampak:** PWA menolak mem-build karena menganggap file ini terlalu besar dan akan memberatkan user jika di-cache otomatis.
*   **Solusi:** Meningkatkan batas toleransi.
    ```typescript
    workbox: {
        maximumFileSizeToCacheInBytes: 40 * 1024 * 1024, // 40 MB
    }
    ```
    Kita menaikkan limit ke 40MB. Ini adalah *trade-off* yang sadar kita ambil: User pertama kali load akan butuh waktu download lebih lama (untuk model AI), tapi setelah itu aplikasi bisa berjalan offline sepenuhnya.

---

## Kesimpulan
Perbaikan ini bukan sekadar "menambal" kode, melainkan menata ulang bagaimana aplikasi memandang dependensinya. Kita mengubah:
1.  **Cara Pandang Bundler:** Dari ketat (Vite 6) menjadi moderat (Vite 5).
2.  **Jalur Resolusi:** Dari implisit (otomatis) menjadi eksplisit (alias).
3.  **Kebijakan Cache:** Dari konservatif (2MB) menjadi agresif (40MB) demi fitur AI.

Hasil akhirnya adalah sistem build yang stabil, terprediksi, dan siap produksi.
