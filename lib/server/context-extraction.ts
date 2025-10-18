import { promises as fs } from "fs"
import path from "path"
import pdfParse from "pdf-parse"
import mammoth from "mammoth"
import { sanitizeFilename } from "./fs-utils"

type SavedDoc = {
  path: string
  text: string
}

export async function saveSupportingDocs(params: {
  files: File[]
  docsDir: string
}): Promise<{ savedDocs: SavedDoc[] }> {
  const savedDocs: SavedDoc[] = []
  let index = 1

  for (const file of params.files) {
    if (file.size === 0) continue
    const originalName = file.name || `doc-${index}`
    const ext = path.extname(originalName).toLowerCase()
    const safeName = sanitizeFilename(originalName) || `doc-${index}${ext}`
    const outputPath = path.join(params.docsDir, safeName)

    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(outputPath, buffer)

    const text = await extractDocumentText(outputPath, ext).catch(() => "")
    if (text.trim()) {
      savedDocs.push({ path: outputPath, text })
    }
    index += 1
  }

  return { savedDocs }
}

async function extractDocumentText(filePath: string, ext: string): Promise<string> {
  if (ext === ".pdf") {
    const buffer = await fs.readFile(filePath)
    const result = await pdfParse(buffer)
    return result.text ?? ""
  }

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ path: filePath })
    return result.value ?? ""
  }

  return ""
}

export function buildBusinessContext(savedDocs: SavedDoc[], limit = 2000): string | null {
  if (savedDocs.length === 0) return null
  const combined = savedDocs
    .map((doc) => doc.text.trim())
    .filter((text) => text.length > 0)
    .join("\n\n")
    .slice(0, limit)

  return combined.length > 0 ? combined : null
}

