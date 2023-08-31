import { SudokuIndex } from "./SudokuIndex.js"

export class SudokuIndexes {
  private static instance = new SudokuIndexes()

  public static iterate() {
    return this.instance
  }

  *[Symbol.iterator](): Generator<SudokuIndex, void> {
    for (let i = 0; i < 9; i++) {
      yield new SudokuIndex(i)
    }
  }
}
