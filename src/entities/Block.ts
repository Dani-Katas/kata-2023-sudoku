import { Line } from "./Line.js"

export class Block {
  private line: Line

  constructor(array: Array<number | null>) {
    this.line = Line.fromArray(array)
  }

  static fromArray(array: Array<number | null>) {
    return new Block(array)
  }

  isValid() {
    return this.line.isValid()
  }
}
