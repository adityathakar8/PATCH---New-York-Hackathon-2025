"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "user",
      content: "What if creatine is sourced from India instead of China?",
    },
    {
      role: "assistant",
      content:
        "Risk would drop from 0.76 → 0.42; predicted margin improves by 8 pts. Caveat: India's drought risk still medium.",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { role: "user", content: input }])
    setInput("")
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm analyzing your query. This is a demo response showing how PATCH would respond to your question.",
        },
      ])
    }, 1000)
  }

  return (
    <div className="bg-[#111214] border border-[#1F2123] rounded-lg overflow-hidden flex flex-col h-[calc(100vh-12rem)] sticky top-24">
      <div className="border-b border-[#1F2123] p-4">
        <h2 className="text-lg font-semibold text-[#EAEAEA]">Ask PATCH</h2>
      </div>

      {/* Quick Action Chips */}
      <div className="p-4 border-b border-[#1F2123] space-y-2">
        <button className="w-full text-left text-xs px-3 py-2 bg-[#151719] hover:bg-[#1F2123] text-[#C9CDD1] rounded border border-[#1F2123] transition-colors">
          Suggest alternate suppliers
        </button>
        <button className="w-full text-left text-xs px-3 py-2 bg-[#151719] hover:bg-[#1F2123] text-[#C9CDD1] rounded border border-[#1F2123] transition-colors">
          What if freight drops 20%?
        </button>
        <button className="w-full text-left text-xs px-3 py-2 bg-[#151719] hover:bg-[#1F2123] text-[#C9CDD1] rounded border border-[#1F2123] transition-colors">
          Show margin by category
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-lg p-3 text-sm ${
                message.role === "user"
                  ? "bg-[#3D7FFF] text-[#EAEAEA]"
                  : "bg-[#151719] text-[#EAEAEA] border border-[#1F2123]"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-[#1F2123] p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about risks, margins, or sourcing…"
            className="flex-1 bg-[#151719] border-[#1F2123] text-[#EAEAEA] placeholder:text-[#C9CDD1]/50"
          />
          <Button onClick={handleSend} size="icon" className="bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
