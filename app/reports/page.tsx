import { ConsoleNavigation } from "@/components/console-navigation"
import { ReportsHeader } from "@/components/reports-header"
import { ExportOptions } from "@/components/export-options"
import { ReportPreview } from "@/components/report-preview"
import { ReportHistory } from "@/components/report-history"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <ConsoleNavigation />
      <ReportsHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <ExportOptions />
        <ReportPreview />
        <ReportHistory />
      </div>
    </div>
  )
}
