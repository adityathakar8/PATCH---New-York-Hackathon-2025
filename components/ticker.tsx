"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface TickerItem {
  name: string
  location: string
  risk: "HIGH" | "LOW" | "VOLATILE" | "DROUGHT"
  change: number
  type: "risk" | "note" | "weather"
}

const tickerItems: TickerItem[] = [
  { name: "Creatine", location: "CN", risk: "HIGH", change: 0.18, type: "risk" },
  { name: "HDPE", location: "MX", risk: "LOW", change: -0.04, type: "risk" },
  { name: "USD/CNY", location: "", risk: "VOLATILE", change: 0, type: "note" },
  { name: "Black Pepper", location: "IN", risk: "DROUGHT", change: 0, type: "weather" },
  { name: "Creatine", location: "CN", risk: "HIGH", change: 0.18, type: "risk" },
  { name: "HDPE", location: "MX", risk: "LOW", change: -0.04, type: "risk" },
  { name: "USD/CNY", location: "", risk: "VOLATILE", change: 0, type: "note" },
  { name: "Black Pepper", location: "IN", risk: "DROUGHT", change: 0, type: "weather" },
]

export function Ticker() {
  const [isPaused, setIsPaused] = useState(false)
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsPaused(true)
    }
  }, [])

  const getRiskColor = (risk: string, change: number) => {
    if (risk === "HIGH" || change > 0) return "text-[#FF3B30]"
    if (risk === "LOW" || change < 0) return "text-[#21CE99]"
    return "text-[#FFD60A]"
  }

  const getRiskBadge = (risk: string) => {
    if (risk === "HIGH") return "bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20"
    if (risk === "LOW") return "bg-[#21CE99]/10 text-[#21CE99] border-[#21CE99]/20"
    return "bg-[#FFD60A]/10 text-[#FFD60A] border-[#FFD60A]/20"
  }

  return (
    <div
      className="relative overflow-hidden border-y border-[#1F2123] bg-[#111214]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Market-like ingredient feed"
      aria-live="polite"
    >
      <div
        ref={tickerRef}
        className={`flex gap-8 py-3 ${isPaused ? "" : "animate-[scroll_40s_linear_infinite]"}`}
        style={{
          width: "max-content",
        }}
      >
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 whitespace-nowrap font-mono text-sm">
            <span className="text-[#EAEAEA] font-medium">
              {item.name} {item.location && `(${item.location})`}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded border ${getRiskBadge(item.risk)}`}>
              {item.type === "risk" ? "Risk:" : item.type === "note" ? "Note:" : "Weather:"} {item.risk}
            </span>
            {item.change !== 0 && (
              <span className={`flex items-center gap-1 font-medium ${getRiskColor(item.risk, item.change)}`}>
                {item.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(item.change).toFixed(2)}
              </span>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
