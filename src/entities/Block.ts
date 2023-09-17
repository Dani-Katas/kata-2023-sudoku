import { Line } from "./Line.js"
import { Cell } from "./Cell.js"

export class Block {
  private line: Line

  private constructor(cells: Array<Cell>) {
    this.line = Line.fromCells(cells)
  }

  public static fromCells(cells: Cell[]) {
    return new Block(cells)
  }

  isValid() {
    return this.line.isValid()
  }
}
