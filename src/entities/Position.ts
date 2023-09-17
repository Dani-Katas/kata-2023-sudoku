import { SudokuIndex } from "./SudokuIndex.js"

export class Position {
  public static at(i: SudokuIndex, j: SudokuIndex) {
    return new Position(i, j)
  }

  private constructor(private readonly i: SudokuIndex, private readonly j: SudokuIndex) {}

  getFrom<T>(array: Array<Array<T>>) {
    return this.j.getFrom(this.i.getFrom(array))
  }

  writeIn<T>(array: Array<Array<T>>, value: T) {
    this.j.writeIn(this.i.getFrom(array), value)
  }

  equals(other: Position) {
    return this.i.equals(other.i) && this.j.equals(other.j)
  }
}
