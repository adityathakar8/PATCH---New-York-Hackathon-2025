import { NextResponse } from "next/server"
import path from "path"
import { pathExists, readJson, RUNS_DIR } from "@/lib/server/fs-utils"
import type { PerplexityResult } from "@/lib/server/perplexity"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(
  _req: Request,
  { params }: { params: { runId: string; sku: string } }
) {
  const { runId } = params
  const requestedSku = decodeURIComponent(params.sku)
  const runDir = path.join(RUNS_DIR, runId)

  if (!(await pathExists(runDir))) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 })
  }

  const resultsPath = path.join(runDir, "output", "results.json")
  if (!(await pathExists(resultsPath))) {
    return NextResponse.json({ error: "Results not available" }, { status: 404 })
  }

  const results = await readJson<PerplexityResult[]>(resultsPath)
  const match =
    results.find((entry) => entry.sku === requestedSku) ??
    results.find((entry) => entry.sku.toLowerCase() === requestedSku.toLowerCase())

  if (!match) {
    return NextResponse.json({ error: "SKU not found" }, { status: 404 })
  }

  return NextResponse.json({
    sku: match.sku,
    product_name: match.product_name,
    factors: match.factors ?? [],
  })
}

