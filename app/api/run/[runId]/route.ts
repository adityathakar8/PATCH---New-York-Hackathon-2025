import { NextResponse } from "next/server"
import path from "path"
import { pathExists, readJson, RUNS_DIR } from "@/lib/server/fs-utils"
import type { NormalizedSku } from "@/lib/server/sku-processing"
import type { PerplexityResult } from "@/lib/server/perplexity"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type StatusFile = {
  status: "queued" | "running" | "done" | "error"
  error?: string
}

type SummaryFile = {
  highRiskCount: number
  avgMarginDropPct: number
  asOf: string
}

type MetaFile = {
  companyName?: string | null
  websiteUrl?: string | null
  createdAt: string
}

export async function GET(
  _req: Request,
  { params }: { params: { runId: string } }
) {
  const { runId } = params
  const runDir = path.join(RUNS_DIR, runId)

  if (!(await pathExists(runDir))) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 })
  }

  const statusPath = path.join(runDir, "status.json")
  const metaPath = path.join(runDir, "input", "meta.json")
  const skusPath = path.join(runDir, "output", "skus.json")
  const resultsPath = path.join(runDir, "output", "results.json")
  const summaryPath = path.join(runDir, "output", "summary.json")

  const [status, meta, skus, results, summary] = await Promise.all([
    readIfExists<StatusFile>(statusPath),
    readIfExists<MetaFile>(metaPath),
    readIfExists<NormalizedSku[]>(skusPath),
    readIfExists<PerplexityResult[]>(resultsPath),
    readIfExists<SummaryFile>(summaryPath),
  ])

  return NextResponse.json({
    runId,
    status: status?.status ?? "unknown",
    error: status?.error ?? null,
    meta: meta ?? null,
    skus: skus ?? [],
    results: results ?? [],
    summary: summary ?? null,
  })
}

async function readIfExists<T>(filePath: string): Promise<T | null> {
  if (!(await pathExists(filePath))) {
    return null
  }
  return readJson<T>(filePath)
}
