import { SudokuIndex } from "./SudokuIndex.js"
import { Line } from "./Line.js"
import { SudokuIndexes } from "./SudokuIndexes.js"
import { Block } from "./Block.js"
import { Position } from "./Position.js"

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

    for (const index of SudokuIndexes.iterate()) {
      const block = this.blockAt(index)
      const valid = block.isValid()

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

  private horizontalLineAt(horizontalIndex: SudokuIndex) {
    const elements: Array<number | null> = []

    for (const verticalIndex of SudokuIndexes.iterate()) {
      const position = Position.at(horizontalIndex, verticalIndex)
      const value = this.getAt(position)
      elements.push(value)
    }

    return Line.fromArray(elements)
  }
  private verticalLineAt(verticalIndex: SudokuIndex) {
    const elements: Array<number | null> = []

    for (const horizontalIndex of SudokuIndexes.iterate()) {
      const position = Position.at(horizontalIndex, verticalIndex)
      const value = this.getAt(position)
      elements.push(value)
    }

    return Line.fromArray(elements)
  }

  private blockAt(index: SudokuIndex): Block {
    if (index.getValue() === 0) {
      return Block.fromArray([
        this.matrix[0 + 0][0 + 0],
        this.matrix[0 + 0][1 + 0],
        this.matrix[0 + 0][2 + 0],
        this.matrix[1 + 0][0 + 0],
        this.matrix[1 + 0][1 + 0],
        this.matrix[1 + 0][2 + 0],
        this.matrix[2 + 0][0 + 0],
        this.matrix[2 + 0][1 + 0],
        this.matrix[2 + 0][2 + 0],
      ])
    }

    if (index.getValue() === 1) {
      return Block.fromArray([
        this.matrix[0 + 0][0 + 3],
        this.matrix[0 + 0][1 + 3],
        this.matrix[0 + 0][2 + 3],
        this.matrix[1 + 0][0 + 3],
        this.matrix[1 + 0][1 + 3],
        this.matrix[1 + 0][2 + 3],
        this.matrix[2 + 0][0 + 3],
        this.matrix[2 + 0][1 + 3],
        this.matrix[2 + 0][2 + 3],
      ])
    }

    if (index.getValue() === 2) {
      return Block.fromArray([
        this.matrix[0 + 0][0 + 6],
        this.matrix[0 + 0][1 + 6],
        this.matrix[0 + 0][2 + 6],
        this.matrix[1 + 0][0 + 6],
        this.matrix[1 + 0][1 + 6],
        this.matrix[1 + 0][2 + 6],
        this.matrix[2 + 0][0 + 6],
        this.matrix[2 + 0][1 + 6],
        this.matrix[2 + 0][2 + 6],
      ])
    }

    if (index.getValue() === 3) {
      return Block.fromArray([
        this.matrix[0 + 3][0 + 0],
        this.matrix[0 + 3][1 + 0],
        this.matrix[0 + 3][2 + 0],
        this.matrix[1 + 3][0 + 0],
        this.matrix[1 + 3][1 + 0],
        this.matrix[1 + 3][2 + 0],
        this.matrix[2 + 3][0 + 0],
        this.matrix[2 + 3][1 + 0],
        this.matrix[2 + 3][2 + 0],
      ])
    }

    if (index.getValue() === 4) {
      return Block.fromArray([
        this.matrix[0 + 3][0 + 3],
        this.matrix[0 + 3][1 + 3],
        this.matrix[0 + 3][2 + 3],
        this.matrix[1 + 3][0 + 3],
        this.matrix[1 + 3][1 + 3],
        this.matrix[1 + 3][2 + 3],
        this.matrix[2 + 3][0 + 3],
        this.matrix[2 + 3][1 + 3],
        this.matrix[2 + 3][2 + 3],
      ])
    }

    if (index.getValue() === 5) {
      return Block.fromArray([
        this.matrix[0 + 3][0 + 6],
        this.matrix[0 + 3][1 + 6],
        this.matrix[0 + 3][2 + 6],
        this.matrix[1 + 3][0 + 6],
        this.matrix[1 + 3][1 + 6],
        this.matrix[1 + 3][2 + 6],
        this.matrix[2 + 3][0 + 6],
        this.matrix[2 + 3][1 + 6],
        this.matrix[2 + 3][2 + 6],
      ])
    }

    if (index.getValue() === 6) {
      return Block.fromArray([
        this.matrix[0 + 6][0 + 0],
        this.matrix[0 + 6][1 + 0],
        this.matrix[0 + 6][2 + 0],
        this.matrix[1 + 6][0 + 0],
        this.matrix[1 + 6][1 + 0],
        this.matrix[1 + 6][2 + 0],
        this.matrix[2 + 6][0 + 0],
        this.matrix[2 + 6][1 + 0],
        this.matrix[2 + 6][2 + 0],
      ])
    }

    if (index.getValue() === 7) {
      return Block.fromArray([
        this.matrix[0 + 6][0 + 3],
        this.matrix[0 + 6][1 + 3],
        this.matrix[0 + 6][2 + 3],
        this.matrix[1 + 6][0 + 3],
        this.matrix[1 + 6][1 + 3],
        this.matrix[1 + 6][2 + 3],
        this.matrix[2 + 6][0 + 3],
        this.matrix[2 + 6][1 + 3],
        this.matrix[2 + 6][2 + 3],
      ])
    }

    if (index.getValue() === 8) {
      return Block.fromArray([
        this.matrix[0 + 6][0 + 6],
        this.matrix[0 + 6][1 + 6],
        this.matrix[0 + 6][2 + 6],
        this.matrix[1 + 6][0 + 6],
        this.matrix[1 + 6][1 + 6],
        this.matrix[1 + 6][2 + 6],
        this.matrix[2 + 6][0 + 6],
        this.matrix[2 + 6][1 + 6],
        this.matrix[2 + 6][2 + 6],
      ])
    }

    return Block.fromArray([
      this.matrix[0 + 0][0 + 0],
      this.matrix[0 + 0][1 + 0],
      this.matrix[0 + 0][2 + 0],
      this.matrix[1 + 0][0 + 0],
      this.matrix[1 + 0][1 + 0],
      this.matrix[1 + 0][2 + 0],
      this.matrix[2 + 0][0 + 0],
      this.matrix[2 + 0][1 + 0],
      this.matrix[2 + 0][2 + 0],
    ])
  }

  private getAt(position: Position) {
    const i = position.getHorizontal().getValue()
    const j = position.getVertical().getValue()
    return this.matrix[i][j]
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
