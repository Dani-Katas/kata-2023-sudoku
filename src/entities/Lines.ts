import { SudokuIndexes } from "./SudokuIndexes.js"
import { SudokuIndex } from "./SudokuIndex.js"
import { Line } from "./Line.js"

export class Lines {
  constructor(private readonly matrix: Array<Array<number | null>>) {}

  static fromMatrix(matrix: Array<Array<number | null>>) {
    return new Lines(matrix)
  }

  at(index: SudokuIndex): Line {
    const array = this.matrix[index.getValue()]

    return Line.fromArray(array)
  }
}
