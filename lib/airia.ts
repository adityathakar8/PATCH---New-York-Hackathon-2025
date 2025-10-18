import type { SkuData } from './clickhouse'

export type RiskTier = 'Low' | 'Medium' | 'High'
export type TickerRisk = 'HIGH' | 'STABLE' | 'ALERT'
export type IngredientTrend = 'RISING' | 'FALLING' | 'STABLE'

export interface AiriaTickerItem {
  name: string
  location: string
  risk: TickerRisk
  change?: string
  message?: string
}

export interface AiriaIngredientMover {
  sku: string
  ingredient: string
  location: string
  trend: IngredientTrend
  deltaRisk?: number
  note?: string
}

export interface AiriaAlertItem {
  title: string
  summary: string
  confidence: number
  sourceName?: string
  sourceUrl?: string
  severity: 'high' | 'medium' | 'low'
}

export interface AiriaMarginInsight {
  window: string
  value: number
  direction: 'up' | 'down'
  sparkline: number[]
  message: string
}

export interface AiriaPortfolioRow {
  id: string
  sku: string
  ingredient: string
  source: string
  riskTier: RiskTier
  deltaCogs: number
  oldMargin: number
  newMargin: number
  deltaEbitda: number
}

export interface AiriaAgentInsights {
  generatedAt: string
  source: 'mock' | 'airia'
  marginAtRisk: AiriaMarginInsight
  ingredientMovers: AiriaIngredientMover[]
  portfolioRisks: AiriaPortfolioRow[]
  ticker: AiriaTickerItem[]
  topAlerts: AiriaAlertItem[]
}

export interface AiriaWorkflowInput {
  skuData: SkuData[]
  websiteUrl?: string
  businessContextId?: string | null
}

export interface AiriaWorkflowResult {
  insights: AiriaAgentInsights
  rawResponse?: unknown
  wasMock: boolean
}

const DEFAULT_SPARKLINE = [42, 41, 39, 38, 36, 35, 34, 33, 31, 30, 29, 28]

function computeRiskTier(deltaEbitda: number): RiskTier {
  if (deltaEbitda <= -8) return 'High'
  if (deltaEbitda <= -3) return 'Medium'
  return 'Low'
}

function buildPortfolioRowsFromSkuData(skuData: SkuData[]): AiriaPortfolioRow[] {
  const now = Date.now()
  return skuData.slice(0, 15).map((sku, index) => {
    // Basic heuristics to simulate historical comparison
    const oldMargin = Math.max(0, Number((sku.margin + 6).toFixed(1)))
    const newMargin = Number(Math.max(0, sku.margin).toFixed(1))
    const deltaEbitda = Number((newMargin - oldMargin).toFixed(1))
    const avgCogs = skuData.reduce((acc, item) => acc + item.cogs, 0) / Math.max(1, skuData.length)
    const deltaCogs = Number((((sku.cogs - avgCogs) / Math.max(avgCogs, 1)) * 100).toFixed(1))

    return {
      id: `portfolio_${now}_${index}`,
      sku: sku.sku_name || sku.id,
      ingredient: sku.product_line || 'N/A',
      source: sku.source_country || 'Unknown',
      riskTier: computeRiskTier(deltaEbitda),
      deltaCogs,
      oldMargin,
      newMargin,
      deltaEbitda,
    }
  })
}

function buildTickerFromPortfolio(rows: AiriaPortfolioRow[]): AiriaTickerItem[] {
  if (!rows.length) {
    return [
      { name: 'No data', location: '—', risk: 'STABLE' },
    ]
  }

  return rows.slice(0, 6).map((row) => ({
    name: row.ingredient || row.sku,
    location: row.source,
    risk: row.riskTier === 'High' ? 'HIGH' : row.riskTier === 'Medium' ? 'ALERT' : 'STABLE',
    change: row.deltaCogs ? `ΔCOGS ${row.deltaCogs > 0 ? '+' : ''}${row.deltaCogs}%` : undefined,
    message: row.riskTier === 'High' ? 'Review sourcing' : undefined,
  }))
}

function buildIngredientMovers(rows: AiriaPortfolioRow[]): AiriaIngredientMover[] {
  return rows.slice(0, 5).map((row) => ({
    sku: row.sku,
    ingredient: row.ingredient,
    location: row.source,
    trend: row.deltaEbitda < 0 ? 'RISING' : row.deltaEbitda > 0 ? 'FALLING' : 'STABLE',
    deltaRisk: Math.abs(Number(row.deltaEbitda.toFixed(1))),
    note: row.riskTier === 'High' ? 'Margin compression risk' : undefined,
  }))
}

