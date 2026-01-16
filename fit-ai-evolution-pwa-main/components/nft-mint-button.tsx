"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader, ExternalLink } from "lucide-react"

export function NFTMintButton({
  achievementType,
  achievementTitle,
  walletAddress,
}: {
  achievementType: string
  achievementTitle: string
  walletAddress: string | null
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [mintUrl, setMintUrl] = useState<string | null>(null)
  const { toast } = useToast()

  const handleMint = async () => {
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to mint NFTs",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/nft/mint-achievement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          achievementType,
          walletAddress,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to mint NFT")
      }

      const data = await response.json()

      if (data.status === "already_minted") {
        toast({
          title: "Already Minted",
          description: "You've already claimed this achievement NFT",
        })
        setMintUrl(data.mintUrl)
      } else {
        toast({
          title: "Success!",
          description: "Your NFT has been minted on Base L2",
        })
        setMintUrl(data.mint.mint_url)
      }
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (mintUrl) {
    return (
      <a href={mintUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
        <Button className="bg-[#46DFB1] text-[#213A58] hover:bg-[#80EE98]">
          View on Blockscout
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </a>
    )
  }

  return (
    <Button
      onClick={handleMint}
      disabled={isLoading || !walletAddress}
      className="bg-[#46DFB1] text-[#213A58] hover:bg-[#80EE98]"
    >
      {isLoading ? (
        <>
          <Loader className="w-4 h-4 mr-2 animate-spin" />
          Minting...
        </>
      ) : (
        `Mint NFT - ${achievementTitle}`
      )}
    </Button>
  )
}
