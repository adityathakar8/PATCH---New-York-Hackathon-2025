"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function DocsHeader() {
  return (
    <section className="bg-[#0B0B0B] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="font-sans text-4xl sm:text-5xl font-bold text-[#EAEAEA] mb-4">Documentation</h1>
          <p className="text-lg text-[#C9CDD1] leading-relaxed">Everything you need to get started with PATCH</p>
        </div>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9CDD1]" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="pl-12 bg-[#111214] border-[#1F2123] text-[#EAEAEA] placeholder:text-[#C9CDD1] h-12"
          />
        </div>
      </div>
    </section>
  )
}