function buildAlerts(rows: AiriaPortfolioRow[]): AiriaAlertItem[] {
  if (!rows.length) {
    return [
      {
        title: 'Awaiting Airia insights',
        summary: 'Upload data to receive live alerts from your Airia agent.',
        confidence: 0.5,
        severity: 'low',
      },
    ]
  }

  return rows.slice(0, 3).map((row) => ({
    title: `${row.ingredient || row.sku} supply risk`,
    summary: `EBITDA shift ${row.deltaEbitda}% with COGS change ${row.deltaCogs}% from ${row.source}.`,
    confidence: Math.min(0.95, Math.max(0.6, 0.8 - row.deltaEbitda / 100)),
    severity: row.riskTier === 'High' ? 'high' : row.riskTier === 'Medium' ? 'medium' : 'low',
  }))
}

function buildMarginInsight(rows: AiriaPortfolioRow[]): AiriaMarginInsight {
  const aggregateDelta = rows.reduce((acc, row) => acc + row.deltaEbitda, 0)
  const normalized = Number(aggregateDelta.toFixed(1))
  return {
    window: '30–90d',
    value: normalized,
    direction: normalized <= 0 ? 'down' : 'up',
    sparkline: DEFAULT_SPARKLINE,
    message: normalized <= 0
      ? 'Margin erosion risk detected across key SKUs. Prioritize supplier renegotiations.'
      : 'Margins improving. Monitor supply chain stability to sustain gains.',
  }
}

function buildMockInsights(skuData: SkuData[]): AiriaAgentInsights {
  const portfolio = buildPortfolioRowsFromSkuData(skuData)
  const nowIso = new Date().toISOString()

  return {
    generatedAt: nowIso,
    source: 'mock',
    marginAtRisk: buildMarginInsight(portfolio),
    ingredientMovers: buildIngredientMovers(portfolio),
    portfolioRisks: portfolio,
    ticker: buildTickerFromPortfolio(portfolio),
    topAlerts: buildAlerts(portfolio),
  }
}

function normalizeAiriaResponse(response: any, fallback: AiriaAgentInsights): AiriaAgentInsights {
  if (!response) return fallback

  const receivedInsights =
    response?.insights ??
    response?.data?.insights ??
    response?.result?.insights ??
    response?.output?.insights ??
    response?.payload?.insights
  if (!receivedInsights) return fallback

  try {
    return {
      generatedAt: receivedInsights.generatedAt || new Date().toISOString(),
      source: 'airia',
      marginAtRisk: receivedInsights.marginAtRisk || fallback.marginAtRisk,
      ingredientMovers: receivedInsights.ingredientMovers || fallback.ingredientMovers,
      portfolioRisks: receivedInsights.portfolioRisks || fallback.portfolioRisks,
      ticker: receivedInsights.ticker || fallback.ticker,
      topAlerts: receivedInsights.topAlerts || fallback.topAlerts,
    }
  } catch (error) {
    console.warn('Failed to normalize Airia response, using fallback.', error)
    return fallback
  }
}

function buildAiriaMessage(input: AiriaWorkflowInput): string {
  const header = `Analyze the following SKU upload and return portfolio, ticker, ingredient mover, and alert insights formatted for the SKU Terminal console.`
  const payload = {
    websiteUrl: input.websiteUrl,
    businessContextId: input.businessContextId,
    skuData: input.skuData.slice(0, 100),
  }

  return `${header}\n\nData:${JSON.stringify(payload, null, 2)}`
}

function resolveConversationId(input: AiriaWorkflowInput): string {
  if (input.businessContextId) {
    return `console-${input.businessContextId}`
  }
  return `console-${Date.now()}`
}

function resolveUserId(input: AiriaWorkflowInput): string {
  if (input.businessContextId) {
    return input.businessContextId
  }
  return `sku-upload-${Date.now()}`
}

export async function triggerAiriaWorkflow(input: AiriaWorkflowInput): Promise<AiriaWorkflowResult> {
  const fallback = buildMockInsights(input.skuData)

  const endpoint = process.env.AIRIA_API_ENDPOINT || process.env.AIRIA_API_URL
  const apiKey = process.env.AIRIA_API_KEY

  if (!endpoint || !apiKey) {
    return {
      insights: fallback,
      rawResponse: undefined,
      wasMock: true,
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        message: buildAiriaMessage(input),
        userId: resolveUserId(input),
        conversationId: resolveConversationId(input),
      }),
    })

    if (!response.ok) {
      console.error('Airia agent execution failed', await response.text())
      return {
        insights: fallback,
        rawResponse: undefined,
        wasMock: true,
      }
    }

    const payload = await response.json()
    const insights = normalizeAiriaResponse(payload, fallback)

    return {
      insights,
      rawResponse: payload,
      wasMock: false,
    }
  } catch (error) {
    console.error('Error triggering Airia workflow:', error)
    return {
      insights: fallback,
      rawResponse: undefined,
      wasMock: true,
    }
  }
}
