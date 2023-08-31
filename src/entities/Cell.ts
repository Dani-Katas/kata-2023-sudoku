export class Cell {
  constructor(private readonly value: number | null) {}

  static fromRaw(arrayElement: number | null) {
    return new Cell(arrayElement)
  }

  notEquals(other: Cell) {
    return this.value !== other.value
  }

  equals(other: Cell) {
    return this.value === other.value
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

  toString() {
    return `${this.value}`
  }
}
