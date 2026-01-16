# 🏋️ FitAI Evolution - AI-Powered Fitness PWA

> Real-Time Pose Detection with Web3 Achievement NFTs

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Pose-green?logo=google)](https://mediapipe.dev/)
[![YOLO11](https://img.shields.io/badge/YOLO11-Pose-orange)](https://ultralytics.com/)

---

## 📦 Repository Structure

This repository contains **two versions** of the FitAI Evolution PWA:

| Folder | ML Model | Best For |
|--------|----------|----------|
| [`fit-ai-evolution-pwa-main/`](./fit-ai-evolution-pwa-main) | **MediaPipe Pose** | Home/bodyweight exercises |
| [`fitai-evol-withYOLO/`](./fitai-evol-withYOLO) | **YOLO11-Nano** | Gym exercises with equipment |

---

## ✨ Core Features

### 🎯 AI-Powered Workout Plans
- Personalized 7-day plans via **Groq AI (Llama 3.3-70B)**
- Adapts to user profile, goals, and medical history

### 📷 Real-Time Pose Detection
- **MediaPipe**: 60 FPS, great for bodyweight exercises
- **YOLO11**: Superior occlusion handling for gym equipment

### 🏆 Web3 Achievement NFTs
- Mint fitness achievement NFTs on **Base Sepolia**
- Powered by **Privy** wallet integration

### 📱 Progressive Web App
- Installable on iOS, Android, Desktop
- Offline-capable after first load

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Shenhan01-sys/fit-ai-evolution-pwa.git
cd fit-ai-evolution-pwa

# Choose version:
cd fit-ai-evolution-pwa-main  # MediaPipe
# OR
cd fitai-evol-withYOLO        # YOLO11

npm install
```

### 2. Environment Setup

```bash
cp env.example.txt .env
```

Edit `.env`:
```env
VITE_GROQ_API_KEY=your_groq_api_key
VITE_PRIVY_APP_ID=your_privy_app_id
```

### 3. Run Development

```bash
# Terminal 1: Backend
npm run server:dev

# Terminal 2: Frontend
npm run dev
```

Open: http://localhost:5173

---

## 🔬 Model Comparison

| Feature | MediaPipe | YOLO11-Nano |
|---------|-----------|-------------|
| **FPS** | 60 FPS | 20-40 FPS |
| **Model Size** | ~6 MB | ~11 MB |
| **Home Exercises** | ✅ 95% accurate | ✅ 95% accurate |
| **Gym Exercises** | ⚠️ 60% (occlusion issues) | ✅ 90%+ accurate |
| **Bench Press** | ❌ Fails (barbell blocks) | ✅ Works |
| **Lat Pulldown** | ❌ Fails (cable occlusion) | ✅ Works |
| **Browser Support** | All browsers | Chrome/Edge (WebGPU) |

### When to Use Each:

**MediaPipe** (`fit-ai-evolution-pwa-main`):
- Home workouts without equipment
- Push-ups, squats, planks, jumping jacks
- Need maximum FPS on low-end devices

**YOLO11** (`fitai-evol-withYOLO`):
- Gym workouts with equipment
- Bench press, lat pulldown, leg extensions
- Need accuracy over speed

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS |
| **Pose Detection** | MediaPipe Pose / YOLO11-Nano + ONNX Runtime |
| **AI** | Groq API (Llama 3.3-70B) |
| **Web3** | Privy, Wagmi, Viem, OnchainKit |
| **Backend** | Express.js, SQLite, Drizzle ORM |
| **PWA** | Vite PWA Plugin |

---

## 📊 Supported Exercises

| Exercise | MediaPipe | YOLO11 |
|----------|-----------|--------|
| Squats | ✅ | ✅ |
| Push-ups | ✅ | ✅ |
| Planks | ✅ | ✅ |
| Jumping Jacks | ✅ | ✅ |
| Bench Press | ❌ | ✅ |
| Lat Pulldown | ❌ | ✅ |
| Leg Extension | ❌ | ✅ |
| Shoulder Press | ⚠️ | ✅ |

---

## 📁 Project Structure

```
fit-ai-evolution-pwa/
├── fit-ai-evolution-pwa-main/     # MediaPipe version
│   ├── src/
│   │   ├── components/
│   │   │   └── CameraWorkout.tsx  # MediaPipe integration
│   │   ├── pages/
│   │   └── lib/
│   ├── server/                    # Express backend
│   └── public/
│
├── fitai-evol-withYOLO/           # YOLO11 version
│   ├── src/
│   │   ├── components/
│   │   │   └── CameraWorkout.tsx  # YOLO integration
│   │   └── lib/
│   │       ├── yoloPoseDetection.ts
│   │       └── keypointSmoother.ts
│   ├── public/
│   │   ├── models/
│   │   │   └── yolo11n-pose.onnx  # YOLO model
│   │   └── onnx-wasm/             # ONNX Runtime files
│   └── scripts/
│       └── export_yolo_model.py   # Model export script
│
└── README.md                      # This file
```

---

## 🎮 Usage Flow

1. **Connect Wallet** - Login with Privy
2. **Complete Onboarding** - Enter profile (age, weight, goals)
3. **Get AI Plan** - Generate personalized 7-day workout
4. **Start Workout** - Follow exercises with camera tracking
5. **Earn Achievements** - Unlock and mint NFTs

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/amazing`
5. Open Pull Request

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- [MediaPipe](https://mediapipe.dev/) - Google's ML framework
- [Ultralytics](https://ultralytics.com/) - YOLO models
- [ONNX Runtime](https://onnxruntime.ai/) - Cross-platform ML inference
- [Groq](https://groq.com/) - Fast AI inference
- [Privy](https://privy.io/) - Web3 authentication
- [Base](https://base.org/) - L2 blockchain

---

**Built with 💪 for the fitness community**
