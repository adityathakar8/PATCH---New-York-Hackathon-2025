import { setTimeout as delay } from "timers/promises"
import type { NormalizedSku } from "./sku-processing"

type PerplexityMessage = {
  role: "system" | "user"
  content: string
}

type ChatCompletionChoice = {
  message?: {
    content?: string
  }
  delta?: {
    content?: string
  }
}

type ChatCompletionResponse = {
  choices?: ChatCompletionChoice[]
}

export type PerplexityFactor = {
  category: string
  description: string
  direction: "up" | "down" | "neutral"
  impact: "low" | "medium" | "high"
  confidence: number
  source_url: string
  source_date: string
}

export type PerplexityResult = {
  sku: string
  product_name: string
  as_of: string
  factors: PerplexityFactor[]
  overall_risk_tier: "low" | "medium" | "high"
  overall_risk_score: number
  predicted_cogs_change_pct: number
  old_margin_pct: number
  new_margin_pct: number
  margin_drop_pct: number
}

export async function analyzeSkuWithPerplexity(params: {
  sku: NormalizedSku
  apiKey: string
  companyName?: string | null
  websiteUrl?: string | null
  businessContext?: string | null
  maxRetries?: number
  timeoutMs?: number
}): Promise<PerplexityResult> {
  const {
    sku,
    apiKey,
    companyName = null,
    websiteUrl = null,
    businessContext = null,
    maxRetries = 2,
    timeoutMs = 30000,
  } = params

  const body = buildPerplexityPayload({
    sku,
    companyName,
    websiteUrl,
    businessContext,
  })

  const systemPrompt =
    "Return ONLY valid JSON. You are PATCH Macro Analyst. Use recent (<=90 days) credible sources. If no credible info, return empty factors and low risk."

  const url = "https://api.perplexity.ai/chat/completions"

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), timeoutMs)

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          temperature: 0.2,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: body,
            },
          ],
        }),
        signal: controller.signal,
      })

      clearTimeout(timer)

      if (!response.ok) {
        throw new Error(`Perplexity API error (${response.status})`)
      }

      const json = (await response.json()) as ChatCompletionResponse
      const rawContent = extractContent(json)
      const parsed = parsePerplexityJson(rawContent)
      if (parsed) {
        return normalizePerplexityResult(parsed, sku)
      }
    } catch (error) {
      if (attempt === maxRetries) {
        break
      }
      const backoff = 500 * (attempt + 1)
      await delay(backoff)
    }
  }

  return fallbackPerplexityResult(sku)
}

export async function callPerplexityChat(params: {
  apiKey: string
  systemPrompt: string
  userPrompt: string
  timeoutMs?: number
  maxRetries?: number
}): Promise<string> {
  const { apiKey, systemPrompt, userPrompt, timeoutMs = 30000, maxRetries = 1 } = params
  const url = "https://api.perplexity.ai/chat/completions"

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), timeoutMs)

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          temperature: 0.2,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: userPrompt,
            },
          ],
        }),
        signal: controller.signal,
      })

      clearTimeout(timer)

      if (!response.ok) {
        throw new Error(`Perplexity API error (${response.status})`)
      }

      const json = (await response.json()) as ChatCompletionResponse
      const rawContent = extractContent(json)
      if (rawContent) {
        return rawContent.trim()
      }
    } catch (error) {
      if (attempt === maxRetries) {
        break
      }
      const backoff = 500 * (attempt + 1)
      await delay(backoff)
    }
  }

  throw new Error("Perplexity chat request failed")
}

function buildPerplexityPayload(params: {
  sku: NormalizedSku
  companyName: string | null
  websiteUrl: string | null
  businessContext: string | null
}): string {
  const { sku, companyName, websiteUrl, businessContext } = params

  const payload = {
    INPUT: {
      sku: sku.sku,
      product_name: sku.product_name ?? "",
      ingredient_keywords: sku.ingredient_keywords,
      source_country: sku.source_country ?? "",
      company_website: websiteUrl ?? "",
      business_context_excerpt: businessContext ?? "",
      finance: {
        cogs_per_unit: sku.cogs_per_unit ?? null,
        sell_price: sku.sell_price ?? null,
        margin_pct: sku.margin_pct ?? null,
        monthly_units: sku.monthly_units ?? null,
      },
    },
    TASK:
      "Search the web for recent macro factors that could change cost/availability (trade/tariffs, weather, supply, freight, energy, FX, policy, labor). Return ONLY this JSON:\\n{\\n  \"sku\":\"string\",\\n  \"product_name\":\"string\",\\n  \"as_of\":\"YYYY-MM-DD\",\\n  \"factors\":[{\"category\":\"Trade|Tariffs|Weather|Supply|Freight|Energy|FX|Policy|Labor|Other\",\"description\":\"1-2 sentences\",\"direction\":\"up|down|neutral\",\"impact\":\"low|med|high\",\"confidence\":0-1,\"source_url\":\"https://...\",\"source_date\":\"YYYY-MM-DD\"}],\\n  \"overall_risk_tier\":\"low|medium|high\",\\n  \"overall_risk_score\":0-1,\\n  \"predicted_cogs_change_pct\":0-1,\\n  \"old_margin_pct\":0-1,\\n  \"new_margin_pct\":0-1,\\n  \"margin_drop_pct\":-1 to 1\\n}\\nRules:\\n- Always include source_url & source_date per factor.\\n- Use conservative numbers; if unsure, use small ranges or lower confidence.\\n- If nothing credible: empty factors, low tier, score ~0.15.",
  }

  return `INPUT:\\n${JSON.stringify(payload.INPUT, null, 2)}\\n\\nTASK:\\n${payload.TASK}`
}

