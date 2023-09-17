import { CellValue, EmptyCellValue } from "./CellValue.js"

export class Cell {
  static *values() {
    for (let value = 1; value <= 9; value++) {
      yield Cell.of(value)
    }
  }

  constructor(private readonly value: CellValue) {}

  static of(number: number) {
    return new Cell(CellValue.of(number))
  }

  static empty() {
    return new Cell(new EmptyCellValue())
  }

  static fromRaw(arrayElement: number | null) {
    return new Cell(CellValue.fromNullable(arrayElement))
  }

  notEquals(other: Cell) {
    return this.value.notEquals(other.value)
  }

  isEmpty() {
    return this.value instanceof EmptyCellValue
  }

  hasSameNumber(other: Cell) {
    if (this.isEmpty() && other.isEmpty()) {
      return false
    }

    return this.value.equals(other.value)
  }

  toString() {
    return this.value.toString()
  }
}
