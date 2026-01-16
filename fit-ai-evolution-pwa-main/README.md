# FitAI Evolution PWA

**Base Indonesia Hackathon 2025** - Consumer Crypto Mini-App

AI-Powered Fitness Tracking with Verifiable On-chain Achievements on Base L2.

## 🎯 Project Overview

FitAI Evolution bridges fitness tracking with Web3 ownership by combining:
- **Computer Vision**: Real-time workout verification using Teachable Machine pose detection
- **AI Coaching**: Context-aware fitness guidance powered by Groq Cloud API (Llama3-70b)
- **Web3 Achievements**: ERC-1155 NFT badges minted on Base Sepolia for verified workouts
- **Seamless Auth**: Privy SDK for social login with embedded wallets (no seed phrases)

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PWA**: vite-plugin-pwa with Workbox

### Web3
- **Auth**: Privy SDK (social login + embedded wallets)
- **Blockchain**: Base Sepolia (L2 Testnet)
- **Web3 Libraries**: Wagmi, Viem, OnchainKit
- **Smart Contracts**: ERC-1155 (Solidity + Foundry)

### AI & Computer Vision
- **Pose Detection**: Teachable Machine (@teachablemachine/pose)
- **ML Framework**: TensorFlow.js
- **AI Chat**: Groq SDK (Llama3-70b for sub-second inference)

### Backend (Planned)
- **Server**: Node.js + Express
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM

## 📦 Installation

