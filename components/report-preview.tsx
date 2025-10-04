export function ReportPreview() {
  return (
    <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6">
      <h2 className="font-mono text-lg text-[#EAEAEA] mb-6">Report Preview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: PDF Preview */}
        <div className="bg-[#151719] border border-[#1F2123] rounded-lg p-8 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="w-32 h-40 bg-[#0B0B0B] border border-[#1F2123] rounded mx-auto mb-4 flex items-center justify-center">
              <span className="font-mono text-xs text-[#C9CDD1]">PDF Cover</span>
            </div>
            <p className="text-sm text-[#C9CDD1]">Sample PDF Report</p>
          </div>
        </div>

        {/* Right: Metadata & Preview Table */}
        <div className="space-y-4">
          <div className="bg-[#151719] border border-[#1F2123] rounded-lg p-4">
            <p className="text-sm text-[#C9CDD1] mb-1">Last generated</p>
            <p className="font-mono text-[#EAEAEA]">Oct 3, 2025 at 2:45 PM</p>
          </div>

          <div className="bg-[#151719] border border-[#1F2123] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#0B0B0B] border-b border-[#1F2123]">
                <tr>
                  <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">SKU</th>
                  <th className="text-left p-3 font-mono text-xs text-[#C9CDD1]">Risk</th>
                  <th className="text-right p-3 font-mono text-xs text-[#C9CDD1]">Margin Δ</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr className="border-b border-[#1F2123]">
                  <td className="p-3 text-[#EAEAEA]">CREA-500</td>
                  <td className="p-3 text-[#FF3B30]">High</td>
                  <td className="p-3 text-right text-[#FF3B30]">-8.4%</td>
                </tr>
                <tr className="border-b border-[#1F2123]">
                  <td className="p-3 text-[#EAEAEA]">WHEY-1000</td>
                  <td className="p-3 text-[#FFD60A]">Medium</td>
                  <td className="p-3 text-right text-[#FFD60A]">-3.2%</td>
                </tr>
                <tr className="border-b border-[#1F2123]">
                  <td className="p-3 text-[#EAEAEA]">BCAA-250</td>
                  <td className="p-3 text-[#21CE99]">Low</td>
                  <td className="p-3 text-right text-[#21CE99]">+1.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
