import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import path from "path"
import { promises as fs } from "fs"
import { ensureDir, RUNS_DIR, writeJson, writeTextFile, sanitizeFilename } from "@/lib/server/fs-utils"
import { inferOutputExcelName, parseSkuSheet } from "@/lib/server/sku-processing"
import { saveSupportingDocs, buildBusinessContext } from "@/lib/server/context-extraction"
import { analyzeSkuWithPerplexity, type PerplexityResult } from "@/lib/server/perplexity"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 120

const MAX_DOC_TEXT_LENGTH = 2000
const DEFAULT_FILE_SIZE_MB = 20

export async function POST(req: NextRequest) {
  const perplexityApiKey = process.env.PERPLEXITY_API_KEY
  if (!perplexityApiKey) {
    return NextResponse.json({ error: "PERPLEXITY_API_KEY is not configured" }, { status: 500 })
  }

  const maxFileSizeMb = Number(process.env.MAX_FILE_SIZE_MB ?? DEFAULT_FILE_SIZE_MB)
  const maxFileSizeBytes = maxFileSizeMb * 1024 * 1024

  const formData = await req.formData()
  const excelEntry = formData.get("excel")
  if (!excelEntry || !(excelEntry instanceof File)) {
    return NextResponse.json({ error: "An Excel or CSV file is required (field name: excel)" }, { status: 400 })
  }

  if (excelEntry.size === 0) {
    return NextResponse.json({ error: "The uploaded spreadsheet is empty" }, { status: 400 })
  }

  if (excelEntry.size > maxFileSizeBytes) {
    return NextResponse.json(
      { error: `Spreadsheet exceeds the maximum allowed size of ${maxFileSizeMb}MB` },
      { status: 400 }
    )
  }

  const allowedSpreadsheetExtensions = new Set([".xlsx", ".csv"])
  const spreadsheetExt = path.extname(excelEntry.name || "").toLowerCase()
  if (!allowedSpreadsheetExtensions.has(spreadsheetExt)) {
    return NextResponse.json(
      { error: "Unsupported spreadsheet format. Please upload a .xlsx or .csv file." },
      { status: 400 }
    )
  }

  const companyName = stringOrNull(formData.get("company_name"))
  const websiteUrl = stringOrNull(formData.get("website_url"))

  const docEntries = formData.getAll("docs")
  const allowedDocExtensions = new Set([".pdf", ".doc", ".docx"])
  const docFiles = docEntries.filter((entry): entry is File => entry instanceof File && entry.size > 0)
  const validDocFiles = docFiles.filter((file) => {
    const ext = path.extname(file.name || "").toLowerCase()
    return allowedDocExtensions.has(ext)
  })

  for (const doc of validDocFiles) {
    if (doc.size > maxFileSizeBytes) {
      return NextResponse.json(
        { error: `Document ${doc.name} exceeds the maximum allowed size of ${maxFileSizeMb}MB` },
        { status: 400 }
      )
    }
  }

  const runId = randomUUID()
  const runDir = path.join(RUNS_DIR, runId)
  const inputDir = path.join(runDir, "input")
  const docsDir = path.join(inputDir, "docs")
  const outputDir = path.join(runDir, "output")
  const statusPath = path.join(runDir, "status.json")
  const metaPath = path.join(inputDir, "meta.json")
  const contextPath = path.join(inputDir, "context.txt")
  const skusPath = path.join(outputDir, "skus.json")
  const resultsPath = path.join(outputDir, "results.json")
  const summaryPath = path.join(outputDir, "summary.json")

  try {
    await ensureDir(runDir)
    await ensureDir(inputDir)
    await ensureDir(outputDir)
    if (validDocFiles.length > 0) {
      await ensureDir(docsDir)
    }

    await writeJson(statusPath, { status: "queued" })

    const spreadsheetBuffer = Buffer.from(await excelEntry.arrayBuffer())
    const spreadsheetName = inferOutputExcelName(excelEntry.name || "uploaded.xlsx")
    const spreadsheetPath = path.join(inputDir, sanitizeFilename(spreadsheetName))
    await fs.writeFile(spreadsheetPath, spreadsheetBuffer)

    const { savedDocs } = await saveSupportingDocs({
      files: validDocFiles,
      docsDir,
    })

    const businessContext = buildBusinessContext(savedDocs, MAX_DOC_TEXT_LENGTH)
    if (businessContext) {
      await writeTextFile(contextPath, businessContext)
    }

    await writeJson(metaPath, {
      companyName,
      websiteUrl,
      createdAt: new Date().toISOString(),
    })

    await writeJson(statusPath, { status: "running" })

    const skus = parseSkuSheet(spreadsheetBuffer, spreadsheetName)
    if (skus.length === 0) {
      throw new Error("No SKU rows could be parsed from the spreadsheet.")
    }

    await writeJson(skusPath, skus)

    const results: PerplexityResult[] = []
    for (const sku of skus) {
      const result = await analyzeSkuWithPerplexity({
        sku,
        apiKey: perplexityApiKey,
        companyName,
        websiteUrl,
        businessContext,
      })
      results.push(result)
    }

    await writeJson(resultsPath, results)

    const avgMarginDropPct =
      results.length === 0
        ? 0
        : Number(
            (
              results.reduce((sum, item) => sum + (item.margin_drop_pct ?? 0), 0) / results.length
            ).toFixed(4)
          )

    const summary = {
      highRiskCount: results.filter((item) => item.overall_risk_tier === "high").length,
      avgMarginDropPct,
      asOf: new Date().toISOString(),
    }

    await writeJson(summaryPath, summary)
    await writeJson(statusPath, { status: "done" })

    const location = `/console?runId=${encodeURIComponent(runId)}`
    return new NextResponse(null, {
      status: 303,
      headers: {
        Location: location,
        "X-Run-Id": runId,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    await writeJson(statusPath, { status: "error", error: message })

    return NextResponse.json({ error: message, runId }, { status: 500 })
  }
}

function stringOrNull(value: FormDataEntryValue | null): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }
  return null
}
