"use client"

export function CoreDetailsTable() {
  const details = [
    { label: "Source Countries", value: "CN, IN, US" },
    { label: "Current COGS", value: "$12.50/kg" },
    { label: "Predicted COGS Change", value: "+18.2%", isNegative: true },
    { label: "Old Margin", value: "32.5%" },
    { label: "New Margin", value: "24.1%", isNegative: true },
    { label: "ΔEBITDA", value: "-8.4%", isNegative: true },
  ]

  return (
    <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6">
      <h2 className="font-mono text-lg text-[#EAEAEA] mb-4">Core Details</h2>
      <div className="space-y-4">
        {details.map((detail, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-[#1F2123] last:border-0">
            <span className="text-sm text-[#C9CDD1]">{detail.label}</span>
            <span
              className={`font-mono text-sm font-medium ${detail.isNegative ? "text-[#FF3B30]" : "text-[#EAEAEA]"}`}
            >
              {detail.value}
            </span>
          </div>
        ))}

        {/* Mini sparkline */}
        <div className="pt-4">
          <p className="text-xs text-[#C9CDD1] mb-2">Historical vs Predicted Cost</p>
          <div className="h-16 bg-[#151719] rounded border border-[#1F2123] flex items-end gap-1 p-2">
            {[40, 42, 38, 45, 43, 41, 44, 48, 52, 58, 62, 68].map((height, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm ${i < 8 ? "bg-[#21CE99]/30" : "bg-[#FF3B30]/50"}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
