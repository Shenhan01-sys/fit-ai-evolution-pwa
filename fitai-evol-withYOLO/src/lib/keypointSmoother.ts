/**
 * Temporal Smoothing Filter for YOLO Pose Keypoints
 * Reduces jitter and stabilizes tracking when keypoints are partially occluded
 */

interface Keypoint {
    x: number
    y: number
    confidence: number
}

export class KeypointSmoother {
    private history: Keypoint[][] = []
    private readonly windowSize: number

    constructor(windowSize: number = 5) {
        this.windowSize = windowSize
    }

    /**
     * Apply moving average smoothing to keypoints
     * Uses confidence-weighted averaging for better occlusion handling
     */
    smooth(keypoints: Keypoint[]): Keypoint[] {
        // Add to history
        this.history.push(keypoints)

        // Keep only last N frames
        if (this.history.length > this.windowSize) {
            this.history.shift()
        }

        // If not enough history, return original
        if (this.history.length < 2) {
            return keypoints
        }

        // Apply weighted moving average
        return keypoints.map((_, idx) => {
            let sumX = 0
            let sumY = 0
            let sumConf = 0
            let totalWeight = 0

            // Calculate weighted average across history
            this.history.forEach((frame, frameIdx) => {
                const kp = frame[idx]
                if (kp && kp.confidence > 0.3) {
                    // More recent frames have higher weight
                    const recencyWeight = (frameIdx + 1) / this.history.length
                    const weight = kp.confidence * recencyWeight

                    sumX += kp.x * weight
                    sumY += kp.y * weight
                    sumConf += kp.confidence * weight
                    totalWeight += weight
                }
            })

            // Return smoothed keypoint
            if (totalWeight > 0) {
                return {
                    x: sumX / totalWeight,
                    y: sumY / totalWeight,
                    confidence: sumConf / totalWeight
                }
            }

            // Fallback to current keypoint if no valid history
            return keypoints[idx]
        })
    }

    /**
     * Reset smoothing history (e.g., when switching exercises)
     */
    reset() {
        this.history = []
    }

    /**
     * Get current history size
     */
    getHistorySize(): number {
        return this.history.length
    }
}
