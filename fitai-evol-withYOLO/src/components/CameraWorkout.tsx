import { useEffect, useRef, useState, useCallback } from 'react'
import { yoloDetector } from '@/lib/yoloPoseDetection'
import { KeypointSmoother } from '@/lib/keypointSmoother'
import { VirtualCoach, CoachState } from './VirtualCoach'
import { motion } from 'framer-motion'
import { Camera, CameraOff } from 'lucide-react'

export type ExerciseType = 'squats' | 'pushups' | 'planks' | 'generic'

interface CameraWorkoutProps {
    exerciseType: ExerciseType
    onWorkoutComplete: (data: { reps: number; accuracy: number; duration: number }) => void
}

// Helper: Calculate angle between 3 points
function calculateAngle(a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }): number {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
    let angle = Math.abs(radians * 180.0 / Math.PI)
    if (angle > 180.0) {
        angle = 360 - angle
    }
    return angle
}

export function CameraWorkout({ exerciseType, onWorkoutComplete }: CameraWorkoutProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationFrameRef = useRef<number | null>(null)
    const smootherRef = useRef(new KeypointSmoother(5)) // 5-frame smoothing window

    const [isModelLoading, setIsModelLoading] = useState(true)
    const [hasPermission, setHasPermission] = useState(false)
    const [repCount, setRepCount] = useState(0)
    const [coachState, setCoachState] = useState<CoachState>('idle')
    const [currentStage, setCurrentStage] = useState<'up' | 'down'>('up')
    const [poseConfidence, setPoseConfidence] = useState(0)
    const [isInPosition, setIsInPosition] = useState(false)
    const [sessionStartTime] = useState(Date.now())
    const [accuracyScores, setAccuracyScores] = useState<number[]>([])
    const [currentFPS, setCurrentFPS] = useState(0)
    const [inferenceTime, setInferenceTime] = useState(0)

    // Initialize YOLO11 Pose
    useEffect(() => {
        const initializeYOLO = async () => {
            try {
                setIsModelLoading(true)
                await yoloDetector.initialize()
                setIsModelLoading(false)
                console.log('✅ YOLO11-Nano loaded successfully')
            } catch (error) {
                console.error('❌ Failed to load YOLO11:', error)
                setIsModelLoading(false)
            }
        }

        initializeYOLO()
    }, [])

    // YOLO Pose detection loop
    const detectPoseWithYOLO = useCallback(async () => {
        if (!videoRef.current || !canvasRef.current || !yoloDetector.isReady()) return

        try {
            // Run YOLO detection
            const result = await yoloDetector.detectPose(videoRef.current)

            // Get canvas context
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            if (!ctx) return

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw video frame (mirrored)
            ctx.save()
            ctx.scale(-1, 1)
            ctx.translate(-canvas.width, 0)
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
            ctx.restore()

            // Process keypoints if detected
            if (result.keypoints && result.confidence > 0.5) {
                // Apply temporal smoothing
                const smoothedKeypoints = smootherRef.current.smooth(result.keypoints)

                // Update performance stats
                setCurrentFPS(yoloDetector.getFPS())
                setInferenceTime(yoloDetector.getInferenceTime())

                // Update confidence
                setPoseConfidence(result.confidence)

                // Exercise-specific rep counting logic
                let angle = 0
                let isGoodForm = false

                if (exerciseType === 'squats') {
                    // YOLO keypoints: 11=L_hip, 13=L_knee, 15=L_ankle
                    const hip = smoothedKeypoints[11]
                    const knee = smoothedKeypoints[13]
                    const ankle = smoothedKeypoints[15]

                    if (hip && knee && ankle && hip.confidence > 0.5 && knee.confidence > 0.5) {
                        angle = calculateAngle(
                            { x: hip.x, y: hip.y },
                            { x: knee.x, y: knee.y },
                            { x: ankle.x, y: ankle.y }
                        )

                        if (angle < 100) {
                            if (currentStage === 'up') setCurrentStage('down')
                            isGoodForm = true
                        } else if (angle > 160) {
                            if (currentStage === 'down') {
                                setRepCount(prev => prev + 1)
                                setCoachState('counting')
                                setAccuracyScores(prev => [...prev.slice(-99), result.confidence])
                                setTimeout(() => setCoachState('idle'), 500)
                            }
                            setCurrentStage('up')
                            isGoodForm = true
                        }
                    }
                } else if (exerciseType === 'pushups') {
                    // YOLO keypoints: 5=L_shoulder, 7=L_elbow, 9=L_wrist
                    const shoulder = smoothedKeypoints[5]
                    const elbow = smoothedKeypoints[7]
                    const wrist = smoothedKeypoints[9]

                    if (shoulder && elbow && wrist && shoulder.confidence > 0.5) {
                        angle = calculateAngle(
                            { x: shoulder.x, y: shoulder.y },
                            { x: elbow.x, y: elbow.y },
                            { x: wrist.x, y: wrist.y }
                        )

                        if (angle < 90) {
                            if (currentStage === 'up') setCurrentStage('down')
                            isGoodForm = true
                        } else if (angle > 160) {
                            if (currentStage === 'down') {
                                setRepCount(prev => prev + 1)
                                setCoachState('counting')
                                setAccuracyScores(prev => [...prev.slice(-99), result.confidence])
                                setTimeout(() => setCoachState('idle'), 500)
                            }
                            setCurrentStage('up')
                            isGoodForm = true
                        }
                    }
                } else if (exerciseType === 'planks') {
                    const shoulder = smoothedKeypoints[5]
                    const hip = smoothedKeypoints[11]
                    const ankle = smoothedKeypoints[15]

                    if (shoulder && hip && ankle) {
                        angle = calculateAngle(
                            { x: shoulder.x, y: shoulder.y },
                            { x: hip.x, y: hip.y },
                            { x: ankle.x, y: ankle.y }
                        )
                        isGoodForm = angle > 160 && angle < 185
                    }
                }

                setIsInPosition(isGoodForm)

                // Draw smoothed keypoints
                ctx.fillStyle = isGoodForm ? '#22C55E' : '#EF4444'
                smoothedKeypoints.forEach((kp) => {
                    if (kp.confidence > 0.5) {
                        ctx.beginPath()
                        ctx.arc(kp.x * canvas.width, kp.y * canvas.height, 6, 0, 2 * Math.PI)
                        ctx.fill()
                    }
                })
            }

        } catch (error) {
            console.error('YOLO detection error:', error)
        }

        // Continue loop
        animationFrameRef.current = requestAnimationFrame(detectPoseWithYOLO)
    }, [exerciseType, currentStage])

    // Start camera with native getUserMedia
    const startCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            })

            if (videoRef.current) {
                videoRef.current.srcObject = stream
                await videoRef.current.play()
                setHasPermission(true)

                // Start YOLO detection loop
                detectPoseWithYOLO()
            }
        } catch (error) {
            console.error('Camera permission denied:', error)
            alert('Camera access is required for workout verification.')
        }
    }, [detectPoseWithYOLO])

    // Initialize camera when model is ready
    useEffect(() => {
        if (!isModelLoading && yoloDetector.isReady()) {
            startCamera()
        }

        return () => {
            // Cleanup: stop video stream and animation frame
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
                tracks.forEach(track => track.stop())
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isModelLoading, startCamera])

    const handleComplete = () => {
        const duration = Math.floor((Date.now() - sessionStartTime) / 1000)
        const avgAccuracy = accuracyScores.length > 0
            ? accuracyScores.reduce((a, b) => a + b, 0) / accuracyScores.length
            : 0

        setCoachState('success')

        setTimeout(() => {
            onWorkoutComplete({
                reps: repCount,
                accuracy: avgAccuracy * 100,
                duration
            })
        }, 1500)
    }

    return (
        <div className="relative w-full h-full bg-slate-deep">
            {/* Video + Canvas Container */}
            <div className="relative w-full aspect-video max-w-2xl mx-auto">
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg hidden"
                    playsInline
                    muted
                />

                <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    className="w-full h-full object-cover rounded-lg"
                />

                {/* Loading State */}
                {isModelLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-base-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-white font-semibold">Loading YOLO11-Nano AI...</p>
                            <p className="text-gray-400 text-sm mt-1">Superior gym exercise detection</p>
                        </div>
                    </div>
                )}

                {/* Permission Request */}
                {!hasPermission && !isModelLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
                        <div className="text-center p-6">
                            <CameraOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Camera Access Required</h3>
                            <p className="text-gray-300 mb-4">We need your camera to verify your workout form</p>
                            <button
                                onClick={startCamera}
                                className="flex items-center gap-2 px-6 py-3 bg-base-blue hover:bg-base-blue/80 text-white rounded-lg mx-auto transition-colors"
                            >
                                <Camera size={20} />
                                Enable Camera
                            </button>
                        </div>
                    </div>
                )}

                {/* Form Feedback Indicator */}
                {hasPermission && !isModelLoading && (
                    <motion.div
                        className={`absolute top-4 left-4 px-4 py-2 rounded-full font-semibold ${isInPosition
                            ? 'bg-success-green/90 text-white'
                            : 'bg-gray-500/90 text-white'
                            }`}
                        animate={{ scale: isInPosition ? [1, 1.05, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isInPosition ? '✓ Good Form' : 'Get in position'} ({Math.round(poseConfidence * 100)}%)
                    </motion.div>
                )}
            </div>

            {/* Stats Panel */}
            <div className="max-w-2xl mx-auto mt-6 gradient-card rounded-2xl p-6">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Reps</p>
                        <p className="text-3xl font-bold text-white">{repCount}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Exercise</p>
                        <p className="text-xl font-semibold text-base-blue capitalize">{exerciseType}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Accuracy</p>
                        <p className="text-2xl font-bold text-success-green">
                            {accuracyScores.length > 0
                                ? Math.round((accuracyScores.reduce((a, b) => a + b, 0) / accuracyScores.length) * 100)
                                : 0}%
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm mb-1">FPS</p>
                        <p className="text-2xl font-bold text-white">{currentFPS}</p>
                        <p className="text-xs text-gray-500">{Math.round(inferenceTime)}ms</p>
                    </div>
                </div>

                <button
                    onClick={handleComplete}
                    disabled={repCount === 0}
                    className="w-full mt-6 py-4 bg-success-green hover:bg-success-green/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                    Complete Workout
                </button>
            </div>

            {/* Virtual Coach */}
            <VirtualCoach state={coachState} repCount={repCount} />
        </div>
    )
}
