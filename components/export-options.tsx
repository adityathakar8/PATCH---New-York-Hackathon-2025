"use client"

import { Button } from "@/components/ui/button"
import { FileText, FileSpreadsheet, Sheet } from "lucide-react"

export function ExportOptions() {
  const options = [
    {
      icon: FileText,
      title: "PDF Summary Report",
      description: "One-click executive report of SKUs, risks, and margin forecasts.",
      buttonText: "Generate PDF",
      buttonColor: "bg-[#21CE99] text-[#0B0B0B] hover:bg-[#21CE99]/90",
    },
    {
      icon: FileSpreadsheet,
      title: "CSV Export",
      description: "Raw data for further analysis.",
      buttonText: "Download CSV",
      buttonColor: "bg-[#FFD60A] text-[#0B0B0B] hover:bg-[#FFD60A]/90",
    },
    {
      icon: Sheet,
      title: "Google Sheets Sync",
      description: "Send PATCH results directly to your Sheets.",
      buttonText: "Sync Now",
      buttonColor: "bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {options.map((option, index) => {
        const Icon = option.icon
        return (
          <div
            key={index}
            className="bg-[#111214] border border-[#1F2123] rounded-lg p-6 hover:border-[#3D7FFF]/30 transition-colors"
          >
            <Icon className="h-8 w-8 text-[#3D7FFF] mb-4" />
            <h3 className="font-mono text-lg text-[#EAEAEA] mb-2">{option.title}</h3>
            <p className="text-sm text-[#C9CDD1] mb-6">{option.description}</p>
            <Button className={`w-full font-medium ${option.buttonColor}`}>{option.buttonText}</Button>
          </div>
        )
      })}
    </div>
  )
}
