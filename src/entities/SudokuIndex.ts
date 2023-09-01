import { SudokuIndexes } from "./SudokuIndexes.js"

/**
 * Represents an index inside the Sudoku (1..9)
 * This can be used for Horizontal Lines, Vertical Lines and Blocks
 */
export class SudokuIndex {
  constructor(private readonly value: number) {}

  getValue(): number {
    return this.value
  }

  notEquals(other: SudokuIndex) {
    return this.value !== other.getValue()
  }

  toModDiv() {
    const mod1 = this.getValue() % 3
    const div1 = Math.floor(this.getValue() / 3)

    return [new SudokuIndex(mod1), new SudokuIndex(div1)] as const
  }

  add(other: SudokuIndex) {
    return new SudokuIndex(this.value + other.value)
  }

  times(other: number) {
    return new SudokuIndex(this.value * other)
  }

  equals(other: SudokuIndex) {
    return !this.notEquals(other)
  }
}
