// FitAI Evolution NFT Configuration for Base L2

export const NFT_CONFIG = {
  network: "base",
  chainId: 8453,
  rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://mainnet.base.org",
  contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  achievementMetadata: {
    first_step: {
      name: "First Step",
      description: "Complete your first workout on FitAI Evolution",
      image: "ipfs://QmFirstStepImage",
      tokenId: 1,
    },
    week_warrior: {
      name: "Week Warrior",
      description: "Complete 7 workouts in a week",
      image: "ipfs://QmWeekWarriorImage",
      tokenId: 2,
    },
    perfect_form: {
      name: "Perfect Form Master",
      description: "Achieve 90%+ form score on workouts",
      image: "ipfs://QmPerfectFormImage",
      tokenId: 3,
    },
    month_milestone: {
      name: "Month Milestone",
      description: "Complete 30 verified workouts",
      image: "ipfs://QmMonthMilestoneImage",
      tokenId: 4,
    },
    century_hero: {
      name: "Century Hero",
      description: "Complete 100 total workouts",
      image: "ipfs://QmCenturyHeroImage",
      tokenId: 5,
    },
    calorie_crusher: {
      name: "Calorie Crusher",
      description: "Burn 10,000+ total calories",
      image: "ipfs://QmCalorieCrusherImage",
      tokenId: 6,
    },
    consistency_king: {
      name: "Consistency King",
      description: "Maintain 7-day workout streak",
      image: "ipfs://QmConsistencyKingImage",
      tokenId: 7,
    },
  },
}

export const ERC1155_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "uri",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
]
