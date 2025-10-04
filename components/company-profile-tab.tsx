"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CompanyProfileTab() {
  return (
    <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6 max-w-2xl">
      <h2 className="font-mono text-lg text-[#EAEAEA] mb-6">Company Information</h2>
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="company-name" className="text-sm text-[#C9CDD1]">
            Company Name
          </Label>
          <Input
            id="company-name"
            defaultValue="Acme Supplements Inc."
            className="bg-[#151719] border-[#1F2123] text-[#EAEAEA] font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm text-[#C9CDD1]">
            Country
          </Label>
          <Select defaultValue="US">
            <SelectTrigger id="country" className="bg-[#151719] border-[#1F2123] text-[#EAEAEA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#151719] border-[#1F2123]">
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="AU">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm text-[#C9CDD1]">
            Industry
          </Label>
          <Select defaultValue="supplements">
            <SelectTrigger id="industry" className="bg-[#151719] border-[#1F2123] text-[#EAEAEA]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#151719] border-[#1F2123]">
              <SelectItem value="supplements">Supplements & Nutrition</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
              <SelectItem value="cosmetics">Cosmetics</SelectItem>
              <SelectItem value="pharma">Pharmaceuticals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cash-buffer" className="text-sm text-[#C9CDD1]">
            Cash Buffer (months)
          </Label>
          <Input
            id="cash-buffer"
            type="number"
            defaultValue="6"
            className="bg-[#151719] border-[#1F2123] text-[#EAEAEA] font-mono"
          />
        </div>

        <Button className="bg-[#21CE99] text-[#0B0B0B] hover:bg-[#21CE99]/90 font-medium">Save Profile</Button>
      </form>
    </div>
  )
}
