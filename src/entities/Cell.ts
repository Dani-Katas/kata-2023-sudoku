import { CellDigit, EmptyCellDigit } from "./CellDigit.js"

export class Cell {
  static with(number: CellDigit | number) {
    if (number instanceof CellDigit) {
      return new Cell(number)
    }

    return new Cell(CellDigit.of(number))
  }

  static empty() {
    return new Cell(new EmptyCellDigit())
  }

  static fromRaw(arrayElement: number | null) {
    return new Cell(CellDigit.fromNullable(arrayElement))
  }

  private constructor(private readonly digit: CellDigit) {}

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