function extractContent(response: ChatCompletionResponse): string {
  if (!response.choices || response.choices.length === 0) {
    return ""
  }
  const choice = response.choices[0]
  if (choice.message?.content) {
    return choice.message.content
  }
  if (choice.delta?.content) {
    return choice.delta.content
  }
  return ""
}

function parsePerplexityJson(raw: string): unknown | null {
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) return null
    try {
      return JSON.parse(match[0])
    } catch {
      return null
    }
  }
}

function normalizePerplexityResult(result: unknown, sku: NormalizedSku): PerplexityResult {
  if (!isPerplexityResultLike(result)) {
    return fallbackPerplexityResult(sku)
  }

  return {
    sku: result.sku || sku.sku,
    product_name: result.product_name || sku.product_name || sku.sku,
    as_of: result.as_of || new Date().toISOString().slice(0, 10),
    factors: Array.isArray(result.factors)
      ? result.factors
          .filter(isPerplexityFactorLike)
          .map((factor) => ({
            category: factor.category,
            description: factor.description,
            direction: factor.direction,
            impact: factor.impact,
            confidence: clampNumber(factor.confidence, 0, 1),
            source_url: factor.source_url,
            source_date: factor.source_date,
          }))
      : [],
    overall_risk_tier: normalizeRiskTier(result.overall_risk_tier),
    overall_risk_score: clampNumber(result.overall_risk_score, 0, 1),
    predicted_cogs_change_pct: clampNumber(result.predicted_cogs_change_pct, 0, 1),
    old_margin_pct: clampNumber(
      result.old_margin_pct ?? sku.margin_pct ?? 0,
      -1,
      1
    ),
    new_margin_pct: clampNumber(result.new_margin_pct ?? sku.margin_pct ?? 0, -1, 1),
    margin_drop_pct: clampNumber(result.margin_drop_pct ?? 0, -1, 1),
  }
}

function fallbackPerplexityResult(sku: NormalizedSku): PerplexityResult {
  const margin = sku.margin_pct ?? 0
  return {
    sku: sku.sku,
    product_name: sku.product_name ?? sku.sku,
    as_of: new Date().toISOString().slice(0, 10),
    factors: [],
    overall_risk_tier: "low",
    overall_risk_score: 0.15,
    predicted_cogs_change_pct: 0,
    old_margin_pct: margin,
    new_margin_pct: margin,
    margin_drop_pct: 0,
  }
}

function clampNumber(value: unknown, min: number, max: number): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return min
  }
  if (value < min) return min
  if (value > max) return max
  return Number(Number(value).toFixed(4))
}

function normalizeRiskTier(value: unknown): "low" | "medium" | "high" {
  if (typeof value !== "string") return "low"
  const normalized = value.toLowerCase()
  if (normalized === "high" || normalized === "medium") {
    return normalized
  }
  return "low"
}

function isPerplexityFactorLike(value: unknown): value is PerplexityFactor {
  if (!value || typeof value !== "object") {
    return false
  }
  const factor = value as Record<string, unknown>
  return (
    typeof factor.category === "string" &&
    typeof factor.description === "string" &&
    typeof factor.direction === "string" &&
    typeof factor.impact === "string" &&
    typeof factor.confidence === "number" &&
    typeof factor.source_url === "string" &&
    typeof factor.source_date === "string"
  )
}

function isPerplexityResultLike(value: unknown): value is PerplexityResult {
  if (!value || typeof value !== "object") {
    return false
  }
  const result = value as Record<string, unknown>
  return typeof result.sku === "string" && Array.isArray(result.factors)
}

