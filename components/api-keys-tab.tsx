"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Trash2, Plus } from "lucide-react"

export function ApiKeysTab() {
  const [keys, setKeys] = useState([
    { name: "Production Key", created: "Sep 15, 2025", status: "Active", key: "pk_live_••••••••••••••••" },
    { name: "Development Key", created: "Aug 20, 2025", status: "Active", key: "pk_test_••••••••••••••••" },
  ])

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6">
        <h2 className="font-mono text-lg text-[#EAEAEA] mb-2">API Keys</h2>
        <p className="text-sm text-[#C9CDD1] mb-6">
          Generate API keys to connect PATCH to your own workflows and applications.
        </p>
        <Button className="bg-[#21CE99] text-[#0B0B0B] hover:bg-[#21CE99]/90 font-medium">
          <Plus className="h-4 w-4 mr-2" />
          Generate New Key
        </Button>
      </div>

      <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6">
        <h3 className="font-mono text-[#EAEAEA] mb-4">Your API Keys</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#1F2123]">
              <tr>
                <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Key Name</th>
                <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Created On</th>
                <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Status</th>
                <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Key</th>
                <th className="text-right p-3 font-mono text-xs text-[#C9CDD1]">Actions</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {keys.map((apiKey, index) => (
                <tr key={index} className="border-b border-[#1F2123] hover:bg-[#151719] transition-colors">
                  <td className="p-3 text-[#EAEAEA]">{apiKey.name}</td>
                  <td className="p-3 text-[#C9CDD1]">{apiKey.created}</td>
                  <td className="p-3">
                    <Badge className="bg-[#21CE99]/10 text-[#21CE99] border-[#21CE99]/20 text-xs">
                      {apiKey.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-[#C9CDD1]">{apiKey.key}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#3D7FFF] hover:text-[#3D7FFF]/80 hover:bg-[#3D7FFF]/10"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#FF3B30] hover:text-[#FF3B30]/80 hover:bg-[#FF3B30]/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