### Prerequisites
- Node.js 18+ and pnpm (or npm/yarn)
- Privy account (https://privy.io)
- Groq API key (https://console.groq.com)
- PostgreSQL database (https://neon.tech for serverless)

### Setup Steps

1. **Clone and Install**
```bash
cd fit-ai-evolution-pwa-main
pnpm install
```

2. **Environment Variables**

Rename `env.example.txt` to `.env` and fill in:

```bash
# Frontend
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
VITE_GROQ_API_KEY=your_groq_api_key
VITE_TEACHABLE_MACHINE_URL=https://teachablemachine.withgoogle.com/models/your-model/
VITE_CONTRACT_ADDRESS=0x... # After deploying smart contract
VITE_API_URL=http://localhost:3001

# Backend (for server setup)
PORT=3001
DATABASE_URL=postgresql://user:password@host/database
GROQ_API_KEY=your_groq_api_key
PRIVATE_KEY=your_wallet_private_key_for_minting
```

3. **Train Teachable Machine Model** (CRITICAL)

This app requires a pose detection model. Follow these steps:

1. Go to https://teachablemachine.withgoogle.com/train/pose
2. Create three classes:
   - **"Up"**: Upper position of exercise (e.g., standing for squats, arms extended for pushups)
   - **"Down"**: Lower position (e.g., squat down, pushup down)
   - **"Neutral"**: No exercise being performed
3. Record samples for each class (~50 images per class)
4. Train the model
5. Export > "Upload my model" > Copy the shareable link
6. Add the link to `VITE_TEACHABLE_MACHINE_URL` (include trailing slash)

**Note**: Without a trained model, the app runs in demo mode (no real detection).

4. **Run Development Server**

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

5. **Deploy Smart Contract** (Optional - for full Web3 functionality)

```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Navigate to contracts directory (to be created)
cd contracts

# Deploy to Base Sepolia
forge create --rpc-url https://sepolia.base.org \
  --private-key $PRIVATE_KEY \
  --constructor-args "FitnessAchievements" "FITAI" \
  src/FitnessAchievements.sol:FitnessAchievements

# Copy deployed address to VITE_CONTRACT_ADDRESS
```

## 🎨 Features

### 1. **Virtual AI Coach**
- Animated SVG character with state-based animations
- Breathing (idle), bouncing (counting reps), celebrating (success)
- Real-time motivational messages

### 2. **Computer Vision Workout**
- Real-time pose detection via webcam
- Skeleton overlay (green = good form >90%, red = needs adjustment)
- Automatic rep counting
- Form accuracy tracking

### 3. **Privy Authentication**
- Social login (Google, Email)
- Auto-generated embedded wallets
- No seed phrase management required

### 4. **Comprehensive Onboarding**
- Multi-step form with smooth animations
- Collects: Basic info, physical metrics, medical history, fitness goals
- Stores data linked to wallet address

### 5. **NFT Achievement System** (Backend integration required)
- 6 badge types: First Step, Form Master, Week Warrior, Hundred Club, Consistency King, Evolution Complete
- Rarity tiers: Common, Rare, Epic, Legendary
- 3D-style gallery UI with progress tracking

### 6. **PWA Capabilities**
- Install as standalone app
- Offline caching for workout plans
- Mobile-first responsive design
- Safe area support for notched displays

## 📁 Project Structure

```
fit-ai-evolution-pwa-main/
├── src/
│   ├── components/
│   │   ├── VirtualCoach.tsx      # Animated AI coach character
│   │   ├── CameraWorkout.tsx     # Pose detection & rep counting
│   │   ├── BottomNav.tsx         # Mobile navigation
│   │   └── PageTransition.tsx    # Route animations
│   ├── pages/
│   │   ├── OnboardingPage.tsx    # Multi-step auth + profile
│   │   ├── HomePage.tsx          # Dashboard
│   │   ├── WorkoutPage.tsx       # Exercise selection + camera
│   │   ├── PlanPage.tsx          # (To be implemented)
│   │   ├── AchievementsPage.tsx  # (To be implemented)
│   │   └── ProfilePage.tsx       # User settings
│   ├── providers/
│   │   └── PrivyWagmiProvider.tsx # Web3 context
│   ├── lib/
│   │   ├── web3/nft-config.ts    # NFT badge definitions
│   │   ├── wagmi.ts              # Wagmi config
│   │   └── utils.ts              # Tailwind merge util
│   ├── App.tsx                   # Routing + protected routes
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── public/
│   └── manifest.json             # PWA manifest (auto-generated)
├── vite.config.ts                # Vite + PWA config
├── tailwind.config.js            # Custom theme
└── package.json
```

## 🚧 Next Steps (Backend Development)

The frontend is complete. To enable full functionality:

1. **Create Express Server** (`server/index.ts`)
2. **Set up PostgreSQL with Drizzle ORM** (`server/db/schema.ts`)
3. **Implement API Routes**:
   - `POST /api/auth/profile` - Save user onboarding data
   - `POST /api/ai/chat` - Groq conversation endpoint
   - `POST /api/workouts/verify` - Verify workout completion
   - `POST /api/nft/mint` - Mint achievement NFTs
4. **Deploy Smart Contract** (`contracts/src/FitnessAchievements.sol`)
5. **Test NFT Minting** on Base Sepolia

## 🎯 Hackathon Submission Checklist

- [x] Mobile-first PWA with offline support
- [x] Privy authentication with embedded wallets
- [x] Computer vision workout verification
- [x] AI coaching interface (Groq ready)
- [x] On-chain achievements UI
- [ ] Smart contract deployment
- [ ] Backend API implementation
- [ ] End-to-end NFT minting flow
- [ ] Demo video showing full user journey

## 🔧 Development Scripts

```bash
# Development
pnpm dev          # Start Vite dev server (localhost:5173)

# Build
pnpm build        # TypeScript compile + production build

# Preview Production Build
pnpm preview      # Test production build locally

# Linting
pnpm lint         # ESLint check
```

## 📱 PWA Installation

On mobile devices:
1. Open the app in Chrome/Safari
2. Look for "Add to Home Screen" prompt
3. Install and enjoy native-like experience

## 🌐 Deployment

### Frontend (Vercel)
```bash
# Already set up for Vercel deployment
# Just connect your Git repository
```

### Backend (Railway/Render)
```bash
# Deploy Express server separately
# Set environment variables in platform dashboard
```

## 🤝 Contributing

This is a hackathon project, but contributions and feedback are welcome!

## 📄 License

MIT License - Built for Base Indonesia Hackathon 2025

## 🙏 Acknowledgments

- Base Team for the L2 infrastructure
- Privy for seamless Web3 authentication
- Groq for ultra-fast AI inference
- Google Teachable Machine for accessible ML
- OnchainKit by Coinbase

---

**Built with 💪 for Base Indonesia Hackathon 2025**

*Proof of Workout. Verifiable Achievements. On-chain Ownership.*
