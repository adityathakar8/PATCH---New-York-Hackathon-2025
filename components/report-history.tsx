import { Button } from "@/components/ui/button"
import { Download, CheckCircle2 } from "lucide-react"

export function ReportHistory() {
  const history = [
    { type: "PDF", date: "Oct 3, 2025", time: "2:45 PM", status: "Completed" },
    { type: "CSV", date: "Sep 29, 2025", time: "11:20 AM", status: "Completed" },
    { type: "PDF", date: "Sep 25, 2025", time: "4:15 PM", status: "Completed" },
    { type: "Sheets", date: "Sep 20, 2025", time: "9:30 AM", status: "Completed" },
  ]

  return (
    <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6">
      <h2 className="font-mono text-lg text-[#EAEAEA] mb-6">Report History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-[#1F2123]">
            <tr>
              <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Report Type</th>
              <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Date Generated</th>
              <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Status</th>
              <th className="text-right p-3 font-mono text-xs text-[#C9CDD1]">Actions</th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            {history.map((item, index) => (
              <tr key={index} className="border-b border-[#1F2123] hover:bg-[#151719] transition-colors">
                <td className="p-3 text-[#EAEAEA]">{item.type}</td>
                <td className="p-3 text-[#C9CDD1]">
                  {item.date} at {item.time}
                </td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-[#21CE99]">
                    <CheckCircle2 className="h-3 w-3" />
                    {item.status}
                  </span>
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
  )
}
