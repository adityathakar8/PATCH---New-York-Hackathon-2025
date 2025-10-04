"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BusinessContextPanel } from "@/components/business-context-panel"
import { SkuSheetPanel } from "@/components/sku-sheet-panel"
import Link from "next/link"

export function UploadInterface() {
  const [businessContext, setBusinessContext] = useState("")
  const [businessFile, setBusinessFile] = useState<File | null>(null)
  const [skuFile, setSkuFile] = useState<File | null>(null)
  const [skuData, setSkuData] = useState<string[][] | null>(null)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Two-panel layout */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <BusinessContextPanel
              businessContext={businessContext}
              setBusinessContext={setBusinessContext}
              businessFile={businessFile}
              setBusinessFile={setBusinessFile}
            />
            <SkuSheetPanel skuFile={skuFile} setSkuFile={setSkuFile} skuData={skuData} setSkuData={setSkuData} />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-[#21CE99] text-[#0B0B0B] hover:bg-[#21CE99]/90 font-semibold shadow-lg shadow-[#21CE99]/20"
            >
              <Link href="/console">Analyze My Business</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-[#3D7FFF] text-[#3D7FFF] hover:bg-[#3D7FFF]/10 bg-transparent"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
