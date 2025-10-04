"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, FileSpreadsheet, MessageSquare } from "lucide-react"

export function IntegrationsTab() {
  const [integrations, setIntegrations] = useState([
    { name: "Google Sheets", icon: Sheet, status: "connected", description: "Sync PATCH data to Google Sheets" },
    {
      name: "QuickBooks",
      icon: FileSpreadsheet,
      status: "available",
      description: "Connect to QuickBooks for financial data",
    },
    { name: "Slack Alerts", icon: MessageSquare, status: "available", description: "Get risk alerts in Slack" },
  ])

  const toggleIntegration = (index: number) => {
    setIntegrations((prev) =>
      prev.map((integration, i) =>
        i === index
          ? { ...integration, status: integration.status === "connected" ? "available" : "connected" }
          : integration,
      ),
    )
  }

  return (
    <div className="space-y-4 max-w-4xl">
      <h2 className="font-mono text-lg text-[#EAEAEA] mb-6">Available Integrations</h2>
      {integrations.map((integration, index) => {
        const Icon = integration.icon
        return (
          <div
            key={index}
            className="bg-[#111214] border border-[#1F2123] rounded-lg p-6 flex items-center justify-between hover:border-[#3D7FFF]/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#151719] border border-[#1F2123] rounded-lg p-3">
                <Icon className="h-6 w-6 text-[#3D7FFF]" />
              </div>
              <div>
                <h3 className="font-mono text-[#EAEAEA] mb-1">{integration.name}</h3>
                <p className="text-sm text-[#C9CDD1]">{integration.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {integration.status === "connected" ? (
                <>
                  <Badge className="bg-[#21CE99]/10 text-[#21CE99] border-[#21CE99]/20">Connected</Badge>
                  <Button
                    onClick={() => toggleIntegration(index)}
                    variant="outline"
                    size="sm"
                    className="border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123]"
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => toggleIntegration(index)}
                  size="sm"
                  className="bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90"
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
