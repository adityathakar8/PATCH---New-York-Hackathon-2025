import { promises as fs } from "fs"
import path from "path"

export const DATA_DIR = path.join(process.cwd(), "data")
export const RUNS_DIR = path.join(DATA_DIR, "runs")

export async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true })
}

export async function writeJson(filePath: string, data: unknown) {
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8")
}

export async function readJson<T>(filePath: string): Promise<T> {
  const contents = await fs.readFile(filePath, "utf8")
  return JSON.parse(contents) as T
}

export function sanitizeFilename(filename: string) {
  const normalized = filename.normalize("NFKD")
  const basename = path.basename(normalized).replace(/[^a-zA-Z0-9._-]/g, "_")
  return basename.slice(0, 100) || "file"
}

export async function pathExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

export async function writeTextFile(filePath: string, contents: string) {
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, contents, "utf8")
}

