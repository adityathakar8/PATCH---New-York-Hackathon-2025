import { NextResponse } from "next/server"
import path from "path"
import { z } from "zod"
import { pathExists, readJson, RUNS_DIR } from "@/lib/server/fs-utils"
import type { NormalizedSku } from "@/lib/server/sku-processing"
import type { PerplexityResult } from "@/lib/server/perplexity"
import { callPerplexityChat } from "@/lib/server/perplexity"
import { promises as fs } from "fs"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const requestSchema = z.object({
  runId: z.string().min(1),
  message: z.string().min(1),
  sku: z.string().optional(),
})

export async function POST(req: Request) {
  let payload: z.infer<typeof requestSchema>

  try {
    const json = await req.json()
    payload = requestSchema.parse(json)
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }

  const perplexityApiKey = process.env.PERPLEXITY_API_KEY
  if (!perplexityApiKey) {
    return NextResponse.json({ error: "PERPLEXITY_API_KEY is not configured" }, { status: 500 })
  }

  const runDir = path.join(RUNS_DIR, payload.runId)
  if (!(await pathExists(runDir))) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 })
  }

  const skusPath = path.join(runDir, "output", "skus.json")
  const resultsPath = path.join(runDir, "output", "results.json")
  const metaPath = path.join(runDir, "input", "meta.json")
  const contextPath = path.join(runDir, "input", "context.txt")

  if (!(await pathExists(skusPath)) || !(await pathExists(resultsPath))) {
    return NextResponse.json({ error: "Run results are not ready" }, { status: 409 })
  }

  const [skus, results, meta, contextText] = await Promise.all([
    readJson<NormalizedSku[]>(skusPath),
    readJson<PerplexityResult[]>(resultsPath),
    readOptionalJson(metaPath),
    readOptionalText(contextPath),
  ])

  const filteredSkus = selectSkusForContext(skus, payload.sku)
  const resultsForContext = results.filter((result) =>
    filteredSkus.some((sku) => sku.sku === result.sku)
  )

  const contextPayload = buildContextPayload({
    runId: payload.runId,
    meta,
    skus: filteredSkus,
    results: resultsForContext,
    businessContext: contextText,
  })

  const systemPrompt =
    "You are PATCH Copilot. Be concise (<=180 words). If recommending actions, state assumptions. Always include 1–3 source links when asserting external facts."

  const userPrompt = [
    "CONTEXT:",
    JSON.stringify(contextPayload, null, 2),
    "",
    "USER_QUESTION:",
    `"${payload.message}"`,
    "",
    "Rules:",
    "- If user mentions a SKU, focus on it.",
    "- If asked about alternate sources/countries, do a quick web check and cite 1–2 links.",
    "- If math is needed, show the steps briefly (e.g., new margin after +X% COGS).",
  ].join("\n")

  try {
    const answer = await callPerplexityChat({
      apiKey: perplexityApiKey,
      systemPrompt,
      userPrompt,
    })

    return NextResponse.json({ answer })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch answer"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function selectSkusForContext(skus: NormalizedSku[], skuFilter?: string) {
  if (skuFilter) {
    const target = skuFilter.toLowerCase()
    const matches = skus.filter((sku) => sku.sku.toLowerCase() === target)
    if (matches.length > 0) {
      return matches
    }
  }

  const sorted = [...skus].sort((a, b) => {
    const aUnits = a.monthly_units ?? 0
    const bUnits = b.monthly_units ?? 0
    return bUnits - aUnits
  })

  return sorted.slice(0, Math.min(sorted.length, 20))
}

function buildContextPayload(params: {
  runId: string
  meta: Record<string, unknown> | null
  skus: NormalizedSku[]
  results: PerplexityResult[]
  businessContext: string | null
}) {
  const { runId, meta, skus, results, businessContext } = params
  const skuSet = new Set(skus.map((sku) => sku.sku))

  return {
    runId,
    company: {
      name: typeof meta?.companyName === "string" ? meta.companyName : null,
      website: typeof meta?.websiteUrl === "string" ? meta.websiteUrl : null,
    },
    skus: skus.map((sku) => ({
      sku: sku.sku,
      product_name: sku.product_name,
      monthly_units: sku.monthly_units,
    })),
    latest_results: results
      .filter((result) => skuSet.has(result.sku))
      .map((result) => ({
        sku: result.sku,
        product_name: result.product_name,
        overall_risk_tier: result.overall_risk_tier,
        overall_risk_score: result.overall_risk_score,
        predicted_cogs_change_pct: result.predicted_cogs_change_pct,
        old_margin_pct: result.old_margin_pct,
        new_margin_pct: result.new_margin_pct,
        margin_drop_pct: result.margin_drop_pct,
        factors: (result.factors ?? []).slice(0, 3).map((factor) => ({
          category: factor.category,
          description: factor.description,
          direction: factor.direction,
          impact: factor.impact,
          confidence: factor.confidence,
          source_url: factor.source_url,
          source_date: factor.source_date,
        })),
      })),
    business_context_excerpt: businessContext,
  }
}

async function readOptionalJson(filePath: string) {
  if (!(await pathExists(filePath))) {
    return null
  }
  return readJson<Record<string, unknown>>(filePath)
}

async function readOptionalText(filePath: string) {
  if (!(await pathExists(filePath))) {
    return null
  }
  const contents = await fs.readFile(filePath, "utf8")
  return contents.slice(0, 2000)
}

