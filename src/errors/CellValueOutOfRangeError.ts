export class CellValueOutOfRangeError extends Error {
  constructor(value: number) {
    super(`Cell value ${value} is out of range`)
  }
}
