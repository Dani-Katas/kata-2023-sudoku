import { CellDigit, EmptyCellDigit } from "./CellDigit.js"

export class Cell {
  static *values() {
    for (let value = 1; value <= 9; value++) {
      yield Cell.of(value)
    }
  }

  constructor(private readonly digit: CellDigit) {}

  static of(number: number) {
    return new Cell(CellDigit.of(number))
  }

  static empty() {
    return new Cell(new EmptyCellDigit())
  }

  static fromRaw(arrayElement: number | null) {
    return new Cell(CellDigit.fromNullable(arrayElement))
  }

  notEquals(other: Cell) {
    return this.digit.notEquals(other.digit)
  }

  isEmpty() {
    return this.digit instanceof EmptyCellDigit
  }

  hasSameNumber(other: Cell) {
    if (this.isEmpty() && other.isEmpty()) {
      return false
    }

    return this.digit.equals(other.digit)
  }

  toString() {
    return this.digit.toString()
  }
}
