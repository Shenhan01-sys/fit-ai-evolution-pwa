# 🏋️ FitAI Evolution - Project Overview & Team Task Division

> **Dokumen ini untuk menjelaskan keseluruhan project dan membagi tugas tim**

---

## 📌 Executive Summary

**FitAI Evolution** adalah PWA (Progressive Web App) fitness yang menggabungkan:
- 🤖 **AI Coach** - Generate personalized workout plans via Groq AI
- 📷 **Real-time Pose Detection** - Camera-based exercise tracking
- 🏆 **Web3 Achievements** - NFT badges on Base blockchain
- 📱 **PWA** - Install seperti native app

---

## 🗺️ Project Architecture (Mindmap)

```
                            ┌─────────────────────────────────────┐
                            │         FitAI Evolution PWA          │
                            └─────────────────┬───────────────────┘
                                              │
              ┌───────────────────────────────┼───────────────────────────────┐
              │                               │                               │
              ▼                               ▼                               ▼
    ┌─────────────────┐            ┌─────────────────┐            ┌─────────────────┐
    │   FRONTEND      │            │   BACKEND       │            │   WEB3          │
    │   (React PWA)   │            │   (Express)     │            │   (Base L2)     │
    └────────┬────────┘            └────────┬────────┘            └────────┬────────┘
             │                              │                              │
    ┌────────┴────────┐           ┌────────┴────────┐           ┌────────┴────────┐
    │                 │           │                 │           │                 │
    ▼                 ▼           ▼                 ▼           ▼                 ▼
┌───────┐       ┌───────┐   ┌───────┐       ┌───────┐   ┌───────┐       ┌───────┐
│Pages  │       │Pose   │   │Auth   │       │AI     │   │Privy  │       │NFT    │
│- Home │       │Detect │   │Routes │       │Routes │   │Wallet │       │Smart  │
│- Plan │       │       │   │       │       │       │   │       │       │Contract│
│-Workout       │MediaPipe   │user/  │       │Groq   │   │Social │       │ERC-1155│
│-Achieve       │YOLO11 │   │profile│       │API    │   │Login  │       │       │
└───────┘       └───────┘   └───────┘       └───────┘   └───────┘       └───────┘
```

---

## 🗂️ Project Structure

```
fit-ai-evolution-pwa/
├── fit-ai-evolution-pwa-main/     # 🟢 STABLE - MediaPipe version
│   ├── src/
│   │   ├── components/
│   │   │   ├── CameraWorkout.tsx     # Pose detection (MediaPipe)
│   │   │   ├── VirtualCoach.tsx      # Animated coach character
│   │   │   ├── SmartAchievementCard.tsx
│   │   │   └── BottomNav.tsx
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx       # Entry/Welcome
│   │   │   ├── OnboardingPage.tsx    # User profile setup
│   │   │   ├── PlanPage.tsx          # AI workout plans
│   │   │   ├── WorkoutPage.tsx       # Camera exercise
│   │   │   └── AchievementsPage.tsx  # NFT gallery
│   │   └── lib/
│   │       ├── exerciseMapping.ts    # Exercise → detection category
│   │       └── wagmi.ts              # Web3 config
│   ├── server/
│   │   ├── routes/
│   │   │   ├── ai.ts                 # Groq AI integration
│   │   │   ├── auth.ts               # User profile CRUD
│   │   │   ├── workouts.ts           # Workout logging
│   │   │   └── nft.ts                # Achievement & minting
│   │   └── db/
│   │       ├── schema.ts             # Drizzle ORM schema
│   │       └── index.ts              # SQLite connection
│   └── public/
│       └── manifest.json             # PWA config
│
├── fitai-evol-withYOLO/           # 🟡 EXPERIMENTAL - YOLO11 version
│   ├── src/lib/
│   │   ├── yoloPoseDetection.ts      # YOLO11 + ONNX Runtime
│   │   └── keypointSmoother.ts       # Temporal smoothing
│   └── public/models/
│       └── yolo11n-pose.onnx         # YOLO model (~11MB)
│
└── README.md                         # This overview
```

---

## 👥 Team Task Division

### 🔴 ROLE 1: Frontend Developer
**Focus: UI/UX, Pages, Components**

| Task | File(s) | Priority | Status |
|------|---------|----------|--------|
| Landing page polish | `LandingPage.tsx` | HIGH | ✅ Done |
| Onboarding flow | `OnboardingPage.tsx` | HIGH | ✅ Done |
| Workout selection UI | `WorkoutPage.tsx` | HIGH | ✅ Done |
| Achievement gallery | `AchievementsPage.tsx`, `SmartAchievementCard.tsx` | HIGH | ✅ Done |
| Bottom navigation | `BottomNav.tsx` | MEDIUM | ✅ Done |
| PWA manifest & icons | `public/manifest.json`, icons | MEDIUM | ⏳ Need polish |
| Responsive mobile design | All pages | HIGH | ⏳ Testing |

**Skills needed:** React, TypeScript, TailwindCSS, Framer Motion

---

### 🟢 ROLE 2: Backend Developer
**Focus: API, Database, Server Logic**

