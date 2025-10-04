"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileDown } from "lucide-react"
import Link from "next/link"

export function ProductHeader() {
  return (
    <div className="border-b border-[#1F2123] bg-[#111214]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="font-mono text-2xl sm:text-3xl text-[#EAEAEA] mb-2">Creatine Monohydrate</h1>
              <p className="font-mono text-sm text-[#C9CDD1] mb-3">
                SKU: CREA-500 | Ingredient: Creatine Monohydrate | Source: CN
              </p>
              <Badge className="bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20 hover:bg-[#FF3B30]/20">
                🔴 High Risk
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123] hover:text-[#EAEAEA]"
              >
                <Link href="/console">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Console
                </Link>
              </Button>
              <Button size="sm" className="bg-[#21CE99] text-[#0B0B0B] hover:bg-[#21CE99]/90 font-medium">
                <FileDown className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
