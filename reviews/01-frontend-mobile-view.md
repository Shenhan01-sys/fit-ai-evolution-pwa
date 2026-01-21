# 📱 Frontend Mobile View - Rekapan Lengkap

> **Dokumen ini menjelaskan secara naratif bagaimana frontend mobile view bekerja, beserta referensi file dan baris kode.**

---

## 📋 Daftar Isi

1. [Flow Aplikasi Frontend](#1-flow-aplikasi-frontend)
2. [Struktur Routing](#2-struktur-routing)
3. [Global Styling & Theme](#3-global-styling--theme)
4. [Bottom Navigation](#4-bottom-navigation)
5. [Halaman-halaman Utama](#5-halaman-halaman-utama)
6. [Responsive Design Patterns](#6-responsive-design-patterns)
7. [Status & Issues](#7-status--issues)
8. [Task List untuk Tim](#8-task-list-untuk-tim)

---

## 1. Flow Aplikasi Frontend

### 1.1 Entry Point & Initialization

Ketika user membuka aplikasi, alur eksekusi dimulai dari:

```
index.html → main.tsx → App.tsx → Router → Page Components
```

**File: `src/main.tsx`**
- Ini adalah entry point React. File ini me-render `<App />` component ke dalam DOM.
- Privy provider (untuk Web3 auth) di-wrap di sini.

**File: `src/App.tsx` (Line 1-135)**
- Ini adalah komponen routing utama yang menentukan halaman mana yang ditampilkan berdasarkan URL.

### 1.2 User Journey Flow

```
[Landing Page]          (/)
       ↓
[Onboarding Page]       (/onboarding)
       ↓                   → User fill profile + login via Privy
[Home Page]             (/home)
       ↓
    ┌──┴──┐
    ↓     ↓
[Plan]   [Workout]      (/plan, /workout)
[Page]   [Page]
    ↓     ↓
    └──┬──┘
       ↓
[Achievements Page]     (/achievements)
       ↓
[Profile Page]          (/profile)
```

**Referensi Code:**
- Routing didefinisikan di `src/App.tsx` Line 70-120
- Setiap route menggunakan `ProtectedRoute` untuk cek authentication (Line 41-57)

---

## 2. Struktur Routing

### 2.1 Definisi Routes

**File: `src/App.tsx`**

| Route | Component | Protected? | Line |
|-------|-----------|------------|------|
| `/` | `LandingPage` | ❌ No | Line 74 |
| `/onboarding` | `OnboardingPage` | ❌ No | Line 77 |
| `/home` | `HomePage` | ✅ Yes | Line 80-87 |
| `/plan` | `PlanPage` | ✅ Yes | Line 88-95 |
| `/workout` | `WorkoutPage` | ✅ Yes | Line 96-103 |
| `/achievements` | `AchievementsPage` | ✅ Yes | Line 104-111 |
| `/profile` | `ProfilePage` | ✅ Yes | Line 112-119 |

### 2.2 Protected Route Logic

Protected routes menggunakan `ProtectedRoute` wrapper component yang:
1. Check apakah Privy sudah ready (`ready` state)
2. Check apakah user authenticated
3. Jika tidak authenticated, redirect ke `/home`

**File: `src/App.tsx` Line 41-57**

```typescript
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { authenticated, ready } = usePrivy()

    if (!ready) {
        // Show loading spinner
        return (...)
    }

    if (!authenticated) {
        return <Navigate to="/home" replace />
    }

    return <>{children}</>
}
```

---

## 3. Global Styling & Theme

### 3.1 CSS Variables

**File: `src/index.css` Line 6-36**

Theme menggunakan CSS custom properties (variables) untuk konsistensi warna:

```css
:root {
    --background: 222 47% 11%;       /* slate-deep */
    --foreground: 210 40% 98%;       /* white text */
    --primary: 217 100% 50%;         /* base-blue (#0052FF) */
    --accent: 142 71% 45%;           /* success-green (#22C55E) */
}
```

### 3.2 Tailwind Custom Colors

**File: `tailwind.config.js` Line 10-13**

```javascript
colors: {
    'slate-deep': '#0F172A',    // Background utama (dark blue-gray)
    'base-blue': '#0052FF',     // Primary action color (Base brand)
    'success-green': '#22C55E', // Success/valid form indicator
}
```

### 3.3 Custom Utility Classes

**File: `src/index.css` Line 53-79**

| Class | Fungsi | Line |
|-------|--------|------|
| `.gradient-card` | Card dengan gradient background biru-hijau | Line 59-62 |
| `.glass` | Glassmorphism effect dengan blur | Line 65-69 |
| `.safe-area-bottom` | Padding untuk notch/home indicator iPhone | Line 72-74 |
| `.safe-area-top` | Padding untuk notch iPhone | Line 76-78 |

**Contoh Penggunaan `safe-area-bottom`:**
```tsx
// BottomNav.tsx Line 17
<nav className="... safe-area-bottom">
```

---

## 4. Bottom Navigation

### 4.1 Overview

Bottom navigation adalah menu navigasi fixed di bawah layar untuk mobile experience. Tampil **hanya ketika user authenticated**.

**File: `src/components/BottomNav.tsx` (Line 1-58)**

### 4.2 Navigation Items

**File: `src/components/BottomNav.tsx` Line 5-11**

```typescript
const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Plan', path: '/plan' },
    { icon: Camera, label: 'Workout', path: '/workout' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
    { icon: User, label: 'Profile', path: '/profile' }
]
```

### 4.3 Styling & Active State

**File: `src/components/BottomNav.tsx` Line 16-55**

- **Fixed Position:** `fixed bottom-0 left-0 right-0` (Line 17)
- **Glass Effect:** Menggunakan `.glass` class (Line 17)
- **Safe Area:** `safe-area-bottom` untuk iPhone notch (Line 17)
- **Height:** `h-16` (64px) - sesuai standar iOS/Android (Line 18)
- **Active State:** 
  - Warna berubah ke `text-base-blue` (Line 29)
  - Icon scale up 110% (Line 38)
  - Dot indicator muncul di bawah icon (Line 41-43)

### 4.4 Kapan Bottom Nav Tampil?

**File: `src/App.tsx` Line 122**

```typescript
{authenticated && <BottomNav />}
```

Bottom nav **HANYA** tampil ketika user sudah login (authenticated).

---

## 5. Halaman-halaman Utama

### 5.1 Landing Page (`/`)

**File: `src/pages/LandingPage.tsx` (203 lines)**

**Purpose:** Welcome page untuk user baru, menjelaskan fitur aplikasi.

**Key Sections:**
| Section | Line Range | Deskripsi |
|---------|------------|-----------|
| Background Gradient | Line 44-46 | Animated gradient background |
| Hero Section | Line 49-102 | Logo, headline, CTA button |
| Stats Grid | Line 104-125 | 4 stats cards (Users, Workouts, NFTs, Accuracy) |
| Features Grid | Line 127-159 | 4 feature cards dengan icons |
| CTA Section | Line 161-183 | Final call-to-action |
| Footer | Line 187-198 | Branding footer |

**Mobile Responsiveness:**
- `text-5xl md:text-7xl` (Line 76) - Font size kecil di mobile, besar di desktop
- `grid-cols-2 md:grid-cols-4` (Line 109) - 2 kolom di mobile, 4 di desktop
- `md:grid-cols-2` (Line 137) - Features stack di mobile, 2 kolom di tablet+

**CTA Button:**
- Line 89-97: Gradient button `from-base-blue to-success-green`
- Navigate ke `/onboarding` saat diklik

### 5.2 Home Page (`/home`)

**File: `src/pages/HomePage.tsx` (130 lines)**

**Purpose:** Dashboard utama setelah login.

**Key Sections:**
| Section | Line Range | Deskripsi |
|---------|------------|-----------|
| Header | Line 22-31 | Welcome message dengan nama user |
| Quick Stats | Line 33-48 | 4 stats cards (Streak, Reps, Accuracy, Progress) |
| Start Workout | Line 50-72 | Big gradient CTA button link ke /workout |
| Today's Plan | Line 74-96 | Preview 3 exercises untuk hari ini |
| Recent Achievements | Line 98-124 | Horizontal scroll achievement badges |

**Mobile Layout:**
- `max-w-4xl mx-auto` (Line 20) - Centered container dengan max width
- `pb-24` (Line 19) - 96px padding bottom untuk bottom nav
- `grid-cols-2` (Line 34) - Stats selalu 2 kolom (good for mobile)
- `overflow-x-auto` (Line 114) - Achievements horizontal scroll

### 5.3 Profile Page

**File: `src/App.tsx` Line 13-39** (Inline placeholder)

**Purpose:** Show user email & wallet, logout button.

**Note:** Ini masih placeholder/inline component, belum pindah ke file terpisah.

---

## 6. Responsive Design Patterns

### 6.1 Breakpoint Strategy

**File: `tailwind.config.js`**

Tailwind default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Pattern yang digunakan:** Mobile-first approach.
- Base style tanpa prefix = mobile
- `md:` prefix = tablet ke atas
- `lg:` prefix = desktop

### 6.2 Common Patterns di Codebase

**Grid Responsiveness:**
```tsx
// 2 kolom mobile, 4 kolom desktop
className="grid grid-cols-2 md:grid-cols-4"
```

**Font Size Responsiveness:**
```tsx
// Kecil di mobile, besar di desktop
className="text-3xl md:text-5xl"
```

**Padding Konsisten:**
```tsx
// Standard page padding
className="px-4"  // 16px horizontal padding
className="pb-24" // 96px bottom padding untuk BottomNav
className="pt-8"  // 32px top padding
```

**Container Centering:**
```tsx
className="max-w-2xl mx-auto"  // Limit width, center
className="max-w-4xl mx-auto"  // Wider limit
```

### 6.3 Safe Area Handling (iPhone Notch)

**File: `src/index.css` Line 71-78**

```css
.safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-top {
    padding-top: env(safe-area-inset-top);
}
```

---

## 7. Status & Issues

### ✅ Yang Sudah Selesai

| Item | File | Line |
|------|------|------|
| Landing Page responsive | `LandingPage.tsx` | All |
| Home Page responsive | `HomePage.tsx` | All |
| Bottom Nav fixed | `BottomNav.tsx` | All |
| Safe area handling | `index.css` | 71-78 |
| Page transitions | `PageTransition.tsx` | All |
| Color theme consistent | `tailwind.config.js` | 10-13 |

### ⚠️ Yang Perlu Diperbaiki

| Issue | File | Line | Priority |
|-------|------|------|----------|
| Profile page masih inline | `App.tsx` | 13-39 | MEDIUM |
| Achievement cards overflow | `HomePage.tsx` | 114 | LOW |
| Form inputs touch target kecil | `OnboardingPage.tsx` | - | HIGH |

### ❌ Yang Belum Dikerjakan

| Item | Priority |
|------|----------|
| Pull-to-refresh gesture | LOW |
| Dark/Light mode toggle | LOW |
| Offline UI indicators | MEDIUM |

---

## 8. Task List untuk Tim

### 🔴 Priority HIGH

1. **Pindahkan ProfilePage ke file terpisah**
   - Current: `src/App.tsx` Line 13-39
   - Target: `src/pages/ProfilePage.tsx`

2. **Touch target minimum 44x44px**
   - Check semua button dan link
   - Pastikan ada `min-h-[44px] min-w-[44px]`

3. **Test di device asli**
   - iOS Safari
   - Android Chrome

### 🟡 Priority MEDIUM

4. **Keyboard handling di forms**
   - `OnboardingPage.tsx`

5. **Consistent loading states**
   - Gunakan Skeleton component

### 🟢 Priority LOW

6. **Animation polish**
7. **PWA Install prompt polish**

---

## 📂 File Reference Quick Index

| File | Path | Purpose |
|------|------|---------|
| App.tsx | `src/App.tsx` | Main routing & ProtectedRoute |
| index.css | `src/index.css` | Global styles, CSS vars |
| tailwind.config.js | `tailwind.config.js` | Theme colors |
| BottomNav.tsx | `src/components/BottomNav.tsx` | Fixed bottom navigation |
| LandingPage.tsx | `src/pages/LandingPage.tsx` | Welcome page |
| HomePage.tsx | `src/pages/HomePage.tsx` | Dashboard |
| OnboardingPage.tsx | `src/pages/OnboardingPage.tsx` | Profile setup |
| WorkoutPage.tsx | `src/pages/WorkoutPage.tsx` | Exercise selection |
| PlanPage.tsx | `src/pages/PlanPage.tsx` | AI workout plans |
| AchievementsPage.tsx | `src/pages/AchievementsPage.tsx` | NFT gallery |

---

**Last Updated:** 2026-01-21
**Review Status:** Draft - Pending Team Review
