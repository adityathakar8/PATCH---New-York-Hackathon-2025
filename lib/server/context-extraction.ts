import { promises as fs } from "fs"
import path from "path"
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

    // For now, we'll just store basic document info
    // In a real implementation, you'd add proper text extraction
    const text = `[Document: ${originalName} - uploaded successfully]`
    savedDocs.push({ path: outputPath, text })
    index += 1
  }

  return { savedDocs }
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