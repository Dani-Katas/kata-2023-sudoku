import { CellValueOutOfRangeError } from "../errors/CellValueOutOfRangeError.js"

export class CellDigit {
  private static MINIMUM = 1
  private static MAXIMUM = 9

  static *digits() {
    for (let value = this.MINIMUM; value <= this.MAXIMUM; value++) {
      yield CellDigit.of(value)
    }
  }

  static of(number: number) {
    return new CellDigit(number)
  }

  static fromNullable(number: number | null) {
    return number ? new CellDigit(number) : new EmptyCellDigit()
  }

  constructor(private readonly value: number) {
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.value < CellDigit.MINIMUM || this.value > CellDigit.MAXIMUM) {
      throw new CellValueOutOfRangeError(this.value)
    }
  }

  equals(other: CellDigit) {
    if (other instanceof EmptyCellDigit) {
      return false
    }

    return this.value === other.value
  }

  notEquals(other: CellDigit) {
    return !this.equals(other)
  }

  toString() {
    return this.value.toString()
  }
}

export class EmptyCellDigit extends CellDigit {
  constructor() {
    const notImportant = 1
    super(notImportant)
  }

  notEquals(other: CellDigit): boolean {
    return !this.equals(other)
  }

  equals(other: CellDigit): boolean {
    return other instanceof EmptyCellDigit
  }

  toString(): string {
    return "-"
  }
}
