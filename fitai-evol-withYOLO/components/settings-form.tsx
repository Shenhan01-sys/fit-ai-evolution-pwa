"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface Settings {
  theme_mode: string
  notifications_enabled: boolean
  push_notifications_enabled: boolean
  email_notifications_enabled: boolean
  language: string
  units_system: string
  display_achievements: boolean
}

export function SettingsForm({ initialData }: { initialData: Settings }) {
  const [formData, setFormData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleToggle = (name: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase
        .from("user_settings")
        .update({
          theme_mode: formData.theme_mode,
          notifications_enabled: formData.notifications_enabled,
          push_notifications_enabled: formData.push_notifications_enabled,
          email_notifications_enabled: formData.email_notifications_enabled,
          language: formData.language,
          units_system: formData.units_system,
          display_achievements: formData.display_achievements,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)

      if (error) throw error

      toast({
        title: "Settings updated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error updating settings",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Display Settings */}
      <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme_mode">Theme</Label>
            <select
              id="theme_mode"
              name="theme_mode"
              value={formData.theme_mode}
              onChange={handleChange}
              className="px-3 py-2 rounded-md border border-[#46DFB1]/30 bg-background"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="px-3 py-2 rounded-md border border-[#46DFB1]/30 bg-background"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="units_system">Units System</Label>
            <select
              id="units_system"
              name="units_system"
              value={formData.units_system}
              onChange={handleChange}
              className="px-3 py-2 rounded-md border border-[#46DFB1]/30 bg-background"
            >
              <option value="metric">Metric (kg, m)</option>
              <option value="imperial">Imperial (lbs, ft)</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="display_achievements">Show Achievements</Label>
            <Switch
              id="display_achievements"
              checked={formData.display_achievements}
              onCheckedChange={(value) => handleToggle("display_achievements", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications_enabled">All Notifications</Label>
            <Switch
              id="notifications_enabled"
              checked={formData.notifications_enabled}
              onCheckedChange={(value) => handleToggle("notifications_enabled", value)}
            />
          </div>

          <div className="flex items-center justify-between pl-6">
            <Label htmlFor="push_notifications_enabled">Push Notifications</Label>
            <Switch
              id="push_notifications_enabled"
              checked={formData.push_notifications_enabled && formData.notifications_enabled}
              onCheckedChange={(value) => handleToggle("push_notifications_enabled", value)}
              disabled={!formData.notifications_enabled}
            />
          </div>

          <div className="flex items-center justify-between pl-6">
            <Label htmlFor="email_notifications_enabled">Email Notifications</Label>
            <Switch
              id="email_notifications_enabled"
              checked={formData.email_notifications_enabled && formData.notifications_enabled}
              onCheckedChange={(value) => handleToggle("email_notifications_enabled", value)}
              disabled={!formData.notifications_enabled}
            />
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        onClick={(e) => handleSubmit(e as any)}
        disabled={isLoading}
        className="w-full bg-[#80EE98] text-[#213A58] hover:bg-[#46DFB1]"
      >
        {isLoading ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  )
}
