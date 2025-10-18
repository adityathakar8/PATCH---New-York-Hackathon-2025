"use client"

import { Loader2 } from "lucide-react"

export function ConsoleLoading() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Loader2 className="w-12 h-12 text-[#3D7FFF] animate-spin" />
        </div>
        <h2 className="text-2xl font-semibold text-[#EAEAEA] mb-2">Analyzing Your Data</h2>
        <p className="text-[#C9CDD1] mb-4">
          Our AI is processing your SKU data and generating insights...
        </p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-[#3D7FFF] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#3D7FFF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[#3D7FFF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
