import { SudokuIndex } from "./SudokuIndex.js"
import { Cell } from "./Cell.js"

export class Line {
  public static fromCells(cells: Cell[]) {
    return new Line(cells)
  }

  private constructor(private readonly array: Array<Cell>) {}

  notEquals(other: Line) {
    for (const index of SudokuIndex.each()) {
      const cell1 = this.cellAt(index)
      const cell2 = other.cellAt(index)

      if (cell1.notEquals(cell2)) {
        return true
      }
    }

    return false
  }

  private cellAt(index: SudokuIndex): Cell {
    return index.getFrom(this.array)
  }

  isValid() {
    for (const index1 of SudokuIndex.each()) {
      const cell = this.cellAt(index1)
      for (const index2 of SudokuIndex.each()) {
        const cell2 = this.cellAt(index2)

        const isNotTheSameCell = index1.notEquals(index2)
        const hasSameNumber = cell.hasSameNumber(cell2)

        if (isNotTheSameCell && hasSameNumber) {
          return false
        }
      }
    }

    return true
  }

  toString() {
    return [
      this.array[0],
      this.array[1],
      this.array[2],
      "|",
      this.array[3],
      this.array[4],
      this.array[5],
      "|",
      this.array[6],
      this.array[7],
      this.array[8],
    ].join(" ")
  }
}
