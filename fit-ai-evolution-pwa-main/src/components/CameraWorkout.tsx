import { useEffect, useRef, useState, useCallback } from 'react'
import { Pose, Results } from '@mediapipe/pose'
import { Camera as MediaPipeCamera } from '@mediapipe/camera_utils'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { POSE_CONNECTIONS } from '@mediapipe/pose'
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
    const poseRef = useRef<Pose | null>(null)
    const cameraRef = useRef<MediaPipeCamera | null>(null)

    const [isModelLoading, setIsModelLoading] = useState(true)
    const [hasPermission, setHasPermission] = useState(false)
    const [repCount, setRepCount] = useState(0)
    const [coachState, setCoachState] = useState<CoachState>('idle')
    const [currentStage, setCurrentStage] = useState<'up' | 'down'>('up')
    const [poseConfidence, setPoseConfidence] = useState(0)
    const [isInPosition, setIsInPosition] = useState(false)
    const [sessionStartTime] = useState(Date.now())
    const [accuracyScores, setAccuracyScores] = useState<number[]>([])

    // Initialize MediaPipe Pose
    useEffect(() => {
        const initializePose = async () => {
            try {
                setIsModelLoading(true)

                const pose = new Pose({
                    locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
                    }
                })

                pose.setOptions({
                    modelComplexity: 1,  // 0=Lite, 1=Full (best balance), 2=Heavy
                    smoothLandmarks: true,
                    enableSegmentation: false,  // Disable background segmentation for speed
                    smoothSegmentation: false,
                    minDetectionConfidence: 0.5,
                    minTrackingConfidence: 0.5
                })

                pose.onResults(onPoseResults)
                poseRef.current = pose

                setIsModelLoading(false)
            } catch (error) {
                console.error('Failed to initialize MediaPipe Pose:', error)
                setIsModelLoading(false)
            }
        }

        initializePose()

        return () => {
            if (poseRef.current) {
                poseRef.current.close()
            }
        }
    }, [])

    // Process pose detection results
    const onPoseResults = useCallback((results: Results) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Clear canvas
        ctx.save()
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw video frame (mirrored)
        if (results.image) {
            ctx.scale(-1, 1) // Mirror horizontally
            ctx.translate(-canvas.width, 0)
            ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)
            ctx.restore()
            ctx.save()
        }

        // Only process if landmarks detected
        if (results.poseLandmarks) {
            const landmarks = results.poseLandmarks

            // Calculate pose confidence (average of key landmarks visibility)
            const keyLandmarks = [23, 24, 25, 26, 27, 28] // Hips, knees, ankles
            const avgConfidence = keyLandmarks.reduce((sum, idx) =>
                sum + (landmarks[idx]?.visibility || 0), 0) / keyLandmarks.length

            setPoseConfidence(avgConfidence)

            // Exercise-specific logic
            let angle = 0
            let isGoodForm = false

            if (exerciseType === 'squats') {
                // Squat depth detection using knee angle
                const hip = landmarks[23]      // Left hip
                const knee = landmarks[25]     // Left knee
                const ankle = landmarks[27]    // Left ankle

                if (hip && knee && ankle) {
                    angle = calculateAngle(
                        { x: hip.x, y: hip.y },
                        { x: knee.x, y: knee.y },
                        { x: ankle.x, y: ankle.y }
                    )

                    // Squat depth thresholds
                    if (angle < 100) {
                        // Deep squat position
                        if (currentStage === 'up') {
                            setCurrentStage('down')
                        }
                        isGoodForm = true
                    } else if (angle > 160) {
                        // Standing position
                        if (currentStage === 'down') {
                            // Rep completed!
                            setRepCount(prev => prev + 1)
                            setCoachState('counting')
                            setAccuracyScores(prev => [...prev.slice(-99), avgConfidence]) // Keep last 100
                            setTimeout(() => setCoachState('idle'), 500)
                        }
                        setCurrentStage('up')
                        isGoodForm = angle > 160 && angle < 180
                    }
                }
            } else if (exerciseType === 'pushups') {
                // Push-up detection using elbow angle
                const shoulder = landmarks[11]  // Left shoulder
                const elbow = landmarks[13]     // Left elbow
                const wrist = landmarks[15]     // Left wrist

                if (shoulder && elbow && wrist) {
                    angle = calculateAngle(
                        { x: shoulder.x, y: shoulder.y },
                        { x: elbow.x, y: elbow.y },
                        { x: wrist.x, y: wrist.y }
                    )

                    if (angle < 90) {
                        // Push-up down position
                        if (currentStage === 'up') {
                            setCurrentStage('down')
                        }
                        isGoodForm = true
                    } else if (angle > 160) {
                        // Push-up up position
                        if (currentStage === 'down') {
                            setRepCount(prev => prev + 1)
                            setCoachState('counting')
                            setAccuracyScores(prev => [...prev.slice(-99), avgConfidence])
                            setTimeout(() => setCoachState('idle'), 500)
                        }
                        setCurrentStage('up')
                        isGoodForm = true
                    }
                }
            } else if (exerciseType === 'planks') {
                // Plank hold detection using body alignment
                const shoulder = landmarks[11]
                const hip = landmarks[23]
                const ankle = landmarks[27]

                if (shoulder && hip && ankle) {
                    angle = calculateAngle(
                        { x: shoulder.x, y: shoulder.y },
                        { x: hip.x, y: hip.y },
                        { x: ankle.x, y: ankle.y }
                    )

                    // Good plank: body should be straight (170-180°)
                    isGoodForm = angle > 160 && angle < 185
                }
            } else if (exerciseType === 'generic') {
                // Generic detection: Track wrist or ankle vertical movement
                // Works for: Jumping Jacks, Burpees, High Knees, Bicep Curls, etc.
                const leftWrist = landmarks[15]
                const leftAnkle = landmarks[27]
                const rightWrist = landmarks[16]
                const rightAnkle = landmarks[28]

                // Calculate average hand height (for upper body exercises)
                const avgWristY = ((leftWrist?.y || 0) + (rightWrist?.y || 0)) / 2

                // Calculate average ankle height (for lower body exercises)
                const avgAnkleY = ((leftAnkle?.y || 0) + (rightAnkle?.y || 0)) / 2

                // Heuristic: If wrists move more than ankles, it's upper body exercise
                // Otherwise, it's lower body exercise
                const movementThreshold = 0.15  // 15% of frame height

                // Simple up/down state machine based on vertical movement
                if (avgWristY < 0.4 || avgAnkleY < 0.5) {
                    // High position (hands up or jumping)
                    if (currentStage === 'down') {
                        setRepCount(prev => prev + 1)
                        setCoachState('counting')
                        setAccuracyScores(prev => [...prev.slice(-99), avgConfidence])
                        setTimeout(() => setCoachState('idle'), 500)
                    }
                    setCurrentStage('up')
                    isGoodForm = true
                } else if (avgWristY > 0.6 || avgAnkleY > 0.7) {
                    // Low position (hands down or squatting)
                    setCurrentStage('down')
                    isGoodForm = true
                }
            }

            setIsInPosition(isGoodForm && avgConfidence > 0.5)

            // Draw skeleton
            const color = isGoodForm ? '#22C55E' : '#EF4444'

            // Draw connections (bones)
            ctx.globalAlpha = 0.8
            drawConnectors(ctx, landmarks, POSE_CONNECTIONS, { color, lineWidth: 4 })

            // Draw landmarks (joints)
            ctx.globalAlpha = 1.0
            drawLandmarks(ctx, landmarks, { color, lineWidth: 2, radius: 6 })
        }

        ctx.restore()
    }, [exerciseType, currentStage])

    // Start camera
    const startCamera = useCallback(async () => {
        try {
            if (!videoRef.current || !poseRef.current) return

            const camera = new MediaPipeCamera(videoRef.current, {
                onFrame: async () => {
                    if (poseRef.current && videoRef.current) {
                        await poseRef.current.send({ image: videoRef.current })
                    }
                },
                width: 640,
                height: 480
            })

            await camera.start()
            cameraRef.current = camera
            setHasPermission(true)
        } catch (error) {
            console.error('Camera permission denied:', error)
            alert('Camera access is required for workout verification.')
        }
    }, [])

    useEffect(() => {
        if (!isModelLoading && poseRef.current) {
            startCamera()
        }

        return () => {
            if (cameraRef.current) {
                cameraRef.current.stop()
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
                            <p className="text-white font-semibold">Loading MediaPipe AI...</p>
                            <p className="text-gray-400 text-sm mt-1">Google's pose detection model</p>
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
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Reps</p>
                        <p className="text-3xl font-bold text-white">{repCount}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Exercise</p>
                        <p className="text-xl font-semibold text-base-blue capitalize">{exerciseType}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Avg Accuracy</p>
                        <p className="text-3xl font-bold text-success-green">
                            {accuracyScores.length > 0
                                ? Math.round((accuracyScores.reduce((a, b) => a + b, 0) / accuracyScores.length) * 100)
                                : 0}%
                        </p>
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