| Task | File(s) | Priority | Status |
|------|---------|----------|--------|
| User profile API | `server/routes/auth.ts` | HIGH | ✅ Done |
| AI plan generation | `server/routes/ai.ts` | HIGH | ✅ Done |
| Workout verification | `server/routes/workouts.ts` | HIGH | ✅ Done |
| Achievement tracking | `server/routes/nft.ts` | HIGH | ✅ Done |
| Database schema | `server/db/schema.ts` | HIGH | ✅ Done |
| Error handling | All routes | MEDIUM | ⏳ Improve |
| API rate limiting | Server middleware | LOW | ❌ Not started |

**Skills needed:** Node.js, Express, SQLite, Drizzle ORM

---

### 🔵 ROLE 3: ML/AI Engineer
**Focus: Pose Detection, Model Integration**

| Task | File(s) | Priority | Status |
|------|---------|----------|--------|
| MediaPipe integration | `CameraWorkout.tsx` | HIGH | ✅ Done |
| Rep counting logic | `CameraWorkout.tsx` | HIGH | ✅ Done |
| Form validation | Angle calculation | HIGH | ✅ Done |
| YOLO11 integration | `yoloPoseDetection.ts` | MEDIUM | 🔄 In progress |
| ONNX Runtime setup | `vite.config.ts` | MEDIUM | 🔄 Fixing |
| Temporal smoothing | `keypointSmoother.ts` | LOW | ✅ Done |

**Skills needed:** TensorFlow.js, MediaPipe, ONNX, Computer Vision

---

### 🟣 ROLE 4: Web3 Developer
**Focus: Blockchain, Smart Contracts, Wallet**

| Task | File(s) | Priority | Status |
|------|---------|----------|--------|
| Privy wallet integration | `PrivyWagmiProvider.tsx` | HIGH | ✅ Done |
| Smart contract deployment | ERC-1155 contract | HIGH | ⏳ Deploy to Base Sepolia |
| NFT minting API | `server/routes/nft.ts` | HIGH | ✅ Done |
| Transaction verification | Backend | MEDIUM | ⏳ Need testing |
| BaseScan integration | Achievement cards | LOW | ✅ Done |

**Skills needed:** Solidity, Viem, Wagmi, Base L2

---

## 🛠️ Tech Stack Summary

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18, TypeScript, Vite | UI Framework |
| **Styling** | TailwindCSS, Framer Motion | Design & Animation |
| **PWA** | Vite PWA Plugin | Installable app |
| **Pose Detection** | MediaPipe Pose / YOLO11 | Exercise tracking |
| **AI** | Groq API (Llama 3.3-70B) | Workout planning |
| **Backend** | Express.js | API server |
| **Database** | SQLite + Drizzle ORM | Data persistence |
| **Auth** | Privy | Social login + wallet |
| **Blockchain** | Base Sepolia, Viem, Wagmi | NFT minting |

---

## 🔑 Environment Variables

```env
# AI
VITE_GROQ_API_KEY=gsk_xxxxx

# Web3
VITE_PRIVY_APP_ID=xxxxx
PRIVATE_KEY=0x... (for NFT minting - KEEP SECRET!)

# Optional
VITE_COINBASE_ONCHAINKIT_API_KEY=xxxxx
```

---

## 🚀 Quick Start for Team

### 1. Clone & Install
```bash
git clone https://github.com/Shenhan01-sys/fit-ai-evolution-pwa.git
cd fit-ai-evolution-pwa/fit-ai-evolution-pwa-main
npm install
```

### 2. Setup Environment
```bash
cp env.example.txt .env
# Edit .env with API keys
```

### 3. Run Development
```bash
# Terminal 1: Backend
npm run server:dev

# Terminal 2: Frontend
npm run dev
```

### 4. Open Browser
```
http://localhost:5173
```

---

## 📊 Current Status & Blockers

### ✅ WORKING
- [x] Landing page with animations
- [x] Onboarding with profile form
- [x] AI plan generation (Groq)
- [x] MediaPipe pose detection
- [x] Rep counting (squats, pushups, planks)
- [x] Privy wallet connection
- [x] Achievement gallery UI
- [x] SQLite database

### 🔄 IN PROGRESS
- [ ] YOLO11 version (Vite WASM issue)
- [ ] Mobile responsive testing
- [ ] Smart contract deployment

### ❌ BLOCKERS
1. **YOLO WASM Loading** - Vite blocks dynamic imports from /public
   - **Fix:** Custom Vite plugin (in progress)
   
2. **tailwind-merge Build Error** - Version mismatch
   - **Fix:** `npm uninstall tailwind-merge && npm install tailwind-merge`

---

## 📅 Timeline Suggestion (Hackathon)

| Day | Tasks |
|-----|-------|
| **Day 1** | Fix build errors, deploy smart contract |
| **Day 2** | Test complete flow, mobile testing |
| **Day 3** | Demo video, documentation, polish |

---

## 🔗 Links

- **GitHub:** https://github.com/Shenhan01-sys/fit-ai-evolution-pwa
- **Base Sepolia:** https://sepolia.basescan.org
- **Privy Dashboard:** https://dashboard.privy.io
- **Groq Console:** https://console.groq.com

---

## 📝 Notes for Team

1. **Branch Strategy:**
   - `main` - Stable MediaPipe version
   - `fitai-evol-withYOLO` folder for YOLO experiments

2. **Testing:**
   - Use Chrome/Edge for best pose detection
   - Mobile testing via `npm run dev -- --host`

3. **Deployment:**
   - Frontend: Vercel
   - Backend: Railway/Render
   - Smart Contract: Base Sepolia

---

**Questions? Ping the team lead! 🚀**
