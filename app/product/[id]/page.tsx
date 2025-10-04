import { ConsoleNavigation } from "@/components/console-navigation"
import { ProductHeader } from "@/components/product-header"
import { CoreDetailsTable } from "@/components/core-details-table"
import { EvidenceCards } from "@/components/evidence-cards"
import { ScenarioBuilder } from "@/components/scenario-builder"

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <ConsoleNavigation />
      <ProductHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Core Details */}
          <div className="lg:col-span-4">
            <CoreDetailsTable />
          </div>

          {/* Center Column - Evidence Cards */}
          <div className="lg:col-span-5">
            <EvidenceCards />
          </div>

          {/* Right Column - Scenario Builder */}
          <div className="lg:col-span-3">
            <ScenarioBuilder />
          </div>
        </div>
      </div>
    </div>
  )
}
