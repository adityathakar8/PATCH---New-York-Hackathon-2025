import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown, AlertTriangle, CloudRain, Ship } from "lucide-react"

const portfolioData = [
  { sku: "PRO-001", ingredient: "Creatine", source: "CN", riskTier: "HIGH", cogsDelta: "+18%" },
  { sku: "SUP-045", ingredient: "HDPE", source: "MX", riskTier: "LOW", cogsDelta: "-4%" },
  { sku: "VIT-023", ingredient: "Black Pepper", source: "IN", riskTier: "MEDIUM", cogsDelta: "+12%" },
  { sku: "MIN-089", ingredient: "Magnesium", source: "US", riskTier: "LOW", cogsDelta: "+2%" },
]

const alerts = [
  { type: "Sanctions", message: "China export restrictions on creatine", icon: AlertTriangle, color: "#FF3B30" },
  { type: "Drought", message: "India monsoon delays affecting pepper", icon: CloudRain, color: "#FFD60A" },
  { type: "Freight", message: "Red Sea shipping costs +40%", icon: Ship, color: "#FFD60A" },
]

export function ConsolePreview() {
  return (
    <section className="border-b border-[#1F2123] bg-[#0B0B0B]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#EAEAEA] text-center mb-12">Console Preview</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio Risk Table */}
            <div className="lg:col-span-2 bg-[#111214] border border-[#1F2123] rounded-lg overflow-hidden">
              <div className="border-b border-[#1F2123] px-4 py-3">
                <h3 className="text-sm font-semibold text-[#EAEAEA] font-mono">PORTFOLIO RISK</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-[#1F2123]">
                    <tr className="text-[#C9CDD1] font-mono text-xs">
                      <th className="text-left px-4 py-2 font-medium">SKU</th>
                      <th className="text-left px-4 py-2 font-medium">INGREDIENT</th>
                      <th className="text-left px-4 py-2 font-medium">SOURCE</th>
                      <th className="text-left px-4 py-2 font-medium">RISK TIER</th>
                      <th className="text-right px-4 py-2 font-medium">ΔCOGS%</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {portfolioData.map((row, index) => (
                      <tr key={index} className="border-b border-[#1F2123]/50 hover:bg-[#151719] transition-colors">
                        <td className="px-4 py-3 text-[#EAEAEA]">{row.sku}</td>
                        <td className="px-4 py-3 text-[#C9CDD1]">{row.ingredient}</td>
                        <td className="px-4 py-3 text-[#C9CDD1]">{row.source}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              row.riskTier === "HIGH"
                                ? "bg-[#FF3B30]/10 text-[#FF3B30]"
                                : row.riskTier === "MEDIUM"
                                  ? "bg-[#FFD60A]/10 text-[#FFD60A]"
                                  : "bg-[#21CE99]/10 text-[#21CE99]"
                            }`}
                          >
                            {row.riskTier}
                          </span>
                        </td>
                        <td
                          className={`px-4 py-3 text-right font-medium ${row.cogsDelta.startsWith("+") ? "text-[#FF3B30]" : "text-[#21CE99]"}`}
                        >
                          {row.cogsDelta}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Margin at Risk */}
              <div className="bg-[#111214] border border-[#1F2123] rounded-lg overflow-hidden">
                <div className="border-b border-[#1F2123] px-4 py-3">
                  <h3 className="text-sm font-semibold text-[#EAEAEA] font-mono">MARGIN-AT-RISK (30-90d)</h3>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-[#FF3B30] font-mono mb-2">-$47.2K</div>
                  <div className="flex items-center gap-2 text-sm text-[#C9CDD1]">
                    <ArrowDown className="w-4 h-4 text-[#FF3B30]" />
                    <span>12.3% margin compression</span>
                  </div>
                  <div className="mt-4 h-16 flex items-end gap-1">
                    {[40, 55, 48, 62, 58, 70, 65, 75, 68, 80, 85, 90].map((height, i) => (
                      <div key={i} className="flex-1 bg-[#FF3B30]/20 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Alerts */}
              <div className="bg-[#111214] border border-[#1F2123] rounded-lg overflow-hidden">
                <div className="border-b border-[#1F2123] px-4 py-3">
                  <h3 className="text-sm font-semibold text-[#EAEAEA] font-mono">TOP ALERTS</h3>
                </div>
                <div className="p-4 space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <alert.icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: alert.color }} />
                      <div>
                        <div className="text-xs font-semibold text-[#EAEAEA] mb-0.5">{alert.type}</div>
                        <div className="text-xs text-[#C9CDD1] leading-relaxed">{alert.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button asChild size="lg" className="bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90 w-full sm:w-auto">
              <Link href="/console">Launch Console</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123] hover:text-[#EAEAEA] w-full sm:w-auto"
            >
              <Link href="/upload">Upload SKUs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
