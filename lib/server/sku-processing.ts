import path from "path"
import * as XLSX from "xlsx"

export type NormalizedSku = {
  sku: string
  product_name: string | null
  ingredient_keywords: string[]
  source_country: string | null
  cogs_per_unit: number | null
  sell_price: number | null
  margin_pct: number | null
  monthly_units: number | null
}

const HEADER_ALIASES: Record<string, keyof NormalizedSku> = {
  sku: "sku",
  skuid: "sku",
  product: "product_name",
  productname: "product_name",
  product_description: "product_name",
  productdesc: "product_name",
  ingredient: "ingredient_keywords",
  ingredients: "ingredient_keywords",
  ingredientkeywords: "ingredient_keywords",
  ingredient_keywords: "ingredient_keywords",
  ingredientkeyword: "ingredient_keywords",
  source: "source_country",
  sourcecountry: "source_country",
  country: "source_country",
  countryoforigin: "source_country",
  cogs: "cogs_per_unit",
  cogsperunit: "cogs_per_unit",
  cost: "cogs_per_unit",
  costperunit: "cogs_per_unit",
  sellprice: "sell_price",
  price: "sell_price",
  salesprice: "sell_price",
  margin: "margin_pct",
  marginpct: "margin_pct",
  grossmargin: "margin_pct",
  marginpercent: "margin_pct",
  monthlyunits: "monthly_units",
  units: "monthly_units",
  monthly_sales_units: "monthly_units",
}

function normalizeHeader(header: string) {
  return header.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function parseNumeric(input: unknown): number | null {
  if (input === null || input === undefined) return null
  if (typeof input === "number") {
    if (Number.isNaN(input)) return null
    return input
  }

  if (typeof input === "string") {
    const trimmed = input.trim()
    if (!trimmed) return null
    const normalized = trimmed.replace(/[^0-9.\-]/g, "")
    if (!normalized) return null
    const value = Number.parseFloat(normalized)
    if (Number.isNaN(value)) return null
    return value
  }

  return null
}

function toPercentDecimal(value: number | null): number | null {
  if (value === null) return null
  if (value <= 1 && value >= -1) return value
  if (value === 0) return 0
  return value / 100
}

function normalizeIngredientKeywords(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === "string" ? entry.trim() : String(entry)))
      .filter((entry) => entry.length > 0)
  }
  if (typeof value === "string") {
    return value
      .split(/[,;|\n]/)
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0)
  }
  return []
}

export function parseSkuSheet(buffer: Buffer, filename: string): NormalizedSku[] {
  const workbook = XLSX.read(buffer, { type: "buffer" })
  const sheetName = workbook.SheetNames[0]
  if (!sheetName) {
    return []
  }
  const worksheet = workbook.Sheets[sheetName]
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: null })

  return rawRows
    .map((row) => normalizeRow(row))
    .filter((row): row is NormalizedSku => Boolean(row.sku))
}

function normalizeRow(row: Record<string, unknown>): NormalizedSku | null {
  const normalized: NormalizedSku = {
    sku: "",
    product_name: null,
    ingredient_keywords: [],
    source_country: null,
    cogs_per_unit: null,
    sell_price: null,
    margin_pct: null,
    monthly_units: null,
  }

  for (const [key, value] of Object.entries(row)) {
    if (!key) continue
    const aliasKey = HEADER_ALIASES[normalizeHeader(key)]
    if (!aliasKey) continue

    switch (aliasKey) {
      case "sku":
        if (typeof value === "string") {
          normalized.sku = value.trim()
        } else if (value != null) {
          normalized.sku = String(value)
        }
        break
      case "product_name":
        if (typeof value === "string" && value.trim()) {
          normalized.product_name = value.trim()
        }
        break
      case "ingredient_keywords":
        normalized.ingredient_keywords = normalizeIngredientKeywords(value)
        break
      case "source_country":
        if (typeof value === "string" && value.trim()) {
          normalized.source_country = value.trim()
        }
        break
      case "cogs_per_unit":
        normalized.cogs_per_unit = parseNumeric(value)
        break
      case "sell_price":
        normalized.sell_price = parseNumeric(value)
        break
      case "margin_pct":
        normalized.margin_pct = toPercentDecimal(parseNumeric(value))
        break
      case "monthly_units":
        const units = parseNumeric(value)
        normalized.monthly_units = units !== null ? Math.round(units) : null
        break
    }
  }

  if (!normalized.sku) {
    return null
  }

  if (
    (normalized.margin_pct === null || Number.isNaN(normalized.margin_pct)) &&
    normalized.sell_price !== null &&
    normalized.cogs_per_unit !== null &&
    normalized.sell_price > 0
  ) {
    const margin = (normalized.sell_price - normalized.cogs_per_unit) / normalized.sell_price
    normalized.margin_pct = Number.isFinite(margin) ? Number(margin) : null
  }

  if (normalized.margin_pct !== null) {
    normalized.margin_pct = Number(Number(normalized.margin_pct).toFixed(4))
  }

  if (normalized.sell_price !== null) {
    normalized.sell_price = Number(Number(normalized.sell_price).toFixed(4))
  }

  if (normalized.cogs_per_unit !== null) {
    normalized.cogs_per_unit = Number(Number(normalized.cogs_per_unit).toFixed(4))
  }

  return normalized
}

export function inferOutputExcelName(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ext === ".csv") return "uploaded.csv"
  if (ext === ".xlsx") return "uploaded.xlsx"
  return `uploaded${ext || ".dat"}`
}

