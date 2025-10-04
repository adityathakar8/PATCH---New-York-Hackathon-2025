import { ConsoleNavigation } from "@/components/console-navigation"
import { ConsoleTicker } from "@/components/console-ticker"
import { PortfolioRiskTable } from "@/components/portfolio-risk-table"
import { VisualInsights } from "@/components/visual-insights"
import { AICopilot } from "@/components/ai-copilot"

export default function ConsolePage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <ConsoleNavigation />
      <ConsoleTicker />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Portfolio Risk Table */}
          <div className="lg:col-span-5">
            <PortfolioRiskTable />
          </div>

          {/* Center Column - Visual Insights */}
          <div className="lg:col-span-4">
            <VisualInsights />
          </div>

          {/* Right Column - AI Copilot */}
          <div className="lg:col-span-3">
            <AICopilot />
          </div>
        </div>
      </div>
    </div>
  )
}
