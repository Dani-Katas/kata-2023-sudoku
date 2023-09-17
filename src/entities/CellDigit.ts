import { CellValueOutOfRangeError } from "../errors/CellValueOutOfRangeError.js"

export class CellDigit {
  static *digits() {
    for (let value = 1; value <= 9; value++) {
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
    if (this.value < 1 || this.value > 9) {
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
    super(1)
  }

  notEquals(other: CellDigit): boolean {
    return !(other instanceof EmptyCellDigit)
  }

  equals(other: CellDigit): boolean {
    return other instanceof EmptyCellDigit
  }

  toString(): string {
    return "-"
  }
}
