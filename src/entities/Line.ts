import { SudokuIndex } from "./SudokuIndex.js"
import { Cell } from "./Cell.js"
import { SudokuIndexes } from "./SudokuIndexes.js"

export class Line {
  constructor(private readonly array: Array<number | null>) {}

  static fromArray(array: Array<number | null>) {
    return new Line(array)
  }

  notEquals(other: Line) {
    for (const index of SudokuIndexes.iterate()) {
      const cell1 = this.cellAt(index)
      const cell2 = other.cellAt(index)

      if (cell1.notEquals(cell2)) {
        return true
      }
    }

    return false
  }

  private cellAt(index: SudokuIndex): Cell {
    return Cell.fromRaw(this.array[index.getValue()])
  }

  isValid() {
    for (const index1 of SudokuIndexes.iterate()) {
      const cell = this.cellAt(index1)
      for (const index2 of SudokuIndexes.iterate()) {
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
}
