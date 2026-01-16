"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, Flame } from "lucide-react"

interface WorkoutSession {
  id: string
  title: string
  duration_minutes: number
  calories_burned: number
  form_score: number
  completed_at: string
}

export function WorkoutHistory() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/workouts/history")
        if (!response.ok) throw new Error("Failed to fetch history")
        const data = await response.json()
        setSessions(data.sessions)
      } catch (error) {
        console.error("Error fetching history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {sessions.length === 0 ? (
        <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
          <CardContent className="flex items-center justify-center h-32 text-foreground/60">
            <p>No workouts yet. Start your fitness journey today!</p>
          </CardContent>
        </Card>
      ) : (
        sessions.map((session) => {
          const date = new Date(session.completed_at)
          const formScore = Math.round(session.form_score * 100)

          return (
            <Card key={session.id} className="bg-[#15919B]/10 border-[#46DFB1]/30 hover:border-[#46DFB1] transition">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{session.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-foreground/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#46DFB1]" />
                        {date.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#09D1C7]" />
                        {session.duration_minutes} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-[#80EE98]" />
                        {session.calories_burned} cal
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge
                      className={`${
                        formScore >= 90
                          ? "bg-[#80EE98] text-[#213A58]"
                          : formScore >= 75
                            ? "bg-[#46DFB1] text-[#213A58]"
                            : "bg-[#09D1C7] text-[#213A58]"
                      }`}
                    >
                      {formScore}% Form
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })
      )}
    </div>
  )
}
