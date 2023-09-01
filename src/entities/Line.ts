import { SudokuIndex } from "./SudokuIndex.js"
import { Cell } from "./Cell.js"

export class Line {
  constructor(private readonly array: Array<Cell>) {}
  public static fromCells(cells: Cell[]) {
    return new Line(cells)
  }

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
    return this.array[index.getValue()]
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
    const el = this.array
    return [el[0], el[1], el[2], "|", el[3], el[4], el[5], "|", el[6], el[7], el[8]].join(" ")
  }
}
