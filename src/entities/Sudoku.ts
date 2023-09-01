import { SudokuIndex } from "./SudokuIndex.js"
import { Line } from "./Line.js"
import { SudokuIndexes } from "./SudokuIndexes.js"
import { Block } from "./Block.js"
import { Position } from "./Position.js"
import { Cell } from "./Cell.js"

export class Sudoku {
  static fromMatrix(matrix: Array<Array<number | null>>): Sudoku {
    return new Sudoku(matrix)
  }

  constructor(private readonly matrix: Array<Array<number | null>>) {}

  public isValid(): boolean {
    for (const index of SudokuIndexes.iterate()) {
      const validHorizontalLine = this.horizontalLineAt(index).isValid()
      const validVerticalLine = this.verticalLineAt(index).isValid()
      const validBlock = this.blockAt(index).isValid()

      if (!validHorizontalLine || !validVerticalLine || !validBlock) {
        return false
      }
    }

    return true
  }

  isFilled() {
    for (const i of SudokuIndexes.iterate()) {
      for (const j of SudokuIndexes.iterate()) {
        const position = Position.at(i, j)
        const cell = this.getCellAt(position)

        if (cell.isEmpty()) {
          return false
        }
      }
    }

    return true
  }

  private getNextEmptyPosition() {
    for (const i of SudokuIndexes.iterate()) {
      for (const j of SudokuIndexes.iterate()) {
        const position = Position.at(i, j)

        if (this.getCellAt(position).isEmpty()) {
          return position
        }
      }
    }
  }

  solve(): Sudoku {
    const nextPosition = this.getNextEmptyPosition()

    if (!nextPosition) {
      return this
    }

    for (const sudokuIndex of SudokuIndexes.iterate()) {
      const sudoku = this.writeDown(nextPosition, sudokuIndex.getValue() + 1)

      if (sudoku.isValid()) {
        const solved = sudoku.solve()

        if (solved.isFilled()) {
          return solved
        }
      }
    }

    return this
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
    const [mod, div] = index.toModDiv()
    const iOffset = div.times(3)
    const jOffset = mod.times(3)

    const elements: Array<number | null> = []

    for (const innerIndex of SudokuIndexes.iterate()) {
      const [mod2, div2] = innerIndex.toModDiv()
      const position = Position.at(iOffset.add(mod2), jOffset.add(div2))
      const value = this.getAt(position)
      elements.push(value)
    }

    return Block.fromArray(elements)
  }

  private getAt(position: Position) {
    const i = position.getHorizontal().getValue()
    const j = position.getVertical().getValue()
    return this.matrix[i][j]
  }

  private getCellAt(position: Position) {
    return new Cell(this.getAt(position))
  }

  private writeDown(position: Position, number: number) {
    const map = new Array(9).fill(0).map((el) => new Array(9).fill(null))

    for (const i of SudokuIndexes.iterate()) {
      for (const j of SudokuIndexes.iterate()) {
        const currentPosition = Position.at(i, j)

        if (position.equals(currentPosition)) {
          map[i.getValue()][j.getValue()] = number
        } else {
          map[i.getValue()][j.getValue()] = this.getAt(currentPosition)
        }
      }
    }

    return Sudoku.fromMatrix(map)
  }

  toString() {
    const values = this.matrix.map((el) => {
      return [
        el[0] ?? "-",
        el[1] ?? "-",
        el[2] ?? "-",
        "|",
        el[3] ?? "-",
        el[4] ?? "-",
        el[5] ?? "-",
        "|",
        el[6] ?? "-",
        el[7] ?? "-",
        el[8] ?? "-",
      ].join(" ")
    })

    return [
      values[0],
      values[1],
      values[2],
      "---------------------",
      values[3],
      values[4],
      values[5],
      "---------------------",
      values[6],
      values[7],
      values[8],
    ].join("\n")
  }
}
