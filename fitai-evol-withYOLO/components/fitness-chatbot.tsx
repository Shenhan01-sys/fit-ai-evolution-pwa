"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Loader } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function FitnessChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey there! I'm your AI Fitness Coach powered by Groq. I can help you with personalized workout plans, fitness advice, nutrition tips, and form corrections. What would you like to work on today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error("Not authenticated")

      // Call the AI chat API route
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      // Add AI response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Save chat to database if user wants to
      await supabase.from("chat_history").insert({
        user_id: userData.user.id,
        user_message: input,
        assistant_response: data.response,
      })
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-full flex flex-col bg-[#15919B]/10 border-[#46DFB1]/30">
      {/* Chat Header */}
      <div className="border-b border-[#46DFB1]/20 p-4">
        <h2 className="text-xl font-bold text-[#80EE98]">Fitness AI Coach</h2>
        <p className="text-sm text-foreground/60">Powered by Groq AI</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-[#46DFB1] text-[#213A58] rounded-br-none"
                  : "bg-[#09D1C7]/20 text-foreground border border-[#46DFB1]/30 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#09D1C7]/20 border border-[#46DFB1]/30 rounded-lg rounded-bl-none px-4 py-2">
              <div className="flex gap-2 items-center">
                <Loader className="w-4 h-4 animate-spin text-[#80EE98]" />
                <span className="text-sm text-foreground/60">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-[#46DFB1]/20 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask about workouts, form, nutrition..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="border-[#46DFB1]/30 focus:border-[#46DFB1] bg-[#0C6478]/50"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[#80EE98] text-[#213A58] hover:bg-[#46DFB1] shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
