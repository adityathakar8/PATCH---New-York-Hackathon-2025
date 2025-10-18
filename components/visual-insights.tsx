"use client"

import { TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"
import { useAgentInsights } from "@/hooks/use-agent-insights"

export function VisualInsights() {
  const { insights, source } = useAgentInsights()

  const marginColor = insights.marginAtRisk.direction === "down" ? "#FF3B30" : "#21CE99"
  const sparklineMax = Math.max(...insights.marginAtRisk.sparkline, 1)

  return (
    <div className="space-y-6">
      {/* Margin-at-Risk Panel */}
      <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#EAEAEA]">Margin-at-Risk ({insights.marginAtRisk.window})</h3>
          <span className="text-[10px] uppercase tracking-wide text-[#C9CDD1] font-mono">
            {source === "airia" ? "Live" : "Mock"} Airia Insight
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold font-mono" style={{ color: marginColor }}>
                {insights.marginAtRisk.value > 0 ? "+" : ""}
                {insights.marginAtRisk.value}%
              </p>
              <p className="text-xs text-[#C9CDD1] mt-1">EBITDA trajectory across next {insights.marginAtRisk.window}</p>
              <p className="text-xs text-[#9FA3A7] mt-2 leading-relaxed">
                {insights.marginAtRisk.message}
              </p>
            </div>
            {insights.marginAtRisk.direction === "down" ? (
              <TrendingDown className="w-8 h-8" style={{ color: marginColor }} />
            ) : (
              <TrendingUp className="w-8 h-8" style={{ color: marginColor }} />
            )}
          </div>
          {/* Sparkline */}
          <div className="h-16 flex items-end gap-1">
            {insights.marginAtRisk.sparkline.map((value, i) => (
              <div key={i} className="flex-1 bg-[#3D7FFF] rounded-t" style={{ height: `${(value / sparklineMax) * 100}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-[#C9CDD1] font-mono">
            <span>Today</span>
            <span>+30d</span>
            <span>+60d</span>
            <span>+90d</span>
          </div>
        </div>
      </div>

      {/* Ingredient Movers Panel */}
      <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-[#EAEAEA] mb-4">Ingredient Movers</h3>
        <div className="space-y-3 font-mono text-sm">
          {insights.ingredientMovers.map((mover, index) => {
            const isRising = mover.trend === "RISING"
            const isFalling = mover.trend === "FALLING"
            const variantColor = isRising ? "text-[#FF3B30]" : isFalling ? "text-[#21CE99]" : "text-[#C9CDD1]"
            const deltaLabel = mover.deltaRisk ? `${isRising ? "↑" : isFalling ? "↓" : ""}${mover.deltaRisk}% risk` : mover.trend

            return (
              <div key={index} className="flex items-center justify-between">
                <span className="text-[#EAEAEA]">
                  {mover.ingredient || mover.sku} ({mover.location || "—"})
                </span>
                <div className="flex items-center gap-2">
                  {isRising && <TrendingUp className="w-4 h-4 text-[#FF3B30]" />}
                  {isFalling && <TrendingDown className="w-4 h-4 text-[#21CE99]" />}
                  {!isRising && !isFalling && <AlertTriangle className="w-4 h-4 text-[#FFD60A]" />}
                  <span className={`${variantColor} font-medium`}>{deltaLabel}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top Alerts Panel */}
      <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-[#EAEAEA] mb-4">Top Alerts</h3>
        <div className="space-y-3">
          {insights.topAlerts.map((alert, index) => {
            const borderColor = alert.severity === "high" ? "#FF3B30" : alert.severity === "medium" ? "#FFD60A" : "#21CE99"
            return (
              <div key={index} className="pl-3 py-2 bg-[#151719] rounded-r" style={{ borderLeft: `2px solid ${borderColor}` }}>
                <p className="text-sm text-[#EAEAEA] mb-1">{alert.title}</p>
                <div className="flex flex-col gap-1 text-xs text-[#C9CDD1]">
                  <span className="leading-relaxed">{alert.summary}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">Confidence: {alert.confidence.toFixed(2)}</span>
                    {alert.sourceName && alert.sourceUrl && (
                      <>
                        <span>•</span>
                        <a href={alert.sourceUrl} className="text-[#3D7FFF] hover:underline" target="_blank" rel="noreferrer">
                          Source: {alert.sourceName}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
