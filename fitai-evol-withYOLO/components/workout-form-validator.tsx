"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Video, Square } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface FormValidatorProps {
  exerciseName: string
  workoutId?: string
  onComplete?: (formScore: number) => void
}

export function WorkoutFormValidator({ exerciseName, workoutId, onComplete }: FormValidatorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [formScore, setFormScore] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  // Initialize camera
  useEffect(() => {
    if (!isRecording) return

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      } catch (error) {
        toast({
          title: "Camera access denied",
          description: "Please allow camera access to validate your form",
          variant: "destructive",
        })
        setIsRecording(false)
      }
    }

    startCamera()

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isRecording, toast])

  const captureAndAnalyze = async () => {
    if (!canvasRef.current || !videoRef.current) return

    setIsLoading(true)

    try {
      // Capture frame from video
      const context = canvasRef.current.getContext("2d")
      if (!context) throw new Error("Could not get canvas context")

      canvasRef.current.width = videoRef.current.videoWidth
      canvasRef.current.height = videoRef.current.videoHeight
      context.drawImage(videoRef.current, 0, 0)

      // Convert canvas to blob
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) throw new Error("Could not capture video frame")

        // Send to API for form validation
        const formData = new FormData()
        formData.append("image", blob)
        formData.append("exercise", exerciseName)

        const response = await fetch("/api/form-validation/verify-pose", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Form validation failed")

        const data = await response.json()

        setFormScore(data.formScore)
        setFeedback(data.feedback || [])

        // Save session if workout ID provided
        if (workoutId) {
          const { data: userData } = await supabase.auth.getUser()
          if (userData.user) {
            await supabase.from("workout_sessions").insert({
              user_id: userData.user.id,
              workout_id: workoutId,
              title: exerciseName,
              duration_minutes: 0,
              completed_exercises: [exerciseName],
              form_score: data.formScore,
              calories_burned: 0,
              notes: `Form validation for ${exerciseName}`,
              completed_at: new Date().toISOString(),
            })
          }
        }

        onComplete?.(data.formScore)
        setIsRecording(false)

        toast({
          title: `Form Score: ${(data.formScore * 100).toFixed(0)}%`,
          description: "Analysis complete! Check feedback below.",
        })
      })
    } catch (error) {
      toast({
        title: "Analysis error",
        description: error instanceof Error ? error.message : "Could not analyze form",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full bg-[#15919B]/10 border-[#46DFB1]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#80EE98]">
          <Video className="w-5 h-5" />
          Form Validator
        </CardTitle>
        <CardDescription>Exercise: {exerciseName}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Camera Feed */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Camera Feed</label>
          <div className="relative w-full rounded-lg overflow-hidden bg-[#0C6478]/50 aspect-video">
            {isRecording ? (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" playsInline crossOrigin="anonymous" />
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500/80 px-3 py-1 rounded-full text-white text-xs font-semibold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  RECORDING
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-foreground/60">
                <Video className="w-12 h-12 mb-2 opacity-50" />
                <p>Camera will appear here when you start</p>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {!isRecording ? (
            <Button
              onClick={() => setIsRecording(true)}
              className="flex-1 bg-[#80EE98] text-[#213A58] hover:bg-[#46DFB1]"
            >
              <Video className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
          ) : (
            <>
              <Button
                onClick={captureAndAnalyze}
                disabled={isLoading}
                className="flex-1 bg-[#46DFB1] text-[#213A58] hover:bg-[#80EE98]"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {isLoading ? "Analyzing..." : "Analyze Form"}
              </Button>
              <Button onClick={() => setIsRecording(false)} variant="outline" className="px-4" disabled={isLoading}>
                <Square className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Results */}
        {formScore !== null && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Form Score</span>
                <span className="text-2xl font-bold text-[#80EE98]">{(formScore * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-[#0C6478]/50 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    formScore >= 0.9 ? "bg-[#80EE98]" : formScore >= 0.7 ? "bg-[#46DFB1]" : "bg-[#09D1C7]/70"
                  }`}
                  style={{ width: `${formScore * 100}%` }}
                />
              </div>
            </div>

            {/* Feedback */}
            {feedback.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#46DFB1]">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Feedback</span>
                </div>
                <ul className="space-y-2">
                  {feedback.map((item, idx) => (
                    <li key={idx} className="text-sm text-foreground/70 flex gap-2">
                      <span className="text-[#80EE98]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {formScore >= 0.9 && (
              <div className="bg-[#80EE98]/20 border border-[#80EE98]/50 rounded-lg p-3 text-sm text-[#80EE98]">
                Great form! You've earned an achievement badge for perfect form execution.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
