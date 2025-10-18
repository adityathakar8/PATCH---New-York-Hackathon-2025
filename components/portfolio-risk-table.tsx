"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
// Define portfolio row type locally
type PortfolioRow = {
  id: string
  sku: string
  ingredient: string
  source: string
  riskTier: 'Low' | 'Medium' | 'High'
  deltaCogs: number
  oldMargin: number
  newMargin: number
  deltaEbitda: number
}

type SortField = "riskTier" | "source" | "deltaEbitda"

const riskOrder = { High: 3, Medium: 2, Low: 1 }

function sortPortfolioData(data: PortfolioRow[], field: SortField): PortfolioRow[] {
  return [...data].sort((a, b) => {
    if (field === "riskTier") {
      return riskOrder[b.riskTier] - riskOrder[a.riskTier]
    }
    if (field === "source") {
      return a.source.localeCompare(b.source)
    }
    return a.deltaEbitda - b.deltaEbitda
  })
}

export function PortfolioRiskTable() {
  // Mock data for portfolio risk table
  const insights = {
    portfolioRisks: [
      {
        id: 'fallback-1',
        sku: 'PRO-001',
        ingredient: 'Creatine',
        source: 'CN',
        riskTier: 'High' as const,
        deltaCogs: 18,
        oldMargin: 42,
        newMargin: 28,
        deltaEbitda: -14,
      },
    ]
  }
  const source = 'mock'
  const [sortField, setSortField] = useState<SortField>("riskTier")
  const portfolioData = useMemo(() => insights.portfolioRisks ?? [], [insights.portfolioRisks])
  const [sortedData, setSortedData] = useState<PortfolioRow[]>(sortPortfolioData(portfolioData, sortField))

  useEffect(() => {
    setSortedData(sortPortfolioData(portfolioData, sortField))
  }, [portfolioData, sortField])

  const handleSort = (field: SortField) => {
    setSortField(field)
    setSortedData(sortPortfolioData(portfolioData, field))
  }

  const getRiskBadge = (risk: string) => {
    if (risk === "High") return "🔴 High"
    if (risk === "Medium") return "🟡 Medium"
    return "🟢 Low"
  }

  const getValueColor = (value: number) => {
    if (value > 0) return "text-[#21CE99]"
    if (value < 0) return "text-[#FF3B30]"
    return "text-[#C9CDD1]"
  }

  return (
    <div className="bg-[#111214] border border-[#1F2123] rounded-lg overflow-hidden">
      <div className="border-b border-[#1F2123] p-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-[#EAEAEA]">Portfolio Risk Overview</h2>
          <span className="text-xs text-[#C9CDD1] font-mono">
            {source === "live" ? "Live insights" : "Mock insights"}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={sortField === "riskTier" ? "default" : "outline"}
            onClick={() => handleSort("riskTier")}
            className={
              sortField === "riskTier"
                ? "bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90"
                : "border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123]"
            }
          >
            <ArrowUpDown className="w-3 h-3 mr-1" />
            Sort by Risk
          </Button>
          <Button
            size="sm"
            variant={sortField === "source" ? "default" : "outline"}
            onClick={() => handleSort("source")}
            className={
              sortField === "source"
                ? "bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90"
                : "border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123]"
            }
          >
            <ArrowUpDown className="w-3 h-3 mr-1" />
            Sort by Source
          </Button>
          <Button
            size="sm"
            variant={sortField === "deltaEbitda" ? "default" : "outline"}
            onClick={() => handleSort("deltaEbitda")}
            className={
              sortField === "deltaEbitda"
                ? "bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90"
                : "border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123]"
            }
          >
            <ArrowUpDown className="w-3 h-3 mr-1" />
            Sort by Margin Impact
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono">
          <thead className="bg-[#151719] border-b border-[#2E2E2E]">
            <tr>
              <th className="text-left p-3 text-[#C9CDD1] font-medium">SKU</th>
              <th className="text-left p-3 text-[#C9CDD1] font-medium">Ingredient</th>
              <th className="text-left p-3 text-[#C9CDD1] font-medium">Source</th>
              <th className="text-left p-3 text-[#C9CDD1] font-medium">Risk Tier</th>
              <th className="text-right p-3 text-[#C9CDD1] font-medium">
                ΔCOGS%
                <span className="ml-1 text-xs cursor-help" title="Change in Cost of Goods Sold">
                  ⓘ
                </span>
              </th>
              <th className="text-right p-3 text-[#C9CDD1] font-medium">Old Margin%</th>
              <th className="text-right p-3 text-[#C9CDD1] font-medium">New Margin%</th>
              <th className="text-right p-3 text-[#C9CDD1] font-medium">
                ΔEBITDA%
                <span
                  className="ml-1 text-xs cursor-help"
                  title="Change in Earnings Before Interest, Taxes, Depreciation, and Amortization"
                >
                  ⓘ
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#2E2E2E] hover:bg-[#151719] transition-colors cursor-pointer group"
              >
                <td className="p-3 text-[#EAEAEA] group-hover:text-[#3D7FFF]">{row.sku}</td>
                <td className="p-3 text-[#EAEAEA]">{row.ingredient}</td>
                <td className="p-3 text-[#C9CDD1]">{row.source}</td>
                <td className="p-3">
                  <span className="text-xs">{getRiskBadge(row.riskTier)}</span>
                </td>
                <td className={`p-3 text-right font-medium ${getValueColor(row.deltaCogs)}`}>
                  {row.deltaCogs > 0 ? "+" : ""}
                  {row.deltaCogs}%
                </td>
                <td className="p-3 text-right text-[#C9CDD1]">{row.oldMargin}%</td>
                <td className="p-3 text-right text-[#C9CDD1]">{row.newMargin}%</td>
                <td className={`p-3 text-right font-medium ${getValueColor(row.deltaEbitda)}`}>
                  {row.deltaEbitda > 0 ? "+" : ""}
                  {row.deltaEbitda}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
