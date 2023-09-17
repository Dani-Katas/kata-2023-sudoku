import { describe, it, expect } from "vitest"
import { CellDigit } from "./CellDigit.js"

describe("CellDigit", () => {
  it.each([[1], [2], [3], [4], [5], [6], [7], [8], [9]])("%s is instantiable", (raw) => {
    const value = CellDigit.of(raw)

    expect(value.toString()).toEqual(raw.toString())
  })

  it("throws exception if value is below 1", () => {
    const raw = 0

    expect(() => CellDigit.of(raw)).toThrowError()
  })

  it("throws exception if value is above 9", () => {
    const raw = 10

    expect(() => CellDigit.of(raw)).toThrowError()
  })
})
