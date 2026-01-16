// Exercise Detection Category Mapping
// Intelligently maps ANY AI-generated exercise name to detection algorithms

export type DetectionCategory = 'squats' | 'pushups' | 'planks' | 'generic'
export type ExerciseEnvironment = 'HOME' | 'GYM' | 'EITHER'

interface ExerciseClassification {
    category: DetectionCategory
    environment: ExerciseEnvironment
    displayName: string
    confidence: number
    needsEquipment: boolean
}

/**
 * Keyword patterns for intelligent exercise categorization
 * These patterns allow AI to generate ANY exercise variant
 */
const CATEGORY_KEYWORDS = {
    squats: [
        // Squat variants
        'squat', 'lunge', 'step-up', 'split',
        // Movement patterns
        'deep knee', 'leg bend', 'drop',
        // Specific exercises
        'pistol', 'goblet', 'sumo', 'sissy', 'zercher',
        'bulgarian', 'curtsy', 'hindu', 'cossack'
    ],

    pushups: [
        // Push variants
        'push', 'press', 'dip',
        // Body parts
        'chest', 'tricep', 'shoulder',
        // Specific exercises
        'diamond', 'pike', 'archer', 'decline', 'incline',
        'bench', 'military', 'overhead'
    ],

    planks: [
        // Hold positions
        'plank', 'hold', 'bridge', 'hollow',
        // Core exercises
        'core hold', 'side plank', 'elbow plank',
        'front lever', 'back lever',
        // Dynamic planks
        'mountain climber', 'bear crawl'
    ]
}

/**
 * Movement-based detection for generic category
 * Looks for action verbs and movement patterns
 */
const GENERIC_MOVEMENT_KEYWORDS = [
    // Cardio movements
    'jump', 'hop', 'run', 'sprint', 'jog',
    'kick', 'punch', 'swing', 'throw',

    // Strength movements
    'curl', 'row', 'pull', 'lift', 'raise',
    'extend', 'flex', 'rotate', 'twist',

    // Compound movements
    'burpee', 'thruster', 'clean', 'snatch',
    'deadlift', 'swing', 'slam',

    // Bodyweight
    'sit-up', 'crunch', 'leg raise', 'v-up',
    'jackknife', 'bicycle', 'flutter'
]

/**
 * GYM EQUIPMENT Keywords - Exercises that NEED equipment
 * These should NOT use camera detection (equipment blocks body)
 */
const GYM_EQUIPMENT_KEYWORDS = [
    // Weight equipment
    'barbell', 'dumbbell', 'kettlebell', 'weight', 'plate',

    // Machines
    'bench press', 'lat pulldown', 'cable', 'machine',
    'leg press', 'chest press', 'shoulder press machine',
    'smith machine', 'hack squat',

    // Pull-up bars (borderline, but often gym)
    'pull-up bar', 'chin-up bar',

    // Specific gym exercises
    'deadlift', 'barbell row', 'bench', 'rack pull',
    't-bar row', 'preacher curl', 'leg extension',
    'leg curl', 'calf raise machine', 'pec deck'
]

/**
 * Smart exercise categorization using NLP-like keyword matching
 * Handles ANY exercise name that AI generates
 * NOW with GYM vs HOME detection!
 */
export function mapExerciseToCategory(exerciseName: string): ExerciseClassification {
    const normalized = exerciseName.toLowerCase().trim()

    // CHECK FOR GYM EQUIPMENT FIRST
    let needsEquipment = false
    let isGymExercise = false

    for (const keyword of GYM_EQUIPMENT_KEYWORDS) {
        if (normalized.includes(keyword)) {
            needsEquipment = true
            isGymExercise = true
            break
        }
    }

    // Score each category based on keyword matches
    const scores = {
        squats: 0,
        pushups: 0,
        planks: 0,
        generic: 0
    }

    // Check squat keywords
    for (const keyword of CATEGORY_KEYWORDS.squats) {
        if (normalized.includes(keyword)) {
            scores.squats += 1
            // Bonus for exact word match (not substring)
            const regex = new RegExp(`\\b${keyword}\\b`, 'i')
            if (regex.test(normalized)) {
                scores.squats += 0.5
            }
        }
    }

    // Check pushup keywords
    for (const keyword of CATEGORY_KEYWORDS.pushups) {
        if (normalized.includes(keyword)) {
            scores.pushups += 1
            const regex = new RegExp(`\\b${keyword}\\b`, 'i')
            if (regex.test(normalized)) {
                scores.pushups += 0.5
            }
        }
    }

    // Check plank keywords
    for (const keyword of CATEGORY_KEYWORDS.planks) {
        if (normalized.includes(keyword)) {
            scores.planks += 1
            const regex = new RegExp(`\\b${keyword}\\b`, 'i')
            if (regex.test(normalized)) {
                scores.planks += 0.5
            }
        }
    }

    // Check generic movement keywords
    for (const keyword of GENERIC_MOVEMENT_KEYWORDS) {
        if (normalized.includes(keyword)) {
            scores.generic += 0.5
        }
    }

    // Find highest scoring category
    const maxScore = Math.max(scores.squats, scores.pushups, scores.planks, scores.generic)

    // If no keywords matched, default to generic
    if (maxScore === 0) {
        return {
            category: 'generic',
            environment: isGymExercise ? 'GYM' : 'EITHER',
            displayName: exerciseName,
            confidence: 0.3,
            needsEquipment
        }
    }

    // Return category with highest score
    let category: DetectionCategory = 'generic'
    if (scores.squats === maxScore) category = 'squats'
    else if (scores.pushups === maxScore) category = 'pushups'
    else if (scores.planks === maxScore) category = 'planks'

    return {
        category,
        environment: isGymExercise ? 'GYM' : 'HOME',
        displayName: exerciseName,
        confidence: Math.min(maxScore / 3, 1.0),
        needsEquipment
    }
}

/**
 * Get exercise description based on detected category
 */
export function getExerciseDescription(category: DetectionCategory): string {
    const descriptions = {
        squats: 'Knee bend movement - tracking hip-to-knee angle',
        pushups: 'Upper body push - tracking elbow angle',
        planks: 'Core hold - tracking body alignment',
        generic: 'General movement - tracking motion patterns'
    }

    return descriptions[category]
}

/**
 * Validate if exercise name makes sense (basic sanity check)
 */
export function isValidExercise(exerciseName: string): boolean {
    const normalized = exerciseName.toLowerCase().trim()

    // Must have at least 3 characters
    if (normalized.length < 3) return false

    // Must contain at least one letter
    if (!/[a-z]/.test(normalized)) return false

    // Shouldn't be just numbers
    if (/^\d+$/.test(normalized)) return false

    return true
}

/**
 * Suggest similar exercises for user (optional enhancement)
 */
export function getSimilarExercises(category: DetectionCategory): string[] {
    const examples = {
        squats: ['Squats', 'Lunges', 'Step-ups', 'Bulgarian Split Squats', 'Jump Squats'],
        pushups: ['Push-ups', 'Dips', 'Bench Press', 'Shoulder Press', 'Diamond Push-ups'],
        planks: ['Planks', 'Side Planks', 'Mountain Climbers', 'Bear Crawls', 'Hollow Holds'],
        generic: ['Jumping Jacks', 'Burpees', 'High Knees', 'Bicep Curls', 'Rows']
    }

    return examples[category]
}
