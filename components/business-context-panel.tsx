"use client"

import type React from "react"

import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface BusinessContextPanelProps {
  businessContext: string
  setBusinessContext: (value: string) => void
  businessFile: File | null
  setBusinessFile: (file: File | null) => void
}

export function BusinessContextPanel({
  businessContext,
  setBusinessContext,
  businessFile,
  setBusinessFile,
}: BusinessContextPanelProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBusinessFile(file)
    }
  }

  return (
    <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6">
      <h2 className="text-xl font-semibold text-[#EAEAEA] mb-4 font-mono">Business Context</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="business-context" className="block text-sm text-[#C9CDD1] mb-2">
            Paste or upload your company details (optional).
          </label>
          <Textarea
            id="business-context"
            value={businessContext}
            onChange={(e) => setBusinessContext(e.target.value)}
            placeholder="Example:&#10;- Company: Bare Performance Nutrition&#10;- Cash buffer: 4 months&#10;- Notes: Imports creatine from CN, whey from US, plastics from MX"
            className="min-h-[200px] bg-[#0B0B0B] border-[#1F2123] text-[#EAEAEA] placeholder:text-[#9FA3A7] font-mono text-sm focus:ring-2 focus:ring-[#3D7FFF] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="business-file" className="block text-sm text-[#C9CDD1] mb-2">
            Upload a document (.docx, .pdf, .txt) with your company profile.
          </label>
          <div className="relative">
            <input
              type="file"
              id="business-file"
              accept=".docx,.pdf,.txt"
              onChange={handleFileChange}
              className="sr-only"
              aria-label="Upload your business document"
            />
            <Button
              asChild
              variant="outline"
              className="w-full border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123] hover:text-[#EAEAEA] cursor-pointer"
            >
              <label htmlFor="business-file" className="cursor-pointer flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                {businessFile ? businessFile.name : "Choose file"}
              </label>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
