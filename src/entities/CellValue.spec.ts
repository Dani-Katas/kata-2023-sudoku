import { describe, it, expect } from "vitest"
import { CellValue } from "./CellValue.js"

describe("CellValue", () => {
  it.each([[1], [2], [3], [4], [5], [6], [7], [8], [9]])("%s is instantiable", (raw) => {
    const value = CellValue.of(raw)

    expect(value.toString()).toEqual(raw.toString())
  })

  it("throws exception if value is below 1", () => {
    const raw = 0

    expect(() => CellValue.of(raw)).toThrowError()
  })

  it("throws exception if value is above 9", () => {
    const raw = 10

    expect(() => CellValue.of(raw)).toThrowError()
  })
})
