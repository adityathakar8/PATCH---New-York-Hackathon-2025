"use client"

import { useEffect, useMemo, useRef, useState } from "react"
export function ConsoleTicker() {
  // Mock data for ticker display
  const insights = {
    ticker: [
      { name: "System Ready", location: "—", risk: "STABLE" as const, message: "Upload data to start" },
    ]
  }
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

  const tickerItems = useMemo(() => {
    if (!insights.ticker?.length) {
      return [
        { name: "System Ready", location: "—", risk: "STABLE" as const, message: "Upload data to start" },
      ]
    }
    return insights.ticker
  }, [insights.ticker])

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
