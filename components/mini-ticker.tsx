"use client"

import { useEffect, useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface MiniTickerItem {
  name: string
  location: string
  status: string
  change?: "up" | "down"
}

const miniTickerItems: MiniTickerItem[] = [
  { name: "CN Creatine", location: "CN", status: "Risk High", change: "up" },
  { name: "MX Plastics", location: "MX", status: "Stable", change: "down" },
  { name: "IN Spices", location: "IN", status: "Alert", change: "up" },
  { name: "CN Creatine", location: "CN", status: "Risk High", change: "up" },
  { name: "MX Plastics", location: "MX", status: "Stable", change: "down" },
  { name: "IN Spices", location: "IN", status: "Alert", change: "up" },
]

export function MiniTicker() {
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsPaused(true)
    }
  }, [])

  return (
    <div
      className="relative overflow-hidden bg-[#0B0B0B]/50 border-t border-[#1F2123]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Mini ticker feed"
    >
      <div
        className={`flex gap-6 py-2 ${isPaused ? "" : "animate-[scroll_30s_linear_infinite]"}`}
        style={{ width: "max-content" }}
      >
        {miniTickerItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 whitespace-nowrap font-mono text-xs text-[#9FA3A7]">
            <span>{item.name}</span>
            {item.change && (
              <span className={item.change === "up" ? "text-[#FF3B30]" : "text-[#21CE99]"}>
                {item.change === "up" ? (
                  <ArrowUp className="w-3 h-3 inline" />
                ) : (
                  <ArrowDown className="w-3 h-3 inline" />
                )}
              </span>
            )}
            <span>{item.status}</span>
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
