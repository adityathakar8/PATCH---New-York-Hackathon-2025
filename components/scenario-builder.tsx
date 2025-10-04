"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export function ScenarioBuilder() {
  const [sourceCountry, setSourceCountry] = useState("CN")
  const [priceAdjustment, setPriceAdjustment] = useState([0])
  const [sellingPrice, setSellingPrice] = useState("45.00")
  const [newMargin, setNewMargin] = useState(26)

  const handleRecompute = () => {
    // Simulate margin calculation
    const adjustment = priceAdjustment[0]
    const baseMargin = 24.1
    const calculatedMargin = baseMargin + adjustment * 0.15
    setNewMargin(Math.round(calculatedMargin * 10) / 10)
  }

  return (
    <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6 sticky top-24">
      <h2 className="font-mono text-lg text-[#EAEAEA] mb-6">Scenario Builder</h2>

      <div className="space-y-6">
        {/* Source Country Selector */}
        <div className="space-y-2">
          <Label htmlFor="source-country" className="text-sm text-[#C9CDD1]">
            Source Country
          </Label>
          <Select value={sourceCountry} onValueChange={setSourceCountry}>
            <SelectTrigger id="source-country" className="bg-[#151719] border-[#1F2123] text-[#EAEAEA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#151719] border-[#1F2123]">
              <SelectItem value="CN">China (CN)</SelectItem>
              <SelectItem value="IN">India (IN)</SelectItem>
              <SelectItem value="US">United States (US)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Adjustment Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="price-adjustment" className="text-sm text-[#C9CDD1]">
              Supplier Price Adjustment
            </Label>
            <span className="font-mono text-sm text-[#EAEAEA]">{priceAdjustment[0]}%</span>
          </div>
          <Slider
            id="price-adjustment"
            min={-20}
            max={20}
            step={1}
            value={priceAdjustment}
            onValueChange={setPriceAdjustment}
            className="[&_[role=slider]]:bg-[#21CE99] [&_[role=slider]]:border-[#21CE99]"
          />
          <div className="flex justify-between text-xs text-[#C9CDD1] font-mono">
            <span>-20%</span>
            <span>0%</span>
            <span>+20%</span>
          </div>
        </div>

        {/* Selling Price Input */}
        <div className="space-y-2">
          <Label htmlFor="selling-price" className="text-sm text-[#C9CDD1]">
            Selling Price ($/kg)
          </Label>
          <Input
            id="selling-price"
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className="bg-[#151719] border-[#1F2123] text-[#EAEAEA] font-mono"
          />
        </div>

        {/* Recompute Button */}
        <Button
          onClick={handleRecompute}
          className="w-full bg-[#21CE99] text-[#0B0B0B] hover:bg-[#21CE99]/90 font-medium"
        >
          Recompute Scenario
        </Button>

        {/* Output Panel */}
        <div className="bg-[#151719] border border-[#1F2123] rounded-lg p-4 space-y-2">
          <p className="text-xs text-[#C9CDD1] mb-2">Scenario Results</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono text-[#21CE99] font-bold">{newMargin}%</span>
            <span className="text-sm text-[#C9CDD1]">New Predicted Margin</span>
          </div>
          <p className="text-xs text-[#21CE99] font-mono">+{(newMargin - 24.1).toFixed(1)} pts vs baseline</p>
        </div>
      </div>
    </div>
  )
}
