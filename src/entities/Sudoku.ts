import { SudokuIndex } from "./SudokuIndex.js"
import { Line } from "./Line.js"
import { SudokuIndexes } from "./SudokuIndexes.js"

export class Sudoku {
  static fromMatrix(matrix: Array<Array<number | null>>): Sudoku {
    return new Sudoku(matrix)
  }

  constructor(private readonly matrix: Array<Array<number | null>>) {}

  public isValid(): boolean {
    for (const index of SudokuIndexes.iterate()) {
      const valid = this.horizontalLineAt(index).isValid()

      if (!valid) {
        return false
      }
    }
    for (const index of SudokuIndexes.iterate()) {
      const valid = this.verticalLineAt(index).isValid()

      if (!valid) {
        return false
      }
    }

    return true
  }

  solve(): Sudoku {
    throw new Error("Unimplemented method Sudoku#solve")
  }

  equals(other: Sudoku) {
    for (const index of SudokuIndexes.iterate()) {
      const line1 = this.horizontalLineAt(index)
      const line2 = other.horizontalLineAt(index)

      if (line1.notEquals(line2)) {
        return false
      }
    }

    return true
  }

  private horizontalLineAt(index: SudokuIndex) {
    const array = this.matrix[index.getValue()]

    return Line.fromArray(array)
  }
  private verticalLineAt(verticalIndex: SudokuIndex) {
    const elements: Array<number | null> = []

    for (const horizontalIndex of SudokuIndexes.iterate()) {
      const value = this.matrix[horizontalIndex.getValue()][verticalIndex.getValue()]

      elements.push(value)
    }

    return Line.fromArray(elements)
  }

  toString() {
    return `1 3 8 | 4 6 2 | 7 1 9
1 2 9 | 7 8 3 | 6 4 5
7 4 6 | 9 5 1 | 2 3 8
---------------------
8 5 2 | 3 7 9 | 1 6 4
6 1 3 | 2 4 5 | 9 8 7
4 9 7 | 8 1 6 | 3 5 2
---------------------
9 8 4 | 6 3 7 | 5 2 1
2 6 5 | 1 9 8 | 4 7 3
3 7 1 | 5 2 4 | 8 9 6`
  }
}
