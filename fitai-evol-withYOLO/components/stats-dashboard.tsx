"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, Clock, Flame, Zap } from "lucide-react"

interface Stats {
  total_workouts: number
  total_minutes: number
  total_calories: number
  perfect_form_count: number
  current_streak: number
}

interface RecentWorkout {
  id: string
  title: string
  duration_minutes: number
  calories_burned: number
  form_score: number
  completed_at: string
}

export function StatsDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentWorkouts, setRecentWorkouts] = useState<RecentWorkout[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/get-user-stats")
        if (!response.ok) throw new Error("Failed to fetch stats")
        const data = await response.json()
        setStats(data.stats)
        setRecentWorkouts(data.recentWorkouts)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#80EE98]" />
              Total Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#80EE98]">{stats?.total_workouts || 0}</div>
            <p className="text-xs text-foreground/50 mt-1">Keep pushing forward</p>
          </CardContent>
        </Card>

        <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#46DFB1]" />
              Total Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#46DFB1]">{stats?.total_minutes || 0}</div>
            <p className="text-xs text-foreground/50 mt-1">minutes invested</p>
          </CardContent>
        </Card>

        <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#09D1C7]" />
              Calories Burned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#09D1C7]">{stats?.total_calories || 0}</div>
            <p className="text-xs text-foreground/50 mt-1">total energy</p>
          </CardContent>
        </Card>

        <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#80EE98]" />
              Perfect Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#80EE98]">{stats?.perfect_form_count || 0}</div>
            <p className="text-xs text-foreground/50 mt-1">excellent sessions</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Workouts */}
      {recentWorkouts.length > 0 && (
        <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-[#46DFB1]/20"
                >
                  <div>
                    <h4 className="font-medium">{workout.title}</h4>
                    <p className="text-sm text-foreground/60">{new Date(workout.completed_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#80EE98]">{workout.duration_minutes} min</p>
                    <p className="text-xs text-[#09D1C7]">{workout.form_score.toFixed(0)}% form</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
