"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SkuSheetPanelProps {
  skuFile: File | null
  setSkuFile: (file: File | null) => void
  skuData: string[][] | null
  setSkuData: (data: string[][] | null) => void
}

export function SkuSheetPanel({ skuFile, setSkuFile, skuData, setSkuData }: SkuSheetPanelProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (file: File) => {
    setSkuFile(file)
    // Parse CSV/XLSX file (simplified for demo)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const rows = text.split("\n").map((row) => row.split(","))
      setSkuData(rows.slice(0, 6)) // Show first 5 rows + header
    }
    reader.readAsText(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xlsx"))) {
      handleFileChange(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileChange(file)
    }
  }

  return (
    <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#EAEAEA] font-mono">SKU Sheet</h2>
        <Button variant="link" size="sm" className="text-[#3D7FFF] hover:text-[#3D7FFF]/80 text-xs" asChild>
          <a href="/template.csv" download>
            <Download className="w-3 h-3 mr-1" />
            Download template CSV
          </a>
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="sku-file" className="block text-sm text-[#C9CDD1] mb-2">
            Upload your SKU sheet with product lines, COGS, margins, and source countries.
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-[#3D7FFF] bg-[#3D7FFF]/5" : "border-[#1F2123] bg-[#0B0B0B] hover:border-[#3D7FFF]/50"
            }`}
          >
            <input
              type="file"
              id="sku-file"
              accept=".csv,.xlsx"
              onChange={handleInputChange}
              className="sr-only"
              aria-label="Upload your SKU sheet"
            />
            <Upload className="w-8 h-8 text-[#9FA3A7] mx-auto mb-3" />
            <p className="text-sm text-[#C9CDD1] mb-1">
              {skuFile ? skuFile.name : "Drag and drop your CSV or XLSX file here"}
            </p>
            <p className="text-xs text-[#9FA3A7] mb-3">or</p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123] hover:text-[#EAEAEA] cursor-pointer"
            >
              <label htmlFor="sku-file" className="cursor-pointer">
                Browse files
              </label>
            </Button>
          </div>
        </div>

        {/* Table preview */}
        {skuData && (
          <div className="overflow-x-auto">
            <div className="text-xs text-[#9FA3A7] mb-2 font-mono">Preview (first 5 rows):</div>
            <div className="border border-[#1F2123] rounded-lg overflow-hidden">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="bg-[#151719]">
                    {skuData[0]?.map((header, i) => (
                      <th
                        key={i}
                        className="px-3 py-2 text-left text-[#21CE99] font-semibold border-b border-[#1F2123]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skuData.slice(1).map((row, i) => (
                    <tr key={i} className="border-b border-[#1F2123] hover:bg-[#151719]/50">
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2 text-[#EAEAEA]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
