import fs from "node:fs"
import { FileSystem } from "./FileSystem.js"

export class FileSystemFake implements FileSystem {
  readFileSync(path: string): string {
    const readFileSync = fs.readFileSync(path)
    return readFileSync.toString("utf-8")
  }
}
