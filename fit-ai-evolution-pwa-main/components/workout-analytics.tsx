"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, Calendar, Clock, Flame } from "lucide-react"

interface Analytics {
  totalWorkouts: number
  totalMinutes: number
  totalCalories: number
  averageFormScore: number
  weeklyWorkouts: number
  lastWorkoutDate: string
  formScoreTrend: number
}

export function WorkoutAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics/workout-analytics")
        if (!response.ok) throw new Error("Failed to fetch analytics")
        const data = await response.json()
        setAnalytics(data.analytics)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  if (!analytics) return null

  const analyticsCards = [
    {
      title: "Average Form Score",
      value: `${Math.round(analytics.averageFormScore * 100)}%`,
      icon: TrendingUp,
      color: "text-[#80EE98]",
      bgColor: "bg-[#80EE98]/10",
    },
    {
      title: "Weekly Workouts",
      value: analytics.weeklyWorkouts,
      icon: Calendar,
      color: "text-[#46DFB1]",
      bgColor: "bg-[#46DFB1]/10",
    },
    {
      title: "Avg Duration",
      value: `${Math.round(analytics.totalMinutes / Math.max(analytics.totalWorkouts, 1))} min`,
      icon: Clock,
      color: "text-[#09D1C7]",
      bgColor: "bg-[#09D1C7]/10",
    },
    {
      title: "Avg Calories",
      value: `${Math.round(analytics.totalCalories / Math.max(analytics.totalWorkouts, 1))} cal`,
      icon: Flame,
      color: "text-[#80EE98]",
      bgColor: "bg-[#80EE98]/10",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {analyticsCards.map((card, idx) => {
        const Icon = card.icon
        return (
          <Card key={idx} className="bg-[#15919B]/10 border-[#46DFB1]/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                <Icon className={`w-4 h-4 ${card.color}`} />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#80EE98]">{card.value}</div>
              {analytics.formScoreTrend > 0 && (
                <p className="text-xs text-[#46DFB1] mt-1">
                  {analytics.formScoreTrend > 0 ? "+" : ""}
                  {analytics.formScoreTrend.toFixed(1)}% from last week
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
