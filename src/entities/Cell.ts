export class Cell {
  static *values() {
    for (let value = 1; value <= 9; value++) {
      yield Cell.of(value)
    }
  }

  constructor(private readonly value: number | null) {}

  static of(number: number) {
    return new Cell(number)
  }

  static empty() {
    return new Cell(null)
  }

  static fromRaw(arrayElement: number | null) {
    return new Cell(arrayElement)
  }

  notEquals(other: Cell) {
    return this.value !== other.value
  }

  isEmpty() {
    return this.value === null
  }

  hasSameNumber(other: Cell) {
    if (this.isEmpty() && other.isEmpty()) {
      return false
    }

    return this.value === other.value
  }

  getRawValue() {
    return this.value
  }
}
