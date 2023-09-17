import { CellValueOutOfRangeError } from "../errors/CellValueOutOfRangeError.js"

export class CellValue {
  static *values() {
    for (let value = 1; value <= 9; value++) {
      yield CellValue.of(value)
    }
  }

  static of(number: number) {
    return new CellValue(number)
  }

  static fromNullable(number: number | null) {
    return number ? new CellValue(number) : new EmptyCellValue()
  }

  constructor(private readonly value: number) {
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.value < 1 || this.value > 9) {
      throw new CellValueOutOfRangeError(this.value)
    }
  }

  equals(other: CellValue) {
    if (other instanceof EmptyCellValue) {
      return false
    }

    return this.value === other.value
  }

  notEquals(other: CellValue) {
    return !this.equals(other)
  }

  toString() {
    return this.value.toString()
  }
}

export class EmptyCellValue extends CellValue {
  constructor() {
    super(1)
  }

  notEquals(other: CellValue): boolean {
    return !(other instanceof EmptyCellValue)
  }

  equals(other: CellValue): boolean {
    return other instanceof EmptyCellValue
  }

  toString(): string {
    return "-"
  }
}
