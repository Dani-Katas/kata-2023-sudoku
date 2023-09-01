import { SudokuIndex } from "./SudokuIndex.js"

export class Position {
  public static at(i: SudokuIndex, j: SudokuIndex) {
    return new Position(i, j)
  }

  constructor(private readonly i: SudokuIndex, private readonly j: SudokuIndex) {}

  getVerticalIndex() {
    return this.i.getValue()
  }

  getHorizontalIndex() {
    return this.j.getValue()
  }

  equals(other: Position) {
    return this.i.equals(other.i) && this.j.equals(other.j)
  }

  hasSameRow(i: SudokuIndex) {
    return this.i.equals(i)
  }
}
