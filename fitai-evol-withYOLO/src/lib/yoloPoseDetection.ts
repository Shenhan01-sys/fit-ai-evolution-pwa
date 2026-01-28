// Use default import to avoid Rollup/Vite ESM parsing issues with lazy __esm pattern
import ort from 'onnxruntime-web'

interface Keypoint {
    x: number
    y: number
    confidence: number
}

interface PoseResult {
    keypoints: Keypoint[]
    confidence: number
}

/**
 * YOLO11-Nano Pose Detector
 * Uses ONNX Runtime Web with WebGPU/WebGL/WASM backends
 */
class YOLOPoseDetector {
    // Use 'any' for session type to avoid complex onnxruntime-web type issues
    private session: any = null
    private modelLoaded = false
    private inputSize = 640

    // Performance monitoring
    private frameCount = 0
    private lastFpsUpdate = Date.now()
    private currentFPS = 0
    private inferenceTime = 0

    /**
     * Initialize YOLO model
     * Auto-selects best execution provider: WebGPU > WebGL > WASM
     */
    async initialize(): Promise<void> {
        try {
            console.log('🚀 Initializing YOLO11-Nano Pose...')

            // Configure ONNX Runtime
            ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.17.0/dist/'

            // Try execution providers in order of preference
            // Use 'any' to avoid complex nested type issues with ort.InferenceSession.ExecutionProviderConfig
            const providers: Array<{ name: string }> = []

            // Check WebGPU support (TypeScript safe check)
            if ('gpu' in navigator && navigator.gpu) {
                providers.push({ name: 'webgpu' })
                console.log('✅ WebGPU detected')
            }

            // Fallback providers
            providers.push({ name: 'webgl' })
            providers.push({ name: 'wasm' })

            // Load model
            this.session = await ort.InferenceSession.create(
                '/models/yolo11n-pose.onnx',
                {
                    executionProviders: providers as any,
                    graphOptimizationLevel: 'all'
                }
            )

            this.modelLoaded = true

            // Log provider (safe access)
            const sessionProvider = (this.session as any).handler?.executionProviders?.[0] || 'unknown'
            console.log('✅ YOLO11 loaded with provider:', sessionProvider)
        } catch (error) {
            console.error('❌ Failed to load YOLO model:', error)
            throw error
        }
    }

    /**
     * Detect pose from video element
     */
    async detectPose(videoElement: HTMLVideoElement): Promise<PoseResult> {
        if (!this.session || !this.modelLoaded) {
            throw new Error('Model not initialized. Call initialize() first.')
        }

        const startTime = performance.now()

        // Preprocess
        const inputTensor = await this.preprocessImage(videoElement)

        // Inference
        const feeds = { images: inputTensor }
        const results = await this.session.run(feeds)

        // Postprocess
        const poseResult = this.postprocessOutput(results)

        // Track performance
        this.inferenceTime = performance.now() - startTime
        this.updateFPS()

        return poseResult
    }

    /**
     * Update FPS calculation
     */
    private updateFPS() {
        this.frameCount++
        const now = Date.now()

        if (now - this.lastFpsUpdate > 1000) {
            this.currentFPS = this.frameCount
            this.frameCount = 0
            this.lastFpsUpdate = now
        }
    }

    /**
     * Get current FPS
     */
    getFPS(): number {
        return this.currentFPS
    }

    /**
     * Get last inference time in milliseconds
     */
    getInferenceTime(): number {
        return this.inferenceTime
    }

    /**
     * Preprocess image to YOLO input format
     * Input: Video element
     * Output: Tensor [1, 3, 640, 640] normalized to 0-1
     */
    private async preprocessImage(img: HTMLVideoElement): Promise<ort.Tensor> {
        const canvas = document.createElement('canvas')
        canvas.width = this.inputSize
        canvas.height = this.inputSize
        const ctx = canvas.getContext('2d')!

        // Draw video frame to canvas (resized to 640x640)
        ctx.drawImage(img, 0, 0, this.inputSize, this.inputSize)
        const imageData = ctx.getImageData(0, 0, this.inputSize, this.inputSize)

        // Convert to CHW format (Channels, Height, Width)
        // YOLO expects [1, 3, 640, 640] tensor
        const float32Data = new Float32Array(3 * this.inputSize * this.inputSize)

        for (let i = 0; i < imageData.data.length / 4; i++) {
            // Normalize to 0-1 and arrange in CHW format
            const r = imageData.data[i * 4] / 255.0
            const g = imageData.data[i * 4 + 1] / 255.0
            const b = imageData.data[i * 4 + 2] / 255.0

            float32Data[i] = r                                          // R channel
            float32Data[this.inputSize * this.inputSize + i] = g       // G channel
            float32Data[this.inputSize * this.inputSize * 2 + i] = b   // B channel
        }

        return new ort.Tensor('float32', float32Data, [1, 3, this.inputSize, this.inputSize])
    }

    /**
     * Postprocess YOLO output to keypoints
     * YOLO11 output format: [1, 56, 8400]
     * 56 = 4 (bbox) + 1 (obj conf) + 51 (17 keypoints * 3: x, y, conf)
     */
    private postprocessOutput(output: Record<string, InstanceType<typeof ort.Tensor>>): PoseResult {
        const outputTensor = output.output0
        const data = outputTensor.data as Float32Array

        // Find detection with highest confidence
        let maxConfidence = 0
        let maxIndex = 0

        for (let i = 0; i < 8400; i++) {
            const confidence = data[4 * 8400 + i]  // Object confidence at index 4
            if (confidence > maxConfidence) {
                maxConfidence = confidence
                maxIndex = i
            }
        }

        // Extract keypoints for best detection
        const keypoints: Keypoint[] = []

        // YOLO17 keypoints order:
        // 0: nose, 1-2: eyes, 3-4: ears, 5-6: shoulders,
        // 7-8: elbows, 9-10: wrists, 11-12: hips,
        // 13-14: knees, 15-16: ankles

        for (let kp = 0; kp < 17; kp++) {
            const baseIdx = (5 + kp * 3) * 8400 + maxIndex

            keypoints.push({
                x: data[baseIdx] / this.inputSize,         // Normalize to 0-1
                y: data[baseIdx + 8400] / this.inputSize,   // Normalize to 0-1
                confidence: data[baseIdx + 8400 * 2]
            })
        }

        return {
            keypoints,
            confidence: maxConfidence
        }
    }

    /**
     * Check if model is ready
     */
    isReady(): boolean {
        return this.modelLoaded
    }
}

// Export singleton instance
export const yoloDetector = new YOLOPoseDetector()
