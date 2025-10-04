"use client"

import { useEffect, useRef, useState } from "react"

interface TickerItem {
  name: string
  location: string
  risk: "HIGH" | "STABLE" | "ALERT"
  change?: string
  message?: string
}

const tickerItems: TickerItem[] = [
  { name: "Creatine", location: "CN", risk: "HIGH", change: "ΔCOGS +18%" },
  { name: "Whey", location: "US", risk: "STABLE" },
  { name: "Black Pepper", location: "IN", risk: "ALERT", message: "Drought" },
  { name: "Creatine", location: "CN", risk: "HIGH", change: "ΔCOGS +18%" },
  { name: "Whey", location: "US", risk: "STABLE" },
  { name: "Black Pepper", location: "IN", risk: "ALERT", message: "Drought" },
]

export function ConsoleTicker() {
  const [isPaused, setIsPaused] = useState(false)
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsPaused(true)
    }
  }, [])

  const getRiskBadge = (risk: string) => {
    if (risk === "HIGH") return "bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20"
    if (risk === "STABLE") return "bg-[#21CE99]/10 text-[#21CE99] border-[#21CE99]/20"
    return "bg-[#FFD60A]/10 text-[#FFD60A] border-[#FFD60A]/20"
  }

  return (
    <div
      className="relative overflow-hidden border-b border-[#1F2123] bg-[#111214]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Live risk updates feed"
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
              {item.name} ({item.location})
            </span>
            <span className="text-[#C9CDD1]">Risk:</span>
            <span className={`text-xs px-2 py-0.5 rounded border font-medium ${getRiskBadge(item.risk)}`}>
              {item.risk}
            </span>
            {item.change && <span className="text-[#FF3B30] font-medium">{item.change}</span>}
            {item.message && <span className="text-[#FFD60A]">{item.message}</span>}
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
