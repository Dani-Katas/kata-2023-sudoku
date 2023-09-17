import { SudokuIndex } from "./SudokuIndex.js"
import { Line } from "./Line.js"
import { Block } from "./Block.js"
import { Position } from "./Position.js"
import { Cell } from "./Cell.js"
import { CellDigit } from "./CellDigit.js"

export class Sudoku {
  static fromRaw(matrix: Array<Array<number | null>>): Sudoku {
    return new Sudoku(matrix.map((el) => el.map(Cell.fromRaw)))
  }

  static from(matrix: Array<Array<Cell>>): Sudoku {
    return new Sudoku(matrix)
  }

  private readonly matrix: Array<Array<Cell>>

  private constructor(matrix: Array<Array<Cell>>) {
    this.matrix = matrix
  }

  public isValid(): boolean {
    for (const index of SudokuIndex.each()) {
      const validHorizontalLine = this.horizontalLineAt(index).isValid()
      const validVerticalLine = this.verticalLineAt(index).isValid()
      const validBlock = this.blockAt(index).isValid()

      if (!validHorizontalLine || !validVerticalLine || !validBlock) {
        return false
      }
    }

    return true
  }

  private isFilled() {
    for (const position of this.eachSudokuPosition()) {
      if (this.hasEmpty(position)) {
        return false
      }
    }

    return true
  }

  private hasEmpty(position: Position) {
    return this.getCellAt(position).isEmpty()
  }

  private getNextEmptyPosition() {
    for (const position of this.eachSudokuPosition()) {
      if (this.hasEmpty(position)) {
        return position
      }
    }
  }

  solve(): Sudoku {
    const nextPosition = this.getNextEmptyPosition()

    if (!nextPosition) {
      return this
    }

    for (const digit of CellDigit.digits()) {
      const sudoku = this.writeDownIn(nextPosition, digit)

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
    for (const index of SudokuIndex.each()) {
      const line1 = this.horizontalLineAt(index)
      const line2 = other.horizontalLineAt(index)

      if (line1.notEquals(line2)) {
        return false
      }
    }

    return true
  }

  private horizontalLineAt(horizontalIndex: SudokuIndex) {
    const elements: Array<Cell> = []

    for (const verticalIndex of SudokuIndex.each()) {
      const position = Position.at(horizontalIndex, verticalIndex)
      const value = this.getCellAt(position)
      elements.push(value)
    }

    return Line.fromCells(elements)
  }
  private verticalLineAt(verticalIndex: SudokuIndex) {
    const elements: Array<Cell> = []

    for (const horizontalIndex of SudokuIndex.each()) {
      const position = Position.at(horizontalIndex, verticalIndex)
      const value = this.getCellAt(position)
      elements.push(value)
    }

    return Line.fromCells(elements)
  }

  private blockAt(index: SudokuIndex): Block {
    const [mod, div] = index.toModDiv()
    const iOffset = div.times(3)
    const jOffset = mod.times(3)

    const elements: Array<Cell> = []

    for (const innerIndex of SudokuIndex.each()) {
      const [mod2, div2] = innerIndex.toModDiv()
      const position = Position.at(iOffset.add(mod2), jOffset.add(div2))
      const value = this.getCellAt(position)
      elements.push(value)
    }

    return Block.fromCells(elements)
  }

  private getCellAt(position: Position) {
    return position.getFrom(this.matrix)
  }

  private writeDownIn(position: Position, digit: CellDigit) {
    const map = this.createEmptyMatrixCell()

    for (const currentPosition of this.eachSudokuPosition()) {
      const cell = position.equals(currentPosition) ? Cell.with(digit) : this.getCellAt(currentPosition)

      currentPosition.writeIn(map, cell)
    }

    return Sudoku.from(map)
  }

  private createEmptyMatrixCell(): Array<Array<Cell>> {
    const fill: number[] = new Array(9).fill(0)

    return fill.map(() => new Array(9).fill(Cell.empty()))
  }

  private *eachSudokuPosition() {
    for (const i of SudokuIndex.each()) {
      for (const j of SudokuIndex.each()) {
        yield Position.at(i, j)
      }
    }
  }

  toString() {
    const linesFormatted = new Array(...SudokuIndex.each())
      .map((el) => this.horizontalLineAt(el))
      .map((line) => line.toString())

    return [
      linesFormatted[0],
      linesFormatted[1],
      linesFormatted[2],
      "---------------------",
      linesFormatted[3],
      linesFormatted[4],
      linesFormatted[5],
      "---------------------",
      linesFormatted[6],
      linesFormatted[7],
      linesFormatted[8],
    ].join("\n")
  }
}
