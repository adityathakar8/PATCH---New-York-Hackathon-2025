"use client"

import { TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"

export function VisualInsights() {
  return (
    <div className="space-y-6">
      {/* Margin-at-Risk Panel */}
      <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-[#EAEAEA] mb-4">Margin-at-Risk (30–90d)</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[#FF3B30] font-mono">–12%</p>
              <p className="text-xs text-[#C9CDD1] mt-1">EBITDA at risk over next 90d</p>
            </div>
            <TrendingDown className="w-8 h-8 text-[#FF3B30]" />
          </div>
          {/* Sparkline */}
          <div className="h-16 flex items-end gap-1">
            {[42, 40, 38, 36, 35, 33, 32, 30, 30, 28, 28, 30].map((value, i) => (
              <div key={i} className="flex-1 bg-[#3D7FFF] rounded-t" style={{ height: `${(value / 42) * 100}%` }} />
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
          <div className="flex items-center justify-between">
            <span className="text-[#EAEAEA]">Creatine (CN)</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF3B30]" />
              <span className="text-[#FF3B30] font-medium">↑18% risk</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#EAEAEA]">Whey (US)</span>
            <span className="text-[#21CE99] font-medium">Stable</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#EAEAEA]">Plastics (MX)</span>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-[#21CE99]" />
              <span className="text-[#21CE99] font-medium">↓4% risk</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#EAEAEA]">Black Pepper (IN)</span>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FFD60A]" />
              <span className="text-[#FFD60A] font-medium">Drought alert</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Alerts Panel */}
      <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-[#EAEAEA] mb-4">Top Alerts</h3>
        <div className="space-y-3">
          <div className="border-l-2 border-[#FF3B30] pl-3 py-2 bg-[#151719] rounded-r">
            <p className="text-sm text-[#EAEAEA] mb-1">China imposes new export permits for creatine precursors</p>
            <div className="flex items-center gap-2 text-xs text-[#C9CDD1]">
              <span className="font-mono">Confidence: 0.89</span>
              <span>•</span>
              <a href="#" className="text-[#3D7FFF] hover:underline">
                Source: Reuters
              </a>
            </div>
          </div>
          <div className="border-l-2 border-[#FFD60A] pl-3 py-2 bg-[#151719] rounded-r">
            <p className="text-sm text-[#EAEAEA] mb-1">India monsoon season delayed, affecting spice crops</p>
            <div className="flex items-center gap-2 text-xs text-[#C9CDD1]">
              <span className="font-mono">Confidence: 0.76</span>
              <span>•</span>
              <a href="#" className="text-[#3D7FFF] hover:underline">
                Source: Bloomberg
              </a>
            </div>
          </div>
          <div className="border-l-2 border-[#21CE99] pl-3 py-2 bg-[#151719] rounded-r">
            <p className="text-sm text-[#EAEAEA] mb-1">US dairy production up 6% YoY, stabilizing whey prices</p>
            <div className="flex items-center gap-2 text-xs text-[#C9CDD1]">
              <span className="font-mono">Confidence: 0.92</span>
              <span>•</span>
              <a href="#" className="text-[#3D7FFF] hover:underline">
                Source: USDA
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
