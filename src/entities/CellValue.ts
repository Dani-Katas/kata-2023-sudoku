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

  constructor(private readonly value: number) {
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.value < 1 || this.value > 9) {
      throw new CellValueOutOfRangeError(this.value)
    }
  }

  toString() {
    return this.value.toString()
  }
}
