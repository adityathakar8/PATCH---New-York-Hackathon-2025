"use client"

import { ExternalLink } from "lucide-react"

export function EvidenceCards() {
  const evidence = [
    {
      headline: "China energy constraints tightening supply",
      summary: "Power rationing in Sichuan province affecting chemical production facilities",
      source: "Reuters",
      confidence: 0.82,
      risk: "high",
      date: "Oct 1, 2025",
    },
    {
      headline: "Raw material costs rising in Asian markets",
      summary: "Sarcosine and cyanamide prices up 15% due to supply chain disruptions",
      source: "Bloomberg",
      confidence: 0.76,
      risk: "high",
      date: "Sep 28, 2025",
    },
    {
      headline: "Alternative suppliers emerging in India",
      summary: "New manufacturing capacity coming online Q1 2026",
      source: "Chemical Week",
      confidence: 0.68,
      risk: "medium",
      date: "Sep 25, 2025",
    },
    {
      headline: "Shipping costs stabilizing on Pacific routes",
      summary: "Container rates down 8% month-over-month",
      source: "Freightos",
      confidence: 0.71,
      risk: "low",
      date: "Sep 30, 2025",
    },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "border-[#FF3B30]/30 hover:border-[#FF3B30]/50"
      case "medium":
        return "border-[#FFD60A]/30 hover:border-[#FFD60A]/50"
      case "low":
        return "border-[#21CE99]/30 hover:border-[#21CE99]/50"
      default:
        return "border-[#1F2123]"
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="font-mono text-lg text-[#EAEAEA] mb-4">Evidence & Sources</h2>
      <div className="grid grid-cols-1 gap-4">
        {evidence.map((item, index) => (
          <div
            key={index}
            className={`bg-[#111214] border-2 rounded-lg p-4 transition-all hover:bg-[#151719] ${getRiskColor(
              item.risk,
            )}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-[#EAEAEA] flex-1">{item.headline}</h3>
              <span className="font-mono text-xs text-[#C9CDD1] ml-2">{item.date}</span>
            </div>
            <p className="text-sm text-[#C9CDD1] mb-3">{item.summary}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#C9CDD1]">{item.source}</span>
                <span className="font-mono text-xs text-[#C9CDD1]">
                  Confidence: {(item.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <ExternalLink className="h-4 w-4 text-[#3D7FFF]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
