"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"

interface Achievement {
  id: string
  achievement_type: string
  title: string
  description: string
  unlocked_at: string | null
  icon_emoji: string
  color_class: string
}

export function AchievementGallery() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch("/api/achievements/list")
        if (!response.ok) throw new Error("Failed to fetch achievements")
        const data = await response.json()
        setAchievements(data.achievements)
      } catch (error) {
        console.error("Error fetching achievements:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    )
  }

  const unlockedCount = achievements.filter((a) => a.unlocked_at).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#80EE98]">Achievements</h2>
        <Badge className="bg-[#46DFB1] text-[#213A58]">
          {unlockedCount} / {achievements.length}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = !!achievement.unlocked_at
          const gradient = achievement.color_class || "from-[#46DFB1] to-[#80EE98]"

          return (
            <Card
              key={achievement.id}
              className={`relative overflow-hidden transition transform hover:scale-105 ${
                isUnlocked
                  ? `bg-gradient-to-br ${gradient} border-[#80EE98]`
                  : "bg-[#15919B]/10 border-[#46DFB1]/20 opacity-50"
              }`}
            >
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                {/* Icon/Badge */}
                <div className={`text-5xl mb-4 ${isUnlocked ? "" : "grayscale opacity-50"}`}>
                  {achievement.icon_emoji}
                </div>

                {/* Title */}
                <h3 className={`font-bold mb-2 ${isUnlocked ? "text-[#213A58]" : "text-foreground"}`}>
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-4 flex-1 ${isUnlocked ? "text-[#213A58]/80" : "text-foreground/60"}`}>
                  {achievement.description}
                </p>

                {/* Lock Badge */}
                {!isUnlocked && (
                  <div className="flex items-center gap-1 text-xs text-foreground/50">
                    <Lock className="w-3 h-3" />
                    Locked
                  </div>
                )}

                {/* Unlock Date */}
                {isUnlocked && achievement.unlocked_at && (
                  <div className="text-xs text-[#213A58]/70">
                    Unlocked {new Date(achievement.unlocked_at).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
