"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type Step = "goals" | "fitness-level" | "preferences" | "complete"

interface OnboardingData {
  fitnessGoal: string
  fitnessLevel: string
  focusArea: string
  workoutDays: number
  equipmentAvailable: string[]
}

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState<Step>("goals")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    fitnessGoal: "",
    fitnessLevel: "",
    focusArea: "full-body",
    workoutDays: 3,
    equipmentAvailable: [],
  })
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleNext = () => {
    if (currentStep === "goals" && !data.fitnessGoal) {
      toast({ title: "Please select a fitness goal", variant: "destructive" })
      return
    }
    if (currentStep === "fitness-level" && !data.fitnessLevel) {
      toast({ title: "Please select a fitness level", variant: "destructive" })
      return
    }

    const steps: Step[] = ["goals", "fitness-level", "preferences", "complete"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const steps: Step[] = ["goals", "fitness-level", "preferences", "complete"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error("Not authenticated")

      // Save onboarding data to database
      const { error } = await supabase.from("user_preferences").insert({
        user_id: userData.user.id,
        fitness_goal: data.fitnessGoal,
        fitness_level: data.fitnessLevel,
        focus_area: data.focusArea,
        workout_days_per_week: data.workoutDays,
        equipment_available: data.equipmentAvailable,
      })

      if (error) throw error

      toast({ title: "Onboarding completed! Welcome to FitAI Evolution" })
      router.push("/app/dashboard")
    } catch (error) {
      toast({
        title: "Error saving preferences",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#213A58] to-[#0C6478] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-[#15919B]/10 border-[#46DFB1]/30">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-2">
              {["goals", "fitness-level", "preferences"].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    ["goals", "fitness-level", "preferences"].indexOf(step) <=
                    ["goals", "fitness-level", "preferences"].indexOf(currentStep)
                      ? "bg-[#80EE98]"
                      : "bg-[#46DFB1]/30"
                  }`}
                />
              ))}
            </div>
          </div>
          <CardTitle className="text-3xl text-[#80EE98]">
            {currentStep === "goals" && "What are your fitness goals?"}
            {currentStep === "fitness-level" && "What's your fitness level?"}
            {currentStep === "preferences" && "Let's customize your experience"}
            {currentStep === "complete" && "You're all set!"}
          </CardTitle>
          <CardDescription className="text-base text-foreground/60">
            {currentStep === "goals" && "Help us understand what you want to achieve"}
            {currentStep === "fitness-level" && "This helps us create better workouts for you"}
            {currentStep === "preferences" && "Configure your workout preferences"}
            {currentStep === "complete" && "Ready to start your AI-powered fitness journey"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === "goals" && (
            <div className="space-y-4">
              <RadioGroup value={data.fitnessGoal} onValueChange={(value) => setData({ ...data, fitnessGoal: value })}>
                {[
                  { value: "weight-loss", label: "Lose Weight", description: "Burn calories and reduce body fat" },
                  {
                    value: "muscle-gain",
                    label: "Build Muscle",
                    description: "Increase strength and muscle mass",
                  },
                  {
                    value: "endurance",
                    label: "Improve Endurance",
                    description: "Build stamina and cardiovascular health",
                  },
                  {
                    value: "flexibility",
                    label: "Improve Flexibility",
                    description: "Increase mobility and range of motion",
                  },
                  {
                    value: "general-fitness",
                    label: "General Fitness",
                    description: "Maintain overall health and wellness",
                  },
                ].map((option) => (
                  <div
                    key={option.value}
                    className="flex items-start gap-3 p-3 rounded-lg border border-[#46DFB1]/20 hover:border-[#46DFB1]/50 cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      <div className="font-semibold text-foreground">{option.label}</div>
                      <div className="text-sm text-foreground/60">{option.description}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {currentStep === "fitness-level" && (
            <div className="space-y-4">
              <RadioGroup
                value={data.fitnessLevel}
                onValueChange={(value) => setData({ ...data, fitnessLevel: value })}
              >
                {[
                  {
                    value: "beginner",
                    label: "Beginner",
                    description: "New to fitness, minimal exercise experience",
                  },
                  {
                    value: "intermediate",
                    label: "Intermediate",
                    description: "Regular exercise, familiar with gym routines",
                  },
                  {
                    value: "advanced",
                    label: "Advanced",
                    description: "High fitness level, complex training experience",
                  },
                ].map((option) => (
                  <div
                    key={option.value}
                    className="flex items-start gap-3 p-3 rounded-lg border border-[#46DFB1]/20 hover:border-[#46DFB1]/50 cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={`level-${option.value}`} />
                    <Label htmlFor={`level-${option.value}`} className="flex-1 cursor-pointer">
                      <div className="font-semibold text-foreground">{option.label}</div>
                      <div className="text-sm text-foreground/60">{option.description}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {currentStep === "preferences" && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="focus-area" className="text-foreground">
                  Primary Focus Area
                </Label>
                <Select value={data.focusArea} onValueChange={(value) => setData({ ...data, focusArea: value })}>
                  <SelectTrigger id="focus-area" className="border-[#46DFB1]/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-body">Full Body</SelectItem>
                    <SelectItem value="upper-body">Upper Body</SelectItem>
                    <SelectItem value="lower-body">Lower Body</SelectItem>
                    <SelectItem value="core">Core Strength</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="workout-days" className="text-foreground">
                  How many days per week can you workout?
                </Label>
                <Input
                  id="workout-days"
                  type="number"
                  min="1"
                  max="7"
                  value={data.workoutDays}
                  onChange={(e) => setData({ ...data, workoutDays: Number.parseInt(e.target.value) || 3 })}
                  className="border-[#46DFB1]/30"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-foreground">Equipment Available</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Dumbbells", "Barbell", "Machines", "Bodyweight", "Resistance Bands", "Kettlebell"].map(
                    (equipment) => (
                      <label
                        key={equipment}
                        className="flex items-center gap-2 p-2 rounded border border-[#46DFB1]/20 hover:border-[#46DFB1]/50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={data.equipmentAvailable.includes(equipment)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setData({
                                ...data,
                                equipmentAvailable: [...data.equipmentAvailable, equipment],
                              })
                            } else {
                              setData({
                                ...data,
                                equipmentAvailable: data.equipmentAvailable.filter((eq) => eq !== equipment),
                              })
                            }
                          }}
                        />
                        {equipment}
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === "complete" && (
            <div className="text-center space-y-4 py-8">
              <div className="text-5xl mb-4">🎉</div>
              <div className="space-y-2">
                <p className="text-foreground/70">Your profile is ready!</p>
                <p className="text-sm text-foreground/60">
                  Let's generate your first AI-powered workout and validate your form with our camera-based system.
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <div className="px-6 pb-6 flex gap-3 justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === "goals"}>
            Previous
          </Button>
          {currentStep !== "complete" ? (
            <Button onClick={handleNext} className="bg-[#80EE98] text-[#213A58] hover:bg-[#46DFB1]">
              Next
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={isLoading}
              className="bg-[#80EE98] text-[#213A58] hover:bg-[#46DFB1]"
            >
              {isLoading ? "Starting..." : "Start Your Journey"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
