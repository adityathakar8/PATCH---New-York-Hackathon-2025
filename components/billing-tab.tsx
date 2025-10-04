import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"

export function BillingTab() {
  const invoices = [
    { number: "INV-2025-10", date: "Oct 1, 2025", amount: "$99.00", status: "Paid" },
    { number: "INV-2025-09", date: "Sep 1, 2025", amount: "$99.00", status: "Paid" },
    { number: "INV-2025-08", date: "Aug 1, 2025", amount: "$99.00", status: "Paid" },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Plan Summary */}
      <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-mono text-lg text-[#EAEAEA] mb-2">Current Plan</h2>
            <p className="text-2xl font-mono text-[#21CE99] mb-1">SMB Plan</p>
            <p className="text-[#C9CDD1]">$99/month</p>
          </div>
          <Badge className="bg-[#21CE99]/10 text-[#21CE99] border-[#21CE99]/20">Active</Badge>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90">Upgrade Plan</Button>
          <Button variant="outline" className="border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123]">
            Manage Payment Method
          </Button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6">
        <h2 className="font-mono text-lg text-[#EAEAEA] mb-6">Invoice History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#1F2123]">
              <tr>
                <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Invoice #</th>
                <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Date</th>
                <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Amount</th>
                <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Status</th>
                <th className="text-right p-3 font-mono text-xs text-[#C9CDD1]">Actions</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {invoices.map((invoice, index) => (
                <tr key={index} className="border-b border-[#1F2123] hover:bg-[#151719] transition-colors">
                  <td className="p-3 text-[#EAEAEA]">{invoice.number}</td>
                  <td className="p-3 text-[#C9CDD1]">{invoice.date}</td>
                  <td className="p-3 text-[#EAEAEA]">{invoice.amount}</td>
                  <td className="p-3">
                    <Badge className="bg-[#21CE99]/10 text-[#21CE99] border-[#21CE99]/20 text-xs">
                      {invoice.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-[#3D7FFF] hover:text-[#3D7FFF]/80 hover:bg-[#3D7FFF]/10"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
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
