"use client"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader, Camera, CheckCircle, AlertCircle } from "lucide-react"

declare global {
  interface Window {
    tm: {
      mobilenet: any
      Webcam: any
      tmPose: any
    }
  }
}

interface PoseDetectionResult {
  formScore: number
  feedback: string[]
  keyPoints: Array<{
    name: string
    position: { x: number; y: number }
    confidence: number
  }>
}

export function PoseDetector({
  exerciseName,
  onFormScore,
}: {
  exerciseName: string
  onFormScore: (score: number, feedback: string[]) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const webcamRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [poseData, setPoseData] = useState<PoseDetectionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const modelRef = useRef<any>(null)

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Load TensorFlow and pose detection models
        const script1 = document.createElement("script")
        script1.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4"
        script1.async = true

        const script2 = document.createElement("script")
        script2.src = "https://cdn.jsdelivr.net/npm/@tensorflow-models/movenet@1"
        script2.async = true

        await new Promise((resolve) => {
          script1.onload = resolve
          document.head.appendChild(script1)
        })

        await new Promise((resolve) => {
          script2.onload = resolve
          document.head.appendChild(script2)
        })

        // Initialize webcam and model
        if (canvasRef.current && typeof window !== "undefined") {
          const canvas = canvasRef.current
          canvas.width = window.innerWidth > 768 ? 640 : 400
          canvas.height = window.innerHeight > 768 ? 480 : 300

          setIsLoading(false)
        }
      } catch (err) {
        setError("Failed to load pose detection models. Please try again.")
        console.error("Model loading error:", err)
        setIsLoading(false)
      }
    }

    loadModels()
  }, [])

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      })

      if (canvasRef.current && canvasRef.current.parentElement) {
        const video = document.createElement("video")
        video.srcObject = stream
        video.play()
        webcamRef.current = video

        setIsActive(true)
        detectPose(video)
      }
    } catch (err) {
      setError("Cannot access camera. Please check permissions.")
      console.error("Camera error:", err)
    }
  }

  const detectPose = async (video: HTMLVideoElement) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawFrame = async () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Mock pose detection (replace with actual Teachable Machine API in production)
      const mockPoses = generateMockPoses(exerciseName)
      setPoseData(mockPoses)
      onFormScore(mockPoses.formScore, mockPoses.feedback)

      // Draw skeleton on canvas
      drawSkeleton(ctx, mockPoses.keyPoints, canvas.width, canvas.height)

      if (isActive) {
        requestAnimationFrame(drawFrame)
      }
    }

    drawFrame()
  }

  const drawSkeleton = (
    ctx: CanvasRenderingContext2D,
    keyPoints: Array<{ name: string; position: { x: number; y: number }; confidence: number }>,
    canvasWidth: number,
    canvasHeight: number,
  ) => {
    // Draw joints
    keyPoints.forEach((point) => {
      if (point.confidence > 0.3) {
        ctx.fillStyle = point.confidence > 0.7 ? "#80EE98" : "#46DFB1"
        ctx.beginPath()
        ctx.arc(point.position.x * canvasWidth, point.position.y * canvasHeight, 5, 0, 2 * Math.PI)
        ctx.fill()

        // Draw label
        ctx.fillStyle = "#80EE98"
        ctx.font = "12px sans-serif"
        ctx.fillText(point.name, point.position.x * canvasWidth + 10, point.position.y * canvasHeight - 5)
      }
    })

    // Draw skeleton connections
    const connections = [
      ["nose", "left_shoulder"],
      ["left_shoulder", "left_elbow"],
      ["left_elbow", "left_wrist"],
      ["right_shoulder", "right_elbow"],
      ["right_elbow", "right_wrist"],
      ["left_shoulder", "left_hip"],
      ["left_hip", "left_knee"],
      ["left_knee", "left_ankle"],
      ["right_hip", "right_knee"],
      ["right_knee", "right_ankle"],
    ]

    ctx.strokeStyle = "#46DFB1"
    ctx.lineWidth = 2

    connections.forEach(([start, end]) => {
      const startPoint = keyPoints.find((p) => p.name === start)
      const endPoint = keyPoints.find((p) => p.name === end)

      if (startPoint && endPoint && startPoint.confidence > 0.3 && endPoint.confidence > 0.3) {
        ctx.beginPath()
        ctx.moveTo(startPoint.position.x * canvasWidth, startPoint.position.y * canvasHeight)
        ctx.lineTo(endPoint.position.x * canvasWidth, endPoint.position.y * canvasHeight)
        ctx.stroke()
      }
    })
  }

  const stopDetection = () => {
    setIsActive(false)
    if (webcamRef.current) {
      webcamRef.current.srcObject?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
    }
  }

  const generateMockPoses = (exercise: string): PoseDetectionResult => {
    const baseScore = Math.random() * 0.4 + 0.5 // 0.5-0.9
    const feedbacks: Record<string, string[]> = {
      pushup: ["Keep your body straight", "Lower your chest closer to ground", "Elbows should be at 45 degrees"],
      squat: ["Go deeper", "Keep chest up", "Weight on heels"],
      deadlift: ["Back straight", "Hips too high initially", "Good lockout"],
    }

    return {
      formScore: baseScore,
      feedback: feedbacks[exercise.toLowerCase()] || ["Form acceptable", "Slight improvement needed"],
      keyPoints: [
        { name: "nose", position: { x: 0.5, y: 0.2 }, confidence: 0.95 },
        { name: "left_shoulder", position: { x: 0.3, y: 0.4 }, confidence: 0.9 },
        { name: "right_shoulder", position: { x: 0.7, y: 0.4 }, confidence: 0.9 },
        { name: "left_elbow", position: { x: 0.2, y: 0.6 }, confidence: 0.85 },
        { name: "right_elbow", position: { x: 0.8, y: 0.6 }, confidence: 0.85 },
        { name: "left_hip", position: { x: 0.35, y: 0.7 }, confidence: 0.88 },
        { name: "right_hip", position: { x: 0.65, y: 0.7 }, confidence: 0.88 },
        { name: "left_knee", position: { x: 0.3, y: 0.85 }, confidence: 0.82 },
        { name: "right_knee", position: { x: 0.7, y: 0.85 }, confidence: 0.82 },
      ],
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-[#80EE98]" />
            <p>Loading pose detection...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
      <CardHeader>
        <CardTitle>Form Validation - {exerciseName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
          {!isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Button
                onClick={startWebcam}
                className="bg-[#80EE98] text-[#213A58] hover:bg-[#46DFB1] flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Start Webcam
              </Button>
            </div>
          )}
        </div>

        {poseData && (
          <>
            <div className="p-4 rounded-lg border border-[#46DFB1]/30 bg-[#0C6478]/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Form Score</h3>
                <span className="text-2xl font-bold text-[#80EE98]">{(poseData.formScore * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-[#15919B] rounded-full h-2">
                <div
                  className="bg-[#80EE98] h-2 rounded-full transition-all"
                  style={{ width: `${poseData.formScore * 100}%` }}
                />
              </div>
            </div>

            {poseData.feedback.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-[#46DFB1]">Feedback</h3>
                <ul className="space-y-1">
                  {poseData.feedback.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#80EE98] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div className="flex gap-2">
          {isActive ? (
            <Button
              onClick={stopDetection}
              variant="outline"
              className="flex-1 border-[#46DFB1] text-[#46DFB1] hover:bg-[#46DFB1]/10 bg-transparent"
            >
              Stop
            </Button>
          ) : (
            <Button onClick={startWebcam} className="flex-1 bg-[#80EE98] text-[#213A58] hover:bg-[#46DFB1]">
              Start Detection
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
