"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  first_name: string
  last_name: string
  bio: string
  avatar_url: string
  date_of_birth: string
  location: string
  phone_number: string
  gender: string
}

export function ProfileForm({ initialData }: { initialData: Profile }) {
  const [formData, setFormData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
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
        .from("user_profiles")
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          date_of_birth: formData.date_of_birth,
          location: formData.location,
          phone_number: formData.phone_number,
          gender: formData.gender,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)

      if (error) throw error

      toast({
        title: "Profile updated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-[#15919B]/10 border-[#46DFB1]/30">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={formData.avatar_url || "/placeholder.svg"} alt={formData.first_name} />
              <AvatarFallback className="bg-[#46DFB1] text-[#213A58]">
                {formData.first_name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label htmlFor="avatar_url">Avatar URL</Label>
              <Input
                id="avatar_url"
                name="avatar_url"
                value={formData.avatar_url || ""}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="border-[#46DFB1]/30"
              />
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name || ""}
                onChange={handleChange}
                className="border-[#46DFB1]/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name || ""}
                onChange={handleChange}
                className="border-[#46DFB1]/30"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="border-[#46DFB1]/30 h-24 resize-none"
            />
          </div>

          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth || ""}
                onChange={handleChange}
                className="border-[#46DFB1]/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-[#46DFB1]/30 bg-background"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                placeholder="City, Country"
                className="border-[#46DFB1]/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={formData.phone_number || ""}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="border-[#46DFB1]/30"
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-[#80EE98] text-[#213A58] hover:bg-[#46DFB1]">
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
